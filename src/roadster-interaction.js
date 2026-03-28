import * as THREE from "./three.js";
import { JUKU_BASE_Y } from "./game-config.js";
import {
  getTracksideRoadsterAnchorWorldPosition,
  setTracksideRoadsterDoorOpenAmount,
  setTracksideRoadsterWheelPose,
  syncTracksideRoadsterColliders
} from "./trackside-car.js";

const ROADSTER_STAND_NEARBY_DISTANCE = 4.35;
const ROADSTER_BODY_NEARBY_DISTANCE = 4.95;
const ROADSTER_DRIVE_MAX_SPEED = 9.2;
const ROADSTER_DRIVE_REVERSE_SPEED = 3.2;
const ROADSTER_DRIVE_ACCEL = 4.8;
const ROADSTER_DRIVE_BRAKE = 6.4;
const ROADSTER_DRIVE_ROLL = 3.2;
const ROADSTER_STEER_RESPONSE = 5.8;
const ROADSTER_STEER_RETURN = 4.8;
const ROADSTER_TURN_RATE = 0.55;
const ROADSTER_WHEEL_RADIUS = 0.72;
const ROADSTER_OPEN_DURATION = 0.38;
const ROADSTER_SIT_DURATION = 0.86;
const ROADSTER_CLOSE_DURATION = 0.34;
const ROADSTER_EXIT_OPEN_DURATION = 0.32;
const ROADSTER_EXIT_STAND_DURATION = 0.78;
const ROADSTER_EXIT_CLOSE_DURATION = 0.28;
const ROADSTER_DOOR_WORLD = new THREE.Vector3();
const ROADSTER_STAND_WORLD = new THREE.Vector3();
const ROADSTER_SEAT_WORLD = new THREE.Vector3();
const ROADSTER_LOOK_WORLD = new THREE.Vector3();
const ROADSTER_BODY_WORLD = new THREE.Vector3();

function ensureRoadsterState(state) {
  if (!state.roadster) {
    state.roadster = {
      nearby: false,
      phase: "idle",
      timer: 0,
      doorOpen: 0,
      poseBlend: 0,
      rootY: null,
      fromX: 0,
      fromZ: 0,
      fromYaw: 0,
      fromDoorOpen: 0,
      fromPoseBlend: 0,
      fromRootY: null,
      driveSpeed: 0,
      steer: 0,
      wheelSpin: 0
    };
  }
  return state.roadster;
}

function easePhase(t) {
  return THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(t, 0, 1), 0, 1);
}

function lerpAngleDeg(fromDeg, toDeg, t) {
  const from = THREE.MathUtils.degToRad(fromDeg);
  const to = THREE.MathUtils.degToRad(toDeg);
  const delta = Math.atan2(Math.sin(to - from), Math.cos(to - from));
  return THREE.MathUtils.radToDeg(from + delta * t);
}

function getYawTowards(from, to) {
  return THREE.MathUtils.radToDeg(Math.atan2(to.x - from.x, to.z - from.z));
}

function beginRoadsterPhase(state, phase) {
  const roadster = ensureRoadsterState(state);
  roadster.phase = phase;
  roadster.timer = 0;
  roadster.fromX = state.x;
  roadster.fromZ = state.z;
  roadster.fromYaw = state.yaw;
  roadster.fromDoorOpen = roadster.doorOpen ?? 0;
  roadster.fromPoseBlend = roadster.poseBlend ?? 0;
  roadster.fromRootY = Number.isFinite(roadster.rootY) ? roadster.rootY : null;
}

function syncRoadsterDoorPose(roadsterRef, roadsterState) {
  if (!roadsterRef) return;
  setTracksideRoadsterDoorOpenAmount(roadsterRef, -1, roadsterState?.doorOpen ?? 0);
  setTracksideRoadsterDoorOpenAmount(roadsterRef, 1, 0);
}

function getDriverDoorWorld(roadster) {
  return getTracksideRoadsterAnchorWorldPosition(roadster, "driverDoorAnchor", ROADSTER_DOOR_WORLD);
}

