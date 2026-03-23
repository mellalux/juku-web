import * as THREE from "./three.js";
import {
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_WIDTH
} from "./game-config.js";

const FOOTBALL_PASS_TARGET_RESULT = {
  dist: 0,
  forcedForward: false,
  forward: 0,
  frontBlockerRisk: 0,
  goalGain: 0,
  interceptRisk: 0,
  laneTraffic: 0,
  leadTime: 0.42,
  player: null,
  progressive: false,
  score: 0,
  targetDepth: 0,
  throughRun: false
};

const FOOTBALL_THIRD_MAN_SUPPORT_RESULT = {
  player: null,
  targetX: 0,
  targetZ: 0
};

const FOOTBALL_CROSS_TARGET_RESULT = {
  dist: 0,
  player: null,
  score: 0
};

const FOOTBALL_CLEARANCE_TARGET_RESULT = {
  dist: 0,
  player: null,
  power: 0,
  pressureSide: 0,
  score: 0,
  type: "channel",
  x: 0,
  z: 0
};

export function findBestPassTargetAI(carrier, teammates, opponents, footballBehavior) {
  let bestTarget = null;
  let bestScore = -Infinity;
  let bestDistance = 0;
  let bestGoalGain = -Infinity;
  let bestLaneTraffic = 0;
  let bestInterceptRisk = 0;
  let bestFrontBlockerRisk = 0;
  let bestProgressiveTarget = null;
  let bestProgressiveScore = -Infinity;
  let bestProgressiveDistance = 0;
  let bestProgressiveGoalGain = -Infinity;
  let bestProgressiveLaneTraffic = 0;
  let bestProgressiveInterceptRisk = 0;
  let bestProgressiveFrontBlockerRisk = 0;
  let bestFreeForwardAttacker = null;
  let bestFreeForwardScore = -Infinity;
  let bestFreeForwardDistance = 0;
  let bestFreeForwardLaneTraffic = 0;
  let bestFreeForwardInterceptRisk = 0;
  let bestFreeForwardFrontBlockerRisk = 0;
  const ownGoalDepth = -carrier.runner.root.position.z * carrier.team;
  const escapeBias = THREE.MathUtils.clamp((ownGoalDepth - (FOOTBALL_FIELD_HALF_LENGTH - 7.2)) / 3.4, 0, 1.55);
  const ownThirdTrapBias = THREE.MathUtils.clamp((ownGoalDepth - (FOOTBALL_FIELD_HALF_LENGTH - 7.9)) / 2.8, 0, 1.5);

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const runLaneBias = THREE.MathUtils.clamp((mate.goalRunTimer ?? 0) / 1.8, 0, 1.3);
    const leadTime = 0.42 + runLaneBias * 0.24;
    const runTargetX = mate.goalRunTimer > 0 ? (mate.goalRunTargetX ?? mate.runner.root.position.x) : mate.runner.root.position.x;
    const runTargetZ = mate.goalRunTimer > 0 ? (mate.goalRunTargetZ ?? mate.runner.root.position.z) : mate.runner.root.position.z;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime + (runTargetX - mate.runner.root.position.x) * runLaneBias * 0.52;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + (runTargetZ - mate.runner.root.position.z) * runLaneBias * 0.58;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.6 || dist > 10.8) continue;

    const forward = dz * carrier.team;
    const attackDepth = carrier.runner.root.position.z * carrier.team;
    const targetAttackDepth = targetZ * carrier.team;
    const goalGain = targetAttackDepth - attackDepth;
    const finalThirdBias = THREE.MathUtils.clamp((attackDepth - 1.6) / 5.8, 0, 1.35);
    if (escapeBias > 0.32 && forward < 0.35 && dist < 4.8) continue;
    if (attackDepth > -1.2 && forward < 0.05 && dist < 6.4) continue;
    if (mate.role === "attacker" && forward < 0.32 && dist < 7.2) continue;
    let nearestOpponent = 99;
    let laneTraffic = 0;
    let interceptRisk = 0;
    let frontBlockerRisk = 0;
    let laneGuardCount = 0;
    let directLaneBlock = false;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      const odx = targetX - opp.runner.root.position.x;
      const odz = targetZ - opp.runner.root.position.z;
      nearestOpponent = Math.min(nearestOpponent, Math.hypot(odx, odz));

      const toOppX = opp.runner.root.position.x - carrier.runner.root.position.x;
      const toOppZ = opp.runner.root.position.z - carrier.runner.root.position.z;
      const along = THREE.MathUtils.clamp((toOppX * dx + toOppZ * dz) / Math.max(0.001, dist * dist), 0, 1);
      const projX = carrier.runner.root.position.x + dx * along;
      const projZ = carrier.runner.root.position.z + dz * along;
      const laneDist = Math.hypot(opp.runner.root.position.x - projX, opp.runner.root.position.z - projZ);
      if (laneDist < 1.15) laneTraffic += (1.15 - laneDist) * (1.18 - along * 0.4);
      if (along > 0.12 && along < 0.92 && laneDist < 0.82) interceptRisk += (0.82 - laneDist) * 1.6;
      if (forward > 0.2 && along > 0.18 && along < 0.88 && laneDist < 0.58) {
        frontBlockerRisk += (0.58 - laneDist) * (1.05 - Math.abs(along - 0.52) * 0.8) * 2.4;
      }
      if (along > 0.14 && along < 0.9 && laneDist < 1.02) laneGuardCount += 1;
      if (forward > 0.35 && along > 0.22 && along < 0.82 && laneDist < 0.34) directLaneBlock = true;
    }

    if (directLaneBlock && forward > 0.45) continue;
    const severeLaneRisk = interceptRisk > 0.44 || frontBlockerRisk > 0.24 || (laneTraffic > 0.88 && forward > 0.35);
    if (severeLaneRisk && !(mate.role === "attacker" && nearestOpponent > 1.9 && goalGain > 0.8)) continue;

    const openness = THREE.MathUtils.clamp((nearestOpponent - 0.9) / 3.3, 0, 1.35);
    const longPassBias = THREE.MathUtils.clamp((dist - 2.4) / 5.8, 0, 1.55);
    const switchBias = THREE.MathUtils.clamp(Math.abs(dx) / 5.4, 0, 1.1);
    const throughBias = THREE.MathUtils.clamp(forward / 5.8, -0.2, 1.4);
    const oneTwoReturnBias = carrier.oneTwoReturnTimer > 0 && carrier.oneTwoReturnTarget === mate ? 1 : 0;
    const roleBias = mate.role === "attacker" ? 0.9 : mate.role === "defender" ? 0.38 : 0;
    const profileBias = mate.attackerProfile === "runner" ? 0.34 : mate.attackerProfile === "poacher" ? 0.22 : mate.attackerProfile === "playmaker" ? -0.08 : 0;
    const supportRoleBias = mate.attackLane === "link" ? 0.82 : mate.attackLane === "support" ? 0.64 : mate.attackLane === "boxEdge" ? 0.38 : 0;
    const carrierPlaymakerBias = carrier.attackerProfile === "playmaker" ? 1 : 0;
    const carrierRunnerBias = carrier.attackerProfile === "runner" ? 1 : 0;
    const counterBias = mate.counterRunBoost ?? 0;
    const laneRoleBias = mate.attackLane === "farPost" ? 1.12 : mate.attackLane === "poach" ? 1.04 : mate.attackLane === "boxEdge" ? 0.76 : mate.attackLane === "overlap" ? 0.92 : mate.attackLane === "underlap" ? 0.72 : mate.attackLane === "link" ? 0.34 : mate.attackLane === "press" ? 0.18 : 0;
    const overlapBias = mate.attackLane === "overlap" ? switchBias * 1.2 + openness * 0.34 : 0;
    const underlapBias = mate.attackLane === "underlap" ? throughBias * 1.05 + openness * 0.2 : 0;
    const poachBias = mate.attackLane === "poach" ? throughBias * 0.4 + openness * 0.28 : 0;
    const farPostBias = mate.attackLane === "farPost" ? switchBias * 0.52 + openness * 0.36 : 0;
    const edgeBias = mate.attackLane === "boxEdge" ? openness * 0.28 + longPassBias * 0.22 : 0;
    const switchPlayBias = carrierPlaymakerBias * switchBias * (mate.attackLane === "farPost" || mate.attackLane === "overlap" ? 1.15 : 0.72);
    const diagonalSplitBias = carrierPlaymakerBias * Math.max(0, throughBias) * Math.min(1.2, Math.abs(dx) / 2.8) * (mate.attackerProfile === "runner" ? 1.2 : mate.attackLane === "underlap" ? 1 : 0.45);
    const diagonalProgressBias = Math.max(0, throughBias) * THREE.MathUtils.clamp((Math.abs(dx) - 0.7) / 3.9, 0, 1.2) * (mate.role === "attacker" ? 1.12 : mate.attackLane === "overlap" || mate.attackLane === "underlap" ? 0.92 : 0.54);
    const runnerFeedBias = carrierRunnerBias * Math.max(0, throughBias) * (mate.attackerProfile === "runner" ? 0.42 : 0.16);
    const attackDepthBias = finalThirdBias * THREE.MathUtils.clamp((targetAttackDepth - attackDepth + 0.45) / 4.2, -0.25, 1.25);
    const goalHangBias = finalThirdBias * THREE.MathUtils.clamp((targetAttackDepth - (FOOTBALL_FIELD_HALF_LENGTH - 5.6)) / 3.4, 0, 1.15);
    const carrierWideServiceZone = Math.abs(carrier.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.78 && attackDepth > FOOTBALL_FIELD_HALF_LENGTH - 10.5;
    const centralBoxTarget = targetAttackDepth > FOOTBALL_FIELD_HALF_LENGTH - 7.2 && Math.abs(targetX) < FOOTBALL_GOAL_WIDTH * 0.68;
    const cutbackTarget = targetAttackDepth > FOOTBALL_FIELD_HALF_LENGTH - 8.8 && Math.abs(targetX) < Math.abs(carrier.runner.root.position.x) - 0.45;
    const boxServiceBias = carrierWideServiceZone
      ? (centralBoxTarget ? 1.45 : 0) + (cutbackTarget ? 1.1 : 0) + Math.max(0, throughBias) * 0.4 + openness * 0.35
      : 0;
    const progressiveBias = THREE.MathUtils.clamp((goalGain - 0.15) / 3.2, -0.2, 1.45);
    const directGoalBias = THREE.MathUtils.clamp((targetAttackDepth - (FOOTBALL_FIELD_HALF_LENGTH - 6.6)) / 3.2, 0, 1.3);
    const laneSafetyPenalty = laneTraffic * 0.92 + interceptRisk * 1.18 + frontBlockerRisk * 1.42 + laneGuardCount * 0.18;
    const breakRunBias = mate.goalRunTimer > 0
      ? (0.95 + Math.max(0, throughBias) * 0.85 + openness * 0.55 + directGoalBias * 0.6) * THREE.MathUtils.clamp(mate.breakRunBias ?? 1, 0.8, 1.6)
      : 0;
    const runLaneReward = mate.goalRunTimer > 0
      ? THREE.MathUtils.clamp((0.95 - laneTraffic) / 0.95, 0, 1.1) + THREE.MathUtils.clamp((0.72 - interceptRisk) / 0.72, 0, 0.9)
      : 0;
    const attackerGoalBias = mate.role === "attacker"
      ? progressiveBias * 1.25 + directGoalBias * 1.15 + Math.max(0, throughBias) * 0.55
      : progressiveBias * 0.36;
    const recyclePenalty = finalThirdBias * THREE.MathUtils.clamp((0.95 - forward) / 1.55, 0, 1.45) * THREE.MathUtils.clamp((6.2 - dist) / 3.9, 0, 1.24);
    const backwardPenalty = (0.45 + finalThirdBias) * THREE.MathUtils.clamp((-forward + 0.45) / 2.2, 0, 1.55);
    const nonProgressiveAttackerPenalty = mate.role === "attacker" ? finalThirdBias * THREE.MathUtils.clamp((0.45 - goalGain) / 1.6, 0, 1.3) : 0;
    const escapeForwardBias = escapeBias * THREE.MathUtils.clamp(forward / 4.9, -0.15, 1.35);
    const escapeLongBias = escapeBias * THREE.MathUtils.clamp((dist - 3.5) / 4.6, 0, 1.25);
    const deepRecyclePenalty = ownThirdTrapBias * THREE.MathUtils.clamp((1.05 - forward) / 1.45, 0, 1.3) * THREE.MathUtils.clamp((6.2 - dist) / 3.8, 0, 1.15);
    const deepDefenderLoopPenalty = ownThirdTrapBias
      * (carrier.role === "defender" && mate.role === "defender" ? 1 : 0)
      * THREE.MathUtils.clamp((5.8 - dist) / 3.2, 0, 1.2)
      * THREE.MathUtils.clamp((0.95 - forward) / 1.35, 0, 1.2);
    const ownThirdOutletBias = ownThirdTrapBias
      * (mate.role === "attacker" ? 1.45 : mate.role === "defender" ? 0.18 : 0.45)
      * THREE.MathUtils.clamp((goalGain + 0.2) / 3.6, -0.1, 1.25);
    const ownThirdSwitchBias = ownThirdTrapBias * switchBias * (mate.role === "attacker" ? 0.62 : 0.28);
    const combinationBias = (mate.goalRunTimer > 0 ? 0.72 : 0.18) + supportRoleBias + (openness > 0.45 && forward > 0.7 ? 0.28 : 0);
    const oneTwoBias = oneTwoReturnBias > 0 ? openness * 1.1 + Math.max(0, forward) * 0.8 + 2.8 : 0;
    const score = openness * 2.7 + longPassBias * 2.15 + throughBias * 2.45 + switchBias * 0.78 + roleBias + profileBias + counterBias + laneRoleBias + overlapBias + underlapBias + poachBias + farPostBias + edgeBias + switchPlayBias + diagonalSplitBias + diagonalProgressBias + runnerFeedBias + combinationBias + oneTwoBias + boxServiceBias + attackDepthBias * 2.2 + goalHangBias * 1.7 + attackerGoalBias * 2.05 + breakRunBias * 1.8 + runLaneReward * 1.25 + escapeForwardBias * 2.45 + escapeLongBias * 1.85 + ownThirdOutletBias * 2.35 + ownThirdSwitchBias
      - recyclePenalty * (oneTwoReturnBias > 0 ? 1.35 : 2.8) - backwardPenalty * (oneTwoReturnBias > 0 ? 1.6 : 3.8) - nonProgressiveAttackerPenalty * 2.1 - deepRecyclePenalty * 2.8 - deepDefenderLoopPenalty * 3.2 - laneTraffic * (2.45 + escapeBias * 0.24) - interceptRisk * (2.65 + escapeBias * 0.2) - frontBlockerRisk * (oneTwoReturnBias > 0 ? 2.2 : 4.4) - laneGuardCount * 0.46 - laneSafetyPenalty
      + (carrier.passVision ?? 0) * (progressiveBias * 0.9 + openness * 0.55 + Math.max(0, goalGain) * 0.2);
    if (score > bestScore) {
      bestScore = score;
      bestTarget = mate;
      bestDistance = dist;
      bestGoalGain = goalGain;
      bestLaneTraffic = laneTraffic;
      bestInterceptRisk = interceptRisk;
      bestFrontBlockerRisk = frontBlockerRisk;
    }

    const isProgressiveTarget = forward > 0.55 && goalGain > 0.35;
    if (isProgressiveTarget) {
      const progressiveScore = score + progressiveBias * 1.4 + directGoalBias * 1.2 + (mate.role === "attacker" ? 1.35 : 0.35);
      if (progressiveScore > bestProgressiveScore) {
        bestProgressiveScore = progressiveScore;
        bestProgressiveTarget = mate;
        bestProgressiveDistance = dist;
        bestProgressiveGoalGain = goalGain;
        bestProgressiveLaneTraffic = laneTraffic;
        bestProgressiveInterceptRisk = interceptRisk;
        bestProgressiveFrontBlockerRisk = frontBlockerRisk;
      }
    }

    const freeForwardAttacker = mate.role === "attacker"
      && forward > 0.8
      && goalGain > 0.65
      && openness > 0.2 - runLaneBias * 0.08
      && nearestOpponent > 1.15 - runLaneBias * 0.14
      && laneTraffic < 0.45 + runLaneBias * 0.18
      && interceptRisk < 0.35 + runLaneBias * 0.16
      && frontBlockerRisk < 0.18
      && !directLaneBlock;
    if (freeForwardAttacker) {
      const freeForwardScore = score + progressiveBias * 1.8 + directGoalBias * 1.5 + openness * 0.9 + runLaneBias * 1.8;
      if (freeForwardScore > bestFreeForwardScore) {
        bestFreeForwardScore = freeForwardScore;
        bestFreeForwardAttacker = mate;
        bestFreeForwardDistance = dist;
        bestFreeForwardLaneTraffic = laneTraffic;
        bestFreeForwardInterceptRisk = interceptRisk;
        bestFreeForwardFrontBlockerRisk = frontBlockerRisk;
      }
    }
  }

  const useFreeForwardAttacker = bestFreeForwardAttacker
    && (!bestTarget || bestTarget === bestFreeForwardAttacker || bestTarget.role !== "attacker" || bestGoalGain < 0.55 || bestFreeForwardScore > bestScore - (0.55 - footballBehavior.progressiveChoiceBias));
  const useProgressiveTarget = !useFreeForwardAttacker && bestProgressiveTarget
    && (!bestTarget || bestTarget.role !== "attacker" || bestGoalGain < 0.3 || bestProgressiveGoalGain > bestGoalGain + 0.25 || bestProgressiveScore > bestScore - (0.2 + footballBehavior.progressiveChoiceBias));
  const selectedTarget = useFreeForwardAttacker ? bestFreeForwardAttacker : (useProgressiveTarget ? bestProgressiveTarget : bestTarget);
  const selectedDistance = useFreeForwardAttacker ? bestFreeForwardDistance : (useProgressiveTarget ? bestProgressiveDistance : bestDistance);
  const selectedScore = useFreeForwardAttacker ? bestFreeForwardScore : (useProgressiveTarget ? bestProgressiveScore : bestScore);
  const selectedLaneTraffic = useFreeForwardAttacker ? bestFreeForwardLaneTraffic : (useProgressiveTarget ? bestProgressiveLaneTraffic : bestLaneTraffic);
  const selectedInterceptRisk = useFreeForwardAttacker ? bestFreeForwardInterceptRisk : (useProgressiveTarget ? bestProgressiveInterceptRisk : bestInterceptRisk);
  const selectedFrontBlockerRisk = useFreeForwardAttacker ? bestFreeForwardFrontBlockerRisk : (useProgressiveTarget ? bestProgressiveFrontBlockerRisk : bestFrontBlockerRisk);

  if (selectedScore <= 1.45) {
    return null;
  }

  FOOTBALL_PASS_TARGET_RESULT.player = selectedTarget;
  FOOTBALL_PASS_TARGET_RESULT.dist = selectedDistance;
  FOOTBALL_PASS_TARGET_RESULT.score = selectedScore;
  FOOTBALL_PASS_TARGET_RESULT.forward = selectedTarget ? (selectedTarget.runner.root.position.z - carrier.runner.root.position.z) * carrier.team : 0;
  FOOTBALL_PASS_TARGET_RESULT.targetDepth = selectedTarget ? selectedTarget.runner.root.position.z * carrier.team : 0;
  FOOTBALL_PASS_TARGET_RESULT.goalGain = selectedTarget ? selectedTarget.runner.root.position.z * carrier.team - carrier.runner.root.position.z * carrier.team : 0;
  FOOTBALL_PASS_TARGET_RESULT.progressive = selectedTarget
    ? (((selectedTarget.runner.root.position.z - carrier.runner.root.position.z) * carrier.team) > 0.55
      && ((selectedTarget.runner.root.position.z * carrier.team) - (carrier.runner.root.position.z * carrier.team)) > 0.35)
    : false;
  FOOTBALL_PASS_TARGET_RESULT.forcedForward = selectedTarget ? selectedTarget === bestFreeForwardAttacker : false;
  FOOTBALL_PASS_TARGET_RESULT.throughRun = selectedTarget ? selectedTarget.role === "attacker" && (selectedTarget.goalRunTimer ?? 0) > 0.18 : false;
  FOOTBALL_PASS_TARGET_RESULT.leadTime = selectedTarget ? 0.42 + THREE.MathUtils.clamp((selectedTarget.goalRunTimer ?? 0) / 1.8, 0, 1.3) * 0.24 : 0.42;
  FOOTBALL_PASS_TARGET_RESULT.laneTraffic = selectedLaneTraffic;
  FOOTBALL_PASS_TARGET_RESULT.interceptRisk = selectedInterceptRisk;
  FOOTBALL_PASS_TARGET_RESULT.frontBlockerRisk = selectedFrontBlockerRisk;
  return FOOTBALL_PASS_TARGET_RESULT;
}

