import * as THREE from "./three.js";
import { RUNNER_BASE_Y } from "./game-config.js";
import {
  addHairStyle,
  addHumanoidHips,
  addHumanoidTorso,
  addPart,
  addScaledPart
} from "./humanoid-build.js";
import {
  getSharedBoxGeometry,
  getSharedCapsuleGeometry,
  getSharedCylinderGeometry,
  getSharedSphereGeometry,
  getSharedTorusGeometry
} from "./shared-geometry.js";

function buildOpenHand(parent, palette, side, { addScaledPart }) {
  const hand = new THREE.Group();
  parent.add(hand);

  addScaledPart(
    hand,
    getSharedSphereGeometry(0.07, 18, 14),
    palette.skin,
    new THREE.Vector3(0, -0.065, 0.028),
    new THREE.Vector3(0.66, 0.48, 1.02)
  );
  addScaledPart(
    hand,
    getSharedSphereGeometry(0.05, 16, 12),
    palette.skin,
    new THREE.Vector3(0, -0.108, 0.01),
    new THREE.Vector3(0.52, 0.3, 0.72)
  );
  addScaledPart(
    hand,
    getSharedSphereGeometry(0.055, 16, 12),
    palette.skin,
    new THREE.Vector3(-side * 0.028, -0.062, -0.004),
    new THREE.Vector3(0.72, 0.58, 1.0)
  );

  const fingerData = [
    { x: -0.026, len1: 0.058, len2: 0.041, spread: -16 },
    { x: -0.009, len1: 0.083, len2: 0.057, spread: -6 },
    { x: 0.01, len1: 0.078, len2: 0.054, spread: 4 },
    { x: 0.026, len1: 0.056, len2: 0.039, spread: 13 }
  ];

  fingerData.forEach(({ x, len1, len2, spread }, index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.028, 0.075);
    pivot.rotation.set(THREE.MathUtils.degToRad(index + 1), THREE.MathUtils.degToRad(side * spread), 0);
    hand.add(pivot);

    addScaledPart(
      pivot,
      getSharedCapsuleGeometry(0.0086, len1 - 0.017, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len1 * 0.5, 0),
      new THREE.Vector3(0.95, 1, 0.95)
    );

    const mid = new THREE.Group();
    mid.position.y = -len1;
    mid.rotation.x = THREE.MathUtils.degToRad(8 + index);
    pivot.add(mid);
    addScaledPart(
      mid,
      getSharedCapsuleGeometry(0.0071, len2 - 0.015, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len2 * 0.5, 0),
      new THREE.Vector3(0.94, 1, 0.94)
    );
  });

  const thumbBase = new THREE.Group();
  thumbBase.position.set(-side * 0.048, -0.08, 0.004);
  thumbBase.rotation.set(
    THREE.MathUtils.degToRad(-16),
    THREE.MathUtils.degToRad(-side * 58),
    THREE.MathUtils.degToRad(-side * 22)
  );
  hand.add(thumbBase);

  addScaledPart(
    thumbBase,
    getSharedCapsuleGeometry(0.0082, 0.026, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.019, 0),
    new THREE.Vector3(1, 1, 0.95)
  );
  const thumbTip = new THREE.Group();
  thumbTip.position.y = -0.038;
  thumbTip.rotation.x = THREE.MathUtils.degToRad(-6);
  thumbBase.add(thumbTip);
  addScaledPart(
    thumbTip,
    getSharedCapsuleGeometry(0.0065, 0.02, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.015, 0),
    new THREE.Vector3(1, 1, 0.95)
  );

  return hand;
}