function getDriverStandWorld(roadster) {
  return getTracksideRoadsterAnchorWorldPosition(roadster, "driverStandAnchor", ROADSTER_STAND_WORLD);
}

function getDriverSeatWorld(roadster) {
  return getTracksideRoadsterAnchorWorldPosition(roadster, "driverSeatAnchor", ROADSTER_SEAT_WORLD);
}

function getDriverLookWorld(roadster) {
  return getTracksideRoadsterAnchorWorldPosition(roadster, "driverLookAnchor", ROADSTER_LOOK_WORLD);
}

function clearRoadsterPose(roadsterState) {
  roadsterState.doorOpen = 0;
  roadsterState.poseBlend = 0;
  roadsterState.rootY = null;
}

function resetRoadsterDriveState(roadsterState) {
  roadsterState.driveSpeed = 0;
  roadsterState.steer = 0;
}

function getRoadsterBodyWorld(roadster) {
  if (!roadster) return null;
  roadster.updateWorldMatrix(true, false);
  return roadster.getWorldPosition(ROADSTER_BODY_WORLD);
}

export function syncRoadsterInteractionState(state, roadster) {
  const roadsterState = ensureRoadsterState(state);
  if (!roadster) {
    roadsterState.nearby = false;
    roadsterState.phase = "idle";
    clearRoadsterPose(roadsterState);
    resetRoadsterDriveState(roadsterState);
    return roadsterState;
  }

  if (roadsterState.phase === "idle") {
    const standWorld = getDriverStandWorld(roadster) ?? getDriverDoorWorld(roadster);
    const bodyWorld = getRoadsterBodyWorld(roadster);
    const standNearby = Boolean(standWorld)
      && Math.hypot(standWorld.x - state.x, standWorld.z - state.z) <= ROADSTER_STAND_NEARBY_DISTANCE;
    const bodyNearby = Boolean(bodyWorld)
      && Math.hypot(bodyWorld.x - state.x, bodyWorld.z - state.z) <= ROADSTER_BODY_NEARBY_DISTANCE;
    roadsterState.nearby = standNearby || bodyNearby;
    clearRoadsterPose(roadsterState);
  } else {
    roadsterState.nearby = false;
  }

  syncRoadsterDoorPose(roadster, roadsterState);
  setTracksideRoadsterWheelPose(roadster, roadsterState.steer ?? 0, roadsterState.wheelSpin ?? 0);
  syncTracksideRoadsterColliders(roadster);
  return roadsterState;
}

export function tryStartRoadsterEntry(state, roadster) {
  const roadsterState = syncRoadsterInteractionState(state, roadster);
  if (!roadster || roadsterState.phase !== "idle" || !roadsterState.nearby) return false;
  beginRoadsterPhase(state, "opening");
  return true;
}

export function tryStartRoadsterExit(state, roadster) {
  const roadsterState = ensureRoadsterState(state);
  if (!roadster || roadsterState.phase !== "seated") return false;
  resetRoadsterDriveState(roadsterState);
  beginRoadsterPhase(state, "exitOpening");
  return true;
}

export function isRoadsterSequenceActive(state) {
  const phase = state.roadster?.phase ?? "idle";
  return phase !== "idle";
}

export function isRoadsterSeatPoseActive(state) {
  const phase = state.roadster?.phase ?? "idle";
  return phase !== "idle";
}

export function shouldIgnoreRoadsterColliders(state) {
  return isRoadsterSequenceActive(state);
}

