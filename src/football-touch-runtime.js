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

const FOOTBALL_TOUCH_SUPPORT_COUNTS_RESULT = {
  advancedPassingOptions: 0,
  boxTargetsAhead: 0
};

const FOOTBALL_TOUCH_CONTEXT_RESULT = {
  canTouchBall: false,
  contestControlActive: false,
  nearestOpponentPressure: Infinity
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

function getFootballTouchSupportCounts(teammates, p, attackGoalZ, goalWidth) {
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

export function handleFootballControlStateRuntime(context) {
  const {
    FOOTBALL_BALL_RADIUS,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_TOUCHLINE_BUFFER,
    commitFootballRun,
    game,
    nearestOpponentPressure,
    p
  } = context;

  const contestControlActive = (game.contestTouchTimer ?? 0) > 0.001
    && p.role !== "keeper"
    && nearestOpponentPressure < 1.72;
  const contestHardLockActive = (game.contestHardLockTimer ?? 0) > 0.001
    && p.role !== "keeper"
    && nearestOpponentPressure < 1.95;
  const duelControlActive = game.duelControlPlayer === p
    && (game.duelControlTimer ?? 0) > 0.001
    && nearestOpponentPressure < 1.38;
  const firstTouchControl = game.firstTouchPlayer === p && (game.firstTouchTimer ?? 0) > 0.001;

  if (!(firstTouchControl || duelControlActive || contestControlActive || contestHardLockActive)) {
    return false;
  }

  const settleDistance = contestHardLockActive ? 0.12 : duelControlActive ? 0.16 : contestControlActive ? 0.14 : 0.2;
  const settleLerp = contestHardLockActive ? 0.7 : duelControlActive ? 0.6 : contestControlActive ? 0.64 : 0.48;
  const velocityDamp = contestHardLockActive ? 0.08 : duelControlActive ? 0.2 : contestControlActive ? 0.14 : 0.32;
  const settleX = p.runner.root.position.x + Math.sin(p.runner.root.rotation.y) * settleDistance;
  const settleZ = p.runner.root.position.z + Math.cos(p.runner.root.rotation.y) * settleDistance;
  game.ball.position.x = THREE.MathUtils.lerp(game.ball.position.x, settleX, settleLerp);
  game.ball.position.z = THREE.MathUtils.lerp(game.ball.position.z, settleZ, settleLerp);
  game.ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, THREE.MathUtils.lerp(game.ball.position.y, FOOTBALL_BALL_RADIUS, duelControlActive || contestControlActive || contestHardLockActive ? 0.76 : 0.62));
  game.ballVel.x *= velocityDamp;
  game.ballVel.z *= velocityDamp;
  game.ballVel.y *= duelControlActive || contestControlActive || contestHardLockActive ? 0.08 : 0.16;
  p.kickCooldown = Math.max(p.kickCooldown ?? 0, contestHardLockActive ? 0.28 : duelControlActive ? 0.18 : contestControlActive ? 0.22 : 0.12);
  if (contestHardLockActive) {
    commitFootballRun(
      p,
      THREE.MathUtils.clamp(p.runner.root.position.x + Math.sin(p.runner.root.rotation.y) * 0.9, -FOOTBALL_FIELD_HALF_WIDTH - FOOTBALL_TOUCHLINE_BUFFER * 0.7, FOOTBALL_FIELD_HALF_WIDTH + FOOTBALL_TOUCHLINE_BUFFER * 0.7),
      THREE.MathUtils.clamp(p.runner.root.position.z + p.team * 0.9, -FOOTBALL_FIELD_HALF_LENGTH - FOOTBALL_TOUCHLINE_BUFFER * 0.6, FOOTBALL_FIELD_HALF_LENGTH + FOOTBALL_TOUCHLINE_BUFFER * 0.6),
      0.26
    );
  }
  return true;
}

export function handleFootballKeeperEmergencyClearRuntime(context) {
  const {
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
  } = context;

  if (p.role !== "keeper") {
    return false;
  }

  const keeperOwnGoalZ = -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const keeperBoxDepth = (game.ball.position.z - keeperOwnGoalZ) * p.team;
  const keeperEmergencyClear = keeperBoxDepth > -5.2
    && keeperBoxDepth < 1.25
    && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.9;

  if (!keeperEmergencyClear) {
    return false;
  }

  const emergencyClearX = THREE.MathUtils.clamp(
    game.ball.position.x + (Math.random() < 0.5 ? -1 : 1) * (4.6 + Math.random() * 4.4),
    -FOOTBALL_FIELD_HALF_WIDTH * 0.94,
    FOOTBALL_FIELD_HALF_WIDTH * 0.94
  );
  const emergencyClearZ = p.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.72 + Math.random() * 0.2));
  const clearDx = emergencyClearX - game.ball.position.x;
  const clearDz = emergencyClearZ - game.ball.position.z;
  p.kickSide = getFootballFootedness(p, game.ball, emergencyClearX).kickSide;
  applyFootballKickContact(p, game.ball);
  setFootballBallVelocity(game, clearDx, clearDz, 9.8 + Math.random() * 2.8, 1.8 + Math.random() * 0.9);
  p.kickCooldown = 0.72 + Math.random() * 0.18;
  p.saveHeight = 0.28;
  triggerFootballKickPose(p, game.ball, 1.04, emergencyClearX);
  registerBallTouch(game, p.team, p);
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  return true;
}

