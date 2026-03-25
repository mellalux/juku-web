import { ATHLETE_BALL_REACH } from "./game-config.js";
import {
  getFootballActionDecisionRuntime,
  getFootballShotAimRuntime,
  getFootballShotContextRuntime,
  getFootballTouchSupportCounts
} from "./football-touch-decision-runtime.js";
import {
  handleFootballClearanceRuntime,
  handleFootballControlStateRuntime,
  handleFootballCrossRuntime,
  handleFootballDribbleRuntime,
  handleFootballKeeperEmergencyClearRuntime,
  handleFootballPassRuntime,
  handleFootballShotRuntime
} from "./football-touch-execution-runtime.js";

const FOOTBALL_TOUCH_CONTEXT_RESULT = {
  canTouchBall: false,
  contestControlActive: false,
  nearestOpponentPressure: Infinity
};

function getNearestFootballOpponentPressure(opponents, p) {
  let best = Infinity;
  for (let i = 0; i < opponents.length; i += 1) {
    const opp = opponents[i];
    const dist = Math.hypot(
      opp.runner.root.position.x - p.runner.root.position.x,
      opp.runner.root.position.z - p.runner.root.position.z
    );
    if (dist < best) best = dist;
  }
  return best;
}

export function getFootballTouchContextRuntime(context) {
  const {
    activeBallPlayer,
    ballDist,
    game,
    isDeliveryTarget,
    kickoffLocked,
    opponents,
    p
  } = context;

  const touchReach = ATHLETE_BALL_REACH + (isDeliveryTarget ? 0.18 : 0);
  const canTouchBall = activeBallPlayer === p && ballDist < touchReach && p.kickCooldown <= 0 && !kickoffLocked;
  if (!canTouchBall) {
    FOOTBALL_TOUCH_CONTEXT_RESULT.canTouchBall = canTouchBall;
    FOOTBALL_TOUCH_CONTEXT_RESULT.contestControlActive = false;
    FOOTBALL_TOUCH_CONTEXT_RESULT.nearestOpponentPressure = Infinity;
    return FOOTBALL_TOUCH_CONTEXT_RESULT;
  }

  const nearestOpponentPressure = getNearestFootballOpponentPressure(opponents, p);
  const contestControlActive = (game.contestTouchTimer ?? 0) > 0.001
    && p.role !== "keeper"
    && nearestOpponentPressure < 1.72;

  FOOTBALL_TOUCH_CONTEXT_RESULT.canTouchBall = canTouchBall;
  FOOTBALL_TOUCH_CONTEXT_RESULT.contestControlActive = contestControlActive;
  FOOTBALL_TOUCH_CONTEXT_RESULT.nearestOpponentPressure = nearestOpponentPressure;
  return FOOTBALL_TOUCH_CONTEXT_RESULT;
}

