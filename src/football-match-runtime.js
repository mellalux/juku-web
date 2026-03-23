import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_CONTROL_HEIGHT,
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_WIDTH,
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
import { updateFootballPlayerRuntime } from "./football-player-runtime.js";
import {
  updateFootballBallRuntime,
  updateFootballPossessionRuntime
} from "./football-ball-runtime.js";
import {
  commitInstancedMesh,
  setAnchoredInstanceTransform
} from "./instanced-build.js";

const FOOTBALL_REF_CARRY_OFFSET = new THREE.Vector3(0.02, -0.02, 0.12);
const FOOTBALL_REF_CARRY_WORLD = new THREE.Vector3();
const FOOTBALL_HURDLE_CONTACT_SAMPLE_POINTS = [
  new THREE.Vector3(0, -0.038, 0.24),
  new THREE.Vector3(0, -0.02, 0.14)
];
const FOOTBALL_HURDLE_WORLD_POINT = new THREE.Vector3();
const FOOTBALL_HURDLE_LOCAL_POINT = new THREE.Vector3();

function countFootballPlayersNearPoint(players, x, z, radius) {
  let count = 0;
  const radiusSq = radius * radius;
  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    const dx = x - player.runner.root.position.x;
    const dz = z - player.runner.root.position.z;
    if (dx * dx + dz * dz < radiusSq) count += 1;
  }
  return count;
}

function getFootballClosestPriorityPlayer(players, x, z, team = 0) {
  let bestPlayer = null;
  let bestPriority = Infinity;
  let bestDist = Infinity;

  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    if (team !== 0 && player.team !== team) continue;
    const priority = player.role === "keeper" ? 0 : player.role === "defender" ? 1 : 2;
    const dist = Math.hypot(x - player.runner.root.position.x, z - player.runner.root.position.z);
    if (priority < bestPriority || (priority === bestPriority && dist < bestDist)) {
      bestPlayer = player;
      bestPriority = priority;
      bestDist = dist;
    }
  }

  return bestPlayer;
}

