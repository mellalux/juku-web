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

const FOOTBALL_REF_CARRY_OFFSET = new THREE.Vector3(0.02, -0.02, 0.12);
const FOOTBALL_REF_CARRY_WORLD = new THREE.Vector3();
const FOOTBALL_REF_PLACE_DURATION = 0.62;

function createFootballLateGoalState(teamSign, goalDepth, goalScorePlane) {
  return {
    confirmed: true,
    crossedLine: true,
    deepInside: goalDepth >= goalScorePlane + 0.46,
    netHit: true,
    settled: true,
    team: teamSign,
    timer: 0.24
  };
}

function finalizeFootballGoalScore(game, startGoalCelebration, updateScoreboard) {
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
  if (scoredTeam === 0) return false;

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
  return true;
}

function getFootballLateGoalFallbackState(game, prevBallState = null) {
  if (game.goalPending || game.refRestart?.active || game.celebration?.active) {
    return null;
  }
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalScorePlane = goalLine + FOOTBALL_BALL_RADIUS * 0.12;
  const goalHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 + FOOTBALL_BALL_RADIUS * 0.7;
  const goalBackZ = goalLine + FOOTBALL_GOAL_DEPTH - FOOTBALL_BALL_RADIUS * 1.05;
  const goalRoofY = FOOTBALL_GOAL_HEIGHT - FOOTBALL_BALL_RADIUS * 0.12;
  if (prevBallState) {
    for (const teamSign of [1, -1]) {
      if ((game.overGoalNetTimer ?? 0) > 0.001 && game.overGoalNetTeam === teamSign) continue;
      const goalDepth = game.ball.position.z * teamSign;
      const prevDepth = prevBallState.z * teamSign;
      const travelDepth = goalDepth - prevDepth;
      if (travelDepth > 0.01 && prevDepth <= goalScorePlane + 0.03 && goalDepth >= goalScorePlane + 0.06) {
        const crossT = THREE.MathUtils.clamp((goalScorePlane - prevDepth) / Math.max(0.0001, travelDepth), 0, 1);
        const crossX = THREE.MathUtils.lerp(prevBallState.x, game.ball.position.x, crossT);
        const crossY = THREE.MathUtils.lerp(prevBallState.y, game.ball.position.y, crossT);
        const legalGoalEntry = Math.abs(crossX) <= goalHalfWidth
          && crossY <= FOOTBALL_GOAL_HEIGHT + FOOTBALL_BALL_RADIUS * 0.45;
        if (legalGoalEntry) {
          return createFootballLateGoalState(teamSign, goalDepth, goalScorePlane);
        }
      }
    }
  }

  const teamSign = Math.sign(game.ball.position.z || 0);
  if (teamSign === 0 || ((game.overGoalNetTimer ?? 0) > 0.001 && game.overGoalNetTeam === teamSign)) {
    return null;
  }

  const goalDepth = game.ball.position.z * teamSign;
  const withinGoalVolume = goalDepth >= goalScorePlane + 0.04
    && goalDepth <= goalBackZ + 0.04
    && Math.abs(game.ball.position.x) <= goalHalfWidth - 0.02
    && game.ball.position.y <= goalRoofY + FOOTBALL_BALL_RADIUS * 0.55;
  if (!withinGoalVolume) {
    return null;
  }

  const clearlyInsideGoal = goalDepth >= goalScorePlane + 0.18;
  const lowGoalBall = game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.58
    && Math.abs(game.ballVel.y) < 0.34;
  if (!clearlyInsideGoal || !lowGoalBall) {
    return null;
  }
  return createFootballLateGoalState(teamSign, goalDepth, goalScorePlane);
}

function getFootballRefCarryWorldPosition(game, out = FOOTBALL_REF_CARRY_WORLD) {
  const handPivot = game.coach?.runner?.leftArmRig?.handPivot;
  if (!handPivot) return null;
  handPivot.updateWorldMatrix(true, false);
  return handPivot.localToWorld(out.copy(FOOTBALL_REF_CARRY_OFFSET));
}

