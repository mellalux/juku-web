import * as THREE from "./three.js";
import { createAppRuntime } from "./app-runtime.js";
import { renderCamera3PipView } from "./camera-system.js";
import { createFootballBridge } from "./football-bridge.js";
import { createFootballBehaviorState } from "./football-behavior-state.js";
import { buildFootballGame } from "./football-build.js";
import { makeFootballNameTag } from "./football-ui-build.js";
import { buildJuku, buildSword } from "./juku-build.js";
import { renderGoalReplay3DView } from "./football-replay-render.js";
import { buildRunningTrack } from "./track-system.js";
import { setupUiInputSystem } from "./ui-input-system.js";
import { createUi } from "./ui.js";
import { buildFloor } from "./world-build.js";
import {
  WORLD_RADIUS,
  createInitialState
} from "./game-config.js";

const {
  attackStatus,
  behaviorModeButtons,
  cameraStatus,
  canvas,
  faceStatus,
  goalOverlay,
  goalOverlayScorer,
  goalOverlayTitle,
  pipFrame,
  playerStatus,
  replayBadge,
  replayCard,
  replayFlash,
  scoreStatus,
  touchCameraButtons,
  touchCameraName,
  touchEquipButton,
  touchFaceButtons,
  touchFaceName,
  touchJoystick,
  touchJoystickThumb,
  touchJumpButton,
  touchZoomInButton,
  touchZoomOutButton
} = createUi();

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x93c5fd);
scene.fog = new THREE.Fog(0x93c5fd, 48, 138);

const cameraRig = new THREE.Group();
scene.add(cameraRig);

const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 300);
camera.position.set(0, 11.2, 30.4);
camera.lookAt(0, 2.1, 0);
cameraRig.add(camera);
const pipCamera = new THREE.PerspectiveCamera(camera.fov, 1, 0.1, 300);

const hemi = new THREE.HemisphereLight(0xe8f4ff, 0x40722d, 1.7);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 1.55);
sun.position.set(8, 20, 12);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -(WORLD_RADIUS + 4);
sun.shadow.camera.right = WORLD_RADIUS + 4;
sun.shadow.camera.top = WORLD_RADIUS + 4;
sun.shadow.camera.bottom = -(WORLD_RADIUS + 4);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = WORLD_RADIUS * 2.65;
scene.add(sun);

const floor = buildFloor();
scene.add(floor);

const runningTrack = buildRunningTrack();
scene.add(runningTrack);

const footballGame = buildFootballGame();
footballGame.kickoffTeam = Math.random() < 0.5 ? 1 : -1;
scene.add(footballGame.group);

const juku = buildJuku();
const jukuNameTag = makeFootballNameTag("Juku", "rgba(29,99,181,0.92)");
jukuNameTag.position.set(0, 4.22, 0);
jukuNameTag.material.opacity = 0.82;
juku.root.add(jukuNameTag);
scene.add(juku.root);

const droppedSword = buildSword();
droppedSword.root.visible = false;
scene.add(droppedSword.root);

const state = createInitialState();
const {
  getFootballBehavior,
  setFootballBehaviorPreset
} = createFootballBehaviorState({
  state,
  behaviorModeButtons
});

const {
  clampGoalInteriorPosition,
  recordFootballReplay,
  resetFootballKickoff,
  updateFootballGame,
  updateGoalReplay,
  updateScoreboard
} = createFootballBridge({
  state,
  footballGame,
  camera,
  attackStatus,
  goalOverlay,
  goalOverlayScorer,
  goalOverlayTitle,
  playerStatus,
  replayCard,
  replayFlash,
  scoreStatus,
  getFootballBehavior
});

resetFootballKickoff(footballGame, true);
updateScoreboard(footballGame);

cameraRig.position.set(0, 11.2, 0);
cameraRig.rotation.y = THREE.MathUtils.degToRad(state.cameraYaw);

const {
  adjustTouchZoom,
  dollyCameraTowards,
  getCameraDolly,
  updateTouchEquipLabel
} = setupUiInputSystem({
  state,
  camera,
  pipCamera,
  renderer,
  behaviorModeButtons,
  touchCameraButtons,
  touchCameraName,
  touchEquipButton,
  touchFaceButtons,
  touchFaceName,
  touchJoystick,
  touchJoystickThumb,
  touchJumpButton,
  touchZoomInButton,
  touchZoomOutButton,
  setFootballBehaviorPreset
});

const {
  updateCamera,
  updateJuku,
  updateJukuPose
} = createAppRuntime({
  state,
  footballGame,
  juku,
  droppedSword,
  camera,
  cameraRig,
  cameraStatus,
  faceStatus,
  updateTouchEquipLabel,
  adjustTouchZoom,
  getCameraDolly,
  dollyCameraTowards,
  clampGoalInteriorPosition
});

function tick(now) {
  const dt = Math.min((now - state.lastT) / 1000, 0.05);
  state.lastT = now;
  updateJuku(dt);
  updateFootballGame(footballGame, state.pauseFootball ? 0 : dt, state.pauseTrack ? 0 : dt);
  if (!state.pauseFootball) {
    recordFootballReplay(footballGame, dt);
    updateGoalReplay(dt, footballGame);
  }
  updateCamera(dt);
  updateJukuPose();
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.setScissorTest(false);
  renderer.render(scene, camera);
  renderCamera3PipView({ state, pipFrame, pipCamera, camera, renderer, scene });
  renderGoalReplay3DView({
    state,
    game: footballGame,
    pipCamera,
    renderer,
    replayBadge,
    replayCard,
    scene
  });
  requestAnimationFrame(tick);
}

requestAnimationFrame((now) => {
  state.lastT = now;
  tick(now);
});

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch((error) => {
      console.error("Service worker registration failed", error);
    });
  });
}
