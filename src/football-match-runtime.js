import { updateFootballPlayerRuntime } from "./football-player-runtime.js";
import {
  updateFootballBallRuntime,
  updateFootballLateGoalCheckRuntime,
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
  const frameStartBallState = {
    x: game.ball.position.x,
    y: game.ball.position.y,
    z: game.ball.position.z
  };

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
  if (updateFootballLateGoalCheckRuntime(game, {
    prevBallState: frameStartBallState,
    startGoalCelebration,
    updateScoreboard
  })) return;
  const refRestartBlocking = Boolean(game.refRestart?.active && game.refRestart.phase !== "clear");
  const playStopped = ballRuntime.kickoffLocked
    || ballRuntime.ballOutsideField
    || (game.restartHoldTimer ?? 0) > 0.001
    || refRestartBlocking;

  const {
    activeBallPlayer,
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  } = updateFootballPossessionRuntime(game, dt, playStopped, {
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
      kickoffLocked: playStopped,
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

  resolvePeopleCollisions(game, dt);
  if (updateFootballLateGoalCheckRuntime(game, {
    prevBallState: frameStartBallState,
    startGoalCelebration,
    updateScoreboard
  })) return;
  updateFootballOutOfBoundsRuntime(game, dt, ballRuntime.kickoffLocked, startFootballRefRestart);
}
