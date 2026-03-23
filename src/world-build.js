import * as THREE from "./three.js";
import { WORLD_RADIUS } from "./game-config.js";
import { getSharedCircleGeometry } from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";

export function buildFloor() {
  const group = new THREE.Group();

  const disk = new THREE.Mesh(
    getSharedCircleGeometry(WORLD_RADIUS, 96),
    getSharedStandardMaterial(0x367f35, 1)
  );
  disk.rotation.x = -Math.PI / 2;
  disk.receiveShadow = true;
  group.add(disk);

  return group;
}

