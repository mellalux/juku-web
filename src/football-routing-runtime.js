import * as THREE from "./three.js";
import {
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH
} from "./game-config.js";

function isInsideFootballGoalPocket(x, z, radius = 0, depthOffset = Math.max(0.58, radius * 0.22), frontBuffer = 0) {
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const side = Math.sign(z || 0);
  if (side === 0) return false;
  const depth = z * side;
  return depth > goalLine + depthOffset - Math.max(0, frontBuffer)
    && depth < goalLine + FOOTBALL_GOAL_DEPTH - Math.max(0.14, radius * 0.2)
    && Math.abs(x) < FOOTBALL_GOAL_WIDTH * 0.5 - Math.max(0.12, radius * 0.18);
}

function getFootballGoalRouteGeometry(radius = 0) {
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5;
  const sideClearance = Math.max(1.52, radius + 0.68);
  const backClearance = Math.max(1.6, radius + 0.72);
  const frontClearance = Math.max(0.72, radius * 0.34 + 0.38);
  const entryClearance = Math.max(0.44, radius * 0.18 + 0.16);
  return {
    goalLine,
    goalHalfWidth,
    laneXAbs: goalHalfWidth + sideClearance,
    backZAbs: goalLine + FOOTBALL_GOAL_DEPTH + backClearance,
    frontZAbs: goalLine - frontClearance,
    entryZAbs: goalLine - entryClearance
  };
}

function getFootballGoalPocketEntryTarget(
  currentX,
  currentZ,
  targetX,
  targetZ,
  radius = 0,
  depthOffset = Math.max(0.58, radius * 0.22),
  frontBuffer = 0
) {
  if (!isInsideFootballGoalPocket(targetX, targetZ, radius, depthOffset, frontBuffer)) return null;
  if (isInsideFootballGoalPocket(currentX, currentZ, radius, depthOffset, frontBuffer)) return null;

  const goalSide = Math.sign(targetZ || currentZ || 1);
  const { goalHalfWidth, entryZAbs } = getFootballGoalRouteGeometry(radius);
  const entryHalfWidth = Math.min(1.18, Math.max(0.82, goalHalfWidth - radius - 0.84));
  const entryX = THREE.MathUtils.clamp(targetX * 0.26, -1.18, 1.18);
  const safeEntryX = THREE.MathUtils.clamp(entryX, -entryHalfWidth, entryHalfWidth);
  const entryZ = goalSide * entryZAbs;
  const alignedWithEntry = Math.abs(currentX - safeEntryX) < 0.58 && Math.abs(currentZ - entryZ) < 0.72;
  return alignedWithEntry ? null : { x: safeEntryX, z: entryZ };
}

function getFootballGoalStructuredRouteTarget(
  currentX,
  currentZ,
  targetX,
  targetZ,
  radius = 0,
  depthOffset = Math.max(0.58, radius * 0.22),
  frontBuffer = 0
) {
  const side = Math.sign(targetZ || currentZ || 0);
  if (side === 0) return null;

  const { goalLine, goalHalfWidth, laneXAbs, backZAbs, frontZAbs, entryZAbs } = getFootballGoalRouteGeometry(radius);
  const currentDepth = currentZ * side;
  const targetDepth = targetZ * side;
  const laneX = (Math.sign(
    Math.abs(currentX) > 0.24
      ? currentX
      : Math.abs(targetX) > 0.24
        ? targetX
        : 1
  ) || 1) * laneXAbs;
  const frontShoulder = {
    x: laneX,
    z: side * frontZAbs
  };
  const backShoulder = {
    x: laneX,
    z: side * backZAbs
  };
  const mouthEntry = {
    x: THREE.MathUtils.clamp(targetX * 0.26, -1.18, 1.18),
    z: side * entryZAbs
  };
  const targetInGoalPocket = isInsideFootballGoalPocket(targetX, targetZ, radius, depthOffset, frontBuffer);
  const targetBehindGoal = targetDepth > FOOTBALL_FIELD_HALF_LENGTH + 0.05
    && Math.abs(targetX) < laneXAbs + 0.92;
  const currentBehindGoal = currentDepth > FOOTBALL_FIELD_HALF_LENGTH + 0.05;
  const currentInGoalCorridor = Math.abs(currentX) < laneXAbs - 0.28;
  const nearFrontShoulder = Math.abs(currentX - frontShoulder.x) < 0.74 && Math.abs(currentZ - frontShoulder.z) < 0.92;
  const nearBackShoulder = Math.abs(currentX - backShoulder.x) < 0.74 && Math.abs(currentZ - backShoulder.z) < 0.98;
  const nearMouthEntry = Math.abs(currentX - mouthEntry.x) < 0.66 && Math.abs(currentZ - mouthEntry.z) < 0.84;

  if (targetBehindGoal) {
    if (!currentBehindGoal) {
      if (!nearFrontShoulder) return frontShoulder;
      if (!nearBackShoulder) return backShoulder;
      return null;
    }
    if (currentInGoalCorridor && !nearBackShoulder) return backShoulder;
    return null;
  }

  if (targetInGoalPocket) {
    if (currentBehindGoal) {
      if (currentInGoalCorridor && !nearBackShoulder) return backShoulder;
      if (!nearFrontShoulder) return frontShoulder;
    }
    const mustUseEntry = currentBehindGoal
      || currentDepth > goalLine - 0.18
      || Math.abs(currentX - mouthEntry.x) > 0.8;
    if (mustUseEntry && !nearMouthEntry) return mouthEntry;
    return null;
  }

  if (currentBehindGoal) {
    if (currentInGoalCorridor && !nearBackShoulder) return backShoulder;
    if (!nearFrontShoulder) return frontShoulder;
  }

  return null;
}

