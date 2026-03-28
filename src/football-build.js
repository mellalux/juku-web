import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_HEIGHT,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_PLAYER_COUNT,
  TRACK_100M_START_X,
  TRACK_FINISH_X,
  TRACK_HURDLE_COUNT,
  TRACK_HURDLE_SCALE,
  TRACK_LANE_COUNT,
  TRACK_RACE_DIRECTION,
  TRACK_RACE_START_PROGRESS,
  TRACK_RUNNER_COUNT
} from "./game-config.js";
import {
  getFootballSpeedProfileModifiers,
  getFootballTraitModifiers
} from "./football-helpers.js";
import {
  DEFAULT_WORLD_CHARACTER_DATA,
  normalizeWorldCharacterData
} from "./world-character-data.js";
import { getFootballPerimeterTFromPoint } from "./football-referee-runtime.js";
import {
  makeFootballNameTag,
  makeFootballNumberPatch
} from "./football-ui-build.js";
import { addPart } from "./humanoid-build.js";
import {
  commitInstancedMesh,
  createInstancedMesh,
  createStaticInstancedMesh,
  setAnchoredInstanceTransform
} from "./instanced-build.js";
import {
  applyStripedShirtToTorso,
  buildRunner,
  scaleRunner
} from "./runner-system.js";
import {
  getSharedBoxGeometry,
  getSharedPlaneGeometry,
  getSharedSphereGeometry
} from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";
import { getTrackLaneLength, getTrackPointAtProgress } from "./track-system.js";

const FOOTBALL_GOAL_HALF_WIDTH = FOOTBALL_GOAL_WIDTH * 0.5;
const FOOTBALL_GOAL_POST_MATERIAL = getSharedStandardMaterial(0xf8fafc);
const FOOTBALL_MATCH_BALL_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xf7f7f4, roughness: 0.45 });
const FOOTBALL_CARRY_BALL_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xf7fafc, roughness: 0.72 });
const FOOTBALL_GOAL_BACK_NET_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdbeafe,
  roughness: 0.95,
  transparent: true,
  opacity: 0.62,
  side: THREE.DoubleSide,
  emissive: new THREE.Color(0xbfe2ff),
  emissiveIntensity: 0.22
});
const FOOTBALL_GOAL_TOP_NET_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdbeafe,
  roughness: 0.95,
  transparent: true,
  opacity: 0.36,
  side: THREE.DoubleSide
});
const FOOTBALL_GOAL_SIDE_NET_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdbeafe,
  roughness: 0.95,
  transparent: true,
  opacity: 0.42,
  side: THREE.DoubleSide
});
const FOOTBALL_HURDLE_LEFT_OFFSET = new THREE.Vector3(-0.31, 0.17, 0);
const FOOTBALL_HURDLE_RIGHT_OFFSET = new THREE.Vector3(0.31, 0.17, 0);
const FOOTBALL_HURDLE_BAR_OFFSET = new THREE.Vector3(0, 0.335, 0);
const FOOTBALL_GOAL_COLLIDER_WORLD = new THREE.Vector3();
const FOOTBALL_GOAL_POST_COLLIDER_RADIUS = 0.11;
const FOOTBALL_GOAL_NET_COLLIDER_THICKNESS = 0.08;
const FOOTBALL_GOAL_POST_TRANSFORMS = [
  { position: new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, 0) },
  { position: new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, 0) },
  { position: new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH) },
  { position: new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH) }
];
const FOOTBALL_GOAL_CROSSBAR_TRANSFORM = {
  position: new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT, 0)
};
const FOOTBALL_GOAL_DEPTH_BAR_TRANSFORMS = [
  { position: new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5) },
  { position: new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5) }
];
const FOOTBALL_GOAL_BACK_NET_TRANSFORM = {
  position: new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH)
};
const FOOTBALL_GOAL_TOP_NET_TRANSFORM = {
  position: new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5),
  rotation: new THREE.Euler(-Math.PI / 2, 0, 0)
};
const FOOTBALL_GOAL_SIDE_NET_TRANSFORMS = [
  {
    position: new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH * 0.5),
    rotation: new THREE.Euler(0, Math.PI / 2, 0)
  },
  {
    position: new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH * 0.5),
    rotation: new THREE.Euler(0, -Math.PI / 2, 0)
  }
];
const FOOTBALL_GOAL_POST_COLLIDER_POINTS = [
  new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, 0, 0),
  new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, 0, 0),
  new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, 0, FOOTBALL_GOAL_DEPTH),
  new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, 0, FOOTBALL_GOAL_DEPTH)
];
const FOOTBALL_GOAL_BACK_NET_COLLIDER = {
  position: new THREE.Vector3(0, 0, FOOTBALL_GOAL_DEPTH),
  halfX: FOOTBALL_GOAL_HALF_WIDTH - FOOTBALL_GOAL_NET_COLLIDER_THICKNESS,
  halfZ: FOOTBALL_GOAL_NET_COLLIDER_THICKNESS
};
const FOOTBALL_GOAL_SIDE_NET_COLLIDERS = [
  {
    position: new THREE.Vector3(-FOOTBALL_GOAL_HALF_WIDTH, 0, FOOTBALL_GOAL_DEPTH * 0.5),
    halfX: FOOTBALL_GOAL_NET_COLLIDER_THICKNESS,
    halfZ: FOOTBALL_GOAL_DEPTH * 0.5 - FOOTBALL_GOAL_NET_COLLIDER_THICKNESS
  },
  {
    position: new THREE.Vector3(FOOTBALL_GOAL_HALF_WIDTH, 0, FOOTBALL_GOAL_DEPTH * 0.5),
    halfX: FOOTBALL_GOAL_NET_COLLIDER_THICKNESS,
    halfZ: FOOTBALL_GOAL_DEPTH * 0.5 - FOOTBALL_GOAL_NET_COLLIDER_THICKNESS
  }
];

