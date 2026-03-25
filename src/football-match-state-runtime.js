import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_CONTROL_HEIGHT,
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_WIDTH
} from "./game-config.js";

// Match-level state that sits above per-player behavior:
// timers, stall detection, dead-ball cleanup, and emergency escape rules.
function countFootballPlayersNearPoint(players, x, z, radius) {
  let count = 0;
  const radiusSq = radius * radius;
  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    const dx = x - player.runner.root.position.x;
    const dz = z - player.runner.root.position.z;
    if (dx * dx + dz * dz < radiusSq) count += 1;
  }
  return count;
}

function getFootballClosestPriorityPlayer(players, x, z, team = 0) {
  let bestPlayer = null;
  let bestPriority = Infinity;
  let bestDist = Infinity;

  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    if (team !== 0 && player.team !== team) continue;
    const priority = player.role === "keeper" ? 0 : player.role === "defender" ? 1 : 2;
    const dist = Math.hypot(x - player.runner.root.position.x, z - player.runner.root.position.z);
    if (priority < bestPriority || (priority === bestPriority && dist < bestDist)) {
      bestPlayer = player;
      bestPriority = priority;
      bestDist = dist;
    }
  }

  return bestPlayer;
}

export function updateFootballMatchStateRuntime(game, dt, context, deps) {
  const {
    ballHolder,
    closestToBall,
    controllingTeam,
    teamPlayers
  } = context;
  const {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  } = deps;

  // The referee reacts to chaotic passages so presentation cues stay aligned
  // with what the match state thinks is happening.
  if (game.coach) {
    if ((ballHolder && ballHolder !== game.coach.lastBallHolder) || (controllingTeam !== 0 && controllingTeam !== game.coach.lastControllingTeam)) {
      game.coach.whistleTimer = Math.max(game.coach.whistleTimer, 0.68);
    }
    game.coach.lastBallHolder = ballHolder;
    game.coach.lastControllingTeam = controllingTeam;

    let clusteredPlayers = 0;
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      if (p.role === "keeper") continue;
      const distToBall = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
      if (distToBall < 1.34) clusteredPlayers += 1;
    }
    const refBallDist = Math.hypot(game.coach.runner.root.position.x - game.ball.position.x, game.coach.runner.root.position.z - game.ball.position.z);
    const crowdingPlay = clusteredPlayers >= 4 && game.ballVel.length() < 1.05 && refBallDist < 5.4;
    if (crowdingPlay) {
      game.coach.crowdTimer = Math.min(5.5, game.coach.crowdTimer + dt);
    } else {
      game.coach.crowdTimer = Math.max(0, game.coach.crowdTimer - dt * 1.7);
    }
    if (game.coach.cardCooldown <= 0 && game.coach.crowdTimer > 2.2) {
      game.coach.cardColor = game.coach.crowdTimer > 3.8 ? "red" : "yellow";
      game.coach.cardTimer = game.coach.cardColor === "red" ? 1.28 : 1.1;
      game.coach.whistleTimer = Math.max(game.coach.whistleTimer, 0.58);
      game.coach.cardCooldown = game.coach.cardColor === "red" ? 8.5 : 5.5;
      game.coach.crowdTimer = 0;
    }
  }

  const ownGoalDepth = controllingTeam !== 0 ? -game.ball.position.z * controllingTeam : 0;
  const ballForwardProgress = controllingTeam !== 0 ? game.ballVel.z * controllingTeam : 0;
  // Detect stagnant possession in dangerous areas and escalate from "stalling"
  // to forced scramble clearances before the ball gets trapped in the goalmouth.
  const trappedInOwnThird = controllingTeam !== 0
    && ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 6.4
    && (game.ballVel.length() < 1.55 || ballForwardProgress < 0.42);
  if (trappedInOwnThird) {
    if (game.stallTeam !== controllingTeam) game.stallTimer = 0;
    game.stallTeam = controllingTeam;
    game.stallTimer = Math.min(4.5, game.stallTimer + dt);
  } else {
    game.stallTimer = Math.max(0, game.stallTimer - dt * (game.stallTeam === controllingTeam ? 1.5 : 2.6));
    if (game.stallTimer <= 0.001) {
      game.stallTimer = 0;
      game.stallTeam = 0;
    }
  }
  const nearOwnGoalScramble = controllingTeam !== 0
    && ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 5.2
    && game.lastTouchTeam === controllingTeam
    && game.sameTeamTouchCount >= 2
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 2.15;
  const ownGoalScramblePlayerCount = nearOwnGoalScramble
    ? countFootballPlayersNearPoint(teamPlayers[controllingTeam], game.ball.position.x, game.ball.position.z, 1.28)
    : 0;
  if (nearOwnGoalScramble && ownGoalScramblePlayerCount >= 2) {
    game.ownGoalScrambleTimer = Math.min(2.2, (game.ownGoalScrambleTimer ?? 0) + dt * (1.2 + ownGoalScramblePlayerCount * 0.35));
  } else {
    game.ownGoalScrambleTimer = Math.max(0, (game.ownGoalScrambleTimer ?? 0) - dt * 3.2);
  }
  if ((game.ownGoalScrambleTimer ?? 0) > 0.16) {
    const emergencyDefender = getFootballClosestPriorityPlayer(
      teamPlayers[controllingTeam],
      game.ball.position.x,
      game.ball.position.z
    );
    if (emergencyDefender) {
      const emergencyClearX = THREE.MathUtils.clamp(
        game.ball.position.x + (Math.random() < 0.5 ? -1 : 1) * (6.8 + Math.random() * 5.8),
        -FOOTBALL_FIELD_HALF_WIDTH * 0.95,
        FOOTBALL_FIELD_HALF_WIDTH * 0.95
      );
      const emergencyClearZ = emergencyDefender.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.8 + Math.random() * 0.12));
      const clearDx = emergencyClearX - game.ball.position.x;
      const clearDz = emergencyClearZ - game.ball.position.z;
      emergencyDefender.runner.root.position.x = THREE.MathUtils.clamp(game.ball.position.x, -FOOTBALL_GOAL_WIDTH * 1.18, FOOTBALL_GOAL_WIDTH * 1.18);
      emergencyDefender.runner.root.position.z = THREE.MathUtils.clamp(game.ball.position.z - emergencyDefender.team * 0.24, -FOOTBALL_FIELD_HALF_LENGTH + 0.8, FOOTBALL_FIELD_HALF_LENGTH - 0.8);
      emergencyDefender.runner.root.rotation.y = Math.atan2(clearDx, clearDz);
      emergencyDefender.kickSide = getFootballFootedness(emergencyDefender, game.ball, emergencyClearX).kickSide;
      applyFootballKickContact(emergencyDefender, game.ball);
      setFootballBallVelocity(game, clearDx, clearDz, 12.8 + Math.random() * 3.6, 2 + Math.random() * 1.05);
      emergencyDefender.kickCooldown = 0.84;
      emergencyDefender.saveCooldown = Math.max(emergencyDefender.saveCooldown ?? 0, emergencyDefender.role === "keeper" ? 0.72 : 0.18);
      emergencyDefender.diveBlend = emergencyDefender.role === "keeper" ? Math.max(emergencyDefender.diveBlend ?? 0, 0.28) : (emergencyDefender.diveBlend ?? 0);
      emergencyDefender.saveLift = emergencyDefender.role === "keeper" ? Math.max(emergencyDefender.saveLift ?? 0, 0.16) : (emergencyDefender.saveLift ?? 0);
      emergencyDefender.saveHeight = emergencyDefender.role === "keeper" ? 0.42 : (emergencyDefender.saveHeight ?? 0.45);
      triggerFootballKickPose(emergencyDefender, game.ball, 1.1, emergencyClearX);
      registerBallTouch(game, emergencyDefender.team, emergencyDefender);
      game.ballHolder = null;
      game.deliveryType = null;
      game.deliveryTeam = 0;
      game.deliveryTimer = 0;
      game.deliverySource = null;
      game.deliveryTarget = null;
      game.sameTeamTouchCount = 0;
      game.ownGoalScrambleTimer = 0;
    }
  }

  if (controllingTeam !== game.lastControllingTeam) {
    // Possession changes are a cheap moment to seed a temporary counter runner.
    if (controllingTeam !== 0) {
      let bestCounter = null;
      let bestCounterScore = -Infinity;
      for (let i = 0; i < teamPlayers[controllingTeam].length; i += 1) {
        const mate = teamPlayers[controllingTeam][i];
        if (mate.role !== "attacker" || mate === closestToBall[controllingTeam]) continue;
        let nearestOpponent = 99;
        for (let j = 0; j < teamPlayers[-controllingTeam].length; j += 1) {
          const opp = teamPlayers[-controllingTeam][j];
          const dist = Math.hypot(mate.runner.root.position.x - opp.runner.root.position.x, mate.runner.root.position.z - opp.runner.root.position.z);
          nearestOpponent = Math.min(nearestOpponent, dist);
        }
        const widthScore = Math.abs(mate.home.x) * 0.42;
        const depthScore = mate.runner.root.position.z * controllingTeam * 0.36;
        const opennessScore = nearestOpponent * 0.9;
        const score = widthScore + depthScore + opennessScore;
        if (score > bestCounterScore) {
          bestCounterScore = score;
          bestCounter = mate;
        }
      }
      game.counterTeam = controllingTeam;
      game.counterTimer = bestCounter ? 3.2 : 0;
      game.counterRunner = bestCounter;
    } else {
      game.counterTeam = 0;
      game.counterTimer = 0;
      game.counterRunner = null;
    }
    game.lastControllingTeam = controllingTeam;
  }

  if (game.counterTimer > 0) {
    game.counterTimer = Math.max(0, game.counterTimer - dt);
    if (game.counterTimer === 0 || game.counterTeam !== controllingTeam) {
      game.counterTeam = 0;
      game.counterRunner = null;
    }
  }
  game.kickoffContestTimer = Math.max(0, (game.kickoffContestTimer ?? 0) - dt);

  if (game.deliveryTimer > 0) {
    game.deliveryTimer = Math.max(0, game.deliveryTimer - dt);
    if (game.deliveryTimer === 0 || (controllingTeam !== 0 && game.deliveryTeam !== controllingTeam)) {
      game.deliveryType = null;
      game.deliveryTeam = 0;
      game.deliverySource = null;
      game.deliveryTarget = null;
    }
  }
  for (let i = 0; i < game.players.length; i += 1) {
    game.players[i].counterRunBoost = game.counterTeam !== 0 && game.players[i] === game.counterRunner ? 1.35 : 0;
  }
}