function getFootballGoalBehindBypassTarget(currentX, currentZ, targetX, targetZ, radius = 0) {
  const outsideByZ = Math.max(0, Math.abs(targetZ) - FOOTBALL_FIELD_HALF_LENGTH);
  if (outsideByZ <= 0.05) return null;

  const side = Math.sign(targetZ || currentZ || 1);
  const { laneXAbs, backZAbs } = getFootballGoalRouteGeometry(radius);
  const nearGoalCorridor = Math.abs(targetX) < laneXAbs + 0.7;
  if (!nearGoalCorridor) return null;

  const laneX = (Math.sign(targetX || currentX || 1) || 1) * laneXAbs;
  const laneZ = side * Math.max(backZAbs, Math.abs(targetZ) + 0.12);
  const aligned = Math.abs(currentX - laneX) < 0.72 && Math.abs(currentZ - laneZ) < 0.88;
  return aligned ? null : { x: laneX, z: laneZ };
}

function getFootballGoalBehindReentryTarget(currentX, currentZ, targetX, targetZ, radius = 0) {
  const currentOutsideByZ = Math.max(0, Math.abs(currentZ) - FOOTBALL_FIELD_HALF_LENGTH);
  if (currentOutsideByZ <= 0.05) return null;

  const side = Math.sign(currentZ || targetZ || 1);
  const { goalLine, goalHalfWidth, laneXAbs, frontZAbs } = getFootballGoalRouteGeometry(radius);
  const targetDepth = targetZ * side;
  const targetInsideField = Math.abs(targetZ) <= FOOTBALL_FIELD_HALF_LENGTH + 0.05;
  const targetStillInGoalCorridor = targetDepth < goalLine + FOOTBALL_GOAL_DEPTH - 0.18;
  const nearGoalCorridor = Math.abs(targetX) < goalHalfWidth + 1.4;
  if (!nearGoalCorridor || (!targetInsideField && !targetStillInGoalCorridor)) return null;

  const laneX = (Math.sign(currentX || targetX || 1) || 1) * laneXAbs;
  const laneZ = side * frontZAbs;
  const aligned = Math.abs(currentX - laneX) < 0.72 && Math.abs(currentZ - laneZ) < 0.88;
  return aligned ? null : { x: laneX, z: laneZ };
}

function getFootballOutsideFieldApproachTarget(currentX, currentZ, targetX, targetZ) {
  const outsideByX = Math.max(0, Math.abs(targetX) - FOOTBALL_FIELD_HALF_WIDTH);
  const outsideByZ = Math.max(0, Math.abs(targetZ) - FOOTBALL_FIELD_HALF_LENGTH);
  if (outsideByX <= 0 && outsideByZ <= 0) return null;

  if (outsideByZ >= outsideByX) {
    const side = Math.sign(targetZ || 1);
    const nearGoalCorridor = Math.abs(targetX) < FOOTBALL_GOAL_WIDTH * 0.5 + 1.25;
    const entryX = nearGoalCorridor
      ? (Math.sign(targetX || currentX || 1) || 1) * (FOOTBALL_GOAL_WIDTH * 0.5 + 1.45)
      : THREE.MathUtils.clamp(targetX, -FOOTBALL_FIELD_HALF_WIDTH + 1.8, FOOTBALL_FIELD_HALF_WIDTH - 1.8);
    const entryZ = side * (FOOTBALL_FIELD_HALF_LENGTH + 0.34);
    const alreadyOutside = Math.sign(currentZ || side) === side && Math.abs(currentZ) > FOOTBALL_FIELD_HALF_LENGTH + 0.1;
    const aligned = Math.abs(currentX - entryX) < 0.85 && Math.abs(currentZ - entryZ) < 0.85;
    return alreadyOutside || aligned ? null : { x: entryX, z: entryZ };
  }

  const side = Math.sign(targetX || 1);
  const entryX = side * (FOOTBALL_FIELD_HALF_WIDTH + 0.34);
  const entryZ = THREE.MathUtils.clamp(targetZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.8, FOOTBALL_FIELD_HALF_LENGTH - 1.8);
  const alreadyOutside = Math.sign(currentX || side) === side && Math.abs(currentX) > FOOTBALL_FIELD_HALF_WIDTH + 0.1;
  const aligned = Math.abs(currentX - entryX) < 0.75 && Math.abs(currentZ - entryZ) < 0.9;
  return alreadyOutside || aligned ? null : { x: entryX, z: entryZ };
}