export function findThirdManSupportAI(carrier, receiver, teammates, opponents, attackGoalZ) {
  let best = null;
  let bestScore = -Infinity;

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate === receiver || mate.role === "keeper") continue;

    const targetDepth = mate.runner.root.position.z * carrier.team;
    const carrierDepth = carrier.runner.root.position.z * carrier.team;
    const receiverDepth = receiver.runner.root.position.z * carrier.team;
    const goalDistance = (attackGoalZ - mate.runner.root.position.z) * carrier.team;
    const forwardFromReceiver = (mate.runner.root.position.z - receiver.runner.root.position.z) * carrier.team;
    const spacingFromReceiver = Math.hypot(
      mate.runner.root.position.x - receiver.runner.root.position.x,
      mate.runner.root.position.z - receiver.runner.root.position.z
    );
    if (spacingFromReceiver < 1.8 || spacingFromReceiver > 8.8) continue;
    if (targetDepth < carrierDepth + 0.4) continue;

    let nearestOpponent = 99;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      nearestOpponent = Math.min(nearestOpponent, Math.hypot(mate.runner.root.position.x - opp.runner.root.position.x, mate.runner.root.position.z - opp.runner.root.position.z));
    }

    const openness = THREE.MathUtils.clamp((nearestOpponent - 0.95) / 3.1, 0, 1.25);
    const forwardBias = THREE.MathUtils.clamp((targetDepth - receiverDepth + 0.2) / 3.8, -0.1, 1.2);
    const boxBias = THREE.MathUtils.clamp((6.4 - goalDistance) / 3.8, -0.15, 1.2);
    const centralBias = THREE.MathUtils.clamp((4.8 - Math.abs(mate.runner.root.position.x)) / 4.4, 0, 1.05);
    const roleBias = mate.role === "attacker"
      ? 1.08
      : mate.attackLane === "farPost" || mate.attackLane === "poach"
        ? 0.92
        : mate.attackLane === "link" || mate.attackLane === "support"
          ? 0.74
          : 0.28;
    const triangleBias = THREE.MathUtils.clamp(Math.abs(mate.runner.root.position.x - carrier.runner.root.position.x) / 4.6, 0, 0.85);
    const score = openness * 2.2 + forwardBias * 1.8 + boxBias * 1.7 + centralBias * 1.1 + roleBias + triangleBias;
    if (score > bestScore && (forwardFromReceiver > 0.2 || boxBias > 0.35)) {
      bestScore = score;
      best = mate;
    }
  }

  if (!best || bestScore < 2.2) return null;

  const receiverSide = Math.sign(receiver.runner.root.position.x || carrier.runner.root.position.x || carrier.team);
  const lanePull = receiverSide === 0 ? 0 : -receiverSide * 0.9;
  FOOTBALL_THIRD_MAN_SUPPORT_RESULT.player = best;
  FOOTBALL_THIRD_MAN_SUPPORT_RESULT.targetX = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(best.runner.root.position.x, receiver.runner.root.position.x + lanePull, 0.34),
    -FOOTBALL_FIELD_HALF_WIDTH + 0.85,
    FOOTBALL_FIELD_HALF_WIDTH - 0.85
  );
  FOOTBALL_THIRD_MAN_SUPPORT_RESULT.targetZ = THREE.MathUtils.clamp(
    Math.max(best.runner.root.position.z * carrier.team, receiver.runner.root.position.z * carrier.team + 1.3) * carrier.team,
    -FOOTBALL_FIELD_HALF_LENGTH + 0.85,
    FOOTBALL_FIELD_HALF_LENGTH - 0.45
  );
  return FOOTBALL_THIRD_MAN_SUPPORT_RESULT;
}