function snapFootballToRefCarryPosition(game) {
  const carryWorld = getFootballRefCarryWorldPosition(game, FOOTBALL_REF_CARRY_WORLD);
  if (!carryWorld) return false;
  game.ball.visible = true;
  game.ball.position.copy(carryWorld);
  game.ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, game.ball.position.y);
  game.ballVel.set(0, 0, 0);
  return true;
}

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
  game.kickoffReleaseTimer = Math.max(0, (game.kickoffReleaseTimer ?? 0) - dt);
  game.overGoalNetTimer = Math.max(0, (game.overGoalNetTimer ?? 0) - dt);
  if ((game.kickoffReleaseTimer ?? 0) <= 0.001) {
    game.kickoffReleaseTimer = 0;
    game.kickoffReceiver = null;
  }
  if ((game.overGoalNetTimer ?? 0) <= 0.001) {
    game.overGoalNetTimer = 0;
    game.overGoalNetTeam = 0;
  }
  if (game.refRestart?.active) {
    game.refRestart.timer += dt;
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
      game.refRestart.ballX = game.ball.position.x;
      game.refRestart.ballZ = game.ball.position.z;
      const refDx = game.coach ? game.refRestart.ballX - game.coach.runner.root.position.x : 0;
      const refDz = game.coach ? game.refRestart.ballZ - game.coach.runner.root.position.z : 0;
      const refDistToBall = Math.hypot(refDx, refDz);
      if (refDistToBall < 0.52) {
        game.refRestart.phase = "toCenter";
        game.refRestart.timer = 0;
        snapFootballToRefCarryPosition(game);
      }
    } else if (game.refRestart.phase === "toCenter") {
      snapFootballToRefCarryPosition(game);
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
      const placeProgress = THREE.MathUtils.clamp(game.refRestart.timer / FOOTBALL_REF_PLACE_DURATION, 0, 1);
      const carryWorld = getFootballRefCarryWorldPosition(game, FOOTBALL_REF_CARRY_WORLD);
      if (carryWorld) {
        const presentT = THREE.MathUtils.smoothstep(placeProgress, 0.04, 0.24);
        const slideT = THREE.MathUtils.smoothstep(placeProgress, 0.18, 0.88);
        const dropT = THREE.MathUtils.smoothstep(placeProgress, 0.34, 0.9);
        const settleT = THREE.MathUtils.smoothstep(placeProgress, 0.82, 0.99);
        const carryY = Math.max(FOOTBALL_BALL_RADIUS + 0.08, carryWorld.y);
        const displayX = THREE.MathUtils.lerp(carryWorld.x, game.refRestart.placeX, 0.18);
        const displayZ = THREE.MathUtils.lerp(carryWorld.z, game.refRestart.placeZ, 0.18);
        const theatricalArc = Math.sin(THREE.MathUtils.clamp((placeProgress - 0.08) / 0.54, 0, 1) * Math.PI) * 0.08;
        game.ball.position.x = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(carryWorld.x, displayX, presentT),
          game.refRestart.placeX,
          slideT
        );
        game.ball.position.z = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(carryWorld.z, displayZ, presentT),
          game.refRestart.placeZ,
          slideT
        );
        game.ball.position.y = Math.max(
          FOOTBALL_BALL_RADIUS,
          THREE.MathUtils.lerp(
            THREE.MathUtils.lerp(carryY, FOOTBALL_BALL_RADIUS + 0.11 + theatricalArc, presentT),
            FOOTBALL_BALL_RADIUS,
            dropT
          )
        );
        game.ball.position.y = THREE.MathUtils.lerp(game.ball.position.y, FOOTBALL_BALL_RADIUS, settleT);
      } else {
        game.ball.position.set(game.refRestart.placeX, FOOTBALL_BALL_RADIUS, game.refRestart.placeZ);
      }
      game.ballVel.set(0, 0, 0);
      if (game.refRestart.timer > FOOTBALL_REF_PLACE_DURATION) {
        const restartKind = game.refRestart.kind ?? "boundary";
        if (restartKind === "kickoff" && (game.restartTeam ?? 0) !== 0) {
          let supportSide = 0;
          for (let i = 0; i < game.players.length; i += 1) {
            const player = game.players[i];
            if (player.kickoffRole !== "support" || player.team !== game.restartTeam) continue;
            supportSide = Math.sign(player.runner.root.position.x || player.home.x || 0);
            break;
          }
          const clearSide = supportSide !== 0 ? -supportSide : Math.sign(game.restartTeam || 1);
          game.refRestart.phase = "clear";
          game.refRestart.timer = 0;
          game.refRestart.clearX = clearSide * 2.85;
          game.refRestart.clearZ = game.restartTeam * 1.55;
          game.kickoffPlacementMode = "live";
          game.kickoffContestTimer = Math.max(game.kickoffContestTimer ?? 0, 1.7);
          game.kickoffScriptTimer = Math.max(game.kickoffScriptTimer ?? 0, 0.64);
        } else {
          game.refRestart = null;
          game.restartHoldTimer = 0;
        }
        if (game.coach) {
          game.coach.whistleTimer = Math.max(game.coach.whistleTimer ?? 0, 0.62);
        }
      }
    } else if (game.refRestart.phase === "clear") {
      const clearDx = game.coach ? (game.refRestart.clearX ?? 0) - game.coach.runner.root.position.x : 0;
      const clearDz = game.coach ? (game.refRestart.clearZ ?? 0) - game.coach.runner.root.position.z : 0;
      const clearDist = Math.hypot(clearDx, clearDz);
      if (clearDist < 0.7 || game.refRestart.timer > 0.6) {
        game.refRestart = null;
        game.restartHoldTimer = 0;
        if (game.coach) {
          game.coach.whistleTimer = Math.max(game.coach.whistleTimer ?? 0, 0.38);
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
  const applyGoalTopNetBounce = (teamSign, prevX, prevY, prevZ) => {
    if (game.goalPending?.team === teamSign && game.goalPending.confirmed) {
      return false;
    }
    const currentY = game.ball.position.y;
    if (prevY <= goalRoofY + 0.02 || currentY > goalRoofY + 0.02 || game.ballVel.y >= 0) {
      return false;
    }
    const yTravel = currentY - prevY;
    if (Math.abs(yTravel) < 0.0001) return false;

    const crossT = THREE.MathUtils.clamp((goalRoofY - prevY) / yTravel, 0, 1);
    const crossX = THREE.MathUtils.lerp(prevX, game.ball.position.x, crossT);
    const crossDepth = THREE.MathUtils.lerp(prevZ * teamSign, game.ball.position.z * teamSign, crossT);
    const insideRoofWidth = Math.abs(crossX) <= goalHalfWidth;
    const insideRoofDepth = crossDepth >= goalLine - FOOTBALL_BALL_RADIUS * 0.15
      && crossDepth <= goalBackZ + FOOTBALL_BALL_RADIUS * 0.4;
    if (!insideRoofWidth || !insideRoofDepth) {
      return false;
    }

    game.ball.position.x = THREE.MathUtils.clamp(crossX, -goalHalfWidth + 0.08, goalHalfWidth - 0.08);
    game.ball.position.y = goalRoofY + 0.01;
    game.ball.position.z = teamSign * THREE.MathUtils.clamp(
      Math.max(crossDepth + 0.34, FOOTBALL_FIELD_HALF_LENGTH + FOOTBALL_BALL_RADIUS * 0.7),
      FOOTBALL_FIELD_HALF_LENGTH + FOOTBALL_BALL_RADIUS * 0.45,
      goalBackZ + 0.12
    );
    game.ballVel.x *= 0.78;
    game.ballVel.z = teamSign * Math.max(Math.abs(game.ballVel.z) * 0.86, 1.42);
    game.ballVel.y = Math.max(0.46, Math.abs(game.ballVel.y) * 0.2);
    game.overGoalNetTeam = teamSign;
    game.overGoalNetTimer = Math.max(game.overGoalNetTimer ?? 0, 2.4);
    if (game.goalPending && !game.goalPending.confirmed && game.goalPending.team === teamSign) {
      game.goalPending = null;
    }
    return true;
  };
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
    if ((game.overGoalNetTimer ?? 0) > 0.001 && game.overGoalNetTeam === teamSign) {
      return false;
    }
    const goalDepth = game.ball.position.z * teamSign;
    if (goalDepth < goalLine || Math.abs(game.ball.position.x) > goalHalfWidth || game.ball.position.y > FOOTBALL_GOAL_HEIGHT + FOOTBALL_BALL_RADIUS * 0.6) {
      return false;
    }

    const goalState = game.goalPending?.team === teamSign ? game.goalPending : null;
    if (goalState) {
      goalState.timer += dt;
      if (goalState.confirmed && goalDepth >= goalScorePlane + 0.46) {
        goalState.deepInside = true;
      }
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

    const settledInGoal = Boolean(goalState?.crossedLine)
      && goalDepth >= goalScorePlane + 0.24
      && goalDepth < goalBackZ - 0.02
      && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.06
      && Math.abs(game.ballVel.y) < 0.12
      && Math.hypot(game.ballVel.x, game.ballVel.z) < 0.52
      && (goalState?.timer ?? 0) > 0.16;
    if (settledInGoal) {
      goalState.settled = true;
      goalState.netHit = true;
    }

    const stoppedAfterBackNet = Boolean(goalState?.crossedLine)
      && Boolean(goalState?.deepInside)
      && goalDepth >= goalScorePlane + 0.38
      && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.08
      && Math.abs(game.ballVel.y) < 0.1
      && Math.hypot(game.ballVel.x, game.ballVel.z) < 0.34
      && (goalState?.timer ?? 0) > 0.2;
    if (stoppedAfterBackNet) {
      goalState.settled = true;
      goalState.netHit = true;
    }

    return true;
  };
  const kickoffLocked = game.restartHoldTimer > 0.001 || Boolean(game.refRestart?.active && game.refRestart.phase !== "clear");
  const ballMotionLocked = game.restartHoldTimer > 0.001
    || (game.refRestart?.active && game.refRestart.phase !== "toBall" && game.refRestart.phase !== "clear");
  if (ballMotionLocked) {
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

    const redTopNetBounce = applyGoalTopNetBounce(1, prevBallX, prevBallY, prevBallZ);
    const blueTopNetBounce = !redTopNetBounce && applyGoalTopNetBounce(-1, prevBallX, prevBallY, prevBallZ);
    const redGoalScored = !redTopNetBounce && detectGoalLineScore(1, prevBallX, prevBallY, prevBallZ);
    const blueGoalScored = !redTopNetBounce && !blueTopNetBounce && !redGoalScored && detectGoalLineScore(-1, prevBallX, prevBallY, prevBallZ);
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
    if (game.refRestart?.active && game.refRestart.phase === "toBall") {
      game.refRestart.ballX = game.ball.position.x;
      game.refRestart.ballZ = game.ball.position.z;
    }
  }
  const ballOutsideField = !game.goalPending
    && (
      Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH
      || Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH
    );

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
      const targetX = support.runner.root.position.x + support.vx * 0.18;
      const targetZ = support.runner.root.position.z + support.vz * 0.18 + taker.team * 0.45;
      const takerBallDist = Math.hypot(
        game.ball.position.x - taker.runner.root.position.x,
        game.ball.position.z - taker.runner.root.position.z
      );
      const takerReady = takerBallDist < ATHLETE_BALL_REACH + 0.16;
      const runUpWindow = game.kickoffScriptTimer <= 0.46;
      const prepWindow = game.kickoffScriptTimer <= 0.12;
      const kickWindow = game.kickoffScriptTimer <= 0.035;
      game.ballVel.set(0, 0, 0);
      if (runUpWindow && takerReady && prepWindow) {
        taker.kickSide = getFootballFootedness(taker, game.ball, targetX).kickSide;
        applyFootballKickContact(taker, game.ball);
        triggerFootballKickPose(taker, game.ball, kickWindow ? 0.86 : 0.58, targetX);
      }
      if (kickWindow && takerReady) {
        const passDx = targetX - game.ball.position.x;
        const passDz = targetZ - game.ball.position.z;
        const kickoffPassLen = Math.max(0.001, Math.hypot(passDx, passDz));
        taker.kickSide = getFootballFootedness(taker, game.ball, targetX).kickSide;
        applyFootballKickContact(taker, game.ball);
        setFootballBallVelocity(game, passDx, passDz, 4.9 + Math.random() * 0.45, 0.22 + Math.random() * 0.08);
        taker.kickCooldown = 0.72;
        triggerFootballKickPose(taker, game.ball, 1.06, targetX);
        registerBallTouch(game, taker.team, taker);
        game.deliveryType = "pass";
        game.deliveryTeam = taker.team;
        game.deliveryTimer = 0.42 + Math.min(0.2, kickoffPassLen * 0.05);
        game.deliverySource = taker;
        game.deliveryTarget = support;
        game.kickoffReceiver = support;
        game.kickoffReleaseTimer = 0.34 + Math.min(0.18, kickoffPassLen * 0.04);
        game.firstTouchPlayer = support;
        game.firstTouchTimer = 0.32;
        game.touchShieldPlayer = support;
        game.touchShieldTimer = 0.24;
        game.duelControlPlayer = null;
        game.duelControlTimer = 0;
        game.contestOwnerPlayer = null;
        game.contestOwnerTimer = 0;
        game.contestTouchTimer = 0;
        game.contestHardLockTimer = 0;
        game.kickoffScriptTimer = 0;
        game.kickoffContestTimer = Math.min(game.kickoffContestTimer ?? 0, 0.9);
      } else if (!takerReady) {
        // Hold the scripted kickoff until the taker actually reaches the ball,
        // but once they are ready, let the timer continue to the kick.
        game.kickoffScriptTimer = Math.max(game.kickoffScriptTimer, 0.26);
      }
    } else {
      game.kickoffScriptTimer = 0;
    }
  }

  if (!ballOutsideField) {
    for (let i = 0; i < game.players.length; i += 1) {
      const keeper = game.players[i];
      if (keeper.role !== "keeper") continue;
      if (game.goalPending?.team === -keeper.team) continue;
      const keeperGoalZ = -keeper.team * goalLine;
      const keeperLineZ = keeperGoalZ + keeper.team * 0.44;
      const ballToKeeper = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z);
      const ballNearGoalMouth = (keeper.team * (game.ball.position.z - keeperGoalZ)) > -4.4 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.86;
      const ballLooseInBox = ballNearGoalMouth && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT && ballToKeeper < 2.6;
      if (ballLooseInBox && game.ballVel.length() < 4.4 && keeper.saveCooldown <= 0.22) {
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
        keeper.diveBlend = Math.max(keeper.diveBlend, 0.84);
        keeper.saveLift = Math.max(keeper.saveLift, 0.42);
        keeper.saveHeight = 0.62;
        continue;
      }
      const incoming = game.ballVel.z * keeper.team < -0.16;
      if (!incoming || Math.abs(game.ball.position.x) > goalHalfWidth + 1.24) continue;
      const planeTime = Math.abs(game.ballVel.z) > 0.001 ? (keeperLineZ - game.ball.position.z) / game.ballVel.z : Infinity;
      const predictedX = Number.isFinite(planeTime)
        ? game.ball.position.x + game.ballVel.x * THREE.MathUtils.clamp(planeTime, 0, 0.5)
        : game.ball.position.x;
      const predictedY = Number.isFinite(planeTime)
        ? game.ball.position.y + game.ballVel.y * THREE.MathUtils.clamp(planeTime, 0, 0.5) - 0.5 * FOOTBALL_BALL_GRAVITY * Math.pow(THREE.MathUtils.clamp(planeTime, 0, 0.5), 2)
        : game.ball.position.y;
      const closeEnough = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z) < 2.36 * ARCADE_KEEPER_NERF;
      const cutsLane = planeTime > 0 && planeTime < 0.84 && Math.abs(predictedX - keeper.runner.root.position.x) < 2.42 * ARCADE_KEEPER_NERF;
      const parrySide = Math.sign(predictedX - keeper.runner.root.position.x || game.ball.position.x - keeper.runner.root.position.x || 1);
      if ((closeEnough || cutsLane) && predictedY <= FOOTBALL_GOAL_HEIGHT * 1.04 && keeper.saveCooldown <= 0.04) {
        const deflectX = THREE.MathUtils.clamp((game.ball.position.x - keeper.runner.root.position.x) * 1.95 + (Math.random() - 0.5) * 0.95, -3.1, 3.1);
        const deflectZ = keeper.team * (3.1 + Math.random() * 1.15);
        const deflectPower = 3.45 + Math.min(1.7, game.ballVel.length() * 0.46);
        game.ball.position.x = THREE.MathUtils.clamp(keeper.runner.root.position.x + parrySide * (0.54 + Math.min(0.26, Math.abs(predictedX - keeper.runner.root.position.x) * 0.4)), -FOOTBALL_GOAL_WIDTH * 0.56, FOOTBALL_GOAL_WIDTH * 0.56);
        game.ball.position.z = keeperLineZ + keeper.team * 0.06;
        setFootballBallVelocity(
          game,
          deflectX + parrySide * (0.8 + Math.random() * 0.7),
          deflectZ,
          deflectPower + 0.48,
          1.72 + Math.random() * 0.82
        );
        keeper.saveCooldown = 0.88;
        keeper.diveDir = parrySide;
        keeper.diveBlend = 1;
        keeper.saveLift = THREE.MathUtils.clamp(0.66 + predictedY * 0.18 + Math.min(0.22, Math.abs(predictedX - keeper.runner.root.position.x) * 0.1), 0.66, 1.12);
        keeper.saveHeight = THREE.MathUtils.clamp(predictedY / Math.max(0.001, FOOTBALL_GOAL_HEIGHT) + 0.14, 0.42, 1);
      }
    }
  }
  if (finalizeFootballGoalScore(game, startGoalCelebration, updateScoreboard)) {
    return { ballOutsideField, kickoffLocked, scored: true };
  }

  return { ballOutsideField, goalLine, kickoffLocked, scored: false };
}

