import * as THREE from "./three.js";
import {
  getSharedBoxGeometry,
  getSharedCapsuleGeometry,
  getSharedCylinderGeometry,
  getSharedPlaneGeometry,
  getSharedSphereGeometry,
  getSharedTorusGeometry
} from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";

const ROADSTER_BODY_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xd81f30,
  roughness: 0.34,
  metalness: 0.26
});
const ROADSTER_BODY_SHADOW_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x7e101a,
  roughness: 0.46,
  metalness: 0.22
});
const ROADSTER_TRIM_MATERIAL = getSharedStandardMaterial(0x11161d, 0.64);
const ROADSTER_GRILLE_MATERIAL = getSharedStandardMaterial(0x0a0d12, 0.96);
const ROADSTER_PANEL_GAP_MATERIAL = getSharedStandardMaterial(0x25070d, 0.92);
const ROADSTER_INTERIOR_MATERIAL = getSharedStandardMaterial(0x171b22, 0.88);
const ROADSTER_SEAT_MATERIAL = getSharedStandardMaterial(0x252b34, 0.84);
const ROADSTER_SEAT_BOLSTER_MATERIAL = getSharedStandardMaterial(0x641620, 0.82);
const ROADSTER_LIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xf4f8ff,
  emissive: 0xe9f1ff,
  emissiveIntensity: 0.34,
  roughness: 0.18,
  metalness: 0.08
});
const ROADSTER_TAIL_LIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xca2034,
  emissive: 0x841926,
  emissiveIntensity: 0.28,
  roughness: 0.32,
  metalness: 0.08
});
const ROADSTER_GLASS_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xa6cfe6,
  roughness: 0.08,
  metalness: 0.18,
  transparent: true,
  opacity: 0.34,
  side: THREE.DoubleSide
});
const ROADSTER_TIRE_MATERIAL = getSharedStandardMaterial(0x111318, 0.97);
const ROADSTER_RIM_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdbe2eb,
  roughness: 0.18,
  metalness: 0.78
});
const ROADSTER_BADGE_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xf1c54b,
  roughness: 0.34,
  metalness: 0.3
});

const ROADSTER_DOOR_SWING = THREE.MathUtils.degToRad(32);
const ROADSTER_WHEEL_STEER_LIMIT = THREE.MathUtils.degToRad(28);
// A single conservative body hull is intentionally larger than the rendered
// shape so the car behaves like one solid object and its wheels/wing tips are
// not visually pass-through.
const ROADSTER_LOCAL_COLLIDERS = [
  { localX: 0, localZ: 0.16, halfX: 2.5, halfZ: 5.45 }
];

function addRoadsterPart(parent, geometry, material, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(sx, sy, sz);
  parent.add(mesh);
  return mesh;
}

function buildRoadsterWheel() {
  const wheel = new THREE.Group();

  addRoadsterPart(
    wheel,
    getSharedCylinderGeometry(0.76, 0.76, 0.46, 24),
    ROADSTER_TIRE_MATERIAL,
    0,
    0,
    0,
    0,
    0,
    Math.PI / 2
  );
  addRoadsterPart(
    wheel,
    getSharedCylinderGeometry(0.58, 0.58, 0.48, 22),
    ROADSTER_RIM_MATERIAL,
    0,
    0,
    0,
    0,
    0,
    Math.PI / 2
  );
  addRoadsterPart(
    wheel,
    getSharedCylinderGeometry(0.4, 0.4, 0.2, 18),
    ROADSTER_TRIM_MATERIAL,
    0,
    0,
    0,
    0,
    0,
    Math.PI / 2
  );

  for (let i = 0; i < 5; i += 1) {
    const angle = (Math.PI * 2 * i) / 5;
    addRoadsterPart(
      wheel,
      getSharedBoxGeometry(0.08, 0.54, 0.1),
      ROADSTER_RIM_MATERIAL,
      0,
      0,
      0,
      angle,
      0,
      0
    );
    addRoadsterPart(
      wheel,
      getSharedBoxGeometry(0.06, 0.42, 0.08),
      ROADSTER_RIM_MATERIAL,
      0,
      0,
      0,
      angle + Math.PI / 5,
      0,
      0
    );
  }

  addRoadsterPart(wheel, getSharedSphereGeometry(0.08, 12, 10), ROADSTER_BADGE_MATERIAL, 0, 0, 0);

  return wheel;
}