export function findBestCrossTargetAI(carrier, teammates, opponents, attackGoalZ) {
  let bestTarget = null;
  let bestScore = -Infinity;
  let bestDistance = 0;

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const leadTime = 0.3;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + carrier.team * 0.12;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.4 || dist > 10.8) continue;

    const goalDistance = (attackGoalZ - targetZ) * carrier.team;
    const inBoxBias = THREE.MathUtils.clamp((4.8 - goalDistance) / 3.6, -0.2, 1.45);
    const roleBias = mate.attackLane === "farPost" ? 1.5 : mate.attackLane === "poach" ? 1.34 : mate.attackLane === "boxEdge" ? 0.98 : mate.role === "attacker" ? 1.15 : mate.attackLane === "underlap" ? 0.74 : mate.attackLane === "link" ? 0.42 : 0.18;
    const profileBias = mate.attackerProfile === "poacher" ? 0.46 : mate.attackerProfile === "runner" ? 0.22 : mate.attackerProfile === "playmaker" ? -0.12 : 0;
    const farPostBias = THREE.MathUtils.clamp((-Math.sign(carrier.runner.root.position.x || 1) * targetX + 0.8) / 2.8, 0, 1.2);
    const centralBias = THREE.MathUtils.clamp((3.6 - Math.abs(targetX)) / 3.2, 0, 1.1);

    let nearestOpponent = 99;
    let boxTraffic = 0;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      const od = Math.hypot(targetX - opp.runner.root.position.x, targetZ - opp.runner.root.position.z);
      nearestOpponent = Math.min(nearestOpponent, od);
      if (od < 1.3) boxTraffic += (1.3 - od) * 1.25;
    }

    const openness = THREE.MathUtils.clamp((nearestOpponent - 0.8) / 2.8, 0, 1.35);
    const carrierWideServiceZone = Math.abs(carrier.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.72
      && (attackGoalZ - carrier.runner.root.position.z) * carrier.team < 9.2;
    const directServiceBias = carrierWideServiceZone
      ? inBoxBias * 0.95 + centralBias * 0.72 + (goalDistance < 5.2 ? 0.42 : 0)
      : 0;
    const score = inBoxBias * 2.55 + farPostBias * 1.45 + centralBias * 0.9 + openness * 2.1 + roleBias + profileBias + directServiceBias - boxTraffic * 1.4;
    if (score > bestScore) {
      bestScore = score;
      bestTarget = mate;
      bestDistance = dist;
    }
  }

  if (bestScore <= 1.25) {
    return null;
  }

  FOOTBALL_CROSS_TARGET_RESULT.player = bestTarget;
  FOOTBALL_CROSS_TARGET_RESULT.dist = bestDistance;
  FOOTBALL_CROSS_TARGET_RESULT.score = bestScore;
  return FOOTBALL_CROSS_TARGET_RESULT;
}

