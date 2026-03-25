import { defineConfig } from "vite";

function getManualChunk(id) {
  const normalizedId = id.split("\\").join("/");

  if (normalizedId.includes("/node_modules/three/")) {
    return "three-vendor";
  }

  if (
    normalizedId.includes("/src/football-ai.js")
    || normalizedId.includes("/src/football-player-runtime.js")
    || normalizedId.includes("/src/football-player-state-runtime.js")
    || normalizedId.includes("/src/football-player-targeting-runtime.js")
    || normalizedId.includes("/src/football-player-movement-runtime.js")
    || normalizedId.includes("/src/football-target-runtime.js")
    || normalizedId.includes("/src/football-touch-runtime.js")
    || normalizedId.includes("/src/football-touch-decision-runtime.js")
    || normalizedId.includes("/src/football-touch-execution-runtime.js")
  ) {
    return "football-player";
  }

  if (
    normalizedId.includes("/src/camera-system.js")
    || normalizedId.includes("/src/football-ball-runtime.js")
    || normalizedId.includes("/src/football-flow.js")
    || normalizedId.includes("/src/football-match-runtime.js")
    || normalizedId.includes("/src/football-match-state-runtime.js")
    || normalizedId.includes("/src/football-officials-track-runtime.js")
    || normalizedId.includes("/src/football-presentation.js")
    || normalizedId.includes("/src/football-runtime.js")
  ) {
    return "football-world";
  }

  if (
    normalizedId.includes("/src/game-config.js")
    || normalizedId.includes("/src/ui.js")
  ) {
    return "app-shared";
  }

  return undefined;
}

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks: getManualChunk
      }
    }
  }
});
