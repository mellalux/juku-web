import * as THREE from "./three.js";
import {
  CAMERA_NAMES,
  CAMERA_ZOOM_DEFAULTS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  JUKU_BASE_Y
} from "./game-config.js";

// Camera orchestration for all gameplay modes, including the football broadcast
// camera and the PiP mirror that shows the standby broadcast angle.
const FOOTBALL_BROADCAST_CAMERA_LIMIT = 6;
const FOOTBALL_BROADCAST_POS = new THREE.Vector3();
const FOOTBALL_BROADCAST_TARGET = new THREE.Vector3();
const FOOTBALL_BROADCAST_FORWARD = new THREE.Vector3();
const FOOTBALL_BROADCAST_RIGHT = new THREE.Vector3();
const FOOTBALL_BROADCAST_UP = new THREE.Vector3();
const FOOTBALL_BROADCAST_REL = new THREE.Vector3();
const FOOTBALL_BROADCAST_WORLD_UP = new THREE.Vector3(0, 1, 0);
const CAM2_DOLLY_POS = new THREE.Vector3();
const FOOTBALL_BROADCAST_POINT_POOL = [];
const FOOTBALL_BROADCAST_PACK = {
  attackSide: 1,
  ballX: 0,
  ballZ: 0,
  boxZoom: 0,
  focusX: 0,
  focusZ: 0,
  goalRush: 0,
  goalX: 0,
  goalZ: 0,
  midfieldLock: 0,
  pointCount: 0,
  points: FOOTBALL_BROADCAST_POINT_POOL,
  spread: 0
};
const FOOTBALL_BROADCAST_DESIRED_A = { side: 1, x: 0, y: 0, z: 0, lookX: 0, lookY: 0, lookZ: 0 };
const FOOTBALL_BROADCAST_DESIRED_B = { side: -1, x: 0, y: 0, z: 0, lookX: 0, lookY: 0, lookZ: 0 };
const FOOTBALL_BROADCAST_SCORE_A = { ballEdge: 9, ballVisible: false, goalVisible: false, score: 0 };
const FOOTBALL_BROADCAST_SCORE_B = { ballEdge: 9, ballVisible: false, goalVisible: false, score: 0 };
const FOOTBALL_PIP_LAYOUT = {
  display: "none",
  height: 0,
  left: 0,
  top: 0,
  width: 0
};
let lastCameraStatusText = "";
const FOOTBALL_BROADCAST_NEARBY_PLAYERS = Array.from(
  { length: FOOTBALL_BROADCAST_CAMERA_LIMIT },
  () => ({ p: null, dist: Infinity })
);

function getFootballBroadcastPointSlot(index) {
  if (!FOOTBALL_BROADCAST_POINT_POOL[index]) {
    FOOTBALL_BROADCAST_POINT_POOL[index] = {
      ball: false,
      goal: false,
      weight: 0,
      x: 0,
      y: 0,
      z: 0
    };
  }
  return FOOTBALL_BROADCAST_POINT_POOL[index];
}

function setFootballBroadcastPoint(index, x, y, z, weight, ball, goal) {
  const point = getFootballBroadcastPointSlot(index);
  point.x = x;
  point.y = y;
  point.z = z;
  point.weight = weight;
  point.ball = ball;
  point.goal = goal;
}

function createFootballBroadcastSetupState(template) {
  return {
    side: template.side,
    x: template.x,
    y: template.y,
    z: template.z,
    lookX: template.lookX,
    lookY: template.lookY,
    lookZ: template.lookZ
  };
}

function collectNearestFootballBroadcastPlayers(players, x, z) {
  for (let i = 0; i < FOOTBALL_BROADCAST_NEARBY_PLAYERS.length; i += 1) {
    FOOTBALL_BROADCAST_NEARBY_PLAYERS[i].p = null;
    FOOTBALL_BROADCAST_NEARBY_PLAYERS[i].dist = Infinity;
  }

  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    const dist = Math.hypot(x - player.runner.root.position.x, z - player.runner.root.position.z);
    if (dist >= FOOTBALL_BROADCAST_NEARBY_PLAYERS[FOOTBALL_BROADCAST_NEARBY_PLAYERS.length - 1].dist) continue;

    let insertIndex = FOOTBALL_BROADCAST_NEARBY_PLAYERS.length - 1;
    while (insertIndex > 0 && dist < FOOTBALL_BROADCAST_NEARBY_PLAYERS[insertIndex - 1].dist) {
      insertIndex -= 1;
    }
    for (let j = FOOTBALL_BROADCAST_NEARBY_PLAYERS.length - 1; j > insertIndex; j -= 1) {
      FOOTBALL_BROADCAST_NEARBY_PLAYERS[j].p = FOOTBALL_BROADCAST_NEARBY_PLAYERS[j - 1].p;
      FOOTBALL_BROADCAST_NEARBY_PLAYERS[j].dist = FOOTBALL_BROADCAST_NEARBY_PLAYERS[j - 1].dist;
    }
    FOOTBALL_BROADCAST_NEARBY_PLAYERS[insertIndex].p = player;
    FOOTBALL_BROADCAST_NEARBY_PLAYERS[insertIndex].dist = dist;
  }

  return FOOTBALL_BROADCAST_NEARBY_PLAYERS;
}

