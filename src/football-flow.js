import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_RADIUS,
  COACH_PERSON_RADIUS,
  FOOTBALL_CENTER_CIRCLE_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_PERSON_RADIUS,
  GOAL_CELEBRATION_DURATION,
  GOAL_OVERLAY_DURATION
} from "./game-config.js";
import {
  applyFootballRefCarryPose,
  getFootballRefBallRecoveryTargetRuntime,
  getFootballRefCarryWorldPosition,
  getFootballRefPickupReachRuntime,
  getFootballRefPickupTargetRuntime,
  getFootballRefTravelTargetRuntime
} from "./football-referee-runtime.js";
import {
  setElementStylePropertyIfChanged,
  setScoreboardLineView
} from "./football-presentation.js";

const FOOTBALL_CELEBRATION_CARRY_WORLD = new THREE.Vector3();

function isInsideFootballCelebrationGoalPocket(x, z) {
  const side = Math.sign(z || 0);
  if (side === 0) return false;
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const depth = z * side;
  return depth > goalLine + 0.06
    && depth < goalLine + FOOTBALL_GOAL_DEPTH - 0.12
    && Math.abs(x) < FOOTBALL_GOAL_WIDTH * 0.5 - 0.12;
}

function isBetterFootballKickoffCandidate(centerDist, forwardBias, bestCenterDist, bestForwardBias) {
  return centerDist < bestCenterDist || (centerDist === bestCenterDist && forwardBias < bestForwardBias);
}

export function getFootballKickoffReadyPlayers(game) {
  const kickoffTeam = game.kickoffTeam || game.restartTeam || 0;
  if (kickoffTeam === 0) {
    return { taker: null, support: null, presser: null };
  }

  let taker = null;
  let takerCenterDist = Infinity;
  let takerForwardBias = Infinity;
  let support = null;
  let supportCenterDist = Infinity;
  let supportForwardBias = Infinity;
  let presser = null;
  let presserCenterDist = Infinity;
  let presserForwardBias = Infinity;

  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    if (player.role === "keeper") continue;
    const targetX = player.home.x;
    const targetZ = player.home.z;
    const centerDist = Math.hypot(targetX, targetZ);
    const forwardBias = Math.abs(targetZ);
    if (player.team === kickoffTeam) {
      if (isBetterFootballKickoffCandidate(centerDist, forwardBias, takerCenterDist, takerForwardBias)) {
        taker = player;
        takerCenterDist = centerDist;
        takerForwardBias = forwardBias;
      }
    } else if (isBetterFootballKickoffCandidate(centerDist, forwardBias, presserCenterDist, presserForwardBias)) {
      presser = player;
      presserCenterDist = centerDist;
      presserForwardBias = forwardBias;
    }
  }

  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    if (player.team !== kickoffTeam || player.role === "keeper" || player === taker) continue;
    const targetX = player.home.x;
    const targetZ = player.home.z;
    const centerDist = Math.hypot(targetX, targetZ);
    const forwardBias = Math.abs(targetZ);
    if (isBetterFootballKickoffCandidate(centerDist, forwardBias, supportCenterDist, supportForwardBias)) {
      support = player;
      supportCenterDist = centerDist;
      supportForwardBias = forwardBias;
    }
  }

  return { taker, support, presser };
}

function getFootballGoalScorerFallback(players, scoringTeam) {
  let fallbackAttacker = null;
  let fallbackPlayer = null;
  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    if (player.team !== scoringTeam) continue;
    if (!fallbackPlayer) fallbackPlayer = player;
    if (!fallbackAttacker && player.role === "attacker") fallbackAttacker = player;
    if (fallbackAttacker && fallbackPlayer) break;
  }
  return fallbackAttacker ?? fallbackPlayer;
}