export function handleFootballClearanceRuntime(context) {
  const {
    applyFootballKickContact,
    clearanceOption,
    game,
    getFootballFootedness,
    p,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  } = context;

  if (!clearanceOption) {
    return false;
  }

  const clearDx = clearanceOption.x - game.ball.position.x;
  const clearDz = clearanceOption.z - game.ball.position.z;
  const clearLen = Math.max(0.001, Math.hypot(clearDx, clearDz));
  const clearFoot = getFootballFootedness(p, game.ball, clearanceOption.x);
  p.kickSide = clearFoot.kickSide;
  applyFootballKickContact(p, game.ball);
  setFootballBallVelocity(game, clearDx, clearDz, clearanceOption.power, 1.25 + Math.min(1.55, clearLen * 0.1) + Math.random() * 0.35);
  p.kickCooldown = 0.44 + Math.random() * 0.16;
  triggerFootballKickPose(p, game.ball, 0.96, clearanceOption.x);
  registerBallTouch(game, p.team, p);
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  return true;
}

export function handleFootballCrossRuntime(context) {
  const {
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
  } = context;

  if (!crossOption?.player) {
    return false;
  }

  const crossTarget = crossOption.player;
  const crossLeadTime = 0.34 + Math.min(0.18, crossOption.dist * 0.024);
  const boxAimX = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(
      crossTarget.runner.root.position.x + crossTarget.vx * crossLeadTime,
      -Math.sign(game.ball.position.x || 1) * FOOTBALL_GOAL_WIDTH * 0.18,
      0.26
    ),
    -FOOTBALL_GOAL_WIDTH * 0.8,
    FOOTBALL_GOAL_WIDTH * 0.8
  );
  const boxAimZ = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(
      crossTarget.runner.root.position.z + crossTarget.vz * crossLeadTime,
      attackGoalZ - p.team * 1.35,
      0.22
    ),
    -FOOTBALL_FIELD_HALF_LENGTH + 1.0,
    FOOTBALL_FIELD_HALF_LENGTH - 0.45
  );
  const crossDx = boxAimX - game.ball.position.x;
  const crossDz = boxAimZ - game.ball.position.z;
  const crossLen = Math.max(0.001, Math.hypot(crossDx, crossDz));
  const crossFoot = getFootballFootedness(p, game.ball, boxAimX);
  const crossWeakness = crossFoot.weakFoot ? 0.88 : 1;
  const crossCurve = (p.crossQualityBias ?? 0) + (crossWeakness < 1 ? -0.06 : 0);
  const aimCrossDx = crossDx + Math.sign(crossDx || p.team) * crossCurve * 0.28;
  const power = (3.95 + Math.min(2.9, crossLen * 0.35)) * crossWeakness;
  p.kickSide = crossFoot.kickSide;
  applyFootballKickContact(p, game.ball);
  setFootballBallVelocity(game, aimCrossDx, crossDz, power, 2.35 + Math.min(2.7, crossLen * 0.18) + Math.random() * 0.42);
  p.kickCooldown = 0.5 + Math.random() * 0.18;
  triggerFootballKickPose(p, game.ball, 0.88, boxAimX);
  registerBallTouch(game, p.team, p);
  game.deliveryType = "cross";
  game.deliveryTeam = p.team;
  game.deliveryTimer = 1.05;
  game.deliverySource = p;
  game.deliveryTarget = crossTarget;
  return true;
}