function buildBucketSeat(side) {
  const seat = new THREE.Group();
  seat.position.set(side * 0.78, 0.26, -0.34);

  addRoadsterPart(seat, getSharedBoxGeometry(0.66, 0.18, 1.06), ROADSTER_SEAT_MATERIAL, 0, 0.18, 0);
  addRoadsterPart(
    seat,
    getSharedBoxGeometry(0.54, 1.02, 0.2),
    ROADSTER_SEAT_MATERIAL,
    0,
    0.86,
    -0.34,
    THREE.MathUtils.degToRad(-18)
  );
  addRoadsterPart(seat, getSharedBoxGeometry(0.12, 0.62, 0.94), ROADSTER_SEAT_BOLSTER_MATERIAL, -0.27, 0.46, -0.02);
  addRoadsterPart(seat, getSharedBoxGeometry(0.12, 0.62, 0.94), ROADSTER_SEAT_BOLSTER_MATERIAL, 0.27, 0.46, -0.02);
  addRoadsterPart(seat, getSharedBoxGeometry(0.3, 0.18, 0.18), ROADSTER_SEAT_BOLSTER_MATERIAL, 0, 1.3, -0.36);

  return seat;
}

function buildDoor(side) {
  const door = new THREE.Group();
  door.position.set(side * 1.22, 0.64, 0.72);
  door.rotation.y = 0;

  addRoadsterPart(door, getSharedBoxGeometry(0.16, 0.52, 1.46), ROADSTER_BODY_MATERIAL, side * 0.08, -0.02, -0.72);
  addRoadsterPart(
    door,
    getSharedCapsuleGeometry(0.12, 0.84, 6, 14),
    ROADSTER_BODY_MATERIAL,
    side * 0.08,
    0.16,
    -0.68,
    Math.PI / 2,
    0,
    Math.PI / 2,
    1,
    0.4,
    1
  );
  addRoadsterPart(door, getSharedBoxGeometry(0.08, 0.42, 1.16), ROADSTER_INTERIOR_MATERIAL, side * 0.02, -0.08, -0.76);
  addRoadsterPart(
    door,
    getSharedBoxGeometry(0.12, 0.12, 0.94),
    ROADSTER_BODY_SHADOW_MATERIAL,
    side * 0.04,
    0.18,
    -0.84,
    THREE.MathUtils.degToRad(-10)
  );
  addRoadsterPart(door, getSharedBoxGeometry(0.04, 0.06, 0.24), ROADSTER_TRIM_MATERIAL, side * 0.06, 0.04, -0.22);
  addRoadsterPart(
    door,
    getSharedCylinderGeometry(0.024, 0.024, 0.28, 10),
    ROADSTER_TRIM_MATERIAL,
    side * 0.04,
    0.08,
    -0.22,
    Math.PI / 2
  );

  return door;
}

function buildBladeHeadlight(parent, side, x, y, z) {
  const light = new THREE.Group();
  light.position.set(x, y, z);
  light.rotation.set(
    THREE.MathUtils.degToRad(-12),
    side * THREE.MathUtils.degToRad(16),
    side * THREE.MathUtils.degToRad(-10)
  );
  parent.add(light);

  addRoadsterPart(light, getSharedBoxGeometry(0.84, 0.06, 0.16), ROADSTER_GRILLE_MATERIAL, 0, 0, 0);
  addRoadsterPart(light, getSharedBoxGeometry(0.66, 0.02, 0.08), ROADSTER_LIGHT_MATERIAL, 0, 0, 0.02);
  addRoadsterPart(
    light,
    getSharedBoxGeometry(0.22, 0.02, 0.06),
    ROADSTER_LIGHT_MATERIAL,
    side * 0.18,
    -0.02,
    0.03,
    0,
    0,
    side * THREE.MathUtils.degToRad(18)
  );

  return light;
}

