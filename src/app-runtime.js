import { updateCameraSystem } from "./camera-system.js";
import { resolveJukuCollisionsRuntime } from "./collision-runtime.js";
import { updateJukuPoseRuntime, updateJukuRuntime } from "./juku-runtime.js";

export function createAppRuntime({
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
}) {
  function resolveJukuCollisions(nextX, nextZ, options = {}) {
    return resolveJukuCollisionsRuntime(nextX, nextZ, footballGame.colliders, options);
  }

  function updateJuku(dt) {
    updateJukuRuntime(dt, {
      state,
      footballGame,
      roadster,
      updateTouchEquipLabel,
      updateTouchRoadsterLabel,
      resolveJukuCollisions,
      clampGoalInteriorPosition
    });
  }

  function updateCamera(dt) {
    updateCameraSystem({
      dt,
      state,
      camera,
      cameraRig,
      footballGame,
      cameraStatus,
      adjustTouchZoom,
      getCameraDolly,
      dollyCameraTowards
    });
  }

  function updateJukuPose() {
    updateJukuPoseRuntime({ state, juku, footballGame, roadster, pickupSceneObjects, faceStatus });
  }

  return {
    updateCamera,
    updateJuku,
    updateJukuPose
  };
}
