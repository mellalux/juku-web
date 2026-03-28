import * as THREE from "./three.js";
import {
  COACH_PERSON_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_PERSON_RADIUS,
  FOOTBALL_REFEREE_BALL_SAFE_RADIUS,
  FOOTBALL_REFEREE_LANE_SAFE_RADIUS
} from "./game-config.js";
import { getFootballRouteTargetRuntime } from "./football-routing-runtime.js";

const FOOTBALL_REF_GOAL_LINE = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
const FOOTBALL_REF_GOAL_HALF_WIDTH = FOOTBALL_GOAL_WIDTH * 0.5;
const FOOTBALL_REF_GOAL_LANE_CLEARANCE = COACH_PERSON_RADIUS + 1.48 + FOOTBALL_GOAL_DEPTH * 0.38;
const FOOTBALL_REF_GOAL_FRONT_GATE_CLEARANCE = 1.28 + FOOTBALL_GOAL_DEPTH * 0.46;
const FOOTBALL_REF_GOAL_BACK_GATE_CLEARANCE = 1.62 + FOOTBALL_GOAL_DEPTH * 0.64;
const FOOTBALL_REF_GOAL_MOUTH_FRONT_CLEARANCE = 0.48;
const FOOTBALL_REF_GOAL_MOUTH_INSIDE_CLEARANCE = 0.68;

export function getFootballPerimeterTFromPoint(x, z, offset = 1.15) {
  const halfW = FOOTBALL_FIELD_HALF_WIDTH + offset;
  const halfL = FOOTBALL_FIELD_HALF_LENGTH + offset;
  const width = halfW * 2;
  const length = halfL * 2;
  const perimeter = width * 2 + length * 2;
  const candidates = [
    { x: halfW, z: THREE.MathUtils.clamp(z, -halfL, halfL), d: THREE.MathUtils.clamp(z, -halfL, halfL) + halfL },
    { x: THREE.MathUtils.clamp(x, -halfW, halfW), z: halfL, d: length + (halfW - THREE.MathUtils.clamp(x, -halfW, halfW)) },
    { x: -halfW, z: THREE.MathUtils.clamp(z, -halfL, halfL), d: length + width + (halfL - THREE.MathUtils.clamp(z, -halfL, halfL)) },
    { x: THREE.MathUtils.clamp(x, -halfW, halfW), z: -halfL, d: length + width + length + (THREE.MathUtils.clamp(x, -halfW, halfW) + halfW) }
  ];
  let best = candidates[0];
  let bestDist = Infinity;
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const dist = (x - candidate.x) ** 2 + (z - candidate.z) ** 2;
    if (dist < bestDist) {
      best = candidate;
      bestDist = dist;
    }
  }
  return best.d / perimeter;
}

function getFootballRefGoalMeta(x, z) {
  const side = Math.sign(z || 0);
  if (side === 0) {
    return {
      side: 0,
      depth: 0,
      inGoalPocket: false,
      behindGoal: false
    };
  }

  const depth = z * side;
  return {
    side,
    depth,
    inGoalPocket: depth > FOOTBALL_REF_GOAL_LINE + 0.06
      && depth < FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH - 0.12
      && Math.abs(x) < FOOTBALL_REF_GOAL_HALF_WIDTH - 0.12,
    behindGoal: depth > FOOTBALL_FIELD_HALF_LENGTH + 0.05
      && Math.abs(x) < FOOTBALL_REF_GOAL_HALF_WIDTH + COACH_PERSON_RADIUS + 1.35
  };
}

function getFootballRefPlayerBlockers(game) {
  return game.players.map((player) => ({
    x: player.runner.root.position.x,
    z: player.runner.root.position.z,
    r: FOOTBALL_PERSON_RADIUS * 0.92
  }));
}

function setFootballRefRouteStage(routeState, kind, stage) {
  if (!routeState) return;
  routeState.goalRouteKind = kind;
  routeState.goalRouteStage = stage;
}

function clearFootballRefRouteStage(routeState) {
  if (!routeState) return;
  routeState.goalRouteKind = null;
  routeState.goalRouteSide = null;
  routeState.goalRouteStage = null;
}