export function getFootballKickoffTargetFlow(game, player) {
  const kickoffTeam = game.kickoffTeam || game.restartTeam || 0;
  const placementMode = game.kickoffPlacementMode || "live";
  if (kickoffTeam === 0) {
    return {
      x: player.home.x,
      z: player.home.z,
      yaw: player.homeYaw ?? (player.team === 1 ? 0 : Math.PI)
    };
  }

  const ownHalfZLimit = player.team === 1 ? -0.28 : 0.28;
  const scatterX = player.restartScatterX ?? (player.roamX ?? 0) * 1.8;
  const scatterZ = player.restartScatterZ ?? (player.roamZ ?? 0) * 1.45;
  const kickoffReady = getFootballKickoffReadyPlayers(game);
  const isKickoffTaker = player === kickoffReady.taker;
  const isKickoffSupport = player === kickoffReady.support;
  const isKickoffPresser = player === kickoffReady.presser;
  let x = player.home.x + scatterX * 0.55;
  let z = player.home.z + scatterZ * 0.48;
  const yaw = player.homeYaw ?? (player.team === 1 ? 0 : Math.PI);

  if (player.team === kickoffTeam) {
    if (isKickoffTaker) {
      x = 0;
      z = -player.team * (FOOTBALL_CENTER_CIRCLE_RADIUS + (placementMode === "reset" ? 0.92 : 0.22));
    } else if (isKickoffSupport) {
      x = THREE.MathUtils.clamp(Math.sign(player.home.x || -player.team || 1) * 1.65 + scatterX * 0.18, -3.2, 3.2);
      z = -player.team * (FOOTBALL_CENTER_CIRCLE_RADIUS + (placementMode === "reset" ? 1.42 : 1.08)) + scatterZ * 0.08;
    } else {
      x = player.home.x * 0.72 + scatterX * 1.25;
      z = player.home.z * 0.66 + scatterZ * 1.12;
      z = player.team === 1 ? Math.min(z, ownHalfZLimit) : Math.max(z, ownHalfZLimit);
    }
    if (placementMode === "reset") {
      const centerDist = Math.hypot(x, z);
      const stagingKeepoutRadius = isKickoffSupport
        ? FOOTBALL_CENTER_CIRCLE_RADIUS + 0.8
        : FOOTBALL_CENTER_CIRCLE_RADIUS * 0.72;
      if (centerDist < stagingKeepoutRadius) {
        const nx = x === 0 && z === 0 ? (player.home.x === 0 ? 1 : Math.sign(player.home.x)) : x / Math.max(0.001, centerDist);
        const nz = x === 0 && z === 0 ? -player.team : z / Math.max(0.001, centerDist);
        x = nx * stagingKeepoutRadius;
        z = nz * stagingKeepoutRadius;
        z = player.team === 1 ? Math.min(z, -0.7) : Math.max(z, 0.7);
      }
    }
  } else {
    if (isKickoffPresser) {
      x = Math.sign(player.home.x || player.team || 1) * 1.35;
      z = -player.team * (FOOTBALL_CENTER_CIRCLE_RADIUS + (placementMode === "reset" ? 1.18 : 0.94));
    } else {
      x = player.home.x * 0.74 + scatterX * 1.28;
      z = player.home.z * 0.68 + scatterZ * 1.14;
      z = player.team === 1 ? Math.min(z, ownHalfZLimit) : Math.max(z, ownHalfZLimit);
      const centerDist = Math.hypot(x, z);
      const keepoutRadius = FOOTBALL_CENTER_CIRCLE_RADIUS + 0.45;
      if (centerDist < keepoutRadius) {
        const nx = x === 0 && z === 0 ? (player.home.x === 0 ? 1 : Math.sign(player.home.x)) : x / Math.max(0.001, centerDist);
        const nz = x === 0 && z === 0 ? -player.team : z / Math.max(0.001, centerDist);
        x = nx * keepoutRadius;
        z = nz * keepoutRadius;
        z = player.team === 1 ? Math.min(z, ownHalfZLimit) : Math.max(z, ownHalfZLimit);
      }
    }
  }

  return { x, z, yaw };
}

