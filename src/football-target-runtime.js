import * as THREE from "./three.js";
import {
  ATHLETE_BALL_REACH,
  ARCADE_KEEPER_NERF,
  ARCADE_SCORING_BOOST,
  FOOTBALL_BALL_CONTROL_HEIGHT,
  FOOTBALL_BALL_GRAVITY,
  FOOTBALL_BALL_GROUND_BOUNCE,
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_BALL_VOLLEY_HEIGHT,
  FOOTBALL_CENTER_CIRCLE_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_HEIGHT,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_PERSON_RADIUS,
  FOOTBALL_TOUCHLINE_BUFFER,
  TRACK_HURDLE_CONTACT_DEPTH,
  TRACK_HURDLE_CONTACT_HEIGHT_MARGIN,
  TRACK_HURDLE_CONTACT_SIDE_MARGIN,
  TRACK_HURDLE_CONTACT_WINDOW,
  TRACK_HURDLE_FALL_SPEED,
  TRACK_HURDLE_JUMP_TRIGGER,
  TRACK_HURDLE_JUMP_TRIGGER_SPEED_BONUS,
  TRACK_HURDLE_RANDOM_FALL_RATE,
  TRACK_HURDLE_RESET_TIME,
  TRACK_HURDLE_SCALE,
  TRACK_HURDLE_UNDERPASS_MARGIN,
  TRACK_RUNNER_HURDLE_IMPACT_LIFT,
  TRACK_RUNNER_HURDLE_JUMP_VELOCITY,
  TRACK_RUNNER_LANE_CHANGE_RATE,
  TRACK_RUNNER_MAX_PASS_LANE,
  TRACK_RUNNER_PASS_BACK_CLEARANCE,
  TRACK_RUNNER_PASS_FRONT_CLEARANCE,
  TRACK_RUNNER_PASS_TRIGGER
} from "./game-config.js";

export function getFootballKeeperTargetRuntime(context) {
  const {
    ballDist,
    defendGoalZ,
    dt,
    game,
    ownHalfBias,
    p
  } = context;

  p.saveCooldown = Math.max(0, p.saveCooldown - dt);
  p.diveBlend = Math.max(0, p.diveBlend - dt * 2.15);
  p.saveLift = Math.max(0, p.saveLift - dt * (p.diveBlend > 0.08 ? 2.9 : 6.8));
  if (p.diveBlend <= 0.04 && p.saveLift < 0.035) {
    p.saveLift = 0;
  }
  const shotOnGoal = game.ballVel.z * p.team < -0.24 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.8;
  const keeperLineZ = defendGoalZ + p.team * 0.44;
  const planeTime = Math.abs(game.ballVel.z) > 0.001 ? (keeperLineZ - game.ball.position.z) / game.ballVel.z : Infinity;
  const predictedSaveX = Number.isFinite(planeTime)
    ? game.ball.position.x + game.ballVel.x * THREE.MathUtils.clamp(planeTime, 0, 0.68)
    : game.ball.position.x;
  const keeperRushDepth = shotOnGoal
    ? 0.4 + Math.min(0.72, Math.max(0, (Math.abs(game.ball.position.z - defendGoalZ) - 0.8) * 0.1))
    : game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT && ballDist < 3.2
      ? 0.34
      : 0;
  const targetX = THREE.MathUtils.clamp((shotOnGoal ? predictedSaveX * 1.02 : game.ball.position.x * 0.42) + p.roamX * 0.03, -FOOTBALL_GOAL_WIDTH * 0.42, FOOTBALL_GOAL_WIDTH * 0.42);
  const targetZ = shotOnGoal
    ? keeperLineZ - p.team * keeperRushDepth
    : defendGoalZ + THREE.MathUtils.clamp((game.ball.position.z - defendGoalZ) * 0.16, -0.18, 1.05);

  return {
    keeperShotOnGoal: shotOnGoal,
    targetX,
    targetZ
  };
}