export function handleFootballPassRuntime(context) {
  const {
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
  } = context;

  const passTarget = passOption?.player;
  if (!passTarget) {
    return false;
  }

  const triggerOneTwo = !escapeMode
    && !hardEscapeMode
    && p.role !== "keeper"
    && passTarget.role !== "keeper"
    && (p.oneTwoCooldown ?? 0) <= 0
    && passOption.dist > 2.2
    && passOption.dist < 6.2
    && passOption.forward > 0.7
    && nearestPressure < 2.2
    && (passTarget.attackerProfile === "playmaker" || passTarget.attackLane === "link" || passTarget.attackLane === "support" || passTarget.role === "attacker")
    && Math.random() < 0.34;
  const runLeadBias = passOption.throughRun ? THREE.MathUtils.clamp((passTarget.goalRunTimer ?? 0) / 1.8, 0, 1.2) : 0;
  const diagonalLaneBias = THREE.MathUtils.clamp(Math.abs(passTarget.runner.root.position.x - p.runner.root.position.x) / 4.8, 0, 1.1);
  const passRisk = Math.max(passOption.interceptRisk ?? 0, passOption.frontBlockerRisk ?? 0, (passOption.laneTraffic ?? 0) * 0.55);
  const passSafety = THREE.MathUtils.clamp(1 - passRisk * 1.15, 0.28, 1);
  const leadTime = ((passOption.leadTime ?? 0.42) + (escapeMode ? 0.18 : 0.05) + Math.min(escapeMode ? 0.34 : 0.22, passOption.dist * (escapeMode ? 0.036 : 0.025)) + runLeadBias * (escapeMode ? 0.06 : 0.12)) * (0.78 + passSafety * 0.24);
  const runTargetX = passOption.throughRun ? (passTarget.goalRunTargetX ?? passTarget.runner.root.position.x) : passTarget.runner.root.position.x;
  const runTargetZ = passOption.throughRun ? (passTarget.goalRunTargetZ ?? passTarget.runner.root.position.z) : passTarget.runner.root.position.z;
  const leadX = passTarget.runner.root.position.x
    + passTarget.vx * leadTime
    + (runTargetX - passTarget.runner.root.position.x) * runLeadBias * (0.42 + diagonalLaneBias * 0.16) * passSafety
    + Math.sign(runTargetX - p.runner.root.position.x || p.laneBias || 1) * diagonalLaneBias * Math.max(0, p.passVision ?? 0) * 0.12 * passSafety;
  const leadZ = passTarget.runner.root.position.z + passTarget.vz * leadTime + p.team * (escapeMode ? 0.22 : 0.08) + (runTargetZ - passTarget.runner.root.position.z) * runLeadBias * (0.44 + diagonalLaneBias * 0.06) * passSafety;
  const passDx = leadX - game.ball.position.x;
  const passDz = leadZ - game.ball.position.z;
  const passLen = Math.max(0.001, Math.hypot(passDx, passDz));
  const passFoot = getFootballFootedness(p, game.ball, leadX);
  const passWeakness = passFoot.weakFoot ? 0.92 : 1;
  const passAimDx = passDx + THREE.MathUtils.clamp((p.passVision ?? 0) * Math.sign(passDx || p.team) * 0.12 * passSafety, -0.12, 0.12);
  const longPassBonus = passLen > 6 ? FOOTBALL_BEHAVIOR.passPowerBonusBase + Math.min(0.6, (passLen - 6) * FOOTBALL_BEHAVIOR.passPowerBonusScale) : 0;
  const power = (hardEscapeMode ? 4.45 + Math.min(3.35, passLen * 0.4) : escapeMode ? 3.65 + Math.min(2.7, passLen * 0.35) : 2.95 + Math.min(2.35, passLen * 0.33) + (passOption.throughRun ? 0.22 + runLeadBias * 0.32 : 0) + longPassBonus) * passWeakness;
  p.kickSide = passFoot.kickSide;
  applyFootballKickContact(p, game.ball);
  const passLoft = hardEscapeMode
    ? 1.1 + Math.min(1.8, passLen * 0.1) + (passOption.throughRun ? 0.28 : 0)
    : passLen > 6.4 || passOption.throughRun
      ? 0.82 + Math.min(1.5, passLen * 0.09) + (passOption.throughRun ? 0.34 : 0)
      : 0.14 + Math.max(0, passLen - 3.1) * 0.05;
  setFootballBallVelocity(game, passAimDx, passDz, power, passLoft);
  p.kickCooldown = hardEscapeMode ? 0.44 + Math.random() * 0.16 : 0.52 + Math.random() * 0.24;
  triggerFootballKickPose(p, game.ball, 0.9 + (passOption.progressive ? 0.08 : 0) + (passOption.throughRun ? 0.1 : 0), leadX);
  registerBallTouch(game, p.team, p);
  if (triggerOneTwo) {
    const wallDepth = THREE.MathUtils.clamp(2.1 + passOption.forward * 0.42, 1.8, 3.4);
    const wallLateral = THREE.MathUtils.clamp((passTarget.runner.root.position.x - p.runner.root.position.x) * 0.28, -1.2, 1.2);
    p.oneTwoTimer = 1.15;
    p.oneTwoCooldown = 3.2 + Math.random() * 1.6;
    p.oneTwoPartner = passTarget;
    p.oneTwoTargetX = THREE.MathUtils.clamp(passTarget.runner.root.position.x + wallLateral, -FOOTBALL_FIELD_HALF_WIDTH + 0.85, FOOTBALL_FIELD_HALF_WIDTH - 0.85);
    p.oneTwoTargetZ = THREE.MathUtils.clamp(passTarget.runner.root.position.z + p.team * wallDepth, -FOOTBALL_FIELD_HALF_LENGTH + 0.85, FOOTBALL_FIELD_HALF_LENGTH - 0.5);
    passTarget.oneTwoReturnTimer = 0.95;
    passTarget.oneTwoReturnTarget = p;
    const thirdMan = findThirdManSupport(p, passTarget, teammates, opponents, attackGoalZ);
    if (thirdMan) {
      thirdMan.player.goalRunTargetX = thirdMan.targetX;
      thirdMan.player.goalRunTargetZ = thirdMan.targetZ;
      thirdMan.player.goalRunTimer = Math.max(thirdMan.player.goalRunTimer ?? 0, 1 + Math.random() * 0.45);
      thirdMan.player.goalRunCooldown = Math.max(thirdMan.player.goalRunCooldown ?? 0, 2 + Math.random() * 1.25);
      thirdMan.player.breakRunBias = Math.max(thirdMan.player.breakRunBias ?? 1, 1.15);
    }
  }
  game.deliveryType = "pass";
  game.deliveryTeam = p.team;
  game.deliveryTimer = 0.88 + Math.min(0.42, passLen * 0.05) + (passOption.throughRun ? 0.12 : 0);
  game.deliverySource = p;
  game.deliveryTarget = passTarget;
  return true;
}