export function updateRoadsterDriveRuntime(dt, state, roadster, moveInput, turnInput) {
  const roadsterState = ensureRoadsterState(state);
  if (!roadster) return false;

  const targetSteer = roadsterState.phase === "seated"
    ? THREE.MathUtils.clamp(turnInput, -1, 1)
    : 0;
  const steerLambda = Math.abs(targetSteer) > 0.01 ? ROADSTER_STEER_RESPONSE : ROADSTER_STEER_RETURN;
  roadsterState.steer = THREE.MathUtils.damp(roadsterState.steer ?? 0, targetSteer, steerLambda, dt);

  if (roadsterState.phase === "seated") {
    const targetSpeed = moveInput >= 0
      ? ROADSTER_DRIVE_MAX_SPEED * THREE.MathUtils.clamp(moveInput, 0, 1)
      : ROADSTER_DRIVE_REVERSE_SPEED * THREE.MathUtils.clamp(moveInput, -1, 0);
    const speedLambda = Math.abs(targetSpeed) > Math.abs(roadsterState.driveSpeed ?? 0)
      ? ROADSTER_DRIVE_ACCEL
      : ROADSTER_DRIVE_BRAKE;
    roadsterState.driveSpeed = THREE.MathUtils.damp(roadsterState.driveSpeed ?? 0, targetSpeed, speedLambda, dt);
    if (Math.abs(moveInput) < 0.01) {
      roadsterState.driveSpeed = THREE.MathUtils.damp(roadsterState.driveSpeed, 0, ROADSTER_DRIVE_ROLL, dt);
    }

    const distance = (roadsterState.driveSpeed ?? 0) * dt;
    if (Math.abs(distance) > 0.0001) {
      roadster.rotation.y += (roadsterState.steer ?? 0) * distance * ROADSTER_TURN_RATE;
      roadster.position.x += Math.sin(roadster.rotation.y) * distance;
      roadster.position.z += Math.cos(roadster.rotation.y) * distance;
    }
    roadsterState.wheelSpin = (roadsterState.wheelSpin ?? 0) - distance / ROADSTER_WHEEL_RADIUS;
  } else {
    roadsterState.driveSpeed = THREE.MathUtils.damp(roadsterState.driveSpeed ?? 0, 0, ROADSTER_DRIVE_BRAKE, dt);
  }

  setTracksideRoadsterWheelPose(roadster, roadsterState.steer ?? 0, roadsterState.wheelSpin ?? 0);
  syncTracksideRoadsterColliders(roadster);
  return true;
}

