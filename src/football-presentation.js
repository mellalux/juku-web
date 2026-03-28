import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_GRAVITY,
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH,
  GOAL_OVERLAY_DURATION,
  GOAL_REPLAY_BUFFER_SECONDS,
  GOAL_REPLAY_DELAY,
  GOAL_REPLAY_PLAYBACK_RATE,
  GOAL_REPLAY_SAMPLE_INTERVAL,
  GOAL_REPLAY_SHOW_TIME
} from "./game-config.js";
import { getFootballTeamData } from "./football-helpers.js";

const GOAL_REPLAY_CAMERA_SETUP = {
  lookX: 0,
  lookY: 0,
  lookZ: 0,
  x: 0,
  y: 0,
  z: 0
};
const GOAL_OVERLAY_HIDDEN_TRANSFORM = "translate(-50%, -50%) scale(0.82)";
const GOAL_REPLAY_HIDDEN_TRANSFORM = "translate(-50%, -50%) perspective(1400px) rotateY(-96deg) scale(0.86)";
const GOAL_REPLAY_RESTING_BOX_SHADOW = "0 22px 60px rgba(15,23,42,0.4), 0 0 0 1px rgba(255,255,255,0.18) inset";
const GOAL_REPLAY_BUFFER_FRAME_CAPACITY = Math.max(
  8,
  Math.ceil((GOAL_REPLAY_BUFFER_SECONDS + 0.25) / GOAL_REPLAY_SAMPLE_INTERVAL) + 2
);

function initializeFootballReplayRingState(state, frames = null) {
  state.replayBuffer = new Array(GOAL_REPLAY_BUFFER_FRAME_CAPACITY);
  state.replayBufferHead = 0;
  state.replayBufferCount = 0;
  if (!frames || frames.length === 0) return;
  const start = Math.max(0, frames.length - GOAL_REPLAY_BUFFER_FRAME_CAPACITY);
  for (let i = start; i < frames.length; i += 1) {
    state.replayBuffer[state.replayBufferCount] = frames[i];
    state.replayBufferCount += 1;
  }
}

function ensureFootballReplayRingState(state) {
  if (
    Array.isArray(state.replayBuffer)
    && state.replayBuffer.length === GOAL_REPLAY_BUFFER_FRAME_CAPACITY
    && typeof state.replayBufferHead === "number"
    && typeof state.replayBufferCount === "number"
  ) {
    return;
  }

  const legacyFrames = Array.isArray(state.replayBuffer) ? state.replayBuffer : [];
  initializeFootballReplayRingState(state, legacyFrames);
}

function pushFootballReplayFrame(state, frame) {
  ensureFootballReplayRingState(state);
  const bufferIndex = (state.replayBufferHead + state.replayBufferCount) % GOAL_REPLAY_BUFFER_FRAME_CAPACITY;
  if (state.replayBufferCount < GOAL_REPLAY_BUFFER_FRAME_CAPACITY) {
    state.replayBuffer[bufferIndex] = frame;
    state.replayBufferCount += 1;
    return;
  }

  state.replayBuffer[state.replayBufferHead] = frame;
  state.replayBufferHead = (state.replayBufferHead + 1) % GOAL_REPLAY_BUFFER_FRAME_CAPACITY;
}

function getRecentFootballReplayFrames(state, maxFrames) {
  ensureFootballReplayRingState(state);
  const count = Math.min(state.replayBufferCount, maxFrames);
  if (count <= 0) return [];

  const frames = new Array(count);
  const startIndex = (state.replayBufferHead + state.replayBufferCount - count + GOAL_REPLAY_BUFFER_FRAME_CAPACITY) % GOAL_REPLAY_BUFFER_FRAME_CAPACITY;
  for (let i = 0; i < count; i += 1) {
    frames[i] = state.replayBuffer[(startIndex + i) % GOAL_REPLAY_BUFFER_FRAME_CAPACITY];
  }
  return frames;
}

export function setElementTextIfChanged(element, text) {
  if (element && element.textContent !== text) element.textContent = text;
}

export function setElementClassNameIfChanged(element, className) {
  if (element && element.className !== className) element.className = className;
}

export function setElementStylePropertyIfChanged(element, propertyName, value) {
  if (!element || element.style[propertyName] === value) return;
  element.style[propertyName] = value;
}