function buildSwordHand(parent, palette, side, { addScaledPart }) {
  const hand = new THREE.Group();
  parent.add(hand);

  addScaledPart(
    hand,
    getSharedSphereGeometry(0.074, 18, 14),
    palette.skin,
    new THREE.Vector3(0, -0.058, 0.034),
    new THREE.Vector3(0.76, 0.5, 1.06)
  );
  addScaledPart(
    hand,
    getSharedSphereGeometry(0.052, 16, 12),
    palette.skin,
    new THREE.Vector3(0, -0.1, 0.004),
    new THREE.Vector3(0.56, 0.34, 0.78)
  );

  const fingerData = [
    { x: -0.028, len1: 0.062, len2: 0.045, spread: -7 },
    { x: -0.01, len1: 0.078, len2: 0.056, spread: -3 },
    { x: 0.01, len1: 0.076, len2: 0.054, spread: 3 },
    { x: 0.028, len1: 0.06, len2: 0.043, spread: 7 }
  ];

  fingerData.forEach(({ x, len1, len2, spread }, index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.034, 0.066);
    pivot.rotation.set(THREE.MathUtils.degToRad(24 + index * 2), THREE.MathUtils.degToRad(side * spread), 0);
    hand.add(pivot);

    addScaledPart(
      pivot,
      getSharedCapsuleGeometry(0.0105, len1 - 0.018, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len1 * 0.5, 0),
      new THREE.Vector3(1, 1, 0.96)
    );

    const mid = new THREE.Group();
    mid.position.y = -len1;
    mid.rotation.x = THREE.MathUtils.degToRad(18);
    pivot.add(mid);
    addScaledPart(
      mid,
      getSharedCapsuleGeometry(0.0085, len2 - 0.015, 4, 8),
      palette.skin,
      new THREE.Vector3(0, -len2 * 0.5, 0),
      new THREE.Vector3(1, 1, 0.96)
    );
  });

  const thumbBase = new THREE.Group();
  thumbBase.position.set(-side * 0.04, -0.048, 0.052);
  thumbBase.rotation.set(
    THREE.MathUtils.degToRad(-30),
    THREE.MathUtils.degToRad(-side * 46),
    THREE.MathUtils.degToRad(-side * 16)
  );
  hand.add(thumbBase);

  addScaledPart(
    thumbBase,
    getSharedCapsuleGeometry(0.009, 0.03, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.02, 0),
    new THREE.Vector3(1, 1, 0.96)
  );
  const thumbTip = new THREE.Group();
  thumbTip.position.y = -0.04;
  thumbTip.rotation.x = THREE.MathUtils.degToRad(-10);
  thumbBase.add(thumbTip);
  addScaledPart(
    thumbTip,
    getSharedCapsuleGeometry(0.007, 0.023, 4, 8),
    palette.skin,
    new THREE.Vector3(0, -0.016, 0),
    new THREE.Vector3(1, 1, 0.96)
  );

  return hand;
}

export function buildArm(palette, swordHand, deps) {
  const { addPart } = deps;
  const root = new THREE.Group();
  const upperPivot = new THREE.Group();
  const lowerPivot = new THREE.Group();
  const handPivot = new THREE.Group();
  root.add(upperPivot);
  addPart(upperPivot, getSharedSphereGeometry(0.076, 18, 14), palette.skin, new THREE.Vector3(0, 0, 0));
  addPart(upperPivot, getSharedCylinderGeometry(0.058, 0.05, 0.31, 18), palette.skin, new THREE.Vector3(0, -0.155, 0));
  lowerPivot.position.set(0, -0.31, 0);
  upperPivot.add(lowerPivot);
  addPart(lowerPivot, getSharedSphereGeometry(0.06, 16, 12), palette.skin, new THREE.Vector3(0, 0, 0));
  addPart(lowerPivot, getSharedCylinderGeometry(0.047, 0.04, 0.28, 18), palette.skin, new THREE.Vector3(0, -0.14, 0));
  handPivot.position.set(0, -0.28, 0);
  lowerPivot.add(handPivot);

  if (swordHand) {
    const openHand = buildOpenHand(handPivot, palette, -1, deps);
    const gripHand = buildSwordHand(handPivot, palette, -1, deps);
    gripHand.visible = false;
    return { root, upperPivot, lowerPivot, handPivot, swordHand, openHand, gripHand };
  }

  const openHand = buildOpenHand(handPivot, palette, 1, deps);
  return { root, upperPivot, lowerPivot, handPivot, swordHand, openHand, gripHand: null };
}

export function buildLeg(palette, { addPart, addScaledPart }) {
  const root = new THREE.Group();
  const kneePivot = new THREE.Group();
  const footPivot = new THREE.Group();
  addPart(root, getSharedSphereGeometry(0.086, 16, 12), palette.pants, new THREE.Vector3(0, 0, 0));
  addPart(root, getSharedCylinderGeometry(0.082, 0.068, 0.5, 18), palette.pants, new THREE.Vector3(0, -0.25, 0));
  kneePivot.position.set(0, -0.5, 0);
  root.add(kneePivot);
  addPart(kneePivot, getSharedSphereGeometry(0.086, 14, 10), palette.pants, new THREE.Vector3(0, 0, 0));
  addScaledPart(
    kneePivot,
    getSharedSphereGeometry(0.05, 12, 10),
    0xe0464d,
    new THREE.Vector3(0, 0.009, 0.058),
    new THREE.Vector3(0.96, 0.72, 0.48)
  );
  addPart(kneePivot, getSharedCylinderGeometry(0.07, 0.058, 0.44, 18), palette.pants, new THREE.Vector3(0, -0.22, 0));
  footPivot.position.set(0, -0.44, 0);
  kneePivot.add(footPivot);
  addPart(footPivot, getSharedSphereGeometry(0.074, 12, 10), palette.shoe, new THREE.Vector3(0, 0, 0));
  addScaledPart(
    footPivot,
    getSharedSphereGeometry(0.12, 18, 14),
    palette.shoe,
    new THREE.Vector3(0, -0.042, 0.112),
    new THREE.Vector3(0.96, 0.36, 1.72)
  );
  addScaledPart(
    footPivot,
    getSharedSphereGeometry(0.08, 16, 12),
    0x232427,
    new THREE.Vector3(0, -0.018, 0.238),
    new THREE.Vector3(1, 0.38, 0.98)
  );
  return { root, kneePivot, footPivot };
}