export function updateFootballOfficialsAndTrackRuntime(game, dt, trackDt, deps) {
  const {
    animateRunner,
    cameraWorldPos,
    clampFootballRefereePosition,
    getFootballRefereeTarget,
    getTrackLaneLength,
    getTrackPointAtProgress,
    steerFootballFacing
  } = deps;

  if (game.coach && !game.celebration?.active) {
    game.coach.whistleTimer = Math.max(0, game.coach.whistleTimer - dt);
    game.coach.cardTimer = Math.max(0, game.coach.cardTimer - dt);
    game.coach.cardCooldown = Math.max(0, game.coach.cardCooldown - dt);
    game.coach.carryBlend = THREE.MathUtils.damp(
      game.coach.carryBlend ?? 0,
      game.refRestart?.active && game.refRestart.phase !== "toBall" ? 1 : 0,
      7.5,
      dt
    );
    const refTarget = getFootballRefereeTarget(game);
    const refDx = refTarget.x - game.coach.runner.root.position.x;
    const refDz = refTarget.z - game.coach.runner.root.position.z;
    const refDist = Math.hypot(refDx, refDz);
    const desiredSpeed = refDist > 4.2 ? 3.6 : refDist > 1.8 ? 2.6 : refDist > 0.45 ? 1.35 : 0;
    const desiredVx = refDist > 0.001 ? (refDx / refDist) * desiredSpeed : 0;
    const desiredVz = refDist > 0.001 ? (refDz / refDist) * desiredSpeed : 0;
    game.coach.vx = THREE.MathUtils.damp(game.coach.vx ?? 0, desiredVx, 6.2, dt);
    game.coach.vz = THREE.MathUtils.damp(game.coach.vz ?? 0, desiredVz, 6.2, dt);
    game.coach.runner.root.position.x += game.coach.vx * dt;
    game.coach.runner.root.position.z += game.coach.vz * dt;
    const refClamped = clampFootballRefereePosition(game.coach.runner.root.position.x, game.coach.runner.root.position.z);
    game.coach.runner.root.position.x = refClamped.x;
    game.coach.runner.root.position.z = refClamped.z;
    const moveSpeed = Math.hypot(game.coach.vx ?? 0, game.coach.vz ?? 0);
    const facingTargetX = game.refRestart?.active && game.refRestart.phase !== "toBall"
      ? refTarget.x
      : game.ball.position.x;
    const facingTargetZ = game.refRestart?.active && game.refRestart.phase !== "toBall"
      ? refTarget.z
      : game.ball.position.z;
    const lookDx = facingTargetX - game.coach.runner.root.position.x;
    const lookDz = facingTargetZ - game.coach.runner.root.position.z;
    const coachFacing = Math.atan2(lookDx, lookDz);
    game.coach.runner.root.rotation.y = steerFootballFacing(game.coach.runner.root.rotation.y, coachFacing, dt, 7);
    const coachRightX = Math.cos(coachFacing);
    const coachRightZ = -Math.sin(coachFacing);
    const coachLateral = (game.coach.vx ?? 0) * coachRightX + (game.coach.vz ?? 0) * coachRightZ;
    const coachForward = (game.coach.vx ?? 0) * Math.sin(coachFacing) + (game.coach.vz ?? 0) * Math.cos(coachFacing);
    const coachSideStepAmount = Math.abs(coachLateral) > Math.abs(coachForward) + 0.08 ? THREE.MathUtils.clamp(moveSpeed / 1.6, 0, 1) : 0;

    game.coach.cycle += dt * (4 + moveSpeed * 1.85);
    animateRunner(
      game.coach.runner,
      moveSpeed,
      game.coach.cycle,
      0,
      coachSideStepAmount > 0
        ? { type: "sideStep", amount: coachSideStepAmount, dir: Math.sign(coachLateral || 1), sprintAmount: THREE.MathUtils.clamp(moveSpeed / 2.1, 0, 1) }
        : null
    );
    game.coach.runner.leftArm.rotation.z *= 0.7;
    game.coach.runner.rightArm.rotation.z *= 0.7;
    game.coach.runner.torsoPivot.rotation.z *= 0.55;
    const whistleBlend = THREE.MathUtils.clamp(game.coach.whistleTimer / 0.68, 0, 1);
    const cardBlend = THREE.MathUtils.clamp(game.coach.cardTimer / 1.15, 0, 1);
    if (whistleBlend > 0.001) {
      game.coach.runner.leftArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.x, -2.35, whistleBlend);
      game.coach.runner.leftArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.z, 0.28, whistleBlend);
      game.coach.runner.leftArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.y, 0.24, whistleBlend);
      game.coach.runner.head.rotation.x = THREE.MathUtils.lerp(game.coach.runner.head.rotation.x, -0.16, whistleBlend * 0.8);
      game.coach.runner.head.rotation.y += THREE.MathUtils.clamp(lookDx * 0.018, -0.08, 0.08) * whistleBlend;
      game.coach.runner.torsoPivot.rotation.x -= 0.06 * whistleBlend;
    }
    if (cardBlend > 0.001) {
      game.coach.runner.rightArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.x, -3.02, cardBlend);
      game.coach.runner.rightArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.z, -0.08, cardBlend);
      game.coach.runner.rightArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.y, -0.04, cardBlend);
      game.coach.runner.torsoPivot.rotation.z += 0.08 * cardBlend;
      game.coach.runner.head.rotation.x = Math.min(game.coach.runner.head.rotation.x, -0.06 * cardBlend);
    }
    const carryBlend = THREE.MathUtils.clamp(game.coach.carryBlend ?? 0, 0, 1);
    if (carryBlend > 0.001) {
      game.coach.runner.leftArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.x, -1.12, carryBlend);
      game.coach.runner.leftArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.z, 0.38, carryBlend);
      game.coach.runner.leftArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.y, 0.32, carryBlend);
      game.coach.runner.rightArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.x, -0.46, carryBlend * 0.75);
      game.coach.runner.rightArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.z, -0.18, carryBlend * 0.75);
      game.coach.runner.torsoPivot.rotation.z += 0.05 * carryBlend;
      game.coach.runner.torsoPivot.rotation.x -= 0.04 * carryBlend;
    }
    game.coach.runner.head.rotation.y = THREE.MathUtils.clamp(-lookDx * 0.045 + game.coach.runner.head.rotation.y, -0.28, 0.28);
    game.coach.runner.head.rotation.x = THREE.MathUtils.clamp(game.coach.runner.head.rotation.x + moveSpeed * 0.01 - lookDz * 0.0035, -0.2, 0.08);
    if (game.coach.yellowCard) {
      const showYellow = game.coach.cardColor === "yellow";
      game.coach.yellowCard.visible = showYellow && cardBlend > 0.02;
      game.coach.yellowCard.material.opacity = showYellow ? 0.92 * cardBlend : 0;
    }
    if (game.coach.redCard) {
      const showRed = game.coach.cardColor === "red";
      game.coach.redCard.visible = showRed && cardBlend > 0.02;
      game.coach.redCard.material.opacity = showRed ? 0.92 * cardBlend : 0;
    }
    if (game.coach.label) {
      const refCameraDist = cameraWorldPos.distanceTo(game.coach.runner.root.position);
      game.coach.label.material.opacity = THREE.MathUtils.clamp((32 - refCameraDist) / 26, 0.18, 0.52);
    }
    if (game.coach.carryBall) {
      game.coach.carryBall.visible = false;
    }
    if (game.refRestart?.active && game.refRestart.phase !== "toBall") {
      game.coach.runner.leftArmRig.handPivot.updateWorldMatrix(true, false);
      const carryWorld = game.coach.runner.leftArmRig.handPivot.localToWorld(
        FOOTBALL_REF_CARRY_WORLD.copy(FOOTBALL_REF_CARRY_OFFSET)
      );
      game.ball.visible = true;
      game.ball.position.copy(carryWorld);
      game.ballVel.set(0, 0, 0);
    }
  }

  const dropHurdle = (hurdle, tipDir) => {
    hurdle.fallen = true;
    hurdle.resetTimer = TRACK_HURDLE_RESET_TIME;
    hurdle.fallProgress = Math.max(hurdle.fallProgress ?? 0, 0.02);
    hurdle.tipDir = tipDir;
    if (hurdle.collider) {
      hurdle.collider.halfX = 0.08;
      hurdle.collider.halfZ = 0.08;
    }
  };

  const getRunnerHurdleImpact = (runnerState, hurdle) => {
    const runner = runnerState.runner;
    if (!runner?.leftLegRig?.footPivot || !runner?.rightLegRig?.footPivot) return null;

    runner.root.updateWorldMatrix(true, true);
    hurdle.mesh.updateWorldMatrix(true, false);

    const barTop = (hurdle.barCenterY ?? ((hurdle.baseY ?? 0.015) + 0.335 * TRACK_HURDLE_SCALE))
      + (hurdle.barHalfHeight ?? (0.0325 * TRACK_HURDLE_SCALE));
    const barBottom = (hurdle.barCenterY ?? ((hurdle.baseY ?? 0.015) + 0.335 * TRACK_HURDLE_SCALE))
      - (hurdle.barHalfHeight ?? (0.0325 * TRACK_HURDLE_SCALE));
    const barHalfWidth = hurdle.barHalfWidth ?? (0.37 * TRACK_HURDLE_SCALE);
    const impactDepth = Math.max(TRACK_HURDLE_CONTACT_DEPTH, hurdle.baseHalfZ ?? (0.12 * TRACK_HURDLE_SCALE));
    const leadSide = Math.sin(runnerState.cycle ?? 0) >= 0 ? 1 : -1;
    const leadLeg = leadSide > 0 ? runner.leftLegRig : runner.rightLegRig;

    let hit = false;
    let hitSide = 0;
    for (let i = 0; i < FOOTBALL_HURDLE_CONTACT_SAMPLE_POINTS.length; i += 1) {
      const worldPoint = leadLeg.footPivot.localToWorld(
        FOOTBALL_HURDLE_WORLD_POINT.copy(FOOTBALL_HURDLE_CONTACT_SAMPLE_POINTS[i])
      );
      const hurdlePoint = hurdle.mesh.worldToLocal(
        FOOTBALL_HURDLE_LOCAL_POINT.copy(worldPoint)
      );
      if (Math.abs(hurdlePoint.x) > barHalfWidth + TRACK_HURDLE_CONTACT_SIDE_MARGIN || Math.abs(hurdlePoint.z) > impactDepth) continue;
      if (worldPoint.y >= barBottom - TRACK_HURDLE_UNDERPASS_MARGIN && worldPoint.y <= barTop + TRACK_HURDLE_CONTACT_HEIGHT_MARGIN) {
        hit = true;
        hitSide += hurdlePoint.z;
      }
    }

    if (!hit) return null;
    return {
      tipDir: hitSide === 0 ? (runnerState.dir > 0 ? -1 : 1) : Math.sign(hitSide)
    };
  };

  game.hurdles.forEach((hurdle) => {
    if (hurdle.fallen) {
      hurdle.resetTimer = Math.max(0, (hurdle.resetTimer ?? TRACK_HURDLE_RESET_TIME) - trackDt);
      if (hurdle.resetTimer <= 0) {
        hurdle.fallen = false;
      }
    } else if (TRACK_HURDLE_RANDOM_FALL_RATE > 0 && Math.random() < trackDt * TRACK_HURDLE_RANDOM_FALL_RATE) {
      dropHurdle(hurdle, Math.random() < 0.5 ? -1 : 1);
    }

    const fallVelocity = hurdle.fallen ? TRACK_HURDLE_FALL_SPEED : -TRACK_HURDLE_FALL_SPEED * 1.2;
    hurdle.fallProgress = THREE.MathUtils.clamp((hurdle.fallProgress ?? 0) + trackDt * fallVelocity, 0, 1);
    const easedFall = hurdle.fallProgress > 0 ? 1 - Math.pow(1 - hurdle.fallProgress, 3) : 0;
    hurdle.mesh.rotation.x = hurdle.tipDir * easedFall * THREE.MathUtils.degToRad(84);
    hurdle.mesh.position.y = (hurdle.baseY ?? 0.015) - easedFall * 0.03;
    if (hurdle.collider) {
      hurdle.collider.halfX = THREE.MathUtils.lerp(hurdle.baseHalfX ?? (0.46 * TRACK_HURDLE_SCALE), 0.12, easedFall);
      hurdle.collider.halfZ = THREE.MathUtils.lerp(hurdle.baseHalfZ ?? (0.12 * TRACK_HURDLE_SCALE), 0.34, easedFall);
    }
    if (game.hurdleVisuals) {
      setAnchoredInstanceTransform(game.hurdleVisuals.leftLegs, hurdle.index, hurdle.mesh, { position: game.hurdleVisuals.leftOffset });
      setAnchoredInstanceTransform(game.hurdleVisuals.rightLegs, hurdle.index, hurdle.mesh, { position: game.hurdleVisuals.rightOffset });
      setAnchoredInstanceTransform(game.hurdleVisuals.bars, hurdle.index, hurdle.mesh, { position: game.hurdleVisuals.barOffset });
    }
  });
  if (game.hurdleVisuals) {
    commitInstancedMesh(game.hurdleVisuals.leftLegs);
    commitInstancedMesh(game.hurdleVisuals.rightLegs);
    commitInstancedMesh(game.hurdleVisuals.bars);
  }

  const getTrackForwardGap = (fromProgress, toProgress, laneLength, dir) => (dir > 0
    ? ((toProgress - fromProgress) % laneLength + laneLength) % laneLength
    : ((fromProgress - toProgress) % laneLength + laneLength) % laneLength);

  const isLaneOpenForRunner = (runnerState, candidateLane, frontClear, backClear) => {
    const dir = runnerState.dir ?? 1;
    const laneLength = getTrackLaneLength(candidateLane);
    for (let i = 0; i < game.trackRunners.length; i += 1) {
      const other = game.trackRunners[i];
      if (other === runnerState) continue;
      const otherTargetLane = other.targetLaneIndex ?? other.laneIndex;
      if (Math.abs(other.laneIndex - candidateLane) > 0.55 && Math.abs(otherTargetLane - candidateLane) > 0.55) continue;
      const aheadGap = getTrackForwardGap(runnerState.progress, other.progress, laneLength, dir);
      const behindGap = laneLength - aheadGap;
      if (aheadGap < frontClear || behindGap < backClear) return false;
    }
    return true;
  };

  game.trackRunners.forEach((runnerState) => {
    const dir = runnerState.dir ?? 1;
    const currentLane = runnerState.laneIndex ?? 0;
    const speedPhase = runnerState.speedPhase ?? 0;
    const speedPulse = 1
      + Math.sin(runnerState.cycle * 0.11 + speedPhase) * 0.05
      + Math.sin(runnerState.cycle * 0.047 + speedPhase * 1.7) * 0.025;
    const desiredSpeed = runnerState.speed * speedPulse;
    runnerState.currentSpeed = desiredSpeed;

    if (!Number.isFinite(runnerState.targetLaneIndex)) {
      runnerState.targetLaneIndex = Math.round(currentLane);
    }

    const laneLength = getTrackLaneLength(currentLane);
    let blocker = null;
    let nearestAhead = Infinity;

    for (let i = 0; i < game.trackRunners.length; i += 1) {
      const other = game.trackRunners[i];
      if (other === runnerState) continue;
      if (Math.abs(other.laneIndex - currentLane) > 0.42) continue;
      const ahead = getTrackForwardGap(runnerState.progress, other.progress, laneLength, dir);
      if (ahead > 0.001 && ahead < nearestAhead) {
        nearestAhead = ahead;
        blocker = other;
      }
    }

    const blockerSpeed = blocker ? (blocker.currentSpeed ?? blocker.speed ?? 0) : 0;
    const wantsToPass = Boolean(blocker) && nearestAhead < TRACK_RUNNER_PASS_TRIGGER && desiredSpeed > blockerSpeed + 0.06;

    if (wantsToPass && (runnerState.targetLaneIndex ?? 0) < TRACK_RUNNER_MAX_PASS_LANE) {
      for (let candidateLane = 1; candidateLane <= TRACK_RUNNER_MAX_PASS_LANE; candidateLane += 1) {
        if (isLaneOpenForRunner(runnerState, candidateLane, TRACK_RUNNER_PASS_FRONT_CLEARANCE, TRACK_RUNNER_PASS_BACK_CLEARANCE)) {
          runnerState.targetLaneIndex = candidateLane;
          break;
        }
      }
    } else if (!wantsToPass && (runnerState.targetLaneIndex ?? 0) > 0) {
      const enoughRoomToReturn = !blocker || nearestAhead > TRACK_RUNNER_PASS_FRONT_CLEARANCE * 0.9;
      if (enoughRoomToReturn && isLaneOpenForRunner(runnerState, 0, TRACK_RUNNER_PASS_FRONT_CLEARANCE * 0.85, TRACK_RUNNER_PASS_BACK_CLEARANCE)) {
        runnerState.targetLaneIndex = 0;
      }
    }

    runnerState.laneIndex = THREE.MathUtils.damp(currentLane, runnerState.targetLaneIndex ?? 0, TRACK_RUNNER_LANE_CHANGE_RATE, trackDt);
    if (Math.abs(runnerState.laneIndex - (runnerState.targetLaneIndex ?? 0)) < 0.02) {
      runnerState.laneIndex = runnerState.targetLaneIndex ?? 0;
    }

    let laneSpeed = desiredSpeed;
    if ((runnerState.targetLaneIndex ?? 0) === 0 && nearestAhead < 1.35) {
      laneSpeed *= THREE.MathUtils.clamp(nearestAhead / 1.35, 0.72, 1);
    }

    const travelLaneLength = getTrackLaneLength(runnerState.laneIndex);
    runnerState.progress = (runnerState.progress + dir * trackDt * laneSpeed * 3.35 + travelLaneLength) % travelLaneLength;
    const point = getTrackPointAtProgress(runnerState.laneIndex, runnerState.progress);
    runnerState.runner.root.position.x = point.x;
    runnerState.runner.root.position.z = point.z;
    runnerState.runner.root.rotation.y = Math.atan2(point.dirX * dir, point.dirZ * dir);

    runnerState.jumpCooldown = Math.max(0, runnerState.jumpCooldown - trackDt);
    let nextHurdle = null;
    let nextHurdleGap = Infinity;
    let contactHurdle = null;
    let contactGap = Infinity;
    for (let i = 0; i < game.hurdles.length; i += 1) {
      const hurdle = game.hurdles[i];
      if (Math.abs(hurdle.laneIndex - runnerState.laneIndex) > 0.35 || hurdle.fallen) continue;
      const hurdleGap = getTrackForwardGap(runnerState.progress, hurdle.progress, travelLaneLength, dir);
      if (hurdleGap > 0.001 && hurdleGap < nextHurdleGap) {
        nextHurdleGap = hurdleGap;
        nextHurdle = hurdle;
      }
      const wrappedGap = Math.min(hurdleGap, travelLaneLength - hurdleGap);
      if (wrappedGap < contactGap) {
        contactGap = wrappedGap;
        contactHurdle = hurdle;
      }
    }
    const hurdleJumpTrigger = TRACK_HURDLE_JUMP_TRIGGER
      + THREE.MathUtils.clamp(laneSpeed * 0.04, 0, TRACK_HURDLE_JUMP_TRIGGER_SPEED_BONUS);
    if (runnerState.jumpY <= 0.0001 && runnerState.jumpCooldown <= 0 && runnerState.laneIndex < 0.35 && nextHurdle && nextHurdleGap < hurdleJumpTrigger) {
      runnerState.jumpVel = TRACK_RUNNER_HURDLE_JUMP_VELOCITY + Math.random() * 0.18;
      runnerState.jumpCooldown = 0.72 + Math.random() * 0.14;
    }

    if (runnerState.jumpY > 0 || runnerState.jumpVel > 0) {
      runnerState.jumpVel -= 8.8 * trackDt;
      runnerState.jumpY += runnerState.jumpVel * trackDt;
      if (runnerState.jumpY <= 0) {
        runnerState.jumpY = 0;
        runnerState.jumpVel = 0;
      }
    }

    runnerState.cycle += trackDt * (5.8 + laneSpeed * 2.35);
    animateRunner(runnerState.runner, laneSpeed * 0.86, runnerState.cycle, runnerState.jumpY);

    if (contactHurdle && contactGap < TRACK_HURDLE_CONTACT_WINDOW) {
      const hurdleImpact = getRunnerHurdleImpact(runnerState, contactHurdle);
      if (hurdleImpact) {
        dropHurdle(contactHurdle, hurdleImpact?.tipDir ?? (dir > 0 ? -1 : 1));
        runnerState.jumpVel = Math.max(runnerState.jumpVel, TRACK_RUNNER_HURDLE_IMPACT_LIFT);
        runnerState.jumpCooldown = Math.max(runnerState.jumpCooldown, 0.48);
      }
    }
  });
}