export function resetFootballKickoffFlow(game, snapPlayers = true, clearCelebration = true, deps) {
  const {
    audioSystem,
    resetFootballBall,
    updateScoreboard,
    setGoalOverlayState,
    getFootballKickoffTarget
  } = deps;
  const kickoffTeam = game.kickoffTeam || 0;
  const kickoffBallSpot = {
    x: game.kickoffBallSpot?.x ?? 0,
    z: game.kickoffBallSpot?.z ?? 0
  };
  resetFootballBall(game);
  game.attackingTeam = 0;
  game.lastControllingTeam = 0;
  game.counterTeam = 0;
  game.counterTimer = 0;
  game.counterRunner = null;
  if (clearCelebration) game.celebration = null;
  game.kickoffPlacementMode = "reset";
  game.restartTeam = kickoffTeam;
  game.restartHoldTimer = 0;
  game.kickoffContestTimer = 0;
  game.kickoffScriptTimer = 0;
  game.kickoffReleaseTimer = 0;
  game.kickoffReceiver = null;
  if (game.coach) {
    game.coach.lastBallHolder = null;
    game.coach.lastControllingTeam = 0;
    game.coach.routeWaypoint = null;
  }
  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    p.routeWaypoint = null;
    p.restartScatterX = (Math.random() - 0.5) * (p.role === "attacker" ? 7.4 : p.role === "keeper" ? 0.5 : 5.8);
    p.restartScatterZ = (Math.random() - 0.5) * (p.role === "attacker" ? 4.4 : p.role === "keeper" ? 0.35 : 3.3);
    const kickoffTarget = getFootballKickoffTarget(game, p);
    if (snapPlayers) {
      p.runner.root.position.x = kickoffTarget.x;
      p.runner.root.position.z = kickoffTarget.z;
      p.runner.root.rotation.y = kickoffTarget.yaw;
    }
    p.vx = 0;
    p.vz = 0;
    p.kickBlend = 0;
    if (kickoffTeam !== 0 && p.role === "attacker" && p.team === kickoffTeam) p.kickCooldown = 0.16 + Math.random() * 0.12;
    else if (kickoffTeam !== 0 && p.role === "attacker") p.kickCooldown = 0.52 + Math.random() * 0.16;
    else p.kickCooldown = (kickoffTeam !== 0 ? 0.7 : 0.28) + Math.random() * (kickoffTeam !== 0 ? 0.18 : 0.45);
    p.sprintBlend = 0;
    p.burstTimer = 0;
    p.burstCooldown = 0.55 + Math.random() * 1.2;
    p.goalRunTimer = 0;
    p.goalRunCooldown = 0.8 + Math.random() * 2.2;
    p.goalRunTargetX = p.home.x;
    p.goalRunTargetZ = p.home.z;
    p.oneTwoTimer = 0;
    p.oneTwoCooldown = 0;
    p.oneTwoTargetX = p.home.x;
    p.oneTwoTargetZ = p.home.z;
    p.oneTwoPartner = null;
    p.oneTwoReturnTimer = 0;
    p.oneTwoReturnTarget = null;
    p.bangerCooldown = 1.5 + Math.random() * 4.2;
    p.saveCooldown = 0;
    p.saveLift = 0;
    p.diveDir = 0;
    p.diveBlend = 0;
    p.commitForwardTimer = 0;
    p.commitTargetX = kickoffTarget.x;
    p.commitTargetZ = kickoffTarget.z;
    p.shapeTargetX = kickoffTarget.x;
    p.shapeTargetZ = kickoffTarget.z;
    p.roamX = p.role === "attacker" ? (Math.random() - 0.5) * 1.9 : (Math.random() - 0.5) * 1.1;
    p.roamZ = p.role === "attacker" ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.5) * 0.8;
    p.kickoffRole = "shape";
    p.kickoffRank = 99;
    p.kickoffTargetX = kickoffTarget.x;
    p.kickoffTargetZ = kickoffTarget.z;
  }
  if (kickoffTeam !== 0) {
    const kickoffReady = getFootballKickoffReadyPlayers(game);
    const kickoffTaker = kickoffReady.taker;
    const kickoffSupport = kickoffReady.support;
    const kickoffPresser = kickoffReady.presser;
    if (kickoffTaker) {
      kickoffTaker.kickoffRole = "taker";
      kickoffTaker.kickoffRank = 0;
    }
    if (kickoffSupport) {
      kickoffSupport.kickoffRole = "support";
      kickoffSupport.kickoffRank = 1;
    }
    if (kickoffPresser) {
      kickoffPresser.kickoffRole = "press";
      kickoffPresser.kickoffRank = 0;
    }
    for (let i = 0; i < game.players.length; i += 1) {
      const player = game.players[i];
      const kickoffTarget = getFootballKickoffTarget(game, player);
      player.kickoffTargetX = kickoffTarget.x;
      player.kickoffTargetZ = kickoffTarget.z;
      player.commitTargetX = kickoffTarget.x;
      player.commitTargetZ = kickoffTarget.z;
      player.shapeTargetX = kickoffTarget.x;
      player.shapeTargetZ = kickoffTarget.z;
      if (snapPlayers) {
        player.runner.root.position.x = kickoffTarget.x;
        player.runner.root.position.z = kickoffTarget.z;
        player.runner.root.rotation.y = kickoffTarget.yaw;
      }
    }
  }
  if (kickoffTeam !== 0) {
    const kickoffBallDistFromCenter = Math.hypot(kickoffBallSpot.x, kickoffBallSpot.z);
    game.refRestart = {
      active: true,
      phase: kickoffBallDistFromCenter > 0.45 ? "toBall" : "toCenter",
      kind: "kickoff",
      ballX: kickoffBallSpot.x,
      ballZ: kickoffBallSpot.z,
      placeX: 0,
      placeZ: 0,
      timer: 0
    };
    if (game.coach) game.coach.whistleTimer = Math.max(game.coach.whistleTimer ?? 0, 0.58);
    audioSystem?.playKickoffWhistle({ x: 0 });
  } else {
    game.ball.visible = true;
    game.ball.position.set(0, FOOTBALL_BALL_RADIUS, 0);
    game.ballVel.set(0, 0, 0);
  }
  game.kickoffBallSpot = { x: 0, z: 0 };
  game.kickoffTeam = 0;
  setGoalOverlayState(false);
  updateScoreboard(game);
}