export function handleFootballDribbleRuntime(context) {
  const {
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
  } = context;

  const inwardCutSign = Math.sign(-game.ball.position.x || -p.laneBias || 1);
  const wideTrapDribble = trappedWideCarrier && !shouldCross && !finalShouldPass;
  const goalPull = THREE.MathUtils.clamp((goalDistance - 1.8) / 7.2, 0.18, 1.12);
  const diagonalCarryBias = wideTrapDribble
    ? inwardCutSign * (1.55 + Math.min(0.8, Math.abs(game.ball.position.x) * 0.1))
    : touchlineIsolation
      ? inwardCutSign * (1.15 + Math.min(0.7, Math.abs(game.ball.position.x) * 0.08))
      : inwardCutSign * (0.72 + Math.max(0, 2.9 - nearestPressure) * 0.22) + Math.sign(p.laneBias || inwardCutSign) * 0.06;
  const escapeDribbleX = Math.sign((p.runner.root.position.x - (opponents[0]?.runner.root.position.x ?? p.runner.root.position.x)) || inwardCutSign) * (1.2 + Math.min(0.8, nearestPressure));
  const driveX = contestEscapeDribble
    ? THREE.MathUtils.clamp(diagonalCarryBias * 1.18 + escapeDribbleX * 0.82, -2.6, 2.6)
    : wideTrapDribble
      ? THREE.MathUtils.clamp(diagonalCarryBias + (Math.random() - 0.5) * 0.35, -2.4, 2.4)
      : hardEscapeMode
        ? THREE.MathUtils.clamp(p.laneBias * 0.46 + diagonalCarryBias * 1.2 + (Math.random() - 0.5) * 1.35, -3.4, 3.4)
        : escapeMode
          ? THREE.MathUtils.clamp(p.laneBias * 0.3 + diagonalCarryBias * 0.72 + (Math.random() - 0.5) * 0.72, -2.2, 2.2)
          : THREE.MathUtils.clamp(p.laneBias * 0.08 + diagonalCarryBias * 0.88 + (Math.random() - 0.5) * 0.32, -1.7, 1.7);
  const driveZ = contestEscapeDribble
    ? p.team * (1.65 + Math.random() * 0.7)
    : wideTrapDribble
      ? p.team * Math.max(0.85, goalDistance < 4.2 ? 0.95 + Math.random() * 0.45 : 1.2 + Math.random() * 0.7)
      : touchlineIsolation
        ? p.team * (0.7 + Math.random() * 0.45)
        : p.team * (hardEscapeMode ? 7.2 + Math.random() * 2.6 : escapeMode ? 4.7 + Math.random() * 1.7 : 2.8 + goalPull * 0.95 + Math.random() * 1.15);
  const power = contestEscapeDribble
    ? 2.8 + Math.random() * 0.55
    : wideTrapDribble
      ? 1.85 + Math.random() * 0.4
      : hardEscapeMode ? 5.2 + Math.random() * 1.2 : escapeMode ? 3.85 + Math.random() * 0.95 : 2.9 + goalPull * 0.55 + Math.random() * 0.82;
  p.kickSide = getFootballFootedness(p, game.ball, game.ball.position.x + driveX).kickSide;
  applyFootballKickContact(p, game.ball);
  const dribbleLoft = contestEscapeDribble
    ? 0.03 + Math.random() * 0.04
    : wideTrapDribble
      ? 0.02 + Math.random() * 0.04
      : hardEscapeMode ? 0.38 + Math.random() * 0.28 : escapeMode ? 0.22 + Math.random() * 0.24 : 0.09 + Math.random() * 0.12;
  setFootballBallVelocity(game, driveX, driveZ, power, dribbleLoft);
  p.kickCooldown = contestEscapeDribble
    ? 0.28 + Math.random() * 0.08
    : wideTrapDribble
      ? 0.24 + Math.random() * 0.08
      : hardEscapeMode ? 0.34 + Math.random() * 0.14 : 0.42 + Math.random() * 0.22;
  triggerFootballKickPose(p, game.ball, 0.86, game.ball.position.x + driveX);
  if (wideTrapDribble || contestEscapeDribble) {
    commitFootballRun(
      p,
      THREE.MathUtils.clamp(game.ball.position.x + driveX * 0.78, -FOOTBALL_FIELD_HALF_WIDTH + 0.85, FOOTBALL_FIELD_HALF_WIDTH - 0.85),
      THREE.MathUtils.clamp(game.ball.position.z + driveZ * 0.62, -FOOTBALL_FIELD_HALF_LENGTH + 0.85, FOOTBALL_FIELD_HALF_LENGTH - 0.65),
      0.34
    );
  }
  registerBallTouch(game, p.team, p);
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  return true;
}