export function handleFootballTouchRuntime(context) {
  const {
    ARCADE_SCORING_BOOST,
    FOOTBALL_BEHAVIOR,
    FOOTBALL_BALL_RADIUS,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_GOAL_WIDTH,
    FOOTBALL_TOUCHLINE_BUFFER,
    activeBallPlayer,
    applyFootballKickContact,
    attackGoalZ,
    attackerProfile,
    baseShotHunger,
    ballDist,
    commitFootballRun,
    findBestCrossTarget,
    findBestPassTarget,
    findClearanceTarget,
    findThirdManSupport,
    game,
    getFootballFootedness,
    handleControlState = handleFootballControlStateRuntime,
    handleKeeperEmergencyClear = handleFootballKeeperEmergencyClearRuntime,
    isDeliveryTarget,
    isCounterRunner,
    kickoffLocked,
    ownGoalDepth,
    p,
    opponents,
    registerBallTouch,
    setFootballBallVelocity,
    tacticalRole,
    teammates,
    teamIsStalling,
    triggerFootballKickPose
  } = context;

  const {
    canTouchBall,
    contestControlActive,
    nearestOpponentPressure
  } = getFootballTouchContextRuntime({
    activeBallPlayer,
    ballDist,
    game,
    isDeliveryTarget,
    kickoffLocked,
    opponents,
    p
  });

  if (!canTouchBall) {
    return false;
  }

  if (handleControlState({
    FOOTBALL_BALL_RADIUS,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_TOUCHLINE_BUFFER,
    commitFootballRun,
    game,
    nearestOpponentPressure,
    p
  })) {
    return true;
  }
  if (handleKeeperEmergencyClear({
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_GOAL_WIDTH,
    applyFootballKickContact,
    game,
    getFootballFootedness,
    p,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  })) {
    return true;
  }

  const passOption = findBestPassTarget(p, teammates, opponents);
  const crossOption = findBestCrossTarget(p, teammates, opponents, attackGoalZ);
  const { goalX } = getFootballShotAimRuntime({
    FOOTBALL_GOAL_WIDTH,
    game,
    opponents
  });
  const {
    crossSide,
    dodgeGoalX,
    dodgeShotDist,
    dodgeShotDx,
    finishType,
    goalDistance,
    nearestPressure,
    shotDz,
    shotLaneNudge,
    shotLanePenalty
  } = getFootballShotContextRuntime({
    FOOTBALL_GOAL_WIDTH,
    attackGoalZ,
    game,
    goalX,
    opponents,
    p
  });
  const wideCrossZone = Math.abs(game.ball.position.x) > FOOTBALL_GOAL_WIDTH * 0.9 && goalDistance < 5.8;
  const wideServiceZone = Math.abs(game.ball.position.x) > FOOTBALL_GOAL_WIDTH * 0.72 && goalDistance < 8.6;
  const touchlineIsolation = Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH * 0.76;
  const cornerTrapZone = touchlineIsolation && goalDistance < 5.2;
  const {
    advancedPassingOptions,
    boxTargetsAhead
  } = getFootballTouchSupportCounts(teammates, p, attackGoalZ, FOOTBALL_GOAL_WIDTH);
  const crowdedBoxService = touchlineIsolation && boxTargetsAhead >= 2;
  const {
    clearanceOption,
    contestEscapeDribble,
    escapeMode,
    finalShouldClear,
    finalShouldPass,
    hardEscapeMode,
    longShotBias,
    longShotWindow,
    shouldCross,
    shouldPass,
    shouldShoot,
    shotHungerBias,
    trappedWideCarrier
  } = getFootballActionDecisionRuntime({
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
  });

  if (shouldCross) {
    handleFootballCrossRuntime({
      FOOTBALL_FIELD_HALF_LENGTH,
      FOOTBALL_GOAL_WIDTH,
      applyFootballKickContact,
      attackGoalZ,
      crossOption,
      game,
      getFootballFootedness,
      p,
      registerBallTouch,
      setFootballBallVelocity,
      triggerFootballKickPose
    });
  } else if (shouldShoot && (!shouldPass || longShotWindow || dodgeShotDist < 3.35)) {
    handleFootballShotRuntime({
      ARCADE_SCORING_BOOST,
      FOOTBALL_FIELD_HALF_LENGTH,
      FOOTBALL_FIELD_HALF_WIDTH,
      FOOTBALL_GOAL_WIDTH,
      FOOTBALL_TOUCHLINE_BUFFER,
      applyFootballKickContact,
      commitFootballRun,
      crossSide,
      dodgeGoalX,
      dodgeShotDist,
      dodgeShotDx,
      finishType,
      game,
      getFootballFootedness,
      goalDistance,
      longShotBias,
      longShotWindow,
      p,
      registerBallTouch,
      setFootballBallVelocity,
      shotDz,
      shotHungerBias,
      shotLaneNudge,
      triggerFootballKickPose
    });
  } else if (finalShouldClear) {
    handleFootballClearanceRuntime({
      applyFootballKickContact,
      clearanceOption,
      game,
      getFootballFootedness,
      p,
      registerBallTouch,
      setFootballBallVelocity,
      triggerFootballKickPose
    });
  } else if (finalShouldPass) {
    handleFootballPassRuntime({
      FOOTBALL_BEHAVIOR,
      FOOTBALL_FIELD_HALF_LENGTH,
      FOOTBALL_FIELD_HALF_WIDTH,
      applyFootballKickContact,
      attackGoalZ,
      escapeMode,
      findThirdManSupport,
      game,
      getFootballFootedness,
      hardEscapeMode,
      nearestPressure,
      opponents,
      p,
      passOption,
      registerBallTouch,
      setFootballBallVelocity,
      teammates,
      triggerFootballKickPose
    });
  } else {
    handleFootballDribbleRuntime({
      FOOTBALL_FIELD_HALF_LENGTH,
      FOOTBALL_FIELD_HALF_WIDTH,
      applyFootballKickContact,
      commitFootballRun,
      contestEscapeDribble,
      escapeMode,
      finalShouldPass,
      game,
      getFootballFootedness,
      goalDistance,
      hardEscapeMode,
      nearestPressure,
      opponents,
      p,
      registerBallTouch,
      setFootballBallVelocity,
      shouldCross,
      touchlineIsolation,
      trappedWideCarrier,
      triggerFootballKickPose
    });
  }

  return true;
}

export * from "./football-touch-decision-runtime.js";
export * from "./football-touch-execution-runtime.js";
