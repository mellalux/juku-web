import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_RADIUS,
  JUKU_BASE_Y,
  PICKUP_RADIUS
} from "./game-config.js";

const JUKU_HELD_BALL_FORWARD = 0.3;
const JUKU_HELD_BALL_SIDE = 0;
const JUKU_HELD_BALL_HEIGHT = 2.08;
const JUKU_HELD_BALL_HAND_OFFSET = new THREE.Vector3(0, -0.04, 0.1);
const JUKU_HELD_BALL_WORLD = new THREE.Vector3();
const JUKU_HELD_BALL_LEFT_WORLD = new THREE.Vector3();
const JUKU_HELD_BALL_RIGHT_WORLD = new THREE.Vector3();

function getFacingBasis(yawDeg) {
  const yawRad = THREE.MathUtils.degToRad(yawDeg);
  return {
    fx: Math.sin(yawRad),
    fz: Math.cos(yawRad),
    rx: Math.cos(yawRad),
    rz: -Math.sin(yawRad)
  };
}

function getSwordState(state) {
  return state.pickupObjectStates?.sword ?? null;
}

function canPickUpBall(footballGame) {
  return Boolean(footballGame?.ball)
    && !footballGame.refRestart?.active
    && !footballGame.goalPending
    && !footballGame.celebration?.active
    && footballGame.ball.visible !== false
    && footballGame.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.7;
}

function updateHeldBallRuntimePosition(state, footballGame) {
  if (!footballGame?.ball || state.heldItemId !== "ball") return;
  const { fx, fz, rx, rz } = getFacingBasis(state.yaw);
  footballGame.ball.visible = true;
  footballGame.ball.position.set(
    state.x + fx * JUKU_HELD_BALL_FORWARD + rx * JUKU_HELD_BALL_SIDE,
    Math.max(FOOTBALL_BALL_RADIUS, JUKU_BASE_Y + state.jumpY + JUKU_HELD_BALL_HEIGHT - state.crouchBlend * 0.05),
    state.z + fz * JUKU_HELD_BALL_FORWARD + rz * JUKU_HELD_BALL_SIDE
  );
  footballGame.ballVel.set(0, 0, 0);
  footballGame.ballHolder = null;
}

function getJukuHeldBallPresentationWorld(juku, state, out = JUKU_HELD_BALL_WORLD) {
  const leftHand = juku?.leftArm?.handPivot;
  const rightHand = juku?.rightArm?.handPivot;
  if (!leftHand || !rightHand) return null;

  leftHand.updateWorldMatrix(true, false);
  rightHand.updateWorldMatrix(true, false);
  const leftWorld = leftHand.localToWorld(JUKU_HELD_BALL_LEFT_WORLD.copy(JUKU_HELD_BALL_HAND_OFFSET));
  const rightWorld = rightHand.localToWorld(JUKU_HELD_BALL_RIGHT_WORLD.copy(JUKU_HELD_BALL_HAND_OFFSET));
  out.copy(leftWorld).add(rightWorld).multiplyScalar(0.5);
  const yawRad = THREE.MathUtils.degToRad(state.yaw);
  out.x += Math.sin(yawRad) * 0.06;
  out.z += Math.cos(yawRad) * 0.06;
  out.y += 0.02;
  return out;
}