export function getFootballOutfieldSupportTargetRuntime(context) {
  const {
    FOOTBALL_BEHAVIOR,
    ballDist,
    ballSide,
    controllingTeam,
    defendGoalZ,
    defendIndex,
    game,
    ownHalfBias,
    p,
    roamX,
    roamZ,
    tacticalRole,
    teamLeader
  } = context;

  if (tacticalRole === "defender") {
    const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x);
    const isCentralDefender = Math.abs(p.home.x) < 0.5;
    const depthOffset = isCentralDefender ? 2.45 : 3.15;
    const baseLineZ = defendGoalZ + p.team * depthOffset;
    const ballHolderPressure = game.ballHolder && game.ballHolder.team !== p.team
      ? Math.hypot(game.ballHolder.runner.root.position.x - p.runner.root.position.x, game.ballHolder.runner.root.position.z - p.runner.root.position.z)
      : 99;
    const carrierAdvance = game.ballHolder && game.ballHolder.team !== p.team
      ? (game.ballHolder.runner.root.position.z * p.team)
      : (game.ball.position.z * p.team);
    const canStepOut = controllingTeam !== p.team
      && ownHalfBias > 0.08
      && (
        p === teamLeader
        || ballHolderPressure < (isCentralDefender ? 3.8 : 3.2) * FOOTBALL_BEHAVIOR.defenderStepRangeScale
        || ballDist < (isCentralDefender ? 3.4 : 2.9) * FOOTBALL_BEHAVIOR.defenderStepRangeScale
        || ((p.tackleBias ?? 0) > 0.08 && carrierAdvance > -1.2)
      );
    if (canStepOut) {
      const carrier = game.ballHolder && game.ballHolder.team !== p.team ? game.ballHolder : null;
      const coverPassX = carrier
        ? THREE.MathUtils.lerp(game.ball.position.x, carrier.runner.root.position.x, 0.42)
        : game.ball.position.x;
      const coverPassZ = carrier
        ? THREE.MathUtils.lerp(game.ball.position.z, carrier.runner.root.position.z, 0.42)
        : game.ball.position.z;
      const challengeDepth = (isCentralDefender ? 0.12 : 0.06) * FOOTBALL_BEHAVIOR.defenderStepDepthScale;
      const stepAggression = (isCentralDefender ? 0.34 : 0.28) * FOOTBALL_BEHAVIOR.defenderCoverLerpScale;
      let targetX = game.ball.position.x + p.laneBias * (isCentralDefender ? 0.03 : 0.07);
      targetX = THREE.MathUtils.lerp(targetX, coverPassX, carrier ? (0.42 + (p.tackleBias ?? 0) * 0.75) * FOOTBALL_BEHAVIOR.defenderCoverLerpScale : 0.12 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale);
      let targetZ = game.ball.position.z - p.team * challengeDepth;
      targetZ = THREE.MathUtils.lerp(targetZ, coverPassZ - p.team * 0.08, carrier ? stepAggression + (p.tackleBias ?? 0) * 0.35 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale : 0.16 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale);
      return { attackLane: carrier ? "press" : "step", targetX, targetZ };
    }
    if (p === teamLeader && ownHalfBias > 0.22) {
      return {
        attackLane: p.attackLane,
        targetX: game.ball.position.x + p.laneBias * (isCentralDefender ? 0.05 : 0.1),
        targetZ: game.ball.position.z - p.team * (isCentralDefender ? 0.48 : 0.36)
      };
    }
    const channelX = isCentralDefender
      ? game.ball.position.x * 0.12
      : game.ball.position.x * 0.32 + laneSign * (1.55 + ownHalfBias * 0.42);
    const zoneX = THREE.MathUtils.lerp(p.home.x, channelX, isCentralDefender ? 0.26 : 0.36);
    const frontMarkZ = game.ball.position.z - p.team * (isCentralDefender ? 0.92 : 0.58);
    const zoneZ = THREE.MathUtils.lerp(baseLineZ, frontMarkZ, isCentralDefender ? 0.18 + ownHalfBias * 0.22 : 0.12 + ownHalfBias * 0.16);
    return { attackLane: p.attackLane, targetX: zoneX, targetZ: zoneZ };
  }

  if (tacticalRole === "supportAttack") {
    const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x || p.laneBias || 1);
    const isCentralDefender = Math.abs(p.home.x) < 0.5;
    const sameBallSide = laneSign !== 0 && ballSide !== 0 && laneSign === ballSide;
    const weakBallSide = laneSign !== 0 && ballSide !== 0 && laneSign !== ballSide;
    if (p === teamLeader && ballDist < 2.6) {
      return { attackLane: "press", targetX: game.ball.position.x, targetZ: game.ball.position.z };
    }
    if (isCentralDefender) {
      const centralAttackX = THREE.MathUtils.clamp(game.ball.position.x * 0.22 + p.roamX * 0.16, -2.8, 2.8);
      const centralAttackZ = game.ball.position.z + p.team * (1.35 - ownHalfBias * 0.45);
      return {
        attackLane: "link",
        targetX: THREE.MathUtils.lerp(roamX, centralAttackX, 0.78),
        targetZ: THREE.MathUtils.clamp(centralAttackZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.35, FOOTBALL_FIELD_HALF_LENGTH - 1.0)
      };
    }
    const overlapRun = sameBallSide || (ballSide === 0 && defendIndex === 0);
    const underlapRun = weakBallSide || (ballSide === 0 && defendIndex !== 0);
    const attackLane = overlapRun ? "overlap" : underlapRun ? "underlap" : "support";
    const laneAnchorX = overlapRun
      ? laneSign * (FOOTBALL_FIELD_HALF_WIDTH - 0.95)
      : underlapRun
        ? laneSign * (FOOTBALL_FIELD_HALF_WIDTH * 0.34)
        : laneSign * (FOOTBALL_FIELD_HALF_WIDTH - 1.35);
    const laneDriftX = overlapRun
      ? game.ball.position.x * 0.2
      : underlapRun
        ? game.ball.position.x * 0.32
        : game.ball.position.x * 0.14;
    const laneDepth = overlapRun
      ? 4.05 + p.pressBias * 0.34
      : underlapRun
        ? 2.45 + p.pressBias * 0.24
        : 3 + p.pressBias * 0.24;
    const laneInsideNudge = underlapRun ? -laneSign * 0.95 : laneSign * 0.1;
    const runX = THREE.MathUtils.clamp(laneAnchorX + laneDriftX + laneInsideNudge + p.roamX * 0.12, -FOOTBALL_FIELD_HALF_WIDTH + 0.9, FOOTBALL_FIELD_HALF_WIDTH - 0.9);
    const runZ = THREE.MathUtils.clamp(game.ball.position.z + p.team * laneDepth, -FOOTBALL_FIELD_HALF_LENGTH + 0.9, FOOTBALL_FIELD_HALF_LENGTH - 0.3);
    return {
      attackLane,
      targetX: THREE.MathUtils.lerp(roamX, runX, overlapRun ? 0.91 : underlapRun ? 0.87 : 0.82),
      targetZ: runZ
    };
  }

  if (tacticalRole === "recoverDefence") {
    const recoverLane = p.home.x === 0 ? Math.sign(p.laneBias || 1) : Math.sign(p.home.x);
    if (p === teamLeader && ballDist < 3.8) {
      return {
        attackLane: p.attackLane,
        targetX: game.ball.position.x + p.laneBias * 0.08,
        targetZ: game.ball.position.z - p.team * 0.16
      };
    }
    return {
      attackLane: p.attackLane,
      targetX: THREE.MathUtils.lerp(p.home.x * 0.62, game.ball.position.x * 0.28 + recoverLane * 0.85, 0.54),
      targetZ: THREE.MathUtils.lerp(p.home.z - p.team * 1.05, game.ball.position.z - p.team * 1.05, 0.4 + ownHalfBias * 0.18)
    };
  }

  return null;
}