function getFootballFieldReentryTarget(currentX, currentZ, targetX, targetZ) {
  const currentOutsideByX = Math.max(0, Math.abs(currentX) - FOOTBALL_FIELD_HALF_WIDTH);
  const currentOutsideByZ = Math.max(0, Math.abs(currentZ) - FOOTBALL_FIELD_HALF_LENGTH);
  const targetOutsideByX = Math.max(0, Math.abs(targetX) - FOOTBALL_FIELD_HALF_WIDTH);
  const targetOutsideByZ = Math.max(0, Math.abs(targetZ) - FOOTBALL_FIELD_HALF_LENGTH);
  if ((currentOutsideByX <= 0 && currentOutsideByZ <= 0) || targetOutsideByX > 0 || targetOutsideByZ > 0) {
    return null;
  }

  if (currentOutsideByZ >= currentOutsideByX) {
    const side = Math.sign(currentZ || 1);
    const nearGoalCorridor = Math.abs(currentX) < FOOTBALL_GOAL_WIDTH * 0.5 + 1.35;
    const entryX = nearGoalCorridor
      ? (Math.sign(currentX || targetX || 1) || 1) * (FOOTBALL_GOAL_WIDTH * 0.5 + 1.55)
      : THREE.MathUtils.clamp(currentX, -FOOTBALL_FIELD_HALF_WIDTH + 1.8, FOOTBALL_FIELD_HALF_WIDTH - 1.8);
    const entryZ = side * (FOOTBALL_FIELD_HALF_LENGTH - 0.42);
    const aligned = Math.abs(currentX - entryX) < 0.85 && Math.abs(currentZ - entryZ) < 0.82;
    return aligned ? null : { x: entryX, z: entryZ };
  }

  const side = Math.sign(currentX || 1);
  const entryX = side * (FOOTBALL_FIELD_HALF_WIDTH - 0.42);
  const entryZ = THREE.MathUtils.clamp(currentZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.8, FOOTBALL_FIELD_HALF_LENGTH - 1.8);
  const aligned = Math.abs(currentX - entryX) < 0.82 && Math.abs(currentZ - entryZ) < 0.9;
  return aligned ? null : { x: entryX, z: entryZ };
}

function segmentIntersectsCircle(ax, az, bx, bz, circle, padding) {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  const t = lenSq > 0.000001
    ? THREE.MathUtils.clamp(((circle.x - ax) * dx + (circle.z - az) * dz) / lenSq, 0, 1)
    : 0;
  const px = ax + dx * t;
  const pz = az + dz * t;
  const minDist = circle.r + padding;
  return (px - circle.x) ** 2 + (pz - circle.z) ** 2 <= minDist * minDist;
}

function segmentIntersectsObb(ax, az, bx, bz, collider, padding) {
  const sin = Math.sin(collider.yaw);
  const cos = Math.cos(collider.yaw);
  const startX = (ax - collider.x) * cos + (az - collider.z) * sin;
  const startZ = -(ax - collider.x) * sin + (az - collider.z) * cos;
  const dirX = (bx - ax) * cos + (bz - az) * sin;
  const dirZ = -(bx - ax) * sin + (bz - az) * cos;
  const halfX = collider.halfX + padding;
  const halfZ = collider.halfZ + padding;
  let tMin = 0;
  let tMax = 1;

  if (Math.abs(dirX) < 0.000001) {
    if (Math.abs(startX) > halfX) return false;
  } else {
    const invDirX = 1 / dirX;
    let tx1 = (-halfX - startX) * invDirX;
    let tx2 = (halfX - startX) * invDirX;
    if (tx1 > tx2) [tx1, tx2] = [tx2, tx1];
    tMin = Math.max(tMin, tx1);
    tMax = Math.min(tMax, tx2);
    if (tMin > tMax) return false;
  }

  if (Math.abs(dirZ) < 0.000001) {
    return Math.abs(startZ) <= halfZ;
  }

  const invDirZ = 1 / dirZ;
  let tz1 = (-halfZ - startZ) * invDirZ;
  let tz2 = (halfZ - startZ) * invDirZ;
  if (tz1 > tz2) [tz1, tz2] = [tz2, tz1];
  tMin = Math.max(tMin, tz1);
  tMax = Math.min(tMax, tz2);
  return tMin <= tMax;
}