function getPickupDefinitions({ state, footballGame, juku = null, pickupSceneObjects = null }) {
  return [
    {
      id: "sword",
      isLoosePickable() {
        return Boolean(getSwordState(state));
      },
      getLoosePosition() {
        const swordState = getSwordState(state);
        return swordState ? { x: swordState.x, z: swordState.z } : null;
      },
      onPickUp() {},
      onDrop() {
        const swordState = getSwordState(state);
        if (!swordState) return;
        const { fx, fz, rx, rz } = getFacingBasis(state.yaw);
        swordState.x = state.x + rx * 0.34 + fx * 0.18;
        swordState.z = state.z + rz * 0.34 + fz * 0.18;
        swordState.yaw = state.yaw - 24;
      },
      syncHeldRuntime() {},
      syncPresentation() {
        const swordState = getSwordState(state);
        const swordObjects = pickupSceneObjects?.sword ?? null;
        const held = state.heldItemId === "sword";
        if (swordObjects?.world?.root && swordState) {
          swordObjects.world.root.visible = !held;
          swordObjects.world.root.position.set(swordState.x, 0.028, swordState.z);
          swordObjects.world.root.rotation.set(
            THREE.MathUtils.degToRad(12),
            THREE.MathUtils.degToRad(swordState.yaw),
            THREE.MathUtils.degToRad(90)
          );
        }
        if (swordObjects?.held?.root) {
          swordObjects.held.root.visible = held;
        }
      }
    },
    {
      id: "ball",
      isLoosePickable() {
        return canPickUpBall(footballGame);
      },
      getLoosePosition() {
        return footballGame?.ball
          ? { x: footballGame.ball.position.x, z: footballGame.ball.position.z }
          : null;
      },
      onPickUp() {
        if (!footballGame?.ball) return;
        footballGame.ball.visible = true;
        footballGame.ballHolder = null;
        footballGame.ballVel.set(0, 0, 0);
        updateHeldBallRuntimePosition(state, footballGame);
      },
      onDrop() {
        if (!footballGame?.ball) return;
        const { fx, fz, rx, rz } = getFacingBasis(state.yaw);
        footballGame.ball.visible = true;
        footballGame.ballHolder = null;
        footballGame.ball.position.set(
          state.x + fx * 0.56 + rx * 0.12,
          FOOTBALL_BALL_RADIUS,
          state.z + fz * 0.56 + rz * 0.12
        );
        footballGame.ballVel.set(0, 0, 0);
      },
      syncHeldRuntime() {
        updateHeldBallRuntimePosition(state, footballGame);
      },
      syncPresentation() {
        if (state.heldItemId !== "ball" || !footballGame?.ball) return;
        const carryWorld = getJukuHeldBallPresentationWorld(juku, state);
        if (!carryWorld) return;
        footballGame.ball.visible = true;
        footballGame.ball.position.copy(carryWorld);
        footballGame.ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, footballGame.ball.position.y);
        footballGame.ballVel.set(0, 0, 0);
        footballGame.ballHolder = null;
      }
    }
  ];
}

function getHeldPickupDefinition(context) {
  if (!context.state.heldItemId) return null;
  const definitions = getPickupDefinitions(context);
  return definitions.find((definition) => definition.id === context.state.heldItemId) ?? null;
}

function findNearbyPickupDefinition(context) {
  const definitions = getPickupDefinitions(context);
  const maxPickupDistSq = PICKUP_RADIUS * PICKUP_RADIUS;
  let bestDefinition = null;
  let bestDistSq = maxPickupDistSq;

  for (const definition of definitions) {
    if (!definition.isLoosePickable()) continue;
    const loosePosition = definition.getLoosePosition();
    if (!loosePosition) continue;
    const dx = loosePosition.x - context.state.x;
    const dz = loosePosition.z - context.state.z;
    const distSq = dx * dx + dz * dz;
    if (distSq <= bestDistSq) {
      bestDefinition = definition;
      bestDistSq = distSq;
    }
  }

  return bestDefinition;
}

export function syncPickupRuntimeState(context) {
  const { state, footballGame } = context;
  if (footballGame) {
    footballGame.jukuBallHeld = state.heldItemId === "ball";
  }
  const heldDefinition = getHeldPickupDefinition(context);
  heldDefinition?.syncHeldRuntime?.();
  state.nearbyPickupId = state.heldItemId ? null : (findNearbyPickupDefinition(context)?.id ?? null);
}

export function handlePickupAction(context) {
  const { state } = context;
  const heldDefinition = getHeldPickupDefinition(context);
  if (heldDefinition) {
    heldDefinition.onDrop?.();
    state.heldItemId = null;
    syncPickupRuntimeState(context);
    return;
  }

  const nearbyDefinition = findNearbyPickupDefinition(context);
  if (!nearbyDefinition) {
    syncPickupRuntimeState(context);
    return;
  }

  state.heldItemId = nearbyDefinition.id;
  nearbyDefinition.onPickUp?.();
  syncPickupRuntimeState(context);
}

export function syncPickupPresentation(context) {
  const definitions = getPickupDefinitions(context);
  for (const definition of definitions) {
    definition.syncPresentation?.();
  }
}