export function getFootballAttackerTargetRuntime(context) {
  const {
    attackGoalZ,
    attackIndex,
    attackerCount,
    attackerProfile,
    ballProgress,
    ballSide,
    baseShotHunger,
    game,
    laneSign,
    p,
    roamX
  } = context;

  const isCentralAttacker = Math.abs(p.home.x) < 0.5;
  const finalThirdBias = THREE.MathUtils.clamp((ballProgress + 0.9) / 7.2, 0, 1);
  const deepBuildBias = THREE.MathUtils.clamp(((-game.ball.position.z * p.team) - (FOOTBALL_FIELD_HALF_LENGTH - 7.4)) / 2.9, 0, 1.25);
  const farPostRunner = !isCentralAttacker && (ballSide === 0 ? attackIndex === attackerCount - 1 : laneSign === -ballSide);
  const hungryAttacker = baseShotHunger > 1.08;
  const supportRole = attackerProfile === "poacher"
    ? "poach"
    : attackerProfile === "runner"
      ? (farPostRunner ? "farPost" : "poach")
      : attackerProfile === "playmaker"
        ? "link"
        : isCentralAttacker
          ? "support"
          : farPostRunner
            ? "farPost"
            : hungryAttacker && attackIndex === 0
              ? "poach"
              : "support";
  let attackLane = supportRole;
  const farPostX = ballSide === 0
    ? laneSign * 2.05
    : -ballSide * Math.min(FOOTBALL_GOAL_WIDTH * 0.82 + 0.75, 2.9);
  const edgeChannelX = laneSign * (ballSide !== 0 && laneSign === ballSide ? FOOTBALL_FIELD_HALF_WIDTH * 0.18 : FOOTBALL_FIELD_HALF_WIDTH * 0.1);
  const profileDriftX = attackerProfile === "playmaker" ? -laneSign * 0.42 : attackerProfile === "runner" ? laneSign * 0.18 : 0;
  const boxLaneX = supportRole === "poach"
    ? THREE.MathUtils.clamp(game.ball.position.x * 0.08 + p.roamX * 0.12, -1.15, 1.15)
    : supportRole === "farPost"
      ? farPostX + p.roamX * 0.1 + profileDriftX * 0.24
      : edgeChannelX + profileDriftX + game.ball.position.x * (attackerProfile === "playmaker" ? 0.12 : 0.05) + p.roamX * 0.14;
  const supportX = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(p.home.x * 0.64, boxLaneX, supportRole === "boxEdge" ? 0.82 : 0.9),
    -FOOTBALL_FIELD_HALF_WIDTH + 1.05,
    FOOTBALL_FIELD_HALF_WIDTH - 1.05
  );
  const poachDepth = supportRole === "poach"
    ? 0.72 + finalThirdBias * (0.84 + baseShotHunger * 0.12)
    : supportRole === "farPost"
      ? 0.88 + finalThirdBias * 0.72
      : 2.15 + finalThirdBias * (0.52 - Math.min(0.12, (baseShotHunger - 0.8) * 0.14));
  const receiveZ = game.ball.position.z + p.team * (supportRole === "boxEdge"
    ? (attackerProfile === "playmaker" ? 1.55 : 2.3) + p.pressBias * 0.2
    : (attackerProfile === "runner" ? 3.55 : 2.95) + attackIndex * 0.28 + p.pressBias * 0.28);
  const goalHangZ = attackGoalZ - p.team * poachDepth;
  const supportZ = supportRole === "boxEdge"
    ? THREE.MathUtils.lerp(receiveZ, attackGoalZ - p.team * (2.45 - finalThirdBias * 0.35), 0.58 + finalThirdBias * 0.18)
    : THREE.MathUtils.lerp(receiveZ, goalHangZ, supportRole === "farPost" ? 0.8 + finalThirdBias * 0.14 : 0.72 + finalThirdBias * 0.2);
  let targetX = THREE.MathUtils.lerp(roamX, supportX + laneSign * (supportRole === "boxEdge" ? 0.08 : 0), supportRole === "boxEdge" ? 0.84 : 0.9);
  let targetZ = THREE.MathUtils.clamp(supportZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.25, FOOTBALL_FIELD_HALF_LENGTH - 0.62);
  if (p.goalRunTimer > 0) {
    attackLane = "breakRun";
    const runBlend = THREE.MathUtils.clamp(0.56 + p.goalRunTimer * 0.22, 0.56, 0.94);
    targetX = THREE.MathUtils.lerp(targetX, p.goalRunTargetX ?? targetX, runBlend * 0.9);
    targetZ = THREE.MathUtils.lerp(targetZ, p.goalRunTargetZ ?? targetZ, runBlend);
  }
  if (deepBuildBias > 0.01) {
    const escapeLaneSign = laneSign === 0 ? Math.sign((p.runner.root.position.x - game.ball.position.x) || p.laneBias || 1) : laneSign;
    const outletX = THREE.MathUtils.clamp(
      THREE.MathUtils.lerp(targetX, escapeLaneSign * (isCentralAttacker ? 1.15 : FOOTBALL_FIELD_HALF_WIDTH - 1.25), 0.28 + deepBuildBias * 0.14),
      -FOOTBALL_FIELD_HALF_WIDTH + 0.95,
      FOOTBALL_FIELD_HALF_WIDTH - 0.95
    );
    const outletZ = THREE.MathUtils.clamp(
      game.ball.position.z + p.team * (4.7 + attackIndex * 0.38 + (attackerProfile === "runner" ? 1.1 : 0.45) + deepBuildBias * 1.25),
      -FOOTBALL_FIELD_HALF_LENGTH + 1.15,
      FOOTBALL_FIELD_HALF_LENGTH - 0.7
    );
    targetX = THREE.MathUtils.lerp(targetX, outletX, 0.36 + deepBuildBias * 0.16);
    targetZ = Math.max(targetZ * p.team, outletZ * p.team) * p.team;
    if (p.goalRunTimer <= 0.05) {
      attackLane = attackerProfile === "playmaker" ? "link" : "breakRun";
    }
  }

  return { attackLane, targetX, targetZ };
}

