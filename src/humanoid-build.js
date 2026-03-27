import * as THREE from "./three.js";
import {
  getSharedCapsuleGeometry,
  getSharedSphereGeometry
} from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";

function makeMat(color, options = {}) {
  const roughness = options.roughness ?? 0.95;
  if (options.sharedMaterial === false) {
    return new THREE.MeshStandardMaterial({ color, roughness });
  }
  return getSharedStandardMaterial(color, roughness);
}

export function addPart(parent, geometry, color, pos, rot, materialOptions) {
  const mesh = new THREE.Mesh(geometry, makeMat(color, materialOptions));
  mesh.position.copy(pos);
  if (rot) mesh.rotation.set(rot.x, rot.y, rot.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function addScaledPart(parent, geometry, color, pos, scale, rot, materialOptions) {
  const mesh = addPart(parent, geometry, color, pos, rot, materialOptions);
  mesh.scale.copy(scale);
  return mesh;
}

export function addHumanoidTorso(parent, palette) {
  const shirtBase = palette.shirt;
  const shirtBright = palette.shirtBright ?? new THREE.Color(shirtBase).multiplyScalar(1.08).getHex();
  const shirtMid = palette.shirtMid ?? new THREE.Color(shirtBase).multiplyScalar(0.94).getHex();
  const shirtDark = palette.shirtDark ?? new THREE.Color(shirtBase).multiplyScalar(0.82).getHex();

  const upperTorso = addScaledPart(
    parent,
    getSharedCapsuleGeometry(0.18, 0.32, 7, 18),
    shirtBase,
    new THREE.Vector3(0, 0.22, 0.015),
    new THREE.Vector3(1.4, 1.02, 1.16)
  );
  upperTorso.rotation.x = THREE.MathUtils.degToRad(-3);

  const lowerTorso = addScaledPart(
    parent,
    getSharedCapsuleGeometry(0.14, 0.26, 7, 18),
    shirtDark,
    new THREE.Vector3(0, -0.025, 0),
    new THREE.Vector3(1.28, 1.06, 1.08)
  );
  lowerTorso.rotation.x = THREE.MathUtils.degToRad(5);

  const chest = addScaledPart(
    parent,
    getSharedSphereGeometry(0.2, 22, 18),
    shirtBright,
    new THREE.Vector3(0, 0.155, 0.12),
    new THREE.Vector3(1.08, 0.92, 0.8)
  );
  chest.rotation.x = THREE.MathUtils.degToRad(-4);

  const belly = addScaledPart(
    parent,
    getSharedSphereGeometry(0.18, 20, 16),
    shirtMid,
    new THREE.Vector3(0, -0.01, 0.115),
    new THREE.Vector3(1.18, 1.02, 0.78)
  );
  belly.rotation.x = THREE.MathUtils.degToRad(8);

  const collar = addScaledPart(
    parent,
    getSharedCapsuleGeometry(0.085, 0.24, 7, 18),
    shirtBright,
    new THREE.Vector3(0, 0.31, 0.03),
    new THREE.Vector3(1, 1, 0.92),
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  collar.rotation.x = THREE.MathUtils.degToRad(-4);

  const leftShoulder = addScaledPart(
    parent,
    getSharedSphereGeometry(0.13, 18, 14),
    shirtBright,
    new THREE.Vector3(0.28, 0.3, 0.025),
    new THREE.Vector3(1.12, 0.84, 1.06)
  );
  leftShoulder.rotation.z = THREE.MathUtils.degToRad(-8);

  const rightShoulder = addScaledPart(
    parent,
    getSharedSphereGeometry(0.13, 18, 14),
    shirtBright,
    new THREE.Vector3(-0.28, 0.3, 0.025),
    new THREE.Vector3(1.12, 0.84, 1.06)
  );
  rightShoulder.rotation.z = THREE.MathUtils.degToRad(8);

  [
    upperTorso,
    lowerTorso,
    chest,
    belly,
    collar,
    leftShoulder,
    rightShoulder
  ].forEach((part) => {
    part.userData.shirtRegion = true;
  });

  return {
    upperTorso,
    lowerTorso,
    chest,
    belly,
    collar,
    leftShoulder,
    rightShoulder,
    leftShoulderAnchor: new THREE.Vector3(0.345, 0.305, 0.03),
    rightShoulderAnchor: new THREE.Vector3(-0.345, 0.305, 0.03)
  };
}

export function addHumanoidHips(parent, color, pos) {
  const hipCore = addScaledPart(
    parent,
    getSharedSphereGeometry(0.2, 20, 16),
    color,
    pos,
    new THREE.Vector3(1.45, 0.92, 1.12)
  );

  addScaledPart(
    parent,
    getSharedSphereGeometry(0.13, 16, 12),
    color,
    new THREE.Vector3(pos.x - 0.2, pos.y + 0.01, pos.z),
    new THREE.Vector3(1.08, 0.92, 1.02)
  );
  addScaledPart(
    parent,
    getSharedSphereGeometry(0.13, 16, 12),
    color,
    new THREE.Vector3(pos.x + 0.2, pos.y + 0.01, pos.z),
    new THREE.Vector3(1.08, 0.92, 1.02)
  );

  return hipCore;
}

export function addHairStyle(head, palette, options = {}) {
  const style = options.style ?? "short";
  const hair = palette.hair;
  const hairDark = options.hairDark ?? new THREE.Color(hair).multiplyScalar(0.72).getHex();
  const hairLight = options.hairLight ?? new THREE.Color(hair).multiplyScalar(1.08).getHex();

  const crown = addPart(
    head,
    getSharedSphereGeometry(0.43, 26, 20, 0, Math.PI * 2, 0, Math.PI * 0.54),
    hair,
    new THREE.Vector3(0, 0.21, -0.045)
  );
  crown.scale.set(0.9, 0.72, 0.92);

  const fringe = addScaledPart(
    head,
    getSharedSphereGeometry(0.16, 18, 14),
    hairLight,
    new THREE.Vector3(0, 0.19, 0.27),
    new THREE.Vector3(1.32, 0.45, 0.6)
  );

  const sideLeft = addScaledPart(
    head,
    getSharedSphereGeometry(0.15, 16, 12),
    hairDark,
    new THREE.Vector3(-0.26, 0.13, 0.06),
    new THREE.Vector3(0.7, 1.05, 0.82)
  );
  const sideRight = addScaledPart(
    head,
    getSharedSphereGeometry(0.15, 16, 12),
    hairDark,
    new THREE.Vector3(0.26, 0.13, 0.06),
    new THREE.Vector3(0.7, 1.05, 0.82)
  );

  if (style === "parted") {
    fringe.scale.set(1.18, 0.36, 0.56);
    fringe.position.y = 0.17;
    fringe.position.z = 0.24;
    fringe.rotation.z = THREE.MathUtils.degToRad(4);

    const part = addScaledPart(
      head,
      getSharedSphereGeometry(0.11, 14, 10),
      hairLight,
      new THREE.Vector3(0.08, 0.26, 0.12),
      new THREE.Vector3(0.86, 0.26, 1.22)
    );
    part.rotation.z = THREE.MathUtils.degToRad(-20);
  } else if (style === "curly") {
    crown.scale.set(0.94, 0.8, 0.95);
    fringe.visible = false;
    const curlOffsets = [
      [-0.2, 0.16, 0.22],
      [0, 0.2, 0.28],
      [0.2, 0.16, 0.22],
      [-0.12, 0.27, 0.11],
      [0.12, 0.27, 0.11]
    ];
    for (let i = 0; i < curlOffsets.length; i += 1) {
      const [x, y, z] = curlOffsets[i];
      addScaledPart(
        head,
        getSharedSphereGeometry(0.095, 14, 12),
        i % 2 === 0 ? hair : hairLight,
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(1.02, 0.98, 0.92)
      );
    }
  } else if (style === "bob") {
    crown.scale.set(0.92, 0.76, 0.95);
    fringe.scale.set(1.08, 0.32, 0.5);
    fringe.position.y = 0.16;
    const back = addScaledPart(
      head,
      getSharedSphereGeometry(0.18, 18, 14),
      hairDark,
      new THREE.Vector3(0, 0.05, -0.16),
      new THREE.Vector3(1.02, 1.2, 0.86)
    );
    back.rotation.x = THREE.MathUtils.degToRad(18);
    sideLeft.scale.set(0.86, 1.4, 0.9);
    sideLeft.position.y = 0.03;
    sideRight.scale.set(0.86, 1.4, 0.9);
    sideRight.position.y = 0.03;
  } else if (style === "spiky") {
    crown.scale.set(0.88, 0.66, 0.9);
    fringe.visible = false;
    const spikeData = [
      { x: -0.18, y: 0.29, z: 0.1, rx: -22, rz: 16, len: 0.18 },
      { x: -0.07, y: 0.33, z: 0.14, rx: -28, rz: 8, len: 0.2 },
      { x: 0.06, y: 0.34, z: 0.14, rx: -28, rz: -8, len: 0.2 },
      { x: 0.18, y: 0.29, z: 0.1, rx: -22, rz: -16, len: 0.18 },
      { x: 0, y: 0.31, z: 0.04, rx: -36, rz: 0, len: 0.17 }
    ];
    for (let i = 0; i < spikeData.length; i += 1) {
      const spike = spikeData[i];
      addPart(
        head,
        getSharedCapsuleGeometry(0.03, spike.len, 4, 8),
        i % 2 === 0 ? hair : hairLight,
        new THREE.Vector3(spike.x, spike.y, spike.z),
        new THREE.Euler(THREE.MathUtils.degToRad(spike.rx), 0, THREE.MathUtils.degToRad(spike.rz))
      );
    }
  } else if (style === "bangs") {
    crown.scale.set(0.91, 0.74, 0.93);
    fringe.scale.set(1.3, 0.52, 0.62);
    fringe.position.set(0, 0.16, 0.28);
    const bangOffsets = [-0.16, -0.05, 0.06, 0.17];
    for (let i = 0; i < bangOffsets.length; i += 1) {
      const x = bangOffsets[i];
      const bang = addPart(
        head,
        getSharedCapsuleGeometry(0.026, 0.1, 4, 8),
        i % 2 === 0 ? hairDark : hair,
        new THREE.Vector3(x, 0.13 - Math.abs(x) * 0.08, 0.31),
        new THREE.Euler(THREE.MathUtils.degToRad(12), 0, THREE.MathUtils.degToRad(x * -32))
      );
      bang.scale.z = 0.82;
    }
  } else if (style === "pigtails") {
    crown.scale.set(0.9, 0.72, 0.92);
    fringe.scale.set(1.1, 0.34, 0.54);
    fringe.position.y = 0.17;
    const tailLeft = addPart(
      head,
      getSharedCapsuleGeometry(0.05, 0.16, 5, 10),
      hairDark,
      new THREE.Vector3(-0.34, 0.08, -0.03),
      new THREE.Euler(THREE.MathUtils.degToRad(8), 0, THREE.MathUtils.degToRad(38))
    );
    tailLeft.scale.set(0.96, 1.08, 0.88);
    const tailRight = addPart(
      head,
      getSharedCapsuleGeometry(0.05, 0.16, 5, 10),
      hairDark,
      new THREE.Vector3(0.34, 0.08, -0.03),
      new THREE.Euler(THREE.MathUtils.degToRad(8), 0, THREE.MathUtils.degToRad(-38))
    );
    tailRight.scale.set(0.96, 1.08, 0.88);
    addScaledPart(
      head,
      getSharedSphereGeometry(0.055, 12, 10),
      hairLight,
      new THREE.Vector3(-0.24, 0.18, 0.02),
      new THREE.Vector3(0.92, 0.82, 0.9)
    );
    addScaledPart(
      head,
      getSharedSphereGeometry(0.055, 12, 10),
      hairLight,
      new THREE.Vector3(0.24, 0.18, 0.02),
      new THREE.Vector3(0.92, 0.82, 0.9)
    );
  } else {
    fringe.rotation.x = THREE.MathUtils.degToRad(-6);
  }

  return { crown, fringe, sideLeft, sideRight };
}