// Build a weighted snapshot of the football scene. Later camera functions only
// consume this distilled pack instead of reasoning over the full game state.
function getFootballBroadcastPack(game) {
  const pack = FOOTBALL_BROADCAST_PACK;
  const kickoffResetActive = (game.refRestart?.active && (game.refRestart.kind ?? "boundary") === "kickoff")
    || (game.celebration?.active && (game.celebration.phase === "reset" || game.celebration.phase === "awaitKickoff"));
  // Kickoff and referee reset moments should frame the center spot and the two
  // actors contesting it, rather than following normal live-play priorities.
  if (kickoffResetActive) {
    const centerBallX = game.refRestart?.active ? (game.refRestart.placeX ?? 0) : 0;
    const centerBallZ = game.refRestart?.active ? (game.refRestart.placeZ ?? 0) : 0;
    let pointCount = 0;
    setFootballBroadcastPoint(pointCount, centerBallX, 0.9, centerBallZ, 4.2, true, false);
    pointCount += 1;
    setFootballBroadcastPoint(pointCount, 0, 1.2, 0, 2.4, false, true);
    pointCount += 1;
    let focusX = centerBallX * 4.2;
    let focusZ = centerBallZ * 4.2;
    let weightSum = 6.6;
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      const isKickoffActor = p.kickoffRole === "taker" || p.kickoffRole === "press";
      const weight = isKickoffActor ? 1.65 : 0.82;
      const x = p.runner.root.position.x;
      const z = p.runner.root.position.z;
      setFootballBroadcastPoint(pointCount, x, p.role === "keeper" ? 1.38 : 1.6, z, weight, false, false);
      pointCount += 1;
      focusX += x * weight;
      focusZ += z * weight;
      weightSum += weight;
    }
    focusX /= Math.max(0.001, weightSum);
    focusZ /= Math.max(0.001, weightSum);
    focusX = THREE.MathUtils.lerp(focusX, 0, 0.84);
    focusZ = THREE.MathUtils.lerp(focusZ, 0, 0.9);
    let spread = 4.2;
    for (let i = 0; i < pointCount; i += 1) {
      const point = FOOTBALL_BROADCAST_POINT_POOL[i];
      spread = Math.max(spread, Math.hypot(point.x - focusX, point.z - focusZ));
    }
    pack.focusX = focusX;
    pack.focusZ = focusZ;
    pack.ballX = centerBallX;
    pack.ballZ = centerBallZ;
    pack.goalX = 0;
    pack.goalZ = 0;
    pack.attackSide = game.restartTeam || game.kickoffTeam || 1;
    pack.boxZoom = 0;
    pack.midfieldLock = 1;
    pack.goalRush = 0;
    pack.spread = THREE.MathUtils.clamp(spread, 4.4, 10.2);
    pack.pointCount = pointCount;
    return pack;
  }

  // Celebrations tighten around the scorer and nearby teammates instead of the
  // nominal ball location so the shot feels intentional and broadcast-like.
  if (game.celebration?.active && game.celebration.scorer) {
    const celebration = game.celebration;
    const scorer = celebration.scorer;
    const ballX = scorer.runner.root.position.x;
    const ballZ = scorer.runner.root.position.z;
    let pointCount = 0;
    setFootballBroadcastPoint(pointCount, ballX, 1.72, ballZ, 3.8, true, false);
    pointCount += 1;
    setFootballBroadcastPoint(pointCount, celebration.spotX, 1.68, celebration.spotZ, 2.2, false, true);
    pointCount += 1;
    let focusX = ballX * 3.8 + celebration.spotX * 2.2;
    let focusZ = ballZ * 3.8 + celebration.spotZ * 2.2;
    let weightSum = 6;
    let teammateCount = 0;
    for (let i = 0; i < game.players.length; i += 1) {
      const mate = game.players[i];
      if (mate.team !== celebration.team || mate === scorer) continue;
      const weight = mate.role === "keeper" ? 0.9 : 1.25;
      const x = mate.runner.root.position.x;
      const z = mate.runner.root.position.z;
      setFootballBroadcastPoint(pointCount, x, mate.role === "keeper" ? 1.42 : 1.62, z, weight, false, false);
      pointCount += 1;
      focusX += x * weight;
      focusZ += z * weight;
      weightSum += weight;
      teammateCount += 1;
      if (teammateCount >= 5) break;
    }
    focusX /= Math.max(0.001, weightSum);
    focusZ /= Math.max(0.001, weightSum);
    focusX = THREE.MathUtils.lerp(focusX, ballX, 0.62);
    focusZ = THREE.MathUtils.lerp(focusZ, ballZ, 0.58);
    const cameraDrift = celebration.orbitSeed + celebration.pulse * 0.05;
    focusX += Math.sin(cameraDrift) * 0.22 * -(celebration.sideSign || 1);
    focusZ += Math.cos(cameraDrift * 0.9) * 0.32;
    let spread = 2.8;
    for (let i = 0; i < pointCount; i += 1) {
      const point = FOOTBALL_BROADCAST_POINT_POOL[i];
      spread = Math.max(spread, Math.hypot(point.x - focusX, point.z - focusZ));
    }
    pack.focusX = focusX;
    pack.focusZ = focusZ;
    pack.ballX = ballX;
    pack.ballZ = ballZ;
    pack.goalX = celebration.spotX;
    pack.goalZ = celebration.spotZ;
    pack.attackSide = celebration.team;
    pack.boxZoom = 0.92;
    pack.midfieldLock = 0;
    pack.goalRush = 1;
    pack.spread = THREE.MathUtils.clamp(spread, 2.6, 5.4);
    pack.pointCount = pointCount;
    return pack;
  }

  // Live play balances three anchors: the ball, the attacking goal, and the
  // nearest weighted players around the current action.
  const ballX = game.ball.position.x;
  const ballZ = game.ball.position.z;
  let pointCount = 0;
  setFootballBroadcastPoint(pointCount, ballX, 0.9, ballZ, 3.6, true, false);
  pointCount += 1;
  const nearbyPlayers = collectNearestFootballBroadcastPlayers(
    game.players,
    ballX,
    ballZ
  );

  const attackSide = game.attackingTeam !== 0
    ? game.attackingTeam
    : Math.abs(game.ballVel.z) > 0.08
      ? Math.sign(game.ballVel.z || 1)
      : ballZ >= 0 ? 1 : -1;
  const midfieldLaneBias = 1 - THREE.MathUtils.clamp(
    (Math.abs(ballX) - FOOTBALL_FIELD_HALF_WIDTH * 0.28) / Math.max(0.001, FOOTBALL_FIELD_HALF_WIDTH * 0.2),
    0,
    1
  );
  const midfieldDepthBias = 1 - THREE.MathUtils.clamp(
    (Math.abs(ballZ) - FOOTBALL_FIELD_HALF_LENGTH * 0.3) / Math.max(0.001, FOOTBALL_FIELD_HALF_LENGTH * 0.17),
    0,
    1
  );
  const midfieldLock = midfieldLaneBias * midfieldDepthBias;
  const boxZoom = THREE.MathUtils.clamp((attackSide * ballZ - (FOOTBALL_FIELD_HALF_LENGTH - 8.2)) / 5.2, 0, 1);
  const goalRush = THREE.MathUtils.clamp((attackSide * ballZ - (FOOTBALL_FIELD_HALF_LENGTH - 9.6)) / 4.6, 0, 1);
  const attackGoalZ = attackSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const goalWeight = 1.2 + boxZoom * 1.85;
  setFootballBroadcastPoint(pointCount, 0, 1.4, attackGoalZ, goalWeight, false, true);
  pointCount += 1;
  let focusX = ballX * 3.6;
  let focusZ = ballZ * 3.6 + attackGoalZ * goalWeight;
  let weightSum = 3.6 + goalWeight;

  for (let i = 0; i < nearbyPlayers.length; i += 1) {
    const entry = nearbyPlayers[i];
    if (!entry.p) break;
    const player = entry.p;
    const weight = player === game.ballHolder ? 1.8 : player.role === "keeper" ? 0.38 : Math.max(0.54, 1.34 - entry.dist * 0.11);
    const x = player.runner.root.position.x;
    const z = player.runner.root.position.z;
    setFootballBroadcastPoint(pointCount, x, player.role === "keeper" ? 1.35 : 1.62, z, weight, false, false);
    pointCount += 1;
    focusX += x * weight;
    focusZ += z * weight;
    weightSum += weight;
  }

  focusX /= Math.max(0.001, weightSum);
  focusZ /= Math.max(0.001, weightSum);
  focusX = THREE.MathUtils.lerp(focusX, ballX, 0.72 + boxZoom * 0.1);
  focusZ = THREE.MathUtils.lerp(focusZ, THREE.MathUtils.lerp(ballZ, attackGoalZ, 0.26 + boxZoom * 0.16), 0.46 + boxZoom * 0.12);
  focusZ = THREE.MathUtils.lerp(focusZ, ballZ, 0.38 + midfieldLock * 0.42);
  focusX = THREE.MathUtils.lerp(focusX, ballX, midfieldLock * 0.16);

  let spread = 3.1;
  for (let i = 0; i < pointCount; i += 1) {
    const point = FOOTBALL_BROADCAST_POINT_POOL[i];
    spread = Math.max(spread, Math.hypot(point.x - focusX, point.z - focusZ));
  }

  pack.focusX = focusX;
  pack.focusZ = focusZ;
  pack.ballX = ballX;
  pack.ballZ = ballZ;
  pack.goalX = 0;
  pack.goalZ = attackGoalZ;
  pack.attackSide = attackSide;
  pack.boxZoom = boxZoom;
  pack.midfieldLock = midfieldLock;
  pack.goalRush = goalRush;
  pack.spread = THREE.MathUtils.clamp(spread, 3.6, 11.4);
  pack.pointCount = pointCount;
  return pack;
}