export function getFootballRestartTargetRuntime(context) {
  const {
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_GOAL_WIDTH,
    dt,
    game,
    getFootballKickoffTarget,
    kickoffContestActive,
    p
  } = context;

  let keeperShotOnGoal = false;
  let targetX;
  let targetZ;

  if (game.refRestart?.active) {
    p.attackLane = "reset";
    const kickoffResetFlow = (game.refRestart.kind ?? "boundary") === "kickoff";
    const refKickoffTarget = kickoffResetFlow
      ? getFootballKickoffTarget(game, p)
      : null;
    if (kickoffResetFlow && refKickoffTarget) {
      p.runner.root.position.x = refKickoffTarget.x;
      p.runner.root.position.z = refKickoffTarget.z;
      p.runner.root.rotation.y = refKickoffTarget.yaw;
      p.vx = 0;
      p.vz = 0;
      p.shapeTargetX = refKickoffTarget.x;
      p.shapeTargetZ = refKickoffTarget.z;
      targetX = refKickoffTarget.x;
      targetZ = refKickoffTarget.z;
    } else {
      const holdX = THREE.MathUtils.clamp(kickoffResetFlow ? (refKickoffTarget?.x ?? p.home.x) : (p.home.x * 0.92), -FOOTBALL_FIELD_HALF_WIDTH + 0.9, FOOTBALL_FIELD_HALF_WIDTH - 0.9);
      const holdZ = THREE.MathUtils.clamp(kickoffResetFlow ? (refKickoffTarget?.z ?? p.home.z) : (p.home.z * 0.92), -FOOTBALL_FIELD_HALF_LENGTH + 0.9, FOOTBALL_FIELD_HALF_LENGTH - 0.9);
      if (p.role === "keeper") {
        targetX = THREE.MathUtils.clamp(refKickoffTarget?.x ?? p.home.x, -FOOTBALL_GOAL_WIDTH * 0.42, FOOTBALL_GOAL_WIDTH * 0.42);
        targetZ = refKickoffTarget?.z ?? p.home.z;
      } else {
        targetX = THREE.MathUtils.lerp(p.runner.root.position.x, holdX, 0.82);
        targetZ = THREE.MathUtils.lerp(p.runner.root.position.z, holdZ, 0.82);
        if (kickoffResetFlow && refKickoffTarget) {
          const readyDist = Math.hypot(p.runner.root.position.x - refKickoffTarget.x, p.runner.root.position.z - refKickoffTarget.z);
          if (readyDist < 0.22) {
            p.runner.root.position.x = refKickoffTarget.x;
            p.runner.root.position.z = refKickoffTarget.z;
            targetX = refKickoffTarget.x;
            targetZ = refKickoffTarget.z;
            p.vx = 0;
            p.vz = 0;
          }
        }
      }
    }
    return { attackLane: p.attackLane, keeperShotOnGoal, targetX, targetZ };
  }

  if (kickoffContestActive && p.role !== "keeper") {
    const kickoffBiasTeam = game.restartTeam || 0;
    const isKickoffTaker = p.kickoffRole === "taker";
    const isKickoffSupport = p.kickoffRole === "support";
    const isKickoffPresser = p.kickoffRole === "press";
    if (isKickoffTaker || isKickoffPresser) {
      const pressBias = p.team === kickoffBiasTeam ? 1.04 : 0.98;
      const lateralOffset = 0;
      targetX = game.ball.position.x + lateralOffset;
      targetZ = game.ball.position.z - p.team * (isKickoffTaker ? 0.02 : 0.18);
      targetX = THREE.MathUtils.lerp(p.runner.root.position.x, targetX, 0.94);
      targetZ = THREE.MathUtils.lerp(p.runner.root.position.z, targetZ, 0.96);
      p.attackLane = isKickoffTaker
        ? "kickoffTouch"
        : "kickoffPress";
      p.vx = THREE.MathUtils.damp(p.vx, (targetX - p.runner.root.position.x) * pressBias * 2.05, 8.2, dt);
      p.vz = THREE.MathUtils.damp(p.vz, (targetZ - p.runner.root.position.z) * pressBias * 2.1, 8.4, dt);
    } else if (isKickoffSupport) {
      const supportSide = p.home.x === 0 ? -p.team : Math.sign(p.home.x);
      targetX = game.ball.position.x + supportSide * 1.15;
      targetZ = game.ball.position.z - p.team * 1.05;
      p.attackLane = "kickoffSupport";
    } else {
      targetX = THREE.MathUtils.lerp(p.home.x, game.ball.position.x * 0.22 + p.laneBias * 0.14, 0.34);
      targetZ = THREE.MathUtils.lerp(p.home.z, game.ball.position.z - p.team * 1.7, 0.3);
    }
    return { attackLane: p.attackLane, keeperShotOnGoal, targetX, targetZ };
  }

  return null;
}

export function getFootballOpenPlayTargetRuntime(context) {
  const {
    FOOTBALL_BEHAVIOR,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    attackGoalZ,
    attackIndex,
    attackerCount,
    attackerProfile,
    ballDist,
    ballProgress,
    ballSide,
    baseShotHunger,
    controllingTeam,
    defendGoalZ,
    defendIndex,
    dt,
    game,
    isCounterRunner,
    ownHalfBias,
    p,
    roamX,
    roamZ,
    stallUrgency,
    tacticalRole,
    targetX,
    targetZ,
    teamLeader,
    trapPress
  } = context;

  let nextAttackLane = p.attackLane;
  let nextTargetX = targetX;
  let nextTargetZ = targetZ;
  let keeperShotOnGoal = false;

  if (p.role === "keeper") {
    ({
      keeperShotOnGoal,
      targetX: nextTargetX,
      targetZ: nextTargetZ
    } = getFootballKeeperTargetRuntime({
      ballDist,
      defendGoalZ,
      dt,
      game,
      ownHalfBias,
      p
    }));
    return { attackLane: nextAttackLane, keeperShotOnGoal, targetX: nextTargetX, targetZ: nextTargetZ };
  }

  if (tacticalRole === "defender" || tacticalRole === "supportAttack" || tacticalRole === "recoverDefence") {
    const supportTarget = getFootballOutfieldSupportTargetRuntime({
      FOOTBALL_BEHAVIOR,
      ballDist,
      ballSide,
      controllingTeam,
      defendGoalZ,
      defendIndex,
      game,
      ownHalfBias,
      p,
      roamX,
      roamZ,
      tacticalRole,
      teamLeader
    });
    if (supportTarget) {
      nextAttackLane = supportTarget.attackLane;
      nextTargetX = supportTarget.targetX;
      nextTargetZ = supportTarget.targetZ;
    }
    return { attackLane: nextAttackLane, keeperShotOnGoal, targetX: nextTargetX, targetZ: nextTargetZ };
  }

  const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x);
  if (controllingTeam === p.team) {
    if (p === teamLeader) {
      nextTargetX = game.ball.position.x;
      nextTargetZ = game.ball.position.z;
    } else if (isCounterRunner) {
      const counterLane = laneSign === 0 ? Math.sign(p.laneBias || 1) : laneSign;
      const counterX = THREE.MathUtils.clamp(counterLane * (FOOTBALL_FIELD_HALF_WIDTH - 1.1), -FOOTBALL_FIELD_HALF_WIDTH + 0.95, FOOTBALL_FIELD_HALF_WIDTH - 0.95);
      const counterZ = THREE.MathUtils.clamp(game.ball.position.z + p.team * (3.8 + Math.max(0, attackIndex) * 0.45), -FOOTBALL_FIELD_HALF_LENGTH + 1.1, FOOTBALL_FIELD_HALF_LENGTH - 0.7);
      nextTargetX = THREE.MathUtils.lerp(roamX, counterX, 0.9);
      nextTargetZ = counterZ;
    } else if ((p.oneTwoTimer ?? 0) > 0.05 && p.oneTwoPartner) {
      nextAttackLane = "link";
      nextTargetX = THREE.MathUtils.lerp(roamX, p.oneTwoTargetX ?? roamX, 0.9);
      nextTargetZ = THREE.MathUtils.lerp(roamZ, p.oneTwoTargetZ ?? roamZ, 0.92);
    } else {
      ({
        attackLane: nextAttackLane,
        targetX: nextTargetX,
        targetZ: nextTargetZ
      } = getFootballAttackerTargetRuntime({
        attackGoalZ,
        attackIndex,
        attackerCount,
        attackerProfile,
        ballProgress,
        ballSide,
        baseShotHunger,
        game,
        laneSign,
        p,
        roamX
      }));
    }
  } else if ((p === teamLeader && ballDist < (trapPress ? 5.2 : 3.35)) || (trapPress && p.role === "attacker" && ballDist < 4.1)) {
    nextTargetX = game.ball.position.x + p.laneBias * (trapPress ? 0.14 : 0.08);
    nextTargetZ = game.ball.position.z - p.team * (trapPress ? 0.18 : 0.24);
  } else if (trapPress) {
    const pressLane = laneSign === 0 ? Math.sign(p.laneBias || 1) : laneSign;
    const pressWidth = p.role === "attacker" ? 0.3 : 0.56;
    const pressDepth = p.role === "attacker" ? 0.3 : 0.82 + Math.max(0, attackIndex) * 0.12;
    const trapX = THREE.MathUtils.lerp(p.home.x * 0.46, game.ball.position.x * 0.58 + pressLane * pressWidth, 0.62);
    const trapZ = THREE.MathUtils.lerp(roamZ, game.ball.position.z - p.team * pressDepth, 0.42 + stallUrgency * 0.12);
    nextTargetX = trapX;
    nextTargetZ = trapZ;
  } else {
    const coverX = THREE.MathUtils.lerp(p.home.x, game.ball.position.x * 0.34 + laneSign * 1.12, 0.48);
    const coverZ = THREE.MathUtils.lerp(roamZ, game.ball.position.z - p.team * (1.05 + Math.max(0, attackIndex) * 0.18), 0.24 + ownHalfBias * 0.1);
    nextTargetX = coverX;
    nextTargetZ = coverZ;
  }

  return { attackLane: nextAttackLane, keeperShotOnGoal, targetX: nextTargetX, targetZ: nextTargetZ };
}

