export function createUi() {
  const canvas = document.querySelector("#scene");
  const cameraStatus = document.querySelector("#camera-status");
  const faceStatus = document.querySelector("#face-status");
  const scoreStatus = document.querySelector("#score-status");
  const attackStatus = document.querySelector("#attack-status");
  const playerStatus = document.querySelector("#player-status");
  const behaviorModeButtons = Array.from(document.querySelectorAll("[data-behavior]"));
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
  pipFrame.style.zIndex = "14";
  pipFrame.style.border = "2px solid rgba(255,255,255,0.92)";
  pipFrame.style.borderRadius = "14px";
  pipFrame.style.boxShadow = "0 14px 30px rgba(15,23,42,0.28)";
  pipFrame.style.overflow = "hidden";
  pipFrame.style.background = "transparent";
  const pipCanvas = document.createElement("canvas");
  pipCanvas.style.position = "absolute";
  pipCanvas.style.inset = "0";
  pipCanvas.style.width = "100%";
  pipCanvas.style.height = "100%";
  pipCanvas.style.display = "block";
  pipCanvas.style.pointerEvents = "none";
  pipFrame.appendChild(pipCanvas);
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

  const replayCard = document.createElement("div");
  replayCard.style.position = "fixed";
  replayCard.style.left = "50%";
  replayCard.style.top = "50%";
  replayCard.style.width = "min(72vw, 760px)";
  replayCard.style.aspectRatio = "16 / 9";
  replayCard.style.transform = "translate(-50%, -50%) perspective(1400px) rotateY(-96deg) scale(0.86)";
  replayCard.style.transformOrigin = "50% 50%";
  replayCard.style.opacity = "0";
  replayCard.style.display = "none";
  replayCard.style.pointerEvents = "none";
  replayCard.style.zIndex = "19";
  replayCard.style.borderRadius = "28px";
  replayCard.style.overflow = "hidden";
  replayCard.style.background = "rgba(15,23,42,0.08)";
  replayCard.style.border = "2px solid rgba(255,255,255,0.96)";
  replayCard.style.boxShadow = "0 22px 60px rgba(15,23,42,0.4), 0 0 0 1px rgba(255,255,255,0.18) inset";
  const replayCanvas = document.createElement("canvas");
  replayCanvas.style.position = "absolute";
  replayCanvas.style.inset = "0";
  replayCanvas.style.width = "100%";
  replayCanvas.style.height = "100%";
  replayCanvas.style.display = "block";
  replayCanvas.style.pointerEvents = "none";
  replayCard.appendChild(replayCanvas);

  const replayBadge = document.createElement("div");
  replayBadge.textContent = "SLOW MO REPLAY";
  replayBadge.style.position = "absolute";
  replayBadge.style.left = "18px";
  replayBadge.style.top = "18px";
  replayBadge.style.zIndex = "1";
  replayBadge.style.padding = "8px 12px";
  replayBadge.style.borderRadius = "999px";
  replayBadge.style.background = "rgba(15,23,42,0.78)";
  replayBadge.style.color = "#f8fafc";
  replayBadge.style.font = '800 12px/1 "Trebuchet MS", Verdana, sans-serif';
  replayBadge.style.letterSpacing = "0.18em";
  replayBadge.style.textIndent = "0.18em";
  replayBadge.style.textTransform = "uppercase";
  replayCard.appendChild(replayBadge);

  const replayFlash = document.createElement("div");
  replayFlash.textContent = "REPLAY";
  replayFlash.style.position = "absolute";
  replayFlash.style.left = "50%";
  replayFlash.style.top = "50%";
  replayFlash.style.zIndex = "1";
  replayFlash.style.transform = "translate(-50%, -50%) scale(0.88)";
  replayFlash.style.padding = "16px 24px";
  replayFlash.style.borderRadius = "999px";
  replayFlash.style.background = "rgba(255,255,255,0.92)";
  replayFlash.style.color = "#0f172a";
  replayFlash.style.font = '900 clamp(20px, 4vw, 42px)/1 "Trebuchet MS", Verdana, sans-serif';
  replayFlash.style.letterSpacing = "0.22em";
  replayFlash.style.textIndent = "0.22em";
  replayFlash.style.opacity = "0";
  replayFlash.style.mixBlendMode = "screen";
  replayCard.appendChild(replayFlash);
  document.body.appendChild(replayCard);

  const trackTimerPanel = document.createElement("div");
  trackTimerPanel.style.position = "fixed";
  trackTimerPanel.style.right = "14px";
  trackTimerPanel.style.top = "14px";
  trackTimerPanel.style.zIndex = "11";
  trackTimerPanel.style.display = "flex";
  trackTimerPanel.style.flexDirection = "column";
  trackTimerPanel.style.alignItems = "flex-end";
  trackTimerPanel.style.gap = "4px";
  trackTimerPanel.style.padding = "11px 14px 12px";
  trackTimerPanel.style.borderRadius = "18px";
  trackTimerPanel.style.background = "rgba(10, 16, 24, 0.82)";
  trackTimerPanel.style.boxShadow = "0 12px 30px rgba(15, 23, 42, 0.24)";
  trackTimerPanel.style.color = "#f8fafc";
  trackTimerPanel.style.pointerEvents = "none";

  const trackTimerLabel = document.createElement("div");
  trackTimerLabel.textContent = "TRACK TIME";
  trackTimerLabel.style.font = '800 10px/1 "Trebuchet MS", Verdana, sans-serif';
  trackTimerLabel.style.letterSpacing = "0.16em";
  trackTimerLabel.style.color = "#bfdbfe";

  const trackTimerValue = document.createElement("div");
  trackTimerValue.textContent = "00:00.00";
  trackTimerValue.style.font = '900 24px/1 "Trebuchet MS", Verdana, sans-serif';
  trackTimerValue.style.letterSpacing = "0.06em";
  trackTimerValue.style.fontVariantNumeric = "tabular-nums";

  trackTimerPanel.appendChild(trackTimerLabel);
  trackTimerPanel.appendChild(trackTimerValue);
  document.body.appendChild(trackTimerPanel);

  return {
    attackStatus,
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
    trackTimerValue,
    touchCameraButtons,
    touchCameraName,
    touchEquipButton,
    touchFaceButtons,
    touchFaceName,
    touchJoystick,
    touchJoystickThumb,
    touchJumpButton,
    touchZoomInButton,
    touchZoomOutButton
  };
}