export function buildSword() {
  const root = new THREE.Group();
  addPart(root, getSharedCylinderGeometry(0.016, 0.014, 0.16, 12), 0x5b381a, new THREE.Vector3(0, -0.1, 0.014), new THREE.Euler(0, 0, 0));
  addPart(root, getSharedSphereGeometry(0.024, 12, 10), 0xb7bcc5, new THREE.Vector3(0, -0.182, 0.014));
  addPart(root, getSharedCylinderGeometry(0.082, 0.082, 0.01, 20), 0xc8ccd2, new THREE.Vector3(0, 0, 0.032), new THREE.Euler(Math.PI / 2, 0, 0));
  const bladeColors = [0xdce3ff, 0xbfe3ff, 0xb1f5d4, 0xd4ef57, 0xf59d64, 0xe989d6];
  const bladeSegments = [];
  bladeColors.forEach((color, index) => {
    const segment = addPart(
      root,
      getSharedBoxGeometry(0.034, 0.075, 0.024),
      color,
      new THREE.Vector3(0, -0.12 - index * 0.075, 0.032),
      undefined,
      { sharedMaterial: false }
    );
    bladeSegments.push(segment);
  });
  const tip = addPart(
    root,
    getSharedCylinderGeometry(0.014, 0.0045, 0.15, 12),
    0xf1f4fb,
    new THREE.Vector3(0, -0.64, 0.032),
    undefined,
    { sharedMaterial: false }
  );
  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return { root, bladeSegments, tip };
}

