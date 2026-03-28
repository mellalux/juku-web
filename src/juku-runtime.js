import * as THREE from "./three.js";
import {
  FACE_NAMES,
  GRAVITY,
  JUKU_BASE_Y,
  JUKU_SPEED,
  JUKU_TURN_SPEED,
  JUMP_VELOCITY
} from "./game-config.js";
import {
  handlePickupAction,
  syncPickupPresentation,
  syncPickupRuntimeState
} from "./pickup-system.js";
import {
  isRoadsterSequenceActive,
  isRoadsterSeatPoseActive,
  shouldIgnoreRoadsterColliders,
  syncRoadsterInteractionState,
  tryStartRoadsterEntry,
  tryStartRoadsterExit,
  updateRoadsterDriveRuntime,
  updateRoadsterEntryRuntime
} from "./roadster-interaction.js";

function updateJukuArmPose(arm, side, state, hasSword) {
  const walkPhase = side === -1 ? state.walkCycle + Math.PI : state.walkCycle;
  const armSwing = Math.sin(walkPhase) * 10 * state.walkBlend * (1 - state.airBlend * 0.65);
  arm.upperPivot.rotation.z = THREE.MathUtils.degToRad(side * 14);
  arm.upperPivot.rotation.y = 0;
  arm.upperPivot.rotation.x = THREE.MathUtils.degToRad(-(4 + 15 * state.airBlend + 6 * state.pushBlend - 5 * state.crouchBlend + armSwing));
  arm.lowerPivot.rotation.x = THREE.MathUtils.degToRad(-(8 + 10 * state.airBlend + (hasSword ? 10 : 0)));
  if (arm.gripHand) {
    arm.gripHand.visible = hasSword;
    arm.openHand.visible = !hasSword;
  }
}

function updateJukuLegPose(leg, side, state) {
  const walkPhase = side === -1 ? state.walkCycle : state.walkCycle + Math.PI;
  const turnPhase = state.turnCycle + (side === -1 ? Math.PI : 0);
  const turnHip = Math.sin(turnPhase) * 15 * state.turnBlend * (1 - state.airBlend);
  const turnLift = ((-Math.sin(turnPhase) + 1) * 0.5) * state.turnBlend * (1 - state.airBlend);
  let hipPitch = Math.sin(walkPhase) * 24 * state.walkBlend * (1 - state.crouchBlend * 0.75);
  hipPitch = hipPitch - 12 * state.crouchBlend + 7 * state.pushBlend;
  hipPitch += turnHip;
  let kneePitch = 8 + (10 + 16 * ((-Math.sin(walkPhase) + 1) * 0.5)) * state.walkBlend;
  kneePitch = kneePitch + 40 * state.crouchBlend - 10 * state.pushBlend;
  kneePitch += turnLift * 13;
  let anklePitch = -5 - hipPitch * 0.38 - (kneePitch - 8) * 0.22 + 6 * state.pushBlend;
  anklePitch += turnLift * -5;
  if (state.airBlend > 0) {
    hipPitch = THREE.MathUtils.lerp(hipPitch, -2, state.airBlend);
    kneePitch = THREE.MathUtils.lerp(kneePitch, 2, state.airBlend);
    anklePitch = THREE.MathUtils.lerp(anklePitch, 34, state.airBlend);
  }
  leg.root.rotation.z = THREE.MathUtils.degToRad(side * 4);
  leg.root.rotation.x = THREE.MathUtils.degToRad(-4 + hipPitch);
  leg.kneePivot.rotation.x = THREE.MathUtils.degToRad(kneePitch);
  leg.footPivot.rotation.x = THREE.MathUtils.degToRad(anklePitch);
}