export function updateFootballMatchStateRuntime(game, dt, context, deps) {
  const {
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  } = context;
  const {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  } = deps;

  if (game.coach) {
    if ((ballHolder && ballHolder !== game.coach.lastBallHolder) || (controllingTeam !== 0 && controllingTeam !== game.coach.lastControllingTeam)) {
      game.coach.whistleTimer = Math.max(game.coach.whistleTimer, 0.68);
    }
    game.coach.lastBallHolder = ballHolder;
    game.coach.lastControllingTeam = controllingTeam;

    let clusteredPlayers = 0;
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      if (p.role === "keeper") continue;
      const distToBall = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
      if (distToBall < 1.34) clusteredPlayers += 1;
    }
    const refBallDist = Math.hypot(game.coach.runner.root.position.x - game.ball.position.x, game.coach.runner.root.position.z - game.ball.position.z);
    const crowdingPlay = clusteredPlayers >= 4 && game.ballVel.length() < 1.05 && refBallDist < 5.4;
    if (crowdingPlay) {
      game.coach.crowdTimer = Math.min(5.5, game.coach.crowdTimer + dt);
    } else {
      game.coach.crowdTimer = Math.max(0, game.coach.crowdTimer - dt * 1.7);
    }
    if (game.coach.cardCooldown <= 0 && game.coach.crowdTimer > 2.2) {
      game.coach.cardColor = game.coach.crowdTimer > 3.8 ? "red" : "yellow";
      game.coach.cardTimer = game.coach.cardColor === "red" ? 1.28 : 1.1;
      game.coach.whistleTimer = Math.max(game.coach.whistleTimer, 0.58);
      game.coach.cardCooldown = game.coach.cardColor === "red" ? 8.5 : 5.5;
      game.coach.crowdTimer = 0;
    }
  }

  const ownGoalDepth = controllingTeam !== 0 ? -game.ball.position.z * controllingTeam : 0;
  const ballForwardProgress = controllingTeam !== 0 ? game.ballVel.z * controllingTeam : 0;
  const trappedInOwnThird = controllingTeam !== 0
    && ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 6.4
    && (game.ballVel.length() < 1.55 || ballForwardProgress < 0.42);
  if (trappedInOwnThird) {
    if (game.stallTeam !== controllingTeam) game.stallTimer = 0;
    game.stallTeam = controllingTeam;
    game.stallTimer = Math.min(4.5, game.stallTimer + dt);
  } else {
    game.stallTimer = Math.max(0, game.stallTimer - dt * (game.stallTeam === controllingTeam ? 1.5 : 2.6));
    if (game.stallTimer <= 0.001) {
      game.stallTimer = 0;
      game.stallTeam = 0;
    }
  }
  const nearOwnGoalScramble = controllingTeam !== 0
    && ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 5.2
    && game.lastTouchTeam === controllingTeam
    && game.sameTeamTouchCount >= 2
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 2.15;
  const ownGoalScramblePlayerCount = nearOwnGoalScramble
    ? countFootballPlayersNearPoint(teamPlayers[controllingTeam], game.ball.position.x, game.ball.position.z, 1.28)
    : 0;
  if (nearOwnGoalScramble && ownGoalScramblePlayerCount >= 2) {
    game.ownGoalScrambleTimer = Math.min(2.2, (game.ownGoalScrambleTimer ?? 0) + dt * (1.2 + ownGoalScramblePlayerCount * 0.35));
  } else {
    game.ownGoalScrambleTimer = Math.max(0, (game.ownGoalScrambleTimer ?? 0) - dt * 3.2);
  }
  if ((game.ownGoalScrambleTimer ?? 0) > 0.16) {
    const emergencyDefender = getFootballClosestPriorityPlayer(
      teamPlayers[controllingTeam],
      game.ball.position.x,
      game.ball.position.z
    );
    if (emergencyDefender) {
      const emergencyClearX = THREE.MathUtils.clamp(
        game.ball.position.x + (Math.random() < 0.5 ? -1 : 1) * (6.8 + Math.random() * 5.8),
        -FOOTBALL_FIELD_HALF_WIDTH * 0.95,
        FOOTBALL_FIELD_HALF_WIDTH * 0.95
      );
      const emergencyClearZ = emergencyDefender.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.8 + Math.random() * 0.12));
      const clearDx = emergencyClearX - game.ball.position.x;
      const clearDz = emergencyClearZ - game.ball.position.z;
      emergencyDefender.runner.root.position.x = THREE.MathUtils.clamp(game.ball.position.x, -FOOTBALL_GOAL_WIDTH * 1.18, FOOTBALL_GOAL_WIDTH * 1.18);
      emergencyDefender.runner.root.position.z = THREE.MathUtils.clamp(game.ball.position.z - emergencyDefender.team * 0.24, -FOOTBALL_FIELD_HALF_LENGTH + 0.8, FOOTBALL_FIELD_HALF_LENGTH - 0.8);
      emergencyDefender.runner.root.rotation.y = Math.atan2(clearDx, clearDz);
      emergencyDefender.kickSide = getFootballFootedness(emergencyDefender, game.ball, emergencyClearX).kickSide;
      applyFootballKickContact(emergencyDefender, game.ball);
      setFootballBallVelocity(game, clearDx, clearDz, 12.8 + Math.random() * 3.6, 2 + Math.random() * 1.05);
      emergencyDefender.kickCooldown = 0.84;
      emergencyDefender.saveCooldown = Math.max(emergencyDefender.saveCooldown ?? 0, emergencyDefender.role === "keeper" ? 0.72 : 0.18);
      emergencyDefender.diveBlend = emergencyDefender.role === "keeper" ? Math.max(emergencyDefender.diveBlend ?? 0, 0.28) : (emergencyDefender.diveBlend ?? 0);
      emergencyDefender.saveLift = emergencyDefender.role === "keeper" ? Math.max(emergencyDefender.saveLift ?? 0, 0.16) : (emergencyDefender.saveLift ?? 0);
      emergencyDefender.saveHeight = emergencyDefender.role === "keeper" ? 0.42 : (emergencyDefender.saveHeight ?? 0.45);
      triggerFootballKickPose(emergencyDefender, game.ball, 1.1, emergencyClearX);
      registerBallTouch(game, emergencyDefender.team, emergencyDefender);
      game.ballHolder = null;
      game.deliveryType = null;
      game.deliveryTeam = 0;
      game.deliveryTimer = 0;
      game.deliverySource = null;
      game.deliveryTarget = null;
      game.sameTeamTouchCount = 0;
      game.ownGoalScrambleTimer = 0;
    }
  }

  if (controllingTeam !== game.lastControllingTeam) {
    if (controllingTeam !== 0) {
      let bestCounter = null;
      let bestCounterScore = -Infinity;
      for (let i = 0; i < teamPlayers[controllingTeam].length; i += 1) {
        const mate = teamPlayers[controllingTeam][i];
        if (mate.role !== "attacker" || mate === closestToBall[controllingTeam]) continue;
        let nearestOpponent = 99;
        for (let j = 0; j < teamPlayers[-controllingTeam].length; j += 1) {
          const opp = teamPlayers[-controllingTeam][j];
          const dist = Math.hypot(mate.runner.root.position.x - opp.runner.root.position.x, mate.runner.root.position.z - opp.runner.root.position.z);
          nearestOpponent = Math.min(nearestOpponent, dist);
        }
        const widthScore = Math.abs(mate.home.x) * 0.42;
        const depthScore = mate.runner.root.position.z * controllingTeam * 0.36;
        const opennessScore = nearestOpponent * 0.9;
        const score = widthScore + depthScore + opennessScore;
        if (score > bestCounterScore) {
          bestCounterScore = score;
          bestCounter = mate;
        }
      }
      game.counterTeam = controllingTeam;
      game.counterTimer = bestCounter ? 3.2 : 0;
      game.counterRunner = bestCounter;
    } else {
      game.counterTeam = 0;
      game.counterTimer = 0;
      game.counterRunner = null;
    }
    game.lastControllingTeam = controllingTeam;
  }

  if (game.counterTimer > 0) {
    game.counterTimer = Math.max(0, game.counterTimer - dt);
    if (game.counterTimer === 0 || game.counterTeam !== controllingTeam) {
      game.counterTeam = 0;
      game.counterRunner = null;
    }
  }
  game.kickoffContestTimer = Math.max(0, (game.kickoffContestTimer ?? 0) - dt);

  if (game.deliveryTimer > 0) {
    game.deliveryTimer = Math.max(0, game.deliveryTimer - dt);
    if (game.deliveryTimer === 0 || (controllingTeam !== 0 && game.deliveryTeam !== controllingTeam)) {
      game.deliveryType = null;
      game.deliveryTeam = 0;
      game.deliverySource = null;
      game.deliveryTarget = null;
    }
  }
  for (let i = 0; i < game.players.length; i += 1) {
    game.players[i].counterRunBoost = game.counterTeam !== 0 && game.players[i] === game.counterRunner ? 1.35 : 0;
  }
}

