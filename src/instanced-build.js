import * as THREE from "./three.js";

const defaultPosition = new THREE.Vector3(0, 0, 0);
const defaultScale = new THREE.Vector3(1, 1, 1);
const scratchColor = new THREE.Color();
const scratchObject = new THREE.Object3D();

export function createInstancedMesh({
  geometry,
  material,
  count,
  castShadow = true,
  receiveShadow = true
}) {
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  return mesh;
}

export function setAnchoredInstanceTransform(mesh, index, anchor, instance = {}) {
  const position = instance.position ?? defaultPosition;
  const rotation = instance.rotation;
  const scale = instance.scale ?? defaultScale;

  scratchObject.position.copy(position);
  if (rotation) {
    scratchObject.rotation.set(rotation.x, rotation.y, rotation.z);
  } else {
    scratchObject.rotation.set(0, 0, 0);
  }
  scratchObject.scale.copy(scale);
  scratchObject.updateMatrix();
  anchor.updateWorldMatrix(true, false);
  scratchObject.matrix.premultiply(anchor.matrixWorld);
  mesh.setMatrixAt(index, scratchObject.matrix);

  if (instance.color != null) {
    mesh.setColorAt(index, scratchColor.set(instance.color));
  }
}

export function commitInstancedMesh(mesh) {
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }
}

export function createStaticInstancedMesh({
  geometry,
  material,
  instances,
  castShadow = true,
  receiveShadow = true
}) {
  const mesh = createInstancedMesh({
    geometry,
    material,
    count: instances.length,
    castShadow,
    receiveShadow
  });

  for (let i = 0; i < instances.length; i += 1) {
    const instance = instances[i] ?? {};
    const position = instance.position ?? defaultPosition;
    const rotation = instance.rotation;
    const scale = instance.scale ?? defaultScale;

    scratchObject.position.copy(position);
    if (rotation) {
      scratchObject.rotation.set(rotation.x, rotation.y, rotation.z);
    } else {
      scratchObject.rotation.set(0, 0, 0);
    }
    scratchObject.scale.copy(scale);
    scratchObject.updateMatrix();
    if (instance.anchorMatrix) {
      scratchObject.matrix.premultiply(instance.anchorMatrix);
    }
    mesh.setMatrixAt(i, scratchObject.matrix);

    if (instance.color != null) {
      mesh.setColorAt(i, scratchColor.set(instance.color));
    }
  }

  commitInstancedMesh(mesh);

  return mesh;
}