// Generate one sideline camera candidate from the weighted pack.
// Side selection happens later by scoring the left and right candidates.
function setFootballBroadcastSetup(out, side, pack, zoom) {
  const wideFieldBias = THREE.MathUtils.clamp((pack.spread - 4.2) / 5.8, 0, 1);
  const dramaBias = THREE.MathUtils.clamp(0.3 + pack.goalRush * 0.55 + pack.boxZoom * 0.22 - pack.midfieldLock * 0.18, 0, 1);
  const zoomTighten = 1 - pack.boxZoom * 0.28;
  const defendGoalZ = -pack.goalZ;
  const midfieldBiasZ = THREE.MathUtils.lerp(0, defendGoalZ, 0.18 - pack.boxZoom * 0.03);
  const goalTrackZ = THREE.MathUtils.lerp(pack.ballZ, pack.goalZ, 0.18 + pack.goalRush * 0.58 + pack.boxZoom * 0.08);
  const trackBlend = Math.max(pack.boxZoom * 0.72, pack.goalRush * 0.94) * (1 - pack.midfieldLock * 0.82);
  const sidelineX = side * ((FOOTBALL_FIELD_HALF_WIDTH + 2.45 + wideFieldBias * 1.1 - pack.goalRush * 0.22 - dramaBias * 0.28) * zoomTighten);
  const height = (4.9 + pack.spread * 0.082 + wideFieldBias * 0.24 - dramaBias * 0.34) * zoom * (1 - pack.boxZoom * 0.12 - pack.goalRush * 0.03);
  const centeredTrackZ = THREE.MathUtils.lerp(pack.ballZ, 0, 0.18 + pack.midfieldLock * 0.38);
  const trackZ = THREE.MathUtils.clamp(
    THREE.MathUtils.lerp(THREE.MathUtils.lerp(midfieldBiasZ, centeredTrackZ, pack.midfieldLock * 0.82), goalTrackZ, trackBlend),
    -FOOTBALL_FIELD_HALF_LENGTH + 1.1,
    FOOTBALL_FIELD_HALF_LENGTH - 1.1
  );
  const lookY = 1.16 + Math.min(0.48, pack.spread * 0.04) - dramaBias * 0.08;
  const lookX = THREE.MathUtils.lerp(pack.goalX, pack.ballX, 0.08 + pack.boxZoom * 0.04 + pack.midfieldLock * 0.08);
  const lookZ = THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(pack.goalZ, pack.ballZ, 0.12 + pack.boxZoom * 0.04 - pack.goalRush * 0.02),
    THREE.MathUtils.lerp(pack.ballZ, 0, pack.midfieldLock * 0.46),
    pack.midfieldLock * 0.72
  );
  out.side = side;
  out.x = sidelineX;
  out.y = height;
  out.z = trackZ;
  out.lookX = lookX;
  out.lookY = lookY;
  out.lookZ = lookZ;
  return out;
}

