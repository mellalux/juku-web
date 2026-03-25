import * as THREE from "./three.js";
import {
  ATHLETE_BALL_REACH,
  ARCADE_KEEPER_NERF,
  ARCADE_SCORING_BOOST,
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

// Heuristic scoring for ball-carrier decisions.
// This module decides what the next touch should be, but does not execute it.
const FOOTBALL_TOUCH_SUPPORT_COUNTS_RESULT = {
  advancedPassingOptions: 0,
  boxTargetsAhead: 0
};
const FOOTBALL_ACTION_DECISION_RESULT = {
  clearanceOption: null,
  contestEscapeDribble: false,
  escapeMode: false,
  finalShouldClear: false,
  finalShouldPass: false,
  hardEscapeMode: false,
  longShotBias: 0,
  longShotWindow: false,
  shouldCross: false,
  shouldPass: false,
  shouldShoot: false,
  shotHungerBias: 0,
  trappedWideCarrier: false
};

const FOOTBALL_SHOT_CONTEXT_RESULT = {
  crossSide: 0,
  dodgeGoalX: 0,
  dodgeShotDist: 0,
  dodgeShotDx: 0,
  finishType: null,
  goalDistance: 0,
  nearestPressure: 0,
  shotDist: 0,
  shotDx: 0,
  shotDz: 0,
  shotLaneNudge: 0,
  shotLanePenalty: 0
};

const FOOTBALL_SHOT_AIM_RESULT = {
  farPostX: 0,
  goalX: 0,
  keeper: null
};

// Count forward support around the carrier so the decision layer can tell
// isolated dribbles from situations where service into the box makes sense.
export function getFootballTouchSupportCounts(teammates, p, attackGoalZ, goalWidth) {
  let boxTargetsAhead = 0;
  let advancedPassingOptions = 0;
  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === p || mate.role === "keeper") continue;

    const mateZ = mate.runner.root.position.z;
    const mateX = mate.runner.root.position.x;
    if (
      (attackGoalZ - mateZ) * p.team < 7.6
      && mateZ * p.team > p.runner.root.position.z * p.team - 0.45
      && Math.abs(mateX) < goalWidth * 0.98
    ) {
      boxTargetsAhead += 1;
    }
    if (
      mateZ * p.team > p.runner.root.position.z * p.team + 0.6
      && Math.abs(mateX - p.runner.root.position.x) > 0.35
    ) {
      advancedPassingOptions += 1;
    }
  }
  FOOTBALL_TOUCH_SUPPORT_COUNTS_RESULT.advancedPassingOptions = advancedPassingOptions;
  FOOTBALL_TOUCH_SUPPORT_COUNTS_RESULT.boxTargetsAhead = boxTargetsAhead;
  return FOOTBALL_TOUCH_SUPPORT_COUNTS_RESULT;
}
export function getFootballActionDecisionRuntime(context) {
  const {
    FOOTBALL_BEHAVIOR,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_GOAL_WIDTH,
    advancedPassingOptions,
    attackerProfile,
    baseShotHunger,
    boxTargetsAhead,
    contestControlActive,
    cornerTrapZone,
    crowdedBoxService,
    crossOption,
    dodgeShotDist,
    findClearanceTarget,
    finishType,
    game,
    goalDistance,
    isCounterRunner,
    nearestPressure,
    opponents,
    ownGoalDepth,
    p,
    passOption,
    shotLanePenalty,
    tacticalRole,
    teamIsStalling,
    teammates,
    touchlineIsolation,
    wideCrossZone,
    wideServiceZone
  } = context;

  const isAttackMinded = tacticalRole === "attacker" || tacticalRole === "supportAttack" || isCounterRunner;
  const trappedNearOwnGoal = ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 6.1;
  const finalThirdUrgency = THREE.MathUtils.clamp((6.8 - goalDistance) / 4.6, 0, 1.35);
  const touchChainPressure = game.lastTouchTeam === p.team ? THREE.MathUtils.clamp((game.sameTeamTouchCount - 2) / 3.2, 0, 1.35) : 0;
  const ownThirdLoopPressure = trappedNearOwnGoal && game.lastTouchTeam === p.team
    ? THREE.MathUtils.clamp((game.sameTeamTouchCount - 2) / 2.1, 0, 1.7)
    : 0;
  const attackChoiceRoll = Math.random();
  const playmakerBias = attackerProfile === "playmaker" ? 0.24 : attackerProfile === "runner" ? -0.08 : attackerProfile === "poacher" ? -0.16 : 0;
  const dribbleTraitBias = p.trait === "dribble" ? THREE.MathUtils.clamp((1.7 - nearestPressure) * 0.2, 0, 0.18) : 0;
  const shotHungerBias = isAttackMinded ? THREE.MathUtils.clamp(baseShotHunger + finalThirdUrgency * 0.22 + touchChainPressure * 0.12 + (isCounterRunner ? 0.16 : 0) - playmakerBias - dribbleTraitBias, 0.28, 1.95) : THREE.MathUtils.clamp(baseShotHunger, 0.18, 1.2);
  const longShotTraitBias = p.trait === "finish" ? 0.18 : p.trait === "dribble" ? -0.06 : 0;
  const longShotProfileBias = attackerProfile === "poacher" ? 0.12 : attackerProfile === "runner" ? 0.05 : attackerProfile === "playmaker" ? -0.14 : 0;
  const longShotBias = longShotTraitBias + longShotProfileBias + (p.shotPowerBias ?? 0) * 0.35 + (p.shotAccuracyBias ?? 0) * 0.22;
  const selfishFinisher = shotHungerBias > 1.08;
  const forceDirectPlay = isAttackMinded && (finalThirdUrgency > 0.52 || touchChainPressure > 0.45 || isCounterRunner || selfishFinisher && goalDistance < 6.4);
  const recyclePass = passOption && passOption.forward < 0.75 && passOption.dist < 5.4;
  // Once the ball gets trapped near our own goal, defensive exit rules should
  // beat normal attacking ambition as early as possible.
  const escapeMode = teamIsStalling || (trappedNearOwnGoal && (nearestPressure < 2.2 || game.ballVel.length() < 1.35));
  const hardEscapeMode = trappedNearOwnGoal && (
    nearestPressure < 2.8
    || game.ballVel.length() < 1.8
    || ownThirdLoopPressure > 0.12
    || (game.ownGoalScrambleTimer ?? 0) > 0.02
  );
  const forceExitOwnGoal = hardEscapeMode && (
    game.sameTeamTouchCount >= 2
    || ownThirdLoopPressure > 0.22
    || nearestPressure < 1.9
    || (game.ownGoalScrambleTimer ?? 0) > 0.08
  );
  const passLaneBlocked = Boolean(passOption)
    && ((passOption.interceptRisk ?? 0) > 0.32 || (passOption.frontBlockerRisk ?? 0) > 0.16 || (passOption.laneTraffic ?? 0) > 0.62);
  const passSafetyGood = Boolean(passOption)
    && (passOption.interceptRisk ?? 0) < 0.24
    && (passOption.frontBlockerRisk ?? 0) < 0.12
    && (passOption.laneTraffic ?? 0) < 0.5;
  const clearanceOption = (escapeMode || hardEscapeMode) ? findClearanceTarget(p, teammates, opponents) : null;
  const shouldClear = clearanceOption && (nearestPressure < 2.35 || game.stallTimer > 1.1 || shotLanePenalty > 0.52 || forceExitOwnGoal);
  const forceWideService = !escapeMode
    && isAttackMinded
    && wideServiceZone
    && boxTargetsAhead > 0
    && (nearestPressure < 3.35 || crowdedBoxService);
  const longShotWindow = !escapeMode
    && isAttackMinded
    && finishType === null
    && goalDistance > 7.4
    && goalDistance < 16.8 + Math.max(0, longShotBias) * 2.2
    && dodgeShotDist < 15.2 + Math.max(0, longShotBias) * 1.7
    && shotLanePenalty < 0.82 + Math.max(0, longShotBias) * 0.18
    && nearestPressure > 0.72 + Math.min(0.24, goalDistance * 0.018) - Math.max(0, longShotBias) * 0.22
    && shotHungerBias > 0.68 - Math.max(0, longShotBias) * 0.14;
  const preferLongShotNow = longShotWindow ? attackChoiceRoll < 0.5 : false;
  const preferCloseAttackNow = !longShotWindow && goalDistance < 7.2 ? attackChoiceRoll >= 0.5 : false;
  const baseShouldShoot = !escapeMode && (finishType !== null || (longShotWindow && (preferLongShotNow || shotHungerBias > 0.98)) || (isAttackMinded && shotLanePenalty < 1.18 + finalThirdUrgency * 0.3 + shotHungerBias * 0.16 && (dodgeShotDist < 4.45 + finalThirdUrgency * 1.95 + touchChainPressure * 0.95 + shotHungerBias * 0.9 + (preferCloseAttackNow ? 0.45 : 0) || (dodgeShotDist < 6.7 + touchChainPressure * 0.6 + shotHungerBias * 0.5 && nearestPressure < 1.08 + finalThirdUrgency * 0.38 + shotHungerBias * 0.1) || (forceDirectPlay && goalDistance < 6.05 + shotHungerBias * 0.45 && shotLanePenalty < 1.46) || (selfishFinisher && goalDistance < 4.6 && shotLanePenalty < 1.58) || (isCounterRunner && dodgeShotDist < 7.4))));
  const shouldCross = !escapeMode
    && crossOption
    && isAttackMinded
    && (wideCrossZone || forceWideService || (cornerTrapZone && boxTargetsAhead > 0))
    && (p.attackLane === "overlap" || wideServiceZone || cornerTrapZone || Math.abs(game.ball.position.x) > FOOTBALL_GOAL_WIDTH * 1.15 || nearestPressure < 1.25)
    && (!baseShouldShoot || dodgeShotDist > 2.1 || forceWideService || cornerTrapZone);
  const longPassWindow = Boolean(passOption && !escapeMode && !shouldCross)
    && passOption.dist > FOOTBALL_BEHAVIOR.longPassDistMin
    && passOption.forward > FOOTBALL_BEHAVIOR.longPassForwardMin
    && passOption.score > FOOTBALL_BEHAVIOR.longPassScoreMin + ((passOption.interceptRisk ?? 0) > 0.18 ? 0.55 : 0);
  const mustBreakOwnThirdLoop = ownThirdLoopPressure > 0.28;
  const trappedWideCarrier = touchlineIsolation && (cornerTrapZone || nearestPressure < 3.25 || Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH * 0.82);
  const duelPressure = nearestPressure < 0.95;
  const throughRunPass = Boolean(passOption && passOption.throughRun && !escapeMode && !shouldCross)
    && (passOption.score > 4.15 || passOption.forcedForward || longPassWindow)
    && (goalDistance > 3.1 || finishType === null)
    && (!baseShouldShoot || dodgeShotDist > 3.6 || nearestPressure < 1.2 || shotLanePenalty > 0.62);
  const shouldShoot = baseShouldShoot
    && !throughRunPass
    && !forceWideService
    && !trappedWideCarrier
    && !(advancedPassingOptions >= 1 && passOption && passOption.score > FOOTBALL_BEHAVIOR.passScoreBase + 0.1 && goalDistance > 2.8)
    && !(passOption && passOption.progressive && passOption.score > 5.2 && passOption.forward > 1.1 && nearestPressure > 0.95);
  const shouldPass = passOption && !passLaneBlocked && (
    throughRunPass || longPassWindow || (
      !shouldClear
      && !longShotWindow
      && (escapeMode || (
        finishType === null
        && !shouldCross
        && (!isAttackMinded
          || passOption.progressive
          || passOption.goalGain > 0.65
          || passOption.dist > FOOTBALL_BEHAVIOR.passDistanceTriggerBase - Math.min(FOOTBALL_BEHAVIOR.passDistanceTriggerVariance, (shotHungerBias - 0.75) * 0.5)
          || dodgeShotDist > 5.15 + Math.min(0.65, shotHungerBias * 0.35)
          || nearestPressure < 1.14 - Math.min(0.12, (shotHungerBias - 0.7) * 0.08)
          || passOption.forward > (forceDirectPlay ? 1.05 + shotHungerBias * 0.1 : 0.28 + Math.min(0.3, shotHungerBias * 0.08))
          || passOption.targetDepth > FOOTBALL_FIELD_HALF_LENGTH - (5.15 + shotHungerBias * 0.55)
          || passOption.score > FOOTBALL_BEHAVIOR.passScoreBase + finalThirdUrgency * 0.3 + Math.max(0, shotHungerBias - 1.05) * 0.72 + (attackerProfile === "playmaker" ? 1.15 : 0.18) - Math.min(0.38, passOption.dist * FOOTBALL_BEHAVIOR.passScoreDistanceDiscount)
          || (crowdedBoxService && passOption.forward > 0.42)
          || shotLanePenalty > 1.02 + shotHungerBias * 0.08)
      ))
      && !(forceDirectPlay && recyclePass && !passOption.progressive && passOption.score < 5.85 + shotHungerBias * 0.35 - (attackerProfile === "playmaker" ? 0.5 : 0))
      && !(selfishFinisher && goalDistance < 5.35 && recyclePass && passOption.forward < 1.2 && !passOption.progressive)
    )
  );
  const discourageBackPass = Boolean(passOption)
    && !escapeMode
    && !hardEscapeMode
    && (
      passOption.forward < 0.52
      || passOption.goalGain < 0.28
      || (goalDistance < 12 && passOption.forward < 0.9 && !passOption.progressive)
    );
  const safeEscapePass = Boolean(passOption)
    && hardEscapeMode
    && passOption.progressive
    && passOption.forward > 1.55
    && (passOption.throughRun || passOption.dist > 5.8 || passOption.player?.role === "attacker");
  const antiSoloDribblePass = Boolean(passOption)
    && !passLaneBlocked
    && passSafetyGood
    && !escapeMode
    && !hardEscapeMode
    && !shouldCross
    && !shouldShoot
    && !discourageBackPass
    && isAttackMinded
    && (touchChainPressure > 0.15 || goalDistance < 10.5)
    && (passOption.progressive || passOption.forward > 0.9 || passOption.goalGain > 0.5)
    && passOption.score > FOOTBALL_BEHAVIOR.passScoreBase - 0.1;
  const closerTeammatePass = Boolean(passOption)
    && !passLaneBlocked
    && passSafetyGood
    && !escapeMode
    && !hardEscapeMode
    && !discourageBackPass
    && advancedPassingOptions >= 1
    && passOption.goalGain > 0.45
    && (passOption.progressive || passOption.player?.role === "attacker" || passOption.forward > 0.7)
    && passOption.score > FOOTBALL_BEHAVIOR.passScoreBase - 0.05;
  const quickCombinationPass = Boolean(passOption)
    && !passLaneBlocked
    && passSafetyGood
    && !escapeMode
    && !hardEscapeMode
    && !shouldCross
    && !shouldShoot
    && !discourageBackPass
    && (nearestPressure < 2.55 || touchChainPressure > 0.08 || isAttackMinded)
    && (passOption.progressive || passOption.forward > 0.3 || passOption.player?.role === "attacker")
    && passOption.score > FOOTBALL_BEHAVIOR.passScoreBase - 0.35;
  const duelEscapePass = Boolean(passOption)
    && !passLaneBlocked
    && passSafetyGood
    && duelPressure
    && !escapeMode
    && !hardEscapeMode
    && !discourageBackPass
    && (passOption.dist < 8.2)
    && (passOption.forward > 0.18 || passOption.player?.role === "attacker" || passOption.progressive);
  const forceWideReleasePass = Boolean(passOption)
    && !passLaneBlocked
    && ((passOption?.interceptRisk ?? 0) < 0.28)
    && ((passOption?.frontBlockerRisk ?? 0) < 0.16)
    && !escapeMode
    && !hardEscapeMode
    && !discourageBackPass
    && !shouldCross
    && !shouldShoot
    && isAttackMinded
    && (cornerTrapZone || (touchlineIsolation && nearestPressure < 3.1) || crowdedBoxService)
    && (passOption.progressive || passOption.forward > 0.45 || passOption.goalGain > 0.28)
    && passOption.score > FOOTBALL_BEHAVIOR.passScoreBase - 0.2;
  const forceCornerRelease = !escapeMode
    && !hardEscapeMode
    && isAttackMinded
    && trappedWideCarrier
    && (
      shouldCross
      || (Boolean(passOption)
        && !passLaneBlocked
        && ((passOption?.interceptRisk ?? 0) < 0.3)
        && ((passOption?.frontBlockerRisk ?? 0) < 0.18)
        && (passOption.progressive || passOption.forward > 0.38 || passOption.goalGain > 0.2))
    );
  const forceVerticalPass = shouldPass && passOption && mustBreakOwnThirdLoop
    && !(throughRunPass || longPassWindow)
    && (
      !passOption.progressive
      || passOption.forward < 1.2
      || passOption.player?.role !== "attacker"
    );
  // Collapse the large heuristic tree into a small action contract for the
  // execution layer, which should not need to know why an action won.
  const finalShouldPass = forceExitOwnGoal
    ? safeEscapePass
    : (
      forceCornerRelease && passOption && !shouldCross
        ? true
        : (
          forceVerticalPass
            ? false
            : (duelEscapePass || (shouldPass && !discourageBackPass) || closerTeammatePass || antiSoloDribblePass || quickCombinationPass || forceWideReleasePass || (forceWideService && Boolean(passOption) && passOption.forward > 0.42))
        )
    );
  const finalShouldClear = forceExitOwnGoal
    ? !safeEscapePass && Boolean(clearanceOption)
    : shouldClear || (mustBreakOwnThirdLoop && !throughRunPass && !longPassWindow && (!passOption || forceVerticalPass));
  const contestEscapeDribble = contestControlActive
    && !finalShouldPass
    && !shouldCross
    && !shouldShoot
    && nearestPressure < 1.4;

  FOOTBALL_ACTION_DECISION_RESULT.clearanceOption = clearanceOption;
  FOOTBALL_ACTION_DECISION_RESULT.contestEscapeDribble = contestEscapeDribble;
  FOOTBALL_ACTION_DECISION_RESULT.escapeMode = escapeMode;
  FOOTBALL_ACTION_DECISION_RESULT.finalShouldClear = finalShouldClear;
  FOOTBALL_ACTION_DECISION_RESULT.finalShouldPass = finalShouldPass;
  FOOTBALL_ACTION_DECISION_RESULT.hardEscapeMode = hardEscapeMode;
  FOOTBALL_ACTION_DECISION_RESULT.longShotBias = longShotBias;
  FOOTBALL_ACTION_DECISION_RESULT.longShotWindow = longShotWindow;
  FOOTBALL_ACTION_DECISION_RESULT.shouldCross = shouldCross;
  FOOTBALL_ACTION_DECISION_RESULT.shouldPass = shouldPass;
  FOOTBALL_ACTION_DECISION_RESULT.shouldShoot = shouldShoot;
  FOOTBALL_ACTION_DECISION_RESULT.shotHungerBias = shotHungerBias;
  FOOTBALL_ACTION_DECISION_RESULT.trappedWideCarrier = trappedWideCarrier;
  return FOOTBALL_ACTION_DECISION_RESULT;
}