function segmentIntersectsBlocker(ax, az, bx, bz, blocker, padding) {
  if (blocker.type === "circle") {
    return segmentIntersectsCircle(ax, az, bx, bz, blocker, padding);
  }
  return segmentIntersectsObb(ax, az, bx, bz, blocker, padding);
}

function getBlockerDistance(currentX, currentZ, blocker) {
  return Math.hypot(blocker.x - currentX, blocker.z - currentZ);
}

function getBlockerApproxRadius(blocker) {
  if (blocker.type === "circle") return blocker.r;
  return Math.max(blocker.halfX, blocker.halfZ);
}

function getPathDirection(currentX, currentZ, targetX, targetZ) {
  const dx = targetX - currentX;
  const dz = targetZ - currentZ;
  const dist = Math.hypot(dx, dz);
  if (dist <= 0.0001) {
    return { x: 0, z: 1 };
  }
  return { x: dx / dist, z: dz / dist };
}

function getPathFrameMetrics(currentX, currentZ, pointX, pointZ, pathDir) {
  const relX = pointX - currentX;
  const relZ = pointZ - currentZ;
  return {
    along: relX * pathDir.x + relZ * pathDir.z,
    lateral: relX * -pathDir.z + relZ * pathDir.x
  };
}

function pushDirectionalBypassCandidates(
  candidates,
  currentX,
  currentZ,
  targetX,
  targetZ,
  blocker,
  clearance,
  preferredSideSign = -1
) {
  const pathDir = getPathDirection(currentX, currentZ, targetX, targetZ);
  const leftX = -pathDir.z;
  const leftZ = pathDir.x;
  const blockerRadius = getBlockerApproxRadius(blocker);
  const lateral = clearance + blockerRadius + 0.24;
  const nearLead = Math.max(0.28, blockerRadius * 0.22 + 0.12);
  const farLead = Math.max(0.58, blockerRadius * 0.75 + 0.2);
  const sideSigns = preferredSideSign === 1 ? [1, -1] : [-1, 1];

  for (let i = 0; i < sideSigns.length; i += 1) {
    const sideSign = sideSigns[i];
    const sideX = leftX * sideSign;
    const sideZ = leftZ * sideSign;
    candidates.push({
      x: currentX + sideX * Math.max(0.55, lateral * 0.72) + pathDir.x * nearLead,
      z: currentZ + sideZ * Math.max(0.55, lateral * 0.72) + pathDir.z * nearLead,
      sideSign
    });
    candidates.push({
      x: blocker.x + sideX * lateral + pathDir.x * nearLead,
      z: blocker.z + sideZ * lateral + pathDir.z * nearLead,
      sideSign
    });
    candidates.push({
      x: blocker.x + sideX * lateral + pathDir.x * farLead,
      z: blocker.z + sideZ * lateral + pathDir.z * farLead,
      sideSign
    });
  }
}

function getDirectionalFollowThroughCandidate(
  currentX,
  currentZ,
  targetX,
  targetZ,
  blocker,
  clearance,
  sideSign = -1
) {
  const pathDir = getPathDirection(currentX, currentZ, targetX, targetZ);
  const leftX = -pathDir.z;
  const leftZ = pathDir.x;
  const blockerRadius = getBlockerApproxRadius(blocker);
  const lateral = clearance + blockerRadius + 0.28;
  const followLead = Math.max(1.05, blockerRadius * 1.55 + 0.4);
  const sideX = leftX * sideSign;
  const sideZ = leftZ * sideSign;
  return {
    x: blocker.x + sideX * lateral + pathDir.x * followLead,
    z: blocker.z + sideZ * lateral + pathDir.z * followLead,
    sideSign
  };
}

