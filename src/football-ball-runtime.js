import * as THREE from "./three.js";
import {
  ATHLETE_BALL_REACH,
  ARCADE_KEEPER_NERF,
  FOOTBALL_BALL_CONTROL_HEIGHT,
  FOOTBALL_BALL_GRAVITY,
  FOOTBALL_BALL_GROUND_BOUNCE,
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_BALL_VOLLEY_HEIGHT,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_HEIGHT,
  FOOTBALL_GOAL_WIDTH
} from "./game-config.js";

export function updateFootballBallRuntime(game, dt, deps) {
  const {
    applyFootballKickContact,
    getFootballFootedness,
    getFootballKickoffTarget,
    registerBallTouch,
    setFootballBallVelocity,
    startGoalCelebration,
    triggerFootballKickPose,
    updateScoreboard
  } = deps;

  game.restartHoldTimer = Math.max(0, (game.restartHoldTimer ?? 0) - dt);
  game.kickoffScriptTimer = Math.max(0, (game.kickoffScriptTimer ?? 0) - dt);
  if (game.refRestart?.active) {
    game.refRestart.timer += dt;
    const refDx = game.coach ? game.refRestart.ballX - game.coach.runner.root.position.x : 0;
    const refDz = game.coach ? game.refRestart.ballZ - game.coach.runner.root.position.z : 0;
    const refDistToBall = Math.hypot(refDx, refDz);
    let kickoffResetReady = true;
    if ((game.refRestart.kind ?? "boundary") === "kickoff") {
      for (let i = 0; i < game.players.length; i += 1) {
        const p = game.players[i];
        const kickoffTarget = getFootballKickoffTarget(game, p);
        const distHome = Math.hypot(p.runner.root.position.x - kickoffTarget.x, p.runner.root.position.z - kickoffTarget.z);
        if (distHome > 0.3 || Math.hypot(p.vx, p.vz) > 0.18) {
          kickoffResetReady = false;
          break;
        }
      }
    }
    if (game.refRestart.phase === "toBall") {
      game.ball.position.set(game.refRestart.ballX, FOOTBALL_BALL_RADIUS, game.refRestart.ballZ);
      game.ballVel.set(0, 0, 0);
      if (refDistToBall < 0.52) {
        game.refRestart.phase = "toCenter";
        game.refRestart.timer = 0;
      }
    } else if (game.refRestart.phase === "toCenter") {
      const toCenter = game.coach
        ? Math.hypot(game.refRestart.placeX - game.coach.runner.root.position.x, game.refRestart.placeZ - game.coach.runner.root.position.z)
        : 0;
      const kickoffPlaceReady = (game.refRestart.kind ?? "boundary") === "kickoff"
        ? (toCenter < 0.75 && (kickoffResetReady || game.refRestart.timer > 1.2))
        : toCenter < 0.55;
      if (kickoffPlaceReady) {
        game.refRestart.phase = "place";
        game.refRestart.timer = 0;
        game.ball.visible = true;
        game.ball.position.set(game.refRestart.placeX, FOOTBALL_BALL_RADIUS, game.refRestart.placeZ);
        game.ballVel.set(0, 0, 0);
        if (game.coach?.carryBall) game.coach.carryBall.visible = false;
      }
    } else if (game.refRestart.phase === "place") {
      game.ball.visible = true;
      game.ball.position.set(game.refRestart.placeX, FOOTBALL_BALL_RADIUS, game.refRestart.placeZ);
      game.ballVel.set(0, 0, 0);
      if (game.refRestart.timer > 0.45) {
        const restartKind = game.refRestart.kind ?? "boundary";
        game.refRestart = null;
        game.restartHoldTimer = 0;
        if (restartKind === "kickoff" && (game.restartTeam ?? 0) !== 0) {
          game.kickoffPlacementMode = "live";
          game.kickoffContestTimer = 1.5;
          game.kickoffScriptTimer = 0.42;
        }
        if (game.coach) {
          game.coach.whistleTimer = Math.max(game.coach.whistleTimer ?? 0, 0.62);
        }
      }
    }
  }
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 + FOOTBALL_BALL_RADIUS * 0.7;
  const goalInnerHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 - FOOTBALL_BALL_RADIUS * 0.15;
  const goalBackZ = goalLine + FOOTBALL_GOAL_DEPTH - FOOTBALL_BALL_RADIUS * 1.05;
  const goalRoofY = FOOTBALL_GOAL_HEIGHT - FOOTBALL_BALL_RADIUS * 0.12;
  const goalScorePlane = goalLine + FOOTBALL_BALL_RADIUS * 0.12;
  const detectGoalLineScore = (teamSign, prevX, prevY, prevZ) => {
    const prevDepth = prevZ * teamSign;
    const currentDepth = game.ball.position.z * teamSign;
    const travelDepth = currentDepth - prevDepth;
    if (travelDepth <= 0) return false;
    if (prevDepth > goalScorePlane || currentDepth < goalScorePlane) return false;

    const crossT = THREE.MathUtils.clamp((goalScorePlane - prevDepth) / Math.max(0.0001, travelDepth), 0, 1);
    const crossX = THREE.MathUtils.lerp(prevX, game.ball.position.x, crossT);
    const crossY = THREE.MathUtils.lerp(prevY, game.ball.position.y, crossT);
    const insideMouth = Math.abs(crossX) <= goalHalfWidth;
    const underBar = crossY <= FOOTBALL_GOAL_HEIGHT + FOOTBALL_BALL_RADIUS * 0.45;
    if (!insideMouth || !underBar) return false;

    game.goalPending = {
      team: teamSign,
      timer: 0,
      crossedLine: true,
      confirmed: true,
      netHit: false,
      settled: false,
      deepInside: currentDepth >= goalScorePlane + 0.46
    };
    game.ball.position.z = Math.max(game.ball.position.z * teamSign, goalScorePlane) * teamSign;
    return true;
  };
  const applyGoalNetPhysics = (teamSign) => {
    const goalDepth = game.ball.position.z * teamSign;
    if (goalDepth < goalLine || Math.abs(game.ball.position.x) > goalHalfWidth || game.ball.position.y > FOOTBALL_GOAL_HEIGHT + FOOTBALL_BALL_RADIUS * 0.6) {
      return false;
    }

    if (!game.goalPending || game.goalPending.team !== teamSign) {
      game.goalPending = { team: teamSign, timer: 0, crossedLine: goalDepth >= goalScorePlane, confirmed: goalDepth >= goalScorePlane, netHit: false, settled: false, deepInside: goalDepth >= goalScorePlane + 0.46 };
    }
    game.goalPending.timer += dt;
    if (goalDepth >= goalScorePlane) {
      game.goalPending.crossedLine = true;
      game.goalPending.confirmed = true;
    }
    if (goalDepth >= goalScorePlane + 0.46) {
      game.goalPending.deepInside = true;
    }

    if (Math.abs(game.ball.position.x) > goalInnerHalfWidth) {
      game.ball.position.x = Math.sign(game.ball.position.x || 1) * goalInnerHalfWidth;
      game.ballVel.x *= -0.32;
      game.ballVel.z *= 0.92;
      game.ballVel.y *= 0.94;
    }

    if (game.ball.position.y > goalRoofY) {
      game.ball.position.y = goalRoofY;
      game.ballVel.y = -Math.abs(game.ballVel.y) * 0.3;
      game.ballVel.z *= 0.94;
    }

    if (goalDepth >= goalBackZ) {
      game.ball.position.z = teamSign * (goalBackZ - 0.03);
      game.ballVel.z = -teamSign * Math.min(0.12, Math.abs(game.ballVel.z) * 0.04);
      game.ballVel.x *= 0.52;
      game.ballVel.y *= 0.36;
      if (Math.abs(game.ballVel.z) < 0.04) {
        game.ballVel.z = 0;
      }
    }

    const settledInGoal = game.goalPending.crossedLine
      && goalDepth >= goalScorePlane + 0.24
      && goalDepth < goalBackZ - 0.02
      && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.06
      && Math.abs(game.ballVel.y) < 0.12
      && Math.hypot(game.ballVel.x, game.ballVel.z) < 0.52
      && game.goalPending.timer > 0.16;
    if (settledInGoal) {
      game.goalPending.settled = true;
      game.goalPending.netHit = true;
    }

    const stoppedAfterBackNet = game.goalPending.crossedLine
      && game.goalPending.deepInside
      && goalDepth >= goalScorePlane + 0.38
      && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.08
      && Math.abs(game.ballVel.y) < 0.1
      && Math.hypot(game.ballVel.x, game.ballVel.z) < 0.34
      && game.goalPending.timer > 0.2;
    if (stoppedAfterBackNet) {
      game.goalPending.settled = true;
      game.goalPending.netHit = true;
    }

    return true;
  };
  const kickoffLocked = game.restartHoldTimer > 0.001 || Boolean(game.refRestart?.active);
  if (kickoffLocked) {
    if (!game.refRestart?.active) {
      const restartX = game.restartSpot?.x ?? 0;
      const restartZ = game.restartSpot?.z ?? 0;
      game.ball.position.set(restartX, FOOTBALL_BALL_RADIUS, restartZ);
      game.ballVel.set(0, 0, 0);
    }
  } else {
    const prevBallX = game.ball.position.x;
    const prevBallY = game.ball.position.y;
    const prevBallZ = game.ball.position.z;
    game.ballVel.x *= Math.pow(0.994, dt * 60);
    game.ballVel.z *= Math.pow(0.994, dt * 60);
    game.ballVel.y *= Math.pow(0.998, dt * 60);
    game.ballVel.y -= FOOTBALL_BALL_GRAVITY * dt;
    game.ball.position.x += game.ballVel.x * dt;
    game.ball.position.y += game.ballVel.y * dt;
    game.ball.position.z += game.ballVel.z * dt;

    if (game.ball.position.y <= FOOTBALL_BALL_RADIUS) {
      game.ball.position.y = FOOTBALL_BALL_RADIUS;
      if (Math.abs(game.ballVel.y) > 1.15) {
        game.ballVel.y = -game.ballVel.y * FOOTBALL_BALL_GROUND_BOUNCE;
        game.ballVel.x *= 0.975;
        game.ballVel.z *= 0.975;
      } else {
        game.ballVel.y = 0;
        game.ballVel.x *= Math.pow(0.989, dt * 60);
        game.ballVel.z *= Math.pow(0.989, dt * 60);
      }
    }

    const redGoalScored = detectGoalLineScore(1, prevBallX, prevBallY, prevBallZ);
    const blueGoalScored = !redGoalScored && detectGoalLineScore(-1, prevBallX, prevBallY, prevBallZ);
    const inRedGoal = redGoalScored || applyGoalNetPhysics(1);
    const inBlueGoal = !inRedGoal && (blueGoalScored || applyGoalNetPhysics(-1));
    if (
      game.goalPending?.confirmed
      && !inRedGoal
      && !inBlueGoal
      && game.goalPending.timer > 0.18
      && Math.abs(game.ball.position.z * game.goalPending.team) < goalLine - 0.04
    ) {
      game.goalPending.netHit = true;
    }
    if (!inRedGoal && !inBlueGoal && game.goalPending && !game.goalPending.confirmed && Math.abs(game.ball.position.z * game.goalPending.team) < goalLine - 0.18) {
      game.goalPending = null;
    }
  }

  if (!kickoffLocked && (game.kickoffScriptTimer ?? 0) > 0 && (game.restartTeam ?? 0) !== 0) {
    let taker = null;
    for (let i = 0; i < game.players.length; i += 1) {
      const player = game.players[i];
      if (player.kickoffRole === "taker" && player.team === game.restartTeam) {
        taker = player;
        break;
      }
    }
    let support = null;
    let supportDist = Infinity;
    if (taker) {
      for (let i = 0; i < game.players.length; i += 1) {
        const player = game.players[i];
        if (player.team !== game.restartTeam || player === taker || player.role === "keeper") continue;
        const dist = Math.hypot(
          player.runner.root.position.x - taker.runner.root.position.x,
          player.runner.root.position.z - taker.runner.root.position.z
        );
        if (dist < supportDist) {
          supportDist = dist;
          support = player;
        }
      }
    }
    if (taker && support && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT) {
      const waitForScriptKick = game.kickoffScriptTimer <= 0.18;
      if (waitForScriptKick) {
        const targetX = support.runner.root.position.x + support.vx * 0.18;
        const targetZ = support.runner.root.position.z + support.vz * 0.18 + taker.team * 0.45;
        const passDx = targetX - game.ball.position.x;
        const passDz = targetZ - game.ball.position.z;
        taker.kickSide = getFootballFootedness(taker, game.ball, targetX).kickSide;
        applyFootballKickContact(taker, game.ball);
        setFootballBallVelocity(game, passDx, passDz, 4.9 + Math.random() * 0.45, 0.22 + Math.random() * 0.08);
        taker.kickCooldown = 0.72;
        triggerFootballKickPose(taker, game.ball, 0.92, targetX);
        registerBallTouch(game, taker.team, taker);
        game.kickoffScriptTimer = 0;
        game.kickoffContestTimer = Math.min(game.kickoffContestTimer ?? 0, 0.9);
      } else {
        game.ballVel.set(0, 0, 0);
      }
    } else {
      game.kickoffScriptTimer = 0;
    }
  }

  for (let i = 0; i < game.players.length; i += 1) {
    const keeper = game.players[i];
    if (keeper.role !== "keeper") continue;
    if (game.goalPending?.team === -keeper.team) continue;
    const keeperGoalZ = -keeper.team * goalLine;
    const keeperLineZ = keeperGoalZ + keeper.team * 0.44;
    const ballToKeeper = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z);
    const ballNearGoalMouth = (keeper.team * (game.ball.position.z - keeperGoalZ)) > -4.4 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.86;
    const ballLooseInBox = ballNearGoalMouth && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT && ballToKeeper < 2.35;
    if (ballLooseInBox && game.ballVel.length() < 4.1 && keeper.saveCooldown <= 0.18) {
      const emergencyClearX = THREE.MathUtils.clamp(
        (game.ball.position.x - keeper.runner.root.position.x) * 1.8 + (Math.random() < 0.5 ? -1 : 1) * (3.8 + Math.random() * 3.2),
        -FOOTBALL_FIELD_HALF_WIDTH * 0.92,
        FOOTBALL_FIELD_HALF_WIDTH * 0.92
      );
      const emergencyClearZ = keeper.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.6 + Math.random() * 0.24));
      const clearDx = emergencyClearX - game.ball.position.x;
      const clearDz = emergencyClearZ - game.ball.position.z;
      const clearPower = 10.4 + Math.random() * 3.2;
      game.ball.position.z = keeperLineZ + keeper.team * 0.12;
      setFootballBallVelocity(game, clearDx, clearDz, clearPower, 1.55 + Math.random() * 0.85);
      registerBallTouch(game, keeper.team, keeper);
      keeper.kickCooldown = Math.max(keeper.kickCooldown ?? 0, 0.62);
      keeper.saveCooldown = 0.58;
      keeper.diveDir = Math.sign(clearDx || keeper.team);
      keeper.diveBlend = Math.max(keeper.diveBlend, 0.3);
      keeper.saveLift = Math.max(keeper.saveLift, 0.2);
      keeper.saveHeight = 0.38;
      continue;
    }
    const incoming = game.ballVel.z * keeper.team < -0.26;
    if (!incoming || Math.abs(game.ball.position.x) > goalHalfWidth + 1.24) continue;
    const planeTime = Math.abs(game.ballVel.z) > 0.001 ? (keeperLineZ - game.ball.position.z) / game.ballVel.z : Infinity;
    const predictedX = Number.isFinite(planeTime)
      ? game.ball.position.x + game.ballVel.x * THREE.MathUtils.clamp(planeTime, 0, 0.5)
      : game.ball.position.x;
    const predictedY = Number.isFinite(planeTime)
      ? game.ball.position.y + game.ballVel.y * THREE.MathUtils.clamp(planeTime, 0, 0.5) - 0.5 * FOOTBALL_BALL_GRAVITY * Math.pow(THREE.MathUtils.clamp(planeTime, 0, 0.5), 2)
      : game.ball.position.y;
    const closeEnough = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z) < 1.62 * ARCADE_KEEPER_NERF;
    const cutsLane = planeTime > 0 && planeTime < 0.6 && Math.abs(predictedX - keeper.runner.root.position.x) < 1.58 * ARCADE_KEEPER_NERF;
    const parrySide = Math.sign(predictedX - keeper.runner.root.position.x || game.ball.position.x - keeper.runner.root.position.x || 1);
    if ((closeEnough || cutsLane) && predictedY <= FOOTBALL_GOAL_HEIGHT * 0.92 && keeper.saveCooldown <= 0) {
      const deflectX = THREE.MathUtils.clamp((game.ball.position.x - keeper.runner.root.position.x) * 1.95 + (Math.random() - 0.5) * 0.95, -3.1, 3.1);
      const deflectZ = keeper.team * (3.1 + Math.random() * 1.15);
      const deflectPower = 3.2 + Math.min(1.35, game.ballVel.length() * 0.42);
      game.ball.position.x = THREE.MathUtils.clamp(keeper.runner.root.position.x + parrySide * (0.54 + Math.min(0.26, Math.abs(predictedX - keeper.runner.root.position.x) * 0.4)), -FOOTBALL_GOAL_WIDTH * 0.56, FOOTBALL_GOAL_WIDTH * 0.56);
      game.ball.position.z = keeperLineZ + keeper.team * 0.06;
      setFootballBallVelocity(
        game,
        deflectX + parrySide * (0.8 + Math.random() * 0.7),
        deflectZ,
        deflectPower + 0.48,
        1.72 + Math.random() * 0.82
      );
      keeper.saveCooldown = 0.9;
      keeper.diveDir = parrySide;
      keeper.diveBlend = 1;
      keeper.saveLift = THREE.MathUtils.clamp(0.42 + predictedY * 0.1, 0.42, 0.78);
      keeper.saveHeight = THREE.MathUtils.clamp(predictedY / Math.max(0.001, FOOTBALL_GOAL_HEIGHT), 0.24, 1);
    }
  }
  let scoredTeam = 0;
  if (game.goalPending?.netHit) {
    scoredTeam = game.goalPending.team;
    if (scoredTeam === 1) {
      game.redScore += 1;
    } else if (scoredTeam === -1) {
      game.blueScore += 1;
    }
    game.goalPending = null;
  }
  if (scoredTeam !== 0) {
    let scorer = game.lastTouchPlayer && game.lastTouchPlayer.team === scoredTeam ? game.lastTouchPlayer : null;
    if (!scorer) {
      let bestDist = Infinity;
      for (let i = 0; i < game.players.length; i += 1) {
        const p = game.players[i];
        if (p.team !== scoredTeam) continue;
        const dist = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
        if (dist < bestDist) {
          bestDist = dist;
          scorer = p;
        }
      }
    }
    if (scorer) scorer.goalsScored = (scorer.goalsScored ?? 0) + 1;
    updateScoreboard(game);
    startGoalCelebration(game, scoredTeam, scorer);
    return { kickoffLocked, scored: true };
  }

  return { goalLine, kickoffLocked, scored: false };
}

