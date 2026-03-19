import * as THREE from "three";

const WORLD_RADIUS = 150;
const WORLD_MOVE_LIMIT = WORLD_RADIUS - 3;
const JUKU_SPEED = 2.45;
const JUKU_TURN_SPEED = 130;
const PICKUP_RADIUS = 0.72;
const GRAVITY = 9.8;
const JUMP_VELOCITY = 4.65;
const JUKU_BASE_Y = -0.435;
const JUKU_COLLIDER_RADIUS = 0.34;
const ATHLETE_SCALE = 2.35;
const FOOTBALL_PERSON_RADIUS = 0.33 * ATHLETE_SCALE;
const TRACK_PERSON_RADIUS = 0.3 * ATHLETE_SCALE;
const COACH_PERSON_RADIUS = 0.4 * ATHLETE_SCALE;
const ATHLETE_BALL_REACH = 0.48 * ATHLETE_SCALE;
const TRACK_HURDLE_SCALE = 2.75;
const TRACK_LANE_COUNT = 8;
const TRACK_LANE_WIDTH = 1.25;
const TRACK_CURVE_INNER_RADIUS = 18.95;
const TRACK_CURVE_OUTER_RADIUS = TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * TRACK_LANE_COUNT;
const TRACK_STRAIGHT_HALF = 28.7;
const TRACK_HOME_APRON_EXTRA = TRACK_LANE_WIDTH * 1.7;
const TRACK_HOME_STRAIGHT_Z = -(TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * 0.5);
const TRACK_100M_START_X = -TRACK_STRAIGHT_HALF + 5.9;
const TRACK_FINISH_X = TRACK_STRAIGHT_HALF - 1.2;
const TRACK_FINISH_PROGRESS = TRACK_FINISH_X + TRACK_STRAIGHT_HALF;
const FOOTBALL_FIELD_HALF_WIDTH = 16.2;
const FOOTBALL_FIELD_HALF_LENGTH = 24.2;
const FOOTBALL_CENTER_CIRCLE_RADIUS = 4.25;
const FOOTBALL_PLAYER_COUNT = 12;
const FOOTBALL_GOAL_WIDTH = 8.8;
const FOOTBALL_GOAL_HEIGHT = 3.75;
const FOOTBALL_GOAL_DEPTH = 3.1;
const FOOTBALL_BALL_RADIUS = 0.24;
const FOOTBALL_BALL_GRAVITY = 18.5;
const FOOTBALL_BALL_GROUND_BOUNCE = 0.44;
const FOOTBALL_BALL_CONTROL_HEIGHT = 0.72;
const FOOTBALL_BALL_VOLLEY_HEIGHT = 1.28;
const FOOTBALL_BALL_SPEED_SCALE = 1.34;
const GOAL_CELEBRATION_DURATION = 25;
const GOAL_OVERLAY_DURATION = 15;
const ARCADE_SCORING_BOOST = 1.16;
const ARCADE_KEEPER_NERF = 0.78;
const TRACK_RUNNER_COUNT = 5;
const TRACK_HURDLE_COUNT = 10;
const TRACK_RUNNER_HURDLE_JUMP_VELOCITY = 3.95;
const TRACK_RUNNER_HURDLE_CLEARANCE_Y = 0.52;
const TRACK_RUNNER_HURDLE_IMPACT_LIFT = 1.6;
const TRACK_HURDLE_JUMP_TRIGGER = 1.28;
const TRACK_HURDLE_CONTACT_WINDOW = 0.22;
const TRACK_HURDLE_FALL_SPEED = 4.8;
const TRACK_HURDLE_RESET_TIME = 5;
const TRACK_HURDLE_RANDOM_FALL_RATE = 0.009;
const TRACK_RUNNER_PASS_TRIGGER = 3.1;
const TRACK_RUNNER_PASS_FRONT_CLEARANCE = 3.8;
const TRACK_RUNNER_PASS_BACK_CLEARANCE = 1.9;
const TRACK_RUNNER_LANE_CHANGE_RATE = 3.4;
const TRACK_RUNNER_MAX_PASS_LANE = 2;
const CAMERA_NAMES = {
  1: "1 FREE",
  2: "2 JUKU FOLLOW",
  3: "3 TV 2IN1",
  4: "4 TOP DOWN"
};
const CAMERA_ZOOM_DEFAULTS = {
  1: 1.28,
  2: 1.06,
  3: 0.86,
  4: 1.72
};
const CAMERA_ZOOM_LIMITS = {
  1: { min: 0.28, max: 2.8 },
  2: { min: 0.42, max: 1.95 },
  3: { min: 0.28, max: 1.78 },
  4: { min: 0.56, max: 3.3 }
};
const CAMERA_ZOOM_DOLLY = {
  1: 34,
  2: 16,
  3: 24,
  4: 34
};
const FACE_NAMES = {
  auto: "AUTO",
  calm: "CALM",
  angry: "ANGRY",
  surprised: "WOW",
  happy: "HAPPY",
  sad: "SAD"
};
const TEAM_DISPLAY_NAMES = {
  red: "Bosbos",
  blue: "Volta"
};
const FOOTBALL_BEHAVIOR_PRESET = "arcade"; // "realistic";
const FOOTBALL_BEHAVIOR_PRESETS = {
  realistic: {
    defenderStepDepthScale: 1,
    defenderStepRangeScale: 1,
    defenderCoverLerpScale: 1,
    defenderSpeedBonus: 0,
    progressiveChoiceBias: 0,
    longPassDistMin: 6.2,
    longPassForwardMin: 1.15,
    longPassScoreMin: 3.95,
    passDistanceTriggerBase: 3.4,
    passDistanceTriggerVariance: 0.7,
    passScoreBase: 4.25,
    passScoreDistanceDiscount: 0.07,
    passPowerBonusBase: 0.28,
    passPowerBonusScale: 0.12
  },
  arcade: {
    defenderStepDepthScale: 0.62,
    defenderStepRangeScale: 1.28,
    defenderCoverLerpScale: 1.28,
    defenderSpeedBonus: 0.12,
    progressiveChoiceBias: 0.22,
    longPassDistMin: 5.2,
    longPassForwardMin: 0.85,
    longPassScoreMin: 3.35,
    passDistanceTriggerBase: 2.6,
    passDistanceTriggerVariance: 0.95,
    passScoreBase: 3.7,
    passScoreDistanceDiscount: 0.11,
    passPowerBonusBase: 0.4,
    passPowerBonusScale: 0.18
  }
};
let FOOTBALL_BEHAVIOR = FOOTBALL_BEHAVIOR_PRESETS[FOOTBALL_BEHAVIOR_PRESET] ?? FOOTBALL_BEHAVIOR_PRESETS.realistic;
const FOOTBALL_ROLE_LABELS = {
  keeper: "Goalkeeper",
  defender: "Defender",
  midfielder: "Midfielder",
  attacker: "Attacker"
};
const FOOTBALL_TEAM_DATA = {
  red: [
    { number: 1, name: "Markus Saar", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced" },
    { number: 4, name: "Karl Tamm", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "tackle", speedProfile: "balanced" },
    { number: 17, name: "Rene Kask", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "press", speedProfile: "fast" },
    { number: 9, name: "Artur Lepp", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast" },
    { number: 11, name: "Martin Kuusk", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced" },
    { number: 27, name: "Sander Oja", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter" }
  ],
  blue: [
    { number: 1, name: "Rasmus Kivi", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced" },
    { number: 5, name: "Oliver Kask", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "mark", speedProfile: "balanced" },
    { number: 14, name: "Mark Randel", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "intercept", speedProfile: "fast" },
    { number: 19, name: "Mihkel Aron", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast" },
    { number: 51, name: "Lucas Nikolas", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced" },
    { number: 7, name: "Teodor Oliver", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter" }
  ]
};

function getDefaultFootballRole(lane) {
  if (lane === 0) return "keeper";
  if (lane <= 2) return "defender";
  return "attacker";
}

function normalizeFootballRosterEntry(entry, teamName, lane) {
  const fallbackName = teamName === "red" ? `Red ${lane + 1}` : `Blue ${lane + 1}`;
  const fallbackRole = getDefaultFootballRole(lane);
  const rosterEntry = entry ?? {};
  const role = rosterEntry.role ?? fallbackRole;
  return {
    number: rosterEntry.number ?? 0,
    name: rosterEntry.name ?? fallbackName,
    role,
    positionLabel: rosterEntry.positionLabel ?? FOOTBALL_ROLE_LABELS[role] ?? role,
    preferredFoot: rosterEntry.preferredFoot ?? "right",
    trait: rosterEntry.trait ?? null,
    speedProfile: rosterEntry.speedProfile ?? "balanced",
    attackProfile: rosterEntry.attackProfile ?? null,
    homeX: rosterEntry.homeX ?? null,
    homeZ: rosterEntry.homeZ ?? null
  };
}

function getFootballSpeedProfileModifiers(speedProfile) {
  switch (speedProfile) {
    case "slow":
      return { speedBias: -0.14, burstBoost: -0.04 };
    case "fast":
      return { speedBias: 0.1, burstBoost: 0.05 };
    case "sprinter":
      return { speedBias: 0.18, burstBoost: 0.1 };
    default:
      return { speedBias: 0, burstBoost: 0 };
  }
}

function getFootballTraitModifiers(trait, role) {
  const modifiers = {
    shotHunger: 0,
    speedBias: 0,
    pressBias: 0,
    burstBoost: 0,
    passVision: 0,
    tackleBias: 0,
    saveReach: 0,
    shotPower: 0,
    shotAccuracy: 0,
    crossQuality: 0,
    dribbleBias: 0
  };
  switch (trait) {
    case "pace":
      modifiers.speedBias += 0.12;
      modifiers.burstBoost += 0.08;
      modifiers.dribbleBias += 0.08;
      break;
    case "finish":
      modifiers.shotHunger += 0.16;
      modifiers.shotPower += 0.18;
      modifiers.shotAccuracy += 0.14;
      break;
    case "dribble":
      modifiers.speedBias += 0.05;
      modifiers.dribbleBias += 0.18;
      break;
    case "press":
      modifiers.pressBias += 0.16;
      modifiers.tackleBias += 0.08;
      break;
    case "tackle":
      modifiers.pressBias += 0.08;
      modifiers.tackleBias += 0.18;
      break;
    case "intercept":
      modifiers.pressBias += 0.1;
      modifiers.passVision += 0.06;
      modifiers.tackleBias += 0.12;
      break;
    case "mark":
      modifiers.pressBias += 0.08;
      modifiers.tackleBias += 0.1;
      break;
    case "reflex":
      modifiers.saveReach += role === "keeper" ? 0.22 : 0;
      break;
  }
  return modifiers;
}

function getFootballFootedness(player, ball, targetX = null) {
  const preferred = player?.preferredFoot === "left" ? "left" : "right";
  let naturalSide = preferred === "left" ? 1 : -1;
  let weakFoot = false;
  if (ball && player?.runner?.root) {
    const localBall = player.runner.root.worldToLocal(ball.position.clone());
    const ballSide = localBall.x >= 0 ? 1 : -1;
    const towardSide = targetX == null ? ballSide : Math.sign((targetX - player.runner.root.position.x) || ballSide || naturalSide);
    if (towardSide && towardSide !== naturalSide) {
      weakFoot = true;
      naturalSide = towardSide;
    }
  }
  return {
    kickSide: naturalSide,
    weakFoot,
    preferred
  };
}

function getFootballPlayerLabel(player) {
  if (!player) return "";
  return player.positionLabel ? `${player.shirtNumber} - ${player.displayName} (${player.positionLabel})` : `${player.shirtNumber} - ${player.displayName}`;
}
const canvas = document.querySelector("#scene");
const cameraStatus = document.querySelector("#camera-status");
const faceStatus = document.querySelector("#face-status");
const scoreStatus = document.querySelector("#score-status");
const attackStatus = document.querySelector("#attack-status");
const playerStatus = document.querySelector("#player-status");
const behaviorModeButtons = Array.from(document.querySelectorAll("[data-behavior]"));
const touchActions = document.querySelector("#touch-actions");
const touchJumpButton = document.querySelector("#touch-jump");
const touchEquipButton = document.querySelector("#touch-equip");
const touchZoomInButton = document.querySelector("#touch-zoom-in");
const touchZoomOutButton = document.querySelector("#touch-zoom-out");
const touchCameraName = document.querySelector("#touch-camera-name");
const touchFaceName = document.querySelector("#touch-face-name");
const touchCameraButtons = Array.from(document.querySelectorAll(".touch-camera-button"));
const touchFaceButtons = Array.from(document.querySelectorAll(".touch-face-button"));
const touchJoystick = document.querySelector("#touch-joystick");
const touchJoystickThumb = document.querySelector("#touch-joystick-thumb");
const pipFrame = document.createElement("div");
pipFrame.style.position = "fixed";
pipFrame.style.pointerEvents = "none";
pipFrame.style.display = "none";
pipFrame.style.zIndex = "12";
pipFrame.style.border = "2px solid rgba(255,255,255,0.92)";
pipFrame.style.borderRadius = "14px";
pipFrame.style.boxShadow = "0 14px 30px rgba(15,23,42,0.28)";
pipFrame.style.overflow = "hidden";
pipFrame.style.background = "transparent";
const pipLabel = document.createElement("div");
pipLabel.textContent = "LIVE 2";
pipLabel.style.position = "absolute";
pipLabel.style.left = "10px";
pipLabel.style.top = "10px";
pipLabel.style.padding = "4px 8px";
pipLabel.style.borderRadius = "999px";
pipLabel.style.background = "rgba(15,23,42,0.82)";
pipLabel.style.color = "#f8fafc";
pipLabel.style.font = "700 11px/1.1 system-ui, sans-serif";
pipLabel.style.letterSpacing = "0.12em";
pipFrame.appendChild(pipLabel);
document.body.appendChild(pipFrame);

const goalOverlay = document.createElement("div");
goalOverlay.style.position = "fixed";
goalOverlay.style.left = "50%";
goalOverlay.style.top = "50%";
goalOverlay.style.transform = "translate(-50%, -50%) scale(0.82)";
goalOverlay.style.opacity = "0";
goalOverlay.style.display = "none";
goalOverlay.style.pointerEvents = "none";
goalOverlay.style.zIndex = "18";
goalOverlay.style.minWidth = "min(72vw, 680px)";
goalOverlay.style.padding = "26px 34px";
goalOverlay.style.borderRadius = "28px";
goalOverlay.style.textAlign = "center";
goalOverlay.style.background = "linear-gradient(180deg, rgba(15,23,42,0.28), rgba(15,23,42,0.08))";
goalOverlay.style.boxShadow = "0 18px 42px rgba(15,23,42,0.16)";
goalOverlay.style.backdropFilter = "none";
goalOverlay.style.border = "1px solid rgba(255,255,255,0.08)";
const goalOverlayTitle = document.createElement("div");
goalOverlayTitle.textContent = "GOAL";
goalOverlayTitle.style.font = '900 clamp(48px, 11vw, 124px)/0.9 "Trebuchet MS", Verdana, sans-serif';
goalOverlayTitle.style.letterSpacing = "0.16em";
goalOverlayTitle.style.textIndent = "0.16em";
goalOverlayTitle.style.color = "#f8fafc";
goalOverlayTitle.style.textShadow = "0 8px 18px rgba(15,23,42,0.22)";
const goalOverlayScorer = document.createElement("div");
goalOverlayScorer.style.marginTop = "16px";
goalOverlayScorer.style.font = '700 clamp(18px, 3vw, 32px)/1.1 "Trebuchet MS", Verdana, sans-serif';
goalOverlayScorer.style.letterSpacing = "0.08em";
goalOverlayScorer.style.textTransform = "uppercase";
goalOverlayScorer.style.color = "#dbeafe";
goalOverlay.appendChild(goalOverlayTitle);
goalOverlay.appendChild(goalOverlayScorer);
document.body.appendChild(goalOverlay);

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
scene.add(footballGame.group);
updateScoreboard(footballGame);

const juku = buildJuku();
const jukuNameTag = makeFootballNameTag("Juku", "rgba(29,99,181,0.92)");
jukuNameTag.position.set(0, 4.22, 0);
jukuNameTag.material.opacity = 0.82;
juku.root.add(jukuNameTag);
scene.add(juku.root);

const droppedSword = buildSword();
droppedSword.root.visible = false;
scene.add(droppedSword.root);


const state = {
  keys: new Set(),
  prevEnter: false,
  prevE: false,
  jumpState: 0,
  jumpTimer: 0,
  jumpY: 0,
  jumpVel: 0,
  crouchBlend: 0,
  pushBlend: 0,
  airBlend: 0,
  x: FOOTBALL_FIELD_HALF_WIDTH + 5.2,
  z: -7.8,
  yaw: -115,
  walkCycle: 0,
  walkBlend: 0,
  turnCycle: 0,
  turnBlend: 0,
  swordHeld: true,
  swordX: 0.45,
  swordZ: -2.8,
  swordYaw: 18,
  activeCam: 1,
  cameraYaw: 90,
  cameraZoom: CAMERA_ZOOM_DEFAULTS[1],
  cameraZoomTarget: CAMERA_ZOOM_DEFAULTS[1],
  cameraZoomMemory: {
    1: { zoom: CAMERA_ZOOM_DEFAULTS[1], target: CAMERA_ZOOM_DEFAULTS[1] },
    2: { zoom: CAMERA_ZOOM_DEFAULTS[2], target: CAMERA_ZOOM_DEFAULTS[2] },
    3: { zoom: CAMERA_ZOOM_DEFAULTS[3], target: CAMERA_ZOOM_DEFAULTS[3] },
    4: { zoom: CAMERA_ZOOM_DEFAULTS[4], target: CAMERA_ZOOM_DEFAULTS[4] }
  },
  cam2Yaw: 0.678,
  cam2Distance: 9.25,
  cam2Height: 4.17,
  cam2PrevX: FOOTBALL_FIELD_HALF_WIDTH + 5.2,
  cam2PrevZ: -7.8,
  cam2FocusX: FOOTBALL_FIELD_HALF_WIDTH + 5.2,
  cam2FocusZ: -7.8,
  cam2Motion: 0,
  cam2CloseUp: false,
  cam3Side: 1,
  cam3SideBlend: 1,
  cam3SetupA: null,
  cam3SetupB: null,
  cam3SwitchCooldown: 0,
  topDownUpX: 0,
  topDownUpZ: -1,
  touchMove: 0,
  touchTurn: 0,
  touchJump: false,
  touchETrigger: false,
  touchPointerId: null,
  touchJumpPointerId: null,
  pointerX: 0,
  pointerY: 0,
  faceMode: "auto",
  faceTime: 0,
  blinkTimer: 0,
  nextBlink: 1.6 + Math.random() * 2.2,
  tongueActive: false,
  tongueBlend: 0,
  tongueTimer: 0,
  nextTongueEvent: 0.9 + Math.random() * 2.8,
  tonguePhase: Math.random() * Math.PI * 2,
  behaviorPreset: FOOTBALL_BEHAVIOR_PRESET,
  lastT: performance.now()
};

function setFootballBehaviorPreset(preset) {
  if (!FOOTBALL_BEHAVIOR_PRESETS[preset]) return;
  state.behaviorPreset = preset;
  FOOTBALL_BEHAVIOR = FOOTBALL_BEHAVIOR_PRESETS[preset];
  for (const button of behaviorModeButtons) {
    button.classList.toggle("is-active", button.dataset.behavior === preset);
    button.setAttribute("aria-pressed", button.dataset.behavior === preset ? "true" : "false");
  }
}

cameraRig.position.set(0, 11.2, 0);
cameraRig.rotation.y = THREE.MathUtils.degToRad(state.cameraYaw);

window.addEventListener("keydown", (event) => {
  state.keys.add(event.code);
  if (event.code === "Digit1") setActiveCamera(1);
  if (event.code === "Digit2") setActiveCamera(2);
  if (event.code === "Digit3") setActiveCamera(3);
  if (event.code === "Digit4") setActiveCamera(4);
  if (event.code === "KeyZ") setFaceMode("calm");
  if (event.code === "KeyX") setFaceMode("angry");
  if (event.code === "KeyC") setFaceMode("surprised");
  if (event.code === "KeyB") setFaceMode("happy");
  if (event.code === "KeyN") setFaceMode("sad");
  if (event.code === "KeyV") setFaceMode("auto");
});

window.addEventListener("keyup", (event) => {
  state.keys.delete(event.code);
});

window.addEventListener("mousemove", (event) => {
  state.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
  state.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
});

window.addEventListener("wheel", (event) => {
  const zoomStep = event.deltaY > 0 ? 0.12 : -0.12;
  adjustTouchZoom(zoomStep);
  event.preventDefault();
}, { passive: false });

window.addEventListener("resize", resize);
resize();

function setTouchJoystickVisual(x, y, active) {
  if (!touchJoystick || !touchJoystickThumb) return;
  touchJoystick.classList.toggle("is-active", active);
  touchJoystickThumb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

function resetTouchJoystick() {
  state.touchMove = 0;
  state.touchTurn = 0;
  state.touchPointerId = null;
  setTouchJoystickVisual(0, 0, false);
}

function setTouchJumpVisual(active) {
  if (!touchJumpButton) return;
  touchJumpButton.classList.toggle("is-active", active);
}

function setTouchEquipVisual(active) {
  if (!touchEquipButton) return;
  touchEquipButton.classList.toggle("is-active", active);
}

function syncTouchFaceButtons() {
  if (touchFaceName) touchFaceName.textContent = FACE_NAMES[state.faceMode] || state.faceMode.toUpperCase();
  if (!touchFaceButtons.length) return;
  for (const button of touchFaceButtons) {
    button.classList.toggle("is-active", button.dataset.face === state.faceMode);
  }
}

function setFaceMode(mode) {
  state.faceMode = mode;
  if (mode !== "auto") {
    setActiveCamera(2);
    state.cam2Yaw = THREE.MathUtils.degToRad(state.yaw);
    state.cam2FocusX = state.x;
    state.cam2FocusZ = state.z;
    state.cam2Motion = 0;
    state.cam2CloseUp = true;
  }
  syncTouchFaceButtons();
}

function syncTouchCameraButtons() {
  if (touchCameraName) touchCameraName.textContent = CAMERA_NAMES[state.activeCam];
  if (!touchCameraButtons.length) return;
  for (const button of touchCameraButtons) {
    button.classList.toggle("is-active", Number(button.dataset.cam) === state.activeCam);
  }
}

function clampCameraZoom(cam, value) {
  const limits = CAMERA_ZOOM_LIMITS[cam] || CAMERA_ZOOM_LIMITS[1];
  return THREE.MathUtils.clamp(value, limits.min, limits.max);
}

function setCameraZoomTarget(nextTarget) {
  const clamped = clampCameraZoom(state.activeCam, nextTarget);
  state.cameraZoomTarget = clamped;
  if (state.cameraZoomMemory[state.activeCam]) {
    state.cameraZoomMemory[state.activeCam].target = clamped;
  }
}

function adjustTouchZoom(delta) {
  setCameraZoomTarget(state.cameraZoomTarget + delta * 1.35);
}

const cameraDollyPos = new THREE.Vector3();
const cameraDollyDir = new THREE.Vector3();

function getCameraDolly(cam, zoom) {
  const base = CAMERA_ZOOM_DEFAULTS[cam] ?? CAMERA_ZOOM_DEFAULTS[1];
  const scale = CAMERA_ZOOM_DOLLY[cam] ?? 0;
  return (base - zoom) * scale;
}

function dollyCameraTowards(x, y, z, lookX, lookY, lookZ, dolly) {
  cameraDollyPos.set(x, y, z);
  if (Math.abs(dolly) < 0.0001) return cameraDollyPos;
  cameraDollyDir.set(lookX - x, lookY - y, lookZ - z);
  const dist = cameraDollyDir.length();
  if (dist < 0.001) return cameraDollyPos;
  const clamped = THREE.MathUtils.clamp(dolly, -dist * 2.4, dist - 0.35);
  cameraDollyDir.multiplyScalar(1 / dist);
  cameraDollyPos.addScaledVector(cameraDollyDir, clamped);
  return cameraDollyPos;
}

function updateTouchEquipLabel() {
  if (!touchEquipButton) return;
  if (state.swordHeld) {
    touchEquipButton.textContent = "DROP";
    return;
  }
  touchEquipButton.textContent = "PICK UP";
}

function setActiveCamera(cam) {
  if (!CAMERA_NAMES[cam]) return;
  if (state.cameraZoomMemory[state.activeCam]) {
    state.cameraZoomMemory[state.activeCam].zoom = state.cameraZoom;
    state.cameraZoomMemory[state.activeCam].target = state.cameraZoomTarget;
  }
  state.activeCam = cam;
  const memory = state.cameraZoomMemory[cam];
  if (memory) {
    state.cameraZoom = clampCameraZoom(cam, memory.zoom);
    state.cameraZoomTarget = clampCameraZoom(cam, memory.target);
  }
  if (cam === 2) {
    state.cam2PrevX = state.x;
    state.cam2PrevZ = state.z;
    state.cam2FocusX = state.x;
    state.cam2FocusZ = state.z;
    state.cam2Motion = 0;
    state.cam2CloseUp = true;
    state.cam2Yaw = THREE.MathUtils.degToRad(state.yaw);
  }
  syncTouchCameraButtons();
}

function updateTouchJoystick(event) {
  if (!touchJoystick) return;
  const rect = touchJoystick.getBoundingClientRect();
  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.5;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const maxRadius = rect.width * 0.36;
  const dist = Math.hypot(dx, dy);
  const scale = dist > maxRadius ? maxRadius / Math.max(dist, 0.001) : 1;
  const clampedX = dx * scale;
  const clampedY = dy * scale;
  const nx = clampedX / Math.max(maxRadius, 1);
  const ny = clampedY / Math.max(maxRadius, 1);
  state.touchTurn = THREE.MathUtils.clamp(-nx, -1, 1);
  state.touchMove = THREE.MathUtils.clamp(-ny, -1, 1);
  setTouchJoystickVisual(clampedX, clampedY, true);
}

if (touchJumpButton) {
  const endJumpTouch = (event) => {
    if (state.touchJumpPointerId !== null && event.pointerId !== state.touchJumpPointerId) return;
    state.touchJump = false;
    state.touchJumpPointerId = null;
    setTouchJumpVisual(false);
  };

  touchJumpButton.addEventListener("pointerdown", (event) => {
    state.touchJump = true;
    state.touchJumpPointerId = event.pointerId;
    touchJumpButton.setPointerCapture?.(event.pointerId);
    setTouchJumpVisual(true);
    event.preventDefault();
  });
  touchJumpButton.addEventListener("pointerup", endJumpTouch);
  touchJumpButton.addEventListener("pointercancel", endJumpTouch);
  touchJumpButton.addEventListener("lostpointercapture", () => {
    state.touchJump = false;
    state.touchJumpPointerId = null;
    setTouchJumpVisual(false);
  });
}

if (touchEquipButton) {
  const endEquipTouch = () => {
    setTouchEquipVisual(false);
  };

  touchEquipButton.addEventListener("pointerdown", (event) => {
    state.touchETrigger = true;
    setTouchEquipVisual(true);
    event.preventDefault();
  });
  touchEquipButton.addEventListener("pointerup", endEquipTouch);
  touchEquipButton.addEventListener("pointercancel", endEquipTouch);
  touchEquipButton.addEventListener("lostpointercapture", endEquipTouch);
}

if (touchCameraButtons.length) {
  for (const button of touchCameraButtons) {
    button.addEventListener("pointerdown", (event) => {
      const cam = Number(button.dataset.cam);
      if (Number.isFinite(cam)) setActiveCamera(cam);
      event.preventDefault();
    });
  }
  syncTouchCameraButtons();
}

if (touchFaceButtons.length) {
  for (const button of touchFaceButtons) {
    button.addEventListener("pointerdown", (event) => {
      if (button.dataset.face) setFaceMode(button.dataset.face);
      event.preventDefault();
    });
  }
}
if (behaviorModeButtons.length) {
  for (const button of behaviorModeButtons) {
    button.addEventListener("pointerdown", (event) => {
      if (button.dataset.behavior) setFootballBehaviorPreset(button.dataset.behavior);
      event.preventDefault();
    });
  }
}
syncTouchFaceButtons();
setFootballBehaviorPreset(state.behaviorPreset);
updateTouchEquipLabel();

if (touchZoomInButton) {
  touchZoomInButton.addEventListener("pointerdown", (event) => {
    adjustTouchZoom(-0.14);
    event.preventDefault();
  });
}

if (touchZoomOutButton) {
  touchZoomOutButton.addEventListener("pointerdown", (event) => {
    adjustTouchZoom(0.14);
    event.preventDefault();
  });
}

if (touchJoystick) {
  const base = touchJoystick.querySelector(".touch-joystick-base");
  base?.addEventListener("pointerdown", (event) => {
    state.touchPointerId = event.pointerId;
    base.setPointerCapture?.(event.pointerId);
    updateTouchJoystick(event);
    event.preventDefault();
  });
  base?.addEventListener("pointermove", (event) => {
    if (state.touchPointerId !== event.pointerId) return;
    updateTouchJoystick(event);
    event.preventDefault();
  });
  const endTouch = (event) => {
    if (state.touchPointerId !== event.pointerId) return;
    resetTouchJoystick();
  };
  base?.addEventListener("pointerup", endTouch);
  base?.addEventListener("pointercancel", endTouch);
  base?.addEventListener("lostpointercapture", () => {
    resetTouchJoystick();
  });
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  pipCamera.fov = camera.fov;
  pipCamera.updateProjectionMatrix();
}

function buildFloor() {
  const group = new THREE.Group();

  const disk = new THREE.Mesh(
    new THREE.CircleGeometry(WORLD_RADIUS, 96),
    new THREE.MeshStandardMaterial({ color: 0x367f35, roughness: 1 })
  );
  disk.rotation.x = -Math.PI / 2;
  disk.receiveShadow = true;
  group.add(disk);

  return group;
}

function makeMat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
}

function addPart(parent, geometry, color, pos, rot) {
  const mesh = new THREE.Mesh(geometry, makeMat(color));
  mesh.position.copy(pos);
  if (rot) mesh.rotation.set(rot.x, rot.y, rot.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addScaledPart(parent, geometry, color, pos, scale, rot) {
  const mesh = addPart(parent, geometry, color, pos, rot);
  mesh.scale.copy(scale);
  return mesh;
}

function buildOpenHand(parent, palette, side) {
  const hand = new THREE.Group();
  parent.add(hand);

  addScaledPart(
    hand,
    new THREE.SphereGeometry(0.07, 18, 14),
    palette.skin,
    new THREE.Vector3(0, -0.065, 0.028),
    new THREE.Vector3(0.66, 0.48, 1.02)
  );
  addScaledPart(
    hand,
    new THREE.SphereGeometry(0.05, 16, 12),
    palette.skin,
    new THREE.Vector3(0, -0.108, 0.01),
    new THREE.Vector3(0.52, 0.3, 0.72)
  );
  addScaledPart(
    hand,
    new THREE.SphereGeometry(0.055, 16, 12),
    palette.skin,
    new THREE.Vector3(-side * 0.028, -0.062, -0.004),
    new THREE.Vector3(0.72, 0.58, 1.0)
  );

  const fingerData = [
    { x: -0.026, len1: 0.058, len2: 0.041, spread: -16 },
    { x: -0.009, len1: 0.083, len2: 0.057, spread: -6 },
    { x: 0.01, len1: 0.078, len2: 0.054, spread: 4 },
    { x: 0.026, len1: 0.056, len2: 0.039, spread: 13 }
  ];

  fingerData.forEach(({ x, len1, len2, spread }, index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.028, 0.075);
    pivot.rotation.set(THREE.MathUtils.degToRad(index + 1), THREE.MathUtils.degToRad(side * spread), 0);
    hand.add(pivot);

    addScaledPart(
      pivot,
      new THREE.CapsuleGeometry(0.0086, len1 - 0.017, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len1 * 0.5, 0),
      new THREE.Vector3(0.95, 1, 0.95)
    );

    const mid = new THREE.Group();
    mid.position.y = -len1;
    mid.rotation.x = THREE.MathUtils.degToRad(8 + index);
    pivot.add(mid);
    addScaledPart(
      mid,
      new THREE.CapsuleGeometry(0.0071, len2 - 0.015, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len2 * 0.5, 0),
      new THREE.Vector3(0.94, 1, 0.94)
    );
  });

  const thumbBase = new THREE.Group();
  thumbBase.position.set(-side * 0.048, -0.08, 0.004);
  thumbBase.rotation.set(
    THREE.MathUtils.degToRad(-16),
    THREE.MathUtils.degToRad(-side * 58),
    THREE.MathUtils.degToRad(-side * 22)
  );
  hand.add(thumbBase);

  addScaledPart(
    thumbBase,
    new THREE.CapsuleGeometry(0.0082, 0.026, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.019, 0),
    new THREE.Vector3(1, 1, 0.95)
  );
  const thumbTip = new THREE.Group();
  thumbTip.position.y = -0.038;
  thumbTip.rotation.x = THREE.MathUtils.degToRad(-6);
  thumbBase.add(thumbTip);
  addScaledPart(
    thumbTip,
    new THREE.CapsuleGeometry(0.0065, 0.02, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.015, 0),
    new THREE.Vector3(1, 1, 0.95)
  );

  return hand;
}

function buildSwordHand(parent, palette, side) {
  const hand = new THREE.Group();
  parent.add(hand);

  addScaledPart(
    hand,
    new THREE.SphereGeometry(0.074, 18, 14),
    palette.skin,
    new THREE.Vector3(0, -0.058, 0.034),
    new THREE.Vector3(0.76, 0.5, 1.06)
  );
  addScaledPart(
    hand,
    new THREE.SphereGeometry(0.052, 16, 12),
    palette.skin,
    new THREE.Vector3(0, -0.1, 0.004),
    new THREE.Vector3(0.56, 0.34, 0.78)
  );

  const fingerData = [
    { x: -0.028, len1: 0.062, len2: 0.045, spread: -7 },
    { x: -0.01, len1: 0.078, len2: 0.056, spread: -3 },
    { x: 0.01, len1: 0.076, len2: 0.054, spread: 3 },
    { x: 0.028, len1: 0.06, len2: 0.043, spread: 7 }
  ];

  fingerData.forEach(({ x, len1, len2, spread }, index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.034, 0.066);
    pivot.rotation.set(THREE.MathUtils.degToRad(24 + index * 2), THREE.MathUtils.degToRad(side * spread), 0);
    hand.add(pivot);

    addScaledPart(
      pivot,
      new THREE.CapsuleGeometry(0.0105, len1 - 0.018, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len1 * 0.5, 0),
      new THREE.Vector3(1, 1, 0.96)
    );

    const mid = new THREE.Group();
    mid.position.y = -len1;
    mid.rotation.x = THREE.MathUtils.degToRad(18);
    pivot.add(mid);
    addScaledPart(
      mid,
      new THREE.CapsuleGeometry(0.0085, len2 - 0.015, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len2 * 0.5, 0),
      new THREE.Vector3(1, 1, 0.96)
    );
  });

  const thumbBase = new THREE.Group();
  thumbBase.position.set(-side * 0.04, -0.048, 0.052);
  thumbBase.rotation.set(
    THREE.MathUtils.degToRad(-30),
    THREE.MathUtils.degToRad(-side * 46),
    THREE.MathUtils.degToRad(-side * 16)
  );
  hand.add(thumbBase);

  addScaledPart(
    thumbBase,
    new THREE.CapsuleGeometry(0.009, 0.03, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.02, 0),
    new THREE.Vector3(1, 1, 0.96)
  );
  const thumbTip = new THREE.Group();
  thumbTip.position.y = -0.04;
  thumbTip.rotation.x = THREE.MathUtils.degToRad(-10);
  thumbBase.add(thumbTip);
  addScaledPart(
    thumbTip,
    new THREE.CapsuleGeometry(0.007, 0.023, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.016, 0),
    new THREE.Vector3(1, 1, 0.96)
  );

  return hand;
}

function buildJuku() {
  const root = new THREE.Group();
  root.position.y = JUKU_BASE_Y;

  const palette = {
    skin: 0xe7c1a3,
    shirt: 0x2d63b5,
    pants: 0xc5202a,
    shoe: 0x151618,
    hair: 0x2f1a0f,
    white: 0xf6f7fb
  };

  const torso = new THREE.Group();
  torso.position.set(0, 2.15, -0.03);
  root.add(torso);
  const hips = addPart(root, new THREE.CylinderGeometry(0.42, 0.34, 0.28, 28), palette.pants, new THREE.Vector3(0, 1.81, -0.02));
  hips.scale.z = 0.88;
  addPart(torso, new THREE.CylinderGeometry(0.48, 0.39, 0.24, 28), palette.shirt, new THREE.Vector3(0, 0.43, 0));
  addPart(torso, new THREE.CylinderGeometry(0.39, 0.27, 0.32, 28), palette.shirt, new THREE.Vector3(0, 0.15, 0));
  addPart(torso, new THREE.CylinderGeometry(0.27, 0.34, 0.23, 28), 0x275aa4, new THREE.Vector3(0, -0.12, 0));
  const chest = addPart(torso, new THREE.SphereGeometry(0.18, 18, 14), 0x3b6fc1, new THREE.Vector3(0, 0.18, 0.15));
  chest.scale.set(0.85, 1.1, 0.34);
  const belly = addPart(torso, new THREE.SphereGeometry(0.16, 18, 14), 0x3768b7, new THREE.Vector3(0, -0.05, 0.13));
  belly.scale.set(0.8, 1, 0.32);

  addPart(root, new THREE.TorusGeometry(0.17, 0.04, 10, 20), palette.white, new THREE.Vector3(0, 2.75, 0.02), new THREE.Euler(Math.PI / 2, 0, 0));
  const neck = addPart(root, new THREE.CylinderGeometry(0.095, 0.12, 0.27, 16), palette.skin, new THREE.Vector3(0, 2.89, 0.01));
  neck.scale.z = 0.88;

  const head = new THREE.Group();
  head.position.set(0, 3.27, 0);
  root.add(head);

  const skull = addPart(head, new THREE.SphereGeometry(0.44, 30, 22), palette.skin, new THREE.Vector3(0, 0, 0));
  skull.scale.set(0.92, 1.02, 0.95);
  addPart(head, new THREE.SphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(-0.4, 0.03, 0));
  addPart(head, new THREE.SphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(0.4, 0.03, 0));

  const hairCap = addPart(head, new THREE.SphereGeometry(0.45, 26, 18, 0, Math.PI * 2, 0, Math.PI * 0.46), palette.hair, new THREE.Vector3(0, 0.23, -0.035));
  hairCap.scale.set(0.94, 0.82, 0.95);

  const leftEye = new THREE.Group();
  leftEye.position.set(-0.138, 0.058, 0.372);
  head.add(leftEye);
  leftEye.scale.z = 0.62;
  addPart(leftEye, new THREE.SphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  const leftPupil = addPart(leftEye, new THREE.SphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(leftEye, new THREE.SphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));
  const leftUpperLid = addScaledPart(
    leftEye,
    new THREE.SphereGeometry(0.05, 14, 10),
    palette.skin,
    new THREE.Vector3(0, 0.046, 0.03),
    new THREE.Vector3(1.7, 0.19, 0.54)
  );
  const leftLowerLid = addScaledPart(
    leftEye,
    new THREE.SphereGeometry(0.048, 14, 10),
    palette.skin,
    new THREE.Vector3(0, -0.046, 0.03),
    new THREE.Vector3(1.65, 0.13, 0.52)
  );
  leftUpperLid.visible = false;
  leftLowerLid.visible = false;

  const rightEye = new THREE.Group();
  rightEye.position.set(0.138, 0.058, 0.372);
  head.add(rightEye);
  rightEye.scale.z = 0.62;
  addPart(rightEye, new THREE.SphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  const rightPupil = addPart(rightEye, new THREE.SphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(rightEye, new THREE.SphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));
  const rightUpperLid = addScaledPart(
    rightEye,
    new THREE.SphereGeometry(0.05, 14, 10),
    palette.skin,
    new THREE.Vector3(0, 0.046, 0.03),
    new THREE.Vector3(1.7, 0.19, 0.54)
  );
  const rightLowerLid = addScaledPart(
    rightEye,
    new THREE.SphereGeometry(0.048, 14, 10),
    palette.skin,
    new THREE.Vector3(0, -0.046, 0.03),
    new THREE.Vector3(1.65, 0.13, 0.52)
  );
  rightUpperLid.visible = false;
  rightLowerLid.visible = false;

  const leftBrow = addPart(
    head,
    new THREE.CapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(-0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(82))
  );
  const rightBrow = addPart(
    head,
    new THREE.CapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-82))
  );
  const nose = addPart(head, new THREE.SphereGeometry(0.06, 14, 12), 0xdb9086, new THREE.Vector3(0, -0.022, 0.45));
  nose.scale.set(1.08, 1, 1.35);
  const mouth = new THREE.Group();
  mouth.position.set(0, -0.17, 0.402);
  head.add(mouth);
  const mouthLine = addScaledPart(
    mouth,
    new THREE.SphereGeometry(0.046, 16, 12),
    0xb8484f,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2.18, 0.25, 0.56)
  );
  const mouthInner = addScaledPart(
    mouth,
    new THREE.SphereGeometry(0.042, 16, 12),
    0x5d171d,
    new THREE.Vector3(0, -0.008, 0.016),
    new THREE.Vector3(1.42, 0.1, 0.44)
  );
  const tongue = addScaledPart(
    mouth,
    new THREE.SphereGeometry(0.024, 12, 10),
    0xd9858b,
    new THREE.Vector3(0, -0.022, 0.024),
    new THREE.Vector3(1.55, 0.32, 1.02)
  );

  const leftArm = buildArm(palette, false);
  const rightArm = buildArm(palette, true);
  leftArm.root.position.set(0.47, 2.49, 0);
  rightArm.root.position.set(-0.47, 2.49, 0);
  root.add(leftArm.root, rightArm.root);

  const heldSword = buildSword();
  heldSword.root.scale.setScalar(0.88);
  heldSword.root.position.set(0.015, -0.08, 0.16);
  heldSword.root.rotation.set(THREE.MathUtils.degToRad(-104), 0, THREE.MathUtils.degToRad(-10));
  rightArm.handPivot.add(heldSword.root);

  const leftLeg = buildLeg(palette);
  const rightLeg = buildLeg(palette);
  leftLeg.root.position.set(0.17, 1.58, -0.02);
  rightLeg.root.position.set(-0.17, 1.58, -0.02);
  root.add(leftLeg.root, rightLeg.root);

  return {
    root,
    hips,
    torso,
    head,
    leftEye,
    rightEye,
    leftUpperLid,
    leftLowerLid,
    rightUpperLid,
    rightLowerLid,
    leftPupil,
    rightPupil,
    pupilBase: {
      left: new THREE.Vector3(0, -0.007, 0.048),
      right: new THREE.Vector3(0, -0.007, 0.048)
    },
    leftBrow,
    rightBrow,
    browBase: {
      left: new THREE.Vector3(-0.17, 0.18, 0.38),
      right: new THREE.Vector3(0.17, 0.18, 0.38)
    },
    mouth,
    mouthLine,
    mouthInner,
    tongue,
    leftArm,
    rightArm,
    heldSword,
    leftLeg,
    rightLeg
  };
}

function buildArm(palette, swordHand) {
  const root = new THREE.Group();
  const upperPivot = new THREE.Group();
  const lowerPivot = new THREE.Group();
  const handPivot = new THREE.Group();
  root.add(upperPivot);
  addPart(upperPivot, new THREE.SphereGeometry(0.084, 18, 14), palette.skin, new THREE.Vector3(0, 0, 0));
  addPart(upperPivot, new THREE.CylinderGeometry(0.066, 0.056, 0.35, 18), palette.skin, new THREE.Vector3(0, -0.175, 0));
  lowerPivot.position.set(0, -0.35, 0);
  upperPivot.add(lowerPivot);
  addPart(lowerPivot, new THREE.SphereGeometry(0.066, 16, 12), palette.skin, new THREE.Vector3(0, 0, 0));
  addPart(lowerPivot, new THREE.CylinderGeometry(0.053, 0.044, 0.31, 18), palette.skin, new THREE.Vector3(0, -0.155, 0));
  handPivot.position.set(0, -0.31, 0);
  lowerPivot.add(handPivot);

  if (swordHand) {
    const openHand = buildOpenHand(handPivot, palette, -1);
    const gripHand = buildSwordHand(handPivot, palette, -1);
    gripHand.visible = false;
    return { root, upperPivot, lowerPivot, handPivot, swordHand, openHand, gripHand };
  } else {
    const openHand = buildOpenHand(handPivot, palette, 1);
    return { root, upperPivot, lowerPivot, handPivot, swordHand, openHand, gripHand: null };
  }
}

function buildLeg(palette) {
  const root = new THREE.Group();
  const kneePivot = new THREE.Group();
  const footPivot = new THREE.Group();
  addPart(root, new THREE.SphereGeometry(0.092, 16, 12), palette.pants, new THREE.Vector3(0, 0, 0));
  addPart(root, new THREE.CylinderGeometry(0.094, 0.074, 0.56, 18), palette.pants, new THREE.Vector3(0, -0.28, 0));
  kneePivot.position.set(0, -0.56, 0);
  root.add(kneePivot);
  addPart(kneePivot, new THREE.SphereGeometry(0.094, 14, 10), palette.pants, new THREE.Vector3(0, 0, 0));
  addScaledPart(
    kneePivot,
    new THREE.SphereGeometry(0.05, 12, 10),
    0xe0464d,
    new THREE.Vector3(0, 0.009, 0.058),
    new THREE.Vector3(0.96, 0.72, 0.48)
  );
  addPart(kneePivot, new THREE.CylinderGeometry(0.078, 0.064, 0.5, 18), palette.pants, new THREE.Vector3(0, -0.25, 0));
  footPivot.position.set(0, -0.5, 0);
  kneePivot.add(footPivot);
  addPart(footPivot, new THREE.SphereGeometry(0.074, 12, 10), palette.shoe, new THREE.Vector3(0, 0, 0));
  addScaledPart(
    footPivot,
    new THREE.SphereGeometry(0.12, 18, 14),
    palette.shoe,
    new THREE.Vector3(0, -0.042, 0.112),
    new THREE.Vector3(0.96, 0.36, 1.72)
  );
  addScaledPart(
    footPivot,
    new THREE.SphereGeometry(0.08, 16, 12),
    0x232427,
    new THREE.Vector3(0, -0.018, 0.238),
    new THREE.Vector3(1, 0.38, 0.98)
  );
  return { root, kneePivot, footPivot };
}

function buildSword() {
  const root = new THREE.Group();
  addPart(root, new THREE.CylinderGeometry(0.013, 0.0115, 0.112, 12), 0x5b381a, new THREE.Vector3(0, -0.07, 0.012), new THREE.Euler(0, 0, 0));
  addPart(root, new THREE.SphereGeometry(0.018, 12, 10), 0xb7bcc5, new THREE.Vector3(0, -0.126, 0.012));
  addPart(root, new THREE.CylinderGeometry(0.062, 0.062, 0.008, 20), 0xc8ccd2, new THREE.Vector3(0, 0, 0.028), new THREE.Euler(Math.PI / 2, 0, 0));
  const bladeColors = [0xdce3ff, 0xbfe3ff, 0xb1f5d4, 0xd4ef57, 0xf59d64, 0xe989d6];
  bladeColors.forEach((color, index) => {
    addPart(root, new THREE.BoxGeometry(0.026, 0.057, 0.02), color, new THREE.Vector3(0, -0.09 - index * 0.057, 0.028));
  });
  addPart(root, new THREE.CylinderGeometry(0.011, 0.0036, 0.11, 12), 0xf1f4fb, new THREE.Vector3(0, -0.47, 0.028));
  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return { root };
}

function buildHandStudy() {
  const group = new THREE.Group();
  const skin = makeMat(0xe7c1a3);

  const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.061, 0.31, 20), skin);
  forearm.position.set(2.6, 1.42 - 0.155, -1.3);
  forearm.rotation.set(THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(-28), 0);
  forearm.castShadow = true;
  forearm.receiveShadow = true;
  group.add(forearm);

  const handRoot = new THREE.Group();
  handRoot.position.set(2.6, 1.42 - 0.31, -1.3);
  handRoot.rotation.set(THREE.MathUtils.degToRad(12 - 8), THREE.MathUtils.degToRad(-28 + 4), THREE.MathUtils.degToRad(5));
  handRoot.scale.setScalar(2.15);
  group.add(handRoot);

  const palm = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.12, 0.16), skin);
  palm.position.set(0, -0.07, 0.02);
  palm.castShadow = true;
  palm.receiveShadow = true;
  handRoot.add(palm);

  const thumbPad = new THREE.Mesh(new THREE.SphereGeometry(0.04, 14, 10), skin);
  thumbPad.scale.set(0.75, 0.6, 1.2);
  thumbPad.position.set(-0.02, -0.07, 0);
  handRoot.add(thumbPad);

  const fingerData = [
    [-0.028, 0.056, 0.042, -16],
    [-0.009, 0.086, 0.061, -6],
    [0.01, 0.079, 0.056, 4],
    [0.027, 0.046, 0.033, 14]
  ];
  fingerData.forEach(([x, len1, len2, spread]) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.01, 0.074);
    pivot.rotation.y = THREE.MathUtils.degToRad(spread);
    handRoot.add(pivot);

    const seg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0104, 0.0089, len1, 10), skin);
    seg1.position.y = -len1 / 2;
    seg1.castShadow = true;
    seg1.receiveShadow = true;
    pivot.add(seg1);

    const seg2Pivot = new THREE.Group();
    seg2Pivot.position.y = -len1;
    seg2Pivot.rotation.x = THREE.MathUtils.degToRad(8);
    pivot.add(seg2Pivot);

    const seg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.0086, 0.0069, len2, 10), skin);
    seg2.position.y = -len2 / 2;
    seg2.castShadow = true;
    seg2.receiveShadow = true;
    seg2Pivot.add(seg2);
  });

  const thumbPivot = new THREE.Group();
  thumbPivot.position.set(-0.048, -0.078, 0.004);
  thumbPivot.rotation.set(THREE.MathUtils.degToRad(-16), THREE.MathUtils.degToRad(-60), THREE.MathUtils.degToRad(-26));
  handRoot.add(thumbPivot);

  const thumb1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0102, 0.0081, 0.041, 10), skin);
  thumb1.position.y = -0.0205;
  thumb1.castShadow = true;
  thumb1.receiveShadow = true;
  thumbPivot.add(thumb1);

  const thumb2Pivot = new THREE.Group();
  thumb2Pivot.position.y = -0.041;
  thumb2Pivot.rotation.x = THREE.MathUtils.degToRad(-6);
  thumbPivot.add(thumb2Pivot);

  const thumb2 = new THREE.Mesh(new THREE.CylinderGeometry(0.0081, 0.0062, 0.031, 10), skin);
  thumb2.position.y = -0.0155;
  thumb2.castShadow = true;
  thumb2.receiveShadow = true;
  thumb2Pivot.add(thumb2);

  return group;
}