function pushSearchArcCandidates(
  candidates,
  currentX,
  currentZ,
  targetX,
  targetZ,
  blocker,
  clearance,
  preferredSideSign = -1,
  searchArcScale = 1
) {
  const pathDir = getPathDirection(currentX, currentZ, targetX, targetZ);
  const leftX = -pathDir.z;
  const leftZ = pathDir.x;
  const blockerRadius = getBlockerApproxRadius(blocker);
  const targetDist = Math.hypot(targetX - currentX, targetZ - currentZ);
  const sideSigns = preferredSideSign === 1 ? [1, -1] : [-1, 1];
  const baseLateral = (clearance + blockerRadius + 0.42) * Math.max(1, searchArcScale);
  const arcTiers = [
    { lateral: baseLateral * 1.1, forward: Math.max(0.9, blockerRadius * 0.85 + 0.5), rank: 1 },
    { lateral: baseLateral * 1.65, forward: Math.max(1.35, blockerRadius * 1.2 + 0.85), rank: 2 },
    { lateral: baseLateral * 2.2, forward: Math.max(1.9, Math.min(4.2, targetDist * 0.32 + blockerRadius * 1.35)), rank: 3 }
  ];
  if (blocker.dynamic || searchArcScale > 1.28) {
    arcTiers.push({
      lateral: baseLateral * 2.9,
      forward: Math.max(2.45, Math.min(5.8, targetDist * 0.46 + blockerRadius * 1.7)),
      rank: 4
    });
  }

  for (let i = 0; i < sideSigns.length; i += 1) {
    const sideSign = sideSigns[i];
    const sideX = leftX * sideSign;
    const sideZ = leftZ * sideSign;
    for (let j = 0; j < arcTiers.length; j += 1) {
      const tier = arcTiers[j];
      candidates.push({
        x: currentX + sideX * tier.lateral + pathDir.x * (tier.forward * 0.55),
        z: currentZ + sideZ * tier.lateral + pathDir.z * (tier.forward * 0.55),
        sideSign,
        searchRank: tier.rank
      });
      candidates.push({
        x: blocker.x + sideX * tier.lateral + pathDir.x * tier.forward,
        z: blocker.z + sideZ * tier.lateral + pathDir.z * tier.forward,
        sideSign,
        searchRank: tier.rank
      });
      candidates.push({
        x: targetX - pathDir.x * Math.max(0.7, tier.forward * 0.55) + sideX * tier.lateral,
        z: targetZ - pathDir.z * Math.max(0.7, tier.forward * 0.55) + sideZ * tier.lateral,
        sideSign,
        searchRank: tier.rank + 0.35
      });
    }
  }
}

function pushCircleCandidates(candidates, blocker, radius) {
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    candidates.push({
      x: blocker.x + Math.cos(angle) * radius,
      z: blocker.z + Math.sin(angle) * radius,
      sideSign: null
    });
  }
}

function pushObbCandidates(candidates, blocker, padding) {
  const sin = Math.sin(blocker.yaw);
  const cos = Math.cos(blocker.yaw);
  const halfX = blocker.halfX + padding;
  const halfZ = blocker.halfZ + padding;
  const localPoints = [
    { x: -halfX, z: -halfZ },
    { x: halfX, z: -halfZ },
    { x: -halfX, z: halfZ },
    { x: halfX, z: halfZ },
    { x: 0, z: -halfZ },
    { x: 0, z: halfZ },
    { x: -halfX, z: 0 },
    { x: halfX, z: 0 }
  ];
  for (let i = 0; i < localPoints.length; i += 1) {
    const point = localPoints[i];
    candidates.push({
      x: blocker.x + point.x * cos - point.z * sin,
      z: blocker.z + point.x * sin + point.z * cos,
      sideSign: null
    });
  }
}

function getBlockerCandidates(blocker, padding) {
  const candidates = [];
  if (blocker.type === "circle") {
    pushCircleCandidates(candidates, blocker, blocker.r + padding);
  } else {
    pushObbCandidates(candidates, blocker, padding);
  }
  return candidates;
}

function collectRouteBlockers(game, dynamicBlockers = []) {
  const blockers = [];
  const colliders = game?.colliders ?? [];
  for (let i = 0; i < colliders.length; i += 1) {
    const collider = colliders[i];
    if (collider.type !== "circle" && collider.type !== "obb") continue;
    blockers.push(collider);
  }
  for (let i = 0; i < dynamicBlockers.length; i += 1) {
    const blocker = dynamicBlockers[i];
    if (!Number.isFinite(blocker?.x) || !Number.isFinite(blocker?.z) || !Number.isFinite(blocker?.r)) continue;
    blockers.push({ type: "circle", x: blocker.x, z: blocker.z, r: blocker.r, dynamic: true });
  }
  return blockers;
}

function findBlockingBlocker(blockers, currentX, currentZ, targetX, targetZ, radius, staticPadding, dynamicPadding) {
  let blockingBlocker = null;
  let blockingDist = Infinity;
  for (let i = 0; i < blockers.length; i += 1) {
    const blocker = blockers[i];
    const padding = radius + (blocker.dynamic ? dynamicPadding : staticPadding);
    if (!segmentIntersectsBlocker(currentX, currentZ, targetX, targetZ, blocker, padding)) continue;
    const blockerDist = getBlockerDistance(currentX, currentZ, blocker);
    if (blockerDist < blockingDist) {
      blockingBlocker = blocker;
      blockingDist = blockerDist;
    }
  }
  return blockingBlocker;
}

function routeSegmentBlocked(blockers, ax, az, bx, bz, radius, staticPadding, dynamicPadding) {
  for (let i = 0; i < blockers.length; i += 1) {
    const blocker = blockers[i];
    const padding = radius + (blocker.dynamic ? dynamicPadding : staticPadding);
    if (segmentIntersectsBlocker(ax, az, bx, bz, blocker, padding)) {
      return true;
    }
  }
  return false;
}