function syncFootballRefSearchStage(coach, routeState) {
  if (!coach) return;
  const stageKey = `${routeState?.goalRouteKind ?? "direct"}:${routeState?.goalRouteStage ?? "direct"}`;
  if (coach.goalRouteStageKey !== stageKey) {
    coach.routeWaypoint = null;
    coach.routeRetryState = null;
    coach.goalRouteStageKey = stageKey;
  }
}

function getFootballRefGoalLaneSide(routeState, currentX, fallbackX) {
  const laneSide = routeState?.goalRouteSide
    ?? (Math.sign(Math.abs(currentX) > 0.45 ? currentX : fallbackX) || 1);
  if (routeState) routeState.goalRouteSide = laneSide;
  return laneSide;
}

function getFootballRefGoalLaneTargets(routeState, currentX, goalSide, alignX) {
  const laneSide = getFootballRefGoalLaneSide(routeState, currentX, alignX);
  const laneX = laneSide * (FOOTBALL_REF_GOAL_HALF_WIDTH + FOOTBALL_REF_GOAL_LANE_CLEARANCE);
  const mouthHalfWidth = Math.max(1.42, FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.18);
  const centeredMouthX = THREE.MathUtils.clamp(alignX * 0.34, -1.12, 1.12);
  const mouthX = THREE.MathUtils.clamp(centeredMouthX, -mouthHalfWidth, mouthHalfWidth);
  return {
    laneSide,
    frontGate: { x: laneX, z: goalSide * (FOOTBALL_REF_GOAL_LINE - FOOTBALL_REF_GOAL_FRONT_GATE_CLEARANCE) },
    backGate: { x: laneX, z: goalSide * (FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH + FOOTBALL_REF_GOAL_BACK_GATE_CLEARANCE) },
    mouthFront: { x: mouthX, z: goalSide * (FOOTBALL_REF_GOAL_LINE - FOOTBALL_REF_GOAL_MOUTH_FRONT_CLEARANCE) },
    mouthInside: { x: mouthX, z: goalSide * (FOOTBALL_REF_GOAL_LINE + FOOTBALL_REF_GOAL_MOUTH_INSIDE_CLEARANCE) }
  };
}

function getFootballRefGoalPocketEscapeTarget(currentX, goalSide) {
  return {
    x: THREE.MathUtils.clamp(currentX * 0.4, -1.36, 1.36),
    z: goalSide * (FOOTBALL_REF_GOAL_LINE + Math.min(0.96, FOOTBALL_GOAL_DEPTH * 0.38))
  };
}

function getFootballRefGoalPocketBridgeTarget(targetX, targetZ, goalSide) {
  const bridgeHalfWidth = Math.max(1.34, FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.42);
  const targetDepth = Math.abs(targetZ) - FOOTBALL_REF_GOAL_LINE;
  const bridgeDepth = FOOTBALL_REF_GOAL_LINE + THREE.MathUtils.clamp(targetDepth * 0.52, 0.88, 1.14);
  return {
    x: THREE.MathUtils.clamp(targetX * 0.62, -bridgeHalfWidth, bridgeHalfWidth),
    z: goalSide * bridgeDepth
  };
}

function getFootballRefGoalPocketCornerApproachTarget(targetX, targetZ, goalSide) {
  const approachHalfWidth = Math.max(1.62, FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.2);
  const targetDepth = Math.abs(targetZ) - FOOTBALL_REF_GOAL_LINE;
  const approachDepth = FOOTBALL_REF_GOAL_LINE + THREE.MathUtils.clamp(targetDepth * 0.72, 1.02, 1.42);
  return {
    x: THREE.MathUtils.clamp(targetX * 0.84, -approachHalfWidth, approachHalfWidth),
    z: goalSide * approachDepth
  };
}

