export const WORLD_RADIUS = 150;
export const WORLD_MOVE_LIMIT = WORLD_RADIUS - 3;
export const JUKU_SPEED = 2.45;
export const JUKU_TURN_SPEED = 130;
export const PICKUP_RADIUS = 1.85;
export const GRAVITY = 9.8;
export const JUMP_VELOCITY = 4.65;
export const HUMAN_BASE_Y = -0.55;
export const JUKU_BASE_Y = HUMAN_BASE_Y;
export const RUNNER_BASE_Y = HUMAN_BASE_Y;
export const RUNNER_GROUND_OFFSET = 0;
export const JUKU_COLLIDER_RADIUS = 0.34;
export const ATHLETE_SCALE = 2.35;
export const FOOTBALL_PERSON_RADIUS = 0.33 * ATHLETE_SCALE;
export const TRACK_PERSON_RADIUS = 0.3 * ATHLETE_SCALE;
export const COACH_PERSON_RADIUS = 0.4 * ATHLETE_SCALE;
export const ATHLETE_BALL_REACH = 0.48 * ATHLETE_SCALE;
export const TRACK_HURDLE_SCALE = 2.75;
export const TRACK_LANE_COUNT = 8;
export const TRACK_LANE_WIDTH = 1.25;
export const TRACK_CURVE_INNER_RADIUS = 18.95;
export const TRACK_CURVE_OUTER_RADIUS = TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * TRACK_LANE_COUNT;
export const TRACK_STRAIGHT_HALF = 28.7;
export const TRACK_HOME_APRON_EXTRA = TRACK_LANE_WIDTH * 1.7;
export const TRACK_HOME_STRAIGHT_Z = -(TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * 0.5);
export const TRACK_100M_START_X = -TRACK_STRAIGHT_HALF + 5.9;
export const TRACK_FINISH_X = TRACK_STRAIGHT_HALF - 1.2;
export const TRACK_FINISH_PROGRESS = TRACK_FINISH_X + TRACK_STRAIGHT_HALF;
export const FOOTBALL_FIELD_HALF_WIDTH = 16.2;
export const FOOTBALL_FIELD_HALF_LENGTH = 24.2;
export const JUKU_START_X = FOOTBALL_FIELD_HALF_WIDTH + 5.2;
export const JUKU_START_Z = -7.8;
export const TRACK_RACE_DIRECTION = -1;
export const TRACK_RACE_FINISH_Z = JUKU_START_Z - 8.5;
export const TRACK_RACE_FINISH_PROGRESS = TRACK_RACE_FINISH_Z + TRACK_STRAIGHT_HALF;
export const TRACK_RACE_START_DISTANCE = 64.5;
export const TRACK_RACE_START_PROGRESS = TRACK_RACE_FINISH_PROGRESS + TRACK_RACE_START_DISTANCE;
export const FOOTBALL_CENTER_CIRCLE_RADIUS = 4.25;
export const FOOTBALL_PLAYER_COUNT = 12;
export const FOOTBALL_GOAL_WIDTH = 8.8;
export const FOOTBALL_GOAL_HEIGHT = 3.75;
export const FOOTBALL_GOAL_DEPTH = 3.1;
export const FOOTBALL_BALL_RADIUS = 0.24;
export const FOOTBALL_TOUCHLINE_BUFFER = 2.6;
export const FOOTBALL_REFEREE_TOUCHLINE_MARGIN = 1.1;
export const FOOTBALL_REFEREE_BALL_SAFE_RADIUS = 3.6;
export const FOOTBALL_REFEREE_LANE_SAFE_RADIUS = 2.2;
export const FOOTBALL_BALL_GRAVITY = 18.5;
export const FOOTBALL_BALL_GROUND_BOUNCE = 0.44;
export const FOOTBALL_BALL_CONTROL_HEIGHT = 0.72;
export const FOOTBALL_BALL_VOLLEY_HEIGHT = 1.28;
export const FOOTBALL_BALL_SPEED_SCALE = 1.34;
export const GOAL_CELEBRATION_DURATION = 10;
export const GOAL_OVERLAY_DURATION = 10;
export const GOAL_REPLAY_BUFFER_SECONDS = 3.2;
export const GOAL_REPLAY_SAMPLE_INTERVAL = 0.05;
export const GOAL_REPLAY_DELAY = 0.72;
export const GOAL_REPLAY_PLAYBACK_RATE = 0.28;
export const GOAL_REPLAY_SHOW_TIME = 6.2;
export const ARCADE_SCORING_BOOST = 1.16;
export const ARCADE_KEEPER_NERF = 0.78;
export const TRACK_RUNNER_COUNT = 8;
export const TRACK_HURDLE_COUNT = 12;
export const TRACK_RUNNER_HURDLE_JUMP_VELOCITY = 5.2;
export const TRACK_RUNNER_HURDLE_CLEARANCE_Y = 0.9;
export const TRACK_RUNNER_HURDLE_IMPACT_LIFT = 1.6;
export const TRACK_HURDLE_JUMP_TRIGGER = 1.9;
export const TRACK_HURDLE_CONTACT_WINDOW = 0.09;
export const TRACK_HURDLE_FALL_SPEED = 4.8;
export const TRACK_HURDLE_RESET_TIME = 5;
export const TRACK_HURDLE_RANDOM_FALL_RATE = 0;
export const TRACK_HURDLE_CONTACT_DEPTH = 0.08;
export const TRACK_HURDLE_CONTACT_SIDE_MARGIN = 0.015;
export const TRACK_HURDLE_CONTACT_HEIGHT_MARGIN = 0.01;
export const TRACK_HURDLE_UNDERPASS_MARGIN = 0.005;
export const TRACK_HURDLE_JUMP_TRIGGER_SPEED_BONUS = 0.36;
export const TRACK_RUNNER_PASS_TRIGGER = 3.1;
export const TRACK_RUNNER_PASS_FRONT_CLEARANCE = 3.8;
export const TRACK_RUNNER_PASS_BACK_CLEARANCE = 1.9;
export const TRACK_RUNNER_LANE_CHANGE_RATE = 3.4;
export const TRACK_RUNNER_MAX_PASS_LANE = 2;
export const HAIR_STYLE_VARIANTS = ["short", "parted", "curly", "bob", "spiky", "bangs", "pigtails"];
export const HAIR_COLOR_VARIANTS = [0x2f1a0f, 0x5a3822, 0xc89b58, 0x121416, 0x6d4932];
export const CAMERA_NAMES = {
  1: "1 FREE",
  2: "2 JUKU FOLLOW",
  3: "3 TV 2IN1",
  4: "4 TOP DOWN"
};
export const CAMERA_ZOOM_DEFAULTS = {
  1: 1.28,
  2: 1.06,
  3: 0.86,
  4: 1.72
};
export const CAMERA_ZOOM_LIMITS = {
  1: { min: 0.28, max: 2.8 },
  2: { min: 0.42, max: 1.95 },
  3: { min: 0.28, max: 1.78 },
  4: { min: 0.56, max: 3.3 }
};
export const CAMERA_ZOOM_DOLLY = {
  1: 34,
  2: 16,
  3: 24,
  4: 34
};
export const FACE_NAMES = {
  auto: "AUTO",
  calm: "CALM",
  angry: "ANGRY",
  surprised: "WOW",
  happy: "HAPPY",
  sad: "SAD"
};
export const FOOTBALL_BEHAVIOR_PRESET = "arcade";
export const FOOTBALL_BEHAVIOR_PRESETS = {
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
export const FOOTBALL_ROLE_LABELS = {
  keeper: "Goalkeeper",
  defender: "Defender",
  midfielder: "Midfielder",
  attacker: "Attacker"
};

export function createInitialState() {
  return {
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
    x: JUKU_START_X,
    z: JUKU_START_Z,
    yaw: -115,
    walkCycle: 0,
    walkBlend: 0,
    turnCycle: 0,
    turnBlend: 0,
    heldItemId: "sword",
    nearbyPickupId: null,
    pickupObjectStates: {
      sword: {
        x: 0.45,
        z: -2.8,
        yaw: 18
      }
    },
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
    cam2PrevX: JUKU_START_X,
    cam2PrevZ: JUKU_START_Z,
    cam2FocusX: JUKU_START_X,
    cam2FocusZ: JUKU_START_Z,
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
    replayClock: 0,
    replayBuffer: [],
    replayBufferHead: 0,
    replayBufferCount: 0,
    replaySampleTimer: 0,
    goalReplay: null,
    pauseFootball: false,
    pauseTrack: false,
    trackTimer: 0,
    lastT: performance.now()
  };
}