function getTrackLaneRadius(laneIndex) {
  return TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * (laneIndex + 0.5);
}

function getTrackLaneLength(laneIndex) {
  const radius = getTrackLaneRadius(laneIndex);
  return TRACK_STRAIGHT_HALF * 4 + Math.PI * 2 * radius;
}

function rotateTrackCoords(x, z) {
  return { x: -z, z: x };
}

function rotateTrackDirection(dirX, dirZ) {
  return { dirX: -dirZ, dirZ: dirX };
}

function getTrackPointAtProgress(laneIndex, progress) {
  const radius = getTrackLaneRadius(laneIndex);
  const straightLen = TRACK_STRAIGHT_HALF * 2;
  const arcLen = Math.PI * radius;
  const lapLen = straightLen * 2 + arcLen * 2;
  let s = ((progress % lapLen) + lapLen) % lapLen;

  if (s <= straightLen) {
    const x = -TRACK_STRAIGHT_HALF + s;
    const z = -radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(1, 0);
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "homeStraight" };
  }
  s -= straightLen;

  if (s <= arcLen) {
    const angle = -Math.PI / 2 + s / radius;
    const x = TRACK_STRAIGHT_HALF + Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(-Math.sin(angle), Math.cos(angle));
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "rightCurve" };
  }
  s -= arcLen;

  if (s <= straightLen) {
    const x = TRACK_STRAIGHT_HALF - s;
    const z = radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(-1, 0);
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "backStraight" };
  }
  s -= straightLen;

  const angle = Math.PI / 2 + s / radius;
  const x = -TRACK_STRAIGHT_HALF + Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const pos = rotateTrackCoords(x, z);
  const dir = rotateTrackDirection(-Math.sin(angle), Math.cos(angle));
  return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "leftCurve" };
}

function getTrackLapStaggerProgress(laneIndex, baseLaneIndex = 0, baseProgress = TRACK_FINISH_PROGRESS) {
  const laneLength = getTrackLaneLength(laneIndex);
  const baseLength = getTrackLaneLength(baseLaneIndex);
  const staggerOffset = Math.max(0, laneLength - baseLength);
  return (baseProgress + staggerOffset) % laneLength;
}

function getTrackCurveLinePoints(radius, y = 0.02, segments = 40) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = -TRACK_STRAIGHT_HALF + t * TRACK_STRAIGHT_HALF * 2;
    const pos = rotateTrackCoords(x, -radius);
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const angle = -Math.PI / 2 + (i / segments) * Math.PI;
    const pos = rotateTrackCoords(
      TRACK_STRAIGHT_HALF + Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    const x = TRACK_STRAIGHT_HALF - t * TRACK_STRAIGHT_HALF * 2;
    const pos = rotateTrackCoords(x, radius);
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const angle = Math.PI / 2 + (i / segments) * Math.PI;
    const pos = rotateTrackCoords(
      -TRACK_STRAIGHT_HALF + Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  return points;
}

function makeStadiumShape(innerRadius, outerRadius) {
  const shape = new THREE.Shape();
  const outer = getTrackCurveLinePoints(outerRadius, 0, 44).map((p) => new THREE.Vector2(p.x, p.z));
  shape.moveTo(outer[0].x, outer[0].y);
  for (let i = 1; i < outer.length; i += 1) shape.lineTo(outer[i].x, outer[i].y);
  shape.closePath();

  if (Number.isFinite(innerRadius) && innerRadius > 0) {
    const holePath = new THREE.Path();
    const inner = getTrackCurveLinePoints(innerRadius, 0, 44).map((p) => new THREE.Vector2(p.x, p.z)).reverse();
    holePath.moveTo(inner[0].x, inner[0].y);
    for (let i = 1; i < inner.length; i += 1) holePath.lineTo(inner[i].x, inner[i].y);
    holePath.closePath();
    shape.holes.push(holePath);
  }

  return shape;
}

function makeTrackLabel(text, backgroundColor, textColor = "#ffffff") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
  ctx.fillStyle = textColor;
  ctx.font = "bold 46px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(3.2, 1.2, 1);
  return sprite;
}

function makeTrackGroundLabel(text, backgroundColor, textColor = "#ffffff", width = 2.3, height = 0.78) {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = textColor;
  ctx.font = `bold ${text.length <= 2 ? 74 : 56}px Trebuchet MS`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({ map: texture, transparent: true, alphaTest: 0.08, roughness: 0.98 })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0.03;
  plane.receiveShadow = true;
  return plane;
}

function makeFootballNameTag(text, backgroundColor, textColor = "#ffffff") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = 10;
  const y = 10;
  const w = canvas.width - 20;
  const h = canvas.height - 20;
  const r = 28;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = backgroundColor;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.46)";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.font = `bold ${text.length > 16 ? 28 : 34}px Trebuchet MS`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.82, depthWrite: false }));
  sprite.scale.set(0.9, 0.23, 1);
  sprite.renderOrder = 4;
  return sprite;
}

function makeFootballNumberPatch(text, backgroundColor, textColor = "#ffffff") {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = textColor;
  ctx.font = `bold ${text.length > 1 ? 84 : 98}px Trebuchet MS`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.08, side: THREE.DoubleSide });
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), material);
  plate.renderOrder = 3;
  return plate;
}

function buildRunningTrack() {
  const group = new THREE.Group();

  const track = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_INNER_RADIUS, TRACK_CURVE_OUTER_RADIUS), 64),
    new THREE.MeshStandardMaterial({ color: 0xad4f3b, roughness: 0.9 })
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = 0.012;
  track.receiveShadow = true;
  group.add(track);

  const curbInner = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_INNER_RADIUS - 0.18, TRACK_CURVE_INNER_RADIUS), 48),
    new THREE.MeshStandardMaterial({ color: 0xf0f3ea, roughness: 0.9 })
  );
  curbInner.rotation.x = -Math.PI / 2;
  curbInner.position.y = 0.013;
  group.add(curbInner);

  const curbOuter = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_OUTER_RADIUS, TRACK_CURVE_OUTER_RADIUS + 0.18), 48),
    new THREE.MeshStandardMaterial({ color: 0xf0f3ea, roughness: 0.9 })
  );
  curbOuter.rotation.x = -Math.PI / 2;
  curbOuter.position.y = 0.013;
  group.add(curbOuter);

  const laneMaterial = new THREE.LineBasicMaterial({ color: 0xf7efe1, transparent: true, opacity: 0.82 });
  for (let lane = 1; lane < TRACK_LANE_COUNT; lane += 1) {
    const laneRadius = TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * lane;
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(getTrackCurveLinePoints(laneRadius, 0.022, 52)), laneMaterial));
  }

  const pitch = new THREE.Mesh(
    new THREE.PlaneGeometry(FOOTBALL_FIELD_HALF_WIDTH * 2, FOOTBALL_FIELD_HALF_LENGTH * 2),
    new THREE.MeshStandardMaterial({ color: 0x2f8f3d, roughness: 1 })
  );
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.y = 0.014;
  pitch.receiveShadow = true;
  group.add(pitch);

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xeef7eb, transparent: true, opacity: 0.94 });
  const boundaryInsetX = FOOTBALL_FIELD_HALF_WIDTH - 0.08;
  const boundaryInsetZ = FOOTBALL_FIELD_HALF_LENGTH - 0.08;
  const boundary = [
    new THREE.Vector3(-boundaryInsetX, 0.028, -boundaryInsetZ),
    new THREE.Vector3(boundaryInsetX, 0.028, -boundaryInsetZ),
    new THREE.Vector3(boundaryInsetX, 0.028, boundaryInsetZ),
    new THREE.Vector3(-boundaryInsetX, 0.028, boundaryInsetZ),
    new THREE.Vector3(-boundaryInsetX, 0.028, -boundaryInsetZ)
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(boundary), lineMaterial));

  const centerCircle = [];
  for (let i = 0; i <= 64; i += 1) {
    const a = (i / 64) * Math.PI * 2;
    centerCircle.push(new THREE.Vector3(Math.cos(a) * FOOTBALL_CENTER_CIRCLE_RADIUS, 0.028, Math.sin(a) * FOOTBALL_CENTER_CIRCLE_RADIUS));
  }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(centerCircle), lineMaterial));

  group.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-boundaryInsetX, 0.028, 0),
        new THREE.Vector3(boundaryInsetX, 0.028, 0)
      ]),
      lineMaterial
    )
  );

  const penaltyBoxHalfWidth = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 1.15, 4.2);
  const penaltyBoxDepth = 2.45;
  const goalBoxHalfWidth = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 2.1, 2.15);
  const goalBoxDepth = 1.05;
  [-1, 1].forEach((side) => {
    const goalZ = side * boundaryInsetZ;
    const penaltyFrontZ = goalZ - side * penaltyBoxDepth;
    const goalBoxFrontZ = goalZ - side * goalBoxDepth;
    const penaltyBox = [
      new THREE.Vector3(-penaltyBoxHalfWidth, 0.028, goalZ),
      new THREE.Vector3(-penaltyBoxHalfWidth, 0.028, penaltyFrontZ),
      new THREE.Vector3(penaltyBoxHalfWidth, 0.028, penaltyFrontZ),
      new THREE.Vector3(penaltyBoxHalfWidth, 0.028, goalZ)
    ];
    const goalBox = [
      new THREE.Vector3(-goalBoxHalfWidth, 0.028, goalZ),
      new THREE.Vector3(-goalBoxHalfWidth, 0.028, goalBoxFrontZ),
      new THREE.Vector3(goalBoxHalfWidth, 0.028, goalBoxFrontZ),
      new THREE.Vector3(goalBoxHalfWidth, 0.028, goalZ)
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(penaltyBox), lineMaterial));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(goalBox), lineMaterial));
  });

  const penaltySpotRadius = 0.085;
  [-1, 1].forEach((side) => {
    const penaltySpot = new THREE.Mesh(
      new THREE.CircleGeometry(penaltySpotRadius, 16),
      new THREE.MeshStandardMaterial({ color: 0xeef7eb, roughness: 0.9 })
    );
    penaltySpot.rotation.x = -Math.PI / 2;
    penaltySpot.position.set(0, 0.029, side * (boundaryInsetZ - 1.85));
    group.add(penaltySpot);
  });

  const cornerXs = [-boundaryInsetX, boundaryInsetX];
  const cornerZs = [-boundaryInsetZ, boundaryInsetZ];

  const penaltyArcRadius = 0.9;
  [-1, 1].forEach((side) => {
    const penaltySpotZ = side * (boundaryInsetZ - 1.85);
    const penaltyFrontZ = side * (boundaryInsetZ - penaltyBoxDepth);
    const arcPoints = [];
    for (let step = 0; step <= 48; step += 1) {
      const a = (step / 48) * Math.PI * 2;
      const px = Math.cos(a) * penaltyArcRadius;
      const pz = penaltySpotZ + Math.sin(a) * penaltyArcRadius;
      if (side * (pz - penaltyFrontZ) <= 0.001) {
        arcPoints.push(new THREE.Vector3(px, 0.028, pz));
      }
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPoints), lineMaterial));
  });

  const cornerArcRadius = 0.55;
  for (let xi = 0; xi < cornerXs.length; xi += 1) {
    for (let zi = 0; zi < cornerZs.length; zi += 1) {
      const xSign = Math.sign(cornerXs[xi]);
      const zSign = Math.sign(cornerZs[zi]);
      const arcPoints = [];
      const startAngle = xSign > 0 && zSign > 0 ? Math.PI : xSign > 0 && zSign < 0 ? Math.PI * 0.5 : xSign < 0 && zSign > 0 ? Math.PI * 1.5 : 0;
      for (let step = 0; step <= 16; step += 1) {
        const a = startAngle + (step / 16) * (Math.PI * 0.5);
        arcPoints.push(new THREE.Vector3(
          cornerXs[xi] + Math.cos(a) * cornerArcRadius,
          0.028,
          cornerZs[zi] + Math.sin(a) * cornerArcRadius
        ));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPoints), lineMaterial));
    }
  }

  const centerSpot = new THREE.Mesh(
    new THREE.CircleGeometry(0.1, 18),
    new THREE.MeshStandardMaterial({ color: 0xeef7eb, roughness: 0.9 })
  );
  centerSpot.rotation.x = -Math.PI / 2;
  centerSpot.position.set(0, 0.029, 0);
  group.add(centerSpot);

  const flagColors = [0xf43f5e, 0xf59e0b, 0x22c55e, 0x38bdf8];
  let flagIndex = 0;
  for (let xi = 0; xi < cornerXs.length; xi += 1) {
    for (let zi = 0; zi < cornerZs.length; zi += 1) {
      const pole = new THREE.Group();
      pole.position.set(cornerXs[xi], 0.016, cornerZs[zi]);
      addPart(pole, new THREE.CylinderGeometry(0.028, 0.028, 0.8, 10), 0xf8fafc, new THREE.Vector3(0, 0.4, 0));
      const pennant = addPart(
        pole,
        new THREE.PlaneGeometry(0.34, 0.2),
        flagColors[flagIndex % flagColors.length],
        new THREE.Vector3(0.18, 0.66, 0),
        new THREE.Euler(0, Math.PI / 2, 0)
      );
      pennant.material.side = THREE.DoubleSide;
      pennant.material.transparent = true;
      pennant.material.opacity = 0.95;
      group.add(pole);
      flagIndex += 1;
    }
  }
  return group;
}

function buildRunner(colors) {
  const palette = {
    skin: colors.skin ?? 0xe7c1a3,
    shirt: colors.shirt ?? 0x2e61b1,
    pants: colors.shorts ?? 0x1f2f43,
    shoe: colors.shoe ?? 0x161718,
    hair: colors.hair ?? 0x2f1a0f,
    white: 0xf6f7fb
  };
  const shirtBright = new THREE.Color(palette.shirt).multiplyScalar(1.08).getHex();
  const shirtDark = new THREE.Color(palette.shirt).multiplyScalar(0.82).getHex();
  const shirtMid = new THREE.Color(palette.shirt).multiplyScalar(0.94).getHex();

  const root = new THREE.Group();
  root.position.y = JUKU_BASE_Y;

  const torso = new THREE.Group();
  torso.position.set(0, 2.15, -0.03);
  root.add(torso);
  const hips = addPart(root, new THREE.CylinderGeometry(0.42, 0.34, 0.28, 28), palette.pants, new THREE.Vector3(0, 1.81, -0.02));
  hips.scale.z = 0.88;
  addPart(torso, new THREE.CylinderGeometry(0.48, 0.39, 0.24, 28), palette.shirt, new THREE.Vector3(0, 0.43, 0));
  addPart(torso, new THREE.CylinderGeometry(0.39, 0.27, 0.32, 28), palette.shirt, new THREE.Vector3(0, 0.15, 0));
  addPart(torso, new THREE.CylinderGeometry(0.27, 0.34, 0.23, 28), shirtDark, new THREE.Vector3(0, -0.12, 0));
  const chest = addPart(torso, new THREE.SphereGeometry(0.18, 18, 14), shirtBright, new THREE.Vector3(0, 0.18, 0.15));
  chest.scale.set(0.85, 1.1, 0.34);
  const belly = addPart(torso, new THREE.SphereGeometry(0.16, 18, 14), shirtMid, new THREE.Vector3(0, -0.05, 0.13));
  belly.scale.set(0.8, 1, 0.32);

  addPart(root, new THREE.TorusGeometry(0.17, 0.04, 10, 20), palette.white, new THREE.Vector3(0, 2.75, 0.02), new THREE.Euler(Math.PI / 2, 0, 0));
  const neck = addPart(root, new THREE.CylinderGeometry(0.095, 0.12, 0.27, 16), palette.skin, new THREE.Vector3(0, 2.89, 0.01));
  neck.scale.z = 0.88;

  const head = new THREE.Group();
  head.position.set(0, 3.27, 0);
  root.add(head);

  const skull = addPart(head, new THREE.SphereGeometry(0.44, 30, 22), palette.skin, new THREE.Vector3(0, 0, 0));
  skull.scale.set(0.92, 1.02, 0.95);
  addPart(head, new THREE.SphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(-0.4, 0.03, 0));
  addPart(head, new THREE.SphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(0.4, 0.03, 0));

  const hairCap = addPart(head, new THREE.SphereGeometry(0.45, 26, 18, 0, Math.PI * 2, 0, Math.PI * 0.46), palette.hair, new THREE.Vector3(0, 0.23, -0.035));
  hairCap.scale.set(0.94, 0.82, 0.95);

  const leftEye = new THREE.Group();
  leftEye.position.set(-0.138, 0.058, 0.372);
  head.add(leftEye);
  leftEye.scale.z = 0.62;
  addPart(leftEye, new THREE.SphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  addPart(leftEye, new THREE.SphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(leftEye, new THREE.SphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));

  const rightEye = new THREE.Group();
  rightEye.position.set(0.138, 0.058, 0.372);
  head.add(rightEye);
  rightEye.scale.z = 0.62;
  addPart(rightEye, new THREE.SphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  addPart(rightEye, new THREE.SphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(rightEye, new THREE.SphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));

  addPart(
    head,
    new THREE.CapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(-0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(82))
  );
  addPart(
    head,
    new THREE.CapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-82))
  );
  const nose = addPart(head, new THREE.SphereGeometry(0.06, 14, 12), 0xdb9086, new THREE.Vector3(0, -0.022, 0.45));
  nose.scale.set(1.08, 1, 1.35);
  const mouth = new THREE.Group();
  mouth.position.set(0, -0.17, 0.402);
  head.add(mouth);
  addScaledPart(
    mouth,
    new THREE.SphereGeometry(0.046, 16, 12),
    0xb8484f,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2.18, 0.25, 0.56)
  );
  addScaledPart(
    mouth,
    new THREE.SphereGeometry(0.042, 16, 12),
    0x5d171d,
    new THREE.Vector3(0, -0.008, 0.016),
    new THREE.Vector3(1.42, 0.1, 0.44)
  );

  const leftArmRig = buildArm(palette, false);
  const rightArmRig = buildArm(palette, false);
  leftArmRig.root.position.set(0.47, 2.49, 0);
  rightArmRig.root.position.set(-0.47, 2.49, 0);
  root.add(leftArmRig.root, rightArmRig.root);

  const leftLegRig = buildLeg(palette);
  const rightLegRig = buildLeg(palette);
  leftLegRig.root.position.set(0.17, 1.58, -0.02);
  rightLegRig.root.position.set(-0.17, 1.58, -0.02);
  root.add(leftLegRig.root, rightLegRig.root);

  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return {
    root,
    hips,
    torso,
    torsoPivot: torso,
    head,
    leftArmRig,
    rightArmRig,
    leftArm: leftArmRig.upperPivot,
    rightArm: rightArmRig.upperPivot,
    leftLegRig,
    rightLegRig,
    leftLeg: leftLegRig.root,
    rightLeg: rightLegRig.root,
    mouth,
    baseYUnscaled: JUKU_BASE_Y,
    baseY: JUKU_BASE_Y,
    nativeScale: 1 / ATHLETE_SCALE,
    motionScale: 1,
    runnerStyle: "juku"
  };
}

function scaleRunner(runner, scale = ATHLETE_SCALE) {
  const totalScale = scale * (runner.nativeScale ?? 1);
  runner.motionScale = totalScale;
  runner.root.scale.setScalar(totalScale);
  const baseYUnscaled = runner.baseYUnscaled ?? runner.baseY;
  runner.baseY = baseYUnscaled * totalScale;
  runner.root.position.y = runner.baseY;
  return runner;
}