function getMoverRouteRetryState(mover, desiredTargetX, desiredTargetZ, maxTargetShift) {
  const retryState = mover?.routeRetryState ?? null;
  if (!retryState || !mover) return null;
  const targetShift = Math.hypot(
    (retryState.targetX ?? desiredTargetX) - desiredTargetX,
    (retryState.targetZ ?? desiredTargetZ) - desiredTargetZ
  );
  if (targetShift > maxTargetShift * 1.15) {
    mover.routeRetryState = null;
    return null;
  }
  return retryState;
}

function clearMoverRouteState(mover) {
  if (!mover) return;
  mover.routeWaypoint = null;
  mover.routeRetryState = null;
}

function noteMoverRouteRetry(mover, desiredTargetX, desiredTargetZ, activeRoute, maxRetryCount = 4) {
  if (!mover || !activeRoute) return;
  const previousRetry = mover.routeRetryState ?? null;
  const sameTarget = previousRetry
    ? Math.hypot(
      (previousRetry.targetX ?? desiredTargetX) - desiredTargetX,
      (previousRetry.targetZ ?? desiredTargetZ) - desiredTargetZ
    ) < 1.05
    : false;
  mover.routeRetryState = {
    targetX: desiredTargetX,
    targetZ: desiredTargetZ,
    avoidX: activeRoute.x,
    avoidZ: activeRoute.z,
    preferredSideSign: (activeRoute.sideSign ?? previousRetry?.preferredSideSign ?? -1) * -1,
    retryCount: Math.min((sameTarget ? previousRetry.retryCount ?? 0 : 0) + 1, maxRetryCount)
  };
}

function activeRouteIsStalled(activeRoute, currentX, currentZ, routeDist, waypointReachDist, stallOptions = {}) {
  if (!activeRoute) return false;
  const stallMoveThreshold = stallOptions.stallMoveThreshold ?? 0.02;
  const stallProgressThreshold = stallOptions.stallProgressThreshold ?? 0.012;
  const recoverMoveThreshold = stallOptions.recoverMoveThreshold ?? 0.06;
  const recoverProgressThreshold = stallOptions.recoverProgressThreshold ?? 0.055;
  const stallFrameLimit = stallOptions.stallFrameLimit ?? 16;
  const lastX = activeRoute.lastX ?? currentX;
  const lastZ = activeRoute.lastZ ?? currentZ;
  const lastRouteDist = activeRoute.lastRouteDist ?? routeDist;
  const movedDist = Math.hypot(currentX - lastX, currentZ - lastZ);
  const progressDist = lastRouteDist - routeDist;
  const stalledNow = routeDist > waypointReachDist * 0.95
    && movedDist < stallMoveThreshold
    && progressDist < stallProgressThreshold;
  const recovering = progressDist > recoverProgressThreshold || movedDist > recoverMoveThreshold;
  const nextStallFrames = stalledNow
    ? (activeRoute.stallFrames ?? 0) + 1
    : recovering
      ? 0
      : Math.max(0, (activeRoute.stallFrames ?? 0) - 1);
  activeRoute.lastX = currentX;
  activeRoute.lastZ = currentZ;
  activeRoute.lastRouteDist = routeDist;
  activeRoute.stallFrames = nextStallFrames;
  return nextStallFrames >= stallFrameLimit;
}

