import * as THREE from "./three.js";
import {
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_REFEREE_BALL_SAFE_RADIUS,
  FOOTBALL_REFEREE_LANE_SAFE_RADIUS
} from "./game-config.js";

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

export function getFootballRefereeTargetRuntime(game, { clampFootballRefereePosition }) {
  const coach = game.coach;
  const ball = game.ball;
  if (game.refRestart?.active) {
    const restart = game.refRestart;
    const target = restart.phase === "toBall"
      ? { x: restart.ballX, z: restart.ballZ }
      : restart.phase === "clear"
        ? { x: restart.clearX ?? restart.placeX, z: restart.clearZ ?? restart.placeZ }
      : { x: restart.placeX, z: restart.placeZ };
    coach.targetX = target.x;
    coach.targetZ = target.z;
    return target;
  }

  const attackSide = game.attackingTeam !== 0
    ? game.attackingTeam
    : Math.abs(game.ballVel.z) > 0.12
      ? Math.sign(game.ballVel.z || 1)
      : ball.position.z >= 0
        ? 1
        : -1;
  const lateralSide = Math.abs(ball.position.x) > 0.35 ? -Math.sign(ball.position.x) : (attackSide === 0 ? 1 : -attackSide);
  let targetX = ball.position.x * 0.38 + lateralSide * 2.9;
  let targetZ = ball.position.z - attackSide * 4.8;
  let attackingPlayerCount = 0;
  if (game.players.length > 0) {
    let sumX = 0;
    let deepestAttackZ = -Infinity;
    let supportLineZ = 0;
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      if (p.team !== attackSide || p.role === "keeper") continue;
      attackingPlayerCount += 1;
      sumX += p.runner.root.position.x;
      const attackDepth = p.runner.root.position.z * attackSide;
      deepestAttackZ = Math.max(deepestAttackZ, attackDepth);
      supportLineZ += attackDepth;
    }
    if (attackingPlayerCount > 0) {
      const attackMeanX = sumX / attackingPlayerCount;
      const attackMeanDepth = supportLineZ / attackingPlayerCount;
      const refereeDepth = Math.max(
        ball.position.z * attackSide - 4.8,
        attackMeanDepth - 3.2,
        deepestAttackZ - 5.1
      ) * attackSide;
      targetX = THREE.MathUtils.lerp(targetX, attackMeanX + lateralSide * 2.5, 0.34);
      targetZ = THREE.MathUtils.lerp(targetZ, refereeDepth, 0.62);
    }
  }
  targetX = THREE.MathUtils.lerp(targetX, ball.position.x * 0.22, THREE.MathUtils.clamp((Math.abs(ball.position.x) - FOOTBALL_FIELD_HALF_WIDTH * 0.58) / 3.2, 0, 0.45));
  targetZ = THREE.MathUtils.lerp(targetZ, ball.position.z - attackSide * 3.9, THREE.MathUtils.clamp((Math.abs(ball.position.z) - FOOTBALL_FIELD_HALF_LENGTH * 0.52) / 4.4, 0, 0.38));

  let pushX = 0;
  let pushZ = 0;
  const safeBallRadius = FOOTBALL_REFEREE_BALL_SAFE_RADIUS + Math.min(1.6, game.ballVel.length() * 0.18);
  const ballDx = targetX - ball.position.x;
  const ballDz = targetZ - ball.position.z;
  const ballDist = Math.hypot(ballDx, ballDz);
  if (ballDist < safeBallRadius) {
    const nx = ballDist > 0.001 ? ballDx / ballDist : lateralSide;
    const nz = ballDist > 0.001 ? ballDz / ballDist : -attackSide;
    const strength = safeBallRadius - ballDist;
    pushX += nx * strength;
    pushZ += nz * strength;
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
      const strength = (FOOTBALL_REFEREE_LANE_SAFE_RADIUS - laneOffset) * 1.6;
      pushX += sideNx * strength;
      pushZ += sideNz * strength;
    }
  }

  const attackGoalZ = attackSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const goalFrontDepth = (attackGoalZ - targetZ) * attackSide;
  const inGoalCorridor = goalFrontDepth >= 0 && goalFrontDepth < 8.2 && Math.abs(targetX) < FOOTBALL_GOAL_WIDTH * 0.92;
  if (inGoalCorridor) {
    const corridorSide = lateralSide === 0 ? 1 : lateralSide;
    const sideExit = corridorSide * (FOOTBALL_GOAL_WIDTH * 0.96 + 1.7);
    const depthExit = attackGoalZ - attackSide * 8.8;
    targetX = THREE.MathUtils.lerp(targetX, sideExit, 0.82);
    targetZ = THREE.MathUtils.lerp(targetZ, depthExit, 0.6);
  }

  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    const playDist = Math.hypot(p.runner.root.position.x - ball.position.x, p.runner.root.position.z - ball.position.z);
    const avoidRadius = playDist < 2.7 ? 1.9 : 1.15;
    const dx = targetX - p.runner.root.position.x;
    const dz = targetZ - p.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < avoidRadius) {
      const nx = dist > 0.001 ? dx / dist : Math.sign(targetX - ball.position.x || 1);
      const nz = dist > 0.001 ? dz / dist : Math.sign(targetZ - ball.position.z || -attackSide);
      const strength = (avoidRadius - dist) * (playDist < 2.7 ? 1.4 : 0.8);
      pushX += nx * strength;
      pushZ += nz * strength;
    }
  }

  let resolvedX = targetX + pushX;
  let resolvedZ = targetZ + pushZ;
  const resolvedGoalFrontDepth = (attackGoalZ - resolvedZ) * attackSide;
  if (resolvedGoalFrontDepth >= 0 && resolvedGoalFrontDepth < 7.6 && Math.abs(resolvedX) < FOOTBALL_GOAL_WIDTH * 0.86) {
    resolvedX = Math.sign(resolvedX || lateralSide || 1) * (FOOTBALL_GOAL_WIDTH * 0.9 + 1.5);
    resolvedZ = Math.min(resolvedZ * attackSide, (attackGoalZ - attackSide * 8.2) * attackSide) * attackSide;
  }

  const clamped = clampFootballRefereePosition(resolvedX, resolvedZ);
  coach.targetX = clamped.x;
  coach.targetZ = clamped.z;
  return clamped;
}

