import * as THREE from "./three.js";
import {
  ATHLETE_SCALE,
  JUKU_BASE_Y,
  RUNNER_BASE_Y,
  RUNNER_GROUND_OFFSET
} from "./game-config.js";
import {
  addHairStyle,
  addHumanoidHips,
  addHumanoidTorso,
  addPart,
  addScaledPart
} from "./humanoid-build.js";
import { buildArm, buildLeg } from "./juku-build.js";
import {
  getSharedCapsuleGeometry,
  getSharedCylinderGeometry,
  getSharedSphereGeometry,
  getSharedTorusGeometry
} from "./shared-geometry.js";

const stripedShirtMaterialCache = new Map();

function getKeeperDiveState(amount = 0) {
  const diveAmount = THREE.MathUtils.clamp(amount, 0, 1);
  const progress = 1 - diveAmount;
  const takeoff = THREE.MathUtils.smoothstep(diveAmount, 0.14, 0.96)
    * (1 - THREE.MathUtils.smoothstep(progress, 0.22, 0.54));
  const airborne = THREE.MathUtils.smoothstep(progress, 0.08, 0.34)
    * (1 - THREE.MathUtils.smoothstep(progress, 0.52, 0.82));
  const landing = THREE.MathUtils.smoothstep(progress, 0.46, 0.98);
  return {
    amount: diveAmount,
    progress,
    takeoff,
    airborne,
    landing,
    pose: THREE.MathUtils.clamp(takeoff * 0.82 + airborne * 1.06 + landing * 0.94, 0, 1.08),
    reach: THREE.MathUtils.clamp(takeoff * 0.9 + airborne * 1.12 + landing * 0.54, 0, 1.16),
    roll: THREE.MathUtils.clamp(airborne * 0.96 + landing * 1.14 + takeoff * 0.18, 0, 1.28),
    lift: Math.sin(THREE.MathUtils.clamp(progress / 0.74, 0, 1) * Math.PI),
    skid: landing * landing
  };
}

function makeStripedShirtMaterial(base = 0xf7f7f4, stripe = 0x111214) {
  const cacheKey = `${base}|${stripe}`;
  const cachedMaterial = stripedShirtMaterialCache.get(cacheKey);
  if (cachedMaterial) return cachedMaterial;

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = `#${base.toString(16).padStart(6, "0")}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#${stripe.toString(16).padStart(6, "0")}`;
  const stripeWidth = 6;
  const gap = 4;
  for (let x = 0; x < canvas.width; x += stripeWidth + gap) {
    ctx.fillRect(x, 0, stripeWidth, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 0.92
  });
  stripedShirtMaterialCache.set(cacheKey, material);
  return material;
}

export function applyStripedShirtToTorso(torso, base = 0xf7f7f4, stripe = 0x111214) {
  const stripedMaterial = makeStripedShirtMaterial(base, stripe);
  torso.traverse((obj) => {
    if (!obj.isMesh || !obj.userData.shirtRegion) return;
    obj.material = stripedMaterial;
  });
}