function getFootballRefRouteSearchConfig(routeState) {
  const goalRouteActive = Boolean(routeState?.goalRouteKind);
  const stage = routeState?.goalRouteStage ?? "";
  const tightGoalStage = goalRouteActive && (
    stage === "cornerEscape"
    || stage === "goalPocketBridge"
    || stage === "goalPocketCornerApproach"
    || stage === "carryCornerEscape"
    || stage === "mouthFront"
    || stage === "mouthInside"
    || stage === "pickup"
  );
  const wideGoalStage = goalRouteActive && (
    stage === "escapeInside"
    || stage === "escapeFront"
    || stage === "frontGate"
    || stage === "backGate"
    || stage === "resetBackGate"
    || stage === "resetFrontGate"
    || stage === "directBehindGoal"
    || stage === "carryExitBack"
    || stage === "carryExitFront"
    || stage === "carryBehindGoalDirect"
  );
  return {
    staticPadding: tightGoalStage ? 0.22 : wideGoalStage ? 0.34 : goalRouteActive ? 0.31 : 0.28,
    dynamicPadding: tightGoalStage ? 0.34 : wideGoalStage ? 0.42 : goalRouteActive ? 0.38 : 0.34,
    waypointReachDist: tightGoalStage ? 0.98 : wideGoalStage ? 1.02 : goalRouteActive ? 0.94 : 0.84,
    maxTargetShift: tightGoalStage ? 7.2 : wideGoalStage ? 6.4 : goalRouteActive ? 5.4 : 4.2,
    searchArcScale: tightGoalStage ? 2.9 : wideGoalStage ? 2.45 : goalRouteActive ? 2.05 : 1.72,
    stallFrameLimit: tightGoalStage ? 7 : wideGoalStage ? 8 : goalRouteActive ? 10 : 12,
    stallMoveThreshold: tightGoalStage ? 0.03 : wideGoalStage ? 0.032 : 0.026,
    stallProgressThreshold: tightGoalStage ? 0.018 : wideGoalStage ? 0.02 : 0.016,
    recoverMoveThreshold: tightGoalStage ? 0.082 : wideGoalStage ? 0.08 : 0.065,
    recoverProgressThreshold: tightGoalStage ? 0.072 : wideGoalStage ? 0.07 : 0.058,
    maxRetryCount: tightGoalStage ? 10 : wideGoalStage ? 8 : goalRouteActive ? 7 : 6
  };
}

function getFootballRefPickupProfile(ballX, ballZ) {
  const ballMeta = getFootballRefGoalMeta(ballX, ballZ);
  if (!ballMeta.inGoalPocket) {
    return {
      target: { x: ballX, z: ballZ },
      reachDist: COACH_PERSON_RADIUS + 0.24 + 0.22
    };
  }

  const pickupHalfWidth = Math.max(1.08, FOOTBALL_REF_GOAL_HALF_WIDTH - (COACH_PERSON_RADIUS + 0.12));
  const pickupMaxDepth = FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH - (COACH_PERSON_RADIUS + 0.12);
  const pickupMinDepth = FOOTBALL_REF_GOAL_LINE + 0.28;
  const clampedX = THREE.MathUtils.clamp(ballX, -pickupHalfWidth, pickupHalfWidth);
  const clampedDepth = THREE.MathUtils.clamp(ballMeta.depth, pickupMinDepth, pickupMaxDepth);
  const sideCornerT = THREE.MathUtils.clamp((Math.abs(clampedX) - (pickupHalfWidth - 0.34)) / 0.72, 0, 1);
  const backCornerT = THREE.MathUtils.clamp((clampedDepth - (pickupMaxDepth - 0.34)) / 0.72, 0, 1);
  const inwardX = clampedX * (1 - sideCornerT * 0.16 - backCornerT * 0.08);
  const inwardDepth = clampedDepth - (backCornerT * 0.18 + sideCornerT * 0.1);
  const reachDist = COACH_PERSON_RADIUS + 0.24 + 0.5 + Math.max(sideCornerT, backCornerT) * 0.22;
  return {
    target: {
      x: THREE.MathUtils.clamp(inwardX, -pickupHalfWidth, pickupHalfWidth),
      z: ballMeta.side * THREE.MathUtils.clamp(inwardDepth, pickupMinDepth, pickupMaxDepth)
    },
    reachDist
  };
}

export function getFootballRefPickupTargetRuntime(ballX, ballZ) {
  return getFootballRefPickupProfile(ballX, ballZ).target;
}

export function getFootballRefPickupReachRuntime(ballX, ballZ) {
  return getFootballRefPickupProfile(ballX, ballZ).reachDist;
}

function isNearFootballRefTarget(currentX, currentZ, target, tolX = 0.6, tolZ = 0.75) {
  return Math.abs(currentX - target.x) < tolX && Math.abs(currentZ - target.z) < tolZ;
}

