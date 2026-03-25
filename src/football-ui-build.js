import * as THREE from "./three.js";
import { getSharedPlaneGeometry } from "./shared-geometry.js";

const nameTagTextureCache = new Map();
const numberPatchMaterialCache = new Map();

function getFootballNameTagTexture(text, backgroundColor, textColor) {
  const cacheKey = `${text}|${backgroundColor}|${textColor}`;
  let texture = nameTagTextureCache.get(cacheKey);
  if (texture) return texture;

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

  texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  nameTagTextureCache.set(cacheKey, texture);
  return texture;
}

export function makeFootballNameTag(text, backgroundColor, textColor = "#111827") {
  const texture = getFootballNameTagTexture(text, backgroundColor, textColor);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.94, depthWrite: false }));
  sprite.scale.set(1.18, 0.31, 1);
  sprite.renderOrder = 4;
  return sprite;
}

export function makeFootballNumberPatch(text, backgroundColor, textColor = "#ffffff") {
  const cacheKey = `${text}|${backgroundColor}|${textColor}`;
  let material = numberPatchMaterialCache.get(cacheKey);
  if (!material) {
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
    material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.08, side: THREE.DoubleSide });
    numberPatchMaterialCache.set(cacheKey, material);
  }
  const plate = new THREE.Mesh(getSharedPlaneGeometry(0.22, 0.22), material);
  plate.renderOrder = 3;
  return plate;
}

