import * as THREE from "./three.js";
import {
  findBestCrossTargetAI,
  findBestPassTargetAI,
  findClearanceTargetAI,
  findThirdManSupportAI
} from "./football-ai.js";
import {
  getFootballKickoffTargetFlow,
  resetFootballKickoffFlow,
  startGoalCelebrationFlow,
  updateGoalCelebrationFlow
} from "./football-flow.js";
import {
  formatGoalOrdinal,
  recordFootballReplayState,
  resetFootballBallState,
  setGoalOverlayStateView,
  startGoalReplayState,
  updateGoalReplayState,
  updateScoreboardView
} from "./football-presentation.js";
import { getFootballRefereeTargetRuntime } from "./football-referee-runtime.js";
import { updateFootballGameplayRuntime } from "./football-runtime.js";
import {
  getFootballFootedness,
  getFootballPlayerLabel
} from "./football-helpers.js";
import { resolvePeopleCollisionsRuntime } from "./collision-runtime.js";
import { animateRunner } from "./runner-system.js";
import { getTrackLaneLength, getTrackPointAtProgress } from "./track-system.js";
import {
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_BALL_SPEED_SCALE,
  FOOTBALL_PERSON_RADIUS,
  WORLD_MOVE_LIMIT
} from "./game-config.js";