function buildSideIntake(parent, side) {
  const intake = new THREE.Group();
  intake.position.set(side * 1.28, 0.72, -0.56);
  intake.rotation.y = side * THREE.MathUtils.degToRad(16);
  parent.add(intake);

  addRoadsterPart(intake, getSharedBoxGeometry(0.16, 0.56, 1.46), ROADSTER_GRILLE_MATERIAL, 0, -0.02, -0.1);
  addRoadsterPart(
    intake,
    getSharedBoxGeometry(0.1, 0.14, 1.24),
    ROADSTER_BODY_MATERIAL,
    -side * 0.08,
    0.18,
    -0.08,
    THREE.MathUtils.degToRad(-12)
  );
  addRoadsterPart(intake, getSharedBoxGeometry(0.06, 0.44, 1.22), ROADSTER_PANEL_GAP_MATERIAL, side * 0.02, -0.04, -0.12);

  return intake;
}

function buildRearButtress(parent, side) {
  const buttress = new THREE.Group();
  buttress.position.set(side * 0.76, 1.36, -1.36);
  buttress.rotation.set(
    THREE.MathUtils.degToRad(18),
    side * THREE.MathUtils.degToRad(6),
    side * THREE.MathUtils.degToRad(4)
  );
  parent.add(buttress);

  addRoadsterPart(buttress, getSharedBoxGeometry(0.28, 0.26, 1.72), ROADSTER_BODY_MATERIAL, 0, 0, 0);
  addRoadsterPart(buttress, getSharedBoxGeometry(0.12, 0.14, 1.48), ROADSTER_BODY_SHADOW_MATERIAL, 0, -0.12, 0.08);

  return buttress;
}