export function updateFootballPlayerMovementRuntime(context) {
  const {
    FOOTBALL_BEHAVIOR,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_GOAL_DEPTH,
    FOOTBALL_GOAL_WIDTH,
    FOOTBALL_PERSON_RADIUS,
    activeBallPlayer,
    animateRunner,
    ballDist,
    clampFootballHumanPosition,
    dt,
    game,
    i,
    isCounterRunner,
    isDeliveryTarget,
    keeperShotOnGoal,
    p,
    steerFootballFacing,
    tacticalRole,
    targetX,
    targetZ,
    urgencyRunBias
  } = context;

  let currentTargetX = targetX;
  let currentTargetZ = targetZ;

  if (!Number.isFinite(p.shapeTargetX) || !Number.isFinite(p.shapeTargetZ)) {
    p.shapeTargetX = currentTargetX;
    p.shapeTargetZ = currentTargetZ;
  }
  const shapeResponse = isDeliveryTarget ? 13.5 : activeBallPlayer === p ? 11.5 : 6.2;
  p.shapeTargetX = THREE.MathUtils.damp(p.shapeTargetX, currentTargetX, shapeResponse, dt);
  p.shapeTargetZ = THREE.MathUtils.damp(p.shapeTargetZ, currentTargetZ, shapeResponse, dt);
  currentTargetX = p.shapeTargetX;
  currentTargetZ = p.shapeTargetZ;

  const dirX = currentTargetX - p.runner.root.position.x;
  const dirZ = currentTargetZ - p.runner.root.position.z;
  const dirLen = Math.max(0.001, Math.hypot(dirX, dirZ));
  const keeperSpeedBoost = p.role === "keeper"
    ? (keeperShotOnGoal ? 0.44 : ballDist < 3.6 ? 0.24 : 0)
    : 0;
  const baseSpeed = p.role === "keeper" ? 1.72 + (p.saveReach ?? 0) * 0.26 + keeperSpeedBoost : isCounterRunner ? 1.72 : tacticalRole === "supportAttack" ? 1.48 : tacticalRole === "recoverDefence" ? 1.46 : p.role === "defender" ? 1.38 + FOOTBALL_BEHAVIOR.defenderSpeedBonus : 1.56;
  const burst = isCounterRunner ? 1.08 : (tacticalRole === "attacker" || tacticalRole === "supportAttack") && ballDist < 2.4 ? 1 : ballDist < 2.5 ? 0.72 : 0.2;
  const tempoPulse = 1
    + Math.sin(game.phase * (1.2 + (p.tempoRate ?? 1) * 0.45) + (p.tempoPhase ?? 0)) * 0.09 * (p.tempoJitter ?? 1)
    + Math.sin(game.phase * (2.1 + (p.tempoRate ?? 1) * 0.3) + (p.tempoPhase ?? 0) * 1.7) * 0.04;
  const burstPulse = p.burstTimer > 0 ? (p.burstBoost ?? 0) * THREE.MathUtils.clamp(p.burstTimer / 0.85, 0, 1) : 0;
  const runSprintBoost = p.goalRunTimer > 0 ? 0.18 + Math.min(0.16, p.goalRunTimer * 0.12) : 0;
  const speedPulse = THREE.MathUtils.clamp(tempoPulse + burstPulse + runSprintBoost + (isCounterRunner ? 0.06 : 0), 0.78, 1.48);
  const desiredSpeed = (baseSpeed + burst * p.pressBias + urgencyRunBias) * p.speedBias * (p.paceVariance ?? 1) * speedPulse;
  const targetDeadzone = activeBallPlayer === p ? 0.02 : isDeliveryTarget ? 0.08 : 0.18;
  const desiredVx = dirLen <= targetDeadzone ? 0 : (dirX / dirLen) * desiredSpeed;
  const desiredVz = dirLen <= targetDeadzone ? 0 : (dirZ / dirLen) * desiredSpeed;

  const movementDamp = p.role === "keeper" ? (keeperShotOnGoal ? 11.5 : 9.6) : 8;
  p.vx = THREE.MathUtils.damp(p.vx, desiredVx, movementDamp, dt);
  p.vz = THREE.MathUtils.damp(p.vz, desiredVz, movementDamp, dt);

  for (let j = 0; j < game.players.length; j += 1) {
    if (i === j) continue;
    const other = game.players[j];
    const sx = p.runner.root.position.x - other.runner.root.position.x;
    const sz = p.runner.root.position.z - other.runner.root.position.z;
    const sd = Math.hypot(sx, sz);
    if (sd < FOOTBALL_PERSON_RADIUS * 2.0) {
      const safeSd = sd > 0.001 ? sd : 1;
      const sxNorm = sd > 0.001 ? sx / safeSd : Math.cos((i * 1.37 + j * 2.11) % (Math.PI * 2));
      const szNorm = sd > 0.001 ? sz / safeSd : Math.sin((i * 1.37 + j * 2.11) % (Math.PI * 2));
      const sameTeam = p.team === other.team ? 1.1 : 0.72;
      const push = (FOOTBALL_PERSON_RADIUS * 2.0 - Math.min(sd, FOOTBALL_PERSON_RADIUS * 1.98)) * 2.7 * sameTeam;
      p.vx += sxNorm * push * dt;
      p.vz += szNorm * push * dt;
    }
  }

  p.runner.root.position.x += p.vx * dt;
  p.runner.root.position.z += p.vz * dt;

  const clampedPlayerPos = clampFootballHumanPosition(p.runner.root.position.x, p.runner.root.position.z);
  p.runner.root.position.x = clampedPlayerPos.x;
  p.runner.root.position.z = clampedPlayerPos.z;
  if (p.role === "keeper") {
    const keeperGoalLine = -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
    const keeperGoalTravel = (p.runner.root.position.z - keeperGoalLine) * -p.team;
    const clampedTravel = THREE.MathUtils.clamp(keeperGoalTravel, -0.06, FOOTBALL_GOAL_DEPTH - 0.92);
    if (Math.abs(clampedTravel - keeperGoalTravel) > 0.0001) {
      p.runner.root.position.z = keeperGoalLine - p.team * clampedTravel;
      p.vz = 0;
    }
    p.runner.root.position.x = THREE.MathUtils.clamp(p.runner.root.position.x, -FOOTBALL_GOAL_WIDTH * 0.42, FOOTBALL_GOAL_WIDTH * 0.42);
  }

  const moveSpeed = Math.hypot(p.vx, p.vz);
  let movementPose = { kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: p.sprintBlend ?? 0 };
  let animSpeed = moveSpeed;
  if (p.role === "keeper" && p.diveBlend <= 0) {
    const keeperLookX = game.ball.position.x - p.runner.root.position.x;
    const keeperLookZ = game.ball.position.z - p.runner.root.position.z;
    const keeperFacing = Math.atan2(keeperLookX, keeperLookZ);
    p.runner.root.rotation.y = steerFootballFacing(p.runner.root.rotation.y, keeperFacing, dt, 8.8);
    const rightX = Math.cos(p.runner.root.rotation.y);
    const rightZ = -Math.sin(p.runner.root.rotation.y);
    const lateralSpeed = p.vx * rightX + p.vz * rightZ;
    const forwardSpeed = p.vx * Math.sin(p.runner.root.rotation.y) + p.vz * Math.cos(p.runner.root.rotation.y);
    const saveFocus = THREE.MathUtils.clamp((Math.abs(game.ball.position.z - currentTargetZ) - 0.4) / 2.8, 0, 1);
    const keeperReadyAmount = THREE.MathUtils.clamp(
      (keeperShotOnGoal ? 0.85 : 0.35 + saveFocus * 0.45) * (1 - THREE.MathUtils.clamp(moveSpeed / 1.35, 0, 1)),
      0,
      1
    );
    const sideStepAmount = Math.abs(lateralSpeed) > Math.abs(forwardSpeed) + 0.04
      ? THREE.MathUtils.clamp(Math.abs(lateralSpeed) / 1.05, 0, 1)
      : 0;
    movementPose = {
      ...movementPose,
      keeperSetAmount: keeperReadyAmount,
      keeperSetDir: Math.sign((game.ball.position.x - p.runner.root.position.x) || lateralSpeed || 1)
    };
    if (sideStepAmount > 0.02) {
      movementPose.type = "sideStep";
      movementPose.amount = sideStepAmount;
      movementPose.dir = Math.sign(lateralSpeed || 1);
    }
    animSpeed = sideStepAmount > 0.02 ? Math.abs(lateralSpeed) * 0.58 : Math.min(moveSpeed, 0.16);
  } else if (moveSpeed > 0.05) {
    const moveYaw = Math.atan2(p.vx, p.vz);
    const targetYaw = Math.abs(Math.atan2(Math.sin(moveYaw - p.runner.root.rotation.y), Math.cos(moveYaw - p.runner.root.rotation.y))) > Math.PI * 0.72
      ? Math.atan2(dirX, dirZ)
      : moveYaw;
    p.runner.root.rotation.y = steerFootballFacing(p.runner.root.rotation.y, targetYaw, dt, 7.2);
  }
  const sprintTarget = THREE.MathUtils.clamp((moveSpeed - (p.role === "keeper" ? 1.28 : 1.62)) / 0.9, 0, 1)
    + (p.goalRunTimer > 0 ? 0.42 : 0)
    + (p.burstTimer > 0 ? 0.2 : 0);
  p.sprintBlend = THREE.MathUtils.damp(p.sprintBlend ?? 0, THREE.MathUtils.clamp(sprintTarget, 0, 1), 6.5, dt);
  movementPose.sprintAmount = p.role === "keeper" ? 0 : (p.sprintBlend ?? 0);
  p.cycle += dt * (4.8 + moveSpeed * 2.8) * (p.strideRate ?? 1);
  animateRunner(
    p.runner,
    animSpeed,
    p.cycle,
    p.role === "keeper" && p.diveBlend > 0.04 ? p.saveLift : 0,
    p.role === "keeper" && p.diveBlend > 0
      ? { type: "keeperDive", amount: p.diveBlend, dir: p.diveDir, saveHeight: p.saveHeight ?? 0.45, kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: 0 }
      : movementPose
  );
}