function animateRunner(runner, speed, cycle, jumpY = 0, specialPose = null) {
  const kickAmount = THREE.MathUtils.clamp(specialPose?.kickAmount ?? 0, 0, 1);
  const kickSide = specialPose?.kickSide === 0 ? 1 : Math.sign(specialPose?.kickSide ?? 1);
  const sprintAmount = THREE.MathUtils.clamp(specialPose?.sprintAmount ?? 0, 0, 1);
  const sideStepAmount = THREE.MathUtils.clamp(specialPose?.type === "sideStep" ? specialPose.amount ?? 0 : 0, 0, 1);
  const sideStepDir = specialPose?.type === "sideStep" && specialPose.dir !== 0 ? Math.sign(specialPose.dir ?? 1) : 1;
  const keeperSetAmount = THREE.MathUtils.clamp(specialPose?.keeperSetAmount ?? 0, 0, 1);
  const keeperSetDir = specialPose?.keeperSetDir === 0 ? 1 : Math.sign(specialPose?.keeperSetDir ?? 1);
  const celebrationAmount = THREE.MathUtils.clamp(specialPose?.type === "celebration" ? specialPose.amount ?? 0 : 0, 0, 1);
  const celebrationSide = specialPose?.side === 0 ? 1 : Math.sign(specialPose?.side ?? 1);
  const celebrationBounce = THREE.MathUtils.clamp(specialPose?.bounce ?? 0, 0, 1);
  const keeperDiveAmount = THREE.MathUtils.clamp(specialPose?.type === "keeperDive" ? specialPose.amount ?? 0 : 0, 0, 1);
  const keeperDiveDir = specialPose?.type === "keeperDive" && specialPose.dir !== 0 ? Math.sign(specialPose.dir ?? 1) : 1;
  const keeperDiveHeight = THREE.MathUtils.clamp(specialPose?.type === "keeperDive" ? specialPose.saveHeight ?? 0.45 : 0.45, 0, 1);

  if (runner.runnerStyle !== "juku") {
    const blend = THREE.MathUtils.clamp(speed / 2.8, 0, 1);
    const happy = 0.62 + 0.38 * blend;
    const strideBoost = 1 + sprintAmount * 0.35;
    const swing = Math.sin(cycle) * 1.02 * blend * strideBoost;
    const sideSwing = Math.sin(cycle) * 0.82 * sideStepAmount;
    const motionScale = runner.motionScale ?? 1;
    const bounce = Math.abs(Math.sin(cycle * 1.08)) * 0.032 * happy * (1 + sprintAmount * 0.22) * motionScale;
    const diveLift = Math.sin(keeperDiveAmount * Math.PI) * (0.18 + keeperDiveHeight * 0.12) * motionScale;
    runner.root.position.y = runner.baseY + bounce + jumpY * motionScale + diveLift;
    runner.torsoPivot.position.x = 0;
    runner.leftLeg.rotation.x = THREE.MathUtils.lerp(swing, sideSwing * 0.28, sideStepAmount);
    runner.rightLeg.rotation.x = THREE.MathUtils.lerp(-swing, -sideSwing * 0.28, sideStepAmount);
    runner.leftLeg.rotation.z = THREE.MathUtils.degToRad(sideStepDir * (10 + Math.sin(cycle) * 12) * sideStepAmount);
    runner.rightLeg.rotation.z = THREE.MathUtils.degToRad(sideStepDir * (-10 + Math.sin(cycle + Math.PI) * 12) * sideStepAmount);
    runner.leftArm.rotation.x = -swing * (0.9 + sprintAmount * 0.18) - 0.08 - sprintAmount * 0.18;
    runner.rightArm.rotation.x = swing * (0.9 + sprintAmount * 0.18) - 0.08 - sprintAmount * 0.18;
    runner.leftArm.rotation.y = 0;
    runner.rightArm.rotation.y = 0;
    runner.leftArm.rotation.z = THREE.MathUtils.degToRad(7 + Math.sin(cycle * 0.5) * 4);
    runner.rightArm.rotation.z = THREE.MathUtils.degToRad(-7 - Math.sin(cycle * 0.5) * 4);
    runner.torsoPivot.rotation.z = Math.sin(cycle * 0.5) * 0.075 * blend;
    runner.torsoPivot.rotation.x = -0.08 - Math.abs(Math.sin(cycle)) * 0.04 * blend - sprintAmount * 0.18;
    runner.head.rotation.x = -0.04 * sprintAmount;
    runner.head.rotation.z = Math.sin(cycle * 0.58) * 0.06 * happy + Math.sin(cycle * 0.24) * 0.03 * sprintAmount;
    if (sideStepAmount > 0) {
      runner.torsoPivot.position.x = sideStepDir * 0.035 * sideStepAmount;
      runner.torsoPivot.rotation.z += sideStepDir * 0.16 * sideStepAmount;
      runner.leftArm.rotation.z = THREE.MathUtils.lerp(runner.leftArm.rotation.z, THREE.MathUtils.degToRad(18 * sideStepDir), sideStepAmount);
      runner.rightArm.rotation.z = THREE.MathUtils.lerp(runner.rightArm.rotation.z, THREE.MathUtils.degToRad(6 * sideStepDir), sideStepAmount);
      runner.leftArm.rotation.x = THREE.MathUtils.lerp(runner.leftArm.rotation.x, -0.55 - sideSwing * 0.18, sideStepAmount);
      runner.rightArm.rotation.x = THREE.MathUtils.lerp(runner.rightArm.rotation.x, -0.12 + sideSwing * 0.18, sideStepAmount);
    }
    if (runner.smile) runner.smile.rotation.z = Math.sin(cycle * 0.85) * 0.06;

    if (specialPose?.type === "keeperDive") {
      const dive = THREE.MathUtils.clamp(specialPose.amount ?? 0, 0, 1);
      const dir = specialPose.dir === 0 ? 1 : Math.sign(specialPose.dir ?? 1);
      const leadArm = dir > 0 ? runner.leftArm : runner.rightArm;
      const trailArm = dir > 0 ? runner.rightArm : runner.leftArm;
      const leadLeg = dir > 0 ? runner.leftLeg : runner.rightLeg;
      const trailLeg = dir > 0 ? runner.rightLeg : runner.leftLeg;
      runner.torsoPivot.position.x = dir * (0.11 + keeperDiveHeight * 0.05) * dive;
      runner.torsoPivot.rotation.z += dir * 0.98 * dive;
      runner.torsoPivot.rotation.x = -0.12 - (0.42 + keeperDiveHeight * 0.2) * dive;
      runner.head.rotation.z += dir * 0.18 * dive;
      runner.head.rotation.x = -(0.08 + keeperDiveHeight * 0.12) * dive;
      leadArm.rotation.x = -(1.96 + keeperDiveHeight * 0.44) * dive;
      leadArm.rotation.z = dir * (1.48 + keeperDiveHeight * 0.3) * dive;
      leadArm.rotation.y = dir * 0.28 * dive;
      trailArm.rotation.x = -(1.42 + keeperDiveHeight * 0.28) * dive;
      trailArm.rotation.z = dir * (0.72 + keeperDiveHeight * 0.16) * dive;
      trailArm.rotation.y = -dir * 0.18 * dive;
      leadLeg.rotation.x = (0.34 + keeperDiveHeight * 0.56) * dive;
      leadLeg.rotation.z = dir * (0.24 + keeperDiveHeight * 0.18) * dive;
      trailLeg.rotation.x = -(0.96 + keeperDiveHeight * 0.28) * dive;
      trailLeg.rotation.z = -dir * 0.28 * dive;
    }

    if (celebrationAmount > 0) {
      const cheerLift = 0.08 + celebrationBounce * 0.12;
      runner.torsoPivot.rotation.x += 0.2 * celebrationAmount;
      runner.torsoPivot.rotation.z += celebrationSide * 0.12 * celebrationAmount;
      runner.head.rotation.x = -0.1 * celebrationAmount;
      runner.head.rotation.z += celebrationSide * 0.06 * celebrationAmount;
      runner.leftArm.rotation.x = THREE.MathUtils.lerp(runner.leftArm.rotation.x, -2.3 + cheerLift, celebrationAmount);
      runner.rightArm.rotation.x = THREE.MathUtils.lerp(runner.rightArm.rotation.x, -2.3 + cheerLift, celebrationAmount);
      runner.leftArm.rotation.z = THREE.MathUtils.lerp(runner.leftArm.rotation.z, 0.42 + celebrationSide * 0.12, celebrationAmount);
      runner.rightArm.rotation.z = THREE.MathUtils.lerp(runner.rightArm.rotation.z, -0.42 + celebrationSide * 0.12, celebrationAmount);
      runner.leftArm.rotation.y = THREE.MathUtils.lerp(runner.leftArm.rotation.y, 0.08 * celebrationSide, celebrationAmount);
      runner.rightArm.rotation.y = THREE.MathUtils.lerp(runner.rightArm.rotation.y, 0.08 * celebrationSide, celebrationAmount);
      runner.leftLeg.rotation.x = THREE.MathUtils.lerp(runner.leftLeg.rotation.x, 0.2 + celebrationBounce * 0.08, celebrationAmount * 0.5);
      runner.rightLeg.rotation.x = THREE.MathUtils.lerp(runner.rightLeg.rotation.x, 0.2 + celebrationBounce * 0.08, celebrationAmount * 0.5);
    }

    if (specialPose?.type === "keeperDive" && runner.smile) {
      runner.smile.rotation.z *= 1 - THREE.MathUtils.clamp(specialPose.amount ?? 0, 0, 1);
    }
    return;
  }

  const blend = THREE.MathUtils.clamp(speed / 2.1, 0, 1);
  const motionScale = runner.motionScale ?? 1;
  const stride = Math.sin(cycle);
  const airBlend = THREE.MathUtils.clamp(Math.abs(jumpY) / Math.max(0.001, 0.36 * Math.max(1, motionScale)), 0, 1);
  const hurdlePose = THREE.MathUtils.smoothstep(airBlend, 0.04, 0.95);
  const sprintBlend = sprintAmount * (1 - hurdlePose * 0.72);
  const leadSide = stride >= 0 ? 1 : -1;
  const sideStride = Math.sin(cycle * 1.18) * sideStepAmount;
  const bounce = Math.abs(Math.sin(cycle * 1.08)) * 0.024 * (0.4 + blend * 0.8 + sprintBlend * 0.14) * motionScale;
  const keeperDiveLift = Math.sin(keeperDiveAmount * Math.PI) * (0.22 + keeperDiveHeight * 0.16) * motionScale;
  runner.root.position.y = runner.baseY + bounce + jumpY * motionScale + keeperDiveLift;
  runner.torsoPivot.position.x = 0.035 * hurdlePose + sideStepDir * 0.04 * sideStepAmount;
  runner.torsoPivot.rotation.z = Math.sin(cycle * 0.5) * 0.09 * blend + sideStepDir * 0.18 * sideStepAmount;
  runner.torsoPivot.rotation.x = -0.1 - Math.abs(stride) * 0.06 * blend - blend * 0.04 - hurdlePose * 0.22 - sprintBlend * 0.16 + sideStepAmount * 0.05;
  if (runner.hips) {
    runner.hips.rotation.z = Math.sin(cycle) * 0.028 * blend + sideStepDir * 0.08 * sideStepAmount;
    runner.hips.rotation.y = Math.sin(cycle * 0.5) * (0.03 + sprintBlend * 0.018) * blend;
  }
  if (runner.head) {
    runner.head.position.y = 3.27 + hurdlePose * 0.04;
    runner.head.rotation.x = -0.05 * sprintBlend;
    runner.head.rotation.z = Math.sin(cycle * 0.32) * 0.025 * sprintBlend;
  }
  if (runner.mouth) {
    runner.mouth.rotation.z = 0;
  }

  const armData = [
    { arm: runner.leftArmRig, side: 1 },
    { arm: runner.rightArmRig, side: -1 }
  ];
  armData.forEach(({ arm, side }) => {
    const walkPhase = side === -1 ? cycle + Math.PI : cycle;
    const armSwing = Math.sin(walkPhase) * 18 * blend * (1 - airBlend * 0.65) * (1 + sprintBlend * 0.34);
    arm.upperPivot.rotation.z = THREE.MathUtils.degToRad(side * (16 + Math.sin(cycle * 0.5) * 2 + sprintBlend * 5));
    arm.upperPivot.rotation.x = THREE.MathUtils.degToRad(-(8 + 18 * airBlend + armSwing + sprintBlend * 12));
    arm.upperPivot.rotation.y = THREE.MathUtils.degToRad(side * (2.4 + sprintBlend * 4.6) * blend);
    arm.lowerPivot.rotation.x = THREE.MathUtils.degToRad(-(14 + 18 * airBlend + Math.max(0, -Math.sin(walkPhase)) * 16 * blend + sprintBlend * 10));
    if (sideStepAmount > 0) {
      const sideArmSwing = Math.sin(walkPhase + Math.PI * 0.5) * 12 * sideStepAmount;
      arm.upperPivot.rotation.x = THREE.MathUtils.lerp(arm.upperPivot.rotation.x, THREE.MathUtils.degToRad(-18 + sideArmSwing * 0.35), sideStepAmount);
      arm.upperPivot.rotation.z = THREE.MathUtils.lerp(arm.upperPivot.rotation.z, THREE.MathUtils.degToRad(side * (10 + sideStepDir * 8)), sideStepAmount);
      arm.upperPivot.rotation.y = THREE.MathUtils.lerp(arm.upperPivot.rotation.y, THREE.MathUtils.degToRad(sideStepDir * side * 10), sideStepAmount * 0.8);
    }
    if (hurdlePose > 0) {
      const leadArm = side === leadSide;
      arm.upperPivot.rotation.x = THREE.MathUtils.lerp(arm.upperPivot.rotation.x, THREE.MathUtils.degToRad(leadArm ? -92 : 26), hurdlePose);
      arm.upperPivot.rotation.z = THREE.MathUtils.lerp(arm.upperPivot.rotation.z, THREE.MathUtils.degToRad(leadArm ? side * 18 : side * 8), hurdlePose);
      arm.lowerPivot.rotation.x = THREE.MathUtils.lerp(arm.lowerPivot.rotation.x, THREE.MathUtils.degToRad(leadArm ? -24 : -58), hurdlePose);
    }
  });

  const legData = [
    { leg: runner.leftLegRig, side: 1 },
    { leg: runner.rightLegRig, side: -1 }
  ];
  legData.forEach(({ leg, side }) => {
    const walkPhase = side === -1 ? cycle : cycle + Math.PI;
    let hipPitch = Math.sin(walkPhase) * 30 * blend * (1 + sprintBlend * 0.24);
    let kneePitch = 10 + (10 + 22 * ((-Math.sin(walkPhase) + 1) * 0.5)) * blend + sprintBlend * (4 + Math.max(0, -Math.sin(walkPhase)) * 8);
    let anklePitch = -6 - hipPitch * 0.4 - (kneePitch - 8) * 0.24 - sprintBlend * 2;
    let hipRoll = THREE.MathUtils.degToRad(side * (4.5 + Math.sin(cycle * 0.5) * 0.8) * blend);
    if (airBlend > 0) {
      const leadLeg = side === leadSide;
      hipPitch = THREE.MathUtils.lerp(hipPitch, leadLeg ? 58 : -26, hurdlePose);
      kneePitch = THREE.MathUtils.lerp(kneePitch, leadLeg ? 18 : 82, hurdlePose);
      anklePitch = THREE.MathUtils.lerp(anklePitch, leadLeg ? -18 : 26, hurdlePose);
    }
    if (sideStepAmount > 0) {
      const sidePhase = side === sideStepDir ? cycle : cycle + Math.PI;
      hipPitch = THREE.MathUtils.lerp(hipPitch, 6 + Math.sin(sidePhase) * 12, sideStepAmount);
      kneePitch = THREE.MathUtils.lerp(kneePitch, 26 + (1 - Math.sin(sidePhase)) * 14, sideStepAmount);
      anklePitch = THREE.MathUtils.lerp(anklePitch, -10 - Math.sin(sidePhase) * 10, sideStepAmount);
      hipRoll = THREE.MathUtils.lerp(hipRoll, THREE.MathUtils.degToRad(sideStepDir * side * (20 + Math.sin(sidePhase) * 10)), sideStepAmount);
    }
    leg.root.rotation.z = hipRoll;
    leg.root.rotation.x = THREE.MathUtils.degToRad(-5 + hipPitch);
    leg.kneePivot.rotation.x = THREE.MathUtils.degToRad(kneePitch);
    leg.footPivot.rotation.x = THREE.MathUtils.degToRad(anklePitch);
  });

  if (keeperSetAmount > 0) {
    const setPulse = Math.sin(cycle * 1.8);
    runner.root.position.y -= 0.035 * keeperSetAmount * motionScale;
    runner.torsoPivot.position.x += keeperSetDir * 0.03 * keeperSetAmount + setPulse * 0.015 * keeperSetAmount;
    runner.torsoPivot.rotation.x = THREE.MathUtils.lerp(runner.torsoPivot.rotation.x, -0.26, keeperSetAmount);
    runner.torsoPivot.rotation.z += keeperSetDir * 0.08 * keeperSetAmount + setPulse * 0.03 * keeperSetAmount;
    if (runner.hips) {
      runner.hips.rotation.z += keeperSetDir * 0.09 * keeperSetAmount;
    }
    runner.leftLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.x, THREE.MathUtils.degToRad(14 + Math.max(0, setPulse) * 4), keeperSetAmount);
    runner.rightLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.x, THREE.MathUtils.degToRad(14 + Math.max(0, -setPulse) * 4), keeperSetAmount);
    runner.leftLegRig.root.rotation.z = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.z, THREE.MathUtils.degToRad(keeperSetDir * (14 + setPulse * 5)), keeperSetAmount);
    runner.rightLegRig.root.rotation.z = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.z, THREE.MathUtils.degToRad(keeperSetDir * (-14 + setPulse * 5)), keeperSetAmount);
    runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(36 + Math.max(0, -setPulse) * 6), keeperSetAmount);
    runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(36 + Math.max(0, setPulse) * 6), keeperSetAmount);
    runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-10), keeperSetAmount);
    runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-10), keeperSetAmount);
    runner.leftArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.x, THREE.MathUtils.degToRad(-28 - setPulse * 4), keeperSetAmount);
    runner.rightArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.x, THREE.MathUtils.degToRad(-28 + setPulse * 4), keeperSetAmount);
    runner.leftArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(18 + keeperSetDir * 4), keeperSetAmount);
    runner.rightArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(-18 + keeperSetDir * 4), keeperSetAmount);
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-46), keeperSetAmount);
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-46), keeperSetAmount);
    if (runner.head) {
      runner.head.rotation.x = THREE.MathUtils.lerp(runner.head.rotation.x, -0.08, keeperSetAmount);
    }
  }

  if (kickAmount > 0) {
    const kickLeg = kickSide > 0 ? runner.leftLegRig : runner.rightLegRig;
    const plantLeg = kickSide > 0 ? runner.rightLegRig : runner.leftLegRig;
    const kickArm = kickSide > 0 ? runner.rightArmRig : runner.leftArmRig;
    const balanceArm = kickSide > 0 ? runner.leftArmRig : runner.rightArmRig;
    kickLeg.root.rotation.x = THREE.MathUtils.lerp(kickLeg.root.rotation.x, THREE.MathUtils.degToRad(48), kickAmount);
    kickLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(kickLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(8), kickAmount);
    kickLeg.footPivot.rotation.x = THREE.MathUtils.lerp(kickLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(-16), kickAmount);
    plantLeg.root.rotation.x = THREE.MathUtils.lerp(plantLeg.root.rotation.x, THREE.MathUtils.degToRad(-18), kickAmount * 0.72);
    plantLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(plantLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(28), kickAmount * 0.72);
    plantLeg.footPivot.rotation.x = THREE.MathUtils.lerp(plantLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(14), kickAmount * 0.72);
    runner.torsoPivot.rotation.x -= 0.14 * kickAmount;
    runner.torsoPivot.rotation.z += -kickSide * 0.09 * kickAmount;
    kickArm.upperPivot.rotation.x = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(32), kickAmount);
    kickArm.upperPivot.rotation.z = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(-kickSide * 14), kickAmount);
    balanceArm.upperPivot.rotation.x = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(-56), kickAmount);
    balanceArm.upperPivot.rotation.z = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(kickSide * 22), kickAmount);
  }

  if (specialPose?.type === "keeperDive") {
    const dive = THREE.MathUtils.clamp(specialPose.amount ?? 0, 0, 1);
    const dir = specialPose.dir === 0 ? 1 : Math.sign(specialPose.dir ?? 1);
    const leadArm = dir > 0 ? runner.leftArmRig.upperPivot : runner.rightArmRig.upperPivot;
    const trailArm = dir > 0 ? runner.rightArmRig.upperPivot : runner.leftArmRig.upperPivot;
    const leadLeg = dir > 0 ? runner.leftLegRig.root : runner.rightLegRig.root;
    const trailLeg = dir > 0 ? runner.rightLegRig.root : runner.leftLegRig.root;
    runner.torsoPivot.position.x = dir * (0.17 + keeperDiveHeight * 0.1) * dive;
    runner.torsoPivot.rotation.z += dir * (1.02 + keeperDiveHeight * 0.12) * dive;
    runner.torsoPivot.rotation.x = -0.14 - (0.38 + keeperDiveHeight * 0.28) * dive;
    if (runner.hips) {
      runner.hips.rotation.z += dir * (0.2 + keeperDiveHeight * 0.14) * dive;
      runner.hips.rotation.y += dir * (0.08 + keeperDiveHeight * 0.12) * dive;
    }
    if (runner.head) {
      runner.head.rotation.z += dir * (0.18 + keeperDiveHeight * 0.12) * dive;
      runner.head.rotation.x = Math.min(runner.head.rotation.x, -(0.1 + keeperDiveHeight * 0.14) * dive);
    }
    leadArm.rotation.x = -(1.9 + keeperDiveHeight * 0.5) * dive;
    leadArm.rotation.z = dir * (1.56 + keeperDiveHeight * 0.34) * dive;
    leadArm.rotation.y = dir * (0.22 + keeperDiveHeight * 0.18) * dive;
    trailArm.rotation.x = -(1.38 + keeperDiveHeight * 0.32) * dive;
    trailArm.rotation.z = dir * (0.84 + keeperDiveHeight * 0.18) * dive;
    trailArm.rotation.y = -dir * 0.18 * dive;
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-28 - keeperDiveHeight * 18), dive * (dir > 0 ? 1 : 0.65));
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-28 - keeperDiveHeight * 18), dive * (dir < 0 ? 1 : 0.65));
    leadLeg.rotation.x = (0.46 + keeperDiveHeight * 0.48) * dive;
    leadLeg.rotation.z = dir * (0.3 + keeperDiveHeight * 0.22) * dive;
    trailLeg.rotation.x = -(1.02 + keeperDiveHeight * 0.34) * dive;
    trailLeg.rotation.z = -dir * 0.34 * dive;
    runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(dir > 0 ? 24 : 76), dive);
    runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(dir < 0 ? 24 : 76), dive);
    runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(dir > 0 ? -22 : 18), dive);
    runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(dir < 0 ? -22 : 18), dive);
  }

  if (celebrationAmount > 0) {
    const cheerArmPitch = THREE.MathUtils.degToRad(-146 + celebrationBounce * 10);
    runner.torsoPivot.rotation.x += 0.22 * celebrationAmount;
    runner.torsoPivot.rotation.z += celebrationSide * 0.12 * celebrationAmount;
    if (runner.head) {
      runner.head.rotation.x = -0.12 * celebrationAmount;
      runner.head.rotation.z += celebrationSide * 0.04 * celebrationAmount;
    }
    runner.leftArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.x, cheerArmPitch, celebrationAmount);
    runner.rightArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.x, cheerArmPitch, celebrationAmount);
    runner.leftArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(18 + celebrationSide * 6), celebrationAmount);
    runner.rightArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(-(18 - celebrationSide * 6)), celebrationAmount);
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-22), celebrationAmount);
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-22), celebrationAmount);
    runner.leftLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.x, THREE.MathUtils.degToRad(8 + celebrationBounce * 5), celebrationAmount * 0.45);
    runner.rightLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.x, THREE.MathUtils.degToRad(8 + celebrationBounce * 5), celebrationAmount * 0.45);
  }
}