function applyRoadsterSeatPose(juku, state) {
  const roadsterState = state.roadster;
  const phase = roadsterState?.phase ?? "idle";
  const seatBlend = THREE.MathUtils.clamp(state.roadster?.poseBlend ?? 0, 0, 1);
  const reachBlend = phase === "opening" || phase === "exitOpening"
    ? THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(roadsterState?.doorOpen ?? 0, 0, 1), 0, 1)
    : 0;
  const sitBlend = phase === "opening" ? seatBlend * 0.34 : seatBlend;

  if (seatBlend <= 0.001 && reachBlend <= 0.001) {
    juku.torso.rotation.x = THREE.MathUtils.lerp(juku.torso.rotation.x, 0, 0.2);
    juku.torso.rotation.y = THREE.MathUtils.lerp(juku.torso.rotation.y, 0, 0.2);
    juku.torso.rotation.z = THREE.MathUtils.lerp(juku.torso.rotation.z, 0, 0.2);
    juku.head.rotation.y = THREE.MathUtils.lerp(juku.head.rotation.y, 0, 0.2);
    return;
  }

  juku.torso.rotation.x = THREE.MathUtils.lerp(
    juku.torso.rotation.x,
    THREE.MathUtils.degToRad(-8 * reachBlend - 10 * sitBlend),
    0.26 + sitBlend * 0.38 + reachBlend * 0.24
  );
  juku.torso.rotation.y = THREE.MathUtils.lerp(
    juku.torso.rotation.y,
    THREE.MathUtils.degToRad(-16 * reachBlend),
    0.24 + reachBlend * 0.34
  );
  juku.torso.rotation.z = THREE.MathUtils.lerp(
    juku.torso.rotation.z,
    THREE.MathUtils.degToRad(10 * reachBlend),
    0.22 + reachBlend * 0.28
  );
  juku.head.position.y = THREE.MathUtils.lerp(juku.head.position.y, 3.2 - reachBlend * 0.06 - sitBlend * 0.06, 0.32);
  juku.head.rotation.x = THREE.MathUtils.lerp(
    juku.head.rotation.x,
    THREE.MathUtils.degToRad(-12 * reachBlend - 8 * sitBlend),
    0.24 + seatBlend * 0.28
  );
  juku.head.rotation.y = THREE.MathUtils.lerp(
    juku.head.rotation.y,
    THREE.MathUtils.degToRad(-14 * reachBlend),
    0.22 + reachBlend * 0.28
  );
  juku.head.rotation.z = THREE.MathUtils.lerp(
    juku.head.rotation.z,
    THREE.MathUtils.degToRad(8 * reachBlend),
    0.22 + seatBlend * 0.24
  );

  juku.leftArm.upperPivot.rotation.x = THREE.MathUtils.lerp(
    juku.leftArm.upperPivot.rotation.x,
    THREE.MathUtils.degToRad(-18 * reachBlend - 50 * sitBlend),
    0.28 + seatBlend * 0.36
  );
  juku.leftArm.upperPivot.rotation.y = THREE.MathUtils.lerp(
    juku.leftArm.upperPivot.rotation.y,
    THREE.MathUtils.degToRad(-46 * reachBlend - 18 * sitBlend),
    0.28 + seatBlend * 0.34
  );
  juku.leftArm.upperPivot.rotation.z = THREE.MathUtils.lerp(
    juku.leftArm.upperPivot.rotation.z,
    THREE.MathUtils.degToRad(48 * reachBlend + 26 * sitBlend),
    0.28 + seatBlend * 0.34
  );
  juku.leftArm.lowerPivot.rotation.x = THREE.MathUtils.lerp(
    juku.leftArm.lowerPivot.rotation.x,
    THREE.MathUtils.degToRad(-54 * reachBlend - 68 * sitBlend),
    0.28 + seatBlend * 0.34
  );

  juku.rightArm.upperPivot.rotation.x = THREE.MathUtils.lerp(
    juku.rightArm.upperPivot.rotation.x,
    THREE.MathUtils.degToRad(-10 * reachBlend - 46 * sitBlend),
    0.28 + seatBlend * 0.34
  );
  juku.rightArm.upperPivot.rotation.y = THREE.MathUtils.lerp(
    juku.rightArm.upperPivot.rotation.y,
    THREE.MathUtils.degToRad(8 * reachBlend + 16 * sitBlend),
    0.28 + seatBlend * 0.34
  );
  juku.rightArm.upperPivot.rotation.z = THREE.MathUtils.lerp(
    juku.rightArm.upperPivot.rotation.z,
    THREE.MathUtils.degToRad(-12 * reachBlend - 24 * sitBlend),
    0.28 + seatBlend * 0.34
  );
  juku.rightArm.lowerPivot.rotation.x = THREE.MathUtils.lerp(
    juku.rightArm.lowerPivot.rotation.x,
    THREE.MathUtils.degToRad(-22 * reachBlend - 74 * sitBlend),
    0.28 + seatBlend * 0.34
  );

  juku.leftLeg.root.rotation.x = THREE.MathUtils.lerp(
    juku.leftLeg.root.rotation.x,
    THREE.MathUtils.degToRad(20 * reachBlend + 78 * sitBlend),
    0.24 + seatBlend * 0.32
  );
  juku.leftLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(
    juku.leftLeg.kneePivot.rotation.x,
    THREE.MathUtils.degToRad(26 * reachBlend + 92 * sitBlend),
    0.24 + seatBlend * 0.32
  );
  juku.leftLeg.footPivot.rotation.x = THREE.MathUtils.lerp(
    juku.leftLeg.footPivot.rotation.x,
    THREE.MathUtils.degToRad(-4 * reachBlend - 18 * sitBlend),
    0.24 + seatBlend * 0.3
  );

  juku.rightLeg.root.rotation.x = THREE.MathUtils.lerp(
    juku.rightLeg.root.rotation.x,
    THREE.MathUtils.degToRad(-12 * reachBlend + 74 * sitBlend),
    0.24 + seatBlend * 0.32
  );
  juku.rightLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(
    juku.rightLeg.kneePivot.rotation.x,
    THREE.MathUtils.degToRad(20 * reachBlend + 96 * sitBlend),
    0.24 + seatBlend * 0.32
  );
  juku.rightLeg.footPivot.rotation.x = THREE.MathUtils.lerp(
    juku.rightLeg.footPivot.rotation.x,
    THREE.MathUtils.degToRad(-6 * reachBlend - 16 * sitBlend),
    0.24 + seatBlend * 0.3
  );
}