export function buildJuku() {
  const root = new THREE.Group();
  root.position.y = RUNNER_BASE_Y;

  const palette = {
    skin: 0xe7c1a3,
    shirt: 0x2d63b5,
    pants: 0xc5202a,
    shoe: 0x151618,
    hair: 0x2f1a0f,
    white: 0xf6f7fb,
    hairStyle: "short"
  };
  const limbDeps = { addPart, addScaledPart };

  const torso = new THREE.Group();
  torso.position.set(0, 2.15, -0.03);
  root.add(torso);
  const hips = addHumanoidHips(root, palette.pants, new THREE.Vector3(0, 1.81, -0.02));
  addHumanoidTorso(torso, {
    shirt: palette.shirt,
    shirtBright: 0x3b6fc1,
    shirtMid: 0x3768b7,
    shirtDark: 0x275aa4
  });

  addPart(root, getSharedTorusGeometry(0.17, 0.04, 10, 20), palette.white, new THREE.Vector3(0, 2.75, 0.02), new THREE.Euler(Math.PI / 2, 0, 0));
  const neck = addPart(root, getSharedCylinderGeometry(0.1, 0.12, 0.22, 16), palette.skin, new THREE.Vector3(0, 2.88, 0.01));
  neck.scale.z = 0.9;

  const head = new THREE.Group();
  head.position.set(0, 3.27, 0);
  root.add(head);

  const skull = addPart(head, getSharedSphereGeometry(0.44, 30, 22), palette.skin, new THREE.Vector3(0, 0, 0));
  skull.scale.set(0.92, 1.02, 0.95);
  addPart(head, getSharedSphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(-0.4, 0.03, 0));
  addPart(head, getSharedSphereGeometry(0.09, 16, 12), palette.skin, new THREE.Vector3(0.4, 0.03, 0));

  addHairStyle(head, palette, { style: palette.hairStyle });

  const leftEye = new THREE.Group();
  leftEye.position.set(-0.138, 0.058, 0.372);
  head.add(leftEye);
  leftEye.scale.z = 0.62;
  addPart(leftEye, getSharedSphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  const leftPupil = addPart(leftEye, getSharedSphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(leftEye, getSharedSphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));
  const leftUpperLid = addScaledPart(
    leftEye,
    getSharedSphereGeometry(0.05, 14, 10),
    palette.skin,
    new THREE.Vector3(0, 0.046, 0.03),
    new THREE.Vector3(1.7, 0.19, 0.54)
  );
  const leftLowerLid = addScaledPart(
    leftEye,
    getSharedSphereGeometry(0.048, 14, 10),
    palette.skin,
    new THREE.Vector3(0, -0.046, 0.03),
    new THREE.Vector3(1.65, 0.13, 0.52)
  );
  leftUpperLid.visible = false;
  leftLowerLid.visible = false;

  const rightEye = new THREE.Group();
  rightEye.position.set(0.138, 0.058, 0.372);
  head.add(rightEye);
  rightEye.scale.z = 0.62;
  addPart(rightEye, getSharedSphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  const rightPupil = addPart(rightEye, getSharedSphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(rightEye, getSharedSphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));
  const rightUpperLid = addScaledPart(
    rightEye,
    getSharedSphereGeometry(0.05, 14, 10),
    palette.skin,
    new THREE.Vector3(0, 0.046, 0.03),
    new THREE.Vector3(1.7, 0.19, 0.54)
  );
  const rightLowerLid = addScaledPart(
    rightEye,
    getSharedSphereGeometry(0.048, 14, 10),
    palette.skin,
    new THREE.Vector3(0, -0.046, 0.03),
    new THREE.Vector3(1.65, 0.13, 0.52)
  );
  rightUpperLid.visible = false;
  rightLowerLid.visible = false;

  const leftBrow = addPart(
    head,
    getSharedCapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(-0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(82))
  );
  const rightBrow = addPart(
    head,
    getSharedCapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-82))
  );
  const nose = addPart(head, getSharedSphereGeometry(0.06, 14, 12), 0xdb9086, new THREE.Vector3(0, -0.022, 0.45));
  nose.scale.set(1.08, 1, 1.35);
  const mouth = new THREE.Group();
  mouth.position.set(0, -0.17, 0.402);
  head.add(mouth);
  const mouthLine = addScaledPart(
    mouth,
    getSharedSphereGeometry(0.046, 16, 12),
    0xb8484f,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2.18, 0.25, 0.56)
  );
  const mouthInner = addScaledPart(
    mouth,
    getSharedSphereGeometry(0.042, 16, 12),
    0x5d171d,
    new THREE.Vector3(0, -0.008, 0.016),
    new THREE.Vector3(1.42, 0.1, 0.44)
  );
  const tongue = addScaledPart(
    mouth,
    getSharedSphereGeometry(0.024, 12, 10),
    0xd9858b,
    new THREE.Vector3(0, -0.022, 0.024),
    new THREE.Vector3(1.55, 0.32, 1.02)
  );

  const leftArm = buildArm(palette, false, limbDeps);
  const rightArm = buildArm(palette, true, limbDeps);
  leftArm.root.position.set(0.43, 2.5, 0.01);
  rightArm.root.position.set(-0.43, 2.5, 0.01);
  root.add(leftArm.root, rightArm.root);

  const heldSword = buildSword();
  heldSword.root.scale.setScalar(1.08);
  heldSword.root.position.set(0.018, -0.1, 0.19);
  heldSword.root.rotation.set(THREE.MathUtils.degToRad(-104), 0, THREE.MathUtils.degToRad(-10));
  rightArm.handPivot.add(heldSword.root);

  const leftLeg = buildLeg(palette, limbDeps);
  const rightLeg = buildLeg(palette, limbDeps);
  leftLeg.root.position.set(0.155, 1.59, -0.02);
  rightLeg.root.position.set(-0.155, 1.59, -0.02);
  root.add(leftLeg.root, rightLeg.root);

  return {
    root,
    hips,
    torso,
    head,
    leftEye,
    rightEye,
    leftUpperLid,
    leftLowerLid,
    rightUpperLid,
    rightLowerLid,
    leftPupil,
    rightPupil,
    pupilBase: {
      left: new THREE.Vector3(0, -0.007, 0.048),
      right: new THREE.Vector3(0, -0.007, 0.048)
    },
    leftBrow,
    rightBrow,
    browBase: {
      left: new THREE.Vector3(-0.17, 0.18, 0.38),
      right: new THREE.Vector3(0.17, 0.18, 0.38)
    },
    mouth,
    mouthLine,
    mouthInner,
    tongue,
    leftArm,
    rightArm,
    heldSword,
    leftLeg,
    rightLeg
  };
}