export function buildRunner(colors) {
  const palette = {
    skin: colors.skin ?? 0xe7c1a3,
    shirt: colors.shirt ?? 0x2e61b1,
    pants: colors.shorts ?? 0x1f2f43,
    shoe: colors.shoe ?? 0x161718,
    hair: colors.hair ?? 0x2f1a0f,
    white: 0xf6f7fb,
    hairStyle: colors.hairStyle ?? "short"
  };
  const shirtBright = new THREE.Color(palette.shirt).multiplyScalar(1.08).getHex();
  const shirtDark = new THREE.Color(palette.shirt).multiplyScalar(0.82).getHex();
  const shirtMid = new THREE.Color(palette.shirt).multiplyScalar(0.94).getHex();
  const limbDeps = { addPart, addScaledPart };

  const root = new THREE.Group();
  root.position.y = JUKU_BASE_Y;

  const torso = new THREE.Group();
  torso.position.set(0, 2.15, -0.03);
  root.add(torso);
  const hips = addHumanoidHips(root, palette.pants, new THREE.Vector3(0, 1.81, -0.02));
  const torsoShape = addHumanoidTorso(torso, {
    shirt: palette.shirt,
    shirtBright,
    shirtMid,
    shirtDark
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
  addPart(leftEye, getSharedSphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(leftEye, getSharedSphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));

  const rightEye = new THREE.Group();
  rightEye.position.set(0.138, 0.058, 0.372);
  head.add(rightEye);
  rightEye.scale.z = 0.62;
  addPart(rightEye, getSharedSphereGeometry(0.072, 18, 14), 0xffffff, new THREE.Vector3(0, 0, 0));
  addPart(rightEye, getSharedSphereGeometry(0.031, 14, 10), 0x3c79f5, new THREE.Vector3(0, -0.007, 0.048));
  addPart(rightEye, getSharedSphereGeometry(0.015, 10, 8), 0x131417, new THREE.Vector3(0, -0.007, 0.073));

  addPart(
    head,
    getSharedCapsuleGeometry(0.012, 0.08, 4, 8),
    palette.hair,
    new THREE.Vector3(-0.17, 0.18, 0.38),
    new THREE.Euler(0, 0, THREE.MathUtils.degToRad(82))
  );
  addPart(
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
  addScaledPart(
    mouth,
    getSharedSphereGeometry(0.046, 16, 12),
    0xb8484f,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2.18, 0.25, 0.56)
  );
  addScaledPart(
    mouth,
    getSharedSphereGeometry(0.042, 16, 12),
    0x5d171d,
    new THREE.Vector3(0, -0.008, 0.016),
    new THREE.Vector3(1.42, 0.1, 0.44)
  );

  const leftArmRig = buildArm(palette, false, limbDeps);
  const rightArmRig = buildArm(palette, false, limbDeps);
  leftArmRig.root.position.copy(torsoShape.leftShoulderAnchor);
  rightArmRig.root.position.copy(torsoShape.rightShoulderAnchor);
  torso.add(leftArmRig.root, rightArmRig.root);

  const leftLegRig = buildLeg(palette, limbDeps);
  const rightLegRig = buildLeg(palette, limbDeps);
  leftLegRig.root.position.set(0.155, 1.59, -0.02);
  rightLegRig.root.position.set(-0.155, 1.59, -0.02);
  root.add(leftLegRig.root, rightLegRig.root);

  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return {
    root,
    hips,
    torso,
    torsoPivot: torso,
    head,
    leftArmRig,
    rightArmRig,
    leftArm: leftArmRig.upperPivot,
    rightArm: rightArmRig.upperPivot,
    leftLegRig,
    rightLegRig,
    leftLeg: leftLegRig.root,
    rightLeg: rightLegRig.root,
    mouth,
    baseYUnscaled: RUNNER_BASE_Y,
    baseY: RUNNER_BASE_Y,
    groundOffset: RUNNER_GROUND_OFFSET,
    idleBreathScale: 0.35 + Math.random() * 0.65,
    idleBreathPhase: Math.random() * Math.PI * 2,
    nativeScale: 1 / ATHLETE_SCALE,
    motionScale: 1,
    runnerStyle: colors.runnerStyle ?? "juku"
  };
}

export function scaleRunner(runner, scale = ATHLETE_SCALE) {
  const totalScale = scale * (runner.nativeScale ?? 1);
  runner.motionScale = totalScale;
  runner.root.scale.setScalar(totalScale);
  const baseYUnscaled = runner.baseYUnscaled ?? runner.baseY;
  runner.baseY = baseYUnscaled * totalScale;
  runner.root.position.y = runner.baseY + (runner.groundOffset ?? 0);
  return runner;
}

export function animateRunner(runner, speed, cycle, jumpY = 0, specialPose = null) {
  const kickAmount = THREE.MathUtils.clamp(specialPose?.kickAmount ?? 0, 0, 1);
  const kickSide = specialPose?.kickSide === 0 ? 1 : Math.sign(specialPose?.kickSide ?? 1);
  const sprintAmount = THREE.MathUtils.clamp(specialPose?.sprintAmount ?? 0, 0, 1);
  const sideStepAmount = THREE.MathUtils.clamp(
    specialPose?.sideStepAmount ?? (specialPose?.type === "sideStep" ? specialPose.amount ?? 0 : 0),
    0,
    1
  );
  const sideStepDir = specialPose?.sideStepDir != null && specialPose.sideStepDir !== 0
    ? Math.sign(specialPose.sideStepDir)
    : specialPose?.type === "sideStep" && specialPose.dir !== 0
      ? Math.sign(specialPose.dir ?? 1)
      : 1;
  const backpedalAmount = THREE.MathUtils.clamp(
    specialPose?.backpedalAmount ?? (specialPose?.type === "backpedal" ? specialPose.amount ?? 0 : 0),
    0,
    1
  );
  const keeperSetAmount = THREE.MathUtils.clamp(specialPose?.keeperSetAmount ?? 0, 0, 1);
  const keeperSetDir = specialPose?.keeperSetDir === 0 ? 1 : Math.sign(specialPose?.keeperSetDir ?? 1);
  const celebrationAmount = THREE.MathUtils.clamp(specialPose?.type === "celebration" ? specialPose.amount ?? 0 : 0, 0, 1);
  const celebrationSide = specialPose?.side === 0 ? 1 : Math.sign(specialPose?.side ?? 1);
  const celebrationBounce = THREE.MathUtils.clamp(specialPose?.bounce ?? 0, 0, 1);
  const keeperDiveState = specialPose?.type === "keeperDive"
    ? getKeeperDiveState(specialPose.amount ?? 0)
    : null;
  const keeperDiveAmount = keeperDiveState?.amount ?? 0;
  const keeperDiveDir = specialPose?.type === "keeperDive" && specialPose.dir !== 0 ? Math.sign(specialPose.dir ?? 1) : 1;
  const keeperDiveHeight = THREE.MathUtils.clamp(specialPose?.type === "keeperDive" ? specialPose.saveHeight ?? 0.45 : 0.45, 0, 1);

  if (runner.runnerStyle !== "juku") {
    const blend = THREE.MathUtils.clamp(speed / 2.8, 0, 1);
    const idleLock = blend < 0.035
      && sprintAmount < 0.05
      && sideStepAmount < 0.02
      && backpedalAmount < 0.02
      && keeperSetAmount < 0.02
      && celebrationAmount < 0.02
      && keeperDiveAmount < 0.02
      && kickAmount < 0.02
      && Math.abs(jumpY) < 0.001;
    const happy = 0.62 + 0.38 * blend;
    const strideBoost = 1 + sprintAmount * 0.35;
    const athleteKneeLift = runner.athleteKneeLift ?? 1;
    const kneeLiftScale = THREE.MathUtils.clamp(0.82 + (athleteKneeLift - 0.9) * 0.45, 0.72, 1.04);
    const swing = Math.sin(cycle) * 0.84 * blend * strideBoost * kneeLiftScale;
    const reverseSwing = -Math.sin(cycle) * 0.66 * blend * (0.86 + sprintAmount * 0.08) * kneeLiftScale;
    const locomotionSwing = THREE.MathUtils.lerp(swing, reverseSwing, backpedalAmount);
    const sideSwing = Math.sin(cycle) * 0.82 * sideStepAmount;
    const motionScale = runner.motionScale ?? 1;
    const bounce = Math.abs(Math.sin(cycle * 1.08)) * 0.032 * happy * (1 + sprintAmount * 0.22) * motionScale;
    const diveLift = (keeperDiveState?.lift ?? 0) * (0.3 + keeperDiveHeight * 0.24) * motionScale;
    const diveSkid = (keeperDiveState?.skid ?? 0) * (0.05 + keeperDiveHeight * 0.025) * motionScale;
    const groundedKeeper = (keeperSetAmount > 0.02 || sideStepAmount > 0.02) && keeperDiveAmount <= 0.001;
    runner.root.position.y = runner.baseY + (runner.groundOffset ?? 0) + (groundedKeeper || idleLock ? 0 : bounce) + jumpY * motionScale + diveLift - diveSkid - keeperSetAmount * 0.018 * motionScale;
    runner.torsoPivot.position.x = 0;
    runner.leftLeg.rotation.x = THREE.MathUtils.lerp(locomotionSwing, sideSwing * 0.28, sideStepAmount);
    runner.rightLeg.rotation.x = THREE.MathUtils.lerp(-locomotionSwing, -sideSwing * 0.28, sideStepAmount);
    runner.leftLeg.rotation.z = THREE.MathUtils.degToRad(sideStepDir * (10 + Math.sin(cycle) * 12) * sideStepAmount);
    runner.rightLeg.rotation.z = THREE.MathUtils.degToRad(sideStepDir * (-10 + Math.sin(cycle + Math.PI) * 12) * sideStepAmount);
    if (runner.leftLegRig && runner.rightLegRig) {
      const athleteLegData = [
        { leg: runner.leftLegRig, phase: cycle + Math.PI, side: 1 },
        { leg: runner.rightLegRig, phase: cycle, side: -1 }
      ];
      athleteLegData.forEach(({ leg, phase, side }) => {
        const stridePhase = THREE.MathUtils.lerp(Math.sin(phase), -Math.sin(phase), backpedalAmount);
        let kneePitch = 11 + (1 - stridePhase) * (11 + athleteKneeLift * 3.2) * blend + sprintAmount * (3.8 + athleteKneeLift * 2.4 + Math.max(0, -stridePhase) * (2.2 + athleteKneeLift * 1.1));
        let anklePitch = -8 - Math.max(0, stridePhase) * (5.2 + athleteKneeLift * 1.2) * blend - (kneePitch - 11) * 0.18;
        if (backpedalAmount > 0) {
          kneePitch = THREE.MathUtils.lerp(kneePitch, 19 + (1 + stridePhase) * 7, backpedalAmount);
          anklePitch = THREE.MathUtils.lerp(anklePitch, -4 - stridePhase * 4.5, backpedalAmount);
        }
        if (sideStepAmount > 0) {
          const sidePhase = side === sideStepDir ? phase : phase + Math.PI * 0.5;
          kneePitch = THREE.MathUtils.lerp(kneePitch, 24 + (1 - Math.sin(sidePhase)) * 10, sideStepAmount);
          anklePitch = THREE.MathUtils.lerp(anklePitch, -8 - Math.cos(sidePhase) * 5, sideStepAmount);
        }
        leg.kneePivot.rotation.x = THREE.MathUtils.degToRad(kneePitch);
        leg.footPivot.rotation.x = THREE.MathUtils.degToRad(anklePitch);
      });
    }
    runner.leftArm.rotation.x = -locomotionSwing * (0.9 + sprintAmount * 0.18) - 0.08 - sprintAmount * 0.18;
    runner.rightArm.rotation.x = locomotionSwing * (0.9 + sprintAmount * 0.18) - 0.08 - sprintAmount * 0.18;
    runner.leftArm.rotation.y = 0;
    runner.rightArm.rotation.y = 0;
    runner.leftArm.rotation.z = THREE.MathUtils.degToRad(7 + Math.sin(cycle * 0.5) * 4);
    runner.rightArm.rotation.z = THREE.MathUtils.degToRad(-7 - Math.sin(cycle * 0.5) * 4);
    runner.torsoPivot.rotation.z = Math.sin(cycle * 0.5) * 0.075 * blend;
    runner.torsoPivot.rotation.x = -0.08 - Math.abs(Math.sin(cycle)) * 0.04 * blend - sprintAmount * 0.18;
    runner.head.rotation.x = -0.04 * sprintAmount;
    runner.head.rotation.z = Math.sin(cycle * 0.58) * 0.06 * happy + Math.sin(cycle * 0.24) * 0.03 * sprintAmount;
    if (backpedalAmount > 0) {
      runner.torsoPivot.rotation.x = THREE.MathUtils.lerp(runner.torsoPivot.rotation.x, 0.03 - sprintAmount * 0.04, backpedalAmount);
      runner.leftArm.rotation.z = THREE.MathUtils.lerp(runner.leftArm.rotation.z, THREE.MathUtils.degToRad(14), backpedalAmount * 0.45);
      runner.rightArm.rotation.z = THREE.MathUtils.lerp(runner.rightArm.rotation.z, THREE.MathUtils.degToRad(-14), backpedalAmount * 0.45);
      runner.head.rotation.x = THREE.MathUtils.lerp(runner.head.rotation.x, 0.02, backpedalAmount * 0.7);
    }
    if (idleLock) {
      const idleBreathScale = runner.idleBreathScale ?? 0;
      const idleBreathPhase = runner.idleBreathPhase ?? 0;
      const idleBreathActive = idleBreathScale > 0.52;
      const idleBreath = idleBreathActive ? Math.sin(cycle * 0.22 + idleBreathPhase) * 0.012 * idleBreathScale : 0;
      runner.leftLeg.rotation.x = 0;
      runner.rightLeg.rotation.x = 0;
      runner.leftLeg.rotation.z = 0;
      runner.rightLeg.rotation.z = 0;
      runner.leftArm.rotation.x = -0.08;
      runner.rightArm.rotation.x = -0.08;
      runner.leftArm.rotation.y = 0;
      runner.rightArm.rotation.y = 0;
      runner.leftArm.rotation.z = THREE.MathUtils.degToRad(7);
      runner.rightArm.rotation.z = THREE.MathUtils.degToRad(-7);
      runner.torsoPivot.rotation.z = 0;
      runner.torsoPivot.rotation.x = -0.08 + idleBreath * 0.45;
      runner.head.rotation.x = idleBreath * 0.4;
      runner.head.rotation.z = 0;
      runner.root.position.y += Math.max(0, idleBreath) * 0.18 * motionScale;
      if (runner.leftLegRig && runner.rightLegRig) {
        runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.degToRad(11);
        runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.degToRad(11);
        runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.degToRad(-8);
        runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.degToRad(-8);
      }
    }
    if (sideStepAmount > 0) {
      runner.torsoPivot.position.x = sideStepDir * 0.035 * sideStepAmount;
      runner.torsoPivot.rotation.z += sideStepDir * 0.16 * sideStepAmount;
      runner.leftArm.rotation.z = THREE.MathUtils.lerp(runner.leftArm.rotation.z, THREE.MathUtils.degToRad(18 * sideStepDir), sideStepAmount);
      runner.rightArm.rotation.z = THREE.MathUtils.lerp(runner.rightArm.rotation.z, THREE.MathUtils.degToRad(6 * sideStepDir), sideStepAmount);
      runner.leftArm.rotation.x = THREE.MathUtils.lerp(runner.leftArm.rotation.x, -0.55 - sideSwing * 0.18, sideStepAmount);
      runner.rightArm.rotation.x = THREE.MathUtils.lerp(runner.rightArm.rotation.x, -0.12 + sideSwing * 0.18, sideStepAmount);
    }
    if (runner.smile) runner.smile.rotation.z = idleLock ? 0 : Math.sin(cycle * 0.85) * 0.06;

    if (specialPose?.type === "keeperDive") {
      const dir = specialPose.dir === 0 ? 1 : Math.sign(specialPose.dir ?? 1);
      const dive = keeperDiveState?.pose ?? 0;
      const reach = keeperDiveState?.reach ?? dive;
      const roll = keeperDiveState?.roll ?? dive;
      const landing = keeperDiveState?.landing ?? 0;
      const leadArm = dir > 0 ? runner.leftArm : runner.rightArm;
      const trailArm = dir > 0 ? runner.rightArm : runner.leftArm;
      const leadLeg = dir > 0 ? runner.leftLeg : runner.rightLeg;
      const trailLeg = dir > 0 ? runner.rightLeg : runner.leftLeg;
      runner.torsoPivot.position.x = dir * ((0.12 + keeperDiveHeight * 0.06) * reach + (0.08 + keeperDiveHeight * 0.04) * landing);
      runner.torsoPivot.rotation.z += dir * ((1.02 + keeperDiveHeight * 0.18) * roll + 0.18 * landing);
      runner.torsoPivot.rotation.x = -0.14 - (0.44 + keeperDiveHeight * 0.22) * reach + landing * 0.14;
      runner.head.rotation.z += dir * ((0.18 + keeperDiveHeight * 0.08) * roll + 0.06 * landing);
      runner.head.rotation.x = -(0.1 + keeperDiveHeight * 0.12) * reach + landing * 0.05;
      leadArm.rotation.x = -(2.16 + keeperDiveHeight * 0.58) * reach - landing * 0.12;
      leadArm.rotation.z = dir * (1.78 + keeperDiveHeight * 0.42) * reach;
      leadArm.rotation.y = dir * (0.38 + keeperDiveHeight * 0.18) * reach;
      trailArm.rotation.x = -(1.46 + keeperDiveHeight * 0.28) * dive - landing * 0.2;
      trailArm.rotation.z = dir * ((0.78 + keeperDiveHeight * 0.14) * dive + 0.18 * landing);
      trailArm.rotation.y = -dir * (0.16 + keeperDiveHeight * 0.12) * dive;
      leadLeg.rotation.x = (0.14 + keeperDiveHeight * 0.28) * reach - landing * 0.16;
      leadLeg.rotation.z = dir * ((0.24 + keeperDiveHeight * 0.18) * dive + (0.34 + keeperDiveHeight * 0.12) * landing);
      trailLeg.rotation.x = -(0.98 + keeperDiveHeight * 0.28) * dive + landing * 0.48;
      trailLeg.rotation.z = -dir * (0.22 * dive) + dir * 0.18 * landing;
    }

    if (kickAmount > 0) {
      const kickLeg = kickSide > 0 ? runner.leftLegRig : runner.rightLegRig;
      const plantLeg = kickSide > 0 ? runner.rightLegRig : runner.leftLegRig;
      const kickArm = kickSide > 0 ? runner.rightArmRig : runner.leftArmRig;
      const balanceArm = kickSide > 0 ? runner.leftArmRig : runner.rightArmRig;
      const kickPose = THREE.MathUtils.smoothstep(kickAmount, 0.05, 0.95);
      const kickDrive = Math.pow(kickPose, 0.72);
      const kickLift = Math.sin(kickPose * Math.PI) * 0.018 * motionScale;
      runner.root.position.y += kickLift;
      runner.torsoPivot.position.x += kickSide * 0.038 * kickDrive;
      runner.torsoPivot.rotation.x = THREE.MathUtils.lerp(runner.torsoPivot.rotation.x, -0.3, kickDrive);
      runner.torsoPivot.rotation.z += -kickSide * 0.18 * kickDrive;
      if (runner.hips) {
        runner.hips.rotation.y += kickSide * 0.22 * kickDrive;
        runner.hips.rotation.z += -kickSide * 0.08 * kickDrive;
      }
      runner.head.rotation.x = THREE.MathUtils.lerp(runner.head.rotation.x, -0.1, kickDrive * 0.72);
      runner.head.rotation.z += -kickSide * 0.05 * kickDrive;
      kickLeg.root.rotation.x = THREE.MathUtils.lerp(kickLeg.root.rotation.x, THREE.MathUtils.degToRad(66), kickDrive);
      kickLeg.root.rotation.z = THREE.MathUtils.lerp(kickLeg.root.rotation.z, THREE.MathUtils.degToRad(-kickSide * 13), kickDrive * 0.92);
      kickLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(kickLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(10), kickDrive);
      kickLeg.footPivot.rotation.x = THREE.MathUtils.lerp(kickLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(-22), kickDrive);
      plantLeg.root.rotation.x = THREE.MathUtils.lerp(plantLeg.root.rotation.x, THREE.MathUtils.degToRad(-18), kickDrive * 0.84);
      plantLeg.root.rotation.z = THREE.MathUtils.lerp(plantLeg.root.rotation.z, THREE.MathUtils.degToRad(kickSide * 10), kickDrive * 0.84);
      plantLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(plantLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(34), kickDrive * 0.84);
      plantLeg.footPivot.rotation.x = THREE.MathUtils.lerp(plantLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(10), kickDrive * 0.84);
      kickArm.upperPivot.rotation.x = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(24), kickDrive);
      kickArm.upperPivot.rotation.z = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(-kickSide * 16), kickDrive);
      kickArm.upperPivot.rotation.y = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.y, THREE.MathUtils.degToRad(-kickSide * 8), kickDrive * 0.88);
      kickArm.lowerPivot.rotation.x = THREE.MathUtils.lerp(kickArm.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-30), kickDrive);
      balanceArm.upperPivot.rotation.x = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(-78), kickDrive);
      balanceArm.upperPivot.rotation.z = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(kickSide * 28), kickDrive);
      balanceArm.upperPivot.rotation.y = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.y, THREE.MathUtils.degToRad(kickSide * 10), kickDrive * 0.84);
      balanceArm.lowerPivot.rotation.x = THREE.MathUtils.lerp(balanceArm.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-48), kickDrive);
    }

    if (celebrationAmount > 0) {
      const cheerLift = 0.08 + celebrationBounce * 0.12;
      runner.torsoPivot.rotation.x += 0.2 * celebrationAmount;
      runner.torsoPivot.rotation.z += celebrationSide * 0.12 * celebrationAmount;
      runner.head.rotation.x = -0.1 * celebrationAmount;
      runner.head.rotation.z += celebrationSide * 0.06 * celebrationAmount;
      runner.leftArm.rotation.x = THREE.MathUtils.lerp(runner.leftArm.rotation.x, -2.3 + cheerLift, celebrationAmount);
      runner.rightArm.rotation.x = THREE.MathUtils.lerp(runner.rightArm.rotation.x, -2.3 + cheerLift, celebrationAmount);
      runner.leftArm.rotation.z = THREE.MathUtils.lerp(runner.leftArm.rotation.z, 0.42 + celebrationSide * 0.12, celebrationAmount);
      runner.rightArm.rotation.z = THREE.MathUtils.lerp(runner.rightArm.rotation.z, -0.42 + celebrationSide * 0.12, celebrationAmount);
      runner.leftArm.rotation.y = THREE.MathUtils.lerp(runner.leftArm.rotation.y, 0.08 * celebrationSide, celebrationAmount);
      runner.rightArm.rotation.y = THREE.MathUtils.lerp(runner.rightArm.rotation.y, 0.08 * celebrationSide, celebrationAmount);
      runner.leftLeg.rotation.x = THREE.MathUtils.lerp(runner.leftLeg.rotation.x, 0.2 + celebrationBounce * 0.08, celebrationAmount * 0.5);
      runner.rightLeg.rotation.x = THREE.MathUtils.lerp(runner.rightLeg.rotation.x, 0.2 + celebrationBounce * 0.08, celebrationAmount * 0.5);
    }

    if (specialPose?.type === "keeperDive" && runner.smile) {
      runner.smile.rotation.z *= 1 - THREE.MathUtils.clamp(specialPose.amount ?? 0, 0, 1);
    }
    return;
  }

  const blend = THREE.MathUtils.clamp(speed / 2.1, 0, 1);
  const motionScale = runner.motionScale ?? 1;
  const stride = THREE.MathUtils.lerp(Math.sin(cycle), -Math.sin(cycle), backpedalAmount);
  const airBlend = THREE.MathUtils.clamp(Math.abs(jumpY) / Math.max(0.001, 0.36 * Math.max(1, motionScale)), 0, 1);
  const hurdlePose = THREE.MathUtils.smoothstep(airBlend, 0.04, 0.95);
  const sprintBlend = sprintAmount * (1 - hurdlePose * 0.72);
  const leadSide = stride >= 0 ? 1 : -1;
  const bounce = Math.abs(Math.sin(cycle * 1.08)) * 0.024 * (0.4 + blend * 0.8 + sprintBlend * 0.14) * motionScale;
  const keeperDiveArc = Math.sin(Math.pow(keeperDiveAmount, 0.84) * Math.PI);
  const keeperDiveLift = keeperDiveArc * (0.3 + keeperDiveHeight * 0.22) * motionScale;
  runner.root.position.y = runner.baseY + (runner.groundOffset ?? 0) + bounce + jumpY * motionScale + keeperDiveLift;
  runner.torsoPivot.position.x = 0.035 * hurdlePose + sideStepDir * 0.04 * sideStepAmount;
  runner.torsoPivot.rotation.z = Math.sin(cycle * 0.5) * 0.09 * blend + sideStepDir * 0.18 * sideStepAmount;
  runner.torsoPivot.rotation.x = -0.1 - Math.abs(stride) * 0.06 * blend - blend * 0.04 - hurdlePose * 0.22 - sprintBlend * 0.16 + sideStepAmount * 0.05 + backpedalAmount * 0.18;
  if (runner.hips) {
    runner.hips.rotation.z = Math.sin(cycle) * 0.028 * blend + sideStepDir * 0.08 * sideStepAmount;
    runner.hips.rotation.y = Math.sin(cycle * 0.5) * (0.03 + sprintBlend * 0.018) * blend;
  }
  if (runner.head) {
    runner.head.position.y = 3.27 + hurdlePose * 0.04;
    runner.head.rotation.x = THREE.MathUtils.lerp(-0.05 * sprintBlend, 0.08, backpedalAmount * 0.8);
    runner.head.rotation.z = Math.sin(cycle * 0.32) * 0.025 * sprintBlend;
  }
  if (runner.mouth) {
    runner.mouth.rotation.z = 0;
  }

  const armData = [
    { arm: runner.leftArmRig, side: 1 },
    { arm: runner.rightArmRig, side: -1 }
  ];
  armData.forEach(({ arm, side }) => {
    const walkPhase = side === -1 ? cycle + Math.PI : cycle;
    const armPhase = THREE.MathUtils.lerp(Math.sin(walkPhase), -Math.sin(walkPhase), backpedalAmount);
    const armSwing = armPhase * 18 * blend * (1 - airBlend * 0.65) * (1 + sprintBlend * 0.34);
    arm.upperPivot.rotation.z = THREE.MathUtils.degToRad(side * (16 + Math.sin(cycle * 0.5) * 2 + sprintBlend * 5));
    arm.upperPivot.rotation.x = THREE.MathUtils.degToRad(-(8 + 18 * airBlend + armSwing + sprintBlend * 12));
    arm.upperPivot.rotation.y = THREE.MathUtils.degToRad(side * (2.4 + sprintBlend * 4.6) * blend);
    arm.lowerPivot.rotation.x = THREE.MathUtils.degToRad(-(14 + 18 * airBlend + Math.max(0, -armPhase) * 16 * blend + sprintBlend * 10));
    if (backpedalAmount > 0) {
      arm.upperPivot.rotation.z = THREE.MathUtils.lerp(arm.upperPivot.rotation.z, THREE.MathUtils.degToRad(side * 21), backpedalAmount * 0.4);
      arm.upperPivot.rotation.y = THREE.MathUtils.lerp(arm.upperPivot.rotation.y, THREE.MathUtils.degToRad(side * 6), backpedalAmount * 0.4);
    }
    if (sideStepAmount > 0) {
      const sideArmSwing = Math.sin(walkPhase + Math.PI * 0.5) * 12 * sideStepAmount;
      arm.upperPivot.rotation.x = THREE.MathUtils.lerp(arm.upperPivot.rotation.x, THREE.MathUtils.degToRad(-18 + sideArmSwing * 0.35), sideStepAmount);
      arm.upperPivot.rotation.z = THREE.MathUtils.lerp(arm.upperPivot.rotation.z, THREE.MathUtils.degToRad(side * (10 + sideStepDir * 8)), sideStepAmount);
      arm.upperPivot.rotation.y = THREE.MathUtils.lerp(arm.upperPivot.rotation.y, THREE.MathUtils.degToRad(sideStepDir * side * 10), sideStepAmount * 0.8);
    }
    if (hurdlePose > 0) {
      const leadArm = side === leadSide;
      arm.upperPivot.rotation.x = THREE.MathUtils.lerp(arm.upperPivot.rotation.x, THREE.MathUtils.degToRad(leadArm ? -92 : 26), hurdlePose);
      arm.upperPivot.rotation.z = THREE.MathUtils.lerp(arm.upperPivot.rotation.z, THREE.MathUtils.degToRad(leadArm ? side * 18 : side * 8), hurdlePose);
      arm.lowerPivot.rotation.x = THREE.MathUtils.lerp(arm.lowerPivot.rotation.x, THREE.MathUtils.degToRad(leadArm ? -24 : -58), hurdlePose);
    }
  });

  const legData = [
    { leg: runner.leftLegRig, side: 1 },
    { leg: runner.rightLegRig, side: -1 }
  ];
  legData.forEach(({ leg, side }) => {
    const walkPhase = side === -1 ? cycle : cycle + Math.PI;
    const walkPhaseSin = THREE.MathUtils.lerp(Math.sin(walkPhase), -Math.sin(walkPhase), backpedalAmount);
    let hipPitch = walkPhaseSin * 24 * blend * (1 + sprintBlend * 0.18);
    let kneePitch = 9 + (8 + 17 * ((-walkPhaseSin + 1) * 0.5)) * blend + sprintBlend * (3 + Math.max(0, -walkPhaseSin) * 5.5);
    let anklePitch = -6 - hipPitch * 0.34 - (kneePitch - 8) * 0.2 - sprintBlend * 1.5;
    let hipRoll = THREE.MathUtils.degToRad(side * (4.5 + Math.sin(cycle * 0.5) * 0.8) * blend);
    if (backpedalAmount > 0) {
      hipPitch = THREE.MathUtils.lerp(hipPitch, -7 + walkPhaseSin * 15, backpedalAmount);
      kneePitch = THREE.MathUtils.lerp(kneePitch, 21 + (1 + walkPhaseSin) * 8, backpedalAmount);
      anklePitch = THREE.MathUtils.lerp(anklePitch, -4 - walkPhaseSin * 7, backpedalAmount);
    }
    if (airBlend > 0) {
      const leadLeg = side === leadSide;
      hipPitch = THREE.MathUtils.lerp(hipPitch, leadLeg ? 58 : -26, hurdlePose);
      kneePitch = THREE.MathUtils.lerp(kneePitch, leadLeg ? 18 : 82, hurdlePose);
      anklePitch = THREE.MathUtils.lerp(anklePitch, leadLeg ? -18 : 26, hurdlePose);
    }
    if (sideStepAmount > 0) {
      const sidePhase = side === sideStepDir ? cycle : cycle + Math.PI;
      hipPitch = THREE.MathUtils.lerp(hipPitch, 6 + Math.sin(sidePhase) * 12, sideStepAmount);
      kneePitch = THREE.MathUtils.lerp(kneePitch, 26 + (1 - Math.sin(sidePhase)) * 14, sideStepAmount);
      anklePitch = THREE.MathUtils.lerp(anklePitch, -10 - Math.sin(sidePhase) * 10, sideStepAmount);
      hipRoll = THREE.MathUtils.lerp(hipRoll, THREE.MathUtils.degToRad(sideStepDir * side * (20 + Math.sin(sidePhase) * 10)), sideStepAmount);
    }
    leg.root.rotation.z = hipRoll;
    leg.root.rotation.x = THREE.MathUtils.degToRad(-5 + hipPitch);
    leg.kneePivot.rotation.x = THREE.MathUtils.degToRad(kneePitch);
    leg.footPivot.rotation.x = THREE.MathUtils.degToRad(anklePitch);
  });

  if (keeperSetAmount > 0) {
    const setPulse = Math.sin(cycle * 1.8);
    runner.root.position.y -= 0.035 * keeperSetAmount * motionScale;
    runner.torsoPivot.position.x += keeperSetDir * 0.03 * keeperSetAmount + setPulse * 0.015 * keeperSetAmount;
    runner.torsoPivot.rotation.x = THREE.MathUtils.lerp(runner.torsoPivot.rotation.x, -0.26, keeperSetAmount);
    runner.torsoPivot.rotation.z += keeperSetDir * 0.08 * keeperSetAmount + setPulse * 0.03 * keeperSetAmount;
    if (runner.hips) {
      runner.hips.rotation.z += keeperSetDir * 0.09 * keeperSetAmount;
    }
    runner.leftLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.x, THREE.MathUtils.degToRad(14 + Math.max(0, setPulse) * 4), keeperSetAmount);
    runner.rightLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.x, THREE.MathUtils.degToRad(14 + Math.max(0, -setPulse) * 4), keeperSetAmount);
    runner.leftLegRig.root.rotation.z = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.z, THREE.MathUtils.degToRad(keeperSetDir * (14 + setPulse * 5)), keeperSetAmount);
    runner.rightLegRig.root.rotation.z = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.z, THREE.MathUtils.degToRad(keeperSetDir * (-14 + setPulse * 5)), keeperSetAmount);
    runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(36 + Math.max(0, -setPulse) * 6), keeperSetAmount);
    runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(36 + Math.max(0, setPulse) * 6), keeperSetAmount);
    runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-10), keeperSetAmount);
    runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(-10), keeperSetAmount);
    runner.leftArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.x, THREE.MathUtils.degToRad(-28 - setPulse * 4), keeperSetAmount);
    runner.rightArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.x, THREE.MathUtils.degToRad(-28 + setPulse * 4), keeperSetAmount);
    runner.leftArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(18 + keeperSetDir * 4), keeperSetAmount);
    runner.rightArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(-18 + keeperSetDir * 4), keeperSetAmount);
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-46), keeperSetAmount);
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-46), keeperSetAmount);
    if (runner.head) {
      runner.head.rotation.x = THREE.MathUtils.lerp(runner.head.rotation.x, -0.08, keeperSetAmount);
    }
  }

  if (kickAmount > 0) {
    const kickLeg = kickSide > 0 ? runner.leftLegRig : runner.rightLegRig;
    const plantLeg = kickSide > 0 ? runner.rightLegRig : runner.leftLegRig;
    const kickArm = kickSide > 0 ? runner.rightArmRig : runner.leftArmRig;
    const balanceArm = kickSide > 0 ? runner.leftArmRig : runner.rightArmRig;
    kickLeg.root.rotation.x = THREE.MathUtils.lerp(kickLeg.root.rotation.x, THREE.MathUtils.degToRad(48), kickAmount);
    kickLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(kickLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(8), kickAmount);
    kickLeg.footPivot.rotation.x = THREE.MathUtils.lerp(kickLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(-16), kickAmount);
    plantLeg.root.rotation.x = THREE.MathUtils.lerp(plantLeg.root.rotation.x, THREE.MathUtils.degToRad(-18), kickAmount * 0.72);
    plantLeg.kneePivot.rotation.x = THREE.MathUtils.lerp(plantLeg.kneePivot.rotation.x, THREE.MathUtils.degToRad(28), kickAmount * 0.72);
    plantLeg.footPivot.rotation.x = THREE.MathUtils.lerp(plantLeg.footPivot.rotation.x, THREE.MathUtils.degToRad(14), kickAmount * 0.72);
    runner.torsoPivot.rotation.x -= 0.14 * kickAmount;
    runner.torsoPivot.rotation.z += -kickSide * 0.09 * kickAmount;
    kickArm.upperPivot.rotation.x = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(32), kickAmount);
    kickArm.upperPivot.rotation.z = THREE.MathUtils.lerp(kickArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(-kickSide * 14), kickAmount);
    balanceArm.upperPivot.rotation.x = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.x, THREE.MathUtils.degToRad(-56), kickAmount);
    balanceArm.upperPivot.rotation.z = THREE.MathUtils.lerp(balanceArm.upperPivot.rotation.z, THREE.MathUtils.degToRad(kickSide * 22), kickAmount);
  }

  if (specialPose?.type === "keeperDive") {
    const dive = THREE.MathUtils.clamp(specialPose.amount ?? 0, 0, 1);
    const dir = specialPose.dir === 0 ? 1 : Math.sign(specialPose.dir ?? 1);
    const leadArm = dir > 0 ? runner.leftArmRig.upperPivot : runner.rightArmRig.upperPivot;
    const trailArm = dir > 0 ? runner.rightArmRig.upperPivot : runner.leftArmRig.upperPivot;
    const leadLeg = dir > 0 ? runner.leftLegRig.root : runner.rightLegRig.root;
    const trailLeg = dir > 0 ? runner.rightLegRig.root : runner.leftLegRig.root;
    runner.torsoPivot.position.x = dir * (0.24 + keeperDiveHeight * 0.14) * dive;
    runner.torsoPivot.rotation.z += dir * (1.2 + keeperDiveHeight * 0.16) * dive;
    runner.torsoPivot.rotation.x = -0.2 - (0.48 + keeperDiveHeight * 0.34) * dive;
    if (runner.hips) {
      runner.hips.rotation.z += dir * (0.28 + keeperDiveHeight * 0.18) * dive;
      runner.hips.rotation.y += dir * (0.12 + keeperDiveHeight * 0.16) * dive;
    }
    if (runner.head) {
      runner.head.rotation.z += dir * (0.24 + keeperDiveHeight * 0.14) * dive;
      runner.head.rotation.x = Math.min(runner.head.rotation.x, -(0.14 + keeperDiveHeight * 0.18) * dive);
    }
    leadArm.rotation.x = -(2.08 + keeperDiveHeight * 0.6) * dive;
    leadArm.rotation.z = dir * (1.76 + keeperDiveHeight * 0.4) * dive;
    leadArm.rotation.y = dir * (0.3 + keeperDiveHeight * 0.22) * dive;
    trailArm.rotation.x = -(1.52 + keeperDiveHeight * 0.38) * dive;
    trailArm.rotation.z = dir * (0.94 + keeperDiveHeight * 0.2) * dive;
    trailArm.rotation.y = -dir * 0.22 * dive;
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-34 - keeperDiveHeight * 22), dive * (dir > 0 ? 1 : 0.7));
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-34 - keeperDiveHeight * 22), dive * (dir < 0 ? 1 : 0.7));
    leadLeg.rotation.x = (0.22 + keeperDiveHeight * 0.34) * dive;
    leadLeg.rotation.z = dir * (0.4 + keeperDiveHeight * 0.26) * dive;
    trailLeg.rotation.x = -(1.18 + keeperDiveHeight * 0.38) * dive;
    trailLeg.rotation.z = -dir * 0.4 * dive;
    runner.leftLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(dir > 0 ? 18 : 82), dive);
    runner.rightLegRig.kneePivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.kneePivot.rotation.x, THREE.MathUtils.degToRad(dir < 0 ? 18 : 82), dive);
    runner.leftLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(dir > 0 ? -28 : 20), dive);
    runner.rightLegRig.footPivot.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.footPivot.rotation.x, THREE.MathUtils.degToRad(dir < 0 ? -28 : 20), dive);
  }

  if (celebrationAmount > 0) {
    const cheerArmPitch = THREE.MathUtils.degToRad(-146 + celebrationBounce * 10);
    runner.torsoPivot.rotation.x += 0.22 * celebrationAmount;
    runner.torsoPivot.rotation.z += celebrationSide * 0.12 * celebrationAmount;
    if (runner.head) {
      runner.head.rotation.x = -0.12 * celebrationAmount;
      runner.head.rotation.z += celebrationSide * 0.04 * celebrationAmount;
    }
    runner.leftArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.x, cheerArmPitch, celebrationAmount);
    runner.rightArmRig.upperPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.x, cheerArmPitch, celebrationAmount);
    runner.leftArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.leftArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(18 + celebrationSide * 6), celebrationAmount);
    runner.rightArmRig.upperPivot.rotation.z = THREE.MathUtils.lerp(runner.rightArmRig.upperPivot.rotation.z, THREE.MathUtils.degToRad(-(18 - celebrationSide * 6)), celebrationAmount);
    runner.leftArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.leftArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-22), celebrationAmount);
    runner.rightArmRig.lowerPivot.rotation.x = THREE.MathUtils.lerp(runner.rightArmRig.lowerPivot.rotation.x, THREE.MathUtils.degToRad(-22), celebrationAmount);
    runner.leftLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.leftLegRig.root.rotation.x, THREE.MathUtils.degToRad(8 + celebrationBounce * 5), celebrationAmount * 0.45);
    runner.rightLegRig.root.rotation.x = THREE.MathUtils.lerp(runner.rightLegRig.root.rotation.x, THREE.MathUtils.degToRad(8 + celebrationBounce * 5), celebrationAmount * 0.45);
  }
}