function dampFootballBroadcastSetup(current, target, dt) {
  current.x = THREE.MathUtils.damp(current.x, target.x, 5.6, dt);
  current.y = THREE.MathUtils.damp(current.y, target.y, 5.4, dt);
  current.z = THREE.MathUtils.damp(current.z, target.z, 5.8, dt);
  current.lookX = THREE.MathUtils.damp(current.lookX, target.lookX, 6.4, dt);
  current.lookY = THREE.MathUtils.damp(current.lookY, target.lookY, 5.2, dt);
  current.lookZ = THREE.MathUtils.damp(current.lookZ, target.lookZ, 6.2, dt);
  return current;
}

// Score a candidate by keeping the weighted points, especially the ball and
// goal, inside frame with as little edge clipping as possible.
function scoreFootballBroadcastSetup(setup, pack, camera, out) {
  const pos = FOOTBALL_BROADCAST_POS.set(setup.x, setup.y, setup.z);
  const target = FOOTBALL_BROADCAST_TARGET.set(setup.lookX, setup.lookY, setup.lookZ);
  const forward = FOOTBALL_BROADCAST_FORWARD.copy(target).sub(pos).normalize();
  const right = FOOTBALL_BROADCAST_RIGHT.crossVectors(forward, FOOTBALL_BROADCAST_WORLD_UP).normalize();
  const up = FOOTBALL_BROADCAST_UP.crossVectors(right, forward).normalize();
  const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
  const tanX = tanY * camera.aspect;
  let score = 0;
  let ballVisible = false;
  let goalVisible = false;
  let ballEdge = 9;

  for (let i = 0; i < pack.pointCount; i += 1) {
    const point = pack.points[i];
    const rel = FOOTBALL_BROADCAST_REL.set(point.x - setup.x, point.y - setup.y, point.z - setup.z);
    const depthAlong = rel.dot(forward);
    if (depthAlong <= 0.05) {
      score -= point.ball ? 22 : point.goal ? 12 : 6;
      continue;
    }
    const nx = Math.abs(rel.dot(right) / Math.max(0.001, depthAlong * tanX));
    const ny = Math.abs(rel.dot(up) / Math.max(0.001, depthAlong * tanY));
    const inside = nx <= 1.02 && ny <= 1.02;
    const centerBias = Math.max(0, 1.34 - nx * 0.88 - ny * 0.56);
    if (point.ball) ballEdge = Math.max(nx, ny);
    if (inside) {
      score += point.weight * (1.48 + centerBias + (point.ball ? 1 : point.goal ? 0.72 : 0));
      if (point.ball) ballVisible = true;
      if (point.goal) goalVisible = true;
    } else {
      score -= point.weight * ((Math.max(0, nx - 1) * 4.6) + (Math.max(0, ny - 1) * 3.5) + (point.goal ? 0.25 : 0.55));
    }
  }

  if (!goalVisible) score -= 6.1 + pack.boxZoom * 2.2;
  score -= Math.max(0, ballEdge - 0.55) * 5.4;
  out.score = score;
  out.ballVisible = ballVisible;
  out.goalVisible = goalVisible;
  out.ballEdge = ballEdge;
  return out;
}