function pushAnchoredFootballInstances(target, anchorMatrix, transforms) {
  for (let i = 0; i < transforms.length; i += 1) {
    const transform = transforms[i];
    target.push({
      anchorMatrix,
      position: transform.position,
      rotation: transform.rotation
    });
  }
}

function pushGoalPhysicalColliders(colliders, goal) {
  for (let i = 0; i < FOOTBALL_GOAL_POST_COLLIDER_POINTS.length; i += 1) {
    const world = goal.localToWorld(FOOTBALL_GOAL_COLLIDER_WORLD.copy(FOOTBALL_GOAL_POST_COLLIDER_POINTS[i]));
    colliders.push({
      type: "circle",
      role: "goalFrame",
      x: world.x,
      z: world.z,
      r: FOOTBALL_GOAL_POST_COLLIDER_RADIUS
    });
  }

  const backNetWorld = goal.localToWorld(FOOTBALL_GOAL_COLLIDER_WORLD.copy(FOOTBALL_GOAL_BACK_NET_COLLIDER.position));
  colliders.push({
    type: "obb",
    role: "goalNet",
    x: backNetWorld.x,
    z: backNetWorld.z,
    halfX: FOOTBALL_GOAL_BACK_NET_COLLIDER.halfX,
    halfZ: FOOTBALL_GOAL_BACK_NET_COLLIDER.halfZ,
    yaw: goal.rotation.y
  });

  for (let i = 0; i < FOOTBALL_GOAL_SIDE_NET_COLLIDERS.length; i += 1) {
    const sideNet = FOOTBALL_GOAL_SIDE_NET_COLLIDERS[i];
    const world = goal.localToWorld(FOOTBALL_GOAL_COLLIDER_WORLD.copy(sideNet.position));
    colliders.push({
      type: "obb",
      role: "goalNet",
      x: world.x,
      z: world.z,
      halfX: sideNet.halfX,
      halfZ: sideNet.halfZ,
      yaw: goal.rotation.y
    });
  }
}