export function startGoalCelebrationFlow(game, scoringTeam, scorer, deps) {
  const {
    resetFootballBall,
    setGoalOverlayState,
    startGoalReplay,
    updateScoreboard,
    getFootballPlayerLabel,
    formatGoalOrdinal,
    attackStatus,
    playerStatus
  } = deps;
  const frozenBallX = game.ball.position.x;
  const frozenBallZ = game.ball.position.z;
  game.kickoffBallSpot = { x: frozenBallX, z: frozenBallZ };
  resetFootballBall(game);
  game.ball.visible = true;
  game.ball.position.set(frozenBallX, FOOTBALL_BALL_RADIUS, frozenBallZ);
  const scorerPlayer = scorer ?? getFootballGoalScorerFallback(game.players, scoringTeam) ?? null;
  const scorerX = scorerPlayer?.runner.root.position.x ?? 0;
  const scorerZ = scorerPlayer?.runner.root.position.z ?? (scoringTeam * (FOOTBALL_FIELD_HALF_LENGTH * 0.34));
  const sideSign = scorerX >= 0 ? 1 : -1;
  const zBias = Math.sign(scorerZ || (Math.random() < 0.5 ? -1 : 1));
  const spotX = sideSign * (FOOTBALL_FIELD_HALF_WIDTH - 1.05);
  const inwardX = spotX - sideSign * (2.35 + Math.random() * 0.35);
  const spotZ = THREE.MathUtils.clamp(
    scorerZ + zBias * (2.1 + Math.random() * 2.4),
    -FOOTBALL_FIELD_HALF_LENGTH + 1.25,
    FOOTBALL_FIELD_HALF_LENGTH - 1.25
  );
  game.attackingTeam = 0;
  game.kickoffTeam = -scoringTeam;
  game.kickoffPlacementMode = "reset";
  game.restartHoldTimer = 0;
  game.restartTeam = 0;
  game.celebration = {
    active: true,
    phase: "celebrate",
    timer: GOAL_CELEBRATION_DURATION,
    resetTimer: 0,
    duration: GOAL_CELEBRATION_DURATION,
    team: scoringTeam,
    scorer: scorerPlayer,
    spotX,
    spotZ,
    inwardX,
    sideSign,
    ballX: frozenBallX,
    ballZ: frozenBallZ,
    refHasBall: false,
    refTask: "toBall",
    refTaskTimer: 0,
    refRecovery: null,
    pulse: Math.random() * Math.PI * 2,
    waveSeed: Math.random() * Math.PI * 2,
    orbitSeed: Math.random() * Math.PI * 2
  };
  setGoalOverlayState(true, scorerPlayer, scoringTeam);
  startGoalReplay(game, scorerPlayer, scoringTeam);
  updateScoreboard(game);
  if (attackStatus) {
    setScoreboardLineView(
      attackStatus,
      "scoreboard-attack",
      scoringTeam === 1 ? "scoreboard-attack-red" : "scoreboard-attack-blue",
      "GOAL CELEBRATION"
    );
  }
  if (playerStatus) {
    setScoreboardLineView(
      playerStatus,
      "scoreboard-player",
      scoringTeam === 1 ? "scoreboard-player-red" : "scoreboard-player-blue",
      scorerPlayer ? `Scorer: ${getFootballPlayerLabel(scorerPlayer)} | ${formatGoalOrdinal(scorerPlayer.goalsScored ?? 1)} goal` : "Scorer: unknown"
    );
  }
}