export function updateFootballLateGoalCheckRuntime(game, deps) {
  const { prevBallState = null, startGoalCelebration, updateScoreboard } = deps;
  const lateGoalState = getFootballLateGoalFallbackState(game, prevBallState);
  if (lateGoalState) {
    game.goalPending = lateGoalState;
  }
  return finalizeFootballGoalScore(game, startGoalCelebration, updateScoreboard);
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
  const scriptedKickoffActive = !kickoffLocked
    && (game.kickoffScriptTimer ?? 0) > 0.001
    && (game.restartTeam ?? 0) !== 0;
  const kickoffReleaseActive = !scriptedKickoffActive
    && (game.kickoffReleaseTimer ?? 0) > 0.001
    && Boolean(game.kickoffReceiver);

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
  const incumbentHolder = !kickoffReleaseActive && controllableBall
    && game.ballHolder
    && game.ballHolder.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.ballHolder.runner.root.position.x, game.ball.position.z - game.ballHolder.runner.root.position.z) < ATHLETE_BALL_REACH + 0.78
    && game.ballVel.length() < 6.4
      ? game.ballHolder
      : null;
  const recentTouchHolder = !kickoffReleaseActive && controllableBall
    && game.lastTouchPlayer
    && game.lastTouchPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.lastTouchPlayer.runner.root.position.x, game.ball.position.z - game.lastTouchPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 0.52
    && game.ballVel.length() < 5.6
      ? game.lastTouchPlayer
      : null;
  const protectedTouchHolder = !kickoffReleaseActive && controllableBall
    && game.touchShieldPlayer
    && game.touchShieldPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.touchShieldPlayer.runner.root.position.x, game.ball.position.z - game.touchShieldPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 0.98
    && game.ballVel.length() < 6.9
      ? game.touchShieldPlayer
      : null;
  if (protectedTouchHolder) {
    const holderDist = Math.hypot(game.ball.position.x - protectedTouchHolder.runner.root.position.x, game.ball.position.z - protectedTouchHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-protectedTouchHolder.team];
    if (
      holderDist <= nearestOpponentDist + 1.24
      || (game.touchShieldTimer ?? 0) > 0.1
      || (game.firstTouchPlayer === protectedTouchHolder && (game.firstTouchTimer ?? 0) > 0.001)
    ) {
      controllingTeam = protectedTouchHolder.team;
      ballHolder = protectedTouchHolder;
    }
  }
  if (incumbentHolder) {
    const holderDist = Math.hypot(game.ball.position.x - incumbentHolder.runner.root.position.x, game.ball.position.z - incumbentHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-incumbentHolder.team];
    if (
      holderDist <= nearestOpponentDist + 0.78
      || game.touchShieldPlayer === incumbentHolder
      || game.lastTouchPlayer === incumbentHolder
    ) {
      controllingTeam = incumbentHolder.team;
      ballHolder = incumbentHolder;
    }
  }
  const contestOwnerHolder = !kickoffReleaseActive && controllableBall
    && game.contestOwnerPlayer
    && game.contestOwnerPlayer.role !== "keeper"
    && Math.hypot(game.ball.position.x - game.contestOwnerPlayer.runner.root.position.x, game.ball.position.z - game.contestOwnerPlayer.runner.root.position.z) < ATHLETE_BALL_REACH + 1.02
    && game.ballVel.length() < 5.6
      ? game.contestOwnerPlayer
      : null;
  if (contestOwnerHolder) {
    const holderDist = Math.hypot(game.ball.position.x - contestOwnerHolder.runner.root.position.x, game.ball.position.z - contestOwnerHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-contestOwnerHolder.team];
    if (holderDist <= nearestOpponentDist + 1.28 || (game.contestOwnerTimer ?? 0) > 0.12) {
      controllingTeam = contestOwnerHolder.team;
      ballHolder = contestOwnerHolder;
    }
  }
  if (recentTouchHolder) {
    const holderDist = Math.hypot(game.ball.position.x - recentTouchHolder.runner.root.position.x, game.ball.position.z - recentTouchHolder.runner.root.position.z);
    const nearestOpponentDist = closestDist[-recentTouchHolder.team];
    if (holderDist <= nearestOpponentDist + 0.54) {
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
  if (scriptedKickoffActive) {
    controllingTeam = game.restartTeam || controllingTeam;
    ballHolder = null;
  } else if (kickoffReleaseActive) {
    const receiver = game.kickoffReceiver;
    const receiverDist = receiver
      ? Math.hypot(game.ball.position.x - receiver.runner.root.position.x, game.ball.position.z - receiver.runner.root.position.z)
      : Infinity;
    controllingTeam = receiver?.team ?? (game.restartTeam || controllingTeam);
    ballHolder = controllableBall && receiver && receiverDist < ATHLETE_BALL_REACH + 0.22
      ? receiver
      : null;
  }
  const playableBall = ballHeightAboveGround <= FOOTBALL_BALL_VOLLEY_HEIGHT && (ballHeightAboveGround <= FOOTBALL_BALL_CONTROL_HEIGHT || game.ballVel.y <= 0.45);
  const activeBallPlayer = scriptedKickoffActive
    ? null
    : kickoffReleaseActive
      ? (() => {
          const receiver = game.kickoffReceiver;
          if (!playableBall || !receiver) return null;
          const receiverDist = Math.hypot(
            game.ball.position.x - receiver.runner.root.position.x,
            game.ball.position.z - receiver.runner.root.position.z
          );
          return receiverDist < ATHLETE_BALL_REACH + 0.42 ? receiver : null;
        })()
      : playableBall && (ballHolder ?? (closestAnyPlayer && closestAnyDist < ATHLETE_BALL_REACH + 0.12 ? closestAnyPlayer : null));
  const looseBallStuck = !kickoffLocked
    && !scriptedKickoffActive
    && !kickoffReleaseActive
    && !ballHolder
    && controllableBall
    && game.ballVel.length() < 0.55
    && closestAnyDist > ATHLETE_BALL_REACH + 0.46;
  if (looseBallStuck) {
    game.looseBallStallTimer = Math.min(2.4, (game.looseBallStallTimer ?? 0) + dt);
  } else {
    game.looseBallStallTimer = Math.max(0, (game.looseBallStallTimer ?? 0) - dt * 2.8);
  }
  const duelRed = closestToBall[1];
  const duelBlue = closestToBall[-1];
  const validDuelPair = duelRed
    && duelBlue
    && duelRed !== duelBlue
    && duelRed.role !== "keeper"
    && duelBlue.role !== "keeper";
  const duelRedDist = validDuelPair
    ? Math.hypot(game.ball.position.x - duelRed.runner.root.position.x, game.ball.position.z - duelRed.runner.root.position.z)
    : Infinity;
  const duelBlueDist = validDuelPair
    ? Math.hypot(game.ball.position.x - duelBlue.runner.root.position.x, game.ball.position.z - duelBlue.runner.root.position.z)
    : Infinity;
  const duelPairDist = validDuelPair
    ? Math.hypot(duelRed.runner.root.position.x - duelBlue.runner.root.position.x, duelRed.runner.root.position.z - duelBlue.runner.root.position.z)
    : Infinity;
  const duelSpeed = validDuelPair
    ? (Math.hypot(duelRed.vx, duelRed.vz) + Math.hypot(duelBlue.vx, duelBlue.vz)) * 0.5
    : Infinity;
  const duelStuck = !kickoffLocked
    && !scriptedKickoffActive
    && !kickoffReleaseActive
    && !game.goalPending
    && !game.refRestart?.active
    && controllableBall
    && validDuelPair
    && duelRedDist < ATHLETE_BALL_REACH + 0.46
    && duelBlueDist < ATHLETE_BALL_REACH + 0.46
    && duelPairDist < 1.12
    && game.ballVel.length() < 0.92
    && duelSpeed < 0.82;
  let duelThirdPlayer = null;
  let duelThirdDist = Infinity;
  let duelFourthPlayer = null;
  let duelFourthDist = Infinity;
  if (validDuelPair) {
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      if (p.role === "keeper" || p === duelRed || p === duelBlue) continue;
      const dist = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
      if (dist < duelThirdDist) {
        duelFourthPlayer = duelThirdPlayer;
        duelFourthDist = duelThirdDist;
        duelThirdPlayer = p;
        duelThirdDist = dist;
      } else if (dist < duelFourthDist) {
        duelFourthPlayer = p;
        duelFourthDist = dist;
      }
    }
  }
  if (duelStuck) {
    game.duelStallTimer = Math.min(2, (game.duelStallTimer ?? 0) + dt);
  } else {
    game.duelStallTimer = Math.max(0, (game.duelStallTimer ?? 0) - dt * 3.2);
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
  if ((game.duelStallTimer ?? 0) > 0.22 && validDuelPair) {
    let rescuer = duelThirdPlayer;
    if (
      duelFourthPlayer
      && duelFourthDist < duelThirdDist + 0.24
      && Math.abs(duelFourthPlayer.runner.root.position.x - game.ball.position.x) < Math.abs((duelThirdPlayer?.runner.root.position.x ?? 0) - game.ball.position.x)
    ) {
      rescuer = duelFourthPlayer;
    }
    if (!rescuer) {
      rescuer = duelRedDist <= duelBlueDist ? duelRed : duelBlue;
    }
    let spreadX = duelBlue.runner.root.position.x - duelRed.runner.root.position.x;
    let spreadZ = duelBlue.runner.root.position.z - duelRed.runner.root.position.z;
    const spreadLen = Math.hypot(spreadX, spreadZ);
    if (spreadLen > 0.001) {
      spreadX /= spreadLen;
      spreadZ /= spreadLen;
    } else {
      spreadX = 1;
      spreadZ = 0;
    }
    duelRed.runner.root.position.x -= spreadX * 0.12;
    duelRed.runner.root.position.z -= spreadZ * 0.12;
    duelBlue.runner.root.position.x += spreadX * 0.12;
    duelBlue.runner.root.position.z += spreadZ * 0.12;
    duelRed.vx -= spreadX * 0.42;
    duelRed.vz -= spreadZ * 0.42;
    duelBlue.vx += spreadX * 0.42;
    duelBlue.vz += spreadZ * 0.42;
    const rescueTargetX = THREE.MathUtils.clamp(
      game.ball.position.x + Math.sign((rescuer.runner.root.position.x - game.ball.position.x) || (rescuer.laneBias ?? 0) || 1) * 0.12,
      -FOOTBALL_FIELD_HALF_WIDTH + 0.6,
      FOOTBALL_FIELD_HALF_WIDTH - 0.6
    );
    const rescueTargetZ = THREE.MathUtils.clamp(
      game.ball.position.z - rescuer.team * 0.18,
      -FOOTBALL_FIELD_HALF_LENGTH + 0.6,
      FOOTBALL_FIELD_HALF_LENGTH - 0.6
    );
    rescuer.runner.root.position.x = THREE.MathUtils.lerp(rescuer.runner.root.position.x, rescueTargetX, 0.72);
    rescuer.runner.root.position.z = THREE.MathUtils.lerp(rescuer.runner.root.position.z, rescueTargetZ, 0.72);
    const escapeX = THREE.MathUtils.clamp(
      game.ball.position.x + (rescuer.laneBias ?? 0) * 1.1 + spreadX * 0.9,
      -FOOTBALL_FIELD_HALF_WIDTH * 0.9,
      FOOTBALL_FIELD_HALF_WIDTH * 0.9
    );
    const escapeZ = rescuer.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.34 + Math.random() * 0.16));
    const escapeDx = escapeX - game.ball.position.x;
    const escapeDz = escapeZ - game.ball.position.z;
    rescuer.kickSide = getFootballFootedness(rescuer, game.ball, escapeX).kickSide;
    applyFootballKickContact(rescuer, game.ball);
    setFootballBallVelocity(game, escapeDx, escapeDz, 5.2 + Math.random() * 1.5, 0.18 + Math.random() * 0.18);
    rescuer.kickCooldown = Math.max(rescuer.kickCooldown ?? 0, 0.44);
    triggerFootballKickPose(rescuer, game.ball, 0.98, escapeX);
    registerBallTouch(game, rescuer.team, rescuer);
    controllingTeam = rescuer.team;
    ballHolder = null;
    game.deliveryType = null;
    game.deliveryTeam = 0;
    game.deliveryTimer = 0;
    game.deliverySource = null;
    game.deliveryTarget = null;
    game.duelStallTimer = 0;
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