function updateFootballTransientTimersRuntime(game, dt) {
  game.firstTouchTimer = Math.max(0, (game.firstTouchTimer ?? 0) - dt);
  if ((game.firstTouchTimer ?? 0) <= 0.001) {
    game.firstTouchPlayer = null;
  }
  game.touchShieldTimer = Math.max(0, (game.touchShieldTimer ?? 0) - dt);
  if ((game.touchShieldTimer ?? 0) <= 0.001) {
    game.touchShieldPlayer = null;
  }
  game.duelControlTimer = Math.max(0, (game.duelControlTimer ?? 0) - dt);
  if ((game.duelControlTimer ?? 0) <= 0.001) {
    game.duelControlPlayer = null;
  }
  game.contestTouchTimer = Math.max(0, (game.contestTouchTimer ?? 0) - dt);
  game.contestOwnerTimer = Math.max(0, (game.contestOwnerTimer ?? 0) - dt);
  if ((game.contestOwnerTimer ?? 0) <= 0.001) {
    game.contestOwnerPlayer = null;
  }
  game.contestHardLockTimer = Math.max(0, (game.contestHardLockTimer ?? 0) - dt);
}

function updateFootballGoalmouthStallRuntime(game, dt, deps) {
  const {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  } = deps;

  const nearestGoalSide = Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH * 0.35 ? Math.sign(game.ball.position.z || 1) : 0;
  const nearestGoalZ = nearestGoalSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const goalPostPocketOffset = Math.abs(Math.abs(game.ball.position.x) - FOOTBALL_GOAL_WIDTH * 0.5);
  const inGoalmouthStallZone = nearestGoalSide !== 0
    && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.82
    && Math.abs(game.ball.position.z - nearestGoalZ) < 3.9
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.55;
  const inNearGoalDeadZone = nearestGoalSide !== 0
    && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.55
    && Math.abs(game.ball.position.z - nearestGoalZ) < 5.4
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.85;
  const inGoalSidePocket = nearestGoalSide !== 0
    && goalPostPocketOffset < 2.2
    && Math.abs(game.ball.position.z - nearestGoalZ) < 4.9
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.6;
  if (inGoalmouthStallZone || inNearGoalDeadZone || inGoalSidePocket) {
    const stallGain = inGoalSidePocket ? 2.1 : 1;
    game.goalmouthStallTimer = Math.min(2.2, (game.goalmouthStallTimer ?? 0) + dt * stallGain);
  } else {
    game.goalmouthStallTimer = Math.max(0, (game.goalmouthStallTimer ?? 0) - dt * 2.6);
  }
  const stallResolveThreshold = inGoalSidePocket ? 0.1 : 0.22;
  if ((game.goalmouthStallTimer ?? 0) <= stallResolveThreshold) return;

  const defendingTeam = -nearestGoalSide;
  const emergencyDefender = getFootballClosestPriorityPlayer(
    game.players,
    game.ball.position.x,
    game.ball.position.z,
    defendingTeam
  );
  if (!emergencyDefender) return;

  const emergencyClearX = THREE.MathUtils.clamp(
    game.ball.position.x + (Math.random() < 0.5 ? -1 : 1) * (6.2 + Math.random() * 5.4),
    -FOOTBALL_FIELD_HALF_WIDTH * 0.95,
    FOOTBALL_FIELD_HALF_WIDTH * 0.95
  );
  const emergencyClearZ = emergencyDefender.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.76 + Math.random() * 0.16));
  const clearDx = emergencyClearX - game.ball.position.x;
  const clearDz = emergencyClearZ - game.ball.position.z;
  emergencyDefender.runner.root.position.x = THREE.MathUtils.clamp(game.ball.position.x, -FOOTBALL_GOAL_WIDTH * 1.15, FOOTBALL_GOAL_WIDTH * 1.15);
  emergencyDefender.runner.root.position.z = THREE.MathUtils.clamp(game.ball.position.z - emergencyDefender.team * 0.22, -FOOTBALL_FIELD_HALF_LENGTH + 0.8, FOOTBALL_FIELD_HALF_LENGTH - 0.8);
  emergencyDefender.runner.root.rotation.y = Math.atan2(clearDx, clearDz);
  emergencyDefender.kickSide = getFootballFootedness(emergencyDefender, game.ball, emergencyClearX).kickSide;
  applyFootballKickContact(emergencyDefender, game.ball);
  setFootballBallVelocity(
    game,
    clearDx,
    clearDz,
    (inGoalSidePocket ? 12.4 : 10.6) + Math.random() * 3.4,
    (inGoalSidePocket ? 2.2 : 1.95) + Math.random() * 0.95
  );
  emergencyDefender.kickCooldown = 0.76;
  if (emergencyDefender.role === "keeper") {
    emergencyDefender.saveCooldown = 0.68;
    emergencyDefender.diveBlend = 0;
    emergencyDefender.saveLift = 0.16;
  }
  triggerFootballKickPose(emergencyDefender, game.ball, 1.08, emergencyClearX);
  registerBallTouch(game, emergencyDefender.team, emergencyDefender);
  game.ballHolder = null;
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  game.goalmouthStallTimer = 0;
}

