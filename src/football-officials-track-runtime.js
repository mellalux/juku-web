import * as THREE from "./three.js";
import {
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
  TRACK_RUNNER_LANE_CHANGE_RATE
} from "./game-config.js";
import {
  applyFootballRefCarryPose,
  getFootballRefCarryWorldPosition
} from "./football-referee-runtime.js";
import {
  commitInstancedMesh,
  setAnchoredInstanceTransform
} from "./instanced-build.js";

const FOOTBALL_REF_CARRY_WORLD = new THREE.Vector3();
const FOOTBALL_REF_PLACE_DURATION = 0.62;
const FOOTBALL_HURDLE_CONTACT_SAMPLE_POINTS = [
  new THREE.Vector3(0, -0.038, 0.24),
  new THREE.Vector3(0, -0.02, 0.14)
];
const FOOTBALL_HURDLE_WORLD_POINT = new THREE.Vector3();
const FOOTBALL_HURDLE_LOCAL_POINT = new THREE.Vector3();

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

  const refRestartCelebrationActive = game.celebration?.phase === "awaitKickoff";
  if (game.coach && (!game.celebration?.active || refRestartCelebrationActive)) {
    game.coach.whistleTimer = Math.max(0, game.coach.whistleTimer - dt);
    game.coach.cardTimer = Math.max(0, game.coach.cardTimer - dt);
    game.coach.cardCooldown = Math.max(0, game.coach.cardCooldown - dt);
    game.coach.carryBlend = THREE.MathUtils.damp(
      game.coach.carryBlend ?? 0,
      game.refRestart?.active && game.refRestart.phase === "toCenter" ? 1 : 0,
      7.5,
      dt
    );
    const refTarget = getFootballRefereeTarget(game);
    const refDx = refTarget.x - game.coach.runner.root.position.x;
    const refDz = refTarget.z - game.coach.runner.root.position.z;
    const refDist = Math.hypot(refDx, refDz);
    const refClearingKickoff = game.refRestart?.active && game.refRestart.phase === "clear";
    const refPlacingKickoff = game.refRestart?.active && game.refRestart.phase === "place";
    const desiredSpeed = refClearingKickoff
      ? refDist > 3.2 ? 5.6 : refDist > 1.2 ? 4.3 : refDist > 0.28 ? 2.4 : 0
      : refPlacingKickoff
        ? 0
        : refDist > 4.2 ? 3.6 : refDist > 1.8 ? 2.6 : refDist > 0.45 ? 1.35 : 0;
    const desiredVx = refDist > 0.001 ? (refDx / refDist) * desiredSpeed : 0;
    const desiredVz = refDist > 0.001 ? (refDz / refDist) * desiredSpeed : 0;
    game.coach.vx = THREE.MathUtils.damp(game.coach.vx ?? 0, desiredVx, refClearingKickoff ? 9.4 : 6.2, dt);
    game.coach.vz = THREE.MathUtils.damp(game.coach.vz ?? 0, desiredVz, refClearingKickoff ? 9.4 : 6.2, dt);
    game.coach.runner.root.position.x += game.coach.vx * dt;
    game.coach.runner.root.position.z += game.coach.vz * dt;
    const refClamped = clampFootballRefereePosition(game.coach.runner.root.position.x, game.coach.runner.root.position.z);
    game.coach.runner.root.position.x = refClamped.x;
    game.coach.runner.root.position.z = refClamped.z;
    const moveSpeed = Math.hypot(game.coach.vx ?? 0, game.coach.vz ?? 0);
    const facingTargetX = game.refRestart?.active
      ? refTarget.x
      : game.ball.position.x;
    const facingTargetZ = game.refRestart?.active
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
        ? { type: "sideStep", amount: coachSideStepAmount, dir: Math.sign(coachLateral || 1), sprintAmount: THREE.MathUtils.clamp(moveSpeed / (refClearingKickoff ? 2.8 : 2.1), refClearingKickoff ? 0.42 : 0, 1) }
        : refClearingKickoff
          ? { sprintAmount: THREE.MathUtils.clamp(moveSpeed / 3.2, 0.52, 1) }
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
      applyFootballRefCarryPose(game.coach.runner, carryBlend);
    }
    game.coach.runner.head.rotation.y = THREE.MathUtils.clamp(-lookDx * 0.045 + game.coach.runner.head.rotation.y, -0.28, 0.28);
    game.coach.runner.head.rotation.x = THREE.MathUtils.clamp(game.coach.runner.head.rotation.x + moveSpeed * 0.01 - lookDz * 0.0035, -0.2, 0.08);
    if (refPlacingKickoff) {
      const placeProgress = THREE.MathUtils.clamp((game.refRestart?.timer ?? 0) / FOOTBALL_REF_PLACE_DURATION, 0, 1);
      const presentBlend = THREE.MathUtils.smoothstep(placeProgress, 0.02, 0.16)
        * (1 - THREE.MathUtils.smoothstep(placeProgress, 0.2, 0.42));
      const bendIn = THREE.MathUtils.smoothstep(placeProgress, 0.14, 0.42);
      const bendOut = THREE.MathUtils.smoothstep(placeProgress, 0.8, 0.99);
      const bendBlend = THREE.MathUtils.clamp(bendIn * (1 - bendOut), 0, 1);
      const releaseBlend = THREE.MathUtils.smoothstep(placeProgress, 0.5, 0.88);
      const flourishBlend = THREE.MathUtils.clamp(presentBlend + bendBlend * 0.28, 0, 1);
      game.coach.runner.torsoPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.torsoPivot.rotation.x, -0.92, bendBlend);
      game.coach.runner.torsoPivot.rotation.z = THREE.MathUtils.lerp(game.coach.runner.torsoPivot.rotation.z, 0.12, bendBlend);
      game.coach.runner.torsoPivot.rotation.y = THREE.MathUtils.lerp(game.coach.runner.torsoPivot.rotation.y, 0.1, flourishBlend);
      game.coach.runner.head.rotation.x = THREE.MathUtils.lerp(game.coach.runner.head.rotation.x, 0.46, bendBlend);
      game.coach.runner.head.rotation.y = THREE.MathUtils.lerp(game.coach.runner.head.rotation.y, -0.08, bendBlend * 0.7);
      game.coach.runner.leftArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.x, -2.38, bendBlend);
      game.coach.runner.leftArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.y, 0.66, bendBlend);
      game.coach.runner.leftArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.z, 0.66, bendBlend);
      game.coach.runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArmRig.lowerPivot.rotation.x, -1.02, bendBlend);
      game.coach.runner.rightArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.x, -1.48, flourishBlend);
      game.coach.runner.rightArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.y, -0.34, flourishBlend);
      game.coach.runner.rightArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.z, -0.6, flourishBlend);
      game.coach.runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArmRig.lowerPivot.rotation.x, -0.94, flourishBlend);
      game.coach.runner.leftLegRig.root.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftLegRig.root.rotation.x, THREE.MathUtils.degToRad(24), bendBlend);
      game.coach.runner.rightLegRig.root.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightLegRig.root.rotation.x, THREE.MathUtils.degToRad(16), bendBlend);
      game.coach.runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(42), bendBlend);
      game.coach.runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(28), bendBlend);
      game.coach.runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-16), bendBlend);
      game.coach.runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-8), bendBlend);
      game.coach.runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-18), releaseBlend * 0.5);
      game.coach.runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-38), releaseBlend * 0.24);
    }
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
    if (game.refRestart?.active && game.refRestart.phase === "toCenter") {
      const carryWorld = getFootballRefCarryWorldPosition(game, FOOTBALL_REF_CARRY_WORLD);
      if (carryWorld) {
        game.ball.visible = true;
        game.ball.position.copy(carryWorld);
        game.ballVel.set(0, 0, 0);
      }
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

  game.trackRunners.forEach((runnerState) => {
    const dir = runnerState.dir ?? 1;
    const currentLane = runnerState.laneIndex ?? 0;
    const lockedLane = runnerState.homeLaneIndex ?? runnerState.targetLaneIndex ?? Math.round(currentLane);
    const speedPhase = runnerState.speedPhase ?? 0;
    const speedPulse = 1
      + Math.sin(runnerState.cycle * 0.11 + speedPhase) * 0.05
      + Math.sin(runnerState.cycle * 0.047 + speedPhase * 1.7) * 0.025;
    const desiredSpeed = runnerState.speed * speedPulse;
    runnerState.currentSpeed = desiredSpeed;
    runnerState.homeLaneIndex = lockedLane;
    runnerState.targetLaneIndex = lockedLane;

    const laneLength = getTrackLaneLength(lockedLane);
    let nearestAhead = Infinity;

    for (let i = 0; i < game.trackRunners.length; i += 1) {
      const other = game.trackRunners[i];
      if (other === runnerState) continue;
      const otherLane = other.homeLaneIndex ?? other.targetLaneIndex ?? other.laneIndex ?? 0;
      if (Math.abs(otherLane - lockedLane) > 0.42) continue;
      const ahead = getTrackForwardGap(runnerState.progress, other.progress, laneLength, dir);
      if (ahead > 0.001 && ahead < nearestAhead) {
        nearestAhead = ahead;
      }
    }

    runnerState.laneIndex = THREE.MathUtils.damp(currentLane, lockedLane, TRACK_RUNNER_LANE_CHANGE_RATE, trackDt);
    if (Math.abs(runnerState.laneIndex - lockedLane) < 0.02) {
      runnerState.laneIndex = lockedLane;
    }

    let laneSpeed = desiredSpeed;
    if (nearestAhead < 1.35) {
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
    if (runnerState.jumpY <= 0.0001 && runnerState.jumpCooldown <= 0 && nextHurdle && nextHurdleGap < hurdleJumpTrigger) {
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