export function findClearanceTargetAI(carrier, teammates, opponents) {
  const ownGoalDepth = -carrier.runner.root.position.z * carrier.team;
  const clearanceRadius = ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 7.4 ? 5.6 : 4.4;
  let leftPressure = 0;
  let rightPressure = 0;
  let centralPressure = 0;
  let nearestPressure = 99;

  for (let i = 0; i < opponents.length; i += 1) {
    const opp = opponents[i];
    if (opp.role === "keeper") continue;
    const relX = opp.runner.root.position.x - carrier.runner.root.position.x;
    const relZ = (opp.runner.root.position.z - carrier.runner.root.position.z) * carrier.team;
    const dist = Math.hypot(relX, relZ);
    nearestPressure = Math.min(nearestPressure, dist);
    if (relZ < -1.2 || relZ > clearanceRadius || Math.abs(relX) > FOOTBALL_FIELD_HALF_WIDTH * 0.72) continue;

    const pressure = (1.18 - THREE.MathUtils.clamp(dist / (clearanceRadius + 0.8), 0, 1.18)) * (1.08 - THREE.MathUtils.clamp(Math.abs(relX) / (FOOTBALL_FIELD_HALF_WIDTH * 0.68), 0, 0.82));
    if (Math.abs(relX) < 0.72) centralPressure += pressure * 1.18;
    else if (relX < 0) leftPressure += pressure;
    else rightPressure += pressure;
  }

  const pressureSide = rightPressure > leftPressure + 0.22 ? 1 : leftPressure > rightPressure + 0.22 ? -1 : 0;
  const clearanceSide = pressureSide !== 0
    ? -pressureSide
    : centralPressure > 0.55
      ? Math.sign(carrier.runner.root.position.x || carrier.laneBias || 1)
      : Math.sign(carrier.laneBias || carrier.runner.root.position.x || 1);
  let bestTargetPlayer = null;
  let bestTargetX = 0;
  let bestTargetZ = 0;
  let bestTargetDist = 0;
  let bestScore = -Infinity;

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const leadTime = 0.58;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + carrier.team * 0.26;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    const forward = dz * carrier.team;
    if (forward < 1.2 || dist < 3.4 || dist > 15.2) continue;

    let nearestOpponent = 99;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      if (opp.role === "keeper") continue;
      nearestOpponent = Math.min(nearestOpponent, Math.hypot(targetX - opp.runner.root.position.x, targetZ - opp.runner.root.position.z));
    }

    const openness = THREE.MathUtils.clamp((nearestOpponent - 1.0) / 3.8, 0, 1.25);
    const forwardBias = THREE.MathUtils.clamp(forward / 7.2, 0, 1.45);
    const longBias = THREE.MathUtils.clamp((dist - 3.8) / 6.6, 0, 1.3);
    const sideBias = THREE.MathUtils.clamp((targetX * clearanceSide + FOOTBALL_FIELD_HALF_WIDTH * 0.24) / (FOOTBALL_FIELD_HALF_WIDTH * 1.04), 0, 1.25);
    const roleBias = mate.role === "attacker" ? 0.72 : mate.attackLane === "overlap" || mate.attackLane === "farPost" ? 0.56 : 0.28;
    const score = openness * 2.2 + forwardBias * 2.65 + longBias * 1.55 + sideBias * 1.4 + roleBias;
    if (score > bestScore) {
      bestScore = score;
      bestTargetPlayer = mate;
      bestTargetX = targetX;
      bestTargetZ = targetZ;
      bestTargetDist = dist;
    }
  }

  if (bestTargetPlayer && bestScore > 2.55) {
    FOOTBALL_CLEARANCE_TARGET_RESULT.type = "player";
    FOOTBALL_CLEARANCE_TARGET_RESULT.player = bestTargetPlayer;
    FOOTBALL_CLEARANCE_TARGET_RESULT.x = bestTargetX;
    FOOTBALL_CLEARANCE_TARGET_RESULT.z = bestTargetZ;
    FOOTBALL_CLEARANCE_TARGET_RESULT.dist = bestTargetDist;
    FOOTBALL_CLEARANCE_TARGET_RESULT.score = bestScore;
    FOOTBALL_CLEARANCE_TARGET_RESULT.pressureSide = pressureSide;
    FOOTBALL_CLEARANCE_TARGET_RESULT.power = 3.55 + Math.min(2.6, bestTargetDist * 0.24);
    return FOOTBALL_CLEARANCE_TARGET_RESULT;
  }

  const laneTargetX = THREE.MathUtils.clamp(
    clearanceSide * (FOOTBALL_FIELD_HALF_WIDTH - 0.85) + (Math.random() - 0.5) * 0.7,
    -FOOTBALL_FIELD_HALF_WIDTH + 0.7,
    FOOTBALL_FIELD_HALF_WIDTH - 0.7
  );
  const laneTargetZ = THREE.MathUtils.clamp(
    carrier.runner.root.position.z + carrier.team * (7.1 + Math.min(2.2, ownGoalDepth * 0.08) + centralPressure * 0.7),
    -FOOTBALL_FIELD_HALF_LENGTH + 0.7,
    FOOTBALL_FIELD_HALF_LENGTH - 0.45
  );
  const laneDist = Math.hypot(laneTargetX - carrier.runner.root.position.x, laneTargetZ - carrier.runner.root.position.z);
  FOOTBALL_CLEARANCE_TARGET_RESULT.type = "channel";
  FOOTBALL_CLEARANCE_TARGET_RESULT.player = null;
  FOOTBALL_CLEARANCE_TARGET_RESULT.x = laneTargetX;
  FOOTBALL_CLEARANCE_TARGET_RESULT.z = laneTargetZ;
  FOOTBALL_CLEARANCE_TARGET_RESULT.dist = laneDist;
  FOOTBALL_CLEARANCE_TARGET_RESULT.score = 1.8 + centralPressure;
  FOOTBALL_CLEARANCE_TARGET_RESULT.pressureSide = pressureSide;
  FOOTBALL_CLEARANCE_TARGET_RESULT.power = 3.95 + Math.min(1.9, laneDist * 0.16);
  return FOOTBALL_CLEARANCE_TARGET_RESULT;
}

