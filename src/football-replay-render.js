import * as THREE from "./three.js";
import {
  FOOTBALL_BALL_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH
} from "./game-config.js";
import {
  getGoalReplayCameraSetup,
  getGoalReplayFrame,
  getGoalReplayPlaybackTime
} from "./football-presentation.js";
import { getFootballPlayerLabel } from "./football-helpers.js";

const REPLAY_SAVED_BALL = {
  visible: true,
  x: 0,
  y: 0,
  z: 0
};

const REPLAY_SAVED_PLAYERS = [];

export function renderGoalReplay3DView({
  state,
  game,
  pipCamera,
  renderer,
  replayBadge,
  replayCard,
  scene
}) {
  const replay = state.goalReplay;
  if (!replay?.visible) return;
  replayBadge.textContent = replay.scorer ? `SLOW MO | ${getFootballPlayerLabel(replay.scorer)}` : "SLOW MO REPLAY";
  const frame = getGoalReplayFrame(replay, getGoalReplayPlaybackTime(replay));
  if (!frame) return;

  const rect = replayCard.getBoundingClientRect();
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const replayWidth = Math.max(260, Math.round(rect.width));
  const replayHeight = Math.max(146, Math.round(rect.height));
  const replayX = Math.round(rect.left);
  const replayY = Math.round(height - rect.bottom);
  REPLAY_SAVED_BALL.visible = game.ball.visible;
  REPLAY_SAVED_BALL.x = game.ball.position.x;
  REPLAY_SAVED_BALL.y = game.ball.position.y;
  REPLAY_SAVED_BALL.z = game.ball.position.z;

  for (let i = 0; i < game.players.length; i += 1) {
    const player = game.players[i];
    const saved = REPLAY_SAVED_PLAYERS[i] ?? (REPLAY_SAVED_PLAYERS[i] = { x: 0, y: 0, z: 0, yaw: 0 });
    saved.x = player.runner.root.position.x;
    saved.y = player.runner.root.position.y;
    saved.z = player.runner.root.position.z;
    saved.yaw = player.runner.root.rotation.y;
  }

  for (let i = 0; i < game.players.length; i += 1) {
    const sample = frame.players[i];
    if (!sample) continue;
    const p = game.players[i];
    p.runner.root.position.set(sample.x, sample.y, sample.z);
    p.runner.root.rotation.y = sample.yaw ?? p.runner.root.rotation.y;
  }

  game.ball.visible = frame.ball.visible !== false;
  const replayGoalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const replayGoalBackZ = replayGoalLine + FOOTBALL_GOAL_DEPTH - FOOTBALL_BALL_RADIUS * 1.15;
  const replayTeam = replay.team || (frame.ball.z >= 0 ? 1 : -1);
  const replayDepth = frame.ball.z * replayTeam;
  const replayAbsX = Math.abs(frame.ball.x);
  const replayInsideGoal = replayDepth >= replayGoalLine - 0.02 && replayAbsX <= FOOTBALL_GOAL_WIDTH * 0.5 + 0.18;
  const replayBallZ = replayInsideGoal
    ? THREE.MathUtils.clamp(frame.ball.z, -replayGoalBackZ, replayGoalBackZ)
    : frame.ball.z;
  game.ball.position.set(frame.ball.x, frame.ball.y, replayBallZ);

  const setup = getGoalReplayCameraSetup(frame, replay);
  pipCamera.fov = 54;
  pipCamera.aspect = replayWidth / Math.max(1, replayHeight);
  pipCamera.updateProjectionMatrix();
  pipCamera.position.set(setup.x, setup.y, setup.z);
  pipCamera.lookAt(setup.lookX, setup.lookY, setup.lookZ);
  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setViewport(replayX, replayY, replayWidth, replayHeight);
  renderer.setScissor(replayX, replayY, replayWidth, replayHeight);
  renderer.render(scene, pipCamera);
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, width, height);

  game.ball.visible = REPLAY_SAVED_BALL.visible;
  game.ball.position.set(REPLAY_SAVED_BALL.x, REPLAY_SAVED_BALL.y, REPLAY_SAVED_BALL.z);
  for (let i = 0; i < game.players.length; i += 1) {
    const saved = REPLAY_SAVED_PLAYERS[i];
    const p = game.players[i];
    p.runner.root.position.set(saved.x, saved.y, saved.z);
    p.runner.root.rotation.y = saved.yaw;
  }
}