function getFootballRefRestartPathTarget(game, restart, currentX, currentZ, ballX, ballZ) {
  const ballMeta = getFootballRefGoalMeta(ballX, ballZ);
  const currentMeta = getFootballRefGoalMeta(currentX, currentZ);
  const ballOnField = Math.abs(ballX) <= FOOTBALL_FIELD_HALF_WIDTH + 0.05
    && Math.abs(ballZ) <= FOOTBALL_FIELD_HALF_LENGTH + 0.05;
  const dynamicPlayerBlockers = getFootballRefPlayerBlockers(game);
  if (ballMeta.side === 0) {
    clearFootballRefRouteStage(restart);
    return {
      target: { x: ballX, z: ballZ },
      dynamicBlockers: ballOnField ? dynamicPlayerBlockers : dynamicPlayerBlockers
    };
  }

  const pickup = getFootballRefPickupTargetRuntime(ballX, ballZ);
  const retryCount = game.coach?.routeRetryState?.retryCount ?? 0;
  const currentStage = restart?.goalRouteStage ?? "";
  const currentCorneredInGoal = currentMeta.inGoalPocket && (
    Math.abs(currentX) > FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.34
    || currentMeta.depth > FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH - COACH_PERSON_RADIUS - 0.34
  );
  const needsInteriorBridge = currentMeta.inGoalPocket
    && ballMeta.inGoalPocket
    && (
      currentCorneredInGoal
      || Math.abs(currentX - pickup.x) > 1.65
      || (retryCount >= 1 && currentStage === "pickup")
    );
  const pickupCornered = ballMeta.inGoalPocket && (
    Math.abs(pickup.x) > FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.64
    || Math.abs(ballZ) > FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH - COACH_PERSON_RADIUS - 0.48
  );
  const shouldForceNewLap = ballMeta.inGoalPocket
    && retryCount >= 2
    && (
      currentMeta.behindGoal
      || currentStage === "pickup"
      || currentStage === "mouthFront"
      || currentStage === "mouthInside"
    );
  if (shouldForceNewLap) {
    const laneSide = getFootballRefGoalLaneSide(restart, currentX, pickup.x);
    restart.goalRouteSide = -laneSide;
  }
  const {
    laneSide,
    frontGate,
    backGate,
    mouthFront,
    mouthInside
  } = getFootballRefGoalLaneTargets(restart, currentX, ballMeta.side || Math.sign(currentZ || 1) || 1, pickup.x);

  if (ballMeta.inGoalPocket) {
    if (shouldForceNewLap) {
      if (currentMeta.behindGoal && !isNearFootballRefTarget(currentX, currentZ, backGate, 0.82, 0.94)) {
        setFootballRefRouteStage(restart, "goalPocket", "resetBackGate");
        return { target: backGate, dynamicBlockers: dynamicPlayerBlockers };
      }
      if (!isNearFootballRefTarget(currentX, currentZ, frontGate, 0.82, 0.94)) {
        setFootballRefRouteStage(restart, "goalPocket", "resetFrontGate");
        return { target: frontGate, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    if (needsInteriorBridge) {
      const bridgeTarget = getFootballRefGoalPocketBridgeTarget(pickup.x, ballZ, ballMeta.side || Math.sign(currentZ || 1) || 1);
      if (!isNearFootballRefTarget(currentX, currentZ, bridgeTarget, 0.58, 0.76)) {
        setFootballRefRouteStage(restart, "goalPocket", "goalPocketBridge");
        return { target: bridgeTarget, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    if (pickupCornered) {
      const cornerApproachTarget = getFootballRefGoalPocketCornerApproachTarget(pickup.x, ballZ, ballMeta.side || Math.sign(currentZ || 1) || 1);
      if (!isNearFootballRefTarget(currentX, currentZ, cornerApproachTarget, 0.54, 0.72)) {
        setFootballRefRouteStage(restart, "goalPocket", "goalPocketCornerApproach");
        return { target: cornerApproachTarget, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    setFootballRefRouteStage(restart, "goalPocket", "pickup");
    if (currentMeta.behindGoal) {
      if (!isNearFootballRefTarget(currentX, currentZ, backGate, 0.74, 0.86)) {
        setFootballRefRouteStage(restart, "goalPocket", "backGate");
        return { target: backGate, dynamicBlockers: dynamicPlayerBlockers };
      }
      if (!isNearFootballRefTarget(currentX, currentZ, frontGate, 0.74, 0.86)) {
        setFootballRefRouteStage(restart, "goalPocket", "frontGate");
        return { target: frontGate, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    if (!currentMeta.inGoalPocket) {
      if (!isNearFootballRefTarget(currentX, currentZ, mouthFront, 0.58, 0.72)) {
        setFootballRefRouteStage(restart, "goalPocket", "mouthFront");
        return { target: mouthFront, dynamicBlockers: dynamicPlayerBlockers };
      }
      if (!isNearFootballRefTarget(currentX, currentZ, mouthInside, 0.58, 0.72)) {
        setFootballRefRouteStage(restart, "goalPocket", "mouthInside");
        return { target: mouthInside, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    return { target: pickup, dynamicBlockers: dynamicPlayerBlockers };
  }

  if (ballMeta.behindGoal) {
    setFootballRefRouteStage(restart, "goalSearch", "directBehindGoal");
    if (currentMeta.inGoalPocket) {
      if (!isNearFootballRefTarget(currentX, currentZ, mouthInside, 0.62, 0.78)) {
        setFootballRefRouteStage(restart, "goalSearch", "escapeInside");
        return { target: mouthInside, dynamicBlockers: dynamicPlayerBlockers };
      }
      if (!isNearFootballRefTarget(currentX, currentZ, mouthFront, 0.62, 0.78)) {
        setFootballRefRouteStage(restart, "goalSearch", "escapeFront");
        return { target: mouthFront, dynamicBlockers: dynamicPlayerBlockers };
      }
    }
    return { target: { x: ballX, z: ballZ }, dynamicBlockers: dynamicPlayerBlockers };
  }

  clearFootballRefRouteStage(restart);
  return {
    target: { x: ballX, z: ballZ },
    dynamicBlockers: ballOnField ? dynamicPlayerBlockers : dynamicPlayerBlockers
  };
}

function getFootballRefCarryPathTarget(game, routeState, currentX, currentZ, targetX, targetZ, dynamicBlockers = []) {
  const routeBlockers = dynamicBlockers.length > 0 ? dynamicBlockers : getFootballRefPlayerBlockers(game);
  const currentMeta = getFootballRefGoalMeta(currentX, currentZ);
  if (!currentMeta.inGoalPocket && !currentMeta.behindGoal) {
    clearFootballRefRouteStage(routeState);
    return { target: { x: targetX, z: targetZ }, dynamicBlockers: routeBlockers };
  }

  const goalSide = currentMeta.side || Math.sign(targetZ || currentZ || 1) || 1;
  const {
    frontGate,
    backGate,
    mouthFront,
    mouthInside
  } = getFootballRefGoalLaneTargets(routeState, currentX, goalSide, currentX);

  if (currentMeta.behindGoal) {
    if (!isNearFootballRefTarget(currentX, currentZ, backGate, 0.82, 0.94)) {
      setFootballRefRouteStage(routeState, "goalSearch", "carryExitBack");
      return { target: backGate, dynamicBlockers: routeBlockers };
    }
    if (!isNearFootballRefTarget(currentX, currentZ, frontGate, 0.82, 0.94)) {
      setFootballRefRouteStage(routeState, "goalSearch", "carryExitFront");
      return { target: frontGate, dynamicBlockers: routeBlockers };
    }
    setFootballRefRouteStage(routeState, "goalSearch", "carryBehindGoalDirect");
    return { target: { x: targetX, z: targetZ }, dynamicBlockers: routeBlockers };
  }

  const corneredInGoal = currentMeta.inGoalPocket && (
    Math.abs(currentX) > FOOTBALL_REF_GOAL_HALF_WIDTH - COACH_PERSON_RADIUS - 0.34
    || currentMeta.depth > FOOTBALL_REF_GOAL_LINE + FOOTBALL_GOAL_DEPTH - COACH_PERSON_RADIUS - 0.34
  );
  if (corneredInGoal) {
    const cornerEscape = getFootballRefGoalPocketEscapeTarget(currentX, goalSide);
    if (!isNearFootballRefTarget(currentX, currentZ, cornerEscape, 0.56, 0.74)) {
      setFootballRefRouteStage(routeState, "carryGoalPocket", "carryCornerEscape");
      return { target: cornerEscape, dynamicBlockers: routeBlockers };
    }
  }

  setFootballRefRouteStage(routeState, "carryGoalPocket", "mouthInside");
  if (!isNearFootballRefTarget(currentX, currentZ, mouthInside, 0.68, 0.8)) {
    return { target: mouthInside, dynamicBlockers: routeBlockers };
  }
  if (!isNearFootballRefTarget(currentX, currentZ, mouthFront, 0.68, 0.8)) {
    setFootballRefRouteStage(routeState, "carryGoalPocket", "mouthFront");
    return { target: mouthFront, dynamicBlockers: routeBlockers };
  }
  clearFootballRefRouteStage(routeState);
  return { target: { x: targetX, z: targetZ }, dynamicBlockers: routeBlockers };
}

function getFootballRefLivePlayTarget(game, coach) {
  const ball = game.ball;
  const ballHolder = game.ballHolder ?? null;
  const attackSide = game.attackingTeam !== 0
    ? game.attackingTeam
    : Math.abs(game.ballVel.z) > 0.12
      ? Math.sign(game.ballVel.z || 1)
      : ball.position.z >= 0
        ? 1
        : -1;
  const currentSide = coach.sidelineSide ?? 0;
  const sidelineSide = Math.abs(ball.position.x) > 2.2
    ? Math.sign(ball.position.x || currentSide || -attackSide || 1)
    : Math.sign(currentSide || -attackSide || 1);
  coach.sidelineSide = sidelineSide || 1;

  const sidelineAnchorX = coach.sidelineSide * (FOOTBALL_FIELD_HALF_WIDTH - 1.9);
  let targetX = THREE.MathUtils.lerp(ball.position.x * 0.28, sidelineAnchorX, 0.72);
  let targetZ = ball.position.z - attackSide * 4.35;
  if (ballHolder) {
    const carrierX = ballHolder.runner.root.position.x;
    const carrierZ = ballHolder.runner.root.position.z;
    const carrierSpeed = Math.hypot(ballHolder.vx ?? 0, ballHolder.vz ?? 0);
    targetX = THREE.MathUtils.lerp(targetX, coach.sidelineSide * (FOOTBALL_FIELD_HALF_WIDTH - 1.15), 0.24);
    targetZ = THREE.MathUtils.lerp(
      targetZ,
      carrierZ - attackSide * (5.25 + Math.min(1.2, carrierSpeed * 0.24)),
      0.72
    );
    if (Math.abs(targetX - carrierX) < 2.8) {
      targetX += coach.sidelineSide * (2.1 + Math.min(0.8, carrierSpeed * 0.12));
    }
  }
  let attackingPlayerCount = 0;
  let deepestAttackDepth = -Infinity;
  let supportDepthSum = 0;
  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    if (player.team !== attackSide || player.role === "keeper") continue;
    attackingPlayerCount += 1;
    const attackDepth = player.runner.root.position.z * attackSide;
    deepestAttackDepth = Math.max(deepestAttackDepth, attackDepth);
    supportDepthSum += attackDepth;
  }
  if (attackingPlayerCount > 0) {
    const meanAttackDepth = supportDepthSum / attackingPlayerCount;
    const preferredDepth = Math.max(
      ball.position.z * attackSide - 4.35,
      meanAttackDepth - 2.9,
      deepestAttackDepth - 4.8
    ) * attackSide;
    targetZ = THREE.MathUtils.lerp(targetZ, preferredDepth, 0.66);
  }

  targetX = THREE.MathUtils.clamp(targetX, -FOOTBALL_FIELD_HALF_WIDTH + 1.4, FOOTBALL_FIELD_HALF_WIDTH - 1.4);
  targetZ = THREE.MathUtils.clamp(targetZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.3, FOOTBALL_FIELD_HALF_LENGTH - 1.3);

  let pushX = 0;
  let pushZ = 0;
  const safeBallRadius = FOOTBALL_REFEREE_BALL_SAFE_RADIUS + Math.min(1.6, game.ballVel.length() * 0.18);
  const ballDx = targetX - ball.position.x;
  const ballDz = targetZ - ball.position.z;
  const ballDist = Math.hypot(ballDx, ballDz);
  if (ballDist < safeBallRadius) {
    const nx = ballDist > 0.001 ? ballDx / ballDist : coach.sidelineSide || 1;
    const nz = ballDist > 0.001 ? ballDz / ballDist : -attackSide;
    const strength = safeBallRadius - ballDist;
    pushX += nx * strength;
    pushZ += nz * strength;
  }

  if (ballHolder) {
    const carrierX = ballHolder.runner.root.position.x;
    const carrierZ = ballHolder.runner.root.position.z;
    const carrierSpeed = Math.hypot(ballHolder.vx ?? 0, ballHolder.vz ?? 0);
    const safeCarrierRadius = FOOTBALL_REFEREE_BALL_SAFE_RADIUS + 1.35 + Math.min(1.3, carrierSpeed * 0.26);
    const carrierDx = targetX - carrierX;
    const carrierDz = targetZ - carrierZ;
    const carrierDist = Math.hypot(carrierDx, carrierDz);
    if (carrierDist < safeCarrierRadius) {
      const nx = carrierDist > 0.001 ? carrierDx / carrierDist : coach.sidelineSide || 1;
      const nz = carrierDist > 0.001 ? carrierDz / carrierDist : -attackSide;
      const strength = (safeCarrierRadius - carrierDist) * 1.35;
      pushX += nx * strength;
      pushZ += nz * strength;
    }
  }

  const laneLenSq = game.ballVel.x * game.ballVel.x + game.ballVel.z * game.ballVel.z;
  if (laneLenSq > 0.08 * 0.08) {
    const laneLen = Math.sqrt(laneLenSq);
    const laneDirX = game.ballVel.x / laneLen;
    const laneDirZ = game.ballVel.z / laneLen;
    const laneToTargetX = targetX - ball.position.x;
    const laneToTargetZ = targetZ - ball.position.z;
    const along = THREE.MathUtils.clamp(laneToTargetX * laneDirX + laneToTargetZ * laneDirZ, 0, Math.min(14, laneLen * 1.35));
    const projX = ball.position.x + laneDirX * along;
    const projZ = ball.position.z + laneDirZ * along;
    const laneOffsetX = targetX - projX;
    const laneOffsetZ = targetZ - projZ;
    const laneOffset = Math.hypot(laneOffsetX, laneOffsetZ);
    if (laneOffset < FOOTBALL_REFEREE_LANE_SAFE_RADIUS) {
      const sideNx = laneOffset > 0.001 ? laneOffsetX / laneOffset : -laneDirZ;
      const sideNz = laneOffset > 0.001 ? laneOffsetZ / laneOffset : laneDirX;
      const strength = (FOOTBALL_REFEREE_LANE_SAFE_RADIUS - laneOffset) * 1.5;
      pushX += sideNx * strength;
      pushZ += sideNz * strength;
    }
  }

  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    const playDist = Math.hypot(player.runner.root.position.x - ball.position.x, player.runner.root.position.z - ball.position.z);
    const avoidRadius = player === ballHolder
      ? 2.8
      : playDist < 2.8
        ? 1.95
        : 1.2;
    const dx = targetX - player.runner.root.position.x;
    const dz = targetZ - player.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist >= avoidRadius) continue;
    const nx = dist > 0.001 ? dx / dist : coach.sidelineSide || 1;
    const nz = dist > 0.001 ? dz / dist : -attackSide;
    const strength = (avoidRadius - dist) * (
      player === ballHolder
        ? 1.85
        : playDist < 2.8
          ? 1.35
          : 0.8
    );
    pushX += nx * strength;
    pushZ += nz * strength;
  }

  return {
    target: { x: targetX + pushX, z: targetZ + pushZ },
    dynamicBlockers: getFootballRefPlayerBlockers(game)
  };
}

function getFootballRefRoutedTarget(game, coach, currentX, currentZ, targetX, targetZ, dynamicBlockers = []) {
  const routeConfig = getFootballRefRouteSearchConfig(coach);
  return getFootballRouteTargetRuntime(
    game,
    coach,
    currentX,
    currentZ,
    targetX,
    targetZ,
    {
      radius: COACH_PERSON_RADIUS,
      staticPadding: routeConfig.staticPadding,
      dynamicPadding: routeConfig.dynamicPadding,
      dynamicBlockers,
      waypointReachDist: routeConfig.waypointReachDist,
      maxTargetShift: routeConfig.maxTargetShift,
      searchMode: "seek",
      searchArcScale: routeConfig.searchArcScale,
      stallFrameLimit: routeConfig.stallFrameLimit,
      stallMoveThreshold: routeConfig.stallMoveThreshold,
      stallProgressThreshold: routeConfig.stallProgressThreshold,
      recoverMoveThreshold: routeConfig.recoverMoveThreshold,
      recoverProgressThreshold: routeConfig.recoverProgressThreshold,
      maxRetryCount: routeConfig.maxRetryCount,
      useGoalSpecialTargets: false,
      useFieldBoundaryTargets: false
    }
  );
}

export function getFootballRefBallRecoveryTargetRuntime(
  game,
  recoveryState,
  coach,
  ballX,
  ballZ,
  { clampFootballRefereePosition }
) {
  const currentX = coach.runner.root.position.x;
  const currentZ = coach.runner.root.position.z;
  const recoveryTarget = getFootballRefRestartPathTarget(game, recoveryState, currentX, currentZ, ballX, ballZ);
  syncFootballRefSearchStage(coach, recoveryState);
  const routedTarget = getFootballRefRoutedTarget(
    game,
    coach,
    currentX,
    currentZ,
    recoveryTarget.target.x,
    recoveryTarget.target.z,
    recoveryTarget.dynamicBlockers
  );
  const clampedTarget = clampFootballRefereePosition(routedTarget.x, routedTarget.z);
  coach.targetX = clampedTarget.x;
  coach.targetZ = clampedTarget.z;
  return clampedTarget;
}

export function getFootballRefTravelTargetRuntime(
  game,
  coach,
  targetX,
  targetZ,
  { clampFootballRefereePosition, dynamicBlockers = [], routeState = null }
) {
  const currentX = coach.runner.root.position.x;
  const currentZ = coach.runner.root.position.z;
  const carryTarget = getFootballRefCarryPathTarget(
    game,
    routeState ?? coach,
    currentX,
    currentZ,
    targetX,
    targetZ,
    dynamicBlockers
  );
  syncFootballRefSearchStage(coach, routeState ?? coach);
  const routedTarget = getFootballRefRoutedTarget(
    game,
    coach,
    currentX,
    currentZ,
    carryTarget.target.x,
    carryTarget.target.z,
    carryTarget.dynamicBlockers
  );
  const clampedTarget = clampFootballRefereePosition(routedTarget.x, routedTarget.z);
  coach.targetX = clampedTarget.x;
  coach.targetZ = clampedTarget.z;
  return clampedTarget;
}

export function getFootballRefereeTargetRuntime(game, { clampFootballRefereePosition }) {
  const coach = game.coach;
  const currentX = coach.runner.root.position.x;
  const currentZ = coach.runner.root.position.z;

  if (game.refRestart?.active) {
    const restart = game.refRestart;
    const restartTarget = restart.phase === "toBall"
      ? getFootballRefRestartPathTarget(game, restart, currentX, currentZ, restart.ballX, restart.ballZ)
      : restart.phase === "clear"
        ? { target: { x: restart.clearX ?? restart.placeX, z: restart.clearZ ?? restart.placeZ }, dynamicBlockers: [] }
        : getFootballRefCarryPathTarget(
            game,
            restart,
            currentX,
            currentZ,
            restart.placeX,
            restart.placeZ,
            []
          );
    const routedRestartTarget = getFootballRefRoutedTarget(
      game,
      coach,
      currentX,
      currentZ,
      restartTarget.target.x,
      restartTarget.target.z,
      restartTarget.dynamicBlockers
    );
    const clampedRestartTarget = clampFootballRefereePosition(routedRestartTarget.x, routedRestartTarget.z);
    coach.targetX = clampedRestartTarget.x;
    coach.targetZ = clampedRestartTarget.z;
    return clampedRestartTarget;
  }

  const liveTarget = getFootballRefLivePlayTarget(game, coach);
  const routedTarget = getFootballRefRoutedTarget(
    game,
    coach,
    currentX,
    currentZ,
    liveTarget.target.x,
    liveTarget.target.z,
    liveTarget.dynamicBlockers
  );
  const clamped = clampFootballRefereePosition(routedTarget.x, routedTarget.z);
  coach.targetX = clamped.x;
  coach.targetZ = clamped.z;
  return clamped;
}