export function updateJukuRuntime(
  dt,
  {
    state,
    footballGame,
    roadster,
    updateTouchEquipLabel,
    updateTouchRoadsterLabel,
    resolveJukuCollisions,
    clampGoalInteriorPosition
  }
) {
  syncPickupRuntimeState({ state, footballGame });
  syncRoadsterInteractionState(state, roadster);

  state.faceTime += dt;
  if (state.blinkTimer > 0) {
    state.blinkTimer = Math.max(0, state.blinkTimer - dt);
  } else {
    state.nextBlink -= dt;
    if (state.nextBlink <= 0) {
      state.blinkTimer = 0.16;
      state.nextBlink = 1.5 + Math.random() * 2.6;
    }
  }

  if (state.tongueActive) {
    state.tongueTimer = Math.max(0, state.tongueTimer - dt);
    if (state.tongueTimer <= 0) {
      state.tongueActive = false;
      state.nextTongueEvent = 1.1 + Math.random() * 3.4;
    }
  } else {
    state.nextTongueEvent -= dt;
    if (state.nextTongueEvent <= 0) {
      state.tongueActive = true;
      state.tongueTimer = 0.2 + Math.random() * 0.55;
      state.tonguePhase = Math.random() * Math.PI * 2;
    }
  }
  state.tongueBlend = THREE.MathUtils.damp(state.tongueBlend, state.tongueActive ? 1 : 0, 12, dt);

  const enterNow = state.keys.has("Enter") || state.touchJump;
  const roadsterLocked = isRoadsterSequenceActive(state);
  if (!roadsterLocked && enterNow && !state.prevEnter && state.jumpState === 0) {
    state.jumpState = 1;
    state.jumpTimer = 0;
  }
  state.prevEnter = enterNow;

  const eNow = state.keys.has("KeyE") || state.touchETrigger;
  const aNow = state.keys.has("KeyA") || state.touchRoadsterTrigger;

  const aPressed = aNow && !state.prevA;
  if (aPressed && tryStartRoadsterExit(state, roadster)) {
    syncRoadsterInteractionState(state, roadster);
  }

  let roadsterActive = isRoadsterSequenceActive(state);
  if (!roadsterActive) {
    const crouchDur = 0.22;
    if (state.jumpState === 1) {
      state.jumpTimer += dt;
      const p = Math.min(state.jumpTimer / crouchDur, 1);
      state.crouchBlend = Math.sin(p * Math.PI);
      state.pushBlend = p > 0.62 ? Math.min((p - 0.62) / 0.38, 1) : 0;
      if (p >= 1) {
        state.jumpState = 2;
        state.jumpVel = JUMP_VELOCITY;
        state.jumpY = 0.001;
        state.crouchBlend = 0;
        state.pushBlend = 1;
      }
    } else if (state.jumpState === 2) {
      state.jumpVel -= GRAVITY * dt;
      state.jumpY += state.jumpVel * dt;
      state.pushBlend = Math.max(0, state.pushBlend - dt * 8);
      if (state.jumpY <= 0) {
        state.jumpY = 0;
        state.jumpVel = 0;
        state.jumpState = 0;
        state.pushBlend = 0;
      }
    } else {
      state.jumpY = 0;
      state.crouchBlend = 0;
      state.pushBlend = 0;
    }
  } else {
    state.jumpState = 0;
    state.jumpTimer = 0;
    state.jumpVel = 0;
    state.jumpY = 0;
    state.crouchBlend = 0;
    state.pushBlend = 0;
  }

  state.airBlend = THREE.MathUtils.clamp(state.airBlend + (state.jumpState === 2 ? dt * 8 : -dt * 8), 0, 1);

  let moveInput = 0;
  let turnInput = 0;
  if (!roadsterActive) {
    moveInput = state.touchMove;
    if (state.keys.has("ArrowUp")) moveInput += 1;
    if (state.keys.has("ArrowDown")) moveInput -= 1;
    moveInput = THREE.MathUtils.clamp(moveInput, -1, 1);

    turnInput = state.touchTurn;
    if (state.keys.has("ArrowLeft")) turnInput += 1;
    if (state.keys.has("ArrowRight")) turnInput -= 1;
    turnInput = THREE.MathUtils.clamp(turnInput, -1, 1);

    let moveScale = 1;
    let turnScale = 1;
    if (state.jumpState === 1) {
      moveScale = 0.65;
      turnScale = 0.65;
    } else if (state.jumpState === 2) {
      moveScale = 0.55;
      turnScale = 0.55;
    }

    state.yaw += turnInput * JUKU_TURN_SPEED * dt * turnScale;

    const yawRad = THREE.MathUtils.degToRad(state.yaw);
    const fx = Math.sin(yawRad);
    const fz = Math.cos(yawRad);
    const prevX = state.x;
    const prevZ = state.z;
    state.x += fx * JUKU_SPEED * dt * moveInput * moveScale;
    state.z += fz * JUKU_SPEED * dt * moveInput * moveScale;
    const collisionOptions = shouldIgnoreRoadsterColliders(state)
      ? { prevX, prevZ, ignoreRoles: ["tracksideRoadster"] }
      : { prevX, prevZ };
    const resolved = resolveJukuCollisions(state.x, state.z, collisionOptions);
    clampGoalInteriorPosition(resolved.x, resolved.z, resolved, prevX, prevZ);
    state.x = resolved.x;
    state.z = resolved.z;
  } else {
    moveInput = state.touchMove;
    if (state.keys.has("ArrowUp")) moveInput += 1;
    if (state.keys.has("ArrowDown")) moveInput -= 1;
    moveInput = THREE.MathUtils.clamp(moveInput, -1, 1);

    turnInput = state.touchTurn;
    if (state.keys.has("ArrowLeft")) turnInput += 1;
    if (state.keys.has("ArrowRight")) turnInput -= 1;
    turnInput = THREE.MathUtils.clamp(turnInput, -1, 1);

    const prevX = state.x;
    const prevZ = state.z;
    updateRoadsterDriveRuntime(
      dt,
      state,
      roadster,
      state.roadster?.phase === "seated" ? moveInput : 0,
      state.roadster?.phase === "seated" ? turnInput : 0
    );
    updateRoadsterEntryRuntime(dt, state, roadster);
    moveInput = 0;
    turnInput = 0;
    state.nearbyPickupId = null;
  }

  if (aPressed && !isRoadsterSequenceActive(state)) {
    syncRoadsterInteractionState(state, roadster);
    if (tryStartRoadsterEntry(state, roadster)) {
      if (state.heldItemId) {
        handlePickupAction({ state, footballGame });
      }
      syncPickupRuntimeState({ state, footballGame });
      state.nearbyPickupId = null;
    }
  }

  roadsterActive = isRoadsterSequenceActive(state);
  if (!roadsterActive && eNow && !state.prevE) {
    handlePickupAction({ state, footballGame });
  } else {
    syncPickupRuntimeState({ state, footballGame });
  }

  state.prevE = eNow;
  state.prevA = aNow;
  state.touchETrigger = false;
  state.touchRoadsterTrigger = false;
  syncRoadsterInteractionState(state, roadster);
  updateTouchEquipLabel();
  updateTouchRoadsterLabel?.();

  if (moveInput !== 0) {
    state.walkBlend = Math.min(1, state.walkBlend + dt * 6.2);
    state.walkCycle += dt * 8.2 * Math.sign(moveInput);
  } else {
    state.walkBlend = Math.max(0, state.walkBlend - dt * 6.2);
  }

  if (turnInput !== 0 && moveInput === 0) {
    state.turnBlend = Math.min(1, state.turnBlend + dt * 7.4);
    state.turnCycle += dt * 8.8 * Math.sign(turnInput);
  } else {
    state.turnBlend = Math.max(0, state.turnBlend - dt * 7.4);
  }

  if (state.walkCycle > Math.PI * 2) state.walkCycle -= Math.PI * 2;
  if (state.walkCycle < 0) state.walkCycle += Math.PI * 2;
  if (state.turnCycle > Math.PI * 2) state.turnCycle -= Math.PI * 2;
  if (state.turnCycle < 0) state.turnCycle += Math.PI * 2;
}