export function updateRoadsterEntryRuntime(dt, state, roadster) {
  const roadsterState = ensureRoadsterState(state);
  if (!roadster || roadsterState.phase === "idle") {
    syncRoadsterDoorPose(roadster, roadsterState);
    return false;
  }

  const doorWorld = getDriverDoorWorld(roadster);
  const standWorld = getDriverStandWorld(roadster) ?? doorWorld;
  const seatWorld = getDriverSeatWorld(roadster);
  const lookWorld = getDriverLookWorld(roadster);
  if (!doorWorld || !standWorld || !seatWorld || !lookWorld) {
    roadsterState.phase = "idle";
    clearRoadsterPose(roadsterState);
    syncRoadsterDoorPose(roadster, roadsterState);
    return false;
  }

  const standYaw = getYawTowards(doorWorld, seatWorld);
  const seatYaw = getYawTowards(seatWorld, lookWorld);

  if (roadsterState.phase === "opening") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_OPEN_DURATION);
    roadsterState.doorOpen = THREE.MathUtils.lerp(roadsterState.fromDoorOpen, 1, t);
    roadsterState.poseBlend = THREE.MathUtils.lerp(roadsterState.fromPoseBlend, 0.18, t);
    roadsterState.rootY = null;
    state.x = THREE.MathUtils.lerp(roadsterState.fromX, standWorld.x, t);
    state.z = THREE.MathUtils.lerp(roadsterState.fromZ, standWorld.z, t);
    state.yaw = lerpAngleDeg(roadsterState.fromYaw, standYaw, t);
    if (t >= 0.999) {
      beginRoadsterPhase(state, "sitting");
    }
  } else if (roadsterState.phase === "sitting") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_SIT_DURATION);
    roadsterState.doorOpen = 1;
    roadsterState.poseBlend = THREE.MathUtils.lerp(roadsterState.fromPoseBlend, 1, t);
    roadsterState.rootY = THREE.MathUtils.lerp(
      roadsterState.fromRootY ?? JUKU_BASE_Y,
      seatWorld.y,
      t
    );
    state.x = THREE.MathUtils.lerp(roadsterState.fromX, seatWorld.x, t);
    state.z = THREE.MathUtils.lerp(roadsterState.fromZ, seatWorld.z, t);
    state.yaw = lerpAngleDeg(roadsterState.fromYaw, seatYaw, t);
    if (t >= 0.999) {
      beginRoadsterPhase(state, "closing");
    }
  } else if (roadsterState.phase === "closing") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_CLOSE_DURATION);
    roadsterState.doorOpen = THREE.MathUtils.lerp(roadsterState.fromDoorOpen, 0, t);
    roadsterState.poseBlend = 1;
    roadsterState.rootY = seatWorld.y;
    state.x = seatWorld.x;
    state.z = seatWorld.z;
    state.yaw = seatYaw;
    if (t >= 0.999) {
      roadsterState.phase = "seated";
      roadsterState.timer = 0;
      roadsterState.doorOpen = 0;
      roadsterState.poseBlend = 1;
      roadsterState.rootY = seatWorld.y;
    }
  } else if (roadsterState.phase === "seated") {
    roadsterState.doorOpen = 0;
    roadsterState.poseBlend = 1;
    roadsterState.rootY = seatWorld.y;
    state.x = seatWorld.x;
    state.z = seatWorld.z;
    state.yaw = seatYaw;
  } else if (roadsterState.phase === "exitOpening") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_EXIT_OPEN_DURATION);
    roadsterState.doorOpen = THREE.MathUtils.lerp(roadsterState.fromDoorOpen, 1, t);
    roadsterState.poseBlend = 1;
    roadsterState.rootY = seatWorld.y;
    state.x = seatWorld.x;
    state.z = seatWorld.z;
    state.yaw = seatYaw;
    if (t >= 0.999) {
      beginRoadsterPhase(state, "exiting");
    }
  } else if (roadsterState.phase === "exiting") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_EXIT_STAND_DURATION);
    roadsterState.doorOpen = 1;
    roadsterState.poseBlend = THREE.MathUtils.lerp(roadsterState.fromPoseBlend, 0.18, t);
    roadsterState.rootY = THREE.MathUtils.lerp(
      roadsterState.fromRootY ?? seatWorld.y,
      JUKU_BASE_Y,
      t
    );
    state.x = THREE.MathUtils.lerp(roadsterState.fromX, standWorld.x, t);
    state.z = THREE.MathUtils.lerp(roadsterState.fromZ, standWorld.z, t);
    state.yaw = lerpAngleDeg(roadsterState.fromYaw, standYaw, t);
    if (t >= 0.999) {
      beginRoadsterPhase(state, "exitClosing");
    }
  } else if (roadsterState.phase === "exitClosing") {
    roadsterState.timer += dt;
    const t = easePhase(roadsterState.timer / ROADSTER_EXIT_CLOSE_DURATION);
    roadsterState.doorOpen = THREE.MathUtils.lerp(roadsterState.fromDoorOpen, 0, t);
    roadsterState.poseBlend = THREE.MathUtils.lerp(roadsterState.fromPoseBlend, 0, t);
    roadsterState.rootY = JUKU_BASE_Y;
    state.x = standWorld.x;
    state.z = standWorld.z;
    state.yaw = standYaw;
    if (t >= 0.999) {
      roadsterState.phase = "idle";
      roadsterState.timer = 0;
      clearRoadsterPose(roadsterState);
      resetRoadsterDriveState(roadsterState);
    }
  }

  syncRoadsterDoorPose(roadster, roadsterState);
  setTracksideRoadsterWheelPose(roadster, roadsterState.steer ?? 0, roadsterState.wheelSpin ?? 0);
  syncTracksideRoadsterColliders(roadster);
  return true;
}