export function updateCameraSystem({ dt, state, camera, cameraRig, footballGame, cameraStatus, adjustTouchZoom, getCameraDolly, dollyCameraTowards }) {
  camera.up.set(0, 1, 0);
  if (state.keys.has("Equal") || state.keys.has("NumpadAdd")) adjustTouchZoom(-dt * 1.25);
  if (state.keys.has("Minus") || state.keys.has("NumpadSubtract")) adjustTouchZoom(dt * 1.25);
  state.cameraZoom = THREE.MathUtils.damp(state.cameraZoom, state.cameraZoomTarget, 10, dt);
  if (state.cameraZoomMemory[state.activeCam]) {
    state.cameraZoomMemory[state.activeCam].zoom = state.cameraZoom;
    state.cameraZoomMemory[state.activeCam].target = state.cameraZoomTarget;
  }
  const zoom = state.cameraZoom;
  const dolly = getCameraDolly(state.activeCam, zoom);

  if (state.activeCam === 1) {
    const lookX = 0;
    const lookY = 2.05;
    const lookZ = 0;
    const baseZoom = CAMERA_ZOOM_DEFAULTS[1];
    const dollyPos = dollyCameraTowards(0, 10.4 * baseZoom, 28.8 * baseZoom, lookX, lookY, lookZ, dolly);
    cameraRig.rotation.y = THREE.MathUtils.degToRad(state.cameraYaw);
    camera.position.copy(dollyPos);
    camera.lookAt(lookX, lookY, lookZ);
  } else if (state.activeCam === 3) {
    state.cam3SwitchCooldown = Math.max(0, state.cam3SwitchCooldown - dt);
    // Broadcast mode keeps mirrored left/right candidates alive and only
    // switches when the standby side is clearly better.
    const pack = getFootballBroadcastPack(footballGame);
    const broadcastZoom = CAMERA_ZOOM_DEFAULTS[3];
    const desiredA = setFootballBroadcastSetup(FOOTBALL_BROADCAST_DESIRED_A, 1, pack, broadcastZoom);
    const desiredB = setFootballBroadcastSetup(FOOTBALL_BROADCAST_DESIRED_B, -1, pack, broadcastZoom);
    if (!state.cam3SetupA || !state.cam3SetupB) {
      state.cam3SetupA = createFootballBroadcastSetupState(desiredA);
      state.cam3SetupB = createFootballBroadcastSetupState(desiredB);
      const scoreA = scoreFootballBroadcastSetup(state.cam3SetupA, pack, camera, FOOTBALL_BROADCAST_SCORE_A);
      const scoreB = scoreFootballBroadcastSetup(state.cam3SetupB, pack, camera, FOOTBALL_BROADCAST_SCORE_B);
      state.cam3Side = scoreB.score > scoreA.score ? -1 : 1;
      state.cam3SideBlend = state.cam3Side;
    }

    const liveSide = state.cam3Side >= 0 ? 1 : -1;
    if (liveSide > 0) dampFootballBroadcastSetup(state.cam3SetupB, desiredB, dt);
    else dampFootballBroadcastSetup(state.cam3SetupA, desiredA, dt);

    const liveSetup = liveSide > 0 ? state.cam3SetupA : state.cam3SetupB;
    const standbySetup = liveSide > 0 ? state.cam3SetupB : state.cam3SetupA;
    const liveFrame = scoreFootballBroadcastSetup(liveSetup, pack, camera, FOOTBALL_BROADCAST_SCORE_A);
    const standbyFrame = scoreFootballBroadcastSetup(standbySetup, pack, camera, FOOTBALL_BROADCAST_SCORE_B);
    const standbyReady = standbyFrame.ballVisible
      && standbyFrame.goalVisible
      && standbyFrame.ballEdge < THREE.MathUtils.lerp(0.62, 0.76, pack.midfieldLock);
    const scoreGain = standbyFrame.score - liveFrame.score;
    const centralHold = pack.midfieldLock > 0.55 && liveFrame.ballVisible && liveFrame.ballEdge < 0.98;
    const edgeTrigger = liveFrame.ballEdge > THREE.MathUtils.lerp(0.75, 0.92, pack.midfieldLock);
    const scoreMargin = Math.max(0.8, THREE.MathUtils.lerp(1.2, 4.1, pack.midfieldLock) - pack.goalRush * 0.35);
    const emergencySwitch = !liveFrame.ballVisible || liveFrame.ballEdge > THREE.MathUtils.lerp(0.94, 1.06, pack.midfieldLock);
    const goalSideSwitch = pack.goalRush > 0.22
      && standbyFrame.ballEdge + 0.08 < liveFrame.ballEdge
      && scoreGain > Math.max(0.65, scoreMargin * 0.5);
    const shouldSwitch = state.cam3SwitchCooldown <= 0 && standbyReady && (
      emergencySwitch
      || (!centralHold && edgeTrigger && scoreGain > scoreMargin)
      || (!centralHold && goalSideSwitch)
    );
    if (shouldSwitch) {
      state.cam3Side = -liveSide;
      state.cam3SideBlend = state.cam3Side;
      state.cam3SwitchCooldown = THREE.MathUtils.lerp(0.42, 0.24, pack.goalRush);
    }

    const activeSetup = state.cam3Side >= 0 ? state.cam3SetupA : state.cam3SetupB;
    const dollyPos = dollyCameraTowards(activeSetup.x, activeSetup.y, activeSetup.z, activeSetup.lookX, activeSetup.lookY, activeSetup.lookZ, dolly);
    cameraRig.rotation.set(0, 0, 0);
    cameraRig.position.set(0, 0, 0);
    camera.position.copy(dollyPos);
    camera.lookAt(activeSetup.lookX, activeSetup.lookY, activeSetup.lookZ);
  } else if (state.activeCam === 2) {
    state.cam2Distance = THREE.MathUtils.clamp(state.cam2Distance, 7.2, 18.5);
    state.cam2Height = THREE.MathUtils.clamp(2.9 + state.cam2Distance * 0.2, 3.6, 6.4);
    const moveDx = state.x - state.cam2PrevX;
    const moveDz = state.z - state.cam2PrevZ;
    const moveLen = Math.hypot(moveDx, moveDz);
    state.cam2Motion = THREE.MathUtils.damp(state.cam2Motion, moveLen, 9, dt);
    if (moveLen > 0.003) {
      const moveAngle = Math.atan2(moveDx, moveDz);
      const camForwardX = -Math.sin(state.cam2Yaw);
      const camForwardZ = -Math.cos(state.cam2Yaw);
      const sideAmount = Math.abs((moveDx * camForwardZ - moveDz * camForwardX) / moveLen);
      if (sideAmount > 0.42) {
        const desiredYaw = moveAngle + Math.PI;
        const yawDelta = Math.atan2(Math.sin(desiredYaw - state.cam2Yaw), Math.cos(desiredYaw - state.cam2Yaw));
        state.cam2Yaw += yawDelta * Math.min(1, dt * (2.8 + sideAmount * 3.2));
      }
    }
    const deadZoneX = 1.05;
    const deadZoneZ = 0.8;
    if (state.x > state.cam2FocusX + deadZoneX) state.cam2FocusX = state.x - deadZoneX;
    else if (state.x < state.cam2FocusX - deadZoneX) state.cam2FocusX = state.x + deadZoneX;
    if (state.z > state.cam2FocusZ + deadZoneZ) state.cam2FocusZ = state.z - deadZoneZ;
    else if (state.z < state.cam2FocusZ - deadZoneZ) state.cam2FocusZ = state.z + deadZoneZ;
    if (state.cam2CloseUp) {
      if (state.cam2Motion > 0.06) state.cam2CloseUp = false;
    } else if (state.cam2Motion < 0.018) {
      state.cam2CloseUp = true;
    }
    const closeUpMode = state.cam2CloseUp;
    const baseZoom = CAMERA_ZOOM_DEFAULTS[2];
    const zoomRatio = THREE.MathUtils.clamp(zoom / Math.max(0.001, baseZoom), 0.42, 1.9);
    const cam2Distance = state.cam2Distance * (closeUpMode ? 0.82 : 1.02) * zoomRatio;
    const cam2Height = closeUpMode ? 3.15 : state.cam2Height * 0.96;
    const orbitX = Math.sin(state.cam2Yaw) * cam2Distance;
    const orbitZ = Math.cos(state.cam2Yaw) * cam2Distance;
    const lookX = state.cam2FocusX;
    const lookY = closeUpMode ? JUKU_BASE_Y + 2.74 : JUKU_BASE_Y + 2.72 + state.jumpY * 0.18;
    const lookZ = state.cam2FocusZ;
    const targetYBase = closeUpMode ? cam2Height : state.jumpY + cam2Height;
    const dollyPos = CAM2_DOLLY_POS.set(state.cam2FocusX + orbitX, targetYBase, state.cam2FocusZ + orbitZ);
    const headSafeX = state.x;
    const headSafeY = JUKU_BASE_Y + 2.44 + state.jumpY * 0.18;
    const headSafeZ = state.z;
    const toCameraX = dollyPos.x - headSafeX;
    const toCameraY = dollyPos.y - headSafeY;
    const toCameraZ = dollyPos.z - headSafeZ;
    const toCameraLen = Math.hypot(toCameraX, toCameraY, toCameraZ);
    const minCamLen = closeUpMode ? 3.35 : 3.85;
    if (toCameraLen < minCamLen) {
      const safeScale = minCamLen / Math.max(0.001, toCameraLen);
      dollyPos.x = headSafeX + toCameraX * safeScale;
      dollyPos.y = headSafeY + toCameraY * safeScale;
      dollyPos.z = headSafeZ + toCameraZ * safeScale;
    }
    cameraRig.position.set(0, 0, 0);
    cameraRig.rotation.set(0, 0, 0);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, dollyPos.x, closeUpMode ? 10 : 8.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, dollyPos.y, closeUpMode ? 10 : 8.5, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, dollyPos.z, closeUpMode ? 10 : 8.5, dt);
    camera.lookAt(lookX, lookY, lookZ);
    state.cam2PrevX = state.x;
    state.cam2PrevZ = state.z;
  } else {
    cameraRig.position.set(0, 0, 0);
    cameraRig.rotation.set(0, 0, 0);
    const lookX = 0;
    const lookY = JUKU_BASE_Y;
    const lookZ = 0;
    const baseY = 44 + CAMERA_ZOOM_DEFAULTS[4] * 20;
    const dollyPos = dollyCameraTowards(0, baseY, 0.01, lookX, lookY, lookZ, dolly);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, dollyPos.x, 6.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, dollyPos.y, 6.5, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, dollyPos.z, 6.5, dt);
    const topDownLandscape = window.innerWidth >= window.innerHeight;
    const targetUpX = topDownLandscape ? 1 : 0;
    const targetUpZ = topDownLandscape ? 0 : -1;
    state.topDownUpX = THREE.MathUtils.damp(state.topDownUpX, targetUpX, 7.5, dt);
    state.topDownUpZ = THREE.MathUtils.damp(state.topDownUpZ, targetUpZ, 7.5, dt);
    const upLen = Math.hypot(state.topDownUpX, state.topDownUpZ);
    camera.up.set(upLen > 0.001 ? state.topDownUpX / upLen : targetUpX, 0, upLen > 0.001 ? state.topDownUpZ / upLen : targetUpZ);
    camera.lookAt(lookX, lookY, lookZ);
  }
  if (cameraStatus) {
    const pauseFlags = [];
    if (state.pauseFootball) pauseFlags.push("football paused");
    if (state.pauseTrack) pauseFlags.push("track paused");
    const pauseText = pauseFlags.length > 0 ? ` | ${pauseFlags.join(" | ")}` : "";
    const cameraStatusText = `Active Camera: ${CAMERA_NAMES[state.activeCam]} | Zoom: ${zoom.toFixed(2)}x${pauseText}`;
    if (lastCameraStatusText !== cameraStatusText) {
      lastCameraStatusText = cameraStatusText;
      cameraStatus.textContent = cameraStatusText;
    }
  }
}

