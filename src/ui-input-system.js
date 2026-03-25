import * as THREE from "./three.js";
import {
  CAMERA_NAMES,
  CAMERA_ZOOM_DEFAULTS,
  CAMERA_ZOOM_DOLLY,
  CAMERA_ZOOM_LIMITS,
  FACE_NAMES
} from "./game-config.js";

const cameraDollyPos = new THREE.Vector3();
const cameraDollyDir = new THREE.Vector3();

export function setupUiInputSystem({
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
}) {
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
    if (touchFaceName) {
      const nextFaceLabel = FACE_NAMES[state.faceMode] || state.faceMode.toUpperCase();
      if (touchFaceName.textContent !== nextFaceLabel) {
        touchFaceName.textContent = nextFaceLabel;
      }
    }
    if (!touchFaceButtons.length) return;
    for (const button of touchFaceButtons) {
      button.classList.toggle("is-active", button.dataset.face === state.faceMode);
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
    const camScale = state.activeCam === 2 ? 0.68 : 1.35;
    setCameraZoomTarget(state.cameraZoomTarget + delta * camScale);
  }

  function updateTouchEquipLabel() {
    if (!touchEquipButton) return;
    if (state.swordHeld) {
      if (touchEquipButton.textContent !== "DROP") {
        touchEquipButton.textContent = "DROP";
      }
      return;
    }
    if (touchEquipButton.textContent !== "PICK UP") {
      touchEquipButton.textContent = "PICK UP";
    }
  }

  function syncTouchCameraButtons() {
    if (touchCameraName) {
      const nextCameraLabel = CAMERA_NAMES[state.activeCam];
      if (touchCameraName.textContent !== nextCameraLabel) {
        touchCameraName.textContent = nextCameraLabel;
      }
    }
    if (!touchCameraButtons.length) return;
    for (const button of touchCameraButtons) {
      button.classList.toggle("is-active", Number(button.dataset.cam) === state.activeCam);
    }
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
      state.cam2CloseUp = false;
      state.cam2Yaw = THREE.MathUtils.degToRad(state.yaw);
    }
    syncTouchCameraButtons();
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

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    pipCamera.fov = camera.fov;
    pipCamera.updateProjectionMatrix();
  }

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

  window.addEventListener("keydown", (event) => {
    const alreadyPressed = state.keys.has(event.code);
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
    if (event.code === "KeyF" && !alreadyPressed) state.pauseFootball = !state.pauseFootball;
    if (event.code === "KeyR" && !alreadyPressed) state.pauseTrack = !state.pauseTrack;
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
  }
  syncTouchCameraButtons();

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

  return {
    adjustTouchZoom,
    dollyCameraTowards,
    getCameraDolly,
    updateTouchEquipLabel
  };
}