export function adjustFootballPlayerTargetRuntime(context) {
  const {
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    game,
    isDeliveryTarget,
    p,
    shapeLiftBias,
    tacticalRole,
    targetX,
    targetZ
  } = context;

  let adjustedTargetX = targetX;
  let adjustedTargetZ = targetZ;

  if (isDeliveryTarget) {
    const receiveLead = 0.24 + Math.min(0.22, game.deliveryTimer * 0.24);
    const receiveX = THREE.MathUtils.clamp(game.ball.position.x + game.ballVel.x * receiveLead, -FOOTBALL_FIELD_HALF_WIDTH + 0.7, FOOTBALL_FIELD_HALF_WIDTH - 0.7);
    const receiveZ = THREE.MathUtils.clamp(game.ball.position.z + game.ballVel.z * receiveLead, -FOOTBALL_FIELD_HALF_LENGTH + 0.7, FOOTBALL_FIELD_HALF_LENGTH - 0.45);
    adjustedTargetX = THREE.MathUtils.lerp(adjustedTargetX, receiveX, 0.94);
    adjustedTargetZ = THREE.MathUtils.lerp(adjustedTargetZ, receiveZ, 0.95);
  }

  if (shapeLiftBias > 0.01 && p.role !== "keeper") {
    const roleLift = tacticalRole === "attacker"
      ? 2.2
      : tacticalRole === "supportAttack"
        ? 1.65
        : p.role === "defender"
          ? 1.05
          : 1.3;
    const laneStretch = p.role === "attacker" ? Math.abs(p.home.x) * 0.08 : 0;
    const liftedTargetZ = THREE.MathUtils.clamp(
      adjustedTargetZ + p.team * (roleLift + laneStretch) * shapeLiftBias,
      -FOOTBALL_FIELD_HALF_LENGTH + 0.95,
      FOOTBALL_FIELD_HALF_LENGTH - 0.65
    );
    adjustedTargetZ = Math.max(adjustedTargetZ * p.team, liftedTargetZ * p.team) * p.team;
  }

  if (p.role !== "keeper" && (p.commitForwardTimer ?? 0) > 0.001) {
    const commitBlend = THREE.MathUtils.clamp(0.48 + (p.commitForwardTimer ?? 0) * 0.55, 0.48, 0.92);
    adjustedTargetX = THREE.MathUtils.lerp(adjustedTargetX, p.commitTargetX ?? adjustedTargetX, commitBlend * 0.78);
    adjustedTargetZ = THREE.MathUtils.lerp(adjustedTargetZ, p.commitTargetZ ?? adjustedTargetZ, commitBlend);
  }

  return {
    targetX: adjustedTargetX,
    targetZ: adjustedTargetZ
  };
}

