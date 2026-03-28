import * as THREE from "./three.js";
import { createAppRuntime } from "./app-runtime.js";
import { createAudioSystem } from "./audio-system.js";
import { renderCamera3PipView } from "./camera-system.js";
import { createFootballBridge } from "./football-bridge.js";
import { createFootballBehaviorState } from "./football-behavior-state.js";
import { buildFootballGame } from "./football-build.js";
import { applyFootballTeamPresentation } from "./football-presentation.js";
import { loadWorldCharacterData } from "./world-character-data.js";
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

let appBooted = false;

function formatTrackTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const secs = Math.floor(safeSeconds % 60);
  const hundredths = Math.floor((safeSeconds - Math.floor(safeSeconds)) * 100);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

export async function bootApp() {
  if (appBooted) return;
  appBooted = true;
  const worldCharacterData = await loadWorldCharacterData();

  const {
    attackStatus,
    audioToggleButton,
    behaviorModeButtons,
    cameraStatus,
    canvas,
    faceStatus,
    goalOverlay,
    goalOverlayScorer,
    goalOverlayTitle,
    pipCanvas,
    pipFrame,
    playerStatus,
    replayBadge,
    replayCanvas,
    replayCard,
    replayFlash,
    scoreStatus,
    scoreboardTeamBlue,
    scoreboardTeamRed,
    trackTimerValue,
    touchCameraButtons,
    touchCameraName,
    touchEquipButton,
    touchFaceButtons,
    touchFaceName,
    touchJoystick,
    touchJoystickThumb,
    touchJumpButton,
    touchRoadsterButton,
    touchZoomInButton,
    touchZoomOutButton
  } = createUi();

  applyFootballTeamPresentation(worldCharacterData, {
    redTeamLabel: scoreboardTeamRed,
    blueTeamLabel: scoreboardTeamBlue
  });

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const pipRenderer = new THREE.WebGLRenderer({ canvas: pipCanvas, antialias: true });
  pipRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  pipRenderer.shadowMap.enabled = true;
  pipRenderer.shadowMap.type = THREE.PCFShadowMap;
  const replayRenderer = new THREE.WebGLRenderer({ canvas: replayCanvas, antialias: true });
  replayRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  replayRenderer.shadowMap.enabled = true;
  replayRenderer.shadowMap.type = THREE.PCFShadowMap;

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

  const trackColliders = [];
  const runningTrack = buildRunningTrack({ extraColliders: trackColliders });
  const roadster = runningTrack.userData?.roadster ?? null;
  scene.add(runningTrack);

  const footballGame = buildFootballGame(worldCharacterData);
  footballGame.colliders.push(...trackColliders);
  footballGame.kickoffTeam = Math.random() < 0.5 ? 1 : -1;
  scene.add(footballGame.group);

  const juku = buildJuku(worldCharacterData.juku);
  const jukuNameTag = makeFootballNameTag(
    worldCharacterData.juku.name,
    worldCharacterData.juku.ui.nameTagBackground,
    worldCharacterData.juku.ui.nameTagText
  );
  jukuNameTag.position.set(0, 4.22, 0);
  jukuNameTag.material.opacity = 0.82;
  juku.root.add(jukuNameTag);
  scene.add(juku.root);

  const droppedSword = buildSword();
  droppedSword.root.visible = false;
  scene.add(droppedSword.root);
  const pickupSceneObjects = {
    sword: {
      held: juku.heldSword,
      world: droppedSword
    },
    ball: {
      world: footballGame.ball
    }
  };

  const state = createInitialState();
  const audioSystem = createAudioSystem();
  audioSystem.installUnlockHandlers();
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
    getFootballBehavior,
    audioSystem
  });

  resetFootballKickoff(footballGame, true);
  updateScoreboard(footballGame);

  cameraRig.position.set(0, 11.2, 0);
  cameraRig.rotation.y = THREE.MathUtils.degToRad(state.cameraYaw);

  const {
    adjustTouchZoom,
    dollyCameraTowards,
    getCameraDolly,
    updateTouchEquipLabel,
    updateTouchRoadsterLabel
  } = setupUiInputSystem({
    state,
    camera,
    pipCamera,
    renderer,
    audioToggleButton,
    behaviorModeButtons,
    isAudioMuted: audioSystem.isMuted,
    playUiSound: audioSystem.playUiClick,
    toggleAudioMute: audioSystem.toggleMute,
    touchCameraButtons,
    touchCameraName,
    touchEquipButton,
    touchFaceButtons,
    touchFaceName,
    touchJoystick,
    touchJoystickThumb,
    touchJumpButton,
    touchRoadsterButton,
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
    roadster,
    juku,
    pickupSceneObjects,
    camera,
    cameraRig,
    cameraStatus,
    faceStatus,
    updateTouchEquipLabel,
    updateTouchRoadsterLabel,
    adjustTouchZoom,
    getCameraDolly,
    dollyCameraTowards,
    clampGoalInteriorPosition
  });

  if (trackTimerValue) {
    trackTimerValue.textContent = formatTrackTime(state.trackTimer ?? 0);
  }

  function tick(now) {
    const dt = Math.min((now - state.lastT) / 1000, 0.05);
    state.lastT = now;
    updateJuku(dt);
    updateFootballGame(footballGame, state.pauseFootball ? 0 : dt, state.pauseTrack ? 0 : dt);
    audioSystem.update(dt, footballGame);
    state.trackTimer += state.pauseTrack ? 0 : dt;
    if (trackTimerValue) {
      trackTimerValue.textContent = formatTrackTime(state.trackTimer);
    }
    if (!state.pauseFootball) {
      recordFootballReplay(footballGame, dt);
      updateGoalReplay(dt, footballGame);
    }
    updateCamera(dt);
    updateJukuPose();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissorTest(false);
    renderer.render(scene, camera);
    renderCamera3PipView({ state, pipFrame, pipCamera, camera, pipRenderer, scene });
    renderGoalReplay3DView({
      state,
      game: footballGame,
      pipCamera,
      replayRenderer,
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
}