export function buildTracksideRoadster() {
  const deg = THREE.MathUtils.degToRad;
  const root = new THREE.Group();
  const car = new THREE.Group();
  car.position.y = 0.03;
  root.add(car);

  addRoadsterPart(car, getSharedBoxGeometry(2.86, 0.14, 8.82), ROADSTER_TRIM_MATERIAL, 0, 0.14, -0.04);
  addRoadsterPart(car, getSharedBoxGeometry(2.42, 0.08, 1.18), ROADSTER_GRILLE_MATERIAL, 0, 0.18, 4.54, deg(-4));
  addRoadsterPart(car, getSharedBoxGeometry(1.66, 0.06, 0.2), ROADSTER_TRIM_MATERIAL, 0, 0.12, 5.02);
  addRoadsterPart(car, getSharedBoxGeometry(0.3, 0.12, 0.78), ROADSTER_TRIM_MATERIAL, -1.18, 0.18, 4.66, 0, deg(-22));
  addRoadsterPart(car, getSharedBoxGeometry(0.3, 0.12, 0.78), ROADSTER_TRIM_MATERIAL, 1.18, 0.18, 4.66, 0, deg(22));
  addRoadsterPart(car, getSharedBoxGeometry(0.18, 0.16, 5.26), ROADSTER_TRIM_MATERIAL, -1.28, 0.24, -0.42);
  addRoadsterPart(car, getSharedBoxGeometry(0.18, 0.16, 5.26), ROADSTER_TRIM_MATERIAL, 1.28, 0.24, -0.42);
  addRoadsterPart(car, getSharedBoxGeometry(1.98, 0.14, 0.94), ROADSTER_TRIM_MATERIAL, 0, 0.18, -4.54);
  for (const finX of [-0.56, 0, 0.56]) {
    addRoadsterPart(car, getSharedBoxGeometry(0.06, 0.28, 0.54), ROADSTER_TRIM_MATERIAL, finX, 0.24, -4.34);
  }

  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.42, 2.78, 6, 18),
    ROADSTER_BODY_MATERIAL,
    0,
    0.62,
    3.42,
    Math.PI / 2,
    0,
    0,
    1.54,
    0.44,
    1.04
  );
  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.18, 1.22, 6, 14),
    ROADSTER_BODY_SHADOW_MATERIAL,
    0,
    0.68,
    3.08,
    Math.PI / 2,
    0,
    0,
    0.86,
    0.18,
    1
  );
  addRoadsterPart(car, getSharedSphereGeometry(0.82, 18, 14), ROADSTER_BODY_MATERIAL, -1.14, 0.62, 3.04, 0, 0, 0, 0.86, 0.46, 1.54);
  addRoadsterPart(car, getSharedSphereGeometry(0.82, 18, 14), ROADSTER_BODY_MATERIAL, 1.14, 0.62, 3.04, 0, 0, 0, 0.86, 0.46, 1.54);
  addRoadsterPart(car, getSharedBoxGeometry(0.54, 0.38, 0.84), ROADSTER_BODY_MATERIAL, 0, 0.42, 4.86, deg(-20));
  addRoadsterPart(car, getSharedBoxGeometry(0.22, 0.08, 0.2), ROADSTER_BADGE_MATERIAL, 0, 0.58, 5.12, deg(-8));
  addRoadsterPart(car, getSharedBoxGeometry(0.28, 0.04, 0.82), ROADSTER_PANEL_GAP_MATERIAL, -0.42, 0.76, 3.46, deg(-8), deg(-8));
  addRoadsterPart(car, getSharedBoxGeometry(0.28, 0.04, 0.82), ROADSTER_PANEL_GAP_MATERIAL, 0.42, 0.76, 3.46, deg(-8), deg(8));
  addRoadsterPart(car, getSharedBoxGeometry(0.18, 0.04, 1.02), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.74, 3.08, deg(-6));
  addRoadsterPart(car, getSharedBoxGeometry(1.1, 0.22, 0.2), ROADSTER_GRILLE_MATERIAL, 0, 0.34, 4.46, deg(-10));
  addRoadsterPart(car, getSharedBoxGeometry(0.72, 0.24, 0.58), ROADSTER_GRILLE_MATERIAL, -1.12, 0.34, 4.18, 0, deg(18));
  addRoadsterPart(car, getSharedBoxGeometry(0.72, 0.24, 0.58), ROADSTER_GRILLE_MATERIAL, 1.12, 0.34, 4.18, 0, deg(-18));
  buildBladeHeadlight(car, -1, -0.92, 0.62, 4.28);
  buildBladeHeadlight(car, 1, 0.92, 0.62, 4.28);

  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.28, 1.58, 6, 16),
    ROADSTER_BODY_MATERIAL,
    -1.34,
    0.66,
    1.74,
    Math.PI / 2,
    0,
    Math.PI / 2,
    1,
    0.46,
    1
  );
  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.28, 1.58, 6, 16),
    ROADSTER_BODY_MATERIAL,
    1.34,
    0.66,
    1.74,
    Math.PI / 2,
    0,
    Math.PI / 2,
    1,
    0.46,
    1
  );
  addRoadsterPart(car, getSharedBoxGeometry(2.04, 0.1, 0.68), ROADSTER_BODY_MATERIAL, 0, 0.88, 1.34);

  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.34, 0.94, 6, 16),
    ROADSTER_BODY_MATERIAL,
    0,
    1.0,
    1.18,
    Math.PI / 2,
    0,
    0,
    1.42,
    0.38,
    0.9
  );
  addRoadsterPart(car, getSharedCapsuleGeometry(0.12, 0.8, 6, 12), ROADSTER_BODY_MATERIAL, -0.92, 1.08, 1.0, deg(18), 0, deg(28));
  addRoadsterPart(car, getSharedCapsuleGeometry(0.12, 0.8, 6, 12), ROADSTER_BODY_MATERIAL, 0.92, 1.08, 1.0, deg(18), 0, deg(-28));
  const windshield = addRoadsterPart(
    car,
    getSharedPlaneGeometry(2.18, 1.1),
    ROADSTER_GLASS_MATERIAL,
    0,
    1.66,
    0.92,
    deg(-62)
  );
  windshield.renderOrder = 2;
  addRoadsterPart(car, getSharedBoxGeometry(2.14, 0.06, 0.08), ROADSTER_TRIM_MATERIAL, 0, 1.94, 0.68, deg(-62));

  const cockpit = new THREE.Group();
  car.add(cockpit);
  addRoadsterPart(cockpit, getSharedBoxGeometry(2.02, 0.18, 2.92), ROADSTER_INTERIOR_MATERIAL, 0, 0.26, -0.28);
  addRoadsterPart(cockpit, getSharedBoxGeometry(1.34, 0.14, 0.28), ROADSTER_TRIM_MATERIAL, 0, 0.94, 1.26, deg(-12));
  addRoadsterPart(cockpit, getSharedBoxGeometry(0.26, 0.16, 1.46), ROADSTER_TRIM_MATERIAL, 0, 0.36, -0.22);
  addRoadsterPart(cockpit, getSharedBoxGeometry(0.34, 0.18, 0.06), ROADSTER_TRIM_MATERIAL, -0.36, 1.06, 1.08, deg(-18));
  cockpit.add(buildBucketSeat(-1));
  cockpit.add(buildBucketSeat(1));

  addRoadsterPart(
    cockpit,
    getSharedCylinderGeometry(0.05, 0.05, 0.54, 10),
    ROADSTER_TRIM_MATERIAL,
    -0.62,
    0.98,
    1.0,
    deg(64)
  );
  const steeringWheel = new THREE.Group();
  steeringWheel.position.set(-0.62, 1.14, 0.8);
  steeringWheel.rotation.set(deg(78), 0, deg(8));
  cockpit.add(steeringWheel);
  addRoadsterPart(steeringWheel, getSharedTorusGeometry(0.3, 0.045, 12, 24), ROADSTER_TRIM_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedSphereGeometry(0.06, 12, 10), ROADSTER_BADGE_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedBoxGeometry(0.24, 0.04, 0.05), ROADSTER_TRIM_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedBoxGeometry(0.04, 0.22, 0.05), ROADSTER_TRIM_MATERIAL, 0, -0.06, 0);

  const leftDoor = buildDoor(-1);
  const rightDoor = buildDoor(1);
  car.add(leftDoor);
  car.add(rightDoor);
  addRoadsterPart(car, getSharedBoxGeometry(0.06, 0.22, 1.88), ROADSTER_PANEL_GAP_MATERIAL, -1.1, 0.74, 0.08);
  addRoadsterPart(car, getSharedBoxGeometry(0.06, 0.22, 1.88), ROADSTER_PANEL_GAP_MATERIAL, 1.1, 0.74, 0.08);
  buildSideIntake(car, -1);
  buildSideIntake(car, 1);

  buildRearButtress(car, -1);
  buildRearButtress(car, 1);
  addRoadsterPart(car, getSharedBoxGeometry(0.72, 0.04, 1.24), ROADSTER_GRILLE_MATERIAL, 0, 1.22, -1.7);
  addRoadsterPart(
    car,
    getSharedCapsuleGeometry(0.62, 2.36, 6, 18),
    ROADSTER_BODY_MATERIAL,
    0,
    1.0,
    -2.38,
    Math.PI / 2,
    0,
    0,
    1.74,
    0.56,
    1.08
  );
  addRoadsterPart(car, getSharedSphereGeometry(0.84, 18, 14), ROADSTER_BODY_MATERIAL, -1.18, 1.04, -2.04, 0, 0, 0, 0.96, 0.74, 1.4);
  addRoadsterPart(car, getSharedSphereGeometry(0.84, 18, 14), ROADSTER_BODY_MATERIAL, 1.18, 1.04, -2.04, 0, 0, 0, 0.96, 0.74, 1.4);
  addRoadsterPart(car, getSharedBoxGeometry(0.26, 0.28, 1.52), ROADSTER_BODY_MATERIAL, -1.02, 1.18, -1.28, deg(-12));
  addRoadsterPart(car, getSharedBoxGeometry(0.26, 0.28, 1.52), ROADSTER_BODY_MATERIAL, 1.02, 1.18, -1.28, deg(-12));
  addRoadsterPart(car, getSharedBoxGeometry(2.38, 0.18, 1.42), ROADSTER_BODY_MATERIAL, 0, 0.64, -4.02);
  addRoadsterPart(car, getSharedBoxGeometry(2.14, 0.08, 0.36), ROADSTER_BODY_MATERIAL, 0, 1.14, -3.92);
  addRoadsterPart(car, getSharedBoxGeometry(2.18, 0.16, 0.4), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.44, -4.22);
  for (const ventX of [-0.54, 0, 0.54]) {
    addRoadsterPart(car, getSharedBoxGeometry(0.04, 0.14, 0.82), ROADSTER_TRIM_MATERIAL, ventX, 1.06, -2.42);
  }
  addRoadsterPart(car, getSharedBoxGeometry(0.68, 0.06, 0.1), ROADSTER_TAIL_LIGHT_MATERIAL, -0.92, 0.82, -4.38);
  addRoadsterPart(car, getSharedBoxGeometry(0.68, 0.06, 0.1), ROADSTER_TAIL_LIGHT_MATERIAL, 0.92, 0.82, -4.38);
  addRoadsterPart(car, getSharedBoxGeometry(0.42, 0.04, 0.08), ROADSTER_TAIL_LIGHT_MATERIAL, 0, 0.76, -4.42);
  addRoadsterPart(
    car,
    getSharedCylinderGeometry(0.1, 0.1, 0.28, 10),
    ROADSTER_TRIM_MATERIAL,
    -0.22,
    0.34,
    -4.54,
    0,
    0,
    Math.PI / 2
  );
  addRoadsterPart(
    car,
    getSharedCylinderGeometry(0.1, 0.1, 0.28, 10),
    ROADSTER_TRIM_MATERIAL,
    0.22,
    0.34,
    -4.54,
    0,
    0,
    Math.PI / 2
  );

  const wheelOffsets = [
    [-1.74, 0.76, 2.34],
    [1.74, 0.76, 2.34],
    [-1.82, 0.76, -2.64],
    [1.82, 0.76, -2.64]
  ];
  const wheelRefs = [];
  for (let i = 0; i < wheelOffsets.length; i += 1) {
    const [x, y, z] = wheelOffsets[i];
    const wheel = buildRoadsterWheel();
    wheel.position.set(x, y, z);
    car.add(wheel);
    wheelRefs.push(wheel);
  }

  const driverDoorAnchor = new THREE.Object3D();
  driverDoorAnchor.position.set(-2.5, 0, 0.18);
  root.add(driverDoorAnchor);

  const driverStandAnchor = new THREE.Object3D();
  driverStandAnchor.position.set(-3.3, 0, 0.28);
  root.add(driverStandAnchor);

  const driverSeatAnchor = new THREE.Object3D();
  driverSeatAnchor.position.set(-0.66, -1.08, -0.36);
  root.add(driverSeatAnchor);

  const driverLookAnchor = new THREE.Object3D();
  driverLookAnchor.position.set(-0.08, -0.98, 2.78);
  root.add(driverLookAnchor);

  root.userData.doors = {
    left: leftDoor,
    right: rightDoor
  };
  root.userData.leftDoor = leftDoor;
  root.userData.rightDoor = rightDoor;
  root.userData.driverDoorAnchor = driverDoorAnchor;
  root.userData.driverStandAnchor = driverStandAnchor;
  root.userData.driverSeatAnchor = driverSeatAnchor;
  root.userData.driverLookAnchor = driverLookAnchor;
  root.userData.driverDoorSide = -1;
  root.userData.frontLeftWheel = wheelRefs[0] ?? null;
  root.userData.frontRightWheel = wheelRefs[1] ?? null;
  root.userData.rearLeftWheel = wheelRefs[2] ?? null;
  root.userData.rearRightWheel = wheelRefs[3] ?? null;

  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  setTracksideRoadsterWheelPose(root, 0, 0);

  return root;
}