export function createFootballBridge({
  state,
  footballGame,
  camera,
  attackStatus,
  goalOverlay,
  goalOverlayScorer,
  goalOverlayTitle,
  playerStatus,
  replayCard,
  replayFlash,
  scoreStatus,
  getFootballBehavior,
  audioSystem = null
}) {
  const cameraWorldPos = new THREE.Vector3();

  function updateScoreboard(game = footballGame) {
    updateScoreboardView({ game, scoreStatus, attackStatus, playerStatus, getFootballPlayerLabel });
  }

  function resetFootballBall(game = footballGame) {
    resetFootballBallState(game);
  }

  function setGoalOverlayState(active, scorer = null, team = 0) {
    setGoalOverlayStateView({ active, scorer, team, game: footballGame, goalOverlay, goalOverlayTitle, goalOverlayScorer });
  }

  function recordFootballReplay(game = footballGame, dt) {
    recordFootballReplayState({ state, game, dt });
  }

  function startGoalReplay(game = footballGame, scorer = null, team = 0) {
    startGoalReplayState({ state, game, scorer, team });
  }

  function updateGoalReplay(dt, game = footballGame) {
    updateGoalReplayState({ dt, state, game, replayCard, replayFlash });
  }

  function clampFootballHumanPosition(x, z, out = {}) {
    out.x = THREE.MathUtils.clamp(x, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    out.z = THREE.MathUtils.clamp(z, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    return out;
  }

  function clampFootballRefereePosition(x, z, out = {}) {
    out.x = THREE.MathUtils.clamp(x, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    out.z = THREE.MathUtils.clamp(z, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    return out;
  }

  function clampGoalInteriorPosition(x, z, out = {}, prevX = x, prevZ = z) {
    out.x = THREE.MathUtils.clamp(x, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    out.z = THREE.MathUtils.clamp(z, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
    return out;
  }

  function resolveFootballPlayerSpacing(players, dt, pushScale = 1) {
    for (let i = 0; i < players.length; i += 1) {
      const a = players[i];
      for (let j = i + 1; j < players.length; j += 1) {
        const b = players[j];
        let dx = a.runner.root.position.x - b.runner.root.position.x;
        let dz = a.runner.root.position.z - b.runner.root.position.z;
        let dist = Math.hypot(dx, dz);
        const minDist = FOOTBALL_PERSON_RADIUS * 2.02;
        if (dist <= 0.0001) {
          const angle = (i * 1.73 + j * 2.41) % (Math.PI * 2);
          dx = Math.cos(angle);
          dz = Math.sin(angle);
          dist = 1;
        }
        if (dist >= minDist) continue;
        const nx = dx / dist;
        const nz = dz / dist;
        const overlap = minDist - dist;
        const separate = overlap * 0.5;
        a.runner.root.position.x += nx * separate;
        a.runner.root.position.z += nz * separate;
        b.runner.root.position.x -= nx * separate;
        b.runner.root.position.z -= nz * separate;
        const push = overlap * 2.4 * pushScale * dt;
        a.vx += nx * push;
        a.vz += nz * push;
        b.vx -= nx * push;
        b.vz -= nz * push;
      }
    }
    for (let i = 0; i < players.length; i += 1) {
      const p = players[i];
      const clamped = clampFootballHumanPosition(p.runner.root.position.x, p.runner.root.position.z);
      p.runner.root.position.x = clamped.x;
      p.runner.root.position.z = clamped.z;
    }
  }

  function getFootballKickoffTarget(game, player) {
    return getFootballKickoffTargetFlow(game, player);
  }

  function resetFootballKickoff(game = footballGame, snapPlayers = true, clearCelebration = true) {
    resetFootballKickoffFlow(game, snapPlayers, clearCelebration, {
      audioSystem,
      resetFootballBall,
      updateScoreboard,
      setGoalOverlayState,
      getFootballKickoffTarget
    });
  }

  function startGoalCelebration(game, scoringTeam, scorer) {
    audioSystem?.playGoal({
      team: scoringTeam,
      x: game?.ball?.position?.x ?? 0
    });
    startGoalCelebrationFlow(game, scoringTeam, scorer, {
      resetFootballBall,
      setGoalOverlayState,
      startGoalReplay,
      updateScoreboard,
      getFootballPlayerLabel,
      formatGoalOrdinal,
      attackStatus,
      playerStatus
    });
  }

  function updateGoalCelebration(game, dt) {
    return updateGoalCelebrationFlow(game, dt, {
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
    });
  }

  function registerBallTouch(game, team, player = null) {
    const switchedOwner = Boolean(player && game.lastTouchPlayer && game.lastTouchPlayer !== player);
    const switchedTeam = switchedOwner && game.lastTouchPlayer?.team !== team;
    if (game.lastTouchTeam === team) {
      game.sameTeamTouchCount = Math.min(9, game.sameTeamTouchCount + 1);
    } else {
      game.lastTouchTeam = team;
      game.sameTeamTouchCount = 1;
    }
    game.lastTouchPlayer = player;
    game.firstTouchPlayer = player;
    game.firstTouchTimer = player ? 0.38 : 0;
    game.touchShieldPlayer = player;
    game.touchShieldTimer = player ? 0.58 : 0;
    game.duelControlPlayer = player;
    game.duelControlTimer = player && player.role !== "keeper" ? (switchedTeam ? 0.46 : 0.34) : 0;
    game.contestTouchTimer = switchedTeam ? 0.38 : Math.max(game.contestTouchTimer ?? 0, 0);
    game.contestOwnerPlayer = player;
    game.contestOwnerTimer = player && player.role !== "keeper" ? (switchedTeam ? 0.54 : 0.3) : 0;
    game.contestHardLockTimer = switchedTeam && player && player.role !== "keeper"
      ? 0.58
      : Math.max(game.contestHardLockTimer ?? 0, 0);
  }

  function triggerFootballKickPose(player, ball, amount = 1, targetX = null) {
    if (!player?.runner || !ball) return;
    const footedness = getFootballFootedness(player, ball, targetX);
    player.kickSide = footedness.kickSide;
    player.kickBlend = Math.max(player.kickBlend ?? 0, THREE.MathUtils.clamp(amount, 0.45, 1.15));
  }

  function commitFootballRun(player, targetX, targetZ, duration = 0.46) {
    if (!player) return;
    player.commitForwardTimer = Math.max(player.commitForwardTimer ?? 0, duration);
    player.commitTargetX = targetX;
    player.commitTargetZ = targetZ;
  }

  function steerFootballFacing(currentYaw, targetYaw, dt, maxTurnRate = 8.4) {
    const delta = Math.atan2(Math.sin(targetYaw - currentYaw), Math.cos(targetYaw - currentYaw));
    const maxStep = maxTurnRate * dt;
    return currentYaw + THREE.MathUtils.clamp(delta, -maxStep, maxStep);
  }

  function applyFootballKickContact(player, ball) {
    if (!player?.runner || !ball) return;
    const kickSide = player.kickSide === 0 ? 1 : Math.sign(player.kickSide ?? 1);
    const footPivot = kickSide > 0 ? player.runner.leftLegRig?.footPivot : player.runner.rightLegRig?.footPivot;
    if (!footPivot) return;
    footPivot.updateWorldMatrix(true, false);
    const contactPoint = footPivot.localToWorld(new THREE.Vector3(0, -0.035, 0.265));
    ball.position.lerp(contactPoint, 0.7);
    ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, contactPoint.y);
  }

  function setFootballBallVelocity(game, dx, dz, power, loft = 0) {
    const len = Math.max(0.001, Math.hypot(dx, dz));
    const scaledPower = power * FOOTBALL_BALL_SPEED_SCALE * 1.16;
    game.ballVel.x = (dx / len) * scaledPower;
    game.ballVel.z = (dz / len) * scaledPower;
    const loftScale = loft > 2.6
      ? 1.52
      : loft > 1.4
        ? 1.34
        : 1.12;
    game.ballVel.y = loft * loftScale;
    audioSystem?.playBallKick({
      power,
      loft,
      x: game?.ball?.position?.x ?? 0
    });
  }

  function resolveFootballRestartTeam(game) {
    const candidates = [
      -(game.lastTouchTeam ?? 0),
      -(game.lastControllingTeam ?? 0),
      -(game.attackingTeam ?? 0),
      1
    ];
    for (let i = 0; i < candidates.length; i += 1) {
      const team = Math.sign(candidates[i] || 0);
      if (team !== 0) return team;
    }
    return 1;
  }

  function startFootballRefRestart(game, outX, outZ) {
    if (game.refRestart?.active) return;
    audioSystem?.playWhistle({ strong: true, x: outX });
    const restartTeamCandidate = resolveFootballRestartTeam(game);
    const liveBallY = game.ball.position.y;
    const liveBallVelX = game.ballVel.x;
    const liveBallVelY = game.ballVel.y;
    const liveBallVelZ = game.ballVel.z;
    game.ballHolder = null;
    game.deliveryType = null;
    game.deliveryTeam = 0;
    game.deliveryTimer = 0;
    game.deliverySource = null;
    game.deliveryTarget = null;
    game.stallTeam = 0;
    game.stallTimer = 0;
    game.goalmouthStallTimer = 0;
    game.ownGoalScrambleTimer = 0;
    game.looseBallStallTimer = 0;
    game.offBallClusterTimer = 0;
    game.restartHoldTimer = 0;
    game.kickoffScriptTimer = 0;
    game.kickoffContestTimer = 0;
    game.overGoalNetTimer = 0;
    game.overGoalNetTeam = 0;
    game.outOfBoundsTimer = 0;
    game.firstTouchPlayer = null;
    game.firstTouchTimer = 0;
    game.touchShieldPlayer = null;
    game.touchShieldTimer = 0;
    game.duelControlPlayer = null;
    game.duelControlTimer = 0;
    game.contestTouchTimer = 0;
    game.contestOwnerPlayer = null;
    game.contestOwnerTimer = 0;
    game.contestHardLockTimer = 0;
    game.kickoffBallSpot = { x: outX, z: outZ };
    game.kickoffTeam = restartTeamCandidate;
    resetFootballKickoff(game, false, false);
    if (game.refRestart) {
      game.refRestart.pickupX = outX;
      game.refRestart.pickupZ = outZ;
      game.refRestart.goalRouteKind = null;
      game.refRestart.goalRouteSide = null;
    }
    game.ball.visible = true;
    game.ball.position.set(outX, Math.max(FOOTBALL_BALL_RADIUS, liveBallY), outZ);
    game.ballVel.set(liveBallVelX, liveBallVelY, liveBallVelZ);
  }

  function findBestPassTarget(carrier, teammates, opponents) {
    return findBestPassTargetAI(carrier, teammates, opponents, getFootballBehavior());
  }

  function findThirdManSupport(carrier, receiver, teammates, opponents, attackGoalZ) {
    return findThirdManSupportAI(carrier, receiver, teammates, opponents, attackGoalZ);
  }

  function findBestCrossTarget(carrier, teammates, opponents, attackGoalZ) {
    return findBestCrossTargetAI(carrier, teammates, opponents, attackGoalZ);
  }

  function findClearanceTarget(carrier, teammates, opponents) {
    return findClearanceTargetAI(carrier, teammates, opponents);
  }

  function resolvePeopleCollisions(game = footballGame, dt = 0) {
    resolvePeopleCollisionsRuntime(game, state, dt, {
      colliders: footballGame.colliders,
      clampFootballHumanPosition,
      clampFootballRefereePosition,
      clampGoalInteriorPosition,
      getTrackPointAtProgress
    });
  }

  function getFootballRefereeTarget(game) {
    return getFootballRefereeTargetRuntime(game, { clampFootballRefereePosition });
  }

  function updateFootballGame(game = footballGame, dt, trackDt = dt) {
    game.phase += dt;
    camera.getWorldPosition(cameraWorldPos);
    updateFootballGameplayRuntime(game, dt, trackDt, {
      FOOTBALL_BEHAVIOR: getFootballBehavior(),
      animateRunner,
      applyFootballKickContact,
      cameraWorldPos,
      clampFootballHumanPosition,
      clampFootballRefereePosition,
      commitFootballRun,
      findBestCrossTarget,
      findBestPassTarget,
      findClearanceTarget,
      findThirdManSupport,
      getFootballFootedness,
      getFootballKickoffTarget,
      getFootballRefereeTarget,
      getTrackLaneLength,
      getTrackPointAtProgress,
      registerBallTouch,
      resolvePeopleCollisions,
      setFootballBallVelocity,
      startFootballRefRestart,
      startGoalCelebration,
      steerFootballFacing,
      triggerFootballKickPose,
      updateGoalCelebration,
      updateScoreboard
    });
  }

  return {
    clampGoalInteriorPosition,
    recordFootballReplay,
    resetFootballKickoff,
    updateFootballGame,
    updateGoalReplay,
    updateScoreboard
  };
}