function updateFootballOutOfBoundsRuntime(game, dt, kickoffLocked, startFootballRefRestart) {
  const ballOutsideField = !kickoffLocked
    && !game.goalPending
    && !game.refRestart?.active
    && (
      Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH
      || Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH
    );
  if (ballOutsideField) {
    game.outOfBoundsTimer = Math.min(3, (game.outOfBoundsTimer ?? 0) + dt);
  } else {
    game.outOfBoundsTimer = Math.max(0, (game.outOfBoundsTimer ?? 0) - dt * 3.5);
  }
  const ballClearlyOut = Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH + 0.12
    || Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH + 0.12;
  const deadBallOutOfPlay = ballOutsideField
    && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.08
    && game.ballVel.length() < 0.42;
  if (ballOutsideField && ballClearlyOut && (deadBallOutOfPlay || (game.outOfBoundsTimer ?? 0) > 1.1)) {
    startFootballRefRestart(game, game.ball.position.x, game.ball.position.z);
  }
}

export function updateFootballGameplayRuntime(game, dt, trackDt, context) {
  const {
    FOOTBALL_BEHAVIOR,
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
  } = context;

  updateFootballTransientTimersRuntime(game, dt);
  updateFootballOfficialsAndTrackRuntime(game, dt, trackDt, {
    animateRunner,
    cameraWorldPos,
    clampFootballRefereePosition,
    getFootballRefereeTarget,
    getTrackLaneLength,
    getTrackPointAtProgress,
    steerFootballFacing
  });

  if (updateGoalCelebration(game, dt)) return;

  const ballRuntime = updateFootballBallRuntime(game, dt, {
    applyFootballKickContact,
    getFootballFootedness,
    getFootballKickoffTarget,
    registerBallTouch,
    setFootballBallVelocity,
    startGoalCelebration,
    triggerFootballKickPose,
    updateScoreboard
  });
  if (ballRuntime.scored) return;

  updateFootballGoalmouthStallRuntime(game, dt, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  });
  updateFootballOutOfBoundsRuntime(game, dt, ballRuntime.kickoffLocked, startFootballRefRestart);

  const {
    activeBallPlayer,
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  } = updateFootballPossessionRuntime(game, dt, ballRuntime.kickoffLocked, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose,
    updateScoreboard
  });
  const ownGoalDepth = controllingTeam !== 0 ? -game.ball.position.z * controllingTeam : 0;
  updateFootballMatchStateRuntime(game, dt, {
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  }, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  });

  for (let i = 0; i < game.players.length; i += 1) {
    updateFootballPlayerRuntime({
      FOOTBALL_BEHAVIOR,
      activeBallPlayer,
      animateRunner,
      applyFootballKickContact,
      cameraWorldPos,
      clampFootballHumanPosition,
      closestToBall,
      commitFootballRun,
      controllingTeam,
      dt,
      findBestCrossTarget,
      findBestPassTarget,
      findClearanceTarget,
      findThirdManSupport,
      game,
      getFootballFootedness,
      getFootballKickoffTarget,
      kickoffLocked: ballRuntime.kickoffLocked,
      ownGoalDepth,
      p: game.players[i],
      playerIndex: i,
      registerBallTouch,
      setFootballBallVelocity,
      steerFootballFacing,
      teamPlayers,
      triggerFootballKickPose
    });
  }

  resolvePeopleCollisions(game);
}

