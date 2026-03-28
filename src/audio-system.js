import { FOOTBALL_BALL_RADIUS } from "./game-config.js";

const AudioContextCtor = typeof window !== "undefined"
  ? (window.AudioContext || window.webkitAudioContext)
  : null;
const AUDIO_UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart"];
const KICKOFF_WHISTLE_URL = `${import.meta.env.BASE_URL}audio/kickoff-whistle.mp3`;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createNoiseBuffer(context, durationSeconds = 2) {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * durationSeconds));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < frameCount; i += 1) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.045 * white) / 1.045;
    data[i] = brown * 2.4;
  }
  return buffer;
}

export function createAudioSystem() {
  let audioContext = null;
  let masterGain = null;
  let ambienceGain = null;
  let ambienceSource = null;
  let kickoffWhistleBuffer = null;
  let kickoffWhistleLoadPromise = null;
  let kickoffWhistleFailed = false;
  let unlocked = false;
  let muted = false;
  let unlockInstalled = false;
  let prevBallY = FOOTBALL_BALL_RADIUS;
  let prevBallVelY = 0;
  let lastKickAt = -Infinity;
  let lastBounceAt = -Infinity;
  let lastUiAt = -Infinity;
  let lastWhistleAt = -Infinity;
  let lastGoalAt = -Infinity;

  function hasAudioSupport() {
    return typeof AudioContextCtor === "function";
  }

  function ensureAudioGraph() {
    if (!hasAudioSupport()) return null;
    if (audioContext) return audioContext;
    audioContext = new AudioContextCtor();
    masterGain = audioContext.createGain();
    masterGain.gain.value = muted ? 0 : 0.84;
    masterGain.connect(audioContext.destination);
    return audioContext;
  }

  function getPanNode(pan = 0) {
    const context = ensureAudioGraph();
    if (!context || typeof context.createStereoPanner !== "function") return null;
    const panner = context.createStereoPanner();
    panner.pan.value = clamp(pan, -0.9, 0.9);
    return panner;
  }

  function connectVoice(outputNode, pan = 0) {
    if (!outputNode || !masterGain) return;
    const panner = getPanNode(pan);
    if (panner) {
      outputNode.connect(panner);
      panner.connect(masterGain);
      return;
    }
    outputNode.connect(masterGain);
  }

  function setMasterMuted(nextMuted) {
    muted = Boolean(nextMuted);
    if (!masterGain || !audioContext) return;
    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(muted ? 0 : 0.84, audioContext.currentTime, 0.03);
  }

  function syncAmbience(level = 0.045) {
    if (!ambienceGain || !audioContext) return;
    ambienceGain.gain.cancelScheduledValues(audioContext.currentTime);
    ambienceGain.gain.setTargetAtTime(muted || !unlocked ? 0.0001 : level, audioContext.currentTime, 0.28);
  }

  function ensureAmbience() {
    const context = ensureAudioGraph();
    if (!context || ambienceSource) return;
    const source = context.createBufferSource();
    source.buffer = createNoiseBuffer(context, 2.4);
    source.loop = true;

    const lowpass = context.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1650;
    lowpass.Q.value = 0.35;

    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 130;
    highpass.Q.value = 0.25;

    ambienceGain = context.createGain();
    ambienceGain.gain.value = 0.0001;

    source.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(ambienceGain);
    ambienceGain.connect(masterGain);
    source.start();
    ambienceSource = source;
  }

  async function ensureKickoffWhistleBuffer() {
    const context = ensureAudioGraph();
    if (!context || kickoffWhistleBuffer || kickoffWhistleFailed) return kickoffWhistleBuffer;
    if (kickoffWhistleLoadPromise) return kickoffWhistleLoadPromise;
    kickoffWhistleLoadPromise = fetch(KICKOFF_WHISTLE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Kickoff whistle request failed with ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((decodedBuffer) => {
        kickoffWhistleBuffer = decodedBuffer;
        return decodedBuffer;
      })
      .catch((error) => {
        kickoffWhistleFailed = true;
        console.warn("Kickoff whistle MP3 load failed, falling back to procedural whistle.", error);
        return null;
      })
      .finally(() => {
        kickoffWhistleLoadPromise = null;
      });
    return kickoffWhistleLoadPromise;
  }

  async function unlock() {
    const context = ensureAudioGraph();
    if (!context) return false;
    try {
      if (context.state === "suspended") {
        await context.resume();
      }
      unlocked = true;
      ensureAmbience();
      syncAmbience();
      void ensureKickoffWhistleBuffer();
      return true;
    } catch (error) {
      console.warn("Audio unlock failed", error);
      return false;
    }
  }

  function installUnlockHandlers() {
    if (unlockInstalled || !hasAudioSupport()) return;
    unlockInstalled = true;
    const handleUnlock = () => {
      void unlock().then((didUnlock) => {
        if (!didUnlock) return;
        for (let i = 0; i < AUDIO_UNLOCK_EVENTS.length; i += 1) {
          window.removeEventListener(AUDIO_UNLOCK_EVENTS[i], handleUnlock);
        }
      });
    };
    for (let i = 0; i < AUDIO_UNLOCK_EVENTS.length; i += 1) {
      window.addEventListener(AUDIO_UNLOCK_EVENTS[i], handleUnlock, { passive: true });
    }
  }

  function canPlay() {
    return Boolean(unlocked && audioContext && masterGain && !muted);
  }

  function playUiClick(bright = false) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastUiAt < 0.05) return;
    lastUiAt = time;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = bright ? "triangle" : "square";
    osc.frequency.setValueAtTime(bright ? 860 : 520, time);
    osc.frequency.exponentialRampToValueAtTime(bright ? 420 : 260, time + 0.055);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.045, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);
    connectVoice(gain, bright ? 0.14 : 0);
    osc.connect(gain);
    osc.start(time);
    osc.stop(time + 0.09);
  }

  function playWhistle({ strong = false, x = 0 } = {}) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastWhistleAt < 0.3) return;
    lastWhistleAt = time;
    const pan = clamp(x / 18, -0.75, 0.75);
    const gain = audioContext.createGain();
    const oscA = audioContext.createOscillator();
    const oscB = audioContext.createOscillator();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(strong ? 0.12 : 0.08, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (strong ? 0.34 : 0.24));
    oscA.type = "square";
    oscB.type = "square";
    oscA.frequency.setValueAtTime(strong ? 1880 : 1720, time);
    oscB.frequency.setValueAtTime(strong ? 1965 : 1815, time);
    connectVoice(gain, pan);
    oscA.connect(gain);
    oscB.connect(gain);
    oscA.start(time);
    oscB.start(time);
    oscA.stop(time + (strong ? 0.38 : 0.28));
    oscB.stop(time + (strong ? 0.38 : 0.28));
  }

  function playKickoffWhistle({ x = 0 } = {}) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastWhistleAt < 0.3) return;
    lastWhistleAt = time;
    const pan = clamp(x / 18, -0.75, 0.75);
    if (kickoffWhistleBuffer) {
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = kickoffWhistleBuffer;
      source.playbackRate.value = 1;
      gain.gain.setValueAtTime(0.15, time);
      connectVoice(gain, pan);
      source.connect(gain);
      source.start(time);
      return;
    }
    void ensureKickoffWhistleBuffer();
    playWhistle({ strong: true, x });
  }

  function playBallKick({ power = 5, loft = 0, x = 0 } = {}) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastKickAt < 0.045) return;
    lastKickAt = time;
    const pan = clamp(x / 18, -0.82, 0.82);
    const impact = clamp(power / 12, 0.28, 1.3);

    const osc = audioContext.createOscillator();
    const toneGain = audioContext.createGain();
    osc.type = loft > 0.8 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(96 + impact * 58, time);
    osc.frequency.exponentialRampToValueAtTime(42 + impact * 18, time + 0.07);
    toneGain.gain.setValueAtTime(0.0001, time);
    toneGain.gain.exponentialRampToValueAtTime(0.085 * impact, time + 0.004);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.085);
    connectVoice(toneGain, pan);
    osc.connect(toneGain);
    osc.start(time);
    osc.stop(time + 0.11);

    const noise = audioContext.createBufferSource();
    noise.buffer = createNoiseBuffer(audioContext, 0.12);
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 950 + impact * 900;
    noiseFilter.Q.value = 0.8;
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.0001, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.045 * impact, time + 0.002);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    connectVoice(noiseGain, pan);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noise.start(time);
    noise.stop(time + 0.06);
  }

  function playBounce({ speed = 1, x = 0 } = {}) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastBounceAt < 0.045) return;
    lastBounceAt = time;
    const pan = clamp(x / 18, -0.82, 0.82);
    const intensity = clamp(speed / 4.6, 0.18, 0.9);
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(180 + intensity * 120, time);
    osc.frequency.exponentialRampToValueAtTime(86 + intensity * 38, time + 0.055);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.06 * intensity, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.065);
    connectVoice(gain, pan);
    osc.connect(gain);
    osc.start(time);
    osc.stop(time + 0.09);
  }

  function playGoal({ team = 0, x = 0 } = {}) {
    if (!canPlay()) return;
    const time = audioContext.currentTime;
    if (time - lastGoalAt < 0.8) return;
    lastGoalAt = time;
    const pan = clamp((x + team * 1.6) / 16, -0.75, 0.75);

    const oscA = audioContext.createOscillator();
    const oscB = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscA.type = "sawtooth";
    oscB.type = "triangle";
    oscA.frequency.setValueAtTime(team === 1 ? 440 : 392, time);
    oscA.frequency.exponentialRampToValueAtTime(team === 1 ? 660 : 587, time + 0.16);
    oscB.frequency.setValueAtTime(team === 1 ? 554 : 494, time);
    oscB.frequency.exponentialRampToValueAtTime(team === 1 ? 784 : 698, time + 0.18);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.11, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.46);
    connectVoice(gain, pan);
    oscA.connect(gain);
    oscB.connect(gain);
    oscA.start(time);
    oscB.start(time + 0.01);
    oscA.stop(time + 0.48);
    oscB.stop(time + 0.5);
  }

  function update(dt, game) {
    if (!audioContext) return;
    const ambienceLevel = game?.celebration?.active ? 0.06 : game?.refRestart?.active ? 0.048 : 0.04;
    syncAmbience(ambienceLevel);

    const ball = game?.ball;
    if (!ball) return;
    const groundHit = prevBallY > FOOTBALL_BALL_RADIUS + 0.02
      && ball.position.y <= FOOTBALL_BALL_RADIUS + 0.001
      && prevBallVelY < -0.48;
    if (groundHit) {
      playBounce({
        speed: Math.abs(prevBallVelY) + Math.hypot(game.ballVel.x, game.ballVel.z) * 0.12,
        x: ball.position.x
      });
    }
    prevBallY = ball.position.y;
    prevBallVelY = game.ballVel.y;
  }

  function toggleMute() {
    setMasterMuted(!muted);
    return muted;
  }

  function isMuted() {
    return muted;
  }

  return {
    installUnlockHandlers,
    isMuted,
    playBallKick,
    playGoal,
    playKickoffWhistle,
    playUiClick,
    playWhistle,
    setMuted: setMasterMuted,
    toggleMute,
    unlock,
    update
  };
}