// These short-lived timers gate first-touch, duel, and contested-ball behavior
// inside the player touch runtime.
export function updateFootballTransientTimersRuntime(game, dt) {
  game.firstTouchTimer = Math.max(0, (game.firstTouchTimer ?? 0) - dt);
  if ((game.firstTouchTimer ?? 0) <= 0.001) {
    game.firstTouchPlayer = null;
  }
  game.touchShieldTimer = Math.max(0, (game.touchShieldTimer ?? 0) - dt);
  if ((game.touchShieldTimer ?? 0) <= 0.001) {
    game.touchShieldPlayer = null;
  }
  game.duelControlTimer = Math.max(0, (game.duelControlTimer ?? 0) - dt);
  if ((game.duelControlTimer ?? 0) <= 0.001) {
    game.duelControlPlayer = null;
  }
  game.contestTouchTimer = Math.max(0, (game.contestTouchTimer ?? 0) - dt);
  game.contestOwnerTimer = Math.max(0, (game.contestOwnerTimer ?? 0) - dt);
  if ((game.contestOwnerTimer ?? 0) <= 0.001) {
    game.contestOwnerPlayer = null;
  }
  game.contestHardLockTimer = Math.max(0, (game.contestHardLockTimer ?? 0) - dt);
}

// If the ball dies in the goalmouth pocket for too long, force a defensive
// clearance so play does not stall indefinitely in front of goal.
export function updateFootballGoalmouthStallRuntime(game, dt, deps) {
  const {
    applyFootballKickContact,
    getFootballFootedness,
    registerBallTouch,
    setFootballBallVelocity,
    triggerFootballKickPose
  } = deps;

  const nearestGoalSide = Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH * 0.35 ? Math.sign(game.ball.position.z || 1) : 0;
  const nearestGoalZ = nearestGoalSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const goalPostPocketOffset = Math.abs(Math.abs(game.ball.position.x) - FOOTBALL_GOAL_WIDTH * 0.5);
  const inGoalmouthStallZone = nearestGoalSide !== 0
    && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.82
    && Math.abs(game.ball.position.z - nearestGoalZ) < 3.9
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.55;
  const inNearGoalDeadZone = nearestGoalSide !== 0
    && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.55
    && Math.abs(game.ball.position.z - nearestGoalZ) < 5.4
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.85;
  const inGoalSidePocket = nearestGoalSide !== 0
    && goalPostPocketOffset < 2.2
    && Math.abs(game.ball.position.z - nearestGoalZ) < 4.9
    && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT
    && game.ballVel.length() < 1.6;
  if (inGoalmouthStallZone || inNearGoalDeadZone || inGoalSidePocket) {
    const stallGain = inGoalSidePocket ? 2.1 : 1;
    game.goalmouthStallTimer = Math.min(2.2, (game.goalmouthStallTimer ?? 0) + dt * stallGain);
  } else {
    game.goalmouthStallTimer = Math.max(0, (game.goalmouthStallTimer ?? 0) - dt * 2.6);
  }
  const stallResolveThreshold = inGoalSidePocket ? 0.1 : 0.22;
  if ((game.goalmouthStallTimer ?? 0) <= stallResolveThreshold) return;

  const defendingTeam = -nearestGoalSide;
  const emergencyDefender = getFootballClosestPriorityPlayer(
    game.players,
    game.ball.position.x,
    game.ball.position.z,
    defendingTeam
  );
  if (!emergencyDefender) return;

  const emergencyClearX = THREE.MathUtils.clamp(
    game.ball.position.x + (Math.random() < 0.5 ? -1 : 1) * (6.2 + Math.random() * 5.4),
    -FOOTBALL_FIELD_HALF_WIDTH * 0.95,
    FOOTBALL_FIELD_HALF_WIDTH * 0.95
  );
  const emergencyClearZ = emergencyDefender.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.76 + Math.random() * 0.16));
  const clearDx = emergencyClearX - game.ball.position.x;
  const clearDz = emergencyClearZ - game.ball.position.z;
  emergencyDefender.runner.root.position.x = THREE.MathUtils.clamp(game.ball.position.x, -FOOTBALL_GOAL_WIDTH * 1.15, FOOTBALL_GOAL_WIDTH * 1.15);
  emergencyDefender.runner.root.position.z = THREE.MathUtils.clamp(game.ball.position.z - emergencyDefender.team * 0.22, -FOOTBALL_FIELD_HALF_LENGTH + 0.8, FOOTBALL_FIELD_HALF_LENGTH - 0.8);
  emergencyDefender.runner.root.rotation.y = Math.atan2(clearDx, clearDz);
  emergencyDefender.kickSide = getFootballFootedness(emergencyDefender, game.ball, emergencyClearX).kickSide;
  applyFootballKickContact(emergencyDefender, game.ball);
  setFootballBallVelocity(
    game,
    clearDx,
    clearDz,
    (inGoalSidePocket ? 12.4 : 10.6) + Math.random() * 3.4,
    (inGoalSidePocket ? 2.2 : 1.95) + Math.random() * 0.95
  );
  emergencyDefender.kickCooldown = 0.76;
  if (emergencyDefender.role === "keeper") {
    emergencyDefender.saveCooldown = 0.68;
    emergencyDefender.diveBlend = 0;
    emergencyDefender.saveLift = 0.16;
  }
  triggerFootballKickPose(emergencyDefender, game.ball, 1.08, emergencyClearX);
  registerBallTouch(game, emergencyDefender.team, emergencyDefender);
  game.ballHolder = null;
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  game.goalmouthStallTimer = 0;
}

// Give borderline bounces a moment to come back into play before starting a
// referee restart, but whistle quickly once the ball is clearly dead.
export function updateFootballOutOfBoundsRuntime(game, dt, kickoffLocked, startFootballRefRestart) {
  const ballOutsideField = !kickoffLocked
    && !game.goalPending
    && !game.refRestart?.active
    && (
      Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH
      || Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH
    );
  if (ballOutsideField) {
    game.outOfBoundsTimer = Math.min(3, (game.outOfBoundsTimer ?? 0) + dt);
  } else {
    game.outOfBoundsTimer = Math.max(0, (game.outOfBoundsTimer ?? 0) - dt * 3.5);
  }
  const ballClearlyOut = Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH + 0.12
    || Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH + 0.12;
  const deadBallOutOfPlay = ballOutsideField
    && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.08
    && game.ballVel.length() < 0.42;
  if (ballOutsideField && ballClearlyOut && (deadBallOutOfPlay || (game.outOfBoundsTimer ?? 0) > 1.1)) {
    startFootballRefRestart(game, game.ball.position.x, game.ball.position.z);
  }
}