function buildFootballGame() {
  const group = new THREE.Group();

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(FOOTBALL_BALL_RADIUS, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0xf7f7f4, roughness: 0.45 })
  );
  ball.position.set(0, FOOTBALL_BALL_RADIUS, 0);
  ball.castShadow = true;
  ball.receiveShadow = true;
  group.add(ball);

  const goals = [];
  const colliders = [];
  [-1, 1].forEach((side) => {
    const goal = new THREE.Group();
    const postColor = 0xf8fafc;
    const netColor = 0xdbeafe;
    const halfWidth = FOOTBALL_GOAL_WIDTH * 0.5;

    addPart(goal, new THREE.BoxGeometry(0.08, FOOTBALL_GOAL_HEIGHT, 0.08), postColor, new THREE.Vector3(-halfWidth, FOOTBALL_GOAL_HEIGHT * 0.5, 0));
    addPart(goal, new THREE.BoxGeometry(0.08, FOOTBALL_GOAL_HEIGHT, 0.08), postColor, new THREE.Vector3(halfWidth, FOOTBALL_GOAL_HEIGHT * 0.5, 0));
    addPart(goal, new THREE.BoxGeometry(FOOTBALL_GOAL_WIDTH + 0.12, 0.09, 0.09), postColor, new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT, 0));
    addPart(goal, new THREE.BoxGeometry(0.08, 0.08, FOOTBALL_GOAL_DEPTH), postColor, new THREE.Vector3(-halfWidth, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5));
    addPart(goal, new THREE.BoxGeometry(0.08, 0.08, FOOTBALL_GOAL_DEPTH), postColor, new THREE.Vector3(halfWidth, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5));
    addPart(goal, new THREE.BoxGeometry(0.08, FOOTBALL_GOAL_HEIGHT, 0.08), postColor, new THREE.Vector3(-halfWidth, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH));
    addPart(goal, new THREE.BoxGeometry(0.08, FOOTBALL_GOAL_HEIGHT, 0.08), postColor, new THREE.Vector3(halfWidth, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH));

    const backNet = addPart(
      goal,
      new THREE.PlaneGeometry(FOOTBALL_GOAL_WIDTH, FOOTBALL_GOAL_HEIGHT),
      netColor,
      new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT * 0.5, FOOTBALL_GOAL_DEPTH)
    );
    backNet.material.transparent = true;
    backNet.material.opacity = 0.4;

    const topNet = addPart(
      goal,
      new THREE.PlaneGeometry(FOOTBALL_GOAL_WIDTH, FOOTBALL_GOAL_DEPTH),
      netColor,
      new THREE.Vector3(0, FOOTBALL_GOAL_HEIGHT, FOOTBALL_GOAL_DEPTH * 0.5),
      new THREE.Euler(-Math.PI / 2, 0, 0)
    );
    topNet.material.transparent = true;
    topNet.material.opacity = 0.26;

    goal.position.set(0, 0.02, side * (FOOTBALL_FIELD_HALF_LENGTH - 0.9));
    if (side < 0) goal.rotation.y = Math.PI;
    group.add(goal);
    goal.updateMatrixWorld(true);
    const goalCenter = goal.localToWorld(new THREE.Vector3(0, 0, FOOTBALL_GOAL_DEPTH * 0.5));
    colliders.push({
      type: "obb",
      x: goalCenter.x,
      z: goalCenter.z,
      halfX: FOOTBALL_GOAL_WIDTH * 0.5 + 0.18,
      halfZ: FOOTBALL_GOAL_DEPTH * 0.5 + 0.18,
      yaw: goal.rotation.y
    });
    goals.push(goal);
  });

  const refereeRunner = scaleRunner(buildRunner({
    shirt: 0xf3f4f6,
    shorts: 0x16181c,
    shoe: 0x121316
  }));
  refereeRunner.root.position.set(FOOTBALL_FIELD_HALF_WIDTH + 1.15, refereeRunner.baseY, -3.4);
  refereeRunner.root.rotation.y = THREE.MathUtils.degToRad(-90);
  const stripeOffsets = [-0.18, -0.12, -0.06, 0, 0.06, 0.12, 0.18];
  for (let i = 0; i < stripeOffsets.length; i += 1) {
    const z = stripeOffsets[i];
    addPart(refereeRunner.torsoPivot, new THREE.BoxGeometry(0.07, 0.9, 0.035), 0x111214, new THREE.Vector3(0, 0.16, z));
  }
  const whistle = addPart(
    refereeRunner.leftArmRig.handPivot,
    new THREE.BoxGeometry(0.05, 0.022, 0.016),
    0x0f1115,
    new THREE.Vector3(0.016, -0.026, 0.094),
    new THREE.Euler(0.18, 0, 0)
  );
  const yellowCard = new THREE.Mesh(
    new THREE.BoxGeometry(0.088, 0.118, 0.01),
    new THREE.MeshStandardMaterial({ color: 0xf6d32d, roughness: 0.48, transparent: true, opacity: 0 })
  );
  yellowCard.position.set(0.02, -0.024, 0.09);
  yellowCard.visible = false;
  refereeRunner.rightArmRig.handPivot.add(yellowCard);
  const redCard = new THREE.Mesh(
    new THREE.BoxGeometry(0.088, 0.118, 0.01),
    new THREE.MeshStandardMaterial({ color: 0xc1272d, roughness: 0.48, transparent: true, opacity: 0 })
  );
  redCard.position.set(0.02, -0.024, 0.078);
  redCard.visible = false;
  refereeRunner.rightArmRig.handPivot.add(redCard);
  const refereeNameTag = makeFootballNameTag('Ronaldo', 'rgba(17,24,39,0.92)');
  refereeNameTag.position.set(0, 4.12, 0);
  refereeNameTag.material.opacity = 0.52;
  refereeRunner.root.add(refereeNameTag);
  group.add(refereeRunner.root);
  const coach = {
    runner: refereeRunner,
    label: refereeNameTag,
    sidelineOffset: FOOTBALL_FIELD_HALF_WIDTH + 1.15,
    perimeterOffset: 1.15,
    perimeterT: getFootballPerimeterTFromPoint(FOOTBALL_FIELD_HALF_WIDTH + 1.15, -3.4, 1.15),
    cycle: Math.random() * Math.PI * 2,
    whistle,
    yellowCard,
    redCard,
    whistleTimer: 0,
    cardTimer: 0,
    cardCooldown: 1.2,
    crowdTimer: 0,
    cardColor: "yellow",
    lastBallHolder: null,
    lastControllingTeam: 0
  };

  const players = [];
  const perTeam = FOOTBALL_PLAYER_COUNT / 2;
  const homeXByLane = [0, -FOOTBALL_FIELD_HALF_WIDTH * 0.42, FOOTBALL_FIELD_HALF_WIDTH * 0.42, -FOOTBALL_FIELD_HALF_WIDTH * 0.58, 0, FOOTBALL_FIELD_HALF_WIDTH * 0.58];
  for (let i = 0; i < FOOTBALL_PLAYER_COUNT; i += 1) {
    const team = i < perTeam ? 1 : -1;
    const teamName = team === 1 ? "red" : "blue";
    const lane = i % perTeam;
    const rosterEntry = normalizeFootballRosterEntry(FOOTBALL_TEAM_DATA[teamName][lane], teamName, lane);
    const role = rosterEntry.role;
    const homeX = rosterEntry.homeX ?? (homeXByLane[lane] ?? 0);
    const defaultHomeZ = role === "keeper"
      ? -team * (FOOTBALL_FIELD_HALF_LENGTH - 5.1)
      : role === "defender"
        ? -team * (FOOTBALL_FIELD_HALF_LENGTH * 0.44 - Math.abs(homeX) * 0.05) + (Math.random() - 0.5) * 0.8
        : -team * (FOOTBALL_FIELD_HALF_LENGTH * 0.22 - Math.abs(homeX) * 0.04) + (Math.random() - 0.5) * 1.1;
    const homeZ = rosterEntry.homeZ ?? defaultHomeZ;
    const runner = scaleRunner(buildRunner({
      shirt: team === 1 ? 0xcf3a2f : 0x1d58b4,
      shorts: team === 1 ? 0x6a1f1b : 0x163869,
      shoe: 0x151617
    }));
    runner.root.position.set(homeX, runner.baseY, homeZ);
    const nameTag = makeFootballNameTag(`${rosterEntry.number} ${rosterEntry.name}`, team === 1 ? "rgba(127,29,29,0.9)" : "rgba(29,78,216,0.9)");
    nameTag.position.set(0, 4.18, 0);
    runner.root.add(nameTag);
    const frontNumber = makeFootballNumberPatch(String(rosterEntry.number), team === 1 ? "#991b1b" : "#1e40af");
    frontNumber.position.set(0, 0.22, 0.31);
    runner.torsoPivot.add(frontNumber);
    const backNumber = makeFootballNumberPatch(String(rosterEntry.number), team === 1 ? "#991b1b" : "#1e40af");
    backNumber.position.set(0, 0.22, -0.31);
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
      teamName,
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
      saveCooldown: 0,
      saveLift: 0,
      saveHeight: 0.45,
      diveDir: 0,
      diveBlend: 0,
      nextShuffle: 0.55 + Math.random() * 1.25
    });
  }

  const trackPalette = [0x2d63b5, 0xf28f2d, 0x30a46f, 0x8f4bcf, 0xcf3f4f];
  const trackRunners = [];
  const innerLaneLength = getTrackLaneLength(0);
  for (let i = 0; i < TRACK_RUNNER_COUNT; i += 1) {
    const runner = scaleRunner(buildRunner({
      shirt: trackPalette[i % trackPalette.length],
      shorts: 0x202431,
      shoe: 0x151617
    }));
    const laneIndex = 0;
    const progress = (TRACK_FINISH_PROGRESS + i * 6.6) % innerLaneLength;
    const point = getTrackPointAtProgress(laneIndex, progress);
    const speed = 2.02 + i * 0.13 + Math.random() * 0.16;
    runner.root.position.set(point.x, runner.baseY, point.z);
    runner.root.rotation.y = Math.atan2(-point.dirX, -point.dirZ);
    group.add(runner.root);
    trackRunners.push({
      runner,
      laneIndex,
      targetLaneIndex: laneIndex,
      dir: -1,
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
  const hurdleLane = 0;
  const hurdleLaneLength = getTrackLaneLength(hurdleLane);
  const hurdleSpacing = hurdleLaneLength / Math.max(1, TRACK_HURDLE_COUNT);
  const hurdleProgresses = [];
  for (let i = 0; i < TRACK_HURDLE_COUNT; i += 1) {
    hurdleProgresses.push((TRACK_FINISH_PROGRESS + hurdleSpacing * (i + 0.5)) % hurdleLaneLength);
  }
  for (let i = 0; i < hurdleProgresses.length; i += 1) {
    const progress = hurdleProgresses[i];
    const hurdlePoint = getTrackPointAtProgress(hurdleLane, progress);
    const hurdle = new THREE.Group();

    addPart(hurdle, new THREE.BoxGeometry(0.06, 0.34, 0.06), 0xf3f4f6, new THREE.Vector3(-0.31, 0.17, 0));
    addPart(hurdle, new THREE.BoxGeometry(0.06, 0.34, 0.06), 0xf3f4f6, new THREE.Vector3(0.31, 0.17, 0));
    addPart(hurdle, new THREE.BoxGeometry(0.74, 0.065, 0.065), 0xcf3f4f, new THREE.Vector3(0, 0.335, 0));

    hurdle.position.set(hurdlePoint.x, 0.015, hurdlePoint.z);
    hurdle.rotation.y = Math.atan2(hurdlePoint.dirX, hurdlePoint.dirZ);
    hurdle.scale.setScalar(TRACK_HURDLE_SCALE);
    group.add(hurdle);
    const collider = { type: "obb", x: hurdle.position.x, z: hurdle.position.z, halfX: 0.46 * TRACK_HURDLE_SCALE, halfZ: 0.12 * TRACK_HURDLE_SCALE, yaw: hurdle.rotation.y };
    colliders.push(collider);
    hurdles.push({ laneIndex: hurdleLane, progress, mesh: hurdle, collider, fallen: false, fallProgress: 0, resetTimer: 0, tipDir: 0, baseY: 0.015, baseHalfX: 0.46 * TRACK_HURDLE_SCALE, baseHalfZ: 0.12 * TRACK_HURDLE_SCALE });
  }

  return {
    group,
    ball,
    ballVel: new THREE.Vector3(0, 0, 0),
    restartSpot: { x: 0, z: 0 },
    goals,
    coach,
    players,
    trackRunners,
    hurdles,
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
    lastTouchTeam: 0,
    lastTouchPlayer: null,
    sameTeamTouchCount: 0,
    celebration: null,
    kickoffPlacementMode: null,
    restartHoldTimer: 0,
    restartTeam: 0,
    kickoffContestTimer: 0,
    kickoffScriptTimer: 0,
    trackFinishX: TRACK_FINISH_X,
    track100StartX: TRACK_100M_START_X
  };
}

function updateScoreboard(game) {
  if (scoreStatus) {
    scoreStatus.textContent = `${game.redScore} : ${game.blueScore}`;
    attackStatus.className = "scoreboard-attack";
    if (game.attackingTeam === 1) {
      attackStatus.textContent = `${TEAM_DISPLAY_NAMES.red} attacks`;
      attackStatus.classList.add("scoreboard-attack-red");
    } else if (game.attackingTeam === -1) {
      attackStatus.textContent = `${TEAM_DISPLAY_NAMES.blue} attacks`;
      attackStatus.classList.add("scoreboard-attack-blue");
    } else {
      attackStatus.textContent = "Attack: loose ball";
    }
  }
  if (!playerStatus) return;

  playerStatus.className = "scoreboard-player";
  if (game.ballHolder) {
    playerStatus.textContent = `Ball: ${getFootballPlayerLabel(game.ballHolder)}`;
    playerStatus.classList.add(game.ballHolder.team === 1 ? "scoreboard-player-red" : "scoreboard-player-blue");
  } else {
    playerStatus.textContent = "Ball: loose";
  }
}

function resetFootballBall(game) {
  game.ball.position.set(0, FOOTBALL_BALL_RADIUS, 0);
  game.ball.visible = true;
  game.ballVel.set(0, 0, 0);
  game.restartSpot = { x: 0, z: 0 };
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
  game.stallTeam = 0;
  game.stallTimer = 0;
  game.goalmouthStallTimer = 0;
  game.ownGoalScrambleTimer = 0;
  game.looseBallStallTimer = 0;
  game.offBallClusterTimer = 0;
  game.lastTouchTeam = 0;
  game.lastTouchPlayer = null;
  game.sameTeamTouchCount = 0;
  game.ballHolder = null;
  game.kickoffContestTimer = 0;
  game.kickoffScriptTimer = 0;
}

function formatGoalOrdinal(count) {
  const absCount = Math.abs(Math.trunc(count || 0));
  const mod100 = absCount % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${absCount}th`;
  const mod10 = absCount % 10;
  if (mod10 === 1) return `${absCount}st`;
  if (mod10 === 2) return `${absCount}nd`;
  if (mod10 === 3) return `${absCount}rd`;
  return `${absCount}th`;
}

function setGoalOverlayState(active, scorer = null, team = 0) {
  if (!active) {
    goalOverlay.style.display = "none";
    goalOverlay.style.opacity = "0";
    goalOverlay.style.transform = "translate(-50%, -50%) scale(0.82)";
    return;
  }
  goalOverlay.style.display = "block";
  goalOverlayTitle.textContent = "GOAL";
  goalOverlayTitle.style.color = team === 1 ? "#fecaca" : team === -1 ? "#bfdbfe" : "#f8fafc";
  goalOverlayScorer.textContent = scorer ? `${scorer.shirtNumber} - ${scorer.displayName} | ${formatGoalOrdinal(scorer.goalsScored ?? 1)} goal` : "SCORER UNKNOWN";
  goalOverlayScorer.style.color = team === 1 ? "#fca5a5" : team === -1 ? "#93c5fd" : "#dbeafe";
}

function resolveFootballPlayerSpacing(players, dt, pushScale = 1) {
  for (let i = 0; i < players.length; i += 1) {
    const a = players[i];
    for (let j = i + 1; j < players.length; j += 1) {
      const b = players[j];
      let dx = a.runner.root.position.x - b.runner.root.position.x;
      let dz = a.runner.root.position.z - b.runner.root.position.z;
      let dist = Math.hypot(dx, dz);
      const minDist = FOOTBALL_PERSON_RADIUS * 2.02;
      if (dist <= 0.0001) {
        const angle = (i * 1.73 + j * 2.41) % (Math.PI * 2);
        dx = Math.cos(angle);
        dz = Math.sin(angle);
        dist = 1;
      }
      if (dist >= minDist) continue;
      const nx = dx / dist;
      const nz = dz / dist;
      const overlap = minDist - dist;
      const separate = overlap * 0.5;
      a.runner.root.position.x += nx * separate;
      a.runner.root.position.z += nz * separate;
      b.runner.root.position.x -= nx * separate;
      b.runner.root.position.z -= nz * separate;
      const push = overlap * 2.4 * pushScale * dt;
      a.vx += nx * push;
      a.vz += nz * push;
      b.vx -= nx * push;
      b.vz -= nz * push;
    }
  }
  for (let i = 0; i < players.length; i += 1) {
    const p = players[i];
    p.runner.root.position.x = THREE.MathUtils.clamp(p.runner.root.position.x, -FOOTBALL_FIELD_HALF_WIDTH + 0.4, FOOTBALL_FIELD_HALF_WIDTH - 0.4);
    p.runner.root.position.z = THREE.MathUtils.clamp(p.runner.root.position.z, -FOOTBALL_FIELD_HALF_LENGTH + 0.4, FOOTBALL_FIELD_HALF_LENGTH - 0.4);
  }
}

function getFootballKickoffTarget(game, player) {
  const kickoffTeam = game.kickoffTeam || 0;
  const placementMode = game.kickoffPlacementMode || "live";
  if (kickoffTeam === 0) {
    return {
      x: player.home.x,
      z: player.home.z,
      yaw: player.homeYaw ?? (player.team === 1 ? 0 : Math.PI)
    };
  }

  const ownHalfZLimit = player.team === 1 ? -0.28 : 0.28;
  let x = player.home.x;
  let z = player.home.z;
  const yaw = player.homeYaw ?? (player.team === 1 ? 0 : Math.PI);

  if (player.team === kickoffTeam) {
    const attackers = game.players
      .filter((p) => p.team === kickoffTeam && p.role === "attacker")
      .sort((a, b) => Math.abs(a.home.x) - Math.abs(b.home.x));
    const attackerIndex = attackers.indexOf(player);
    if (attackerIndex === 0) {
      x = placementMode === "reset" ? player.team * 0.95 : 0;
      z = placementMode === "reset" ? -player.team * 1.65 : -player.team * 0.96;
    } else if (attackerIndex === 1) {
      x = (player.home.x === 0 ? -1 : Math.sign(player.home.x)) * (placementMode === "reset" ? 1.75 : 1.35);
      z = -player.team * (placementMode === "reset" ? 2.35 : 1.28);
    } else {
      x = player.home.x * 0.94;
      z = player.team === 1 ? Math.min(player.home.z, ownHalfZLimit) : Math.max(player.home.z, ownHalfZLimit);
    }
    if (placementMode === "reset") {
      const centerDist = Math.hypot(x, z);
      const stagingKeepoutRadius = FOOTBALL_CENTER_CIRCLE_RADIUS * 0.72;
      if (centerDist < stagingKeepoutRadius) {
        const nx = x === 0 && z === 0 ? (player.home.x === 0 ? 1 : Math.sign(player.home.x)) : x / Math.max(0.001, centerDist);
        const nz = x === 0 && z === 0 ? -player.team : z / Math.max(0.001, centerDist);
        x = nx * stagingKeepoutRadius;
        z = nz * stagingKeepoutRadius;
        z = player.team === 1 ? Math.min(z, -0.7) : Math.max(z, 0.7);
      }
    }
  } else {
    const oppositionAttackers = game.players
      .filter((p) => p.team !== kickoffTeam && p.role === "attacker")
      .sort((a, b) => Math.abs(a.home.x) - Math.abs(b.home.x));
    const oppositionIndex = oppositionAttackers.indexOf(player);
    if (placementMode === "live" && oppositionIndex === 0) {
      x = 0;
      z = -player.team * 0.96;
    } else if (placementMode === "live" && oppositionIndex === 1) {
      x = (player.home.x === 0 ? -1 : Math.sign(player.home.x)) * 1.35;
      z = -player.team * 1.28;
    } else {
      x = player.home.x * 0.96;
      z = player.team === 1 ? Math.min(player.home.z, ownHalfZLimit) : Math.max(player.home.z, ownHalfZLimit);
      const centerDist = Math.hypot(x, z);
      const keepoutRadius = FOOTBALL_CENTER_CIRCLE_RADIUS + 0.45;
      if (centerDist < keepoutRadius) {
        const nx = x === 0 && z === 0 ? (player.home.x === 0 ? 1 : Math.sign(player.home.x)) : x / Math.max(0.001, centerDist);
        const nz = x === 0 && z === 0 ? -player.team : z / Math.max(0.001, centerDist);
        x = nx * keepoutRadius;
        z = nz * keepoutRadius;
        z = player.team === 1 ? Math.min(z, ownHalfZLimit) : Math.max(z, ownHalfZLimit);
      }
    }
  }

  return { x, z, yaw };
}

function resetFootballKickoff(game) {
  const kickoffTeam = game.kickoffTeam || 0;
  resetFootballBall(game);
  game.attackingTeam = 0;
  game.lastControllingTeam = 0;
  game.counterTeam = 0;
  game.counterTimer = 0;
  game.counterRunner = null;
  game.celebration = null;
  game.kickoffPlacementMode = "live";
  game.restartTeam = kickoffTeam;
  game.restartHoldTimer = kickoffTeam === 0 ? 0 : 0.82;
  game.kickoffContestTimer = kickoffTeam === 0 ? 0 : 1.5;
  game.kickoffScriptTimer = kickoffTeam === 0 ? 0 : 0.42;
  if (game.coach) {
    game.coach.lastBallHolder = null;
    game.coach.lastControllingTeam = 0;
  }
  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    const kickoffTarget = getFootballKickoffTarget(game, p);
    p.runner.root.position.x = kickoffTarget.x;
    p.runner.root.position.z = kickoffTarget.z;
    p.runner.root.rotation.y = kickoffTarget.yaw;
    p.vx = 0;
    p.vz = 0;
    p.kickBlend = 0;
    if (kickoffTeam !== 0 && p.role === "attacker" && p.team === kickoffTeam) {
      p.kickCooldown = 0.16 + Math.random() * 0.12;
    } else if (kickoffTeam !== 0 && p.role === "attacker") {
      p.kickCooldown = 0.52 + Math.random() * 0.16;
    } else {
      p.kickCooldown = (kickoffTeam !== 0 ? 0.7 : 0.28) + Math.random() * (kickoffTeam !== 0 ? 0.18 : 0.45);
    }
    p.sprintBlend = 0;
    p.burstTimer = 0;
    p.burstCooldown = 0.55 + Math.random() * 1.2;
    p.goalRunTimer = 0;
    p.goalRunCooldown = 0.8 + Math.random() * 2.2;
    p.goalRunTargetX = p.home.x;
    p.goalRunTargetZ = p.home.z;
    p.bangerCooldown = 1.5 + Math.random() * 4.2;
    p.saveCooldown = 0;
    p.saveLift = 0;
    p.diveDir = 0;
    p.diveBlend = 0;
    p.roamX = p.role === "attacker" ? (Math.random() - 0.5) * 1.9 : (Math.random() - 0.5) * 1.1;
    p.roamZ = p.role === "attacker" ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.5) * 0.8;
    p.kickoffRole = "shape";
    p.kickoffRank = 99;
    p.kickoffTargetX = kickoffTarget.x;
    p.kickoffTargetZ = kickoffTarget.z;
  }
  if (kickoffTeam !== 0) {
    const kickoffOutfield = game.players
      .filter((p) => p.role !== "keeper")
      .map((p) => ({
        player: p,
        team: p.team,
        centerDist: Math.hypot(p.kickoffTargetX ?? p.runner.root.position.x, p.kickoffTargetZ ?? p.runner.root.position.z),
        forwardBias: Math.abs(p.kickoffTargetZ ?? p.runner.root.position.z)
      }));
    const kickoffTakers = kickoffOutfield
      .filter((entry) => entry.team === kickoffTeam)
      .sort((a, b) => a.centerDist - b.centerDist || a.forwardBias - b.forwardBias)
      .slice(0, 2);
    const kickoffPressers = kickoffOutfield
      .filter((entry) => entry.team !== kickoffTeam)
      .sort((a, b) => a.centerDist - b.centerDist || a.forwardBias - b.forwardBias)
      .slice(0, 1);
    kickoffTakers.forEach((entry, index) => {
      entry.player.kickoffRole = index === 0 ? "taker" : "support";
      entry.player.kickoffRank = index;
    });
    kickoffPressers.forEach((entry, index) => {
      entry.player.kickoffRole = "press";
      entry.player.kickoffRank = index;
    });
  }
  game.kickoffTeam = 0;
  setGoalOverlayState(false);
  updateScoreboard(game);
}

function startGoalCelebration(game, scoringTeam, scorer) {
  const frozenBallX = game.ball.position.x;
  const frozenBallZ = game.ball.position.z;
  resetFootballBall(game);
  game.ball.visible = true;
  game.ball.position.set(frozenBallX, FOOTBALL_BALL_RADIUS, frozenBallZ);
  const scorerPlayer = scorer ?? game.players.find((p) => p.team === scoringTeam && p.role === "attacker") ?? game.players.find((p) => p.team === scoringTeam) ?? null;
  const scorerX = scorerPlayer?.runner.root.position.x ?? 0;
  const scorerZ = scorerPlayer?.runner.root.position.z ?? (scoringTeam * (FOOTBALL_FIELD_HALF_LENGTH * 0.34));
  const sideSign = scorerX >= 0 ? 1 : -1;
  const zBias = Math.sign(scorerZ || (Math.random() < 0.5 ? -1 : 1));
  const spotX = sideSign * (FOOTBALL_FIELD_HALF_WIDTH - 1.05);
  const inwardX = spotX - sideSign * (2.35 + Math.random() * 0.35);
  const spotZ = THREE.MathUtils.clamp(
    scorerZ + zBias * (2.1 + Math.random() * 2.4),
    -FOOTBALL_FIELD_HALF_LENGTH + 1.25,
    FOOTBALL_FIELD_HALF_LENGTH - 1.25
  );
  game.attackingTeam = 0;
  game.kickoffTeam = -scoringTeam;
  game.kickoffPlacementMode = "reset";
  game.restartHoldTimer = 0;
  game.restartTeam = 0;
  game.celebration = {
    active: true,
    phase: "celebrate",
    timer: GOAL_CELEBRATION_DURATION,
    resetTimer: 0,
    duration: GOAL_CELEBRATION_DURATION,
    team: scoringTeam,
    scorer: scorerPlayer,
    spotX,
    spotZ,
    inwardX,
    sideSign,
    ballX: frozenBallX,
    ballZ: frozenBallZ,
    pulse: Math.random() * Math.PI * 2,
    waveSeed: Math.random() * Math.PI * 2,
    orbitSeed: Math.random() * Math.PI * 2
  };
  setGoalOverlayState(true, scorerPlayer, scoringTeam);
  updateScoreboard(game);
  if (attackStatus) {
    attackStatus.className = "scoreboard-attack";
    attackStatus.textContent = "GOAL CELEBRATION";
    attackStatus.classList.add(scoringTeam === 1 ? "scoreboard-attack-red" : "scoreboard-attack-blue");
  }
  if (playerStatus) {
    playerStatus.className = "scoreboard-player";
    playerStatus.textContent = scorerPlayer ? `Scorer: ${getFootballPlayerLabel(scorerPlayer)} | ${formatGoalOrdinal(scorerPlayer.goalsScored ?? 1)} goal` : "Scorer: unknown";
    playerStatus.classList.add(scoringTeam === 1 ? "scoreboard-player-red" : "scoreboard-player-blue");
  }
}

function updateGoalCelebration(game, dt) {
  const celebration = game.celebration;
  if (!celebration?.active) return false;

  if (celebration.phase === "celebrate") {
    celebration.timer = Math.max(0, celebration.timer - dt);
    celebration.pulse += dt * 8.2;
  } else if (celebration.phase === "reset") {
    celebration.resetTimer = Math.max(0, (celebration.resetTimer ?? 2.4) - dt);
  }
  const elapsed = celebration.duration - celebration.timer;
  const overlayRemaining = GOAL_OVERLAY_DURATION - elapsed;
  if (celebration.phase === "celebrate" && overlayRemaining > 0) {
    const intro = THREE.MathUtils.clamp(elapsed / 0.9, 0, 1);
    const outro = THREE.MathUtils.clamp(overlayRemaining / 0.7, 0, 1);
    goalOverlay.style.display = "block";
    goalOverlay.style.opacity = String(Math.min(intro * 1.15, 1) * Math.min(outro * 1.1, 1));
    goalOverlay.style.transform = `translate(-50%, -50%) scale(${0.82 + intro * 0.24 - (1 - outro) * 0.08})`;
  } else {
    goalOverlay.style.opacity = "0";
    goalOverlay.style.display = "none";
  }

  if (celebration.phase === "reset") {
    game.ball.visible = false;
    game.ball.position.set(0, -2, 0);
  } else {
    game.ball.visible = true;
    game.ball.position.set(celebration.ballX, FOOTBALL_BALL_RADIUS, celebration.ballZ);
  }
  game.ballVel.set(0, 0, 0);

  const scorer = celebration.scorer;
  const teammates = game.players.filter((p) => p.team === celebration.team && p !== scorer);
  const scoringSide = celebration.sideSign || Math.sign(celebration.spotX || 1) || 1;
  const runPhase = THREE.MathUtils.clamp(elapsed / 2.8, 0, 1);
  const crowdPhase = THREE.MathUtils.clamp((elapsed - 1.4) / 2.4, 0, 1);
  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    let targetX = p.home.x;
    let targetZ = p.home.z;
    let jumpY = 0;
    let moveTopSpeed = p.team === celebration.team ? 1.8 : 1.2;
    let lookX = celebration.inwardX ?? (celebration.spotX - scoringSide * 2.2);
    let lookZ = celebration.spotZ;
    let pose = { kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: p.team === celebration.team ? 0.58 : 0.18 };

    if (celebration.phase === "reset") {
      const kickoffTarget = getFootballKickoffTarget(game, p);
      targetX = kickoffTarget.x;
      targetZ = kickoffTarget.z;
      moveTopSpeed = p.role === "keeper" ? 1.18 : 1.56;
      lookX = kickoffTarget.x;
      lookZ = kickoffTarget.z + (p.team === 1 ? 2 : -2);
      pose = {
        ...pose,
        sprintAmount: 0.24
      };
    } else if (p === scorer) {
      const sway = Math.sin(celebration.pulse * 0.48 + celebration.waveSeed) * 0.34;
      targetX = THREE.MathUtils.lerp(p.runner.root.position.x, celebration.spotX, runPhase < 1 ? 0.18 : 0.1);
      targetZ = THREE.MathUtils.lerp(celebration.spotZ + sway, celebration.spotZ, runPhase < 1 ? 0.18 : 0.06);
      if (runPhase >= 0.999) {
        targetX = celebration.spotX;
        targetZ = celebration.spotZ + sway;
        jumpY = Math.max(0, Math.sin(celebration.pulse + 0.3)) * 0.58;
      }
      moveTopSpeed = 2.85 - crowdPhase * 0.7;
      lookX = celebration.inwardX ?? (celebration.spotX - scoringSide * 2.2);
      lookZ = celebration.spotZ + Math.sin(celebration.pulse * 0.24) * 0.4;
      pose = {
        ...pose,
        type: "celebration",
        amount: 0.9,
        side: -scoringSide,
        bounce: THREE.MathUtils.clamp(jumpY / 0.58, 0, 1),
        sprintAmount: runPhase < 0.999 ? 1 : 0.45
      };
    } else if (p.team === celebration.team) {
      const mateIndex = Math.max(0, teammates.indexOf(p));
      const spread = Math.max(1, teammates.length - 1);
      const arcBase = scoringSide > 0 ? Math.PI : 0;
      const arcOffset = spread > 0 ? mateIndex / spread - 0.5 : 0;
      const angle = arcBase + arcOffset * Math.PI * 0.9 + Math.sin(celebration.pulse * 0.12 + mateIndex * 0.35) * 0.08;
      const radius = 1.9 + (mateIndex % 3) * 0.28 + (p.role === "keeper" ? 0.48 : 0);
      targetX = celebration.spotX + Math.cos(angle) * radius;
      targetZ = celebration.spotZ + Math.sin(angle) * radius * 0.74;
      targetX = THREE.MathUtils.lerp(celebration.inwardX ?? targetX, targetX, crowdPhase);
      const mateDist = Math.hypot(targetX - p.runner.root.position.x, targetZ - p.runner.root.position.z);
      moveTopSpeed = p.role === "keeper" ? 1.9 : 2.15;
      lookX = celebration.spotX - scoringSide * 0.35;
      lookZ = celebration.spotZ;
      pose = {
        ...pose,
        type: "celebration",
        amount: crowdPhase > 0.56 && mateDist < 1.08 ? 0.56 : 0.18,
        side: mateIndex % 2 === 0 ? -scoringSide : scoringSide,
        bounce: 0,
        sprintAmount: mateDist > 1.2 ? 0.82 : 0.12
      };
    } else {
      const retreatMix = THREE.MathUtils.clamp(elapsed / 4.2, 0, 1);
      targetX = THREE.MathUtils.lerp(p.runner.root.position.x, p.home.x * 0.82, retreatMix);
      targetZ = THREE.MathUtils.lerp(p.runner.root.position.z, p.home.z * 0.72, retreatMix);
      moveTopSpeed = p.role === "keeper" ? 1.2 : 1.45;
      lookX = celebration.spotX;
      lookZ = celebration.spotZ;
      pose = {
        ...pose,
        sprintAmount: 0.08
      };
    }

    const dirX = targetX - p.runner.root.position.x;
    const dirZ = targetZ - p.runner.root.position.z;
    const dirLen = Math.hypot(dirX, dirZ);
    const desiredSpeed = dirLen > 0.08 ? moveTopSpeed : 0;
    const desiredVx = dirLen > 0.001 ? (dirX / dirLen) * desiredSpeed : 0;
    const desiredVz = dirLen > 0.001 ? (dirZ / dirLen) * desiredSpeed : 0;
    const damping = p === scorer ? 8.4 : p.team === celebration.team ? 7.2 : 5.2;
    p.vx = THREE.MathUtils.damp(p.vx, desiredVx, damping, dt);
    p.vz = THREE.MathUtils.damp(p.vz, desiredVz, damping, dt);
    p.runner.root.position.x += p.vx * dt;
    p.runner.root.position.z += p.vz * dt;
    p.runner.root.position.x = THREE.MathUtils.clamp(p.runner.root.position.x, -FOOTBALL_FIELD_HALF_WIDTH + 0.45, FOOTBALL_FIELD_HALF_WIDTH - 0.45);
    p.runner.root.position.z = THREE.MathUtils.clamp(p.runner.root.position.z, -FOOTBALL_FIELD_HALF_LENGTH + 0.45, FOOTBALL_FIELD_HALF_LENGTH - 0.45);

    const moveSpeed = Math.hypot(p.vx, p.vz);
    if (moveSpeed > 0.06 && dirLen > 0.15) {
      p.runner.root.rotation.y = Math.atan2(p.vx, p.vz);
    } else {
      p.runner.root.rotation.y = Math.atan2(lookX - p.runner.root.position.x, lookZ - p.runner.root.position.z);
    }
    p.kickBlend = Math.max(0, (p.kickBlend ?? 0) - dt * 6.4);
    p.cycle += dt * (5.2 + moveSpeed * 2.9 + jumpY * 3.4 + (pose.type === "celebration" ? pose.amount * 1.4 : 0));
    animateRunner(p.runner, moveSpeed, p.cycle, jumpY, pose);
  }

  resolveFootballPlayerSpacing(game.players, dt, celebration.phase === "reset" ? 2.2 : 1.7);

  if (celebration.phase === "celebrate" && celebration.timer <= 0.001) {
    celebration.phase = "reset";
    celebration.resetTimer = 2.4;
    if (attackStatus) {
      attackStatus.className = "scoreboard-attack";
      attackStatus.textContent = "RESETTING SHAPE";
    }
    if (playerStatus) {
      playerStatus.className = "scoreboard-player";
      playerStatus.textContent = "Kickoff: players returning";
    }
  }

  if (celebration.phase === "reset") {
    let allReady = true;
    for (let i = 0; i < game.players.length; i += 1) {
      const p = game.players[i];
      const kickoffTarget = getFootballKickoffTarget(game, p);
      const distHome = Math.hypot(p.runner.root.position.x - kickoffTarget.x, p.runner.root.position.z - kickoffTarget.z);
      if (distHome > 0.28 || Math.hypot(p.vx, p.vz) > 0.16) {
        allReady = false;
        break;
      }
    }
    if (allReady || celebration.resetTimer <= 0.001) {
      resetFootballKickoff(game);
      return true;
    }
  }

  if (celebration.phase === "celebrate" && celebration.timer <= 0.001) {
    return true;
  }
  if (celebration.phase === "reset") {
    return true;
  }

  if (celebration.timer <= 0.001) {
    resetFootballKickoff(game);
  }
  return true;
}

function registerBallTouch(game, team, player = null) {
  if (game.lastTouchTeam === team) {
    game.sameTeamTouchCount = Math.min(9, game.sameTeamTouchCount + 1);
  } else {
    game.lastTouchTeam = team;
    game.sameTeamTouchCount = 1;
  }
  game.lastTouchPlayer = player;
}

function triggerFootballKickPose(player, ball, amount = 1, targetX = null) {
  if (!player?.runner || !ball) return;
  const footedness = getFootballFootedness(player, ball, targetX);
  player.kickSide = footedness.kickSide;
  player.kickBlend = Math.max(player.kickBlend ?? 0, THREE.MathUtils.clamp(amount, 0.45, 1.15));
}

function applyFootballKickContact(player, ball) {
  if (!player?.runner || !ball || player.runner.runnerStyle !== "juku") return;
  const kickSide = player.kickSide === 0 ? 1 : Math.sign(player.kickSide ?? 1);
  const footPivot = kickSide > 0 ? player.runner.leftLegRig?.footPivot : player.runner.rightLegRig?.footPivot;
  if (!footPivot) return;
  footPivot.updateWorldMatrix(true, false);
  const contactPoint = footPivot.localToWorld(new THREE.Vector3(0, -0.035, 0.265));
  ball.position.lerp(contactPoint, 0.7);
  ball.position.y = Math.max(FOOTBALL_BALL_RADIUS, contactPoint.y);
}

function setFootballBallVelocity(game, dx, dz, power, loft = 0) {
  const len = Math.max(0.001, Math.hypot(dx, dz));
  const scaledPower = power * FOOTBALL_BALL_SPEED_SCALE;
  game.ballVel.x = (dx / len) * scaledPower;
  game.ballVel.z = (dz / len) * scaledPower;
  game.ballVel.y = loft;
}

function queueFootballRestart(game, spotX, spotZ, holdTime = 0.62) {
  game.restartSpot = { x: spotX, z: spotZ };
  game.restartHoldTimer = Math.max(game.restartHoldTimer ?? 0, holdTime);
  game.ball.position.set(spotX, FOOTBALL_BALL_RADIUS, spotZ);
  game.ballVel.set(0, 0, 0);
  game.ballHolder = null;
  game.deliveryType = null;
  game.deliveryTeam = 0;
  game.deliveryTimer = 0;
  game.deliverySource = null;
  game.deliveryTarget = null;
}

function findBestPassTarget(carrier, teammates, opponents) {
  let bestTarget = null;
  let bestScore = -Infinity;
  let bestDistance = 0;
  let bestGoalGain = -Infinity;
  let bestProgressiveTarget = null;
  let bestProgressiveScore = -Infinity;
  let bestProgressiveDistance = 0;
  let bestProgressiveGoalGain = -Infinity;
  let bestFreeForwardAttacker = null;
  let bestFreeForwardScore = -Infinity;
  let bestFreeForwardDistance = 0;
  const ownGoalDepth = -carrier.runner.root.position.z * carrier.team;
  const escapeBias = THREE.MathUtils.clamp((ownGoalDepth - (FOOTBALL_FIELD_HALF_LENGTH - 7.2)) / 3.4, 0, 1.55);
  const ownThirdTrapBias = THREE.MathUtils.clamp((ownGoalDepth - (FOOTBALL_FIELD_HALF_LENGTH - 7.9)) / 2.8, 0, 1.5);

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const runLaneBias = THREE.MathUtils.clamp((mate.goalRunTimer ?? 0) / 1.8, 0, 1.3);
    const leadTime = 0.42 + runLaneBias * 0.24;
    const runTargetX = mate.goalRunTimer > 0 ? (mate.goalRunTargetX ?? mate.runner.root.position.x) : mate.runner.root.position.x;
    const runTargetZ = mate.goalRunTimer > 0 ? (mate.goalRunTargetZ ?? mate.runner.root.position.z) : mate.runner.root.position.z;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime + (runTargetX - mate.runner.root.position.x) * runLaneBias * 0.52;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + (runTargetZ - mate.runner.root.position.z) * runLaneBias * 0.58;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.6 || dist > 10.8) continue;

    const forward = dz * carrier.team;
    const attackDepth = carrier.runner.root.position.z * carrier.team;
    const targetAttackDepth = targetZ * carrier.team;
    const goalGain = targetAttackDepth - attackDepth;
    const finalThirdBias = THREE.MathUtils.clamp((attackDepth - 1.6) / 5.8, 0, 1.35);
    if (escapeBias > 0.32 && forward < 0.35 && dist < 4.8) continue;
    let nearestOpponent = 99;
    let laneTraffic = 0;
    let interceptRisk = 0;
    let frontBlockerRisk = 0;
    let directLaneBlock = false;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      const odx = targetX - opp.runner.root.position.x;
      const odz = targetZ - opp.runner.root.position.z;
      nearestOpponent = Math.min(nearestOpponent, Math.hypot(odx, odz));

      const toOppX = opp.runner.root.position.x - carrier.runner.root.position.x;
      const toOppZ = opp.runner.root.position.z - carrier.runner.root.position.z;
      const along = THREE.MathUtils.clamp((toOppX * dx + toOppZ * dz) / Math.max(0.001, dist * dist), 0, 1);
      const projX = carrier.runner.root.position.x + dx * along;
      const projZ = carrier.runner.root.position.z + dz * along;
      const laneDist = Math.hypot(opp.runner.root.position.x - projX, opp.runner.root.position.z - projZ);
      if (laneDist < 1.15) laneTraffic += (1.15 - laneDist) * (1.18 - along * 0.4);
      if (along > 0.12 && along < 0.92 && laneDist < 0.82) interceptRisk += (0.82 - laneDist) * 1.6;
      if (forward > 0.2 && along > 0.18 && along < 0.88 && laneDist < 0.58) {
        frontBlockerRisk += (0.58 - laneDist) * (1.05 - Math.abs(along - 0.52) * 0.8) * 2.4;
      }
      if (forward > 0.35 && along > 0.22 && along < 0.82 && laneDist < 0.34) {
        directLaneBlock = true;
      }
    }

    if (directLaneBlock && forward > 0.45) continue;

    const openness = THREE.MathUtils.clamp((nearestOpponent - 0.9) / 3.3, 0, 1.35);
    const longPassBias = THREE.MathUtils.clamp((dist - 2.4) / 5.8, 0, 1.55);
    const switchBias = THREE.MathUtils.clamp(Math.abs(dx) / 5.4, 0, 1.1);
    const throughBias = THREE.MathUtils.clamp(forward / 5.8, -0.2, 1.4);
    const roleBias = mate.role === "attacker" ? 0.9 : mate.role === "defender" ? 0.38 : 0;
    const profileBias = mate.attackerProfile === "runner" ? 0.34 : mate.attackerProfile === "poacher" ? 0.22 : mate.attackerProfile === "playmaker" ? -0.08 : 0;
    const carrierPlaymakerBias = carrier.attackerProfile === "playmaker" ? 1 : 0;
    const carrierRunnerBias = carrier.attackerProfile === "runner" ? 1 : 0;
    const counterBias = mate.counterRunBoost ?? 0;
    const laneRoleBias = mate.attackLane === "farPost" ? 1.12 : mate.attackLane === "poach" ? 1.04 : mate.attackLane === "boxEdge" ? 0.76 : mate.attackLane === "overlap" ? 0.92 : mate.attackLane === "underlap" ? 0.72 : mate.attackLane === "link" ? 0.34 : mate.attackLane === "press" ? 0.18 : 0;
    const overlapBias = mate.attackLane === "overlap" ? switchBias * 1.2 + openness * 0.34 : 0;
    const underlapBias = mate.attackLane === "underlap" ? throughBias * 1.05 + openness * 0.2 : 0;
    const poachBias = mate.attackLane === "poach" ? throughBias * 0.4 + openness * 0.28 : 0;
    const farPostBias = mate.attackLane === "farPost" ? switchBias * 0.52 + openness * 0.36 : 0;
    const edgeBias = mate.attackLane === "boxEdge" ? openness * 0.28 + longPassBias * 0.22 : 0;
    const switchPlayBias = carrierPlaymakerBias * switchBias * (mate.attackLane === "farPost" || mate.attackLane === "overlap" ? 1.15 : 0.72);
    const diagonalSplitBias = carrierPlaymakerBias * Math.max(0, throughBias) * Math.min(1.2, Math.abs(dx) / 2.8) * (mate.attackerProfile === "runner" ? 1.2 : mate.attackLane === "underlap" ? 1 : 0.45);
    const runnerFeedBias = carrierRunnerBias * Math.max(0, throughBias) * (mate.attackerProfile === "runner" ? 0.42 : 0.16);
    const attackDepthBias = finalThirdBias * THREE.MathUtils.clamp((targetAttackDepth - attackDepth + 0.45) / 4.2, -0.25, 1.25);
    const goalHangBias = finalThirdBias * THREE.MathUtils.clamp((targetAttackDepth - (FOOTBALL_FIELD_HALF_LENGTH - 5.6)) / 3.4, 0, 1.15);
    const progressiveBias = THREE.MathUtils.clamp((goalGain - 0.15) / 3.2, -0.2, 1.45);
    const directGoalBias = THREE.MathUtils.clamp((targetAttackDepth - (FOOTBALL_FIELD_HALF_LENGTH - 6.6)) / 3.2, 0, 1.3);
    const breakRunBias = mate.goalRunTimer > 0
      ? (0.95 + Math.max(0, throughBias) * 0.85 + openness * 0.55 + directGoalBias * 0.6) * THREE.MathUtils.clamp(mate.breakRunBias ?? 1, 0.8, 1.6)
      : 0;
    const runLaneReward = mate.goalRunTimer > 0
      ? THREE.MathUtils.clamp((0.95 - laneTraffic) / 0.95, 0, 1.1) + THREE.MathUtils.clamp((0.72 - interceptRisk) / 0.72, 0, 0.9)
      : 0;
    const attackerGoalBias = mate.role === "attacker"
      ? progressiveBias * 1.25 + directGoalBias * 1.15 + Math.max(0, throughBias) * 0.55
      : progressiveBias * 0.36;
    const recyclePenalty = finalThirdBias * THREE.MathUtils.clamp((0.7 - forward) / 1.7, 0, 1.25) * THREE.MathUtils.clamp((5.4 - dist) / 3.6, 0, 1.12);
    const backwardPenalty = finalThirdBias * THREE.MathUtils.clamp((-forward + 0.25) / 2.8, 0, 1.3);
    const nonProgressiveAttackerPenalty = mate.role === "attacker" ? finalThirdBias * THREE.MathUtils.clamp((0.45 - goalGain) / 1.6, 0, 1.3) : 0;
    const escapeForwardBias = escapeBias * THREE.MathUtils.clamp(forward / 4.9, -0.15, 1.35);
    const escapeLongBias = escapeBias * THREE.MathUtils.clamp((dist - 3.5) / 4.6, 0, 1.25);
    const deepRecyclePenalty = ownThirdTrapBias * THREE.MathUtils.clamp((1.05 - forward) / 1.45, 0, 1.3) * THREE.MathUtils.clamp((6.2 - dist) / 3.8, 0, 1.15);
    const deepDefenderLoopPenalty = ownThirdTrapBias
      * (carrier.role === "defender" && mate.role === "defender" ? 1 : 0)
      * THREE.MathUtils.clamp((5.8 - dist) / 3.2, 0, 1.2)
      * THREE.MathUtils.clamp((0.95 - forward) / 1.35, 0, 1.2);
    const ownThirdOutletBias = ownThirdTrapBias
      * (mate.role === "attacker" ? 1.45 : mate.role === "defender" ? 0.18 : 0.45)
      * THREE.MathUtils.clamp((goalGain + 0.2) / 3.6, -0.1, 1.25);
    const ownThirdSwitchBias = ownThirdTrapBias * switchBias * (mate.role === "attacker" ? 0.62 : 0.28);
    const score = openness * 2.7 + longPassBias * 2.15 + throughBias * 2.25 + switchBias * 0.75 + roleBias + profileBias + counterBias + laneRoleBias + overlapBias + underlapBias + poachBias + farPostBias + edgeBias + switchPlayBias + diagonalSplitBias + runnerFeedBias + attackDepthBias * 1.95 + goalHangBias * 1.55 + attackerGoalBias * 1.9 + breakRunBias * 1.8 + runLaneReward * 1.25 + escapeForwardBias * 2.45 + escapeLongBias * 1.85 + ownThirdOutletBias * 2.35 + ownThirdSwitchBias
      - recyclePenalty * 2.2 - backwardPenalty * 2.6 - nonProgressiveAttackerPenalty * 1.8 - deepRecyclePenalty * 2.55 - deepDefenderLoopPenalty * 3.1 - laneTraffic * (1.65 + escapeBias * 0.12) - interceptRisk * (1.4 + escapeBias * 0.08) - frontBlockerRisk * 2.6
      + (carrier.passVision ?? 0) * (progressiveBias * 0.9 + openness * 0.55 + Math.max(0, goalGain) * 0.2);
    if (score > bestScore) {
      bestScore = score;
      bestTarget = mate;
      bestDistance = dist;
      bestGoalGain = goalGain;
    }

    const isProgressiveTarget = forward > 0.55 && goalGain > 0.35;
    if (isProgressiveTarget) {
      const progressiveScore = score + progressiveBias * 1.4 + directGoalBias * 1.2 + (mate.role === "attacker" ? 1.35 : 0.35);
      if (progressiveScore > bestProgressiveScore) {
        bestProgressiveScore = progressiveScore;
        bestProgressiveTarget = mate;
        bestProgressiveDistance = dist;
        bestProgressiveGoalGain = goalGain;
      }
    }

    const freeForwardAttacker = mate.role === "attacker"
      && forward > 0.8
      && goalGain > 0.65
      && openness > 0.2 - runLaneBias * 0.08
      && nearestOpponent > 1.15 - runLaneBias * 0.14
      && laneTraffic < 0.45 + runLaneBias * 0.18
      && interceptRisk < 0.35 + runLaneBias * 0.16
      && frontBlockerRisk < 0.18
      && !directLaneBlock;
    if (freeForwardAttacker) {
      const freeForwardScore = score + progressiveBias * 1.8 + directGoalBias * 1.5 + openness * 0.9 + runLaneBias * 1.8;
      if (freeForwardScore > bestFreeForwardScore) {
        bestFreeForwardScore = freeForwardScore;
        bestFreeForwardAttacker = mate;
        bestFreeForwardDistance = dist;
      }
    }
  }

  const useFreeForwardAttacker = bestFreeForwardAttacker
    && (
      !bestTarget
      || bestTarget === bestFreeForwardAttacker
      || bestTarget.role !== "attacker"
      || bestGoalGain < 0.55
      || bestFreeForwardScore > bestScore - (0.55 - FOOTBALL_BEHAVIOR.progressiveChoiceBias)
    );
  const useProgressiveTarget = !useFreeForwardAttacker && bestProgressiveTarget
    && (
      !bestTarget
      || bestTarget.role !== "attacker"
      || bestGoalGain < 0.3
      || bestProgressiveGoalGain > bestGoalGain + 0.25
      || bestProgressiveScore > bestScore - (0.2 + FOOTBALL_BEHAVIOR.progressiveChoiceBias)
    );
  const selectedTarget = useFreeForwardAttacker ? bestFreeForwardAttacker : (useProgressiveTarget ? bestProgressiveTarget : bestTarget);
  const selectedDistance = useFreeForwardAttacker ? bestFreeForwardDistance : (useProgressiveTarget ? bestProgressiveDistance : bestDistance);
  const selectedScore = useFreeForwardAttacker ? bestFreeForwardScore : (useProgressiveTarget ? bestProgressiveScore : bestScore);

  return selectedScore > 1
    ? {
        player: selectedTarget,
        dist: selectedDistance,
        score: selectedScore,
        forward: selectedTarget ? (selectedTarget.runner.root.position.z - carrier.runner.root.position.z) * carrier.team : 0,
        targetDepth: selectedTarget ? selectedTarget.runner.root.position.z * carrier.team : 0,
        goalGain: selectedTarget ? selectedTarget.runner.root.position.z * carrier.team - carrier.runner.root.position.z * carrier.team : 0,
        progressive: selectedTarget ? (((selectedTarget.runner.root.position.z - carrier.runner.root.position.z) * carrier.team) > 0.55 && ((selectedTarget.runner.root.position.z * carrier.team) - (carrier.runner.root.position.z * carrier.team)) > 0.35) : false,
        forcedForward: selectedTarget ? selectedTarget === bestFreeForwardAttacker : false,
        throughRun: selectedTarget ? selectedTarget.role === "attacker" && (selectedTarget.goalRunTimer ?? 0) > 0.18 : false,
        leadTime: selectedTarget ? 0.42 + THREE.MathUtils.clamp((selectedTarget.goalRunTimer ?? 0) / 1.8, 0, 1.3) * 0.24 : 0.42
      }
    : null;
}

function findBestCrossTarget(carrier, teammates, opponents, attackGoalZ) {
  let bestTarget = null;
  let bestScore = -Infinity;
  let bestDistance = 0;

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const leadTime = 0.3;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + carrier.team * 0.12;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.4 || dist > 9.2) continue;

    const goalDistance = (attackGoalZ - targetZ) * carrier.team;
    const inBoxBias = THREE.MathUtils.clamp((4.8 - goalDistance) / 3.6, -0.2, 1.45);
    const roleBias = mate.attackLane === "farPost" ? 1.5 : mate.attackLane === "poach" ? 1.34 : mate.attackLane === "boxEdge" ? 0.98 : mate.role === "attacker" ? 1.15 : mate.attackLane === "underlap" ? 0.74 : mate.attackLane === "link" ? 0.42 : 0.18;
    const profileBias = mate.attackerProfile === "poacher" ? 0.46 : mate.attackerProfile === "runner" ? 0.22 : mate.attackerProfile === "playmaker" ? -0.12 : 0;
    const farPostBias = THREE.MathUtils.clamp((-Math.sign(carrier.runner.root.position.x || 1) * targetX + 0.8) / 2.8, 0, 1.2);
    const centralBias = THREE.MathUtils.clamp((3.6 - Math.abs(targetX)) / 3.2, 0, 1.1);

    let nearestOpponent = 99;
    let boxTraffic = 0;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      const od = Math.hypot(targetX - opp.runner.root.position.x, targetZ - opp.runner.root.position.z);
      nearestOpponent = Math.min(nearestOpponent, od);
      if (od < 1.3) boxTraffic += (1.3 - od) * 1.25;
    }

    const openness = THREE.MathUtils.clamp((nearestOpponent - 0.8) / 2.8, 0, 1.35);
    const score = inBoxBias * 2.55 + farPostBias * 1.45 + centralBias * 0.9 + openness * 2.1 + roleBias + profileBias - boxTraffic * 1.4;
    if (score > bestScore) {
      bestScore = score;
      bestTarget = mate;
      bestDistance = dist;
    }
  }

  return bestScore > 1.25 ? { player: bestTarget, dist: bestDistance, score: bestScore } : null;
}

function findClearanceTarget(carrier, teammates, opponents) {
  const ownGoalDepth = -carrier.runner.root.position.z * carrier.team;
  const clearanceRadius = ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 7.4 ? 5.6 : 4.4;
  let leftPressure = 0;
  let rightPressure = 0;
  let centralPressure = 0;
  let nearestPressure = 99;

  for (let i = 0; i < opponents.length; i += 1) {
    const opp = opponents[i];
    if (opp.role === "keeper") continue;
    const relX = opp.runner.root.position.x - carrier.runner.root.position.x;
    const relZ = (opp.runner.root.position.z - carrier.runner.root.position.z) * carrier.team;
    const dist = Math.hypot(relX, relZ);
    nearestPressure = Math.min(nearestPressure, dist);
    if (relZ < -1.2 || relZ > clearanceRadius || Math.abs(relX) > FOOTBALL_FIELD_HALF_WIDTH * 0.72) continue;

    const pressure = (1.18 - THREE.MathUtils.clamp(dist / (clearanceRadius + 0.8), 0, 1.18)) * (1.08 - THREE.MathUtils.clamp(Math.abs(relX) / (FOOTBALL_FIELD_HALF_WIDTH * 0.68), 0, 0.82));
    if (Math.abs(relX) < 0.72) {
      centralPressure += pressure * 1.18;
    } else if (relX < 0) {
      leftPressure += pressure;
    } else {
      rightPressure += pressure;
    }
  }

  const pressureSide = rightPressure > leftPressure + 0.22 ? 1 : leftPressure > rightPressure + 0.22 ? -1 : 0;
  const clearanceSide = pressureSide !== 0
    ? -pressureSide
    : centralPressure > 0.55
      ? Math.sign(carrier.runner.root.position.x || carrier.laneBias || 1)
      : Math.sign(carrier.laneBias || carrier.runner.root.position.x || 1);
  let bestTarget = null;
  let bestScore = -Infinity;

  for (let i = 0; i < teammates.length; i += 1) {
    const mate = teammates[i];
    if (mate === carrier || mate.role === "keeper") continue;

    const leadTime = 0.58;
    const targetX = mate.runner.root.position.x + mate.vx * leadTime;
    const targetZ = mate.runner.root.position.z + mate.vz * leadTime + carrier.team * 0.26;
    const dx = targetX - carrier.runner.root.position.x;
    const dz = targetZ - carrier.runner.root.position.z;
    const dist = Math.hypot(dx, dz);
    const forward = dz * carrier.team;
    if (forward < 1.2 || dist < 3.4 || dist > 15.2) continue;

    let nearestOpponent = 99;
    for (let j = 0; j < opponents.length; j += 1) {
      const opp = opponents[j];
      if (opp.role === "keeper") continue;
      nearestOpponent = Math.min(nearestOpponent, Math.hypot(targetX - opp.runner.root.position.x, targetZ - opp.runner.root.position.z));
    }

    const openness = THREE.MathUtils.clamp((nearestOpponent - 1.0) / 3.8, 0, 1.25);
    const forwardBias = THREE.MathUtils.clamp(forward / 7.2, 0, 1.45);
    const longBias = THREE.MathUtils.clamp((dist - 3.8) / 6.6, 0, 1.3);
    const sideBias = THREE.MathUtils.clamp((targetX * clearanceSide + FOOTBALL_FIELD_HALF_WIDTH * 0.24) / (FOOTBALL_FIELD_HALF_WIDTH * 1.04), 0, 1.25);
    const roleBias = mate.role === "attacker" ? 0.72 : mate.attackLane === "overlap" || mate.attackLane === "farPost" ? 0.56 : 0.28;
    const score = openness * 2.2 + forwardBias * 2.65 + longBias * 1.55 + sideBias * 1.4 + roleBias;
    if (score > bestScore) {
      bestScore = score;
      bestTarget = { type: "player", player: mate, x: targetX, z: targetZ, dist, score };
    }
  }

  if (bestTarget && bestTarget.score > 2.55) {
    return {
      ...bestTarget,
      pressureSide,
      power: 3.55 + Math.min(2.6, bestTarget.dist * 0.24)
    };
  }

  const laneTargetX = THREE.MathUtils.clamp(
    clearanceSide * (FOOTBALL_FIELD_HALF_WIDTH - 0.85) + (Math.random() - 0.5) * 0.7,
    -FOOTBALL_FIELD_HALF_WIDTH + 0.7,
    FOOTBALL_FIELD_HALF_WIDTH - 0.7
  );
  const laneTargetZ = THREE.MathUtils.clamp(
    carrier.runner.root.position.z + carrier.team * (7.1 + Math.min(2.2, ownGoalDepth * 0.08) + centralPressure * 0.7),
    -FOOTBALL_FIELD_HALF_LENGTH + 0.7,
    FOOTBALL_FIELD_HALF_LENGTH - 0.45
  );
  const laneDist = Math.hypot(laneTargetX - carrier.runner.root.position.x, laneTargetZ - carrier.runner.root.position.z);
  return {
    type: "channel",
    x: laneTargetX,
    z: laneTargetZ,
    dist: laneDist,
    score: 1.8 + centralPressure,
    pressureSide,
    power: 3.95 + Math.min(1.9, laneDist * 0.16)
  };
}

function resolvePeopleCollisions(game) {
  const people = [];


  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    people.push({
      kind: "football",
      ref: p,
      radius: FOOTBALL_PERSON_RADIUS,
      x: p.runner.root.position.x,
      z: p.runner.root.position.z
    });
  }

  for (let i = 0; i < game.trackRunners.length; i += 1) {
    const r = game.trackRunners[i];
    people.push({
      kind: "track",
      ref: r,
      radius: TRACK_PERSON_RADIUS,
      x: r.runner.root.position.x,
      z: r.runner.root.position.z
    });
  }

  if (game.coach) {
    people.push({
      kind: "coach",
      ref: game.coach,
      radius: COACH_PERSON_RADIUS,
      x: game.coach.runner.root.position.x,
      z: game.coach.runner.root.position.z
    });
  }

  people.push({
    kind: "juku",
    radius: JUKU_COLLIDER_RADIUS,
    x: state.x,
    z: state.z
  });

  const clampFootball = (person) => {
    person.x = THREE.MathUtils.clamp(person.x, -FOOTBALL_FIELD_HALF_WIDTH + 0.4, FOOTBALL_FIELD_HALF_WIDTH - 0.4);
    person.z = THREE.MathUtils.clamp(person.z, -FOOTBALL_FIELD_HALF_LENGTH + 0.4, FOOTBALL_FIELD_HALF_LENGTH - 0.4);
  };

  const constrainPerson = (person) => {
    if (person.kind === "football") {
      clampFootball(person);
      return;
    }
    if (person.kind === "track") {
      const point = getTrackPointAtProgress(person.ref.laneIndex, person.ref.progress);
      person.x = point.x;
      person.z = point.z;
      return;
    }
    if (person.kind === "coach") {
      person.x = THREE.MathUtils.clamp(person.x, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
      person.z = THREE.MathUtils.clamp(person.z, -WORLD_MOVE_LIMIT, WORLD_MOVE_LIMIT);
      return;
    }
    const resolved = resolveJukuCollisions(person.x, person.z);
    person.x = resolved.x;
    person.z = resolved.z;
  };

  for (let pass = 0; pass < 4; pass += 1) {
    let moved = false;

    for (let i = 0; i < people.length; i += 1) {
      const a = people[i];
      for (let j = i + 1; j < people.length; j += 1) {
        const b = people[j];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const minDist = a.radius + b.radius;
        const distSq = dx * dx + dz * dz;
        if (distSq >= minDist * minDist) continue;

        const dist = Math.sqrt(distSq);
        const nx = dist > 0.0001 ? dx / dist : 1;
        const nz = dist > 0.0001 ? dz / dist : 0;
        const overlap = minDist - dist;
        const split = overlap * 0.5;

        a.x -= nx * split;
        a.z -= nz * split;
        b.x += nx * split;
        b.z += nz * split;
        moved = true;
      }
    }

    for (let i = 0; i < people.length; i += 1) {
      constrainPerson(people[i]);
    }

    if (!moved) break;
  }

  for (let i = 0; i < people.length; i += 1) {
    const person = people[i];
    if (person.kind === "football") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      continue;
    }
    if (person.kind === "track") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      const point = getTrackPointAtProgress(person.ref.laneIndex, person.ref.progress);
      const dir = person.ref.dir ?? 1;
      person.ref.runner.root.rotation.y = Math.atan2(point.dirX * dir, point.dirZ * dir);
      continue;
    }
    if (person.kind === "coach") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      continue;
    }
    state.x = person.x;
    state.z = person.z;
  }
}

function getFootballPerimeterPoint(t, offset = 1.15) {
  const halfW = FOOTBALL_FIELD_HALF_WIDTH + offset;
  const halfL = FOOTBALL_FIELD_HALF_LENGTH + offset;
  const width = halfW * 2;
  const length = halfL * 2;
  const perimeter = width * 2 + length * 2;
  let d = ((t % 1) + 1) % 1 * perimeter;
  if (d < length) return { x: halfW, z: -halfL + d, dirX: 0, dirZ: 1 };
  d -= length;
  if (d < width) return { x: halfW - d, z: halfL, dirX: -1, dirZ: 0 };
  d -= width;
  if (d < length) return { x: -halfW, z: halfL - d, dirX: 0, dirZ: -1 };
  d -= length;
  return { x: -halfW + d, z: -halfL, dirX: 1, dirZ: 0 };
}

function getFootballPerimeterTFromPoint(x, z, offset = 1.15) {
  const halfW = FOOTBALL_FIELD_HALF_WIDTH + offset;
  const halfL = FOOTBALL_FIELD_HALF_LENGTH + offset;
  const width = halfW * 2;
  const length = halfL * 2;
  const perimeter = width * 2 + length * 2;
  const candidates = [
    { x: halfW, z: THREE.MathUtils.clamp(z, -halfL, halfL), d: THREE.MathUtils.clamp(z, -halfL, halfL) + halfL },
    { x: THREE.MathUtils.clamp(x, -halfW, halfW), z: halfL, d: length + (halfW - THREE.MathUtils.clamp(x, -halfW, halfW)) },
    { x: -halfW, z: THREE.MathUtils.clamp(z, -halfL, halfL), d: length + width + (halfL - THREE.MathUtils.clamp(z, -halfL, halfL)) },
    { x: THREE.MathUtils.clamp(x, -halfW, halfW), z: -halfL, d: length + width + length + (THREE.MathUtils.clamp(x, -halfW, halfW) + halfW) }
  ];
  let best = candidates[0];
  let bestDist = Infinity;
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const dist = (x - candidate.x) ** 2 + (z - candidate.z) ** 2;
    if (dist < bestDist) {
      best = candidate;
      bestDist = dist;
    }
  }
  return best.d / perimeter;
}

function updateFootballGame(game, dt) {
  game.phase += dt;
  const cameraWorldPos = camera.getWorldPosition(new THREE.Vector3());

  if (game.coach) {
    game.coach.whistleTimer = Math.max(0, game.coach.whistleTimer - dt);
    game.coach.cardTimer = Math.max(0, game.coach.cardTimer - dt);
    game.coach.cardCooldown = Math.max(0, game.coach.cardCooldown - dt);
    const targetT = getFootballPerimeterTFromPoint(game.ball.position.x, game.ball.position.z, game.coach.perimeterOffset);
    if (!Number.isFinite(game.coach.perimeterT)) game.coach.perimeterT = targetT;
    let deltaT = targetT - game.coach.perimeterT;
    if (deltaT > 0.5) deltaT -= 1;
    if (deltaT < -0.5) deltaT += 1;
    const perimeter = 4 * (FOOTBALL_FIELD_HALF_WIDTH + game.coach.perimeterOffset) + 4 * (FOOTBALL_FIELD_HALF_LENGTH + game.coach.perimeterOffset);
    const pathDist = Math.abs(deltaT) * perimeter;
    const travel = Math.min(pathDist, dt * 4.4);
    const moveSpeed = dt > 0 ? travel / dt : 0;
    if (pathDist > 0.0001) {
      game.coach.perimeterT = ((game.coach.perimeterT + (travel / perimeter) * Math.sign(deltaT)) % 1 + 1) % 1;
    }
    const perimeterPoint = getFootballPerimeterPoint(game.coach.perimeterT, game.coach.perimeterOffset);
    game.coach.runner.root.position.x = perimeterPoint.x;
    game.coach.runner.root.position.z = perimeterPoint.z;
    const lookDx = game.ball.position.x - game.coach.runner.root.position.x;
    const lookDz = game.ball.position.z - game.coach.runner.root.position.z;
    const coachFacing = Math.atan2(lookDx, lookDz);
    game.coach.runner.root.rotation.y = coachFacing;
    const coachRightX = Math.cos(coachFacing);
    const coachRightZ = -Math.sin(coachFacing);
    const coachLateral = perimeterPoint.dirX * coachRightX + perimeterPoint.dirZ * coachRightZ;
    const coachForward = perimeterPoint.dirX * Math.sin(coachFacing) + perimeterPoint.dirZ * Math.cos(coachFacing);
    const coachSideStepAmount = Math.abs(coachLateral) > Math.abs(coachForward) + 0.08 ? THREE.MathUtils.clamp(moveSpeed / 1.6, 0, 1) : 0;

    game.coach.cycle += dt * (4 + moveSpeed * 1.85);
    animateRunner(
      game.coach.runner,
      moveSpeed,
      game.coach.cycle,
      0,
      coachSideStepAmount > 0
        ? { type: "sideStep", amount: coachSideStepAmount, dir: Math.sign(coachLateral || 1), sprintAmount: THREE.MathUtils.clamp(moveSpeed / 2.1, 0, 1) }
        : null
    );
    game.coach.runner.leftArm.rotation.z *= 0.7;
    game.coach.runner.rightArm.rotation.z *= 0.7;
    game.coach.runner.torsoPivot.rotation.z *= 0.55;
    const whistleBlend = THREE.MathUtils.clamp(game.coach.whistleTimer / 0.68, 0, 1);
    const cardBlend = THREE.MathUtils.clamp(game.coach.cardTimer / 1.15, 0, 1);
    if (whistleBlend > 0.001) {
      game.coach.runner.leftArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.x, -2.35, whistleBlend);
      game.coach.runner.leftArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.z, 0.28, whistleBlend);
      game.coach.runner.leftArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.leftArm.rotation.y, 0.24, whistleBlend);
      game.coach.runner.head.rotation.x = THREE.MathUtils.lerp(game.coach.runner.head.rotation.x, -0.16, whistleBlend * 0.8);
      game.coach.runner.head.rotation.y += THREE.MathUtils.clamp(lookDx * 0.018, -0.08, 0.08) * whistleBlend;
      game.coach.runner.torsoPivot.rotation.x -= 0.06 * whistleBlend;
    }
    if (cardBlend > 0.001) {
      game.coach.runner.rightArm.rotation.x = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.x, -3.02, cardBlend);
      game.coach.runner.rightArm.rotation.z = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.z, -0.08, cardBlend);
      game.coach.runner.rightArm.rotation.y = THREE.MathUtils.lerp(game.coach.runner.rightArm.rotation.y, -0.04, cardBlend);
      game.coach.runner.torsoPivot.rotation.z += 0.08 * cardBlend;
      game.coach.runner.head.rotation.x = Math.min(game.coach.runner.head.rotation.x, -0.06 * cardBlend);
    }
    game.coach.runner.head.rotation.y = THREE.MathUtils.clamp(-lookDx * 0.045 + game.coach.runner.head.rotation.y, -0.28, 0.28);
    game.coach.runner.head.rotation.x = THREE.MathUtils.clamp(game.coach.runner.head.rotation.x + moveSpeed * 0.01 - lookDz * 0.0035, -0.2, 0.08);
    if (game.coach.yellowCard) {
      const showYellow = game.coach.cardColor === "yellow";
      game.coach.yellowCard.visible = showYellow && cardBlend > 0.02;
      game.coach.yellowCard.material.opacity = showYellow ? 0.92 * cardBlend : 0;
    }
    if (game.coach.redCard) {
      const showRed = game.coach.cardColor === "red";
      game.coach.redCard.visible = showRed && cardBlend > 0.02;
      game.coach.redCard.material.opacity = showRed ? 0.92 * cardBlend : 0;
    }
    if (game.coach.label) {
      const refCameraDist = cameraWorldPos.distanceTo(game.coach.runner.root.position);
      game.coach.label.material.opacity = THREE.MathUtils.clamp((32 - refCameraDist) / 26, 0.18, 0.52);
    }
  }

  const dropHurdle = (hurdle, tipDir) => {
    hurdle.fallen = true;
    hurdle.resetTimer = TRACK_HURDLE_RESET_TIME;
    hurdle.fallProgress = Math.max(hurdle.fallProgress ?? 0, 0.02);
    hurdle.tipDir = tipDir;
    if (hurdle.collider) {
      hurdle.collider.halfX = 0.08;
      hurdle.collider.halfZ = 0.08;
    }
  };

  game.hurdles.forEach((hurdle) => {
    if (hurdle.fallen) {
      hurdle.resetTimer = Math.max(0, (hurdle.resetTimer ?? TRACK_HURDLE_RESET_TIME) - dt);
      if (hurdle.resetTimer <= 0) {
        hurdle.fallen = false;
      }
    } else if (Math.random() < dt * TRACK_HURDLE_RANDOM_FALL_RATE) {
      dropHurdle(hurdle, Math.random() < 0.5 ? -1 : 1);
    }

    const fallVelocity = hurdle.fallen ? TRACK_HURDLE_FALL_SPEED : -TRACK_HURDLE_FALL_SPEED * 1.2;
    hurdle.fallProgress = THREE.MathUtils.clamp((hurdle.fallProgress ?? 0) + dt * fallVelocity, 0, 1);
    const easedFall = hurdle.fallProgress > 0 ? 1 - Math.pow(1 - hurdle.fallProgress, 3) : 0;
    hurdle.mesh.rotation.x = hurdle.tipDir * easedFall * THREE.MathUtils.degToRad(84);
    hurdle.mesh.position.y = (hurdle.baseY ?? 0.015) - easedFall * 0.03;
    if (hurdle.collider) {
      hurdle.collider.halfX = THREE.MathUtils.lerp(hurdle.baseHalfX ?? (0.46 * TRACK_HURDLE_SCALE), 0.12, easedFall);
      hurdle.collider.halfZ = THREE.MathUtils.lerp(hurdle.baseHalfZ ?? (0.12 * TRACK_HURDLE_SCALE), 0.34, easedFall);
    }
  });

  const getTrackForwardGap = (fromProgress, toProgress, laneLength, dir) => (dir > 0
    ? ((toProgress - fromProgress) % laneLength + laneLength) % laneLength
    : ((fromProgress - toProgress) % laneLength + laneLength) % laneLength);

  const isLaneOpenForRunner = (runnerState, candidateLane, frontClear, backClear) => {
    const dir = runnerState.dir ?? 1;
    const laneLength = getTrackLaneLength(candidateLane);
    for (let i = 0; i < game.trackRunners.length; i += 1) {
      const other = game.trackRunners[i];
      if (other === runnerState) continue;
      const otherTargetLane = other.targetLaneIndex ?? other.laneIndex;
      if (Math.abs(other.laneIndex - candidateLane) > 0.55 && Math.abs(otherTargetLane - candidateLane) > 0.55) continue;
      const aheadGap = getTrackForwardGap(runnerState.progress, other.progress, laneLength, dir);
      const behindGap = laneLength - aheadGap;
      if (aheadGap < frontClear || behindGap < backClear) return false;
    }
    return true;
  };

  game.trackRunners.forEach((runnerState) => {
    const dir = runnerState.dir ?? 1;
    const currentLane = runnerState.laneIndex ?? 0;
    const speedPhase = runnerState.speedPhase ?? 0;
    const speedPulse = 1
      + Math.sin(runnerState.cycle * 0.11 + speedPhase) * 0.05
      + Math.sin(runnerState.cycle * 0.047 + speedPhase * 1.7) * 0.025;
    const desiredSpeed = runnerState.speed * speedPulse;
    runnerState.currentSpeed = desiredSpeed;

    if (!Number.isFinite(runnerState.targetLaneIndex)) {
      runnerState.targetLaneIndex = Math.round(currentLane);
    }

    const laneLength = getTrackLaneLength(currentLane);
    let blocker = null;
    let nearestAhead = Infinity;

    for (let i = 0; i < game.trackRunners.length; i += 1) {
      const other = game.trackRunners[i];
      if (other === runnerState) continue;
      if (Math.abs(other.laneIndex - currentLane) > 0.42) continue;
      const ahead = getTrackForwardGap(runnerState.progress, other.progress, laneLength, dir);
      if (ahead > 0.001 && ahead < nearestAhead) {
        nearestAhead = ahead;
        blocker = other;
      }
    }

    const blockerSpeed = blocker ? (blocker.currentSpeed ?? blocker.speed ?? 0) : 0;
    const wantsToPass = Boolean(blocker) && nearestAhead < TRACK_RUNNER_PASS_TRIGGER && desiredSpeed > blockerSpeed + 0.06;

    if (wantsToPass && (runnerState.targetLaneIndex ?? 0) < TRACK_RUNNER_MAX_PASS_LANE) {
      for (let candidateLane = 1; candidateLane <= TRACK_RUNNER_MAX_PASS_LANE; candidateLane += 1) {
        if (isLaneOpenForRunner(runnerState, candidateLane, TRACK_RUNNER_PASS_FRONT_CLEARANCE, TRACK_RUNNER_PASS_BACK_CLEARANCE)) {
          runnerState.targetLaneIndex = candidateLane;
          break;
        }
      }
    } else if (!wantsToPass && (runnerState.targetLaneIndex ?? 0) > 0) {
      const enoughRoomToReturn = !blocker || nearestAhead > TRACK_RUNNER_PASS_FRONT_CLEARANCE * 0.9;
      if (enoughRoomToReturn && isLaneOpenForRunner(runnerState, 0, TRACK_RUNNER_PASS_FRONT_CLEARANCE * 0.85, TRACK_RUNNER_PASS_BACK_CLEARANCE)) {
        runnerState.targetLaneIndex = 0;
      }
    }

    runnerState.laneIndex = THREE.MathUtils.damp(currentLane, runnerState.targetLaneIndex ?? 0, TRACK_RUNNER_LANE_CHANGE_RATE, dt);
    if (Math.abs(runnerState.laneIndex - (runnerState.targetLaneIndex ?? 0)) < 0.02) {
      runnerState.laneIndex = runnerState.targetLaneIndex ?? 0;
    }

    let laneSpeed = desiredSpeed;
    if ((runnerState.targetLaneIndex ?? 0) === 0 && nearestAhead < 1.35) {
      laneSpeed *= THREE.MathUtils.clamp(nearestAhead / 1.35, 0.72, 1);
    }

    const travelLaneLength = getTrackLaneLength(runnerState.laneIndex);
    runnerState.progress = (runnerState.progress + dir * dt * laneSpeed * 3.35 + travelLaneLength) % travelLaneLength;
    const point = getTrackPointAtProgress(runnerState.laneIndex, runnerState.progress);
    runnerState.runner.root.position.x = point.x;
    runnerState.runner.root.position.z = point.z;
    runnerState.runner.root.rotation.y = Math.atan2(point.dirX * dir, point.dirZ * dir);

    runnerState.jumpCooldown = Math.max(0, runnerState.jumpCooldown - dt);
    let nextHurdle = null;
    let nextHurdleGap = Infinity;
    let contactHurdle = null;
    let contactGap = Infinity;
    for (let i = 0; i < game.hurdles.length; i += 1) {
      const hurdle = game.hurdles[i];
      if (Math.abs(hurdle.laneIndex - runnerState.laneIndex) > 0.35 || hurdle.fallen) continue;
      const hurdleGap = getTrackForwardGap(runnerState.progress, hurdle.progress, travelLaneLength, dir);
      if (hurdleGap > 0.001 && hurdleGap < nextHurdleGap) {
        nextHurdleGap = hurdleGap;
        nextHurdle = hurdle;
      }
      const wrappedGap = Math.min(hurdleGap, travelLaneLength - hurdleGap);
      if (wrappedGap < contactGap) {
        contactGap = wrappedGap;
        contactHurdle = hurdle;
      }
    }
    if (runnerState.jumpY <= 0.0001 && runnerState.jumpCooldown <= 0 && runnerState.laneIndex < 0.35 && nextHurdle && nextHurdleGap < TRACK_HURDLE_JUMP_TRIGGER) {
      runnerState.jumpVel = TRACK_RUNNER_HURDLE_JUMP_VELOCITY + Math.random() * 0.18;
      runnerState.jumpCooldown = 0.72 + Math.random() * 0.14;
    }

    if (runnerState.jumpY > 0 || runnerState.jumpVel > 0) {
      runnerState.jumpVel -= 8.8 * dt;
      runnerState.jumpY += runnerState.jumpVel * dt;
      if (runnerState.jumpY <= 0) {
        runnerState.jumpY = 0;
        runnerState.jumpVel = 0;
      }
    }

    if (contactHurdle && contactGap < TRACK_HURDLE_CONTACT_WINDOW) {
      const clearHeight = runnerState.jumpY + Math.max(0, runnerState.jumpVel) * 0.045;
      if (clearHeight < TRACK_RUNNER_HURDLE_CLEARANCE_Y) {
        dropHurdle(contactHurdle, dir > 0 ? -1 : 1);
        runnerState.jumpVel = Math.max(runnerState.jumpVel, TRACK_RUNNER_HURDLE_IMPACT_LIFT);
        runnerState.jumpCooldown = Math.max(runnerState.jumpCooldown, 0.48);
      }
    }

    runnerState.cycle += dt * (5.8 + laneSpeed * 2.35);
    animateRunner(runnerState.runner, laneSpeed * 0.86, runnerState.cycle, runnerState.jumpY);
  });

  if (updateGoalCelebration(game, dt)) return;

  game.restartHoldTimer = Math.max(0, (game.restartHoldTimer ?? 0) - dt);
  game.kickoffScriptTimer = Math.max(0, (game.kickoffScriptTimer ?? 0) - dt);
  const kickoffLocked = game.restartHoldTimer > 0.001;
  if (kickoffLocked) {
    const restartX = game.restartSpot?.x ?? 0;
    const restartZ = game.restartSpot?.z ?? 0;
    game.ball.position.set(restartX, FOOTBALL_BALL_RADIUS, restartZ);
    game.ballVel.set(0, 0, 0);
  } else {
    game.ballVel.x *= Math.pow(0.994, dt * 60);
    game.ballVel.z *= Math.pow(0.994, dt * 60);
    game.ballVel.y *= Math.pow(0.998, dt * 60);
    game.ballVel.y -= FOOTBALL_BALL_GRAVITY * dt;
    game.ball.position.x += game.ballVel.x * dt;
    game.ball.position.y += game.ballVel.y * dt;
    game.ball.position.z += game.ballVel.z * dt;

    if (game.ball.position.y <= FOOTBALL_BALL_RADIUS) {
      game.ball.position.y = FOOTBALL_BALL_RADIUS;
      if (Math.abs(game.ballVel.y) > 1.15) {
        game.ballVel.y = -game.ballVel.y * FOOTBALL_BALL_GROUND_BOUNCE;
        game.ballVel.x *= 0.975;
        game.ballVel.z *= 0.975;
      } else {
        game.ballVel.y = 0;
        game.ballVel.x *= Math.pow(0.989, dt * 60);
        game.ballVel.z *= Math.pow(0.989, dt * 60);
      }
    }
  }

  if (!kickoffLocked && (game.kickoffScriptTimer ?? 0) > 0 && (game.restartTeam ?? 0) !== 0) {
    const taker = game.players.find((p) => p.kickoffRole === "taker" && p.team === game.restartTeam) ?? null;
    const support = game.players.find((p) => p.kickoffRole === "support" && p.team === game.restartTeam) ?? null;
    if (taker && support && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT) {
      const waitForScriptKick = game.kickoffScriptTimer <= 0.18;
      if (waitForScriptKick) {
        const targetX = support.runner.root.position.x + support.vx * 0.18;
        const targetZ = support.runner.root.position.z + support.vz * 0.18 + taker.team * 0.45;
        const passDx = targetX - game.ball.position.x;
        const passDz = targetZ - game.ball.position.z;
        taker.kickSide = getFootballFootedness(taker, game.ball, targetX).kickSide;
        applyFootballKickContact(taker, game.ball);
        setFootballBallVelocity(game, passDx, passDz, 4.9 + Math.random() * 0.45, 0.22 + Math.random() * 0.08);
        taker.kickCooldown = 0.72;
        triggerFootballKickPose(taker, game.ball, 0.92, targetX);
        registerBallTouch(game, taker.team, taker);
        game.kickoffScriptTimer = 0;
        game.kickoffContestTimer = Math.min(game.kickoffContestTimer ?? 0, 0.9);
      } else {
        game.ballVel.set(0, 0, 0);
      }
    } else {
      game.kickoffScriptTimer = 0;
    }
  }

  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 + FOOTBALL_BALL_RADIUS * 0.7;
  const keepers = game.players.filter((p) => p.role === "keeper");
  for (let i = 0; i < keepers.length; i += 1) {
    const keeper = keepers[i];
    const keeperGoalZ = -keeper.team * goalLine;
    const keeperLineZ = keeperGoalZ + keeper.team * 0.72;
    const ballToKeeper = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z);
    const ballNearGoalMouth = (keeper.team * (game.ball.position.z - keeperGoalZ)) > -4.4 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.86;
    const ballLooseInBox = ballNearGoalMouth && game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT && ballToKeeper < 2.35;
    if (ballLooseInBox && game.ballVel.length() < 4.1 && keeper.saveCooldown <= 0.18) {
      const emergencyClearX = THREE.MathUtils.clamp(
        (game.ball.position.x - keeper.runner.root.position.x) * 1.8 + (Math.random() < 0.5 ? -1 : 1) * (3.8 + Math.random() * 3.2),
        -FOOTBALL_FIELD_HALF_WIDTH * 0.92,
        FOOTBALL_FIELD_HALF_WIDTH * 0.92
      );
      const emergencyClearZ = keeper.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.6 + Math.random() * 0.24));
      const clearDx = emergencyClearX - game.ball.position.x;
      const clearDz = emergencyClearZ - game.ball.position.z;
      const clearPower = 10.4 + Math.random() * 3.2;
      game.ball.position.z = keeperLineZ + keeper.team * 0.12;
      setFootballBallVelocity(game, clearDx, clearDz, clearPower, 1.55 + Math.random() * 0.85);
      registerBallTouch(game, keeper.team, keeper);
      keeper.kickCooldown = Math.max(keeper.kickCooldown ?? 0, 0.62);
      keeper.saveCooldown = 0.58;
      keeper.diveBlend = Math.max(keeper.diveBlend, 0.18);
      keeper.saveLift = Math.max(keeper.saveLift, 0.12);
      keeper.saveHeight = 0.3;
      continue;
    }
    const incoming = game.ballVel.z * keeper.team < -0.26;
    if (!incoming || Math.abs(game.ball.position.x) > goalHalfWidth + 1.24) continue;
    const planeTime = Math.abs(game.ballVel.z) > 0.001 ? (keeperLineZ - game.ball.position.z) / game.ballVel.z : Infinity;
    const predictedX = Number.isFinite(planeTime)
      ? game.ball.position.x + game.ballVel.x * THREE.MathUtils.clamp(planeTime, 0, 0.5)
      : game.ball.position.x;
    const predictedY = Number.isFinite(planeTime)
      ? game.ball.position.y + game.ballVel.y * THREE.MathUtils.clamp(planeTime, 0, 0.5) - 0.5 * FOOTBALL_BALL_GRAVITY * Math.pow(THREE.MathUtils.clamp(planeTime, 0, 0.5), 2)
      : game.ball.position.y;
    const closeEnough = Math.hypot(game.ball.position.x - keeper.runner.root.position.x, game.ball.position.z - keeper.runner.root.position.z) < 1.48 * ARCADE_KEEPER_NERF;
    const cutsLane = planeTime > 0 && planeTime < 0.52 && Math.abs(predictedX - keeper.runner.root.position.x) < 1.36 * ARCADE_KEEPER_NERF;
    if ((closeEnough || cutsLane) && predictedY <= FOOTBALL_GOAL_HEIGHT * 0.92 && keeper.saveCooldown <= 0) {
      const deflectX = THREE.MathUtils.clamp((game.ball.position.x - keeper.runner.root.position.x) * 1.6 + (Math.random() - 0.5) * 0.7, -2.4, 2.4);
      const deflectZ = keeper.team * (2.8 + Math.random() * 0.9);
      const deflectLen = Math.max(0.001, Math.hypot(deflectX, deflectZ));
      const deflectPower = 3.2 + Math.min(1.35, game.ballVel.length() * 0.42);
      game.ball.position.z = keeperLineZ + keeper.team * 0.08;
      setFootballBallVelocity(game, deflectX, deflectZ, deflectPower, 1.25 + Math.random() * 0.55);
      keeper.saveCooldown = 0.82;
      keeper.diveDir = Math.sign(predictedX - keeper.runner.root.position.x || game.ball.position.x - keeper.runner.root.position.x || 1);
      keeper.diveBlend = 1;
      keeper.saveLift = 0.42;
      keeper.saveHeight = THREE.MathUtils.clamp(predictedY / Math.max(0.001, FOOTBALL_GOAL_HEIGHT), 0.08, 1);
    }
  }
  let scoredTeam = 0;
  if (Math.abs(game.ball.position.x) <= goalHalfWidth && game.ball.position.y <= FOOTBALL_GOAL_HEIGHT) {
    if (game.ball.position.z >= goalLine) {
      game.redScore += 1;
      scoredTeam = 1;
    } else if (game.ball.position.z <= -goalLine) {
      game.blueScore += 1;
      scoredTeam = -1;
    }
  }
  if (scoredTeam !== 0) {
    let scorer = game.lastTouchPlayer && game.lastTouchPlayer.team === scoredTeam ? game.lastTouchPlayer : null;
    if (!scorer) {
      let bestDist = Infinity;
      for (let i = 0; i < game.players.length; i += 1) {
        const p = game.players[i];
        if (p.team !== scoredTeam) continue;
        const dist = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
        if (dist < bestDist) {
          bestDist = dist;
          scorer = p;
        }
      }
    }
    if (scorer) scorer.goalsScored = (scorer.goalsScored ?? 0) + 1;
    updateScoreboard(game);
    startGoalCelebration(game, scoredTeam, scorer);
    return;
  }

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
  if ((game.goalmouthStallTimer ?? 0) > stallResolveThreshold) {
    const defendingTeam = -nearestGoalSide;
    const emergencyDefender = game.players
      .filter((p) => p.team === defendingTeam)
      .map((p) => ({
        player: p,
        dist: Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z),
        priority: p.role === "keeper" ? 0 : p.role === "defender" ? 1 : 2
      }))
      .sort((a, b) => a.priority - b.priority || a.dist - b.dist)[0]?.player ?? null;
    if (emergencyDefender) {
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
  }

  if (!kickoffLocked && Math.abs(game.ball.position.x) > FOOTBALL_FIELD_HALF_WIDTH) {
    const restartX = Math.sign(game.ball.position.x || 1) * (FOOTBALL_FIELD_HALF_WIDTH - 0.48);
    const restartZ = THREE.MathUtils.clamp(game.ball.position.z, -FOOTBALL_FIELD_HALF_LENGTH + 1.2, FOOTBALL_FIELD_HALF_LENGTH - 1.2);
    queueFootballRestart(game, restartX, restartZ, 0.58);
  } else if (!kickoffLocked && Math.abs(game.ball.position.z) > FOOTBALL_FIELD_HALF_LENGTH) {
    const exitSide = Math.sign(game.ball.position.z || 1);
    const defendingTeam = -exitSide;
    const lastTouchByDefender = game.lastTouchTeam === defendingTeam;
    if (lastTouchByDefender) {
      const cornerX = Math.sign(game.ball.position.x || 1) * (FOOTBALL_FIELD_HALF_WIDTH - 0.42);
      const cornerZ = exitSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.42);
      queueFootballRestart(game, cornerX, cornerZ, 0.7);
    } else {
      const goalKickX = THREE.MathUtils.clamp(game.ball.position.x * 0.22, -2.2, 2.2);
      const goalKickZ = exitSide * (FOOTBALL_FIELD_HALF_LENGTH - 3.2);
      queueFootballRestart(game, goalKickX, goalKickZ, 0.7);
    }
  }

  const redPlayers = game.players.filter((p) => p.team === 1);
  const bluePlayers = game.players.filter((p) => p.team === -1);
  const teamPlayers = {
    1: redPlayers,
    [-1]: bluePlayers
  };
  const closestToBall = {
    1: null,
    [-1]: null
  };
  const closestDist = {
    1: Infinity,
    [-1]: Infinity
  };
  let closestAnyPlayer = null;
  let closestAnyDist = Infinity;

  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    const dist = Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z);
    if (dist < closestAnyDist) {
      closestAnyDist = dist;
      closestAnyPlayer = p;
    }
    if (dist < closestDist[p.team]) {
      closestDist[p.team] = dist;
      closestToBall[p.team] = p;
    }
  }

  let controllingTeam = 0;
  if (closestDist[1] + 0.18 < closestDist[-1]) controllingTeam = 1;
  if (closestDist[-1] + 0.18 < closestDist[1]) controllingTeam = -1;

  const ballHeightAboveGround = game.ball.position.y - FOOTBALL_BALL_RADIUS;
  const controllableBall = ballHeightAboveGround <= FOOTBALL_BALL_CONTROL_HEIGHT;
  let keeperPriorityHolder = null;
  if (controllableBall) {
    const keepersByDistance = game.players
      .filter((p) => p.role === "keeper")
      .map((p) => ({
        player: p,
        dist: Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z),
        goalZ: -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9)
      }))
      .sort((a, b) => a.dist - b.dist);
    const nearestKeeper = keepersByDistance[0] ?? null;
    if (nearestKeeper) {
      const keeperBoxDepth = (game.ball.position.z - nearestKeeper.goalZ) * nearestKeeper.player.team;
      const inKeeperClaimZone = keeperBoxDepth > -5.6
        && keeperBoxDepth < 1.8
        && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.04
        && nearestKeeper.dist < ATHLETE_BALL_REACH + 1.15;
      if (inKeeperClaimZone && game.ballVel.length() < 4.6) {
        keeperPriorityHolder = nearestKeeper.player;
        controllingTeam = nearestKeeper.player.team;
      }
    }
  }
  let ballHolder = controllableBall && controllingTeam !== 0 && closestToBall[controllingTeam] && closestDist[controllingTeam] < ATHLETE_BALL_REACH + 0.22
    ? closestToBall[controllingTeam]
    : null;
  if (keeperPriorityHolder) {
    ballHolder = keeperPriorityHolder;
  }
  const reservedPassTarget = game.deliveryType === "pass" && game.deliveryTimer > 0 ? game.deliveryTarget : null;
  if (reservedPassTarget && reservedPassTarget !== game.deliverySource) {
    const targetDist = Math.hypot(game.ball.position.x - reservedPassTarget.runner.root.position.x, game.ball.position.z - reservedPassTarget.runner.root.position.z);
    const nearestOpponentDist = closestDist[-reservedPassTarget.team];
    if (controllableBall && targetDist < ATHLETE_BALL_REACH + 0.44 && targetDist <= nearestOpponentDist + 0.36) {
      controllingTeam = reservedPassTarget.team;
      ballHolder = reservedPassTarget;
    }
  }
  if (!ballHolder && controllableBall && closestAnyPlayer && closestAnyDist < ATHLETE_BALL_REACH + 0.12) {
    controllingTeam = closestAnyPlayer.team;
    ballHolder = closestAnyPlayer;
  }
  const playableBall = ballHeightAboveGround <= FOOTBALL_BALL_VOLLEY_HEIGHT && (ballHeightAboveGround <= FOOTBALL_BALL_CONTROL_HEIGHT || game.ballVel.y <= 0.45);
  const activeBallPlayer = playableBall && (ballHolder ?? (closestAnyPlayer && closestAnyDist < ATHLETE_BALL_REACH + 0.12 ? closestAnyPlayer : null));
  const looseBallStuck = !kickoffLocked
    && !ballHolder
    && controllableBall
    && game.ballVel.length() < 0.55
    && closestAnyDist > ATHLETE_BALL_REACH + 0.46;
  if (looseBallStuck) {
    game.looseBallStallTimer = Math.min(2.4, (game.looseBallStallTimer ?? 0) + dt);
  } else {
    game.looseBallStallTimer = Math.max(0, (game.looseBallStallTimer ?? 0) - dt * 2.8);
  }
  let vibratingCluster = null;
  for (let i = 0; i < game.players.length; i += 1) {
    const anchor = game.players[i];
    if (anchor.role === "keeper") continue;
    const members = [];
    let sumX = 0;
    let sumZ = 0;
    let speedSum = 0;
    for (let j = 0; j < game.players.length; j += 1) {
      const p = game.players[j];
      if (p.role === "keeper") continue;
      const dist = Math.hypot(anchor.runner.root.position.x - p.runner.root.position.x, anchor.runner.root.position.z - p.runner.root.position.z);
      if (dist < 0.98) {
        members.push(p);
        sumX += p.runner.root.position.x;
        sumZ += p.runner.root.position.z;
        speedSum += Math.hypot(p.vx, p.vz);
      }
    }
    if (members.length >= 3) {
      const centerX = sumX / members.length;
      const centerZ = sumZ / members.length;
      const ballDist = Math.hypot(centerX - game.ball.position.x, centerZ - game.ball.position.z);
      const avgSpeed = speedSum / members.length;
      if (ballDist > 4.2 && avgSpeed < 0.6) {
        vibratingCluster = { members, centerX, centerZ };
        break;
      }
    }
  }
  if (vibratingCluster) {
    game.offBallClusterTimer = Math.min(1.4, (game.offBallClusterTimer ?? 0) + dt);
  } else {
    game.offBallClusterTimer = Math.max(0, (game.offBallClusterTimer ?? 0) - dt * 3.4);
  }
  if ((game.offBallClusterTimer ?? 0) > 0.16 && vibratingCluster) {
    for (let i = 0; i < vibratingCluster.members.length; i += 1) {
      const p = vibratingCluster.members[i];
      let pushX = p.runner.root.position.x - vibratingCluster.centerX;
      let pushZ = p.runner.root.position.z - vibratingCluster.centerZ;
      const pushLen = Math.hypot(pushX, pushZ);
      if (pushLen <= 0.001) {
        const angle = (i / Math.max(1, vibratingCluster.members.length)) * Math.PI * 2;
        pushX = Math.cos(angle);
        pushZ = Math.sin(angle);
      } else {
        pushX /= pushLen;
        pushZ /= pushLen;
      }
      p.runner.root.position.x += pushX * 0.2;
      p.runner.root.position.z += pushZ * 0.2;
      p.vx += pushX * 0.75;
      p.vz += pushZ * 0.75;
    }
    game.offBallClusterTimer = 0;
  }
  if ((game.looseBallStallTimer ?? 0) > 0.42 && closestAnyPlayer) {
    const rescuer = closestAnyPlayer;
    const rescueTargetX = THREE.MathUtils.clamp(game.ball.position.x - rescuer.team * 0.08, -FOOTBALL_FIELD_HALF_WIDTH + 0.6, FOOTBALL_FIELD_HALF_WIDTH - 0.6);
    const rescueTargetZ = THREE.MathUtils.clamp(game.ball.position.z - rescuer.team * 0.22, -FOOTBALL_FIELD_HALF_LENGTH + 0.6, FOOTBALL_FIELD_HALF_LENGTH - 0.6);
    rescuer.runner.root.position.x = THREE.MathUtils.lerp(rescuer.runner.root.position.x, rescueTargetX, 0.78);
    rescuer.runner.root.position.z = THREE.MathUtils.lerp(rescuer.runner.root.position.z, rescueTargetZ, 0.78);
    const escapeX = THREE.MathUtils.clamp(game.ball.position.x + rescuer.laneBias * 1.4 + (Math.random() - 0.5) * 1.6, -FOOTBALL_FIELD_HALF_WIDTH * 0.92, FOOTBALL_FIELD_HALF_WIDTH * 0.92);
    const escapeZ = rescuer.team * (FOOTBALL_FIELD_HALF_LENGTH * (0.52 + Math.random() * 0.18));
    const escapeDx = escapeX - game.ball.position.x;
    const escapeDz = escapeZ - game.ball.position.z;
    rescuer.kickSide = getFootballFootedness(rescuer, game.ball, escapeX).kickSide;
    applyFootballKickContact(rescuer, game.ball);
    setFootballBallVelocity(game, escapeDx, escapeDz, 6.6 + Math.random() * 2.2, 0.35 + Math.random() * 0.25);
    rescuer.kickCooldown = Math.max(rescuer.kickCooldown ?? 0, 0.42);
    triggerFootballKickPose(rescuer, game.ball, 0.92, escapeX);
    registerBallTouch(game, rescuer.team, rescuer);
    controllingTeam = rescuer.team;
    ballHolder = null;
    game.deliveryType = null;
    game.deliveryTeam = 0;
    game.deliveryTimer = 0;
    game.deliverySource = null;
    game.deliveryTarget = null;
    game.looseBallStallTimer = 0;
  }
  if (ballHolder !== game.ballHolder) {
    game.ballHolder = ballHolder;
    updateScoreboard(game);
  }

  if (controllingTeam !== game.attackingTeam) {
    game.attackingTeam = controllingTeam;
    updateScoreboard(game);
  }
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
  const ownGoalScramblePlayers = nearOwnGoalScramble
    ? teamPlayers[controllingTeam].filter((p) => Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z) < 1.28)
    : [];
  if (nearOwnGoalScramble && ownGoalScramblePlayers.length >= 2) {
    game.ownGoalScrambleTimer = Math.min(2.2, (game.ownGoalScrambleTimer ?? 0) + dt * (1.2 + ownGoalScramblePlayers.length * 0.35));
  } else {
    game.ownGoalScrambleTimer = Math.max(0, (game.ownGoalScrambleTimer ?? 0) - dt * 3.2);
  }
  if ((game.ownGoalScrambleTimer ?? 0) > 0.16) {
    const emergencyDefender = teamPlayers[controllingTeam]
      .map((p) => ({
        player: p,
        dist: Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z),
        priority: p.role === "keeper" ? 0 : p.role === "defender" ? 1 : 2
      }))
      .sort((a, b) => a.priority - b.priority || a.dist - b.dist)[0]?.player ?? null;
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
    if (controllingTeam !== 0) {
      const counterCandidates = teamPlayers[controllingTeam]
        .filter((mate) => mate.role === "attacker" && mate !== closestToBall[controllingTeam]);
      let bestCounter = null;
      let bestCounterScore = -Infinity;
      for (let i = 0; i < counterCandidates.length; i += 1) {
        const mate = counterCandidates[i];
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

  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    const teammates = teamPlayers[p.team];
    const opponents = teamPlayers[-p.team];
    const attackers = teammates.filter((mate) => mate.role === "attacker");
    const defenders = teammates.filter((mate) => mate.role === "defender");
    const teamLeader = closestToBall[p.team];
    const attackIndex = p.role === "attacker" ? Math.max(0, attackers.indexOf(p)) : -1;
    const defendIndex = p.role === "defender" ? Math.max(0, defenders.indexOf(p)) : -1;
    const attackGoalZ = p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
    const defendGoalZ = -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
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
    p.attackLane = "hold";
    p.kickCooldown = Math.max(0, p.kickCooldown - dt);
    p.kickBlend = Math.max(0, (p.kickBlend ?? 0) - dt * 6.4);
    p.bangerCooldown = Math.max(0, (p.bangerCooldown ?? 0) - dt);
    p.burstTimer = Math.max(0, (p.burstTimer ?? 0) - dt);
    p.burstCooldown = Math.max(0, (p.burstCooldown ?? 0) - dt);
    p.goalRunTimer = Math.max(0, (p.goalRunTimer ?? 0) - dt);
    p.goalRunCooldown = Math.max(0, (p.goalRunCooldown ?? 0) - dt);

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
      const cameraFade = THREE.MathUtils.clamp((44 - cameraDist) / 22, 0.3, 1);
      const holderBoost = game.ballHolder === p ? 1 : 0;
      const baseOpacity = 0.48 + 0.34 * nearBallFade;
      const labelOpacity = THREE.MathUtils.clamp((baseOpacity + holderBoost * 0.2) * cameraFade, 0, 1);
      p.nameTag.visible = labelOpacity > 0.08;
      p.nameTag.material.opacity = labelOpacity;
    }
    const roamX = p.home.x + p.roamX;
    const roamZ = p.home.z + p.roamZ;

    let targetX;
    let targetZ;
    let keeperShotOnGoal = false;
    if (kickoffContestActive && p.role !== "keeper") {
      const kickoffBiasTeam = game.restartTeam || 0;
      const isKickoffTaker = p.kickoffRole === "taker";
      const isKickoffSupport = p.kickoffRole === "support";
      const isKickoffPresser = p.kickoffRole === "press";
      if (isKickoffTaker || isKickoffPresser) {
        const pressBias = p.team === kickoffBiasTeam ? 1.04 : 0.98;
        const lateralOffset = 0;
        targetX = game.ball.position.x + lateralOffset;
        targetZ = game.ball.position.z - p.team * (isKickoffTaker ? 0.02 : 0.18);
        targetX = THREE.MathUtils.lerp(p.runner.root.position.x, targetX, 0.94);
        targetZ = THREE.MathUtils.lerp(p.runner.root.position.z, targetZ, 0.96);
        p.attackLane = isKickoffTaker
          ? "kickoffTouch"
          : "kickoffPress";
        p.vx = THREE.MathUtils.damp(p.vx, (targetX - p.runner.root.position.x) * pressBias * 2.05, 8.2, dt);
        p.vz = THREE.MathUtils.damp(p.vz, (targetZ - p.runner.root.position.z) * pressBias * 2.1, 8.4, dt);
      } else if (isKickoffSupport) {
        const supportSide = p.home.x === 0 ? -p.team : Math.sign(p.home.x);
        targetX = game.ball.position.x + supportSide * 1.15;
        targetZ = game.ball.position.z - p.team * 1.05;
        p.attackLane = "kickoffSupport";
      } else {
        targetX = THREE.MathUtils.lerp(p.home.x, game.ball.position.x * 0.22 + p.laneBias * 0.14, 0.34);
        targetZ = THREE.MathUtils.lerp(p.home.z, game.ball.position.z - p.team * 1.7, 0.3);
      }
    } else if (p.role === "keeper") {
      p.saveCooldown = Math.max(0, p.saveCooldown - dt);
      p.diveBlend = Math.max(0, p.diveBlend - dt * 2.6);
      p.saveLift = Math.max(0, p.saveLift - dt * (p.diveBlend > 0.08 ? 3.6 : 8.2));
      if (p.diveBlend <= 0.04 && p.saveLift < 0.035) {
        p.saveLift = 0;
      }
      const shotOnGoal = game.ballVel.z * p.team < -0.24 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.88;
      keeperShotOnGoal = shotOnGoal;
      const keeperLineZ = defendGoalZ + p.team * 0.72;
      const planeTime = Math.abs(game.ballVel.z) > 0.001 ? (keeperLineZ - game.ball.position.z) / game.ballVel.z : Infinity;
      const predictedSaveX = Number.isFinite(planeTime)
        ? game.ball.position.x + game.ballVel.x * THREE.MathUtils.clamp(planeTime, 0, 0.68)
        : game.ball.position.x;
      const keeperRushDepth = shotOnGoal
        ? 0.72 + Math.min(1.1, Math.max(0, (Math.abs(game.ball.position.z - defendGoalZ) - 0.8) * 0.14))
        : game.ball.position.y <= FOOTBALL_BALL_CONTROL_HEIGHT && ballDist < 3.2
          ? 0.52
          : 0;
      targetX = THREE.MathUtils.clamp((shotOnGoal ? predictedSaveX * 1.04 : game.ball.position.x * 0.54) + p.roamX * 0.04, -FOOTBALL_GOAL_WIDTH * 0.54, FOOTBALL_GOAL_WIDTH * 0.54);
      targetZ = shotOnGoal
        ? keeperLineZ - p.team * keeperRushDepth
        : defendGoalZ + THREE.MathUtils.clamp((game.ball.position.z - defendGoalZ) * 0.24, -0.36, 1.9);
    } else if (tacticalRole === "defender") {
      const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x);
      const isCentralDefender = Math.abs(p.home.x) < 0.5;
      const depthOffset = isCentralDefender ? 2.45 : 3.15;
      const baseLineZ = defendGoalZ + p.team * depthOffset;
      const ballHolderPressure = game.ballHolder && game.ballHolder.team !== p.team
        ? Math.hypot(game.ballHolder.runner.root.position.x - p.runner.root.position.x, game.ballHolder.runner.root.position.z - p.runner.root.position.z)
        : 99;
      const carrierAdvance = game.ballHolder && game.ballHolder.team !== p.team
        ? (game.ballHolder.runner.root.position.z * p.team)
        : (game.ball.position.z * p.team);
      const canStepOut = controllingTeam !== p.team
        && ownHalfBias > 0.08
        && (
          p === teamLeader
          || ballHolderPressure < (isCentralDefender ? 3.8 : 3.2) * FOOTBALL_BEHAVIOR.defenderStepRangeScale
          || ballDist < (isCentralDefender ? 3.4 : 2.9) * FOOTBALL_BEHAVIOR.defenderStepRangeScale
          || ((p.tackleBias ?? 0) > 0.08 && carrierAdvance > -1.2)
        );
      if (canStepOut) {
        const carrier = game.ballHolder && game.ballHolder.team !== p.team ? game.ballHolder : null;
        const coverPassX = carrier
          ? THREE.MathUtils.lerp(game.ball.position.x, carrier.runner.root.position.x, 0.42)
          : game.ball.position.x;
        const coverPassZ = carrier
          ? THREE.MathUtils.lerp(game.ball.position.z, carrier.runner.root.position.z, 0.42)
          : game.ball.position.z;
        const challengeDepth = (isCentralDefender ? 0.12 : 0.06) * FOOTBALL_BEHAVIOR.defenderStepDepthScale;
        const stepAggression = (isCentralDefender ? 0.34 : 0.28) * FOOTBALL_BEHAVIOR.defenderCoverLerpScale;
        targetX = game.ball.position.x + p.laneBias * (isCentralDefender ? 0.03 : 0.07);
        targetX = THREE.MathUtils.lerp(targetX, coverPassX, carrier ? (0.42 + (p.tackleBias ?? 0) * 0.75) * FOOTBALL_BEHAVIOR.defenderCoverLerpScale : 0.12 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale);
        targetZ = game.ball.position.z - p.team * challengeDepth;
        targetZ = THREE.MathUtils.lerp(targetZ, coverPassZ - p.team * 0.08, carrier ? stepAggression + (p.tackleBias ?? 0) * 0.35 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale : 0.16 * FOOTBALL_BEHAVIOR.defenderCoverLerpScale);
        p.attackLane = carrier ? "press" : "step";
      } else if (p === teamLeader && ownHalfBias > 0.22) {
        targetX = game.ball.position.x + p.laneBias * (isCentralDefender ? 0.05 : 0.1);
        targetZ = game.ball.position.z - p.team * (isCentralDefender ? 0.48 : 0.36);
      } else {
        const channelX = isCentralDefender
          ? game.ball.position.x * 0.12
          : game.ball.position.x * 0.32 + laneSign * (1.55 + ownHalfBias * 0.42);
        const zoneX = THREE.MathUtils.lerp(p.home.x, channelX, isCentralDefender ? 0.26 : 0.36);
        const frontMarkZ = game.ball.position.z - p.team * (isCentralDefender ? 0.92 : 0.58);
        const zoneZ = THREE.MathUtils.lerp(baseLineZ, frontMarkZ, isCentralDefender ? 0.18 + ownHalfBias * 0.22 : 0.12 + ownHalfBias * 0.16);
        targetX = zoneX;
        targetZ = zoneZ;
      }
    } else if (tacticalRole === "supportAttack") {
      const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x || p.laneBias || 1);
      const isCentralDefender = Math.abs(p.home.x) < 0.5;
      const sameBallSide = laneSign !== 0 && ballSide !== 0 && laneSign === ballSide;
      const weakBallSide = laneSign !== 0 && ballSide !== 0 && laneSign !== ballSide;
      if (p === teamLeader && ballDist < 2.6) {
        p.attackLane = "press";
        targetX = game.ball.position.x;
        targetZ = game.ball.position.z;
      } else if (isCentralDefender) {
        p.attackLane = "link";
        const centralAttackX = THREE.MathUtils.clamp(game.ball.position.x * 0.22 + p.roamX * 0.16, -2.8, 2.8);
        const centralAttackZ = game.ball.position.z + p.team * (1.35 - ownHalfBias * 0.45);
        targetX = THREE.MathUtils.lerp(roamX, centralAttackX, 0.78);
        targetZ = THREE.MathUtils.clamp(centralAttackZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.35, FOOTBALL_FIELD_HALF_LENGTH - 1.0);
      } else {
        const overlapRun = sameBallSide || (ballSide === 0 && defendIndex === 0);
        const underlapRun = weakBallSide || (ballSide === 0 && defendIndex !== 0);
        p.attackLane = overlapRun ? "overlap" : underlapRun ? "underlap" : "support";
        const laneAnchorX = overlapRun
          ? laneSign * (FOOTBALL_FIELD_HALF_WIDTH - 0.95)
          : underlapRun
            ? laneSign * (FOOTBALL_FIELD_HALF_WIDTH * 0.34)
            : laneSign * (FOOTBALL_FIELD_HALF_WIDTH - 1.35);
        const laneDriftX = overlapRun
          ? game.ball.position.x * 0.2
          : underlapRun
            ? game.ball.position.x * 0.32
            : game.ball.position.x * 0.14;
        const laneDepth = overlapRun
          ? 4.05 + p.pressBias * 0.34
          : underlapRun
            ? 2.45 + p.pressBias * 0.24
            : 3 + p.pressBias * 0.24;
        const laneInsideNudge = underlapRun ? -laneSign * 0.95 : laneSign * 0.1;
        const runX = THREE.MathUtils.clamp(laneAnchorX + laneDriftX + laneInsideNudge + p.roamX * 0.12, -FOOTBALL_FIELD_HALF_WIDTH + 0.9, FOOTBALL_FIELD_HALF_WIDTH - 0.9);
        const runZ = THREE.MathUtils.clamp(game.ball.position.z + p.team * laneDepth, -FOOTBALL_FIELD_HALF_LENGTH + 0.9, FOOTBALL_FIELD_HALF_LENGTH - 0.3);
        targetX = THREE.MathUtils.lerp(roamX, runX, overlapRun ? 0.91 : underlapRun ? 0.87 : 0.82);
        targetZ = runZ;
      }
    } else if (tacticalRole === "recoverDefence") {
      const recoverLane = p.home.x === 0 ? Math.sign(p.laneBias || 1) : Math.sign(p.home.x);
      if (p === teamLeader && ballDist < 3.8) {
        targetX = game.ball.position.x + p.laneBias * 0.08;
        targetZ = game.ball.position.z - p.team * 0.16;
      } else {
        const recoverX = THREE.MathUtils.lerp(p.home.x * 0.62, game.ball.position.x * 0.28 + recoverLane * 0.85, 0.54);
        const recoverZ = THREE.MathUtils.lerp(p.home.z - p.team * 1.05, game.ball.position.z - p.team * 1.05, 0.4 + ownHalfBias * 0.18);
        targetX = recoverX;
        targetZ = recoverZ;
      }
    } else {
      const laneSign = p.home.x === 0 ? 0 : Math.sign(p.home.x);
      if (controllingTeam === p.team) {
        if (p === teamLeader) {
          targetX = game.ball.position.x;
          targetZ = game.ball.position.z;
        } else if (isCounterRunner) {
          const counterLane = laneSign === 0 ? Math.sign(p.laneBias || 1) : laneSign;
          const counterX = THREE.MathUtils.clamp(counterLane * (FOOTBALL_FIELD_HALF_WIDTH - 1.1), -FOOTBALL_FIELD_HALF_WIDTH + 0.95, FOOTBALL_FIELD_HALF_WIDTH - 0.95);
          const counterZ = THREE.MathUtils.clamp(game.ball.position.z + p.team * (3.8 + Math.max(0, attackIndex) * 0.45), -FOOTBALL_FIELD_HALF_LENGTH + 1.1, FOOTBALL_FIELD_HALF_LENGTH - 0.7);
          targetX = THREE.MathUtils.lerp(roamX, counterX, 0.9);
          targetZ = counterZ;
        } else {
          const isCentralAttacker = Math.abs(p.home.x) < 0.5;
          const finalThirdBias = THREE.MathUtils.clamp((ballProgress + 0.9) / 7.2, 0, 1);
          const deepBuildBias = THREE.MathUtils.clamp(((-game.ball.position.z * p.team) - (FOOTBALL_FIELD_HALF_LENGTH - 7.4)) / 2.9, 0, 1.25);
          const farPostRunner = !isCentralAttacker && (ballSide === 0 ? attackIndex === attackers.length - 1 : laneSign === -ballSide);
          const hungryAttacker = baseShotHunger > 1.08;
          const supportRole = attackerProfile === "poacher"
            ? "poach"
            : attackerProfile === "runner"
              ? (farPostRunner ? "farPost" : "poach")
              : attackerProfile === "playmaker"
                ? "boxEdge"
                : isCentralAttacker
                  ? "poach"
                  : farPostRunner
                    ? "farPost"
                    : hungryAttacker && attackIndex === 0
                      ? "poach"
                      : "boxEdge";
          p.attackLane = supportRole;
          const farPostX = ballSide === 0
            ? laneSign * 1.7
            : -ballSide * Math.min(FOOTBALL_GOAL_WIDTH * 0.7 + 0.55, 2.2);
          const edgeChannelX = laneSign * (ballSide !== 0 && laneSign === ballSide ? FOOTBALL_FIELD_HALF_WIDTH * 0.24 : FOOTBALL_FIELD_HALF_WIDTH * 0.18);
          const profileDriftX = attackerProfile === "playmaker" ? -laneSign * 0.56 : attackerProfile === "runner" ? laneSign * 0.28 : 0;
          const boxLaneX = supportRole === "poach"
            ? THREE.MathUtils.clamp(game.ball.position.x * 0.14 + p.roamX * 0.18, -1.6, 1.6)
            : supportRole === "farPost"
              ? farPostX + p.roamX * 0.12 + profileDriftX * 0.3
              : edgeChannelX + profileDriftX + game.ball.position.x * (attackerProfile === "playmaker" ? 0.16 : 0.08) + p.roamX * 0.18;
          const supportX = THREE.MathUtils.clamp(
            THREE.MathUtils.lerp(p.home.x * 0.78, boxLaneX, supportRole === "boxEdge" ? 0.7 : 0.8),
            -FOOTBALL_FIELD_HALF_WIDTH + 1.05,
            FOOTBALL_FIELD_HALF_WIDTH - 1.05
          );
          const poachDepth = supportRole === "poach"
            ? 1.3 + finalThirdBias * (1.05 + baseShotHunger * 0.16)
            : supportRole === "farPost"
              ? 1.05 + finalThirdBias * 0.95
              : 3.05 + finalThirdBias * (0.72 - Math.min(0.16, (baseShotHunger - 0.8) * 0.18));
          const receiveZ = game.ball.position.z + p.team * (supportRole === "boxEdge"
            ? (attackerProfile === "playmaker" ? 1.15 : 1.85) + p.pressBias * 0.16
            : (attackerProfile === "runner" ? 2.95 : 2.3) + attackIndex * 0.22 + p.pressBias * 0.22);
          const goalHangZ = attackGoalZ - p.team * poachDepth;
          const supportZ = supportRole === "boxEdge"
            ? THREE.MathUtils.lerp(receiveZ, attackGoalZ - p.team * (3.45 - finalThirdBias * 0.45), 0.46 + finalThirdBias * 0.16)
            : THREE.MathUtils.lerp(receiveZ, goalHangZ, supportRole === "farPost" ? 0.7 + finalThirdBias * 0.16 : 0.58 + finalThirdBias * 0.24);
          targetX = THREE.MathUtils.lerp(roamX, supportX + laneSign * (supportRole === "boxEdge" ? 0.08 : 0), supportRole === "boxEdge" ? 0.84 : 0.9);
          targetZ = THREE.MathUtils.clamp(supportZ, -FOOTBALL_FIELD_HALF_LENGTH + 1.25, FOOTBALL_FIELD_HALF_LENGTH - 0.62);
          if (p.goalRunTimer > 0) {
            p.attackLane = "breakRun";
            const runBlend = THREE.MathUtils.clamp(0.56 + p.goalRunTimer * 0.22, 0.56, 0.94);
            targetX = THREE.MathUtils.lerp(targetX, p.goalRunTargetX ?? targetX, runBlend * 0.9);
            targetZ = THREE.MathUtils.lerp(targetZ, p.goalRunTargetZ ?? targetZ, runBlend);
          }
          if (deepBuildBias > 0.01) {
            const escapeLaneSign = laneSign === 0 ? Math.sign((p.runner.root.position.x - game.ball.position.x) || p.laneBias || 1) : laneSign;
            const outletX = THREE.MathUtils.clamp(
              THREE.MathUtils.lerp(targetX, escapeLaneSign * (isCentralAttacker ? 1.15 : FOOTBALL_FIELD_HALF_WIDTH - 1.25), 0.28 + deepBuildBias * 0.14),
              -FOOTBALL_FIELD_HALF_WIDTH + 0.95,
              FOOTBALL_FIELD_HALF_WIDTH - 0.95
            );
            const outletZ = THREE.MathUtils.clamp(
              game.ball.position.z + p.team * (4.7 + attackIndex * 0.38 + (attackerProfile === "runner" ? 1.1 : 0.45) + deepBuildBias * 1.25),
              -FOOTBALL_FIELD_HALF_LENGTH + 1.15,
              FOOTBALL_FIELD_HALF_LENGTH - 0.7
            );
            targetX = THREE.MathUtils.lerp(targetX, outletX, 0.36 + deepBuildBias * 0.16);
            targetZ = Math.max(targetZ * p.team, outletZ * p.team) * p.team;
            if (p.goalRunTimer <= 0.05) {
              p.attackLane = attackerProfile === "playmaker" ? "link" : "breakRun";
            }
          }
        }
      } else if ((p === teamLeader && ballDist < (trapPress ? 5.2 : 3.35)) || (trapPress && p.role === "attacker" && ballDist < 4.1)) {
        targetX = game.ball.position.x + p.laneBias * (trapPress ? 0.14 : 0.08);
        targetZ = game.ball.position.z - p.team * (trapPress ? 0.18 : 0.24);
      } else if (trapPress) {
        const pressLane = laneSign === 0 ? Math.sign(p.laneBias || 1) : laneSign;
        const pressWidth = p.role === "attacker" ? 0.3 : 0.56;
        const pressDepth = p.role === "attacker" ? 0.3 : 0.82 + Math.max(0, attackIndex) * 0.12;
        const trapX = THREE.MathUtils.lerp(p.home.x * 0.46, game.ball.position.x * 0.58 + pressLane * pressWidth, 0.62);
        const trapZ = THREE.MathUtils.lerp(roamZ, game.ball.position.z - p.team * pressDepth, 0.42 + stallUrgency * 0.12);
        targetX = trapX;
        targetZ = trapZ;
      } else {
        const coverX = THREE.MathUtils.lerp(p.home.x, game.ball.position.x * 0.34 + laneSign * 1.12, 0.48);
        const coverZ = THREE.MathUtils.lerp(roamZ, game.ball.position.z - p.team * (1.05 + Math.max(0, attackIndex) * 0.18), 0.24 + ownHalfBias * 0.1);
        targetX = coverX;
        targetZ = coverZ;
      }
    }

    if (isDeliveryTarget) {
      const receiveLead = 0.18 + Math.min(0.16, game.deliveryTimer * 0.2);
      const receiveX = THREE.MathUtils.clamp(game.ball.position.x + game.ballVel.x * receiveLead, -FOOTBALL_FIELD_HALF_WIDTH + 0.7, FOOTBALL_FIELD_HALF_WIDTH - 0.7);
      const receiveZ = THREE.MathUtils.clamp(game.ball.position.z + game.ballVel.z * receiveLead, -FOOTBALL_FIELD_HALF_LENGTH + 0.7, FOOTBALL_FIELD_HALF_LENGTH - 0.45);
      targetX = THREE.MathUtils.lerp(targetX, receiveX, 0.88);
      targetZ = THREE.MathUtils.lerp(targetZ, receiveZ, 0.9);
    }

    if (shapeLiftBias > 0.01 && p.role !== "keeper") {
      const roleLift = tacticalRole === "attacker"
        ? 2.2
        : tacticalRole === "supportAttack"
          ? 1.65
          : p.role === "defender"
            ? 1.05
            : 1.3;
      const laneStretch = p.role === "attacker" ? Math.abs(p.home.x) * 0.08 : 0;
      const liftedTargetZ = THREE.MathUtils.clamp(
        targetZ + p.team * (roleLift + laneStretch) * shapeLiftBias,
        -FOOTBALL_FIELD_HALF_LENGTH + 0.95,
        FOOTBALL_FIELD_HALF_LENGTH - 0.65
      );
      targetZ = Math.max(targetZ * p.team, liftedTargetZ * p.team) * p.team;
    }


    const dirX = targetX - p.runner.root.position.x;
    const dirZ = targetZ - p.runner.root.position.z;
    const dirLen = Math.max(0.001, Math.hypot(dirX, dirZ));
    const keeperSpeedBoost = p.role === "keeper"
      ? (keeperShotOnGoal ? 0.44 : ballDist < 3.6 ? 0.24 : 0)
      : 0;
    const baseSpeed = p.role === "keeper" ? 1.72 + (p.saveReach ?? 0) * 0.26 + keeperSpeedBoost : isCounterRunner ? 1.72 : tacticalRole === "supportAttack" ? 1.48 : tacticalRole === "recoverDefence" ? 1.46 : p.role === "defender" ? 1.38 + FOOTBALL_BEHAVIOR.defenderSpeedBonus : 1.56;
    const burst = isCounterRunner ? 1.08 : (tacticalRole === "attacker" || tacticalRole === "supportAttack") && ballDist < 2.4 ? 1 : ballDist < 2.5 ? 0.72 : 0.2;
    const tempoPulse = 1
      + Math.sin(game.phase * (1.2 + (p.tempoRate ?? 1) * 0.45) + (p.tempoPhase ?? 0)) * 0.09 * (p.tempoJitter ?? 1)
      + Math.sin(game.phase * (2.1 + (p.tempoRate ?? 1) * 0.3) + (p.tempoPhase ?? 0) * 1.7) * 0.04;
    const burstPulse = p.burstTimer > 0 ? (p.burstBoost ?? 0) * THREE.MathUtils.clamp(p.burstTimer / 0.85, 0, 1) : 0;
    const runSprintBoost = p.goalRunTimer > 0 ? 0.18 + Math.min(0.16, p.goalRunTimer * 0.12) : 0;
    const speedPulse = THREE.MathUtils.clamp(tempoPulse + burstPulse + runSprintBoost + (isCounterRunner ? 0.06 : 0), 0.78, 1.48);
    const desiredSpeed = (baseSpeed + burst * p.pressBias + urgencyRunBias) * p.speedBias * speedPulse;
    const desiredVx = (dirX / dirLen) * desiredSpeed;
    const desiredVz = (dirZ / dirLen) * desiredSpeed;

    const movementDamp = p.role === "keeper" ? (keeperShotOnGoal ? 11.5 : 9.6) : 8;
    p.vx = THREE.MathUtils.damp(p.vx, desiredVx, movementDamp, dt);
    p.vz = THREE.MathUtils.damp(p.vz, desiredVz, movementDamp, dt);

    for (let j = 0; j < game.players.length; j += 1) {
      if (i === j) continue;
      const other = game.players[j];
      const sx = p.runner.root.position.x - other.runner.root.position.x;
      const sz = p.runner.root.position.z - other.runner.root.position.z;
      const sd = Math.hypot(sx, sz);
      if (sd < FOOTBALL_PERSON_RADIUS * 2.0) {
        const safeSd = sd > 0.001 ? sd : 1;
        const sxNorm = sd > 0.001 ? sx / safeSd : Math.cos((i * 1.37 + j * 2.11) % (Math.PI * 2));
        const szNorm = sd > 0.001 ? sz / safeSd : Math.sin((i * 1.37 + j * 2.11) % (Math.PI * 2));
        const sameTeam = p.team === other.team ? 1.1 : 0.72;
        const push = (FOOTBALL_PERSON_RADIUS * 2.0 - Math.min(sd, FOOTBALL_PERSON_RADIUS * 1.98)) * 2.7 * sameTeam;
        p.vx += sxNorm * push * dt;
        p.vz += szNorm * push * dt;
      }
    }

    p.runner.root.position.x += p.vx * dt;
    p.runner.root.position.z += p.vz * dt;

    p.runner.root.position.x = THREE.MathUtils.clamp(p.runner.root.position.x, -FOOTBALL_FIELD_HALF_WIDTH + 0.4, FOOTBALL_FIELD_HALF_WIDTH - 0.4);
    p.runner.root.position.z = THREE.MathUtils.clamp(p.runner.root.position.z, -FOOTBALL_FIELD_HALF_LENGTH + 0.4, FOOTBALL_FIELD_HALF_LENGTH - 0.4);

    const moveSpeed = Math.hypot(p.vx, p.vz);
    let movementPose = { kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: p.sprintBlend ?? 0 };
    if (p.role === "keeper" && p.diveBlend <= 0) {
      const keeperLookX = game.ball.position.x - p.runner.root.position.x;
      const keeperLookZ = game.ball.position.z - p.runner.root.position.z;
      const keeperFacing = Math.atan2(keeperLookX, keeperLookZ);
      p.runner.root.rotation.y = THREE.MathUtils.lerp(p.runner.root.rotation.y, keeperFacing, THREE.MathUtils.clamp(dt * 7.5, 0, 1));
      const rightX = Math.cos(p.runner.root.rotation.y);
      const rightZ = -Math.sin(p.runner.root.rotation.y);
      const lateralSpeed = p.vx * rightX + p.vz * rightZ;
      const forwardSpeed = p.vx * Math.sin(p.runner.root.rotation.y) + p.vz * Math.cos(p.runner.root.rotation.y);
      const saveFocus = THREE.MathUtils.clamp((Math.abs(game.ball.position.z - targetZ) - 0.4) / 2.8, 0, 1);
      const keeperReadyAmount = THREE.MathUtils.clamp(
        (keeperShotOnGoal ? 0.85 : 0.35 + saveFocus * 0.45) * (1 - THREE.MathUtils.clamp(moveSpeed / 1.35, 0, 1)),
        0,
        1
      );
      const sideStepAmount = Math.abs(lateralSpeed) > Math.abs(forwardSpeed) + 0.04
        ? THREE.MathUtils.clamp(Math.abs(lateralSpeed) / 1.05, 0, 1)
        : 0;
      movementPose = {
        ...movementPose,
        keeperSetAmount: keeperReadyAmount,
        keeperSetDir: Math.sign((game.ball.position.x - p.runner.root.position.x) || lateralSpeed || 1)
      };
      if (sideStepAmount > 0.02) {
        movementPose.type = "sideStep";
        movementPose.amount = sideStepAmount;
        movementPose.dir = Math.sign(lateralSpeed || 1);
      }
    } else if (moveSpeed > 0.05) {
      p.runner.root.rotation.y = Math.atan2(p.vx, p.vz);
    }
    const sprintTarget = THREE.MathUtils.clamp((moveSpeed - (p.role === "keeper" ? 1.28 : 1.62)) / 0.9, 0, 1)
      + (p.goalRunTimer > 0 ? 0.42 : 0)
      + (p.burstTimer > 0 ? 0.2 : 0);
    p.sprintBlend = THREE.MathUtils.damp(p.sprintBlend ?? 0, THREE.MathUtils.clamp(sprintTarget, 0, 1), 6.5, dt);
    movementPose.sprintAmount = p.sprintBlend ?? 0;
    p.cycle += dt * (4.8 + moveSpeed * 2.8);
    animateRunner(
      p.runner,
      moveSpeed,
      p.cycle,
      p.role === "keeper" && p.diveBlend > 0.04 ? p.saveLift : 0,
      p.role === "keeper" && p.diveBlend > 0
        ? { type: "keeperDive", amount: p.diveBlend, dir: p.diveDir, saveHeight: p.saveHeight ?? 0.45, kickAmount: p.kickBlend ?? 0, kickSide: p.kickSide ?? 1, sprintAmount: p.sprintBlend ?? 0 }
        : movementPose
    );

    const touchReach = ATHLETE_BALL_REACH + (isDeliveryTarget ? 0.18 : 0);
    if (activeBallPlayer === p && ballDist < touchReach && p.kickCooldown <= 0 && !kickoffLocked) {
      if (p.role === "keeper") {
        const keeperOwnGoalZ = -p.team * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
        const keeperBoxDepth = (game.ball.position.z - keeperOwnGoalZ) * p.team;
        const keeperEmergencyClear = keeperBoxDepth > -5.2
          && keeperBoxDepth < 1.25
          && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 0.9;
        if (keeperEmergencyClear) {
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
          continue;
        }
      }
      const passOption = findBestPassTarget(p, teammates, opponents);
      const crossOption = findBestCrossTarget(p, teammates, opponents, attackGoalZ);
      const keeper = opponents.find((opp) => opp.role === "keeper") ?? null;
      const farPostX = keeper
        ? (game.ball.position.x <= keeper.runner.root.position.x ? FOOTBALL_GOAL_WIDTH * 0.41 : -FOOTBALL_GOAL_WIDTH * 0.41)
        : THREE.MathUtils.clamp(-game.ball.position.x * 0.28, -FOOTBALL_GOAL_WIDTH * 0.4, FOOTBALL_GOAL_WIDTH * 0.4);
      const goalX = THREE.MathUtils.clamp(
        THREE.MathUtils.lerp(-game.ball.position.x * 0.06, farPostX, Math.abs(game.ball.position.x) > 1.2 ? 0.82 : 0.68),
        -FOOTBALL_GOAL_WIDTH * 0.46,
        FOOTBALL_GOAL_WIDTH * 0.46
      );
      const shotDx = goalX - game.ball.position.x;
      const shotDz = attackGoalZ - game.ball.position.z;
      const shotDist = Math.hypot(shotDx, shotDz);
      const goalDistance = (attackGoalZ - game.ball.position.z) * p.team;
      const wideCrossZone = Math.abs(game.ball.position.x) > FOOTBALL_GOAL_WIDTH * 0.9 && goalDistance < 5.8;
      let nearestPressure = 99;
      let shotLanePenalty = 0;
      let shotLaneNudge = 0;
      const shotBaseDist = Math.max(0.001, Math.hypot(shotDx, shotDz));
      for (let j = 0; j < opponents.length; j += 1) {
        const opp = opponents[j];
        nearestPressure = Math.min(nearestPressure, Math.hypot(opp.runner.root.position.x - p.runner.root.position.x, opp.runner.root.position.z - p.runner.root.position.z));
        if (opp.role === "keeper") continue;
        const toOppX = opp.runner.root.position.x - game.ball.position.x;
        const toOppZ = opp.runner.root.position.z - game.ball.position.z;
        const along = THREE.MathUtils.clamp((toOppX * shotDx + toOppZ * shotDz) / Math.max(0.001, shotBaseDist * shotBaseDist), 0, 1);
        const projX = game.ball.position.x + shotDx * along;
        const projZ = game.ball.position.z + shotDz * along;
        const laneDist = Math.hypot(opp.runner.root.position.x - projX, opp.runner.root.position.z - projZ);
        if (along > 0.24 && along < 0.82 && laneDist < 0.62) {
          const influence = (0.62 - laneDist) * (0.92 - Math.abs(along - 0.5) * 0.9);
          shotLanePenalty += influence * 1.12;
          shotLaneNudge += -Math.sign(opp.runner.root.position.x - game.ball.position.x || 1) * influence * 0.22;
        }
      }
      const dodgeGoalX = THREE.MathUtils.clamp(goalX + shotLaneNudge, -FOOTBALL_GOAL_WIDTH * 0.44, FOOTBALL_GOAL_WIDTH * 0.44);
      const dodgeShotDx = dodgeGoalX - game.ball.position.x;
      const dodgeShotDist = Math.hypot(dodgeShotDx, shotDz);

      const receivingCross = game.deliveryType === "cross"
        && game.deliveryTeam === p.team
        && game.deliveryTimer > 0
        && game.deliverySource !== p
        && (!game.deliveryTarget || game.deliveryTarget === p);
      const finishZone = goalDistance < 3.35 && Math.abs(game.ball.position.x) < FOOTBALL_GOAL_WIDTH * 1.08;
      const oneTouchFinish = receivingCross
        && finishZone
        && game.ballVel.length() > 1.55
        && (p.role === "attacker" || p.attackLane === "underlap" || p.attackLane === "link");
      const crossSide = Math.sign(game.ball.position.x || (game.deliverySource ? game.deliverySource.runner.root.position.x : 1));
      const receiverSide = Math.sign(p.runner.root.position.x || crossSide || 1);
      const backPostTapIn = oneTouchFinish && crossSide !== 0 && receiverSide === -crossSide && Math.abs(p.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.16;
      const nearPostTouch = oneTouchFinish && !backPostTapIn && crossSide !== 0 && receiverSide === crossSide && Math.abs(p.runner.root.position.x) > FOOTBALL_GOAL_WIDTH * 0.22;
      const volleyFinish = oneTouchFinish && !backPostTapIn && !nearPostTouch;
      const finishType = backPostTapIn ? "backPost" : nearPostTouch ? "nearPost" : volleyFinish ? "volley" : null;
      const isAttackMinded = tacticalRole === "attacker" || tacticalRole === "supportAttack" || isCounterRunner;
      const trappedNearOwnGoal = ownGoalDepth > FOOTBALL_FIELD_HALF_LENGTH - 6.1;
      const finalThirdUrgency = THREE.MathUtils.clamp((6.8 - goalDistance) / 4.6, 0, 1.35);
      const touchChainPressure = game.lastTouchTeam === p.team ? THREE.MathUtils.clamp((game.sameTeamTouchCount - 2) / 3.2, 0, 1.35) : 0;
      const ownThirdLoopPressure = trappedNearOwnGoal && game.lastTouchTeam === p.team
        ? THREE.MathUtils.clamp((game.sameTeamTouchCount - 2) / 2.1, 0, 1.7)
        : 0;
      const playmakerBias = attackerProfile === "playmaker" ? 0.24 : attackerProfile === "runner" ? -0.08 : attackerProfile === "poacher" ? -0.16 : 0;
      const dribbleTraitBias = p.trait === "dribble" ? THREE.MathUtils.clamp((1.7 - nearestPressure) * 0.2, 0, 0.18) : 0;
      const shotHungerBias = isAttackMinded ? THREE.MathUtils.clamp(baseShotHunger + finalThirdUrgency * 0.22 + touchChainPressure * 0.12 + (isCounterRunner ? 0.16 : 0) - playmakerBias - dribbleTraitBias, 0.28, 1.95) : THREE.MathUtils.clamp(baseShotHunger, 0.18, 1.2);
      const longShotTraitBias = p.trait === "finish" ? 0.18 : p.trait === "dribble" ? -0.06 : 0;
      const longShotProfileBias = attackerProfile === "poacher" ? 0.12 : attackerProfile === "runner" ? 0.05 : attackerProfile === "playmaker" ? -0.14 : 0;
      const longShotBias = longShotTraitBias + longShotProfileBias + (p.shotPowerBias ?? 0) * 0.35 + (p.shotAccuracyBias ?? 0) * 0.22;
      const selfishFinisher = shotHungerBias > 1.08;
      const forceDirectPlay = isAttackMinded && (finalThirdUrgency > 0.52 || touchChainPressure > 0.45 || isCounterRunner || selfishFinisher && goalDistance < 6.4);
      const recyclePass = passOption && passOption.forward < 0.75 && passOption.dist < 5.4;
      const escapeMode = teamIsStalling || (trappedNearOwnGoal && (nearestPressure < 2.2 || game.ballVel.length() < 1.35));
      const hardEscapeMode = trappedNearOwnGoal && (
        nearestPressure < 2.8
        || game.ballVel.length() < 1.8
        || ownThirdLoopPressure > 0.12
        || (game.ownGoalScrambleTimer ?? 0) > 0.02
      );
      const forceExitOwnGoal = hardEscapeMode && (
        game.sameTeamTouchCount >= 2
        || ownThirdLoopPressure > 0.22
        || nearestPressure < 1.9
        || (game.ownGoalScrambleTimer ?? 0) > 0.08
      );
      const clearanceOption = (escapeMode || hardEscapeMode) ? findClearanceTarget(p, teammates, opponents) : null;
      const shouldClear = clearanceOption && (nearestPressure < 2.35 || game.stallTimer > 1.1 || shotLanePenalty > 0.52 || forceExitOwnGoal);
      const longShotWindow = !escapeMode
        && isAttackMinded
        && finishType === null
        && goalDistance > 7.4
        && goalDistance < 16.8 + Math.max(0, longShotBias) * 2.2
        && dodgeShotDist < 15.2 + Math.max(0, longShotBias) * 1.7
        && shotLanePenalty < 0.82 + Math.max(0, longShotBias) * 0.18
        && nearestPressure > 0.72 + Math.min(0.24, goalDistance * 0.018) - Math.max(0, longShotBias) * 0.22
        && shotHungerBias > 0.68 - Math.max(0, longShotBias) * 0.14;
      const baseShouldShoot = !escapeMode && (finishType !== null || longShotWindow || (isAttackMinded && shotLanePenalty < 1.18 + finalThirdUrgency * 0.3 + shotHungerBias * 0.16 && (dodgeShotDist < 4.45 + finalThirdUrgency * 1.95 + touchChainPressure * 0.95 + shotHungerBias * 0.9 || (dodgeShotDist < 6.7 + touchChainPressure * 0.6 + shotHungerBias * 0.5 && nearestPressure < 1.08 + finalThirdUrgency * 0.38 + shotHungerBias * 0.1) || (forceDirectPlay && goalDistance < 6.05 + shotHungerBias * 0.45 && shotLanePenalty < 1.46) || (selfishFinisher && goalDistance < 4.6 && shotLanePenalty < 1.58) || (isCounterRunner && dodgeShotDist < 7.4))));
      const shouldCross = !escapeMode && crossOption && isAttackMinded && wideCrossZone && (p.attackLane === "overlap" || Math.abs(game.ball.position.x) > FOOTBALL_GOAL_WIDTH * 1.15 || nearestPressure < 1.1) && (!baseShouldShoot || dodgeShotDist > 2.4);
      const longPassWindow = Boolean(passOption && !escapeMode && !shouldCross)
        && passOption.dist > FOOTBALL_BEHAVIOR.longPassDistMin
        && passOption.forward > FOOTBALL_BEHAVIOR.longPassForwardMin
        && passOption.score > FOOTBALL_BEHAVIOR.longPassScoreMin;
      const mustBreakOwnThirdLoop = ownThirdLoopPressure > 0.28;
      const throughRunPass = Boolean(passOption && passOption.throughRun && !escapeMode && !shouldCross)
        && (passOption.score > 4.15 || passOption.forcedForward || longPassWindow)
        && (goalDistance > 3.1 || finishType === null)
        && (!baseShouldShoot || dodgeShotDist > 3.6 || nearestPressure < 1.2 || shotLanePenalty > 0.62);
      const shouldShoot = baseShouldShoot && !throughRunPass;
      const shouldPass = passOption && (
        throughRunPass || longPassWindow || (
          !shouldClear
          && !longShotWindow
          && (escapeMode || (
            finishType === null
            && !shouldCross
            && (!isAttackMinded
              || passOption.progressive
              || passOption.goalGain > 0.65
              || passOption.dist > FOOTBALL_BEHAVIOR.passDistanceTriggerBase - Math.min(FOOTBALL_BEHAVIOR.passDistanceTriggerVariance, (shotHungerBias - 0.75) * 0.5)
              || dodgeShotDist > 5.15 + Math.min(0.65, shotHungerBias * 0.35)
              || nearestPressure < 1.14 - Math.min(0.12, (shotHungerBias - 0.7) * 0.08)
              || passOption.forward > (forceDirectPlay ? 1.05 + shotHungerBias * 0.1 : 0.28 + Math.min(0.3, shotHungerBias * 0.08))
              || passOption.targetDepth > FOOTBALL_FIELD_HALF_LENGTH - (5.15 + shotHungerBias * 0.55)
              || passOption.score > FOOTBALL_BEHAVIOR.passScoreBase + finalThirdUrgency * 0.4 + Math.max(0, shotHungerBias - 1.05) * 0.9 + (attackerProfile === "playmaker" ? 0.95 : 0) - Math.min(0.45, passOption.dist * FOOTBALL_BEHAVIOR.passScoreDistanceDiscount)
              || shotLanePenalty > 1.02 + shotHungerBias * 0.08)
          ))
          && !(forceDirectPlay && recyclePass && !passOption.progressive && passOption.score < 5.85 + shotHungerBias * 0.35 - (attackerProfile === "playmaker" ? 0.5 : 0))
          && !(selfishFinisher && goalDistance < 5.35 && recyclePass && passOption.forward < 1.2 && !passOption.progressive)
        )
      );
      const safeEscapePass = Boolean(passOption)
        && hardEscapeMode
        && passOption.progressive
        && passOption.forward > 1.55
        && (passOption.throughRun || passOption.dist > 5.8 || passOption.player?.role === "attacker");
      const forceVerticalPass = shouldPass && passOption && mustBreakOwnThirdLoop
        && !(throughRunPass || longPassWindow)
        && (
          !passOption.progressive
          || passOption.forward < 1.2
          || passOption.player?.role !== "attacker"
        );
      const finalShouldPass = forceExitOwnGoal ? safeEscapePass : (forceVerticalPass ? false : shouldPass);
      const finalShouldClear = forceExitOwnGoal
        ? !safeEscapePass && Boolean(clearanceOption)
        : shouldClear || (mustBreakOwnThirdLoop && !throughRunPass && !longPassWindow && (!passOption || forceVerticalPass));

      if (shouldCross) {
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
        const aimCrossLen = Math.max(0.001, Math.hypot(aimCrossDx, crossDz));
        const power = (3.25 + Math.min(2.4, crossLen * 0.31)) * crossWeakness;
        p.kickSide = crossFoot.kickSide;
        applyFootballKickContact(p, game.ball);
        setFootballBallVelocity(game, aimCrossDx, crossDz, power, 2 + Math.min(2.2, crossLen * 0.16) + Math.random() * 0.35);
        p.kickCooldown = 0.5 + Math.random() * 0.18;
        triggerFootballKickPose(p, game.ball, 0.88, boxAimX);
        registerBallTouch(game, p.team, p);
        game.deliveryType = "cross";
        game.deliveryTeam = p.team;
        game.deliveryTimer = 1.05;
        game.deliverySource = p;
        game.deliveryTarget = crossTarget;
      } else if (shouldShoot && (!shouldPass || longShotWindow || dodgeShotDist < 3.35)) {
        const finishGoalX = finishType === "backPost"
          ? THREE.MathUtils.clamp(-crossSide * FOOTBALL_GOAL_WIDTH * 0.34, -FOOTBALL_GOAL_WIDTH * 0.42, FOOTBALL_GOAL_WIDTH * 0.42)
          : finishType === "nearPost"
            ? THREE.MathUtils.clamp(crossSide * FOOTBALL_GOAL_WIDTH * 0.28, -FOOTBALL_GOAL_WIDTH * 0.36, FOOTBALL_GOAL_WIDTH * 0.36)
            : dodgeGoalX;
        const finishDx = (finishType === "volley" || finishType === null ? dodgeShotDx : finishGoalX - game.ball.position.x);
        const finishDz = shotDz;
        const len = Math.max(0.001, Math.hypot(finishDx, finishDz));
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
        if (missesTarget) {
          aimedFinishDx += (Math.random() < 0.5 ? -1 : 1) * (0.95 + Math.random() * (longShotWindow ? 2.2 : 1.15));
        }
        const aimedLen = Math.max(0.001, Math.hypot(aimedFinishDx, finishDz));
        p.kickSide = shotFoot.kickSide;
        applyFootballKickContact(p, game.ball);
        const shotLoft = finishType === "volley"
          ? 1.28 + Math.random() * 0.55
          : longShotWindow
            ? 1.45 + Math.min(1.95, Math.max(0, goalDistance - 6.1) * 0.22) + (highMiss ? 1.05 : 0.28) + (unleashBanger ? 0.34 : 0) + Math.random() * 0.34
            : missesTarget && highMiss
              ? 1.32 + Math.random() * 0.56
              : 0.18 + Math.max(0, goalDistance - 2.8) * 0.03;
        setFootballBallVelocity(game, aimedFinishDx, finishDz, power, shotLoft);
        if (unleashBanger) {
          p.bangerCooldown = 6.5 + Math.random() * 6.5;
        }
        p.kickCooldown = finishType !== null ? 0.42 + Math.random() * 0.1 : 0.68 + Math.random() * 0.24;
        triggerFootballKickPose(p, game.ball, finishType !== null ? 1.08 : 1, finishGoalX);
        registerBallTouch(game, p.team, p);
        game.deliveryType = null;
        game.deliveryTeam = 0;
        game.deliveryTimer = 0;
        game.deliverySource = null;
        game.deliveryTarget = null;
      } else if (finalShouldClear) {
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
      } else if (finalShouldPass) {
        const passTarget = passOption.player;
        const runLeadBias = passOption.throughRun ? THREE.MathUtils.clamp((passTarget.goalRunTimer ?? 0) / 1.8, 0, 1.2) : 0;
        const leadTime = (passOption.leadTime ?? 0.42) + (escapeMode ? 0.22 : 0.08) + Math.min(escapeMode ? 0.42 : 0.34, passOption.dist * (escapeMode ? 0.044 : 0.038)) + runLeadBias * (escapeMode ? 0.08 : 0.16);
        const runTargetX = passOption.throughRun ? (passTarget.goalRunTargetX ?? passTarget.runner.root.position.x) : passTarget.runner.root.position.x;
        const runTargetZ = passOption.throughRun ? (passTarget.goalRunTargetZ ?? passTarget.runner.root.position.z) : passTarget.runner.root.position.z;
        const leadX = passTarget.runner.root.position.x + passTarget.vx * leadTime + (runTargetX - passTarget.runner.root.position.x) * runLeadBias * 0.58;
        const leadZ = passTarget.runner.root.position.z + passTarget.vz * leadTime + p.team * (escapeMode ? 0.3 : 0.14) + (runTargetZ - passTarget.runner.root.position.z) * runLeadBias * 0.64;
        const passDx = leadX - game.ball.position.x;
        const passDz = leadZ - game.ball.position.z;
        const passLen = Math.max(0.001, Math.hypot(passDx, passDz));
        const passFoot = getFootballFootedness(p, game.ball, leadX);
        const passWeakness = passFoot.weakFoot ? 0.92 : 1;
        const passAimDx = passDx + THREE.MathUtils.clamp((p.passVision ?? 0) * Math.sign(passDx || p.team) * 0.18, -0.18, 0.18);
        const passAimLen = Math.max(0.001, Math.hypot(passAimDx, passDz));
        const longPassBonus = passLen > 6 ? FOOTBALL_BEHAVIOR.passPowerBonusBase + Math.min(0.6, (passLen - 6) * FOOTBALL_BEHAVIOR.passPowerBonusScale) : 0;
        const power = (hardEscapeMode ? 4.1 + Math.min(3.35, passLen * 0.4) : escapeMode ? 3.45 + Math.min(2.85, passLen * 0.36) : 2.7 + Math.min(2.45, passLen * 0.34) + (passOption.throughRun ? 0.28 + runLeadBias * 0.42 : 0) + longPassBonus) * passWeakness;
        p.kickSide = passFoot.kickSide;
        applyFootballKickContact(p, game.ball);
        const passLoft = hardEscapeMode
          ? 0.95 + Math.min(1.6, passLen * 0.09) + (passOption.throughRun ? 0.22 : 0)
          : passLen > 6.4 || passOption.throughRun
            ? 0.65 + Math.min(1.3, passLen * 0.08) + (passOption.throughRun ? 0.28 : 0)
          : 0.08 + Math.max(0, passLen - 3.4) * 0.04;
        setFootballBallVelocity(game, passAimDx, passDz, power, passLoft);
        p.kickCooldown = hardEscapeMode ? 0.44 + Math.random() * 0.16 : 0.52 + Math.random() * 0.24;
        triggerFootballKickPose(p, game.ball, 0.9 + (passOption.progressive ? 0.08 : 0) + (passOption.throughRun ? 0.1 : 0), leadX);
        registerBallTouch(game, p.team, p);
        game.deliveryType = "pass";
        game.deliveryTeam = p.team;
        game.deliveryTimer = 0.72 + Math.min(0.34, passLen * 0.045) + (passOption.throughRun ? 0.08 : 0);
        game.deliverySource = p;
        game.deliveryTarget = passTarget;
      } else {
        const driveX = hardEscapeMode
          ? THREE.MathUtils.clamp(p.laneBias * 0.38 + (Math.random() - 0.5) * 1.1, -2.8, 2.8)
          : escapeMode
            ? p.laneBias * 0.18 + (Math.random() - 0.5) * 0.48
          : p.laneBias * 0.12 + (Math.random() - 0.5) * 0.16;
        const driveZ = p.team * (hardEscapeMode ? 7.2 + Math.random() * 2.6 : escapeMode ? 4.7 + Math.random() * 1.7 : 2.15 + Math.random() * 1);
        const driveLen = Math.max(0.001, Math.hypot(driveX, driveZ));
        const power = hardEscapeMode ? 5.2 + Math.random() * 1.2 : escapeMode ? 3.85 + Math.random() * 0.95 : 2.25 + Math.random() * 0.72;
        p.kickSide = getFootballFootedness(p, game.ball, game.ball.position.x + driveX).kickSide;
        applyFootballKickContact(p, game.ball);
        const dribbleLoft = hardEscapeMode ? 0.38 + Math.random() * 0.28 : escapeMode ? 0.22 + Math.random() * 0.24 : 0.05 + Math.random() * 0.08;
        setFootballBallVelocity(game, driveX, driveZ, power, dribbleLoft);
        p.kickCooldown = hardEscapeMode ? 0.34 + Math.random() * 0.14 : 0.42 + Math.random() * 0.22;
        triggerFootballKickPose(p, game.ball, 0.86, game.ball.position.x + driveX);
        registerBallTouch(game, p.team, p);
        game.deliveryType = null;
        game.deliveryTeam = 0;
        game.deliveryTimer = 0;
        game.deliverySource = null;
        game.deliveryTarget = null;
      }
    }
  }

  resolvePeopleCollisions(game);
}

function resolveJukuCollisions(nextX, nextZ) {
  const result = { x: nextX, z: nextZ };
  if (!footballGame.colliders || footballGame.colliders.length === 0) return result;

  for (let pass = 0; pass < 4; pass += 1) {
    let moved = false;

    for (let i = 0; i < footballGame.colliders.length; i += 1) {
      const collider = footballGame.colliders[i];

      if (collider.type === "circle") {
        const minDist = collider.r + JUKU_COLLIDER_RADIUS;
        const dx = result.x - collider.x;
        const dz = result.z - collider.z;
        const distSq = dx * dx + dz * dz;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const nx = dist > 0.0001 ? dx / dist : 1;
          const nz = dist > 0.0001 ? dz / dist : 0;
          result.x = collider.x + nx * minDist;
          result.z = collider.z + nz * minDist;
          moved = true;
        }
        continue;
      }

      const sin = Math.sin(collider.yaw);
      const cos = Math.cos(collider.yaw);
      const relX = result.x - collider.x;
      const relZ = result.z - collider.z;
      let localX = relX * cos + relZ * sin;
      let localZ = -relX * sin + relZ * cos;
      const halfX = collider.halfX + JUKU_COLLIDER_RADIUS;
      const halfZ = collider.halfZ + JUKU_COLLIDER_RADIUS;

      if (Math.abs(localX) <= halfX && Math.abs(localZ) <= halfZ) {
        const penX = halfX - Math.abs(localX);
        const penZ = halfZ - Math.abs(localZ);
        if (penX < penZ) {
          localX = (localX >= 0 ? 1 : -1) * halfX;
        } else {
          localZ = (localZ >= 0 ? 1 : -1) * halfZ;
        }
        result.x = collider.x + localX * cos - localZ * sin;
        result.z = collider.z + localX * sin + localZ * cos;
        moved = true;
      }
    }    if (!moved) break;
  }

  return result;
}

function updateJuku(dt) {
  state.faceTime += dt;
  if (state.blinkTimer > 0) {
    state.blinkTimer = Math.max(0, state.blinkTimer - dt);
  } else {
    state.nextBlink -= dt;
    if (state.nextBlink <= 0) {
      state.blinkTimer = 0.16;
      state.nextBlink = 1.5 + Math.random() * 2.6;
    }
  }
  if (state.tongueActive) {
    state.tongueTimer = Math.max(0, state.tongueTimer - dt);
    if (state.tongueTimer <= 0) {
      state.tongueActive = false;
      state.nextTongueEvent = 1.1 + Math.random() * 3.4;
    }
  } else {
    state.nextTongueEvent -= dt;
    if (state.nextTongueEvent <= 0) {
      state.tongueActive = true;
      state.tongueTimer = 0.2 + Math.random() * 0.55;
      state.tonguePhase = Math.random() * Math.PI * 2;
    }
  }
  state.tongueBlend = THREE.MathUtils.damp(state.tongueBlend, state.tongueActive ? 1 : 0, 12, dt);

  const enterNow = state.keys.has("Enter") || state.touchJump;
  if (enterNow && !state.prevEnter && state.jumpState === 0) {
    state.jumpState = 1;
    state.jumpTimer = 0;
  }
  state.prevEnter = enterNow;

  const eNow = state.keys.has("KeyE") || state.touchETrigger;
  if (eNow && !state.prevE) {
    if (state.swordHeld) {
      const yawRad = THREE.MathUtils.degToRad(state.yaw);
      const fx = Math.sin(yawRad);
      const fz = Math.cos(yawRad);
      const rx = Math.cos(yawRad);
      const rz = -Math.sin(yawRad);
      state.swordHeld = false;
      state.swordX = state.x + rx * 0.34 + fx * 0.18;
      state.swordZ = state.z + rz * 0.34 + fz * 0.18;
      state.swordYaw = state.yaw - 24;
    } else {
      const dx = state.swordX - state.x;
      const dz = state.swordZ - state.z;
      if (dx * dx + dz * dz <= PICKUP_RADIUS * PICKUP_RADIUS) {
        state.swordHeld = true;
      }
    }
  }
  state.prevE = eNow;
  state.touchETrigger = false;
  updateTouchEquipLabel();

  const crouchDur = 0.22;
  if (state.jumpState === 1) {
    state.jumpTimer += dt;
    const p = Math.min(state.jumpTimer / crouchDur, 1);
    state.crouchBlend = Math.sin(p * Math.PI);
    state.pushBlend = p > 0.62 ? Math.min((p - 0.62) / 0.38, 1) : 0;
    if (p >= 1) {
      state.jumpState = 2;
      state.jumpVel = JUMP_VELOCITY;
      state.jumpY = 0.001;
      state.crouchBlend = 0;
      state.pushBlend = 1;
    }
  } else if (state.jumpState === 2) {
    state.jumpVel -= GRAVITY * dt;
    state.jumpY += state.jumpVel * dt;
    state.pushBlend = Math.max(0, state.pushBlend - dt * 8);
    if (state.jumpY <= 0) {
      state.jumpY = 0;
      state.jumpVel = 0;
      state.jumpState = 0;
      state.pushBlend = 0;
    }
  } else {
    state.jumpY = 0;
    state.crouchBlend = 0;
    state.pushBlend = 0;
  }

  state.airBlend = THREE.MathUtils.clamp(state.airBlend + (state.jumpState === 2 ? dt * 8 : -dt * 8), 0, 1);

  let moveInput = state.touchMove;
  if (state.keys.has("ArrowUp")) moveInput += 1;
  if (state.keys.has("ArrowDown")) moveInput -= 1;
  moveInput = THREE.MathUtils.clamp(moveInput, -1, 1);
  let turnInput = state.touchTurn;
  if (state.keys.has("ArrowLeft")) turnInput += 1;
  if (state.keys.has("ArrowRight")) turnInput -= 1;
  turnInput = THREE.MathUtils.clamp(turnInput, -1, 1);

  let moveScale = 1;
  let turnScale = 1;
  if (state.jumpState === 1) {
    moveScale = 0.65;
    turnScale = 0.65;
  } else if (state.jumpState === 2) {
    moveScale = 0.55;
    turnScale = 0.55;
  }

  state.yaw += turnInput * JUKU_TURN_SPEED * dt * turnScale;

  const yawRad = THREE.MathUtils.degToRad(state.yaw);
  const fx = Math.sin(yawRad);
  const fz = Math.cos(yawRad);
  state.x += fx * JUKU_SPEED * dt * moveInput * moveScale;
  state.z += fz * JUKU_SPEED * dt * moveInput * moveScale;
  const resolved = resolveJukuCollisions(state.x, state.z);
  state.x = resolved.x;
  state.z = resolved.z;

  if (moveInput !== 0) {
    state.walkBlend = Math.min(1, state.walkBlend + dt * 6.2);
    state.walkCycle += dt * 8.2 * Math.sign(moveInput);
  } else {
    state.walkBlend = Math.max(0, state.walkBlend - dt * 6.2);
  }

  if (turnInput !== 0 && moveInput === 0) {
    state.turnBlend = Math.min(1, state.turnBlend + dt * 7.4);
    state.turnCycle += dt * 8.8 * Math.sign(turnInput);
  } else {
    state.turnBlend = Math.max(0, state.turnBlend - dt * 7.4);
  }

  if (state.walkCycle > Math.PI * 2) state.walkCycle -= Math.PI * 2;
  if (state.walkCycle < 0) state.walkCycle += Math.PI * 2;
  if (state.turnCycle > Math.PI * 2) state.turnCycle -= Math.PI * 2;
  if (state.turnCycle < 0) state.turnCycle += Math.PI * 2;
}

function getFootballBroadcastPack(game) {
  if (game.celebration?.active && game.celebration.scorer) {
    const celebration = game.celebration;
    const scorer = celebration.scorer;
    const teammates = game.players.filter((p) => p.team === celebration.team && p !== scorer).slice(0, 5);
    const ballPoint = {
      x: scorer.runner.root.position.x,
      y: 1.72,
      z: scorer.runner.root.position.z,
      weight: 3.8,
      ball: true,
      goal: false
    };
    const goalPoint = {
      x: celebration.spotX,
      y: 1.68,
      z: celebration.spotZ,
      weight: 2.2,
      ball: false,
      goal: true
    };
    const points = [ballPoint, goalPoint];
    let focusX = ballPoint.x * ballPoint.weight + goalPoint.x * goalPoint.weight;
    let focusZ = ballPoint.z * ballPoint.weight + goalPoint.z * goalPoint.weight;
    let weightSum = ballPoint.weight + goalPoint.weight;
    for (let i = 0; i < teammates.length; i += 1) {
      const mate = teammates[i];
      const weight = mate.role === "keeper" ? 0.9 : 1.25;
      const point = {
        x: mate.runner.root.position.x,
        y: mate.role === "keeper" ? 1.42 : 1.62,
        z: mate.runner.root.position.z,
        weight,
        ball: false,
        goal: false
      };
      points.push(point);
      focusX += point.x * weight;
      focusZ += point.z * weight;
      weightSum += weight;
    }
    focusX /= Math.max(0.001, weightSum);
    focusZ /= Math.max(0.001, weightSum);
    focusX = THREE.MathUtils.lerp(focusX, ballPoint.x, 0.62);
    focusZ = THREE.MathUtils.lerp(focusZ, ballPoint.z, 0.58);
    const cameraDrift = celebration.orbitSeed + celebration.pulse * 0.05;
    focusX += Math.sin(cameraDrift) * 0.22 * -(celebration.sideSign || 1);
    focusZ += Math.cos(cameraDrift * 0.9) * 0.32;
    let spread = 2.8;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      spread = Math.max(spread, Math.hypot(point.x - focusX, point.z - focusZ));
    }
    return {
      focusX,
      focusZ,
      ballX: ballPoint.x,
      ballZ: ballPoint.z,
      goalX: goalPoint.x,
      goalZ: goalPoint.z,
      attackSide: celebration.team,
      boxZoom: 0.92,
      midfieldLock: 0,
      goalRush: 1,
      spread: THREE.MathUtils.clamp(spread, 2.6, 5.4),
      points
    };
  }

  const ballPoint = {
    x: game.ball.position.x,
    y: 0.9,
    z: game.ball.position.z,
    weight: 3.6,
    ball: true,
    goal: false
  };
  const nearbyPlayers = game.players
    .map((p) => ({
      p,
      dist: Math.hypot(game.ball.position.x - p.runner.root.position.x, game.ball.position.z - p.runner.root.position.z)
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6);

  const attackSide = game.attackingTeam !== 0
    ? game.attackingTeam
    : Math.abs(game.ballVel.z) > 0.08
      ? Math.sign(game.ballVel.z || 1)
      : game.ball.position.z >= 0
        ? 1
        : -1;
  const midfieldLaneBias = 1 - THREE.MathUtils.clamp(
    (Math.abs(game.ball.position.x) - FOOTBALL_FIELD_HALF_WIDTH * 0.28) / Math.max(0.001, FOOTBALL_FIELD_HALF_WIDTH * 0.2),
    0,
    1
  );
  const midfieldDepthBias = 1 - THREE.MathUtils.clamp(
    (Math.abs(game.ball.position.z) - FOOTBALL_FIELD_HALF_LENGTH * 0.3) / Math.max(0.001, FOOTBALL_FIELD_HALF_LENGTH * 0.17),
    0,
    1
  );
  const midfieldLock = midfieldLaneBias * midfieldDepthBias;
  const boxZoom = THREE.MathUtils.clamp((attackSide * game.ball.position.z - (FOOTBALL_FIELD_HALF_LENGTH - 8.2)) / 5.2, 0, 1);
  const goalRush = THREE.MathUtils.clamp((attackSide * game.ball.position.z - (FOOTBALL_FIELD_HALF_LENGTH - 9.6)) / 4.6, 0, 1);
  const attackGoalZ = attackSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const goalPoint = {
    x: 0,
    y: 1.4,
    z: attackGoalZ,
    weight: 1.2 + boxZoom * 1.85,
    ball: false,
    goal: true
  };

  const points = [ballPoint, goalPoint];
  let focusX = ballPoint.x * ballPoint.weight + goalPoint.x * goalPoint.weight;
  let focusZ = ballPoint.z * ballPoint.weight + goalPoint.z * goalPoint.weight;
  let weightSum = ballPoint.weight + goalPoint.weight;

  for (let i = 0; i < nearbyPlayers.length; i += 1) {
    const entry = nearbyPlayers[i];
    const player = entry.p;
    const weight = player === game.ballHolder ? 1.8 : player.role === "keeper" ? 0.38 : Math.max(0.54, 1.34 - entry.dist * 0.11);
    const point = {
      x: player.runner.root.position.x,
      y: player.role === "keeper" ? 1.35 : 1.62,
      z: player.runner.root.position.z,
      weight,
      ball: false,
      goal: false
    };
    points.push(point);
    focusX += point.x * weight;
    focusZ += point.z * weight;
    weightSum += weight;
  }

  focusX /= Math.max(0.001, weightSum);
  focusZ /= Math.max(0.001, weightSum);
  focusX = THREE.MathUtils.lerp(focusX, ballPoint.x, 0.72 + boxZoom * 0.1);
  focusZ = THREE.MathUtils.lerp(focusZ, THREE.MathUtils.lerp(ballPoint.z, attackGoalZ, 0.26 + boxZoom * 0.16), 0.46 + boxZoom * 0.12);
  focusZ = THREE.MathUtils.lerp(focusZ, ballPoint.z, 0.38 + midfieldLock * 0.42);
  focusX = THREE.MathUtils.lerp(focusX, ballPoint.x, midfieldLock * 0.16);

  let spread = 3.1;
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    spread = Math.max(spread, Math.hypot(point.x - focusX, point.z - focusZ));
  }

  return {
    focusX,
    focusZ,
    ballX: ballPoint.x,
    ballZ: ballPoint.z,
    goalX: goalPoint.x,
    goalZ: goalPoint.z,
    attackSide,
    boxZoom,
    midfieldLock,
    goalRush,
    spread: THREE.MathUtils.clamp(spread, 3.6, 11.4),
    points
  };
}

function makeFootballBroadcastSetup(side, pack, zoom) {
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
  return {
    side,
    x: sidelineX,
    y: height,
    z: trackZ,
    lookX,
    lookY,
    lookZ
  };
}

function dampFootballBroadcastSetup(current, target, dt) {
  if (!current) return { ...target };
  current.x = THREE.MathUtils.damp(current.x, target.x, 5.6, dt);
  current.y = THREE.MathUtils.damp(current.y, target.y, 5.4, dt);
  current.z = THREE.MathUtils.damp(current.z, target.z, 5.8, dt);
  current.lookX = THREE.MathUtils.damp(current.lookX, target.lookX, 6.4, dt);
  current.lookY = THREE.MathUtils.damp(current.lookY, target.lookY, 5.2, dt);
  current.lookZ = THREE.MathUtils.damp(current.lookZ, target.lookZ, 6.2, dt);
  return current;
}

function scoreFootballBroadcastSetup(setup, pack) {
  const pos = new THREE.Vector3(setup.x, setup.y, setup.z);
  const target = new THREE.Vector3(setup.lookX, setup.lookY, setup.lookZ);
  const forward = target.clone().sub(pos).normalize();
  const worldUp = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(forward, worldUp).normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
  const tanX = tanY * camera.aspect;
  let score = 0;
  let ballVisible = false;
  let goalVisible = false;
  let ballEdge = 9;

  for (let i = 0; i < pack.points.length; i += 1) {
    const point = pack.points[i];
    const rel = new THREE.Vector3(point.x - setup.x, point.y - setup.y, point.z - setup.z);
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
  return { score, ballVisible, goalVisible, ballEdge };
}

function updateCamera(dt) {
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
    const pack = getFootballBroadcastPack(footballGame);
    const broadcastZoom = CAMERA_ZOOM_DEFAULTS[3];
    const desiredA = makeFootballBroadcastSetup(1, pack, broadcastZoom);
    const desiredB = makeFootballBroadcastSetup(-1, pack, broadcastZoom);
    if (!state.cam3SetupA || !state.cam3SetupB) {
      state.cam3SetupA = { ...desiredA };
      state.cam3SetupB = { ...desiredB };
      const scoreA = scoreFootballBroadcastSetup(state.cam3SetupA, pack);
      const scoreB = scoreFootballBroadcastSetup(state.cam3SetupB, pack);
      state.cam3Side = scoreB.score > scoreA.score ? -1 : 1;
      state.cam3SideBlend = state.cam3Side;
    }

    const liveSide = state.cam3Side >= 0 ? 1 : -1;
    if (liveSide > 0) {
      state.cam3SetupB = dampFootballBroadcastSetup(state.cam3SetupB, desiredB, dt);
    } else {
      state.cam3SetupA = dampFootballBroadcastSetup(state.cam3SetupA, desiredA, dt);
    }

    const liveSetup = liveSide > 0 ? state.cam3SetupA : state.cam3SetupB;
    const standbySetup = liveSide > 0 ? state.cam3SetupB : state.cam3SetupA;
    const liveFrame = scoreFootballBroadcastSetup(liveSetup, pack);
    const standbyFrame = scoreFootballBroadcastSetup(standbySetup, pack);
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
    const shouldSwitch = state.cam3SwitchCooldown <= 0
      && standbyReady
      && (
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
    state.cam2Distance = THREE.MathUtils.clamp(state.cam2Distance, 5.8, 16.5);
    state.cam2Height = THREE.MathUtils.clamp(2.5 + state.cam2Distance * 0.18, 3.0, 5.8);

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

    const closeUpExitThreshold = 0.052;
    const closeUpEnterThreshold = 0.032;
    if (state.cam2CloseUp) {
      if (state.cam2Motion > closeUpExitThreshold) state.cam2CloseUp = false;
    } else if (state.cam2Motion < closeUpEnterThreshold) {
      state.cam2CloseUp = true;
    }

    const closeUpMode = state.cam2CloseUp;
    const cam2Distance = state.cam2Distance * (closeUpMode ? 0.5 : 0.78);
    const cam2Height = closeUpMode ? 3.02 : state.cam2Height * 0.9;
    const orbitX = Math.sin(state.cam2Yaw) * cam2Distance;
    const orbitZ = Math.cos(state.cam2Yaw) * cam2Distance;
    const lookX = state.cam2FocusX;
    const lookY = closeUpMode ? JUKU_BASE_Y + 2.94 : JUKU_BASE_Y + 2.62 + state.jumpY * 0.22;
    const lookZ = state.cam2FocusZ;
    const baseZoom = CAMERA_ZOOM_DEFAULTS[2];
    const targetYBase = closeUpMode ? cam2Height * baseZoom : state.jumpY + cam2Height * baseZoom;
    const dollyPos = dollyCameraTowards(state.cam2FocusX + orbitX, targetYBase, state.cam2FocusZ + orbitZ, lookX, lookY, lookZ, dolly);
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
    camera.up.set(
      upLen > 0.001 ? state.topDownUpX / upLen : targetUpX,
      0,
      upLen > 0.001 ? state.topDownUpZ / upLen : targetUpZ
    );
    camera.lookAt(lookX, lookY, lookZ);
  }
  if (cameraStatus) cameraStatus.textContent = `Active Camera: ${CAMERA_NAMES[state.activeCam]} | Zoom: ${zoom.toFixed(2)}x`;
}

function updateJukuPose() {
  juku.root.position.set(state.x, JUKU_BASE_Y + state.jumpY - state.crouchBlend * 0.09, state.z);
  juku.root.rotation.y = THREE.MathUtils.degToRad(state.yaw);

  const blinkPhase = state.blinkTimer > 0 ? 1 - state.blinkTimer / 0.16 : 0;
  const blink = blinkPhase > 0 ? Math.sin(blinkPhase * Math.PI) : 0;
  let surprise = Math.max(state.airBlend, state.pushBlend * 0.85);
  let focus = Math.max(state.walkBlend * 0.52, state.swordHeld ? 0.3 : 0);
  let calm = 0;
  let angry = 0;
  let happy = 0;
  let sad = 0;
  if (state.faceMode === "calm") {
    calm = 1;
    focus *= 0.35;
    surprise *= 0.2;
  } else if (state.faceMode === "angry") {
    angry = 1;
    focus = Math.max(focus, 0.88);
    surprise *= 0.15;
  } else if (state.faceMode === "surprised") {
    surprise = Math.max(surprise, 0.95);
    focus *= 0.28;
  } else if (state.faceMode === "happy") {
    happy = 1;
    focus *= 0.35;
    surprise *= 0.22;
  } else if (state.faceMode === "sad") {
    sad = 1;
    focus *= 0.45;
    surprise *= 0.18;
  }

  const eyeOpen = THREE.MathUtils.clamp(
    0.92 - blink * 0.9 - focus * 0.14 - angry * 0.09 - sad * 0.08 + surprise * 0.14 + calm * 0.04 + happy * 0.03,
    0.05,
    1.04
  );
  juku.leftEye.scale.y = eyeOpen;
  juku.rightEye.scale.y = eyeOpen;
  juku.leftUpperLid.position.y = 0.032 - blink * 0.034 - focus * 0.01 - angry * 0.004 + surprise * 0.005 + calm * 0.003 + happy * 0.004 - sad * 0.003;
  juku.rightUpperLid.position.y = 0.032 - blink * 0.034 - focus * 0.01 - angry * 0.004 + surprise * 0.005 + calm * 0.003 + happy * 0.004 - sad * 0.003;
  juku.leftLowerLid.position.y = -0.034 + blink * 0.026 + focus * 0.006 + angry * 0.003 - surprise * 0.004 - calm * 0.003 - happy * 0.003 + sad * 0.004;
  juku.rightLowerLid.position.y = -0.034 + blink * 0.026 + focus * 0.006 + angry * 0.003 - surprise * 0.004 - calm * 0.003 - happy * 0.003 + sad * 0.004;
  juku.leftUpperLid.scale.y = 0.16 + blink * 0.62 + focus * 0.12 + angry * 0.08 + sad * 0.05 - happy * 0.03;
  juku.rightUpperLid.scale.y = 0.16 + blink * 0.62 + focus * 0.12 + angry * 0.08 + sad * 0.05 - happy * 0.03;
  juku.leftLowerLid.scale.y = 0.12 + blink * 0.3 + focus * 0.08 + angry * 0.04 + sad * 0.03;
  juku.rightLowerLid.scale.y = 0.12 + blink * 0.3 + focus * 0.08 + angry * 0.04 + sad * 0.03;

  const eyeOffsetX = THREE.MathUtils.clamp(state.pointerX * 0.012, -0.016, 0.016);
  const eyeOffsetY = THREE.MathUtils.clamp(-state.pointerY * 0.008, -0.01, 0.01);
  juku.leftPupil.position.set(
    juku.pupilBase.left.x + eyeOffsetX,
    juku.pupilBase.left.y + eyeOffsetY,
    juku.pupilBase.left.z
  );
  juku.rightPupil.position.set(
    juku.pupilBase.right.x + eyeOffsetX,
    juku.pupilBase.right.y + eyeOffsetY,
    juku.pupilBase.right.z
  );

  const headBob = Math.sin(state.walkCycle * 2) * 0.018 * state.walkBlend + Math.sin(state.faceTime * 1.8) * 0.006;
  const headLift = -state.crouchBlend * 0.045 + state.pushBlend * 0.016 + state.airBlend * 0.02;
  juku.head.position.y = 3.27 + headBob + headLift;
  juku.head.rotation.x = THREE.MathUtils.degToRad(-4 * state.crouchBlend + 7 * state.pushBlend - 4 * state.airBlend - focus * 3 + happy * 1.5 + sad * 4.5);
  juku.head.rotation.z = state.pointerX * 0.06 + Math.sin(state.walkCycle) * 0.018 * state.walkBlend;

  const browLift = 0.026 * surprise - 0.014 * focus + 0.012 * calm - 0.01 * angry + 0.014 * happy - 0.02 * sad + 0.004 * Math.sin(state.faceTime * 2.4);
  const browPinch = 12 * focus - 9 * surprise + 12 * angry - 4 * calm - 5 * happy + 6 * sad;
  const browInward = 0.018 * focus - 0.008 * surprise + 0.016 * angry - 0.006 * calm - 0.004 * happy + 0.008 * sad;
  juku.leftBrow.position.set(juku.browBase.left.x + browInward, juku.browBase.left.y + browLift, juku.browBase.left.z);
  juku.rightBrow.position.set(juku.browBase.right.x - browInward, juku.browBase.right.y + browLift, juku.browBase.right.z);
  juku.leftBrow.rotation.z = THREE.MathUtils.degToRad(82 - browPinch - happy * 2 + sad * 3);
  juku.rightBrow.rotation.z = THREE.MathUtils.degToRad(-82 + browPinch + happy * 2 - sad * 3);

  const mouthTalk = Math.max(0, Math.sin(state.faceTime * 9.5)) * 0.058 * state.walkBlend + Math.max(0, Math.sin(state.faceTime * 5.8)) * 0.02;
  const mouthOpen = THREE.MathUtils.clamp(0.03 + mouthTalk + surprise * 0.17 - focus * 0.012 - angry * 0.014 - sad * 0.005, 0.012, 0.28);
  const smileWidth = 0.14 * (1 - focus) * (1 - surprise * 0.7) + calm * 0.06 - angry * 0.09 + happy * 0.24 - sad * 0.16;
  juku.mouth.position.y = -0.172 - state.crouchBlend * 0.007 + state.airBlend * 0.014 + focus * 0.004 - sad * 0.014 + happy * 0.008;
  juku.mouth.rotation.z = Math.sin(state.faceTime * 3.8) * 0.03 * state.walkBlend * (1 - angry * 0.9) + happy * 0.01 - sad * 0.008;
  juku.mouthLine.scale.set(2.04 + smileWidth - mouthOpen * 0.58, 0.18 + mouthOpen * 2.95 + calm * 0.03 + happy * 0.05, 0.52);
  juku.mouthInner.scale.set(1.3 + mouthOpen * 0.72 - focus * 0.1 - angry * 0.18 - sad * 0.15, 0.05 + mouthOpen * 4.9 + happy * 0.06, 0.4 + mouthOpen * 0.42);
  juku.mouthInner.position.y = -0.008 - mouthOpen * 0.026 - happy * 0.005 + sad * 0.012;
  const tongueCanShow = mouthOpen > 0.045 && happy < 0.97 && sad < 0.97;
  const tongueMotion = tongueCanShow ? state.tongueBlend : 0;
  const tongueWave = Math.sin(state.faceTime * 11.2 + state.walkCycle * 0.45 + state.tonguePhase);
  const tongueNod = Math.sin(state.faceTime * 7.6 + 0.35 + state.tonguePhase * 0.5);
  const tongueSlide = Math.sin(state.faceTime * 5.2 + state.walkCycle * 0.3 + state.tonguePhase);
  const tongueOut = THREE.MathUtils.clamp(((mouthOpen - 0.05) * 4.2 + surprise * 0.5 + happy * 0.12) * tongueMotion, 0, 1.15);
  juku.tongue.visible = tongueCanShow && tongueMotion > 0.12;
  juku.tongue.scale.set(1.38 + tongueOut * 0.26, 0.22 + tongueMotion * (mouthOpen * 1.25 + 0.08 * (1 + tongueNod)), 0.86 + tongueOut * 0.5 + 0.06 * tongueMotion * tongueWave);
  juku.tongue.position.set(0.012 * tongueMotion * tongueSlide, -0.02 - tongueMotion * (mouthOpen * 0.017) + 0.005 * tongueMotion * tongueNod, 0.018 + tongueOut * 0.024 + 0.003 * tongueMotion * tongueWave);
  juku.tongue.rotation.x = THREE.MathUtils.degToRad(8 + tongueOut * 16 + tongueMotion * tongueNod * 8);
  juku.tongue.rotation.y = tongueMotion * tongueSlide * 0.11;
  juku.tongue.rotation.z = tongueMotion * tongueWave * 0.12;
  if (faceStatus) faceStatus.textContent = `Active Face: ${FACE_NAMES[state.faceMode]}`;

  const armData = [
    { arm: juku.leftArm, side: 1 },
    { arm: juku.rightArm, side: -1 }
  ];
  armData.forEach(({ arm, side }) => {
    const walkPhase = side === -1 ? state.walkCycle + Math.PI : state.walkCycle;
    const armSwing = Math.sin(walkPhase) * 10 * state.walkBlend * (1 - state.airBlend * 0.65);
    const hasSword = side === -1 && state.swordHeld;
    arm.upperPivot.rotation.z = THREE.MathUtils.degToRad(side * 14);
    arm.upperPivot.rotation.x = THREE.MathUtils.degToRad(-(4 + 15 * state.airBlend + 6 * state.pushBlend - 5 * state.crouchBlend + armSwing));
    arm.lowerPivot.rotation.x = THREE.MathUtils.degToRad(-(8 + 10 * state.airBlend + (hasSword ? 10 : 0)));
    if (arm.gripHand) {
      arm.gripHand.visible = hasSword;
      arm.openHand.visible = !hasSword;
    }
  });

  const legData = [
    { leg: juku.leftLeg, side: 1 },
    { leg: juku.rightLeg, side: -1 }
  ];
  legData.forEach(({ leg, side }) => {
    const walkPhase = side === -1 ? state.walkCycle : state.walkCycle + Math.PI;
    const turnPhase = state.turnCycle + (side === -1 ? Math.PI : 0);
    const turnHip = Math.sin(turnPhase) * 15 * state.turnBlend * (1 - state.airBlend);
    const turnLift = ((-Math.sin(turnPhase) + 1) * 0.5) * state.turnBlend * (1 - state.airBlend);
    let hipPitch = Math.sin(walkPhase) * 24 * state.walkBlend * (1 - state.crouchBlend * 0.75);
    hipPitch = hipPitch - 12 * state.crouchBlend + 7 * state.pushBlend;
    hipPitch += turnHip;
    let kneePitch = 8 + (10 + 16 * ((-Math.sin(walkPhase) + 1) * 0.5)) * state.walkBlend;
    kneePitch = kneePitch + 40 * state.crouchBlend - 10 * state.pushBlend;
    kneePitch += turnLift * 13;
    let anklePitch = -5 - hipPitch * 0.38 - (kneePitch - 8) * 0.22 + 6 * state.pushBlend;
    anklePitch += turnLift * -5;
    if (state.airBlend > 0) {
      hipPitch = THREE.MathUtils.lerp(hipPitch, -2, state.airBlend);
      kneePitch = THREE.MathUtils.lerp(kneePitch, 2, state.airBlend);
      anklePitch = THREE.MathUtils.lerp(anklePitch, 34, state.airBlend);
    }
    leg.root.rotation.z = THREE.MathUtils.degToRad(side * 4);
    leg.root.rotation.x = THREE.MathUtils.degToRad(-4 + hipPitch);
    leg.kneePivot.rotation.x = THREE.MathUtils.degToRad(kneePitch);
    leg.footPivot.rotation.x = THREE.MathUtils.degToRad(anklePitch);
  });

  droppedSword.root.visible = !state.swordHeld;
  droppedSword.root.position.set(state.swordX, 0.028, state.swordZ);
  droppedSword.root.rotation.set(THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(state.swordYaw), THREE.MathUtils.degToRad(90));
  juku.heldSword.root.visible = state.swordHeld;
}

function renderCamera3Pip() {
  if (state.activeCam !== 3) {
    pipFrame.style.display = "none";
    return;
  }
  const standbySetup = state.cam3Side >= 0 ? state.cam3SetupB : state.cam3SetupA;
  if (!standbySetup) {
    pipFrame.style.display = "none";
    return;
  }
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const pipWidth = Math.round(width * 0.24);
  const pipHeight = Math.round(pipWidth / 1.62);
  const margin = 18;
  const pipX = width - pipWidth - margin;
  const pipY = height - pipHeight - margin;
  pipFrame.style.display = "block";
  pipFrame.style.left = `${pipX}px`;
  pipFrame.style.top = `${height - pipY - pipHeight}px`;
  pipFrame.style.width = `${pipWidth}px`;
  pipFrame.style.height = `${pipHeight}px`;
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

function tick(now) {
  const dt = Math.min((now - state.lastT) / 1000, 0.05);
  state.lastT = now;
  updateJuku(dt);
  updateFootballGame(footballGame, dt);
  updateCamera(dt);
  updateJukuPose();
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.setScissorTest(false);
  renderer.render(scene, camera);
  renderCamera3Pip();
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