export function createTracksideRoadsterColliders(x = 0, z = 0, yaw = 0) {
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);

  return ROADSTER_LOCAL_COLLIDERS.map((collider) => ({
    type: "obb",
    role: "tracksideRoadster",
    x: x + collider.localX * cos - collider.localZ * sin,
    z: z + collider.localX * sin + collider.localZ * cos,
    halfX: collider.halfX,
    halfZ: collider.halfZ,
    yaw
  }));
}

export function setTracksideRoadsterWheelPose(roadster, steerAmount = 0, wheelSpin = 0) {
  if (!roadster?.userData) return;
  const steer = THREE.MathUtils.clamp(steerAmount, -1, 1) * ROADSTER_WHEEL_STEER_LIMIT;
  const frontLeftWheel = roadster.userData.frontLeftWheel;
  const frontRightWheel = roadster.userData.frontRightWheel;
  const rearLeftWheel = roadster.userData.rearLeftWheel;
  const rearRightWheel = roadster.userData.rearRightWheel;
  if (frontLeftWheel) frontLeftWheel.rotation.set(wheelSpin, steer, 0);
  if (frontRightWheel) frontRightWheel.rotation.set(wheelSpin, steer, 0);
  if (rearLeftWheel) rearLeftWheel.rotation.set(wheelSpin, 0, 0);
  if (rearRightWheel) rearRightWheel.rotation.set(wheelSpin, 0, 0);
}