// Evaluate how clean the current shot lane is and whether the incoming
// delivery creates a special one-touch finish such as a volley or tap-in.
export function getFootballShotContextRuntime(context) {
  const {
    FOOTBALL_GOAL_WIDTH,
    attackGoalZ,
    game,
    goalX,
    opponents,
    p
  } = context;

  const shotDx = goalX - game.ball.position.x;
  const shotDz = attackGoalZ - game.ball.position.z;
  const shotDist = Math.hypot(shotDx, shotDz);
  let nearestPressure = 99;
  let shotLanePenalty = 0;
  let shotLaneNudge = 0;
  const shotBaseDist = Math.max(0.001, Math.hypot(shotDx, shotDz));
  for (let j = 0; j < opponents.length; j += 1) {
    const opp = opponents[j];
    nearestPressure = Math.min(nearestPressure, Math.hypot(opp.runner.root.position.x - p.runner.root.position.x, opp.runner.root.position.z - p.runner.root.position.z));
    if (opp.role === "keeper") continue;
    const toOppX = opp.runner.root.position.x - game.ball.position.x;
    const toOppZ = opp.runner.root.position.z - game.ball.position.z;
    const along = THREE.MathUtils.clamp((toOppX * shotDx + toOppZ * shotDz) / Math.max(0.001, shotBaseDist * shotBaseDist), 0, 1);
    const projX = game.ball.position.x + shotDx * along;
    const projZ = game.ball.position.z + shotDz * along;
    const laneDist = Math.hypot(opp.runner.root.position.x - projX, opp.runner.root.position.z - projZ);
    if (along > 0.24 && along < 0.82 && laneDist < 0.62) {
      const influence = (0.62 - laneDist) * (0.92 - Math.abs(along - 0.5) * 0.9);
      shotLanePenalty += influence * 1.12;
      shotLaneNudge += -Math.sign(opp.runner.root.position.x - game.ball.position.x || 1) * influence * 0.22;
    }
  }
  const dodgeGoalX = THREE.MathUtils.clamp(goalX + shotLaneNudge, -FOOTBALL_GOAL_WIDTH * 0.44, FOOTBALL_GOAL_WIDTH * 0.44);
  const dodgeShotDx = dodgeGoalX - game.ball.position.x;
  const dodgeShotDist = Math.hypot(dodgeShotDx, shotDz);
  const goalDistance = (attackGoalZ - game.ball.position.z) * p.team;
  const receivingCross = game.deliveryType === "cross"
    && game.deliveryTeam === p.team
    && game.deliveryTimer > 0
    && game.deliverySource !== p
    && (!game.deliveryTarget || game.deliveryTarget === p);
  const finishZone = goalDistance < 3.35 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.08;
  const oneTouchFinish = receivingCross
    && finishZone
    && game.ballVel.length() > 1.55
    && (p.role === "attacker" || p.attackLane === "underlap" || p.attackLane === "link");
  const crossSide = Math.sign(game.ball.position.x || (game.deliverySource ? game.deliverySource.runner.root.position.x : 1));
  const receiverSide = Math.sign(p.runner.root.position.x || crossSide || 1);
  const backPostTapIn = oneTouchFinish && crossSide !== 0 && receiverSide === -crossSide && Math.abs(p.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.16;
  const nearPostTouch = oneTouchFinish && !backPostTapIn && crossSide !== 0 && receiverSide === crossSide && Math.abs(p.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.22;
  const volleyFinish = oneTouchFinish && !backPostTapIn && !nearPostTouch;
  const finishType = backPostTapIn ? "backPost" : nearPostTouch ? "nearPost" : volleyFinish ? "volley" : null;

  FOOTBALL_SHOT_CONTEXT_RESULT.crossSide = crossSide;
  FOOTBALL_SHOT_CONTEXT_RESULT.dodgeGoalX = dodgeGoalX;
  FOOTBALL_SHOT_CONTEXT_RESULT.dodgeShotDist = dodgeShotDist;
  FOOTBALL_SHOT_CONTEXT_RESULT.dodgeShotDx = dodgeShotDx;
  FOOTBALL_SHOT_CONTEXT_RESULT.finishType = finishType;
  FOOTBALL_SHOT_CONTEXT_RESULT.goalDistance = goalDistance;
  FOOTBALL_SHOT_CONTEXT_RESULT.nearestPressure = nearestPressure;
  FOOTBALL_SHOT_CONTEXT_RESULT.shotDist = shotDist;
  FOOTBALL_SHOT_CONTEXT_RESULT.shotDx = shotDx;
  FOOTBALL_SHOT_CONTEXT_RESULT.shotDz = shotDz;
  FOOTBALL_SHOT_CONTEXT_RESULT.shotLaneNudge = shotLaneNudge;
  FOOTBALL_SHOT_CONTEXT_RESULT.shotLanePenalty = shotLanePenalty;
  return FOOTBALL_SHOT_CONTEXT_RESULT;
}

// Start by aiming away from the keeper; later stages add lane nudges and
// finish-specific corrections on top of this base target.
export function getFootballShotAimRuntime(context) {
  const {
    FOOTBALL_GOAL_WIDTH,
    game,
    opponents
  } = context;

  let keeper = null;
  for (let i = 0; i < opponents.length; i += 1) {
    const opponent = opponents[i];
    if (opponent.role === "keeper") {
      keeper = opponent;
      break;
    }
  }
  const farPostX = keeper
    ? (game.ball.position.x <= keeper.runner.root.position.x ? FOOTBALL_GOAL_WIDTH * 0.41 : -FOOTBALL_GOAL_WIDTH * 0.41)
    : THREE.MathUtils.clamp(-game.ball.position.x * 0.28, -FOOTBALL_GOAL_WIDTH * 0.4, FOOTBALL_GOAL_WIDTH * 0.4);
  const goalX = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(-game.ball.position.x * 0.06, farPostX, Math.abs(game.ball.position.x) > 1.2 ? 0.82 : 0.68),
    -FOOTBALL_GOAL_WIDTH * 0.46,
    FOOTBALL_GOAL_WIDTH * 0.46
  );

  FOOTBALL_SHOT_AIM_RESULT.farPostX = farPostX;
  FOOTBALL_SHOT_AIM_RESULT.goalX = goalX;
  FOOTBALL_SHOT_AIM_RESULT.keeper = keeper;
  return FOOTBALL_SHOT_AIM_RESULT;
}