function setRootCssVariableIfChanged(name, value) {
  if (!value) return;
  const rootStyle = document.documentElement.style;
  if (rootStyle.getPropertyValue(name) === value) return;
  rootStyle.setProperty(name, value);
}

export function applyFootballTeamPresentation(teamData, { redTeamLabel, blueTeamLabel } = {}) {
  const redTeam = teamData?.red ?? null;
  const blueTeam = teamData?.blue ?? null;
  setElementTextIfChanged(redTeamLabel, redTeam?.name ?? "Team A");
  setElementTextIfChanged(blueTeamLabel, blueTeam?.name ?? "Team B");
  setRootCssVariableIfChanged("--team-red-scoreboard", redTeam?.ui?.scoreboard ?? "#f87171");
  setRootCssVariableIfChanged("--team-blue-scoreboard", blueTeam?.ui?.scoreboard ?? "#60a5fa");
  setRootCssVariableIfChanged("--team-red-attack", redTeam?.ui?.attack ?? "#fca5a5");
  setRootCssVariableIfChanged("--team-blue-attack", blueTeam?.ui?.attack ?? "#93c5fd");
  setRootCssVariableIfChanged("--team-red-player", redTeam?.ui?.player ?? "#fecaca");
  setRootCssVariableIfChanged("--team-blue-player", blueTeam?.ui?.player ?? "#bfdbfe");
}

export function setScoreboardLineView(element, baseClassName, themeClassName, text) {
  if (!element) return;
  const className = themeClassName ? `${baseClassName} ${themeClassName}` : baseClassName;
  setElementClassNameIfChanged(element, className);
  setElementTextIfChanged(element, text);
}

export function updateScoreboardView({ game, scoreStatus, attackStatus, playerStatus, getFootballPlayerLabel }) {
  const redTeamName = game.teamSlots?.red?.name ?? "Red";
  const blueTeamName = game.teamSlots?.blue?.name ?? "Blue";
  if (playerStatus && game.refRestart?.active && (game.refRestart.kind ?? "boundary") === "kickoff") {
    setScoreboardLineView(
      playerStatus,
      "scoreboard-player",
      "",
      game.refRestart.phase === "toBall"
        ? "Referee: retrieving kickoff ball"
        : game.refRestart.phase === "toCenter"
          ? "Referee: bringing ball to center"
          : "Referee: placing kickoff ball"
    );
    return;
  }
  if (scoreStatus) {
    setElementTextIfChanged(scoreStatus, `${game.redScore} : ${game.blueScore}`);
    if (game.attackingTeam === 1) {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "scoreboard-attack-red", `${redTeamName} attacks`);
    } else if (game.attackingTeam === -1) {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "scoreboard-attack-blue", `${blueTeamName} attacks`);
    } else {
      setScoreboardLineView(attackStatus, "scoreboard-attack", "", "Attack: loose ball");
    }
  }
  if (!playerStatus) return;

  if (game.jukuBallHeld) {
    setScoreboardLineView(playerStatus, "scoreboard-player", "", "Ball: Juku");
  } else if (game.ballHolder) {
    setScoreboardLineView(
      playerStatus,
      "scoreboard-player",
      game.ballHolder.team === 1 ? "scoreboard-player-red" : "scoreboard-player-blue",
      `Ball: ${getFootballPlayerLabel(game.ballHolder)}`
    );
  } else {
    setScoreboardLineView(playerStatus, "scoreboard-player", "", "Ball: loose");
  }
}

export function resetFootballBallState(game) {
  game.ball.position.set(0, FOOTBALL_BALL_RADIUS, 0);
  game.ball.visible = true;
  game.ballVel.set(0, 0, 0);
  game.refRestart = null;
  if (game.restartSpot) {
    game.restartSpot.x = 0;
    game.restartSpot.z = 0;
  } else {
    game.restartSpot = { x: 0, z: 0 };
  }
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
  game.outOfBoundsTimer = 0;
  game.lastTouchTeam = 0;
  game.lastTouchPlayer = null;
  game.sameTeamTouchCount = 0;
  game.goalPending = null;
  game.ballHolder = null;
  game.kickoffContestTimer = 0;
  game.kickoffScriptTimer = 0;
  if (game.coach?.carryBall) game.coach.carryBall.visible = false;
}