export function syncTracksideRoadsterColliders(roadster) {
  const colliders = roadster?.userData?.colliderRefs;
  if (!roadster || !Array.isArray(colliders) || colliders.length !== ROADSTER_LOCAL_COLLIDERS.length) return;

  const x = roadster.position.x;
  const z = roadster.position.z;
  const yaw = roadster.rotation.y;
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);

  for (let i = 0; i < ROADSTER_LOCAL_COLLIDERS.length; i += 1) {
    const local = ROADSTER_LOCAL_COLLIDERS[i];
    const collider = colliders[i];
    collider.x = x + local.localX * cos - local.localZ * sin;
    collider.z = z + local.localX * sin + local.localZ * cos;
    collider.yaw = yaw;
  }
}

export function setTracksideRoadsterDoorOpenAmount(roadster, side, openAmount) {
  if (!roadster?.userData) return;
  const clamped = THREE.MathUtils.clamp(openAmount, 0, 1);
  const door = side < 0 ? roadster.userData.leftDoor : roadster.userData.rightDoor;
  if (!door) return;
  door.rotation.y = -side * ROADSTER_DOOR_SWING * clamped;
}

export function getTracksideRoadsterAnchorWorldPosition(roadster, anchorKey, out = new THREE.Vector3()) {
  const anchor = roadster?.userData?.[anchorKey];
  if (!anchor) return null;
  roadster.updateWorldMatrix(true, false);
  anchor.updateWorldMatrix(true, false);
  return anchor.getWorldPosition(out);
}