export function getFootballRouteTargetRuntime(game, mover, currentX, currentZ, targetX, targetZ, options = {}) {
  const radius = options.radius ?? 0.7;
  const staticPadding = options.staticPadding ?? 0.2;
  const dynamicPadding = options.dynamicPadding ?? 0.16;
  const waypointReachDist = options.waypointReachDist ?? Math.max(0.52, radius + 0.18);
  const maxTargetShift = options.maxTargetShift ?? 1.45;
  const dynamicBlockers = options.dynamicBlockers ?? [];
  const searchMode = options.searchMode ?? "default";
  const searchArcScale = options.searchArcScale ?? 1;
  const stallFrameLimit = options.stallFrameLimit ?? 16;
  const stallMoveThreshold = options.stallMoveThreshold ?? 0.02;
  const stallProgressThreshold = options.stallProgressThreshold ?? 0.012;
  const recoverMoveThreshold = options.recoverMoveThreshold ?? 0.06;
  const recoverProgressThreshold = options.recoverProgressThreshold ?? 0.055;
  const maxRetryCount = options.maxRetryCount ?? 4;
  const useGoalSpecialTargets = options.useGoalSpecialTargets ?? true;
  const useFieldBoundaryTargets = options.useFieldBoundaryTargets ?? true;
  const goalPocketDepthOffset = options.goalPocketDepthOffset ?? Math.max(0.58, radius * 0.22);
  const goalPocketFrontBuffer = options.goalPocketFrontBuffer ?? 0;
  const goalPocketTarget = useGoalSpecialTargets
    ? isInsideFootballGoalPocket(targetX, targetZ, radius, goalPocketDepthOffset, goalPocketFrontBuffer)
    : false;
  const goalStructuredTarget = useGoalSpecialTargets
    ? getFootballGoalStructuredRouteTarget(
        currentX,
        currentZ,
        targetX,
        targetZ,
        radius,
        goalPocketDepthOffset,
        goalPocketFrontBuffer
      )
    : null;
  const goalEntryTarget = useGoalSpecialTargets
    ? getFootballGoalPocketEntryTarget(
        currentX,
        currentZ,
        targetX,
        targetZ,
        radius,
        goalPocketDepthOffset,
        goalPocketFrontBuffer
      )
    : null;
  const goalBehindReentryTarget = useGoalSpecialTargets
    ? getFootballGoalBehindReentryTarget(currentX, currentZ, targetX, targetZ, radius)
    : null;
  const goalBehindBypassTarget = !useGoalSpecialTargets || goalPocketTarget || goalStructuredTarget || goalBehindReentryTarget || goalEntryTarget
    ? null
    : getFootballGoalBehindBypassTarget(currentX, currentZ, targetX, targetZ, radius);
  const outsideFieldApproachTarget = !useFieldBoundaryTargets || goalPocketTarget || goalStructuredTarget || goalBehindReentryTarget || goalEntryTarget || goalBehindBypassTarget
    ? null
    : getFootballOutsideFieldApproachTarget(currentX, currentZ, targetX, targetZ);
  const fieldReentryTarget = !useFieldBoundaryTargets || goalPocketTarget || goalStructuredTarget || goalBehindReentryTarget || goalEntryTarget || goalBehindBypassTarget || outsideFieldApproachTarget
    ? null
    : getFootballFieldReentryTarget(currentX, currentZ, targetX, targetZ);
  const desiredTargetX = goalStructuredTarget?.x
    ?? goalBehindReentryTarget?.x
    ?? goalEntryTarget?.x
    ?? goalBehindBypassTarget?.x
    ?? outsideFieldApproachTarget?.x
    ?? fieldReentryTarget?.x
    ?? targetX;
  const desiredTargetZ = goalStructuredTarget?.z
    ?? goalBehindReentryTarget?.z
    ?? goalEntryTarget?.z
    ?? goalBehindBypassTarget?.z
    ?? outsideFieldApproachTarget?.z
    ?? fieldReentryTarget?.z
    ?? targetZ;
  const blockers = collectRouteBlockers(game, dynamicBlockers);
  const activeRoute = mover?.routeWaypoint ?? null;
  const retryState = getMoverRouteRetryState(mover, desiredTargetX, desiredTargetZ, maxTargetShift);
  const preferredSideSign = retryState?.preferredSideSign ?? -1;

  if (activeRoute) {
    const targetShift = Math.hypot((activeRoute.targetX ?? desiredTargetX) - desiredTargetX, (activeRoute.targetZ ?? desiredTargetZ) - desiredTargetZ);
    const routeDist = Math.hypot(activeRoute.x - currentX, activeRoute.z - currentZ);
    const directBlocked = Boolean(findBlockingBlocker(blockers, currentX, currentZ, desiredTargetX, desiredTargetZ, radius, staticPadding, dynamicPadding));
    const routeStalled = directBlocked
      ? activeRouteIsStalled(activeRoute, currentX, currentZ, routeDist, waypointReachDist, {
          stallFrameLimit,
          stallMoveThreshold,
          stallProgressThreshold,
          recoverMoveThreshold,
          recoverProgressThreshold
        })
      : false;
    if (routeStalled) {
      noteMoverRouteRetry(mover, desiredTargetX, desiredTargetZ, activeRoute, maxRetryCount);
      if (mover) mover.routeWaypoint = null;
    } else
    if (targetShift < maxTargetShift && directBlocked) {
      if (routeDist > waypointReachDist) {
        return { x: activeRoute.x, z: activeRoute.z };
      }
      if (
        Number.isFinite(activeRoute.followX)
        && Number.isFinite(activeRoute.followZ)
        && !activeRoute.followActive
      ) {
        activeRoute.x = activeRoute.followX;
        activeRoute.z = activeRoute.followZ;
        activeRoute.followActive = true;
        activeRoute.lastX = currentX;
        activeRoute.lastZ = currentZ;
        activeRoute.lastRouteDist = Math.hypot(activeRoute.x - currentX, activeRoute.z - currentZ);
        activeRoute.stallFrames = 0;
        return { x: activeRoute.x, z: activeRoute.z };
      }
    }
    if (mover?.routeWaypoint) {
      clearMoverRouteState(mover);
    }
  }

  const blockingBlocker = findBlockingBlocker(blockers, currentX, currentZ, desiredTargetX, desiredTargetZ, radius, staticPadding, dynamicPadding);
  if (!blockingBlocker) {
    clearMoverRouteState(mover);
    return { x: desiredTargetX, z: desiredTargetZ };
  }

  const candidatePadding = radius + (blockingBlocker.dynamic ? dynamicPadding : staticPadding) + 0.18;
  const candidates = [];
  pushDirectionalBypassCandidates(
    candidates,
    currentX,
    currentZ,
    desiredTargetX,
    desiredTargetZ,
    blockingBlocker,
    candidatePadding,
    preferredSideSign
  );
  if (searchMode !== "default" || (retryState?.retryCount ?? 0) > 0) {
    const dynamicSearchBoost = blockingBlocker.dynamic ? 1.22 : 1;
    const retrySearchBoost = 1 + Math.min(retryState?.retryCount ?? 0, maxRetryCount) * 0.24;
    pushSearchArcCandidates(
      candidates,
      currentX,
      currentZ,
      desiredTargetX,
      desiredTargetZ,
      blockingBlocker,
      candidatePadding,
      preferredSideSign,
      searchArcScale * (searchMode === "seek" ? 1.12 : 1) * dynamicSearchBoost * retrySearchBoost
    );
  }
  candidates.push(...getBlockerCandidates(blockingBlocker, candidatePadding));
  let bestCandidate = null;
  let bestScore = Infinity;
  const pathDir = getPathDirection(currentX, currentZ, desiredTargetX, desiredTargetZ);
  const blockerFrame = getPathFrameMetrics(currentX, currentZ, blockingBlocker.x, blockingBlocker.z, pathDir);
  const blockerRadius = getBlockerApproxRadius(blockingBlocker) + candidatePadding;

  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const leg1 = Math.hypot(candidate.x - currentX, candidate.z - currentZ);
    const leg2 = Math.hypot(desiredTargetX - candidate.x, desiredTargetZ - candidate.z);
    if (leg1 < 0.12) continue;
    const firstBlocked = routeSegmentBlocked(blockers, currentX, currentZ, candidate.x, candidate.z, radius, staticPadding, dynamicPadding);
    const secondBlocked = routeSegmentBlocked(blockers, candidate.x, candidate.z, desiredTargetX, desiredTargetZ, radius, staticPadding, dynamicPadding);
    const candidateFrame = getPathFrameMetrics(currentX, currentZ, candidate.x, candidate.z, pathDir);
    const retryPenalty = retryState
      ? THREE.MathUtils.clamp(1.35 - Math.hypot(candidate.x - retryState.avoidX, candidate.z - retryState.avoidZ), 0, 1.35)
        * (8.5 + (retryState.retryCount ?? 0) * 3.4)
      : 0;
    const sidePenalty = candidate.sideSign == null || candidate.sideSign === preferredSideSign
      ? 0
      : (retryState?.retryCount ?? 0) > 0 ? 0.22 : 0.85;
    const searchPenalty = (candidate.searchRank ?? 0) * ((retryState?.retryCount ?? 0) > 0 ? 0.04 : 0.32);
    const shortBypassPenalty = blockingBlocker.dynamic
      ? THREE.MathUtils.clamp(blockerFrame.along + blockerRadius * 0.34 - candidateFrame.along, 0, blockerRadius + 1.2) * 4.8
      : 0;
    const narrowBypassPenalty = blockingBlocker.dynamic
      ? THREE.MathUtils.clamp(blockerRadius * 0.92 - Math.abs(candidateFrame.lateral - blockerFrame.lateral), 0, blockerRadius) * 3.2
      : 0;
    const score = leg1
      + leg2
      + retryPenalty
      + sidePenalty
      + searchPenalty
      + shortBypassPenalty
      + narrowBypassPenalty
      + (firstBlocked ? 9 : 0)
      + (secondBlocked ? 5 : 0);
    if (score < bestScore) {
      bestScore = score;
      bestCandidate = candidate;
    }
  }

  if (!bestCandidate) {
    clearMoverRouteState(mover);
    return { x: desiredTargetX, z: desiredTargetZ };
  }

  const followCandidate = bestCandidate.sideSign == null
    ? null
    : getDirectionalFollowThroughCandidate(
        currentX,
        currentZ,
        desiredTargetX,
        desiredTargetZ,
        blockingBlocker,
        candidatePadding,
        bestCandidate.sideSign
      );

  if (mover) {
    mover.routeWaypoint = {
      x: bestCandidate.x,
      z: bestCandidate.z,
      targetX: desiredTargetX,
      targetZ: desiredTargetZ,
      sideSign: bestCandidate.sideSign ?? preferredSideSign,
      followX: followCandidate?.x ?? null,
      followZ: followCandidate?.z ?? null,
      followActive: false,
      lastX: currentX,
      lastZ: currentZ,
      lastRouteDist: Math.hypot(bestCandidate.x - currentX, bestCandidate.z - currentZ),
      stallFrames: 0
    };
  }
  return bestCandidate;
}