export function getFootballPlayerDerivedStateRuntime(context) {
  const {
    controllingTeam,
    game,
    p,
    teamLeader
  } = context;

  const ballProgress = game.ball.position.z * p.team;
  const ownHalfBias = THREE.MathUtils.clamp((-game.ball.position.z * p.team + 0.4) / 6.2, 0, 1);
  const ballSide = Math.abs(game.ball.position.x) < 1.2 ? 0 : Math.sign(game.ball.position.x);
  const isCounterRunner = game.counterTeam === p.team && game.counterRunner === p && game.counterTimer > 0;
  const attackerProfile = p.attackerProfile ?? null;
  const baseShotHunger = p.shotHunger ?? 0.75;
  const kickoffContestActive = (game.kickoffContestTimer ?? 0) > 0
    && Math.abs(game.ball.position.x) < FOOTBALL_CENTER_CIRCLE_RADIUS + 1.1
    && Math.abs(game.ball.position.z) < FOOTBALL_CENTER_CIRCLE_RADIUS + 1.4;
  const stallUrgency = THREE.MathUtils.clamp((game.stallTimer - 0.35) / 1.45, 0, 1);
  const teamIsStalling = game.stallTeam === p.team && stallUrgency > 0;
  const trapPress = game.stallTeam === -p.team && stallUrgency > 0.32;
  const shapeLiftBias = controllingTeam === p.team && teamIsStalling
    ? THREE.MathUtils.clamp((game.stallTimer - 0.6) / 1.85, 0, 1.35)
    : 0;
  const urgencyRunBias = shapeLiftBias * (p.role === "attacker" ? 0.24 : p.role === "defender" ? 0.12 : 0.16);
  const supportAttack = p.role === "defender" && controllingTeam === p.team && (teamIsStalling || (Math.abs(p.home.x) > 0.5 ? ballProgress > -2.4 || isCounterRunner : ballProgress > 0.7 || p === teamLeader || isCounterRunner));
  const recoverDefence = p.role === "attacker" && controllingTeam !== p.team && ownHalfBias > 0.42 && !trapPress;
  const tacticalRole = p.role === "keeper" ? "keeper" : supportAttack ? "supportAttack" : recoverDefence ? "recoverDefence" : p.role;

  return {
    attackerProfile,
    ballProgress,
    ballSide,
    baseShotHunger,
    isCounterRunner,
    kickoffContestActive,
    ownHalfBias,
    shapeLiftBias,
    stallUrgency,
    tacticalRole,
    teamIsStalling,
    trapPress,
    urgencyRunBias
  };
}

