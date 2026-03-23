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

import {
  adjustFootballPlayerTargetRuntime,
  getFootballOpenPlayTargetRuntime,
  getFootballPlayerDerivedStateRuntime,
  getFootballRestartTargetRuntime,
  prepareFootballPlayerFrameRuntime,
  updateFootballPlayerMovementRuntime
} from "./football-target-runtime.js";
import {
  handleFootballTouchRuntime
} from "./football-touch-runtime.js";

export * from "./football-target-runtime.js";
export * from "./football-touch-runtime.js";
export function updateFootballPlayerRuntime(context) {
  const {
    FOOTBALL_BEHAVIOR,
    activeBallPlayer,
    animateRunner,
    applyFootballKickContact,
    cameraWorldPos,
    clampFootballHumanPosition,
    closestToBall,
    commitFootballRun,
    controllingTeam,
    dt,
    findBestCrossTarget,
    findBestPassTarget,
    findClearanceTarget,
    findThirdManSupport,
    game,
    getFootballFootedness,
    getFootballKickoffTarget,
    kickoffLocked,
    ownGoalDepth,
    p,
    playerIndex,
    registerBallTouch,
    setFootballBallVelocity,
    steerFootballFacing,
    teamPlayers,
    triggerFootballKickPose
  } = context;

  const teammates = teamPlayers[p.team];
  const opponents = teamPlayers[-p.team];
  const teamLeader = closestToBall[p.team];
  let attackerCount = 0;
  let attackIndex = -1;
  let defenderCount = 0;
  let defendIndex = -1;
  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate.role === "attacker") {
      if (mate === p) attackIndex = attackerCount;
      attackerCount += 1;
    } else if (mate.role === "defender") {
      if (mate === p) defendIndex = defenderCount;
      defenderCount += 1;
    }
  }
  const attackGoalZ = p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const defendGoalZ = -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const {
    attackerProfile,
    ballProgress,
    ballSide,
    baseShotHunger,
    isCounterRunner,
    kickoffContestActive,
    ownHalfBias,
    shapeLiftBias,
    stallUrgency,
    tacticalRole,
    teamIsStalling,
    trapPress,
    urgencyRunBias
  } = getFootballPlayerDerivedStateRuntime({
    controllingTeam,
    game,
    p,
    teamLeader
  });
  const {
    ballDist,
    isDeliveryTarget,
    roamX,
    roamZ
  } = prepareFootballPlayerFrameRuntime({
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    activeBallPlayer,
    attackGoalZ,
    attackerProfile,
    cameraWorldPos,
    closestToBall,
    controllingTeam,
    dt,
    game,
    opponents,
    p,
    tacticalRole
  });

  let targetX;
  let targetZ;
  let keeperShotOnGoal = false;
  const restartTarget = getFootballRestartTargetRuntime({
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    FOOTBALL_GOAL_WIDTH,
    dt,
    game,
    getFootballKickoffTarget,
    kickoffContestActive,
    p
  });
  if (restartTarget) {
    ({
      attackLane: p.attackLane,
      keeperShotOnGoal,
      targetX,
      targetZ
    } = restartTarget);
  } else {
    ({
      attackLane: p.attackLane,
      keeperShotOnGoal,
      targetX,
      targetZ
    } = getFootballOpenPlayTargetRuntime({
      FOOTBALL_BEHAVIOR,
      FOOTBALL_FIELD_HALF_LENGTH,
      FOOTBALL_FIELD_HALF_WIDTH,
      attackGoalZ,
      attackIndex,
      attackerCount,
      attackerProfile,
      ballDist,
      ballProgress,
      ballSide,
      baseShotHunger,
      controllingTeam,
      defendGoalZ,
      defendIndex,
      dt,
      game,
      isCounterRunner,
      ownHalfBias,
      p,
      roamX,
      roamZ,
      stallUrgency,
      tacticalRole,
      targetX,
      targetZ,
      teamLeader,
      trapPress
    }));
  }

  ({
    targetX,
    targetZ
  } = adjustFootballPlayerTargetRuntime({
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_FIELD_HALF_WIDTH,
    game,
    isDeliveryTarget,
    p,
    shapeLiftBias,
    tacticalRole,
    targetX,
    targetZ
  }));
  updateFootballPlayerMovementRuntime({
    FOOTBALL_BEHAVIOR,
    FOOTBALL_FIELD_HALF_LENGTH,
    FOOTBALL_GOAL_DEPTH,
    FOOTBALL_GOAL_WIDTH,
    FOOTBALL_PERSON_RADIUS,
    activeBallPlayer,
    animateRunner,
    ballDist,
    clampFootballHumanPosition,
    dt,
    game,
    i: playerIndex,
    isCounterRunner,
    isDeliveryTarget,
    keeperShotOnGoal,
    p,
    steerFootballFacing,
    tacticalRole,
    targetX,
    targetZ,
    urgencyRunBias
  });

  handleFootballTouchRuntime({
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
    isCounterRunner,
    isDeliveryTarget,
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
  });
}



