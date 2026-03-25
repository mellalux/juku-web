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

export function getFootballPlayerDerivedStateRuntime(context) {
  const {
    controllingTeam,
    game,
    p,
    teamLeader
  } = context;

  const ballProgress = game.ball.position.z * p.team;
  const ownHalfBias = THREE.MathUtils.clamp((-game.ball.position.z * p.team + 0.4) / 6.2, 0, 1);
  const ballSide = Math.abs(game.ball.position.x) < 1.2 ? 0 : Math.sign(game.ball.position.x);
  const isCounterRunner = game.counterTeam === p.team && game.counterRunner === p && game.counterTimer > 0;
  const attackerProfile = p.attackerProfile ?? null;
  const baseShotHunger = p.shotHunger ?? 0.75;
  const kickoffContestActive = (game.kickoffContestTimer ?? 0) > 0
    && Math.abs(game.ball.position.x) < FOOTBALL_CENTER_CIRCLE_RADIUS + 1.1
    && Math.abs(game.ball.position.z) < FOOTBALL_CENTER_CIRCLE_RADIUS + 1.4;
  const stallUrgency = THREE.MathUtils.clamp((game.stallTimer - 0.35) / 1.45, 0, 1);
  const teamIsStalling = game.stallTeam === p.team && stallUrgency > 0;
  const trapPress = game.stallTeam === -p.team && stallUrgency > 0.32;
  const shapeLiftBias = controllingTeam === p.team && teamIsStalling
    ? THREE.MathUtils.clamp((game.stallTimer - 0.6) / 1.85, 0, 1.35)
    : 0;
  const urgencyRunBias = shapeLiftBias * (p.role === "attacker" ? 0.24 : p.role === "defender" ? 0.12 : 0.16);
  const supportAttack = p.role === "defender" && controllingTeam === p.team && (teamIsStalling || (Math.abs(p.home.x) > 0.5 ? ballProgress > -2.4 || isCounterRunner : ballProgress > 0.7 || p === teamLeader || isCounterRunner));
  const recoverDefence = p.role === "attacker" && controllingTeam !== p.team && ownHalfBias > 0.42 && !trapPress;
  const tacticalRole = p.role === "keeper" ? "keeper" : supportAttack ? "supportAttack" : recoverDefence ? "recoverDefence" : p.role;

  return {
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
  };
}
export function prepareFootballPlayerFrameRuntime(context) {
  const {
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
  } = context;

  p.attackLane = "hold";
  p.kickCooldown = Math.max(0, p.kickCooldown - dt);
  p.kickBlend = Math.max(0, (p.kickBlend ?? 0) - dt * 6.4);
  p.bangerCooldown = Math.max(0, (p.bangerCooldown ?? 0) - dt);
  p.burstTimer = Math.max(0, (p.burstTimer ?? 0) - dt);
  p.burstCooldown = Math.max(0, (p.burstCooldown ?? 0) - dt);
  p.goalRunTimer = Math.max(0, (p.goalRunTimer ?? 0) - dt);
  p.goalRunCooldown = Math.max(0, (p.goalRunCooldown ?? 0) - dt);
  p.oneTwoTimer = Math.max(0, (p.oneTwoTimer ?? 0) - dt);
  p.oneTwoCooldown = Math.max(0, (p.oneTwoCooldown ?? 0) - dt);
  p.oneTwoReturnTimer = Math.max(0, (p.oneTwoReturnTimer ?? 0) - dt);
  p.commitForwardTimer = Math.max(0, (p.commitForwardTimer ?? 0) - dt);
  if ((p.oneTwoTimer ?? 0) <= 0.001) p.oneTwoPartner = null;
  if ((p.oneTwoReturnTimer ?? 0) <= 0.001) p.oneTwoReturnTarget = null;

  p.nextShuffle -= dt;
  if (p.nextShuffle <= 0) {
    p.nextShuffle = 0.55 + Math.random() * 1.45;
    p.roamX = THREE.MathUtils.clamp(p.roamX + (Math.random() - 0.5) * (tacticalRole === "attacker" || tacticalRole === "supportAttack" ? 0.9 : 0.5), -2.4, 2.4);
    p.roamZ = THREE.MathUtils.clamp(p.roamZ + (Math.random() - 0.5) * (tacticalRole === "attacker" || tacticalRole === "supportAttack" ? 0.72 : 0.4), -1.6, 1.6);
    p.pressBias = THREE.MathUtils.clamp(p.pressBias + (Math.random() - 0.5) * 0.18, tacticalRole === "attacker" ? 0.78 : 0.54, tacticalRole === "attacker" ? 1.42 : 1.2);
  }
  if (p.burstCooldown <= 0) {
    const burstChance = p.role === "attacker" ? 0.82 : p.role === "defender" ? 0.58 : 0.28;
    if (Math.random() < burstChance) {
      p.burstTimer = 0.42 + Math.random() * 0.82;
    }
    p.burstCooldown = 0.8 + Math.random() * 1.8;
  }

  const toBallX = game.ball.position.x - p.runner.root.position.x;
  const toBallZ = game.ball.position.z - p.runner.root.position.z;
  const ballDist = Math.hypot(toBallX, toBallZ);
  const isDeliveryTarget = game.deliveryType === "pass" && game.deliveryTeam === p.team && game.deliveryTimer > 0 && game.deliveryTarget === p;
  let nearestOpponentToPlayer = 99;
  let nearestFrontMarker = 99;
  let runLaneTraffic = 0;
  for (let j = 0; j < opponents.length; j += 1) {
    const opp = opponents[j];
    if (opp.role === "keeper") continue;
    const relX = opp.runner.root.position.x - p.runner.root.position.x;
    const relZ = (opp.runner.root.position.z - p.runner.root.position.z) * p.team;
    const oppDist = Math.hypot(relX, relZ);
    nearestOpponentToPlayer = Math.min(nearestOpponentToPlayer, oppDist);
    if (relZ > -0.35 && relZ < 7.2 && Math.abs(relX) < 1.9) {
      nearestFrontMarker = Math.min(nearestFrontMarker, relZ);
      runLaneTraffic += (1 - Math.min(1, Math.abs(relX) / 1.9)) * (1 - Math.min(1, relZ / 7.2));
    }
  }

  if (p.role === "attacker") {
    if (controllingTeam !== p.team || activeBallPlayer === p || isDeliveryTarget) {
      p.goalRunTimer = Math.max(0, p.goalRunTimer - dt * 3.2);
    } else {
      const attackDepth = p.runner.root.position.z * p.team;
      const goalGap = attackGoalZ * p.team - attackDepth;
      const laneSign = p.home.x === 0 ? Math.sign(p.laneBias || 1) : Math.sign(p.home.x);
      const carrier = game.ballHolder && game.ballHolder.team === p.team ? game.ballHolder : closestToBall[p.team];
      const carrierX = carrier ? carrier.runner.root.position.x : game.ball.position.x;
      const runWindow = goalGap > 2.6 && goalGap < 11.8 && ballDist > 2.4 && ballDist < 10.5;
      const attackFreedom = nearestOpponentToPlayer > 1.55 && nearestFrontMarker > 1.1 && runLaneTraffic < 1.05;
      if (p.goalRunTimer <= 0 && p.goalRunCooldown <= 0 && runWindow && attackFreedom) {
        const runSide = laneSign === 0 ? Math.sign((p.runner.root.position.x - carrierX) || p.laneBias || 1) : laneSign;
        const startWide = attackerProfile === "runner" ? 2.05 : attackerProfile === "poacher" ? 1.15 : 0.82;
        p.goalRunTargetX = THREE.MathUtils.clamp(
          THREE.MathUtils.lerp(p.runner.root.position.x, runSide * startWide + carrierX * 0.12, attackerProfile === "playmaker" ? 0.32 : attackerProfile === "runner" ? 0.72 : 0.6),
          -FOOTBALL_FIELD_HALF_WIDTH + 0.85,
          FOOTBALL_FIELD_HALF_WIDTH - 0.85
        );
        p.goalRunTargetZ = THREE.MathUtils.clamp(
          attackGoalZ - p.team * ((attackerProfile === "poacher" ? 1.05 : attackerProfile === "runner" ? 1.35 : 2.05) + Math.random() * 0.8),
          -FOOTBALL_FIELD_HALF_LENGTH + 0.85,
          FOOTBALL_FIELD_HALF_LENGTH - 0.5
        );
        p.goalRunTimer = 1.1 + Math.random() * 1.15 + Math.min(0.45, p.pressBias * 0.18);
        p.goalRunCooldown = 2.4 + Math.random() * 2.4;
      }
    }
  }

  if (p.nameTag) {
    const cameraDist = cameraWorldPos.distanceTo(p.runner.root.position);
    const nearBallFade = THREE.MathUtils.clamp((8.6 - ballDist) / 4.4, 0, 1);
    const cameraFade = THREE.MathUtils.clamp((52 - cameraDist) / 26, 0.56, 1);
    const holderBoost = game.ballHolder === p ? 1 : 0;
    const baseOpacity = 0.72 + 0.2 * nearBallFade;
    const labelOpacity = THREE.MathUtils.clamp((baseOpacity + holderBoost * 0.2) * cameraFade, 0, 1);
    p.nameTag.visible = labelOpacity > 0.08;
    p.nameTag.material.opacity = labelOpacity;
  }

  return {
    ballDist,
    isDeliveryTarget,
    roamX: p.home.x + p.roamX,
    roamZ: p.home.z + p.roamZ
  };
}