function animateJukuSwordBlade(sword, swordWaveTime, brightness = 1) {
  if (!sword) return;
  const segments = sword.bladeSegments;
  if (segments) {
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      const hue = THREE.MathUtils.euclideanModulo(swordWaveTime + index * 0.13, 1);
      segment.material.color.setHSL(hue, 0.95, 0.62 * brightness);
      segment.material.emissive.setHSL(hue, 0.88, 0.2 * brightness);
      segment.material.emissiveIntensity = 0.65 * brightness;
    }
  }
  if (sword.tip?.material) {
    const tipHue = THREE.MathUtils.euclideanModulo(swordWaveTime + 0.82, 1);
    sword.tip.material.color.setHSL(tipHue, 0.92, 0.82 * brightness);
    sword.tip.material.emissive.setHSL(tipHue, 0.8, 0.28 * brightness);
    sword.tip.material.emissiveIntensity = 0.72 * brightness;
  }
}

export function updateJukuPoseRuntime({ state, juku, footballGame, pickupSceneObjects, faceStatus }) {
  const roadsterPoseActive = isRoadsterSeatPoseActive(state);
  const swordHeld = state.heldItemId === "sword" && !roadsterPoseActive;
  const rootY = Number.isFinite(state.roadster?.rootY)
    ? state.roadster.rootY
    : JUKU_BASE_Y + state.jumpY - state.crouchBlend * 0.09;
  juku.root.position.set(state.x, rootY, state.z);
  juku.root.rotation.y = THREE.MathUtils.degToRad(state.yaw);

  const blinkPhase = state.blinkTimer > 0 ? 1 - state.blinkTimer / 0.16 : 0;
  const blink = blinkPhase > 0 ? Math.sin(blinkPhase * Math.PI) : 0;
  let surprise = Math.max(state.airBlend, state.pushBlend * 0.85);
  let focus = Math.max(state.walkBlend * 0.52, state.heldItemId ? 0.3 : 0);
  let calm = 0;
  let angry = 0;
  let happy = 0;
  let sad = 0;
  if (state.faceMode === "calm") {
    calm = 1;
    focus *= 0.35;
    surprise *= 0.2;
  } else if (state.faceMode === "angry") {
    angry = 1;
    focus = Math.max(focus, 0.88);
    surprise *= 0.15;
  } else if (state.faceMode === "surprised") {
    surprise = Math.max(surprise, 0.95);
    focus *= 0.28;
  } else if (state.faceMode === "happy") {
    happy = 1;
    focus *= 0.35;
    surprise *= 0.22;
  } else if (state.faceMode === "sad") {
    sad = 1;
    focus *= 0.45;
    surprise *= 0.18;
  }

  const eyeOpen = THREE.MathUtils.clamp(
    0.92 - blink * 0.9 - focus * 0.14 - angry * 0.09 - sad * 0.08 + surprise * 0.14 + calm * 0.04 + happy * 0.03,
    0.05,
    1.04
  );
  juku.leftEye.scale.y = eyeOpen;
  juku.rightEye.scale.y = eyeOpen;
  juku.leftUpperLid.position.y = 0.032 - blink * 0.034 - focus * 0.01 - angry * 0.004 + surprise * 0.005 + calm * 0.003 + happy * 0.004 - sad * 0.003;
  juku.rightUpperLid.position.y = 0.032 - blink * 0.034 - focus * 0.01 - angry * 0.004 + surprise * 0.005 + calm * 0.003 + happy * 0.004 - sad * 0.003;
  juku.leftLowerLid.position.y = -0.034 + blink * 0.026 + focus * 0.006 + angry * 0.003 - surprise * 0.004 - calm * 0.003 - happy * 0.003 + sad * 0.004;
  juku.rightLowerLid.position.y = -0.034 + blink * 0.026 + focus * 0.006 + angry * 0.003 - surprise * 0.004 - calm * 0.003 - happy * 0.003 + sad * 0.004;
  juku.leftUpperLid.scale.y = 0.16 + blink * 0.62 + focus * 0.12 + angry * 0.08 + sad * 0.05 - happy * 0.03;
  juku.rightUpperLid.scale.y = 0.16 + blink * 0.62 + focus * 0.12 + angry * 0.08 + sad * 0.05 - happy * 0.03;
  juku.leftLowerLid.scale.y = 0.12 + blink * 0.3 + focus * 0.08 + angry * 0.04 + sad * 0.03;
  juku.rightLowerLid.scale.y = 0.12 + blink * 0.3 + focus * 0.08 + angry * 0.04 + sad * 0.03;

  const eyeOffsetX = THREE.MathUtils.clamp(state.pointerX * 0.012, -0.016, 0.016);
  const eyeOffsetY = THREE.MathUtils.clamp(-state.pointerY * 0.008, -0.01, 0.01);
  juku.leftPupil.position.set(
    juku.pupilBase.left.x + eyeOffsetX,
    juku.pupilBase.left.y + eyeOffsetY,
    juku.pupilBase.left.z
  );
  juku.rightPupil.position.set(
    juku.pupilBase.right.x + eyeOffsetX,
    juku.pupilBase.right.y + eyeOffsetY,
    juku.pupilBase.right.z
  );

  const headBob = Math.sin(state.walkCycle * 2) * 0.018 * state.walkBlend + Math.sin(state.faceTime * 1.8) * 0.006;
  const headLift = -state.crouchBlend * 0.045 + state.pushBlend * 0.016 + state.airBlend * 0.02;
  juku.head.position.y = 3.27 + headBob + headLift;
  juku.head.rotation.x = THREE.MathUtils.degToRad(-4 * state.crouchBlend + 7 * state.pushBlend - 4 * state.airBlend - focus * 3 + happy * 1.5 + sad * 4.5);
  juku.head.rotation.z = state.pointerX * 0.06 + Math.sin(state.walkCycle) * 0.018 * state.walkBlend;

  const browLift = 0.026 * surprise - 0.014 * focus + 0.012 * calm - 0.01 * angry + 0.014 * happy - 0.02 * sad + 0.004 * Math.sin(state.faceTime * 2.4);
  const browPinch = 12 * focus - 9 * surprise + 12 * angry - 4 * calm - 5 * happy + 6 * sad;
  const browInward = 0.018 * focus - 0.008 * surprise + 0.016 * angry - 0.006 * calm - 0.004 * happy + 0.008 * sad;
  juku.leftBrow.position.set(juku.browBase.left.x + browInward, juku.browBase.left.y + browLift, juku.browBase.left.z);
  juku.rightBrow.position.set(juku.browBase.right.x - browInward, juku.browBase.right.y + browLift, juku.browBase.right.z);
  juku.leftBrow.rotation.z = THREE.MathUtils.degToRad(82 - browPinch - happy * 2 + sad * 3);
  juku.rightBrow.rotation.z = THREE.MathUtils.degToRad(-82 + browPinch + happy * 2 - sad * 3);

  const mouthTalk = Math.max(0, Math.sin(state.faceTime * 9.5)) * 0.058 * state.walkBlend + Math.max(0, Math.sin(state.faceTime * 5.8)) * 0.02;
  const mouthOpen = THREE.MathUtils.clamp(0.03 + mouthTalk + surprise * 0.17 - focus * 0.012 - angry * 0.014 - sad * 0.005, 0.012, 0.28);
  const smileWidth = 0.14 * (1 - focus) * (1 - surprise * 0.7) + calm * 0.06 - angry * 0.09 + happy * 0.24 - sad * 0.16;
  juku.mouth.position.y = -0.172 - state.crouchBlend * 0.007 + state.airBlend * 0.014 + focus * 0.004 - sad * 0.014 + happy * 0.008;
  juku.mouth.rotation.z = Math.sin(state.faceTime * 3.8) * 0.03 * state.walkBlend * (1 - angry * 0.9) + happy * 0.01 - sad * 0.008;
  juku.mouthLine.scale.set(2.04 + smileWidth - mouthOpen * 0.58, 0.18 + mouthOpen * 2.95 + calm * 0.03 + happy * 0.05, 0.52);
  juku.mouthInner.scale.set(1.3 + mouthOpen * 0.72 - focus * 0.1 - angry * 0.18 - sad * 0.15, 0.05 + mouthOpen * 4.9 + happy * 0.06, 0.4 + mouthOpen * 0.42);
  juku.mouthInner.position.y = -0.008 - mouthOpen * 0.026 - happy * 0.005 + sad * 0.012;
  const tongueCanShow = mouthOpen > 0.045 && happy < 0.97 && sad < 0.97;
  const tongueMotion = tongueCanShow ? state.tongueBlend : 0;
  const tongueWave = Math.sin(state.faceTime * 11.2 + state.walkCycle * 0.45 + state.tonguePhase);
  const tongueNod = Math.sin(state.faceTime * 7.6 + 0.35 + state.tonguePhase * 0.5);
  const tongueSlide = Math.sin(state.faceTime * 5.2 + state.walkCycle * 0.3 + state.tonguePhase);
  const tongueOut = THREE.MathUtils.clamp(((mouthOpen - 0.05) * 4.2 + surprise * 0.5 + happy * 0.12) * tongueMotion, 0, 1.15);
  juku.tongue.visible = tongueCanShow && tongueMotion > 0.12;
  juku.tongue.scale.set(1.38 + tongueOut * 0.26, 0.22 + tongueMotion * (mouthOpen * 1.25 + 0.08 * (1 + tongueNod)), 0.86 + tongueOut * 0.5 + 0.06 * tongueMotion * tongueWave);
  juku.tongue.position.set(0.012 * tongueMotion * tongueSlide, -0.02 - tongueMotion * (mouthOpen * 0.017) + 0.005 * tongueMotion * tongueNod, 0.018 + tongueOut * 0.024 + 0.003 * tongueMotion * tongueWave);
  juku.tongue.rotation.x = THREE.MathUtils.degToRad(8 + tongueOut * 16 + tongueMotion * tongueNod * 8);
  juku.tongue.rotation.y = tongueMotion * tongueSlide * 0.11;
  juku.tongue.rotation.z = tongueMotion * tongueWave * 0.12;
  if (faceStatus) {
    const faceText = `Active Face: ${FACE_NAMES[state.faceMode]}`;
    if (faceStatus.textContent !== faceText) {
      faceStatus.textContent = faceText;
    }
  }

  updateJukuArmPose(juku.leftArm, 1, state, false);
  updateJukuArmPose(juku.rightArm, -1, state, swordHeld);

  updateJukuLegPose(juku.leftLeg, 1, state);
  updateJukuLegPose(juku.rightLeg, -1, state);
  applyRoadsterSeatPose(juku, state);

  const swordWaveTime = state.faceTime * 0.34;
  animateJukuSwordBlade(juku.heldSword, swordWaveTime, 1);
  animateJukuSwordBlade(pickupSceneObjects?.sword?.world, swordWaveTime, 0.92);

  syncPickupPresentation({ state, footballGame, juku, pickupSceneObjects });
  if (roadsterPoseActive && juku.heldSword?.root) {
    juku.heldSword.root.visible = false;
  }
}