export function updateGoalCelebrationFlow(game, dt, deps) {
  const {
    animateRunner,
    attackStatus,
    clampFootballRefereePosition,
    formatGoalOrdinal,
    getFootballKickoffTarget,
    getFootballPlayerLabel,
    goalOverlay,
    playerStatus,
    resetFootballKickoff,
    resolveFootballPlayerSpacing,
    setGoalOverlayState,
    state,
    steerFootballFacing,
    updateScoreboard
  } = deps;
  const celebration = game.celebration;
  if (!celebration?.active) return false;
  if (!celebration.refHasBall) {
    celebration.ballX = game.ball.position.x;
    celebration.ballZ = game.ball.position.z;
  }

  if (celebration.phase === "awaitKickoff") {
    setElementStylePropertyIfChanged(goalOverlay, "opacity", "0");
    setElementStylePropertyIfChanged(goalOverlay, "display", "none");
    if (attackStatus) {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "", "REFEREE RESTART");
    }
    if (playerStatus) {
      setScoreboardLineView(playerStatus, "scoreboard-player", "", "Kickoff: referee bringing ball in");
    }
    if (!game.refRestart?.active) {
      game.celebration = null;
      updateScoreboard(game);
    }
    return false;
  }

  if (celebration.phase === "celebrate") {
    celebration.timer = Math.max(0, celebration.timer - dt);
    celebration.pulse += dt * 8.2;
  } else if (celebration.phase === "replay") {
    celebration.pulse += dt * 2.4;
  } else if (celebration.phase === "reset") {
    celebration.resetTimer = Math.max(0, (celebration.resetTimer ?? 2.4) - dt);
    celebration.refTaskTimer = (celebration.refTaskTimer ?? 0) + dt;
    if (game.coach) {
      const coachChasingBall = (celebration.refTask ?? "toBall") === "toBall";
      const coachTarget = coachChasingBall
        ? getFootballRefBallRecoveryTargetRuntime(
            game,
            celebration.refRecovery ?? (celebration.refRecovery = { goalRouteKind: null, goalRouteSide: null }),
            game.coach,
            celebration.ballX ?? 0,
            celebration.ballZ ?? 0,
            { clampFootballRefereePosition }
          )
        : getFootballRefTravelTargetRuntime(
            game,
            game.coach,
            0,
            0,
            {
              clampFootballRefereePosition,
              routeState: celebration.refRecovery ?? (celebration.refRecovery = { goalRouteKind: null, goalRouteSide: null }),
              dynamicBlockers: game.players.map((player) => ({
                x: player.runner.root.position.x,
                z: player.runner.root.position.z,
                r: FOOTBALL_PERSON_RADIUS * 0.92
              }))
            }
          );
      const coachTargetX = coachTarget.x;
      const coachTargetZ = coachTarget.z;
      const coachDx = coachTargetX - game.coach.runner.root.position.x;
      const coachDz = coachTargetZ - game.coach.runner.root.position.z;
      const coachDist = Math.hypot(coachDx, coachDz);
      const coachCenterDist = Math.hypot(game.coach.runner.root.position.x, game.coach.runner.root.position.z);
      const coachAtCenterHold = !coachChasingBall && coachCenterDist < 0.48;
      if (coachChasingBall) {
        const coachSpeed = coachDist > 10 ? 7.1 : coachDist > 6 ? 5.9 : coachDist > 3 ? 4.5 : coachDist > 1.2 ? 3.1 : coachDist > 0.24 ? 1.45 : 0;
        const coachVx = coachDist > 0.001 ? (coachDx / coachDist) * coachSpeed : 0;
        const coachVz = coachDist > 0.001 ? (coachDz / coachDist) * coachSpeed : 0;
        game.coach.vx = THREE.MathUtils.damp(game.coach.vx ?? 0, coachVx, 10.5, dt);
        game.coach.vz = THREE.MathUtils.damp(game.coach.vz ?? 0, coachVz, 10.5, dt);
        game.coach.runner.root.position.x += game.coach.vx * dt;
        game.coach.runner.root.position.z += game.coach.vz * dt;
      } else if (coachAtCenterHold) {
        game.coach.runner.root.position.x = 0;
        game.coach.runner.root.position.z = 0;
        game.coach.vx = 0;
        game.coach.vz = 0;
      } else {
        const carryWalkSpeed = coachDist > 6 ? 1.85 : coachDist > 2 ? 1.35 : 0.82;
        const carryStep = Math.min(coachDist, carryWalkSpeed * dt);
        const nx = coachDist > 0.001 ? coachDx / coachDist : 0;
        const nz = coachDist > 0.001 ? coachDz / coachDist : 1;
        game.coach.vx = nx * carryWalkSpeed;
        game.coach.vz = nz * carryWalkSpeed;
        game.coach.runner.root.position.x += nx * carryStep;
        game.coach.runner.root.position.z += nz * carryStep;
      }
      const refClamped = clampFootballRefereePosition(game.coach.runner.root.position.x, game.coach.runner.root.position.z);
      game.coach.runner.root.position.x = refClamped.x;
      game.coach.runner.root.position.z = refClamped.z;
      const postMoveDx = (celebration.ballX ?? 0) - game.coach.runner.root.position.x;
      const postMoveDz = (celebration.ballZ ?? 0) - game.coach.runner.root.position.z;
      const postMoveBallDist = Math.hypot(postMoveDx, postMoveDz);
      const pickupTarget = getFootballRefPickupTargetRuntime(celebration.ballX ?? 0, celebration.ballZ ?? 0);
      const pickupDx = pickupTarget.x - game.coach.runner.root.position.x;
      const pickupDz = pickupTarget.z - game.coach.runner.root.position.z;
      const postMovePickupDist = Math.hypot(pickupDx, pickupDz);
      const refPickupDist = getFootballRefPickupReachRuntime(celebration.ballX ?? 0, celebration.ballZ ?? 0);
      const coachMoveSpeed = Math.hypot(game.coach.vx ?? 0, game.coach.vz ?? 0);
      if (coachChasingBall && coachDist > 0.08) {
        const coachYaw = Math.atan2(coachDx, coachDz);
        game.coach.runner.root.rotation.y = steerFootballFacing(game.coach.runner.root.rotation.y, coachYaw, dt, 7.4);
      } else if (!coachChasingBall && !coachAtCenterHold && coachMoveSpeed > 0.08) {
        const carryYaw = Math.atan2(game.coach.vx ?? 0, game.coach.vz ?? 1);
        game.coach.runner.root.rotation.y = steerFootballFacing(game.coach.runner.root.rotation.y, carryYaw, dt, 3.4);
      }
      game.coach.cycle += dt * (4.2 + coachMoveSpeed * 2.05);
      animateRunner(
        game.coach.runner,
        coachMoveSpeed,
        game.coach.cycle,
        0,
        coachMoveSpeed > 0.12
          ? { sprintAmount: coachChasingBall ? THREE.MathUtils.clamp(coachMoveSpeed / 3.1, 0.52, 1) : THREE.MathUtils.clamp(coachMoveSpeed / 2.1, 0.08, 0.28) }
          : null
      );
      game.coach.runner.leftArm.rotation.z *= 0.72;
      game.coach.runner.rightArm.rotation.z *= 0.72;
      game.coach.runner.torsoPivot.rotation.z *= 0.58;
      game.coach.carryBlend = THREE.MathUtils.damp(game.coach.carryBlend ?? 0, celebration.refHasBall ? 1 : 0, 8.5, dt);
      applyFootballRefCarryPose(game.coach.runner, game.coach.carryBlend ?? 0);
      if (coachChasingBall && Math.min(postMoveBallDist, postMovePickupDist) < refPickupDist) {
        celebration.refHasBall = true;
        celebration.refTask = "toCenter";
        celebration.refTaskTimer = 0;
        celebration.refRecovery = null;
        game.coach.routeWaypoint = null;
      }
    }
  }

  if (game.coach && celebration.phase !== "reset") {
    game.coach.vx = THREE.MathUtils.damp(game.coach.vx ?? 0, 0, 9.5, dt);
    game.coach.vz = THREE.MathUtils.damp(game.coach.vz ?? 0, 0, 9.5, dt);
    game.coach.carryBlend = THREE.MathUtils.damp(game.coach.carryBlend ?? 0, 0, 8.5, dt);
    const lookTargetX = celebration.phase === "celebrate"
      ? (celebration.spotX ?? celebration.ballX ?? 0)
      : (celebration.ballX ?? 0);
    const lookTargetZ = celebration.phase === "celebrate"
      ? (celebration.spotZ ?? celebration.ballZ ?? 0)
      : (celebration.ballZ ?? 0);
    const coachLookYaw = Math.atan2(
      lookTargetX - game.coach.runner.root.position.x,
      lookTargetZ - game.coach.runner.root.position.z
    );
    game.coach.runner.root.rotation.y = steerFootballFacing(game.coach.runner.root.rotation.y, coachLookYaw, dt, 5.8);
    game.coach.cycle += dt * 4;
    animateRunner(game.coach.runner, 0, game.coach.cycle, 0, null);
    game.coach.runner.leftArm.rotation.z *= 0.72;
    game.coach.runner.rightArm.rotation.z *= 0.72;
    game.coach.runner.torsoPivot.rotation.z *= 0.6;
  }

  const elapsed = celebration.duration - celebration.timer;
  const overlayRemaining = GOAL_OVERLAY_DURATION - elapsed;
  if (celebration.phase === "celebrate" && overlayRemaining > 0) {
    const intro = THREE.MathUtils.clamp(elapsed / 0.9, 0, 1);
    const outro = THREE.MathUtils.clamp(overlayRemaining / 0.7, 0, 1);
    setElementStylePropertyIfChanged(goalOverlay, "display", "block");
    setElementStylePropertyIfChanged(goalOverlay, "opacity", String(Math.min(intro * 1.15, 1) * Math.min(outro * 1.1, 1)));
    setElementStylePropertyIfChanged(goalOverlay, "transform", `translate(-50%, -50%) scale(${0.82 + intro * 0.24 - (1 - outro) * 0.08})`);
  } else {
    setElementStylePropertyIfChanged(goalOverlay, "opacity", "0");
    setElementStylePropertyIfChanged(goalOverlay, "display", "none");
  }

  game.ball.visible = true;
  if (celebration.phase === "reset" && game.coach && celebration.refHasBall) {
    const carryWorld = getFootballRefCarryWorldPosition(game, FOOTBALL_CELEBRATION_CARRY_WORLD);
    if (carryWorld) {
      game.ball.position.copy(FOOTBALL_CELEBRATION_CARRY_WORLD);
      game.ball.position.y = Math.max(game.ball.position.y, FOOTBALL_BALL_RADIUS + 0.72);
    } else {
      const carryYaw = game.coach.runner.root.rotation.y;
      game.ball.position.set(
        game.coach.runner.root.position.x + Math.sin(carryYaw) * 0.18,
        FOOTBALL_BALL_RADIUS + 0.78,
        game.coach.runner.root.position.z + Math.cos(carryYaw) * 0.18
      );
    }
    game.ballVel.set(0, 0, 0);
  }

  const scorer = celebration.scorer;
  let teammateCount = 0;
  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    if (player.team === celebration.team && player !== scorer) teammateCount += 1;
  }
  let teammateIndex = 0;
  const scoringSide = celebration.sideSign || Math.sign(celebration.spotX || 1) || 1;
  const runPhase = THREE.MathUtils.clamp(elapsed / 2.8, 0, 1);
  const crowdPhase = THREE.MathUtils.clamp((elapsed - 1.4) / 2.4, 0, 1);
  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    let targetX = p.home.x;
    let targetZ = p.home.z;
    let jumpY = 0;
    let moveTopSpeed = p.team === celebration.team ? 1.8 : 1.2;
    let lookX = celebration.inwardX ?? (celebration.spotX - scoringSide * 2.2);
    let lookZ = celebration.spotZ;
    let pose = { kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: p.team === celebration.team ? 0.58 : 0.18 };

    if (celebration.phase === "reset") {
      const kickoffTarget = getFootballKickoffTarget(game, p);
      targetX = kickoffTarget.x;
      targetZ = kickoffTarget.z;
      moveTopSpeed = p.role === "keeper"
        ? 1.55 + (p.saveReach ?? 0) * 0.18
        : 1.95 + (p.speedBias ?? 1) * 0.56 + Math.max(0, (p.pressBias ?? 1) - 0.8) * 0.22;
      lookX = kickoffTarget.x;
      lookZ = kickoffTarget.z + (p.team === 1 ? 2 : -2);
      pose = { ...pose, sprintAmount: 0.86 };
    } else if (p === scorer) {
      const sway = Math.sin(celebration.pulse * 0.48 + celebration.waveSeed) * 0.34;
      targetX = THREE.MathUtils.lerp(p.runner.root.position.x, celebration.spotX, runPhase < 1 ? 0.18 : 0.1);
      targetZ = THREE.MathUtils.lerp(celebration.spotZ + sway, celebration.spotZ, runPhase < 1 ? 0.18 : 0.06);
      if (runPhase >= 0.999) {
        targetX = celebration.spotX;
        targetZ = celebration.spotZ + sway;
        jumpY = Math.max(0, Math.sin(celebration.pulse + 0.3)) * 0.58;
      }
      moveTopSpeed = 2.85 - crowdPhase * 0.7;
      lookX = celebration.inwardX ?? (celebration.spotX - scoringSide * 2.2);
      lookZ = celebration.spotZ + Math.sin(celebration.pulse * 0.24) * 0.4;
      pose = { ...pose, type: "celebration", amount: 0.9, side: -scoringSide, bounce: THREE.MathUtils.clamp(jumpY / 0.58, 0, 1), sprintAmount: runPhase < 0.999 ? 1 : 0.45 };
    } else if (p.team === celebration.team) {
      const mateIndex = teammateIndex;
      teammateIndex += 1;
      const spread = Math.max(1, teammateCount - 1);
      const arcBase = scoringSide > 0 ? Math.PI : 0;
      const arcOffset = spread > 0 ? mateIndex / spread - 0.5 : 0;
      const angle = arcBase + arcOffset * Math.PI * 0.9 + Math.sin(celebration.pulse * 0.12 + mateIndex * 0.35) * 0.08;
      const radius = 1.9 + (mateIndex % 3) * 0.28 + (p.role === "keeper" ? 0.48 : 0);
      targetX = celebration.spotX + Math.cos(angle) * radius;
      targetZ = celebration.spotZ + Math.sin(angle) * radius * 0.74;
      targetX = THREE.MathUtils.lerp(celebration.inwardX ?? targetX, targetX, crowdPhase);
      const mateDist = Math.hypot(targetX - p.runner.root.position.x, targetZ - p.runner.root.position.z);
      moveTopSpeed = p.role === "keeper" ? 1.9 : 2.15;
      lookX = celebration.spotX - scoringSide * 0.35;
      lookZ = celebration.spotZ;
      pose = { ...pose, type: "celebration", amount: crowdPhase > 0.56 && mateDist < 1.08 ? 0.56 : 0.18, side: mateIndex % 2 === 0 ? -scoringSide : scoringSide, bounce: 0, sprintAmount: mateDist > 1.2 ? 0.82 : 0.12 };
    } else {
      const retreatMix = THREE.MathUtils.clamp(elapsed / 4.2, 0, 1);
      targetX = THREE.MathUtils.lerp(p.runner.root.position.x, p.home.x * 0.82, retreatMix);
      targetZ = THREE.MathUtils.lerp(p.runner.root.position.z, p.home.z * 0.72, retreatMix);
      moveTopSpeed = p.role === "keeper" ? 1.2 : 1.45;
      lookX = celebration.spotX;
      lookZ = celebration.spotZ;
      pose = { ...pose, sprintAmount: 0.08 };
    }

    const dirX = targetX - p.runner.root.position.x;
    const dirZ = targetZ - p.runner.root.position.z;
    const dirLen = Math.hypot(dirX, dirZ);
    const desiredSpeed = dirLen > 0.08 ? moveTopSpeed : 0;
    const desiredVx = dirLen > 0.001 ? (dirX / dirLen) * desiredSpeed : 0;
    const desiredVz = dirLen > 0.001 ? (dirZ / dirLen) * desiredSpeed : 0;
    const damping = p === scorer ? 8.4 : p.team === celebration.team ? 7.2 : 5.2;
    p.vx = THREE.MathUtils.damp(p.vx, desiredVx, damping, dt);
    p.vz = THREE.MathUtils.damp(p.vz, desiredVz, damping, dt);
    p.runner.root.position.x += p.vx * dt;
    p.runner.root.position.z += p.vz * dt;
    p.runner.root.position.x = THREE.MathUtils.clamp(p.runner.root.position.x, -FOOTBALL_FIELD_HALF_WIDTH + 0.45, FOOTBALL_FIELD_HALF_WIDTH - 0.45);
    p.runner.root.position.z = THREE.MathUtils.clamp(p.runner.root.position.z, -FOOTBALL_FIELD_HALF_LENGTH + 0.45, FOOTBALL_FIELD_HALF_LENGTH - 0.45);

    const moveSpeed = Math.hypot(p.vx, p.vz);
    if (moveSpeed > 0.06 && dirLen > 0.15) {
      const targetYaw = Math.atan2(p.vx, p.vz);
      p.runner.root.rotation.y = steerFootballFacing(p.runner.root.rotation.y, targetYaw, dt, 6.6);
    } else {
      const lookYaw = Math.atan2(lookX - p.runner.root.position.x, lookZ - p.runner.root.position.z);
      p.runner.root.rotation.y = steerFootballFacing(p.runner.root.rotation.y, lookYaw, dt, 4.6);
    }
    p.kickBlend = Math.max(0, (p.kickBlend ?? 0) - dt * 4.8);
    p.cycle += dt * (5.2 + moveSpeed * 2.9 + jumpY * 3.4 + (pose.type === "celebration" ? pose.amount * 1.4 : 0));
    animateRunner(p.runner, moveSpeed, p.cycle, jumpY, pose);
  }

  resolveFootballPlayerSpacing(game.players, dt, celebration.phase === "reset" ? 2.2 : 1.7);

  if (celebration.phase === "celebrate" && celebration.timer <= 0.001) {
    celebration.phase = "replay";
    if (attackStatus) {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "", "GOAL REPLAY");
    }
    if (playerStatus) {
      setScoreboardLineView(
        playerStatus,
        "scoreboard-player",
        "",
        celebration.scorer ? `Replay: ${getFootballPlayerLabel(celebration.scorer)}` : "Replay: slow motion"
      );
    }
  }

  if (celebration.phase === "replay" && !state.goalReplay) {
    celebration.phase = "reset";
    celebration.resetTimer = 6;
    celebration.refHasBall = false;
    celebration.refTask = "toBall";
    celebration.refTaskTimer = 0;
    celebration.refRecovery = { goalRouteKind: null, goalRouteSide: null };
    if (game.coach) game.coach.routeWaypoint = null;
    game.kickoffPlacementMode = "reset";
    if (attackStatus) {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "", "RESETTING SHAPE");
    }
    if (playerStatus) {
      setScoreboardLineView(playerStatus, "scoreboard-player", "", "Kickoff: players returning");
    }
  }

  if (celebration.phase === "reset") {
    const kickoffReady = getFootballKickoffReadyPlayers(game);
    const readyPlayers = [kickoffReady.taker, kickoffReady.support].filter(Boolean);
    let allReady = readyPlayers.length > 0;
    for (let i = 0; i < readyPlayers.length; i += 1) {
      const p = readyPlayers[i];
      const kickoffTarget = getFootballKickoffTarget(game, p);
      const distHome = Math.hypot(p.runner.root.position.x - kickoffTarget.x, p.runner.root.position.z - kickoffTarget.z);
      if (distHome > 0.4 || Math.hypot(p.vx, p.vz) > 0.26) {
        allReady = false;
        break;
      }
    }
    const coachCenterReady = game.coach ? Math.hypot(game.coach.runner.root.position.x, game.coach.runner.root.position.z) <= 0.85 : true;
    const resetTimedOut = (celebration.resetTimer ?? 0) < 3.2;
    if ((allReady || resetTimedOut) && celebration.refHasBall && coachCenterReady) {
      game.kickoffBallSpot = { x: 0, z: 0 };
      resetFootballKickoff(game, false, false);
      celebration.phase = "awaitKickoff";
      return false;
    }
  }

  if (celebration.phase === "replay" || celebration.phase === "reset") return true;
  if (celebration.timer <= 0.001) resetFootballKickoff(game, true);
  return true;
}

