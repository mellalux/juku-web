import * as THREE from "./three.js";
import { getFootballRouteTargetRuntime } from "./football-routing-runtime.js";
import {
  ATHLETE_BALL_REACH,
  ARCADE_KEEPER_NERF,
  ARCADE_SCORING_BOOST,
  COACH_PERSON_RADIUS,
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

function getDistanceToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  const t = lenSq > 0.000001
    ? THREE.MathUtils.clamp(((px - ax) * dx + (pz - az) * dz) / lenSq, 0, 1)
    : 0;
  const closestX = ax + dx * t;
  const closestZ = az + dz * t;
  return Math.hypot(px - closestX, pz - closestZ);
}

function collectFootballPlayerRouteBlockers(game, player, targetX, targetZ) {
  const currentX = player.runner.root.position.x;
  const currentZ = player.runner.root.position.z;
  const blockers = [];

  for (let i = 0; i < game.players.length; i += 1) {
    const other = game.players[i];
    if (other === player) continue;
    const otherX = other.runner.root.position.x;
    const otherZ = other.runner.root.position.z;
    const distToCurrent = Math.hypot(otherX - currentX, otherZ - currentZ);
    const distToTarget = Math.hypot(otherX - targetX, otherZ - targetZ);
    const laneDist = getDistanceToSegment(otherX, otherZ, currentX, currentZ, targetX, targetZ);
    if (distToCurrent > 6.2 && distToTarget > 4.8 && laneDist > 2.1) continue;
    blockers.push({ x: otherX, z: otherZ, r: FOOTBALL_PERSON_RADIUS * 0.92 });
  }

  if (game.coach) {
    const coachX = game.coach.runner.root.position.x;
    const coachZ = game.coach.runner.root.position.z;
    const distToCurrent = Math.hypot(coachX - currentX, coachZ - currentZ);
    const distToTarget = Math.hypot(coachX - targetX, coachZ - targetZ);
    const laneDist = getDistanceToSegment(coachX, coachZ, currentX, currentZ, targetX, targetZ);
    if (distToCurrent <= 6.6 || distToTarget <= 5 || laneDist <= 2.25) {
      blockers.push({ x: coachX, z: coachZ, r: COACH_PERSON_RADIUS * 0.88 });
    }
  }

  return blockers;
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
  const routedTarget = getFootballRouteTargetRuntime(
    game,
    p,
    p.runner.root.position.x,
    p.runner.root.position.z,
    currentTargetX,
    currentTargetZ,
    {
      radius: FOOTBALL_PERSON_RADIUS,
      dynamicBlockers: collectFootballPlayerRouteBlockers(game, p, currentTargetX, currentTargetZ)
    }
  );
  currentTargetX = routedTarget.x;
  currentTargetZ = routedTarget.z;

  const dirX = currentTargetX - p.runner.root.position.x;
  const dirZ = currentTargetZ - p.runner.root.position.z;
  const dirLen = Math.max(0.001, Math.hypot(dirX, dirZ));
  const keeperDiveAmount = p.role === "keeper" ? THREE.MathUtils.clamp(p.diveBlend ?? 0, 0, 1) : 0;
  const keeperDiveProgress = p.role === "keeper" ? 1 - keeperDiveAmount : 0;
  const keeperDiveBurst = p.role === "keeper"
    ? THREE.MathUtils.clamp(
      THREE.MathUtils.smoothstep(keeperDiveAmount, 0.16, 0.96)
      * (1 - THREE.MathUtils.smoothstep(keeperDiveProgress, 0.46, 0.96)),
      0,
      1
    )
    : 0;
  const keeperDiveSkid = p.role === "keeper"
    ? THREE.MathUtils.smoothstep(keeperDiveProgress, 0.34, 0.98)
    : 0;
  const keeperSpeedBoost = p.role === "keeper"
    ? (keeperShotOnGoal ? 0.92 : ballDist < 3.6 ? 0.36 : 0)
    : 0;
  const baseSpeed = p.role === "keeper" ? 2.04 + (p.saveReach ?? 0) * 0.36 + keeperSpeedBoost : isCounterRunner ? 1.72 : tacticalRole === "supportAttack" ? 1.48 : tacticalRole === "recoverDefence" ? 1.46 : p.role === "defender" ? 1.38 + FOOTBALL_BEHAVIOR.defenderSpeedBonus : 1.56;
  const burst = isCounterRunner ? 1.08 : (tacticalRole === "attacker" || tacticalRole === "supportAttack") && ballDist < 2.4 ? 1 : ballDist < 2.5 ? 0.72 : 0.2;
  const tempoPulse = 1
    + Math.sin(game.phase * (1.2 + (p.tempoRate ?? 1) * 0.45) + (p.tempoPhase ?? 0)) * 0.09 * (p.tempoJitter ?? 1)
    + Math.sin(game.phase * (2.1 + (p.tempoRate ?? 1) * 0.3) + (p.tempoPhase ?? 0) * 1.7) * 0.04;
  const burstPulse = p.burstTimer > 0 ? (p.burstBoost ?? 0) * THREE.MathUtils.clamp(p.burstTimer / 0.85, 0, 1) : 0;
  const runSprintBoost = p.goalRunTimer > 0 ? 0.18 + Math.min(0.16, p.goalRunTimer * 0.12) : 0;
  const speedPulse = THREE.MathUtils.clamp(tempoPulse + burstPulse + runSprintBoost + (isCounterRunner ? 0.06 : 0), 0.78, 1.48);
  const desiredSpeed = (baseSpeed + burst * p.pressBias + urgencyRunBias) * p.speedBias * (p.paceVariance ?? 1) * speedPulse;
  const targetDeadzone = activeBallPlayer === p ? 0.02 : isDeliveryTarget ? 0.08 : 0.18;
  let desiredVx = dirLen <= targetDeadzone ? 0 : (dirX / dirLen) * desiredSpeed;
  let desiredVz = dirLen <= targetDeadzone ? 0 : (dirZ / dirLen) * desiredSpeed;
  if (p.role === "keeper" && (p.diveBlend ?? 0) > 0.04) {
    const lateralDiveSpeed = p.diveDir * (5.1 + (p.saveReach ?? 0) * 1.55 + (p.saveHeight ?? 0.45) * 1.45) * keeperDiveBurst;
    const forwardDiveSpeed = p.team * (1.52 + (p.saveHeight ?? 0.45) * 0.96) * keeperDiveBurst
      + p.team * (0.74 + (p.saveHeight ?? 0.45) * 0.42) * keeperDiveSkid;
    desiredVx = desiredVx * 0.08 + lateralDiveSpeed;
    desiredVz = desiredVz * 0.1 + forwardDiveSpeed;
  }

  const movementDamp = p.role === "keeper"
    ? ((p.diveBlend ?? 0) > 0.04 ? 21.5 : keeperShotOnGoal ? 15.2 : 11.8)
    : 8;
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
  let locomotionPosePenalty = 0;
  if (p.role === "keeper" && p.diveBlend <= 0) {
    const keeperLookX = game.ball.position.x - p.runner.root.position.x;
    const keeperLookZ = game.ball.position.z - p.runner.root.position.z;
    const keeperFacing = Math.atan2(keeperLookX, keeperLookZ);
    p.runner.root.rotation.y = steerFootballFacing(p.runner.root.rotation.y, keeperFacing, dt, 11.6);
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
      ? THREE.MathUtils.clamp(Math.abs(lateralSpeed) / 0.9, 0, 1)
      : 0;
    movementPose = {
      ...movementPose,
      keeperSetAmount: keeperReadyAmount,
      keeperSetDir: Math.sign((game.ball.position.x - p.runner.root.position.x) || lateralSpeed || 1)
    };
    if (sideStepAmount > 0.02) {
      movementPose.sideStepAmount = sideStepAmount;
      movementPose.sideStepDir = Math.sign(lateralSpeed || 1);
    }
    animSpeed = sideStepAmount > 0.02 ? Math.abs(lateralSpeed) * 0.84 : Math.min(moveSpeed, 0.28);
  } else if (moveSpeed > 0.05) {
    const moveYaw = Math.atan2(p.vx, p.vz);
    const ballLookX = game.ball.position.x - p.runner.root.position.x;
    const ballLookZ = game.ball.position.z - p.runner.root.position.z;
    const ballFacing = Math.atan2(ballLookX, ballLookZ);
    const ballHolderTeam = game.ballHolder?.team ?? 0;
    const defensiveTracking = ballHolderTeam === -p.team || tacticalRole === "recoverDefence" || p.attackLane === "press" || p.attackLane === "kickoffPress";
    const looseBallTracking = ballHolderTeam === 0;
    const supportTracking = isDeliveryTarget || (ballHolderTeam === p.team && ballDist < 2.6);
    const trackingRange = defensiveTracking ? 6.2 : looseBallTracking ? 4.9 : supportTracking ? 3.2 : 2.25;
    const trackingFalloff = defensiveTracking ? 2.8 : looseBallTracking ? 2.35 : supportTracking ? 1.65 : 1.2;
    const trackingWeight = defensiveTracking ? 1 : looseBallTracking ? 0.82 : supportTracking ? 0.68 : 0.44;
    const ballTrackAmount = activeBallPlayer === p
      ? 0
      : THREE.MathUtils.clamp((trackingRange - ballDist) / trackingFalloff, 0, 1) * trackingWeight;
    const moveVsBallAngle = Math.abs(Math.atan2(Math.sin(moveYaw - ballFacing), Math.cos(moveYaw - ballFacing)));
    const trackBallFacing = ballTrackAmount > 0.1 && moveVsBallAngle > 0.2;
    const fallbackYaw = Math.abs(Math.atan2(Math.sin(moveYaw - p.runner.root.rotation.y), Math.cos(moveYaw - p.runner.root.rotation.y))) > Math.PI * 0.72
      ? Math.atan2(dirX, dirZ)
      : moveYaw;
    const facingYaw = trackBallFacing ? ballFacing : fallbackYaw;
    p.runner.root.rotation.y = steerFootballFacing(
      p.runner.root.rotation.y,
      facingYaw,
      dt,
      trackBallFacing ? 9.1 : 7.2
    );
    if (trackBallFacing) {
      const rightX = Math.cos(p.runner.root.rotation.y);
      const rightZ = -Math.sin(p.runner.root.rotation.y);
      const lateralSpeed = p.vx * rightX + p.vz * rightZ;
      const forwardSpeed = p.vx * Math.sin(p.runner.root.rotation.y) + p.vz * Math.cos(p.runner.root.rotation.y);
      const sideStepAmount = THREE.MathUtils.clamp(
        (Math.abs(lateralSpeed) - Math.max(0.04, forwardSpeed * 0.28)) / 0.92,
        0,
        1
      ) * THREE.MathUtils.clamp(0.36 + ballTrackAmount * 0.92, 0, 1);
      const backpedalAmount = THREE.MathUtils.clamp((-forwardSpeed - 0.04) / 0.95, 0, 1)
        * THREE.MathUtils.clamp(0.42 + ballTrackAmount * 0.88, 0, 1);
      if (sideStepAmount > 0.02) {
        movementPose.sideStepAmount = sideStepAmount;
        movementPose.sideStepDir = Math.sign(lateralSpeed || ballLookX || 1);
      }
      if (backpedalAmount > 0.02) {
        movementPose.backpedalAmount = backpedalAmount;
      }
      locomotionPosePenalty = Math.max(sideStepAmount * 0.22, backpedalAmount * 0.44);
    }
  }
  const sprintTarget = THREE.MathUtils.clamp((moveSpeed - (p.role === "keeper" ? 1.28 : 1.62)) / 0.9, 0, 1) * (1 - locomotionPosePenalty)
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
