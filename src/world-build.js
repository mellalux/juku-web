import * as THREE from "./three.js";
import { WORLD_RADIUS } from "./game-config.js";
import { getSharedCircleGeometry } from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";

const WORLD_FLOOR_GEOMETRY = getSharedCircleGeometry(WORLD_RADIUS, 96);
const WORLD_FLOOR_MATERIAL = getSharedStandardMaterial(0x367f35, 1);

export function buildFloor() {
  const group = new THREE.Group();

  const disk = new THREE.Mesh(
    WORLD_FLOOR_GEOMETRY,
    WORLD_FLOOR_MATERIAL
  );
  disk.rotation.x = -Math.PI / 2;
  disk.receiveShadow = true;
  group.add(disk);

  return group;
}