export function prepareFootballPlayerFrameRuntime(context) {
  const {
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    activeBallPlayer,
    attackGoalZ,
    attackerProfile,
    cameraWorldPos,
    closestToBall,
    controllingTeam,
    dt,
    game,
    opponents,
    p,
    tacticalRole
  } = context;

  p.attackLane = "hold";
  p.kickCooldown = Math.max(0, p.kickCooldown - dt);
  p.kickBlend = Math.max(0, (p.kickBlend ?? 0) - dt * 6.4);
  p.bangerCooldown = Math.max(0, (p.bangerCooldown ?? 0) - dt);
  p.burstTimer = Math.max(0, (p.burstTimer ?? 0) - dt);
  p.burstCooldown = Math.max(0, (p.burstCooldown ?? 0) - dt);
  p.goalRunTimer = Math.max(0, (p.goalRunTimer ?? 0) - dt);
  p.goalRunCooldown = Math.max(0, (p.goalRunCooldown ?? 0) - dt);
  p.oneTwoTimer = Math.max(0, (p.oneTwoTimer ?? 0) - dt);
  p.oneTwoCooldown = Math.max(0, (p.oneTwoCooldown ?? 0) - dt);
  p.oneTwoReturnTimer = Math.max(0, (p.oneTwoReturnTimer ?? 0) - dt);
  p.commitForwardTimer = Math.max(0, (p.commitForwardTimer ?? 0) - dt);
  if ((p.oneTwoTimer ?? 0) <= 0.001) p.oneTwoPartner = null;
  if ((p.oneTwoReturnTimer ?? 0) <= 0.001) p.oneTwoReturnTarget = null;

  p.nextShuffle -= dt;
  if (p.nextShuffle <= 0) {
    p.nextShuffle = 0.55 + Math.random() * 1.45;
    p.roamX = THREE.MathUtils.clamp(p.roamX + (Math.random() - 0.5) * (tacticalRole === "attacker" || tacticalRole === "supportAttack" ? 0.9 : 0.5), -2.4, 2.4);
    p.roamZ = THREE.MathUtils.clamp(p.roamZ + (Math.random() - 0.5) * (tacticalRole === "attacker" || tacticalRole === "supportAttack" ? 0.72 : 0.4), -1.6, 1.6);
    p.pressBias = THREE.MathUtils.clamp(p.pressBias + (Math.random() - 0.5) * 0.18, tacticalRole === "attacker" ? 0.78 : 0.54, tacticalRole === "attacker" ? 1.42 : 1.2);
  }
  if (p.burstCooldown <= 0) {
    const burstChance = p.role === "attacker" ? 0.82 : p.role === "defender" ? 0.58 : 0.28;
    if (Math.random() < burstChance) {
      p.burstTimer = 0.42 + Math.random() * 0.82;
    }
    p.burstCooldown = 0.8 + Math.random() * 1.8;
  }

  const toBallX = game.ball.position.x - p.runner.root.position.x;
  const toBallZ = game.ball.position.z - p.runner.root.position.z;
  const ballDist = Math.hypot(toBallX, toBallZ);
  const isDeliveryTarget = game.deliveryType === "pass" && game.deliveryTeam === p.team && game.deliveryTimer > 0 && game.deliveryTarget === p;
  let nearestOpponentToPlayer = 99;
  let nearestFrontMarker = 99;
  let runLaneTraffic = 0;
  for (let j = 0; j < opponents.length; j += 1) {
    const opp = opponents[j];
    if (opp.role === "keeper") continue;
    const relX = opp.runner.root.position.x - p.runner.root.position.x;
    const relZ = (opp.runner.root.position.z - p.runner.root.position.z) * p.team;
    const oppDist = Math.hypot(relX, relZ);
    nearestOpponentToPlayer = Math.min(nearestOpponentToPlayer, oppDist);
    if (relZ > -0.35 && relZ < 7.2 && Math.abs(relX) < 1.9) {
      nearestFrontMarker = Math.min(nearestFrontMarker, relZ);
      runLaneTraffic += (1 - Math.min(1, Math.abs(relX) / 1.9)) * (1 - Math.min(1, relZ / 7.2));
    }
  }

  if (p.role === "attacker") {
    if (controllingTeam !== p.team || activeBallPlayer === p || isDeliveryTarget) {
      p.goalRunTimer = Math.max(0, p.goalRunTimer - dt * 3.2);
    } else {
      const attackDepth = p.runner.root.position.z * p.team;
      const goalGap = attackGoalZ * p.team - attackDepth;
      const laneSign = p.home.x === 0 ? Math.sign(p.laneBias || 1) : Math.sign(p.home.x);
      const carrier = game.ballHolder && game.ballHolder.team === p.team ? game.ballHolder : closestToBall[p.team];
      const carrierX = carrier ? carrier.runner.root.position.x : game.ball.position.x;
      const runWindow = goalGap > 2.6 && goalGap < 11.8 && ballDist > 2.4 && ballDist < 10.5;
      const attackFreedom = nearestOpponentToPlayer > 1.55 && nearestFrontMarker > 1.1 && runLaneTraffic < 1.05;
      if (p.goalRunTimer <= 0 && p.goalRunCooldown <= 0 && runWindow && attackFreedom) {
        const runSide = laneSign === 0 ? Math.sign((p.runner.root.position.x - carrierX) || p.laneBias || 1) : laneSign;
        const startWide = attackerProfile === "runner" ? 2.05 : attackerProfile === "poacher" ? 1.15 : 0.82;
        p.goalRunTargetX = THREE.MathUtils.clamp(
          THREE.MathUtils.lerp(p.runner.root.position.x, runSide * startWide + carrierX * 0.12, attackerProfile === "playmaker" ? 0.32 : attackerProfile === "runner" ? 0.72 : 0.6),
          -FOOTBALL_FIELD_HALF_WIDTH + 0.85,
          FOOTBALL_FIELD_HALF_WIDTH - 0.85
        );
        p.goalRunTargetZ = THREE.MathUtils.clamp(
          attackGoalZ - p.team * ((attackerProfile === "poacher" ? 1.05 : attackerProfile === "runner" ? 1.35 : 2.05) + Math.random() * 0.8),
          -FOOTBALL_FIELD_HALF_LENGTH + 0.85,
          FOOTBALL_FIELD_HALF_LENGTH - 0.5
        );
        p.goalRunTimer = 1.1 + Math.random() * 1.15 + Math.min(0.45, p.pressBias * 0.18);
        p.goalRunCooldown = 2.4 + Math.random() * 2.4;
      }
    }
  }

  if (p.nameTag) {
    const cameraDist = cameraWorldPos.distanceTo(p.runner.root.position);
    const nearBallFade = THREE.MathUtils.clamp((8.6 - ballDist) / 4.4, 0, 1);
    const cameraFade = THREE.MathUtils.clamp((52 - cameraDist) / 26, 0.56, 1);
    const holderBoost = game.ballHolder === p ? 1 : 0;
    const baseOpacity = 0.72 + 0.2 * nearBallFade;
    const labelOpacity = THREE.MathUtils.clamp((baseOpacity + holderBoost * 0.2) * cameraFade, 0, 1);
    p.nameTag.visible = labelOpacity > 0.08;
    p.nameTag.material.opacity = labelOpacity;
  }

  return {
    ballDist,
    isDeliveryTarget,
    roamX: p.home.x + p.roamX,
    roamZ: p.home.z + p.roamZ
  };
}


