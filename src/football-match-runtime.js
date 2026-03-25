import { updateFootballPlayerRuntime } from "./football-player-runtime.js";
import {
  updateFootballBallRuntime,
  updateFootballPossessionRuntime
} from "./football-ball-runtime.js";
import { updateFootballOfficialsAndTrackRuntime } from "./football-officials-track-runtime.js";
import {
  updateFootballGoalmouthStallRuntime,
  updateFootballMatchStateRuntime,
  updateFootballOutOfBoundsRuntime,
  updateFootballTransientTimersRuntime
} from "./football-match-state-runtime.js";

export function updateFootballGameplayRuntime(game, dt, trackDt, context) {
  const {
    FOOTBALL_BEHAVIOR,
    animateRunner,
    applyFootballKickContact,
    cameraWorldPos,
    clampFootballHumanPosition,
    clampFootballRefereePosition,
    commitFootballRun,
    findBestCrossTarget,
    findBestPassTarget,
    findClearanceTarget,
    findThirdManSupport,
    getFootballFootedness,
    getFootballKickoffTarget,
    getFootballRefereeTarget,
    getTrackLaneLength,
    getTrackPointAtProgress,
    registerBallTouch,
    resolvePeopleCollisions,
    setFootballBallVelocity,
    startFootballRefRestart,
    startGoalCelebration,
    steerFootballFacing,
    triggerFootballKickPose,
    updateGoalCelebration,
    updateScoreboard
  } = context;

  updateFootballTransientTimersRuntime(game, dt);
  updateFootballOfficialsAndTrackRuntime(game, dt, trackDt, {
    animateRunner,
    cameraWorldPos,
    clampFootballRefereePosition,
    getFootballRefereeTarget,
    getTrackLaneLength,
    getTrackPointAtProgress,
    steerFootballFacing
  });

  if (updateGoalCelebration(game, dt)) return;

  const ballRuntime = updateFootballBallRuntime(game, dt, {
    applyFootballKickContact,
    getFootballFootedness,
    getFootballKickoffTarget,
    registerBallTouch,
    setFootballBallVelocity,
    startGoalCelebration,
    triggerFootballKickPose,
    updateScoreboard
  });
  if (ballRuntime.scored) return;

  updateFootballGoalmouthStallRuntime(game, dt, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  });
  updateFootballOutOfBoundsRuntime(game, dt, ballRuntime.kickoffLocked, startFootballRefRestart);

  const {
    activeBallPlayer,
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  } = updateFootballPossessionRuntime(game, dt, ballRuntime.kickoffLocked, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose,
    updateScoreboard
  });
  const ownGoalDepth = controllingTeam !== 0 ? -game.ball.position.z * controllingTeam : 0;
  updateFootballMatchStateRuntime(game, dt, {
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  }, {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  });

  for (let i = 0; i < game.players.length; i += 1) {
    updateFootballPlayerRuntime({
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
      kickoffLocked: ballRuntime.kickoffLocked,
      ownGoalDepth,
      p: game.players[i],
      playerIndex: i,
      registerBallTouch,
      setFootballBallVelocity,
      steerFootballFacing,
      teamPlayers,
      triggerFootballKickPose
    });
  }

  resolvePeopleCollisions(game);
}