export function handleFootballShotRuntime(context) {
  const {
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
  } = context;

  const finishGoalX = finishType === "backPost"
    ? THREE.MathUtils.clamp(-crossSide * FOOTBALL_GOAL_WIDTH * 0.34, -FOOTBALL_GOAL_WIDTH * 0.42, FOOTBALL_GOAL_WIDTH * 0.42)
    : finishType === "nearPost"
      ? THREE.MathUtils.clamp(crossSide * FOOTBALL_GOAL_WIDTH * 0.28, -FOOTBALL_GOAL_WIDTH * 0.36, FOOTBALL_GOAL_WIDTH * 0.36)
      : dodgeGoalX;
  const finishDx = (finishType === "volley" || finishType === null ? dodgeShotDx : finishGoalX - game.ball.position.x);
  const finishDz = shotDz;
  const shotPrecision = (dodgeShotDist < 2.6 ? 1.22 : dodgeShotDist < 4.6 ? 1.02 : 0.9) * ARCADE_SCORING_BOOST;
  const shotFoot = getFootballFootedness(p, game.ball, finishGoalX);
  const shotWeakness = shotFoot.weakFoot ? 0.9 : 1;
  const accuracyBias = (p.shotAccuracyBias ?? 0) - (shotWeakness < 1 ? 0.08 : 0);
  let aimedFinishDx = finishDx + THREE.MathUtils.clamp(shotLaneNudge * 0.35 - Math.sign(finishDx || p.team) * accuracyBias * 0.24, -0.32, 0.32);
  const bangerChance = longShotWindow
    ? THREE.MathUtils.clamp((p.bangerBias ?? 0) * 0.32 + Math.max(0, goalDistance - 9) * 0.02 + shotHungerBias * 0.08, 0.08, 0.5)
    : 0;
  const unleashBanger = longShotWindow && (p.bangerCooldown ?? 0) <= 0 && Math.random() < bangerChance;
  const longShotPowerBonus = longShotWindow ? THREE.MathUtils.clamp((goalDistance - 6) * (0.24 + Math.max(0, longShotBias) * 0.05), 0.45, 2.25) : 0;
  const power = ((finishType === "volley"
    ? 5.45 + Math.random() * 0.42
    : finishType === "backPost"
      ? 4.62 + Math.random() * 0.34
      : finishType === "nearPost"
        ? 4.78 + Math.random() * 0.36
        : 4.95 + shotPrecision * 1.42 + Math.random() * 0.58 + longShotPowerBonus + (unleashBanger ? 1.85 + Math.random() * 0.8 : 0)) + (p.shotPowerBias ?? 0)) * (0.98 + (ARCADE_SCORING_BOOST - 1) * 0.7) * shotWeakness;
  const missChance = THREE.MathUtils.clamp(
    0.03
      + Math.max(0, goalDistance - 5.8) * 0.028
      + (longShotWindow ? 0.12 : 0)
      + (unleashBanger ? 0.08 : 0)
      + Math.max(0, -accuracyBias) * 0.18,
    0.03,
    unleashBanger ? 0.44 : 0.34
  );
  const missesTarget = finishType === null && Math.random() < missChance;
  const highMiss = missesTarget && Math.random() < 0.42;
  if (missesTarget) {
    aimedFinishDx += (Math.random() < 0.5 ? -1 : 1) * (0.95 + Math.random() * (longShotWindow ? 2.2 : 1.15));
  }
  p.kickSide = shotFoot.kickSide;
  applyFootballKickContact(p, game.ball);
  const shotLoft = finishType === "volley"
    ? 1.28 + Math.random() * 0.55
    : longShotWindow
      ? 1.7 + Math.min(2.3, Math.max(0, goalDistance - 6.1) * 0.26) + (highMiss ? 1.45 : 0.34) + (unleashBanger ? 0.42 : 0) + Math.random() * 0.42
      : missesTarget && highMiss
        ? 1.62 + Math.random() * 0.74
        : 0.18 + Math.max(0, goalDistance - 2.8) * 0.03;
  setFootballBallVelocity(game, aimedFinishDx, finishDz, power, shotLoft);
  if (unleashBanger) {
    p.bangerCooldown = 6.5 + Math.random() * 6.5;
  }
  p.kickCooldown = finishType !== null ? 0.42 + Math.random() * 0.1 : 0.68 + Math.random() * 0.24;
  triggerFootballKickPose(p, game.ball, finishType !== null ? 1.08 : 1, finishGoalX);
  commitFootballRun(
    p,
    THREE.MathUtils.clamp(game.ball.position.x + aimedFinishDx * 0.2, -FOOTBALL_FIELD_HALF_WIDTH - FOOTBALL_TOUCHLINE_BUFFER * 0.7, FOOTBALL_FIELD_HALF_WIDTH + FOOTBALL_TOUCHLINE_BUFFER * 0.7),
    THREE.MathUtils.clamp(p.runner.root.position.z + p.team * (2.8 + Math.min(1.8, goalDistance * 0.12)), -FOOTBALL_FIELD_HALF_LENGTH - FOOTBALL_TOUCHLINE_BUFFER * 0.6, FOOTBALL_FIELD_HALF_LENGTH + FOOTBALL_TOUCHLINE_BUFFER * 0.6),
    finishType !== null ? 0.64 : 0.48
  );
  registerBallTouch(game, p.team, p);
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  return true;
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