export function buildFootballGame(teamData = null) {
  const resolvedTeamData = teamData?.red && teamData?.blue
    ? teamData
    : normalizeWorldCharacterData(teamData ?? DEFAULT_WORLD_CHARACTER_DATA);
  const refereeInfo = resolvedTeamData.referee ?? DEFAULT_WORLD_CHARACTER_DATA.referee;
  const trackRunnerData = Array.isArray(resolvedTeamData.trackRunners) && resolvedTeamData.trackRunners.length > 0
    ? resolvedTeamData.trackRunners
    : DEFAULT_WORLD_CHARACTER_DATA.trackRunners;
  const group = new THREE.Group();

  const ball = new THREE.Mesh(
    getSharedSphereGeometry(FOOTBALL_BALL_RADIUS, 16, 12),
    FOOTBALL_MATCH_BALL_MATERIAL
  );
  ball.position.set(0, FOOTBALL_BALL_RADIUS, 0);
  ball.castShadow = true;
  ball.receiveShadow = true;
  group.add(ball);

  const goals = [];
  const colliders = [];
  const goalPostInstances = [];
  const goalCrossbarInstances = [];
  const goalDepthBarInstances = [];
  const goalBackNetInstances = [];
  const goalTopNetInstances = [];
  const goalSideNetInstances = [];
  [-1, 1].forEach((side) => {
    const goal = new THREE.Group();
    const goalZ = side * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);

    goal.position.set(0, 0.02, goalZ);
    if (side < 0) goal.rotation.y = Math.PI;
    group.add(goal);
    goal.updateMatrixWorld(true);
    const anchorMatrix = goal.matrixWorld;

    pushAnchoredFootballInstances(goalPostInstances, anchorMatrix, FOOTBALL_GOAL_POST_TRANSFORMS);
    goalCrossbarInstances.push({
      anchorMatrix,
      position: FOOTBALL_GOAL_CROSSBAR_TRANSFORM.position
    });
    pushAnchoredFootballInstances(goalDepthBarInstances, anchorMatrix, FOOTBALL_GOAL_DEPTH_BAR_TRANSFORMS);
    goalBackNetInstances.push({
      anchorMatrix,
      position: FOOTBALL_GOAL_BACK_NET_TRANSFORM.position
    });
    goalTopNetInstances.push({
      anchorMatrix,
      position: FOOTBALL_GOAL_TOP_NET_TRANSFORM.position,
      rotation: FOOTBALL_GOAL_TOP_NET_TRANSFORM.rotation
    });
    pushAnchoredFootballInstances(goalSideNetInstances, anchorMatrix, FOOTBALL_GOAL_SIDE_NET_TRANSFORMS);

    pushGoalPhysicalColliders(colliders, goal);
    goals.push(goal);
  });

  group.add(
    createStaticInstancedMesh({
      geometry: getSharedBoxGeometry(0.08, FOOTBALL_GOAL_HEIGHT, 0.08),
      material: FOOTBALL_GOAL_POST_MATERIAL,
      instances: goalPostInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedBoxGeometry(FOOTBALL_GOAL_WIDTH + 0.12, 0.09, 0.09),
      material: FOOTBALL_GOAL_POST_MATERIAL,
      instances: goalCrossbarInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedBoxGeometry(0.08, 0.08, FOOTBALL_GOAL_DEPTH),
      material: FOOTBALL_GOAL_POST_MATERIAL,
      instances: goalDepthBarInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedPlaneGeometry(FOOTBALL_GOAL_WIDTH, FOOTBALL_GOAL_HEIGHT),
      material: FOOTBALL_GOAL_BACK_NET_MATERIAL,
      instances: goalBackNetInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedPlaneGeometry(FOOTBALL_GOAL_WIDTH, FOOTBALL_GOAL_DEPTH),
      material: FOOTBALL_GOAL_TOP_NET_MATERIAL,
      instances: goalTopNetInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedPlaneGeometry(FOOTBALL_GOAL_DEPTH, FOOTBALL_GOAL_HEIGHT),
      material: FOOTBALL_GOAL_SIDE_NET_MATERIAL,
      instances: goalSideNetInstances
    })
  );

  const refereeRunner = scaleRunner(buildRunner({
    shirt: refereeInfo.colors.shirt,
    shorts: refereeInfo.colors.shorts,
    shoe: refereeInfo.colors.shoe,
    hair: refereeInfo.colors.hair,
    hairStyle: refereeInfo.hairStyle,
    runnerStyle: "athlete"
  }));
  refereeRunner.root.position.set(FOOTBALL_FIELD_HALF_WIDTH + 1.15, refereeRunner.baseY, -3.4);
  refereeRunner.root.rotation.y = THREE.MathUtils.degToRad(-90);
  applyStripedShirtToTorso(refereeRunner.torsoPivot, refereeInfo.colors.shirt, refereeInfo.colors.stripe);
  const whistle = addPart(
    refereeRunner.leftArmRig.handPivot,
    getSharedBoxGeometry(0.05, 0.022, 0.016),
    refereeInfo.colors.whistle,
    new THREE.Vector3(0.016, -0.026, 0.094),
    new THREE.Euler(0.18, 0, 0)
  );
  const yellowCard = new THREE.Mesh(
    getSharedBoxGeometry(0.088, 0.118, 0.01),
    new THREE.MeshStandardMaterial({ color: refereeInfo.colors.yellowCard, roughness: 0.48, transparent: true, opacity: 0 })
  );
  yellowCard.position.set(0.02, -0.024, 0.09);
  yellowCard.visible = false;
  refereeRunner.rightArmRig.handPivot.add(yellowCard);
  const redCard = new THREE.Mesh(
    getSharedBoxGeometry(0.088, 0.118, 0.01),
    new THREE.MeshStandardMaterial({ color: refereeInfo.colors.redCard, roughness: 0.48, transparent: true, opacity: 0 })
  );
  redCard.position.set(0.02, -0.024, 0.078);
  redCard.visible = false;
  refereeRunner.rightArmRig.handPivot.add(redCard);
  const carryBall = new THREE.Mesh(
    getSharedSphereGeometry(FOOTBALL_BALL_RADIUS * 0.92, 18, 14),
    FOOTBALL_CARRY_BALL_MATERIAL
  );
  carryBall.visible = false;
  refereeRunner.leftArmRig.handPivot.add(carryBall);
  carryBall.position.set(0.02, -0.02, 0.12);
  const refereeNameTag = makeFootballNameTag(
    refereeInfo.name,
    refereeInfo.ui.nameTagBackground,
    refereeInfo.ui.nameTagText
  );
  refereeNameTag.position.set(0, 4.12, 0);
  refereeNameTag.material.opacity = 0.52;
  refereeRunner.root.add(refereeNameTag);
  group.add(refereeRunner.root);
  const coach = {
    runner: refereeRunner,
    label: refereeNameTag,
    vx: 0,
    vz: 0,
    targetX: 0,
    targetZ: -3.4,
    routeWaypoint: null,
    sidelineOffset: FOOTBALL_FIELD_HALF_WIDTH + 1.15,
    perimeterOffset: 1.15,
    perimeterT: getFootballPerimeterTFromPoint(FOOTBALL_FIELD_HALF_WIDTH + 1.15, -3.4, 1.15),
    cycle: Math.random() * Math.PI * 2,
    whistle,
    yellowCard,
    redCard,
    carryBall,
    whistleTimer: 0,
    cardTimer: 0,
    cardCooldown: 1.2,
    crowdTimer: 0,
    cardColor: "yellow",
    lastBallHolder: null,
    lastControllingTeam: 0,
    carryBlend: 0
  };

  const players = [];
  const perTeam = FOOTBALL_PLAYER_COUNT / 2;
  const homeXByLane = [0, -FOOTBALL_FIELD_HALF_WIDTH * 0.42, FOOTBALL_FIELD_HALF_WIDTH * 0.42, -FOOTBALL_FIELD_HALF_WIDTH * 0.58, 0, FOOTBALL_FIELD_HALF_WIDTH * 0.58];
  for (let i = 0; i < FOOTBALL_PLAYER_COUNT; i += 1) {
    const team = i < perTeam ? 1 : -1;
    const teamSlot = team === 1 ? "red" : "blue";
    const teamInfo = resolvedTeamData[teamSlot];
    const teamRoster = teamInfo.players;
    const lane = i % perTeam;
    const rosterEntry = teamRoster[lane];
    const role = rosterEntry.role;
    const homeX = rosterEntry.homeX ?? (homeXByLane[lane] ?? 0);
    const defaultHomeZ = role === "keeper"
      ? -team * (FOOTBALL_FIELD_HALF_LENGTH - 2.35)
      : role === "defender"
        ? -team * (FOOTBALL_FIELD_HALF_LENGTH * 0.44 - Math.abs(homeX) * 0.05) + (Math.random() - 0.5) * 0.8
        : -team * (FOOTBALL_FIELD_HALF_LENGTH * 0.22 - Math.abs(homeX) * 0.04) + (Math.random() - 0.5) * 1.1;
    const homeZ = rosterEntry.homeZ ?? defaultHomeZ;
    const runner = scaleRunner(buildRunner({
      shirt: teamInfo.colors.primary,
      shorts: teamInfo.colors.secondary,
      shoe: teamInfo.colors.shoe,
      hair: rosterEntry.hairColor,
      hairStyle: rosterEntry.hairStyle,
      runnerStyle: "athlete"
    }));
    runner.athleteKneeLift = rosterEntry.speedProfile === "sprinter"
      ? 1.06
      : rosterEntry.speedProfile === "fast"
        ? 0.98
        : rosterEntry.speedProfile === "slow"
          ? 0.84
          : 0.9;
    runner.root.position.set(homeX, runner.baseY, homeZ);
    const nameTag = makeFootballNameTag(
      `${rosterEntry.number} - ${rosterEntry.name}`,
      teamInfo.ui.nameTagBackground,
      teamInfo.ui.nameTagText
    );
    nameTag.position.set(0, 4.18, 0);
    runner.root.add(nameTag);
    const frontNumber = makeFootballNumberPatch(
      String(rosterEntry.number),
      teamInfo.ui.numberPatchBackground,
      teamInfo.ui.numberPatchText
    );
    frontNumber.position.set(0, 0.19, 0.285);
    runner.torsoPivot.add(frontNumber);
    const backNumber = makeFootballNumberPatch(
      String(rosterEntry.number),
      teamInfo.ui.numberPatchBackground,
      teamInfo.ui.numberPatchText
    );
    backNumber.position.set(0, 0.19, -0.24);
    backNumber.rotation.y = Math.PI;
    runner.torsoPivot.add(backNumber);
    group.add(runner.root);
    const attackerProfile = role === "attacker"
      ? rosterEntry.attackProfile ?? (Math.abs(homeX) < 0.4
        ? "poacher"
        : homeX < 0
          ? "playmaker"
          : "runner")
      : null;
    const traitModifiers = getFootballTraitModifiers(rosterEntry.trait, role);
    const speedProfileModifiers = getFootballSpeedProfileModifiers(rosterEntry.speedProfile);
    const shotHunger = (role === "attacker"
      ? attackerProfile === "poacher"
        ? 1.28 + Math.random() * 0.22
        : attackerProfile === "runner"
          ? 1.08 + Math.random() * 0.2
          : 0.84 + Math.random() * 0.16
      : role === "defender"
        ? 0.38 + Math.random() * 0.18
        : 0.18 + Math.random() * 0.12) + traitModifiers.shotHunger;
    const basePressBias = role === "attacker" ? 0.86 + Math.random() * 0.48 : role === "defender" ? 0.72 + Math.random() * 0.3 : 0.58 + Math.random() * 0.2;
    const baseSpeedBias = role === "attacker" ? 1.02 + Math.random() * 0.34 : role === "defender" ? 0.94 + Math.random() * 0.28 : 0.84 + Math.random() * 0.18;
    const baseBurstBoost = role === "attacker" ? 0.18 + Math.random() * 0.08 : role === "defender" ? 0.12 + Math.random() * 0.08 : 0.06 + Math.random() * 0.05;
    const baseBangerBias = role === "attacker"
      ? (attackerProfile === "poacher" ? 0.82 : attackerProfile === "runner" ? 0.68 : 0.52) + Math.random() * 0.22
      : role === "defender"
        ? 0.22 + Math.random() * 0.16
        : 0.08 + Math.random() * 0.08;
    players.push({
      runner,
      team,
      teamName: teamInfo.id,
      teamDisplayName: teamInfo.name,
      shirtNumber: rosterEntry.number,
      displayName: rosterEntry.name,
      positionLabel: rosterEntry.positionLabel,
      preferredFoot: rosterEntry.preferredFoot,
      trait: rosterEntry.trait,
      speedProfile: rosterEntry.speedProfile,
      goalsScored: 0,
      nameTag,
      home: new THREE.Vector3(homeX, 0, homeZ),
      homeYaw: team === 1 ? 0 : Math.PI,
      vx: 0,
      vz: 0,
      cycle: Math.random() * Math.PI * 2,
      kickCooldown: Math.random() * 0.8,
      kickBlend: 0,
      kickSide: rosterEntry.preferredFoot === "left" ? 1 : -1,
      role,
      attackerProfile,
      shotHunger,
      roamX: role === "attacker" ? (Math.random() - 0.5) * 1.9 : (Math.random() - 0.5) * 1.1,
      roamZ: role === "attacker" ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.5) * 0.8,
      laneBias: homeX * 0.34 + (Math.random() - 0.5) * 0.24,
      pressBias: basePressBias + traitModifiers.pressBias,
      speedBias: baseSpeedBias + traitModifiers.speedBias + speedProfileModifiers.speedBias,
      paceVariance: role === "attacker" ? 0.82 + Math.random() * 0.42 : role === "defender" ? 0.86 + Math.random() * 0.32 : 0.9 + Math.random() * 0.22,
      strideRate: rosterEntry.speedProfile === "sprinter" ? 1.14 : rosterEntry.speedProfile === "fast" ? 1.07 : rosterEntry.speedProfile === "slow" ? 0.94 : 1,
      tempoPhase: Math.random() * Math.PI * 2,
      tempoRate: 0.85 + Math.random() * 0.65,
      tempoJitter: 0.92 + Math.random() * 0.2,
      burstTimer: Math.random() * 0.35,
      burstCooldown: 0.45 + Math.random() * 1.25,
      burstBoost: baseBurstBoost + traitModifiers.burstBoost + speedProfileModifiers.burstBoost,
      passVision: traitModifiers.passVision,
      tackleBias: traitModifiers.tackleBias,
      saveReach: traitModifiers.saveReach,
      shotPowerBias: traitModifiers.shotPower,
      shotAccuracyBias: traitModifiers.shotAccuracy,
      bangerBias: Math.max(0, baseBangerBias + (traitModifiers.shotPower ?? 0) * 0.42 + (traitModifiers.shotAccuracy ?? 0) * 0.16),
      bangerCooldown: 1.8 + Math.random() * 4.5,
      crossQualityBias: traitModifiers.crossQuality,
      dribbleBias: traitModifiers.dribbleBias,
      sprintBlend: 0,
      breakRunBias: role === "attacker"
        ? (attackerProfile === "runner" ? 1.25 : attackerProfile === "poacher" ? 1.12 : 0.94) + Math.random() * 0.18
        : 0,
      goalRunTimer: 0,
      goalRunCooldown: 0.8 + Math.random() * 2.2,
      goalRunTargetX: homeX,
      goalRunTargetZ: homeZ,
      oneTwoTimer: 0,
      oneTwoCooldown: 0,
      oneTwoTargetX: homeX,
      oneTwoTargetZ: homeZ,
      oneTwoPartner: null,
      oneTwoReturnTimer: 0,
      oneTwoReturnTarget: null,
      saveCooldown: 0,
      saveLift: 0,
      saveHeight: 0.45,
      diveDir: 0,
      diveBlend: 0,
      commitForwardTimer: 0,
      commitTargetX: homeX,
      commitTargetZ: homeZ,
      routeWaypoint: null,
      shapeTargetX: homeX,
      shapeTargetZ: homeZ,
      nextShuffle: 0.55 + Math.random() * 1.25
    });
  }

  const trackRunners = [];
  const innerLaneLength = getTrackLaneLength(0);
  for (let i = 0; i < TRACK_RUNNER_COUNT; i += 1) {
    const runnerEntry = trackRunnerData[i] ?? DEFAULT_WORLD_CHARACTER_DATA.trackRunners[i];
    const runner = scaleRunner(buildRunner({
      shirt: runnerEntry.colors.shirt,
      shorts: runnerEntry.colors.shorts,
      shoe: runnerEntry.colors.shoe,
      hair: runnerEntry.colors.hair,
      hairStyle: runnerEntry.hairStyle,
      runnerStyle: "athlete"
    }));
    const laneIndex = i % TRACK_LANE_COUNT;
    const progress = TRACK_RACE_START_PROGRESS;
    const point = getTrackPointAtProgress(laneIndex, progress);
    const dir = TRACK_RACE_DIRECTION;
    const speed = runnerEntry.speed + Math.random() * runnerEntry.speedVariance;
    runner.root.position.set(point.x, runner.baseY, point.z);
    runner.root.rotation.y = Math.atan2(point.dirX * dir, point.dirZ * dir);
    group.add(runner.root);
    trackRunners.push({
      displayName: runnerEntry.name,
      runner,
      homeLaneIndex: laneIndex,
      laneIndex,
      targetLaneIndex: laneIndex,
      dir,
      progress,
      speed,
      currentSpeed: speed,
      speedPhase: Math.random() * Math.PI * 2,
      cycle: Math.random() * Math.PI * 2,
      jumpY: 0,
      jumpVel: 0,
      jumpCooldown: 0.18 + Math.random() * 0.22
    });
  }

  const hurdles = [];
  const hurdleSpacing = innerLaneLength / Math.max(1, TRACK_HURDLE_COUNT);
  const hurdleProgresses = [];
  const hurdleInstanceCount = TRACK_HURDLE_COUNT * TRACK_LANE_COUNT;
  const hurdleVisuals = {
    leftLegs: createInstancedMesh({
      geometry: getSharedBoxGeometry(0.06, 0.34, 0.06),
      material: getSharedStandardMaterial(0xf3f4f6),
      count: hurdleInstanceCount
    }),
    rightLegs: createInstancedMesh({
      geometry: getSharedBoxGeometry(0.06, 0.34, 0.06),
      material: getSharedStandardMaterial(0xf3f4f6),
      count: hurdleInstanceCount
    }),
    bars: createInstancedMesh({
      geometry: getSharedBoxGeometry(0.74, 0.065, 0.065),
      material: getSharedStandardMaterial(0xcf3f4f),
      count: hurdleInstanceCount
    }),
    leftOffset: FOOTBALL_HURDLE_LEFT_OFFSET,
    rightOffset: FOOTBALL_HURDLE_RIGHT_OFFSET,
    barOffset: FOOTBALL_HURDLE_BAR_OFFSET
  };
  for (let i = 0; i < TRACK_HURDLE_COUNT; i += 1) {
    hurdleProgresses.push(
      ((TRACK_RACE_START_PROGRESS - hurdleSpacing * (i + 0.5)) % innerLaneLength + innerLaneLength) % innerLaneLength
    );
  }
  let hurdleIndex = 0;
  for (let laneIndex = 0; laneIndex < TRACK_LANE_COUNT; laneIndex += 1) {
    for (let i = 0; i < hurdleProgresses.length; i += 1) {
      const progress = hurdleProgresses[i];
      const hurdlePoint = getTrackPointAtProgress(laneIndex, progress);
      const hurdle = new THREE.Group();

      hurdle.position.set(hurdlePoint.x, 0.015, hurdlePoint.z);
      hurdle.rotation.y = Math.atan2(hurdlePoint.dirX, hurdlePoint.dirZ);
      hurdle.scale.setScalar(TRACK_HURDLE_SCALE);
      group.add(hurdle);
      setAnchoredInstanceTransform(hurdleVisuals.leftLegs, hurdleIndex, hurdle, { position: FOOTBALL_HURDLE_LEFT_OFFSET });
      setAnchoredInstanceTransform(hurdleVisuals.rightLegs, hurdleIndex, hurdle, { position: FOOTBALL_HURDLE_RIGHT_OFFSET });
      setAnchoredInstanceTransform(hurdleVisuals.bars, hurdleIndex, hurdle, { position: FOOTBALL_HURDLE_BAR_OFFSET });
      const collider = { type: "obb", x: hurdle.position.x, z: hurdle.position.z, halfX: 0.46 * TRACK_HURDLE_SCALE, halfZ: 0.12 * TRACK_HURDLE_SCALE, yaw: hurdle.rotation.y };
      colliders.push(collider);
      hurdles.push({
        index: hurdleIndex,
        laneIndex,
        progress,
        mesh: hurdle,
        collider,
        fallen: false,
        fallProgress: 0,
        resetTimer: 0,
        tipDir: 0,
        baseY: 0.015,
        baseHalfX: 0.46 * TRACK_HURDLE_SCALE,
        baseHalfZ: 0.12 * TRACK_HURDLE_SCALE,
        barCenterY: 0.015 + 0.335 * TRACK_HURDLE_SCALE,
        barHalfHeight: 0.0325 * TRACK_HURDLE_SCALE,
        barHalfWidth: 0.37 * TRACK_HURDLE_SCALE
      });
      hurdleIndex += 1;
    }
  }
  commitInstancedMesh(hurdleVisuals.leftLegs);
  commitInstancedMesh(hurdleVisuals.rightLegs);
  commitInstancedMesh(hurdleVisuals.bars);
  group.add(hurdleVisuals.leftLegs, hurdleVisuals.rightLegs, hurdleVisuals.bars);

  return {
    group,
    ball,
    referee: refereeInfo,
    teamSlots: {
      red: resolvedTeamData.red,
      blue: resolvedTeamData.blue
    },
    ballVel: new THREE.Vector3(0, 0, 0),
    restartSpot: { x: 0, z: 0 },
    goals,
    coach,
    players,
    trackRunners,
    hurdles,
    hurdleVisuals,
    colliders,
    redScore: 0,
    blueScore: 0,
    phase: 0,
    attackingTeam: 0,
    ballHolder: null,
    lastControllingTeam: 0,
    counterTeam: 0,
    counterTimer: 0,
    counterRunner: null,
    deliveryType: null,
    deliveryTeam: 0,
    deliveryTimer: 0,
    deliverySource: null,
    deliveryTarget: null,
    stallTeam: 0,
    stallTimer: 0,
    goalmouthStallTimer: 0,
    ownGoalScrambleTimer: 0,
    looseBallStallTimer: 0,
    offBallClusterTimer: 0,
    outOfBoundsTimer: 0,
    kickoffBallSpot: { x: 0, z: 0 },
    lastTouchTeam: 0,
    lastTouchPlayer: null,
    sameTeamTouchCount: 0,
    firstTouchPlayer: null,
    firstTouchTimer: 0,
    touchShieldPlayer: null,
    touchShieldTimer: 0,
    duelControlPlayer: null,
    duelControlTimer: 0,
    contestTouchTimer: 0,
    contestOwnerPlayer: null,
    contestOwnerTimer: 0,
    contestHardLockTimer: 0,
    goalPending: null,
    celebration: null,
    refRestart: null,
    kickoffPlacementMode: null,
    restartHoldTimer: 0,
    restartTeam: 0,
    kickoffContestTimer: 0,
    kickoffScriptTimer: 0,
    trackFinishX: TRACK_FINISH_X,
    track100StartX: TRACK_100M_START_X
  };
}