export function updateFootballPossessionRuntime(game, dt, kickoffLocked, deps) {
  const {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose,
    updateScoreboard
  } = deps;

  const redPlayers = [];
  const bluePlayers = [];
  const keepers = [];
  const teamPlayers = {
    1: redPlayers,
    [-1]: bluePlayers
  };
  const closestToBall = {
    1: null,
    [-1]: null
  };
  const closestDist = {
    1: Infinity,
    [-1]: Infinity
  };
  let closestAnyPlayer = null;
  let closestAnyDist = Infinity;

  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    if (p.team === 1) {
      redPlayers.push(p);
    } else if (p.team === -1) {
      bluePlayers.push(p);
    }
    if (p.role === "keeper") {
      keepers.push(p);
    }
    const dist = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
    if (dist < closestAnyDist) {
      closestAnyDist = dist;
      closestAnyPlayer = p;
    }
    if (dist < closestDist[p.team]) {
      closestDist[p.team] = dist;
      closestToBall[p.team] = p;
    }
  }

  let controllingTeam = 0;
  if (closestDist[1] + 0.18 < closestDist[-1]) controllingTeam = 1;
  if (closestDist[-1] + 0.18 < closestDist[1]) controllingTeam = -1;

  const ballHeightAboveGround = game.ball.position.y - FOOTBALL_BALL_RADIUS;
  const controllableBall = ballHeightAboveGround <= FOOTBALL_BALL_CONTROL_HEIGHT;
  let keeperPriorityHolder = null;
  if (controllableBall) {
    let nearestKeeper = null;
    let nearestKeeperDist = Infinity;
    let nearestKeeperGoalZ = 0;
    for (let i = 0; i < keepers.length; i += 1) {
      const keeper = keepers[i];
      const dist = Math.hypot(
        game.ball.position.x - keeper.runner.root.position.x,
        game.ball.position.z - keeper.runner.root.position.z
      );
      if (dist < nearestKeeperDist) {
        nearestKeeper = keeper;
        nearestKeeperDist = dist;
        nearestKeeperGoalZ = -keeper.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
      }
    }
    if (nearestKeeper) {
      const keeperBoxDepth = (game.ball.position.z - nearestKeeperGoalZ) * nearestKeeper.team;
      const inKeeperClaimZone = keeperBoxDepth > -5.6
        && keeperBoxDepth < 1.8
        && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.04
        && nearestKeeperDist < ATHLETE_BALL_REACH + 1.15;
      if (inKeeperClaimZone && game.ballVel.length() < 4.6) {
        keeperPriorityHolder = nearestKeeper;
        controllingTeam = nearestKeeper.team;
      }
    }
  }
  let ballHolder = controllableBall && controllingTeam !== 0 && closestToBall[controllingTeam] && closestDist[controllingTeam] < ATHLETE_BALL_REACH + 0.22
    ? closestToBall[controllingTeam]
    : null;
  const recentTouchHolder = controllableBall
    && game.lastTouchPlayer
    && game.lastTouchPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.lastTouchPlayer.runner.root.position.x, game.ball.position.z - game.lastTouchPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 0.52
    && game.ballVel.length() < 5.6
      ? game.lastTouchPlayer
      : null;
  const protectedTouchHolder = controllableBall
    && game.touchShieldPlayer
    && game.touchShieldPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.touchShieldPlayer.runner.root.position.x, game.ball.position.z - game.touchShieldPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 0.86
    && game.ballVel.length() < 6.6
      ? game.touchShieldPlayer
      : null;
  if (protectedTouchHolder) {
    const holderDist = Math.hypot(game.ball.position.x - protectedTouchHolder.runner.root.position.x, game.ball.position.z - protectedTouchHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-protectedTouchHolder.team];
    if (
      holderDist <= nearestOpponentDist + 0.98
      || (game.touchShieldTimer ?? 0) > 0.16
      || (game.firstTouchPlayer === protectedTouchHolder && (game.firstTouchTimer ?? 0) > 0.001)
    ) {
      controllingTeam = protectedTouchHolder.team;
      ballHolder = protectedTouchHolder;
    }
  }
  const contestOwnerHolder = controllableBall
    && game.contestOwnerPlayer
    && game.contestOwnerPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.contestOwnerPlayer.runner.root.position.x, game.ball.position.z - game.contestOwnerPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 0.92
    && game.ballVel.length() < 5.2
      ? game.contestOwnerPlayer
      : null;
  if (contestOwnerHolder) {
    const holderDist = Math.hypot(game.ball.position.x - contestOwnerHolder.runner.root.position.x, game.ball.position.z - contestOwnerHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-contestOwnerHolder.team];
    if (holderDist <= nearestOpponentDist + 1.08 || (game.contestOwnerTimer ?? 0) > 0.08) {
      controllingTeam = contestOwnerHolder.team;
      ballHolder = contestOwnerHolder;
    }
  }
  if (recentTouchHolder) {
    const holderDist = Math.hypot(game.ball.position.x - recentTouchHolder.runner.root.position.x, game.ball.position.z - recentTouchHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-recentTouchHolder.team];
    if (holderDist <= nearestOpponentDist + 0.34) {
      controllingTeam = recentTouchHolder.team;
      ballHolder = recentTouchHolder;
    }
  }
  if (keeperPriorityHolder) {
    ballHolder = keeperPriorityHolder;
  }
  const reservedPassTarget = game.deliveryType === "pass" && game.deliveryTimer > 0 ? game.deliveryTarget : null;
  if (reservedPassTarget && reservedPassTarget !== game.deliverySource) {
    const targetDist = Math.hypot(game.ball.position.x - reservedPassTarget.runner.root.position.x, game.ball.position.z - reservedPassTarget.runner.root.position.z);
    const nearestOpponentDist = closestDist[-reservedPassTarget.team];
    const passClaimRadius = ATHLETE_BALL_REACH + 0.64;
    const passClaimMargin = game.deliveryTimer > 0.26 ? 0.82 : 0.58;
    if (controllableBall && targetDist < passClaimRadius && targetDist <= nearestOpponentDist + passClaimMargin) {
      controllingTeam = reservedPassTarget.team;
      ballHolder = reservedPassTarget;
    }
  }
  if (!ballHolder && controllableBall && closestAnyPlayer && closestAnyDist < ATHLETE_BALL_REACH + 0.12) {
    controllingTeam = closestAnyPlayer.team;
    ballHolder = closestAnyPlayer;
  }
  const playableBall = ballHeightAboveGround <= FOOTBALL_BALL_VOLLEY_HEIGHT && (ballHeightAboveGround <= FOOTBALL_BALL_CONTROL_HEIGHT || game.ballVel.y <= 0.45);
  const activeBallPlayer = playableBall && (ballHolder ?? (closestAnyPlayer && closestAnyDist < ATHLETE_BALL_REACH + 0.12 ? closestAnyPlayer : null));
  const looseBallStuck = !kickoffLocked
    && !ballHolder
    && controllableBall
    && game.ballVel.length() < 0.55
    && closestAnyDist > ATHLETE_BALL_REACH + 0.46;
  if (looseBallStuck) {
    game.looseBallStallTimer = Math.min(2.4, (game.looseBallStallTimer ?? 0) + dt);
  } else {
    game.looseBallStallTimer = Math.max(0, (game.looseBallStallTimer ?? 0) - dt * 2.8);
  }
  let vibratingCluster = null;
  for (let i = 0; i < game.players.length; i += 1) {
    const anchor = game.players[i];
    if (anchor.role === "keeper") continue;
    const members = [];
    let sumX = 0;
    let sumZ = 0;
    let speedSum = 0;
    for (let j = 0; j < game.players.length; j += 1) {
      const p = game.players[j];
      if (p.role === "keeper") continue;
      const dist = Math.hypot(anchor.runner.root.position.x - p.runner.root.position.x, anchor.runner.root.position.z - p.runner.root.position.z);
      if (dist < 0.98) {
        members.push(p);
        sumX += p.runner.root.position.x;
        sumZ += p.runner.root.position.z;
        speedSum += Math.hypot(p.vx, p.vz);
      }
    }
    if (members.length >= 3) {
      const centerX = sumX / members.length;
      const centerZ = sumZ / members.length;
      const ballDist = Math.hypot(centerX - game.ball.position.x, centerZ - game.ball.position.z);
      const avgSpeed = speedSum / members.length;
      if (ballDist > 4.2 && avgSpeed < 0.6) {
        vibratingCluster = { members, centerX, centerZ };
        break;
      }
    }
  }
  if (vibratingCluster) {
    game.offBallClusterTimer = Math.min(1.4, (game.offBallClusterTimer ?? 0) + dt);
  } else {
    game.offBallClusterTimer = Math.max(0, (game.offBallClusterTimer ?? 0) - dt * 3.4);
  }
  if ((game.offBallClusterTimer ?? 0) > 0.16 && vibratingCluster) {
    for (let i = 0; i < vibratingCluster.members.length; i += 1) {
      const p = vibratingCluster.members[i];
      let pushX = p.runner.root.position.x - vibratingCluster.centerX;
      let pushZ = p.runner.root.position.z - vibratingCluster.centerZ;
      const pushLen = Math.hypot(pushX, pushZ);
      if (pushLen <= 0.001) {
        const angle = (i / Math.max(1, vibratingCluster.members.length)) * Math.PI * 2;
        pushX = Math.cos(angle);
        pushZ = Math.sin(angle);
      } else {
        pushX /= pushLen;
        pushZ /= pushLen;
      }
      p.runner.root.position.x += pushX * 0.2;
      p.runner.root.position.z += pushZ * 0.2;
      p.vx += pushX * 0.75;
      p.vz += pushZ * 0.75;
    }
    game.offBallClusterTimer = 0;
  }
  if ((game.looseBallStallTimer ?? 0) > 0.42 && closestAnyPlayer) {
    const rescuer = closestAnyPlayer;
    const rescueTargetX = THREE.MathUtils.clamp(game.ball.position.x - rescuer.team * 0.08, -FOOTBALL_FIELD_HALF_WIDTH + 0.6, FOOTBALL_FIELD_HALF_WIDTH - 0.6);
    const rescueTargetZ = THREE.MathUtils.clamp(game.ball.position.z - rescuer.team * 0.22, -FOOTBALL_FIELD_HALF_LENGTH + 0.6, FOOTBALL_FIELD_HALF_LENGTH - 0.6);
    rescuer.runner.root.position.x = THREE.MathUtils.lerp(rescuer.runner.root.position.x, rescueTargetX, 0.78);
    rescuer.runner.root.position.z = THREE.MathUtils.lerp(rescuer.runner.root.position.z, rescueTargetZ, 0.78);
    const escapeX = THREE.MathUtils.clamp(game.ball.position.x + rescuer.laneBias * 1.4 + (Math.random() - 0.5) * 1.6, -FOOTBALL_FIELD_HALF_WIDTH * 0.92, FOOTBALL_FIELD_HALF_WIDTH * 0.92);
    const escapeZ = rescuer.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.52 + Math.random() * 0.18));
    const escapeDx = escapeX - game.ball.position.x;
    const escapeDz = escapeZ - game.ball.position.z;
    rescuer.kickSide = getFootballFootedness(rescuer, game.ball, escapeX).kickSide;
    applyFootballKickContact(rescuer, game.ball);
    setFootballBallVelocity(game, escapeDx, escapeDz, 6.6 + Math.random() * 2.2, 0.35 + Math.random() * 0.25);
    rescuer.kickCooldown = Math.max(rescuer.kickCooldown ?? 0, 0.42);
    triggerFootballKickPose(rescuer, game.ball, 0.92, escapeX);
    registerBallTouch(game, rescuer.team, rescuer);
    controllingTeam = rescuer.team;
    ballHolder = null;
    game.deliveryType = null;
    game.deliveryTeam = 0;
    game.deliveryTimer = 0;
    game.deliverySource = null;
    game.deliveryTarget = null;
    game.looseBallStallTimer = 0;
  }
  if (ballHolder !== game.ballHolder) {
    game.ballHolder = ballHolder;
    updateScoreboard(game);
  }

  if (controllingTeam !== game.attackingTeam) {
    game.attackingTeam = controllingTeam;
    updateScoreboard(game);
  }

  return {
    activeBallPlayer,
    ballHolder,
    closestAnyDist,
    closestAnyPlayer,
    closestDist,
    closestToBall,
    controllingTeam,
    teamPlayers
  };
}

