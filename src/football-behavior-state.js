import {
  FOOTBALL_BEHAVIOR_PRESET,
  FOOTBALL_BEHAVIOR_PRESETS
} from "./game-config.js";

export function createFootballBehaviorState({ state, behaviorModeButtons }) {
  let footballBehavior = FOOTBALL_BEHAVIOR_PRESETS[state.behaviorPreset]
    ?? FOOTBALL_BEHAVIOR_PRESETS[FOOTBALL_BEHAVIOR_PRESET]
    ?? FOOTBALL_BEHAVIOR_PRESETS.realistic;

  function setFootballBehaviorPreset(preset) {
    if (!FOOTBALL_BEHAVIOR_PRESETS[preset]) return;
    state.behaviorPreset = preset;
    footballBehavior = FOOTBALL_BEHAVIOR_PRESETS[preset];
    for (const button of behaviorModeButtons) {
      button.classList.toggle("is-active", button.dataset.behavior === preset);
      button.setAttribute("aria-pressed", button.dataset.behavior === preset ? "true" : "false");
    }
  }

  function getFootballBehavior() {
    return footballBehavior;
  }

  return {
    getFootballBehavior,
    setFootballBehaviorPreset
  };
}
