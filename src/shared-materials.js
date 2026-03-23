import * as THREE from "./three.js";

const standardMaterialCache = new Map();

export function getSharedStandardMaterial(color, roughness = 0.95) {
  const key = `${color}:${roughness}`;
  let material = standardMaterialCache.get(key);
  if (!material) {
    material = new THREE.MeshStandardMaterial({ color, roughness });
    standardMaterialCache.set(key, material);
  }
  return material;
}
