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
    && nearestOpponentPressure < 1.92;
  const contestHardLockActive = (game.contestHardLockTimer ?? 0) > 0.001
    && p.role !== "keeper"
    && nearestOpponentPressure < 2.18;
  const duelControlActive = game.duelControlPlayer === p
    && (game.duelControlTimer ?? 0) > 0.001
    && nearestOpponentPressure < 1.56;
  const firstTouchControl = game.firstTouchPlayer === p && (game.firstTouchTimer ?? 0) > 0.001;

  if (!(firstTouchControl || duelControlActive || contestControlActive || contestHardLockActive)) {
    return false;
  }

  const settleDistance = contestHardLockActive ? 0.09 : duelControlActive ? 0.12 : contestControlActive ? 0.11 : 0.16;
  const settleLerp = contestHardLockActive ? 0.78 : duelControlActive ? 0.7 : contestControlActive ? 0.74 : 0.56;
  const velocityDamp = contestHardLockActive ? 0.05 : duelControlActive ? 0.14 : contestControlActive ? 0.1 : 0.24;
  const settleX = p.runner.root.position.x + Math.sin(p.runner.root.rotation.y) * settleDistance;
  const settleZ = p.runner.root.position.z + Math.cos(p.runner.root.rotation.y) * settleDistance;
  game.ball.position.x = THREE.MathUtils.lerp(game.ball.position.x, settleX, settleLerp);
  game.ball.position.z = THREE.MathUtils.lerp(game.ball.position.z, settleZ, settleLerp);
  game.ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, THREE.MathUtils.lerp(game.ball.position.y, FOOTBALL_BALL_RADIUS, duelControlActive || contestControlActive || contestHardLockActive ? 0.84 : 0.7));
  game.ballVel.x *= velocityDamp;
  game.ballVel.z *= velocityDamp;
  game.ballVel.y *= duelControlActive || contestControlActive || contestHardLockActive ? 0.05 : 0.12;
  p.kickCooldown = Math.max(p.kickCooldown ?? 0, contestHardLockActive ? 0.32 : duelControlActive ? 0.22 : contestControlActive ? 0.26 : 0.16);
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
  const sailChance = finishType === null
    ? THREE.MathUtils.clamp(
        Math.max(0, power - 6.1) * 0.075
        + Math.max(0, goalDistance - 7.5) * 0.018
        + (longShotWindow ? 0.08 : 0.02)
        + (unleashBanger ? 0.16 : 0),
        0,
        0.42
      )
    : 0;
  const overhitHigh = !missesTarget && Math.random() < sailChance;
  if (missesTarget) {
    aimedFinishDx += (Math.random() < 0.5 ? -1 : 1) * (0.95 + Math.random() * (longShotWindow ? 2.2 : 1.15));
  }
  if (overhitHigh) {
    aimedFinishDx += (Math.random() - 0.5) * (longShotWindow ? 0.72 : 0.34);
  }
  p.kickSide = shotFoot.kickSide;
  applyFootballKickContact(p, game.ball);
  const powerLift = THREE.MathUtils.clamp(Math.max(0, power - 5.35) * 0.26, 0, 1.55);
  const shotLoft = finishType === "volley"
    ? 2.1 + powerLift * 0.34 + Math.random() * 0.9
    : overhitHigh
      ? 3.05 + powerLift * 0.72 + Math.max(0, goalDistance - 4.2) * 0.11 + (unleashBanger ? 0.54 : 0.18) + Math.random() * 1.15
      : longShotWindow
        ? 2.85 + powerLift * 0.48 + Math.min(3.25, Math.max(0, goalDistance - 5.8) * 0.36) + (highMiss ? 2.05 : 0.78) + (unleashBanger ? 0.9 : 0.22) + Math.random() * 0.58
        : missesTarget && highMiss
          ? 2.5 + powerLift * 0.4 + Math.random() * 1.05
          : 0.52 + Math.max(0, goalDistance - 2.2) * 0.07 + powerLift * 0.34 + (unleashBanger ? 0.28 : 0.06);
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