export function renderCamera3PipView({ state, pipFrame, pipCamera, camera, renderer, scene }) {
  if (state.activeCam !== 3) {
    if (FOOTBALL_PIP_LAYOUT.display !== "none") {
      FOOTBALL_PIP_LAYOUT.display = "none";
      pipFrame.style.display = "none";
    }
    return;
  }
  const standbySetup = state.cam3Side >= 0 ? state.cam3SetupB : state.cam3SetupA;
  if (!standbySetup) {
    if (FOOTBALL_PIP_LAYOUT.display !== "none") {
      FOOTBALL_PIP_LAYOUT.display = "none";
      pipFrame.style.display = "none";
    }
    return;
  }
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const pipWidth = Math.round(width * 0.24);
  const pipHeight = Math.round(pipWidth / 1.62);
  const margin = 18;
  const pipX = width - pipWidth - margin;
  const pipY = height - pipHeight - margin;
  const pipTop = height - pipY - pipHeight;
  if (FOOTBALL_PIP_LAYOUT.display !== "block") {
    FOOTBALL_PIP_LAYOUT.display = "block";
    pipFrame.style.display = "block";
  }
  if (FOOTBALL_PIP_LAYOUT.left !== pipX) {
    FOOTBALL_PIP_LAYOUT.left = pipX;
    pipFrame.style.left = `${pipX}px`;
  }
  if (FOOTBALL_PIP_LAYOUT.top !== pipTop) {
    FOOTBALL_PIP_LAYOUT.top = pipTop;
    pipFrame.style.top = `${pipTop}px`;
  }
  if (FOOTBALL_PIP_LAYOUT.width !== pipWidth) {
    FOOTBALL_PIP_LAYOUT.width = pipWidth;
    pipFrame.style.width = `${pipWidth}px`;
  }
  if (FOOTBALL_PIP_LAYOUT.height !== pipHeight) {
    FOOTBALL_PIP_LAYOUT.height = pipHeight;
    pipFrame.style.height = `${pipHeight}px`;
  }
  pipCamera.fov = camera.fov;
  pipCamera.aspect = pipWidth / Math.max(1, pipHeight);
  pipCamera.updateProjectionMatrix();
  pipCamera.position.set(standbySetup.x, standbySetup.y, standbySetup.z);
  pipCamera.lookAt(standbySetup.lookX, standbySetup.lookY, standbySetup.lookZ);
  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setViewport(pipX, pipY, pipWidth, pipHeight);
  renderer.setScissor(pipX, pipY, pipWidth, pipHeight);
  renderer.render(scene, pipCamera);
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, width, height);
}