export function formatGoalOrdinal(count) {
  const absCount = Math.abs(Math.trunc(count || 0));
  const mod100 = absCount % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${absCount}th`;
  const mod10 = absCount % 10;
  if (mod10 === 1) return `${absCount}st`;
  if (mod10 === 2) return `${absCount}nd`;
  if (mod10 === 3) return `${absCount}rd`;
  return `${absCount}th`;
}

export function setGoalOverlayStateView({ active, scorer = null, team = 0, game = null, goalOverlay, goalOverlayTitle, goalOverlayScorer }) {
  if (!active) {
    setElementStylePropertyIfChanged(goalOverlay, "display", "none");
    setElementStylePropertyIfChanged(goalOverlay, "opacity", "0");
    setElementStylePropertyIfChanged(goalOverlay, "transform", GOAL_OVERLAY_HIDDEN_TRANSFORM);
    return;
  }
  const teamData = getFootballTeamData(game, team);
  setElementStylePropertyIfChanged(goalOverlay, "display", "block");
  setElementTextIfChanged(goalOverlayTitle, "GOAL");
  setElementStylePropertyIfChanged(
    goalOverlayTitle,
    "color",
    teamData?.ui?.goalTitle ?? (team === 1 ? "#fecaca" : team === -1 ? "#bfdbfe" : "#f8fafc")
  );
  setElementTextIfChanged(
    goalOverlayScorer,
    scorer ? `${scorer.shirtNumber} - ${scorer.displayName} | ${formatGoalOrdinal(scorer.goalsScored ?? 1)} goal` : "SCORER UNKNOWN"
  );
  setElementStylePropertyIfChanged(
    goalOverlayScorer,
    "color",
    teamData?.ui?.goalScorer ?? (team === 1 ? "#fca5a5" : team === -1 ? "#93c5fd" : "#dbeafe")
  );
}

function captureFootballReplayFrame(game, replayClock) {
  const players = new Array(game.players.length);
  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    players[i] = {
      x: player.runner.root.position.x,
      y: player.runner.root.position.y,
      z: player.runner.root.position.z,
      yaw: player.runner.root.rotation.y,
      team: player.team,
      role: player.role
    };
  }
  return {
    t: replayClock,
    ball: {
      x: game.ball.position.x,
      z: game.ball.position.z,
      y: game.ball.position.y,
      vx: game.ballVel.x,
      vy: game.ballVel.y,
      vz: game.ballVel.z,
      visible: game.ball.visible
    },
    players
  };
}

function extendGoalReplayFrames(frames, team) {
  if (!frames || frames.length < 2 || !team) return frames;

  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const finalGoalDepth = goalLine + FOOTBALL_GOAL_DEPTH - FOOTBALL_BALL_RADIUS * 1.15;
  const lastFrame = frames[frames.length - 1];
  const lastBallDepth = lastFrame.ball.z * team;
  if (lastBallDepth >= finalGoalDepth) return frames;

  const prevFrame = frames[frames.length - 2];
  const dtBase = Math.max(0.01, lastFrame.t - prevFrame.t);
  let carryVx = Number.isFinite(lastFrame.ball.vx) ? lastFrame.ball.vx : (lastFrame.ball.x - prevFrame.ball.x) / dtBase;
  let carryVy = Number.isFinite(lastFrame.ball.vy) ? lastFrame.ball.vy : (lastFrame.ball.y - prevFrame.ball.y) / dtBase;
  let carryVz = Number.isFinite(lastFrame.ball.vz) ? lastFrame.ball.vz : (lastFrame.ball.z - prevFrame.ball.z) / dtBase;
  if (carryVz * team <= 0.05) {
    carryVz = team * Math.max(1.8, Math.abs((lastFrame.ball.z - prevFrame.ball.z) / dtBase), Math.abs(carryVz), 2.6);
  }

  const extended = frames.slice();
  let simBall = { ...lastFrame.ball };
  let simTime = lastFrame.t;
  for (let i = 0; i < 18; i += 1) {
    const step = GOAL_REPLAY_SAMPLE_INTERVAL;
    simTime += step;
    simBall.x += carryVx * step;
    simBall.y = Math.max(FOOTBALL_BALL_RADIUS, simBall.y + carryVy * step);
    simBall.z += carryVz * step;
    if (simBall.z * team >= finalGoalDepth) {
      simBall.z = team * finalGoalDepth;
      carryVz = 0;
    }
    carryVx *= 0.988;
    carryVy = Math.max(-0.8, carryVy - FOOTBALL_BALL_GRAVITY * step * 0.2);
    carryVz *= 0.992;
    extended.push({
      ...lastFrame,
      t: simTime,
      ball: { ...simBall }
    });
    if (simBall.z * team >= finalGoalDepth) break;
  }
  return extended;
}

export function recordFootballReplayState({ state, game, dt }) {
  state.replayClock += dt;
  state.replaySampleTimer = Math.max(0, (state.replaySampleTimer ?? 0) - dt);
  if (state.replaySampleTimer > 0) return;
  state.replaySampleTimer = GOAL_REPLAY_SAMPLE_INTERVAL;
  pushFootballReplayFrame(state, captureFootballReplayFrame(game, state.replayClock));
}

export function startGoalReplayState({ state, game, scorer = null, team = 0 }) {
  const baseFrames = getRecentFootballReplayFrames(
    state,
    Math.max(8, Math.floor(GOAL_REPLAY_BUFFER_SECONDS / GOAL_REPLAY_SAMPLE_INTERVAL))
  );
  const frames = extendGoalReplayFrames(baseFrames, team);
  if (frames.length < 4) return;
  const startTime = frames[0].t;
  const endTime = frames[frames.length - 1].t;
  state.goalReplay = {
    scorer,
    team,
    frames,
    span: Math.max(0.001, endTime - startTime),
    showDuration: GOAL_REPLAY_DELAY + Math.max(2.8, Math.max(0.001, endTime - startTime) / GOAL_REPLAY_PLAYBACK_RATE) + 0.95,
    timer: 0,
    visible: false
  };
}

export function getGoalReplayFrame(replay, replayTime) {
  const frames = replay?.frames ?? [];
  if (frames.length === 0) return null;
  const targetTime = frames[0].t + replayTime;
  let chosen = frames[0];
  for (let i = 1; i < frames.length; i += 1) {
    if (frames[i].t > targetTime) break;
    chosen = frames[i];
  }
  return chosen;
}

export function getGoalReplayPlaybackTime(replay) {
  return Math.min(replay.span, Math.max(0, (replay.timer - GOAL_REPLAY_DELAY) * GOAL_REPLAY_PLAYBACK_RATE));
}

export function getGoalReplayCameraSetup(frame, replay) {
  const attackSide = replay?.team || (frame.ball.z >= 0 ? 1 : -1);
  const goalZ = attackSide * (FOOTBALL_FIELD_HALF_LENGTH - 0.9);
  const side = attackSide > 0 ? -1 : 1;
  const boxBias = THREE.MathUtils.clamp((attackSide * frame.ball.z - (FOOTBALL_FIELD_HALF_LENGTH - 8.4)) / 5.4, 0, 1);
  const progress = replay ? THREE.MathUtils.clamp(getGoalReplayPlaybackTime(replay) / Math.max(0.001, replay.span), 0, 1) : 0;
  const sweep = Math.sin(progress * Math.PI) * 1.15;
  const x = side * (FOOTBALL_FIELD_HALF_WIDTH + 2.8 - boxBias * 0.35) + side * sweep * 0.42;
  const y = 4.7 - boxBias * 0.32 + Math.sin(progress * Math.PI * 0.8) * 0.12;
  const z = THREE.MathUtils.clamp(THREE.MathUtils.lerp(frame.ball.z, goalZ, 0.16 + boxBias * 0.34), -FOOTBALL_FIELD_HALF_LENGTH + 1.2, FOOTBALL_FIELD_HALF_LENGTH - 1.2);
  const lookX = THREE.MathUtils.lerp(0, frame.ball.x, 0.82);
  const lookY = 1.18;
  const lookZ = THREE.MathUtils.lerp(goalZ, frame.ball.z, 0.18 + boxBias * 0.08) + sweep * 0.08;
  GOAL_REPLAY_CAMERA_SETUP.x = x;
  GOAL_REPLAY_CAMERA_SETUP.y = y;
  GOAL_REPLAY_CAMERA_SETUP.z = z;
  GOAL_REPLAY_CAMERA_SETUP.lookX = lookX;
  GOAL_REPLAY_CAMERA_SETUP.lookY = lookY;
  GOAL_REPLAY_CAMERA_SETUP.lookZ = lookZ;
  return GOAL_REPLAY_CAMERA_SETUP;
}

export function updateGoalReplayState({ dt, state, game = null, replayCard, replayFlash }) {
  const replay = state.goalReplay;
  const replayPhaseActive = game?.celebration?.phase === "replay";
  if (!replay) {
    setElementStylePropertyIfChanged(replayCard, "display", "none");
    setElementStylePropertyIfChanged(replayCard, "opacity", "0");
    setElementStylePropertyIfChanged(replayCard, "transform", GOAL_REPLAY_HIDDEN_TRANSFORM);
    setElementStylePropertyIfChanged(replayCard, "boxShadow", GOAL_REPLAY_RESTING_BOX_SHADOW);
    setElementStylePropertyIfChanged(replayFlash, "opacity", "0");
    return;
  }
  if (!replayPhaseActive) {
    replay.visible = false;
    setElementStylePropertyIfChanged(replayCard, "display", "none");
    setElementStylePropertyIfChanged(replayCard, "opacity", "0");
    setElementStylePropertyIfChanged(replayFlash, "opacity", "0");
    return;
  }
  replay.timer += dt;
  const showDuration = replay.showDuration ?? GOAL_REPLAY_SHOW_TIME;
  const intro = THREE.MathUtils.clamp((replay.timer - GOAL_REPLAY_DELAY) / 0.78, 0, 1);
  const outro = THREE.MathUtils.clamp((showDuration - replay.timer) / 0.62, 0, 1);
  if (replay.timer < GOAL_REPLAY_DELAY || replay.timer > showDuration) {
    replay.visible = false;
  } else {
    replay.visible = true;
    setElementStylePropertyIfChanged(replayCard, "display", "block");
    setElementStylePropertyIfChanged(replayCard, "opacity", String(Math.min(intro, outro)));
    const easedIntro = 1 - Math.pow(1 - intro, 2.2);
    const easedOutro = 1 - Math.pow(1 - outro, 1.6);
    const settlePulse = Math.sin(easedIntro * Math.PI) * Math.max(0, 1 - easedIntro) * 14;
    const depthPulse = Math.sin(easedIntro * Math.PI) * Math.max(0, 1 - easedIntro) * 18;
    const shadowLift = 22 + easedIntro * 14 + Math.max(0, depthPulse) * 0.9;
    const shadowBlur = 60 + easedIntro * 18 + Math.abs(depthPulse) * 1.1;
    const insetGlow = 0.18 + easedIntro * 0.08 + Math.max(0, depthPulse) * 0.002;
    setElementStylePropertyIfChanged(
      replayCard,
      "transform",
      `translate(-50%, -50%) perspective(1400px) rotateY(${(-108 + easedIntro * 112 + settlePulse + (1 - easedOutro) * 20).toFixed(2)}deg) scale(${(0.79 + easedIntro * 0.21 + Math.max(0, 0.025 - Math.abs(settlePulse) * 0.0007) - (1 - easedOutro) * 0.06).toFixed(3)})`
    );
    setElementStylePropertyIfChanged(
      replayCard,
      "boxShadow",
      `0 ${shadowLift.toFixed(1)}px ${shadowBlur.toFixed(1)}px rgba(15,23,42,${(0.38 + easedIntro * 0.12).toFixed(3)}), 0 0 0 1px rgba(255,255,255,${insetGlow.toFixed(3)}) inset`
    );
    const flash = THREE.MathUtils.clamp(1 - Math.max(0, replay.timer - GOAL_REPLAY_DELAY) / 0.48, 0, 1);
    setElementStylePropertyIfChanged(replayFlash, "opacity", String(flash));
    setElementStylePropertyIfChanged(replayFlash, "transform", `translate(-50%, -50%) scale(${(0.84 + (1 - flash) * 0.2).toFixed(3)})`);
  }
  if (!replay.visible) {
    setElementStylePropertyIfChanged(replayCard, "opacity", "0");
    setElementStylePropertyIfChanged(replayCard, "boxShadow", GOAL_REPLAY_RESTING_BOX_SHADOW);
    setElementStylePropertyIfChanged(replayFlash, "opacity", "0");
    if (replay.timer >= showDuration) {
      setElementStylePropertyIfChanged(replayCard, "display", "none");
      state.goalReplay = null;
    }
  }
}

