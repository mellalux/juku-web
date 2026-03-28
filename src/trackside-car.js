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
  color: 0xc81d2f,
  roughness: 0.4,
  metalness: 0.18
});
const ROADSTER_BODY_SHADOW_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x851521,
  roughness: 0.48,
  metalness: 0.2
});
const ROADSTER_TRIM_MATERIAL = getSharedStandardMaterial(0x14181f, 0.62);
const ROADSTER_PANEL_GAP_MATERIAL = getSharedStandardMaterial(0x2c0a10, 0.92);
const ROADSTER_INTERIOR_MATERIAL = getSharedStandardMaterial(0xcbaf82, 0.84);
const ROADSTER_SEAT_MATERIAL = getSharedStandardMaterial(0xbc986d, 0.82);
const ROADSTER_SEAT_BOLSTER_MATERIAL = getSharedStandardMaterial(0x5d1a22, 0.8);
const ROADSTER_LIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xf8efbd,
  emissive: 0xe8d57a,
  emissiveIntensity: 0.18,
  roughness: 0.44,
  metalness: 0.08
});
const ROADSTER_TAIL_LIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xb21d2f,
  emissive: 0x7f1d1d,
  emissiveIntensity: 0.16,
  roughness: 0.4,
  metalness: 0.08
});
const ROADSTER_GLASS_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xd1efff,
  roughness: 0.08,
  metalness: 0.14,
  transparent: true,
  opacity: 0.42,
  side: THREE.DoubleSide
});
const ROADSTER_TIRE_MATERIAL = getSharedStandardMaterial(0x111318, 0.97);
const ROADSTER_RIM_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdbe2eb,
  roughness: 0.2,
  metalness: 0.74
});
const ROADSTER_BADGE_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xf1c54b,
  roughness: 0.34,
  metalness: 0.3
});

const ROADSTER_DOOR_SWING = THREE.MathUtils.degToRad(34);
const ROADSTER_WHEEL_STEER_LIMIT = THREE.MathUtils.degToRad(30);
const ROADSTER_LOCAL_COLLIDERS = [
  { localX: 0, localZ: 4.78, halfX: 1.06, halfZ: 0.48 },
  { localX: 0, localZ: 4.02, halfX: 1.22, halfZ: 0.54 },
  { localX: 0, localZ: 3.18, halfX: 1.38, halfZ: 0.58 },
  { localX: 0, localZ: 2.18, halfX: 1.54, halfZ: 0.66 },
  { localX: 0, localZ: 1.08, halfX: 1.62, halfZ: 0.74 },
  { localX: -1.14, localZ: 0.2, halfX: 0.46, halfZ: 1.18 },
  { localX: 1.14, localZ: 0.2, halfX: 0.46, halfZ: 1.18 },
  { localX: 0, localZ: -0.18, halfX: 1.08, halfZ: 0.94 },
  { localX: 0, localZ: -1.34, halfX: 1.66, halfZ: 0.84 },
  { localX: -1.08, localZ: -1.46, halfX: 0.5, halfZ: 1.04 },
  { localX: 1.08, localZ: -1.46, halfX: 0.5, halfZ: 1.04 },
  { localX: 0, localZ: -2.54, halfX: 1.56, halfZ: 0.76 },
  { localX: 0, localZ: -3.42, halfX: 1.34, halfZ: 0.66 },
  { localX: 0, localZ: -4.16, halfX: 1.14, halfZ: 0.48 }
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
    getSharedCylinderGeometry(0.72, 0.72, 0.62, 20),
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
    getSharedCylinderGeometry(0.46, 0.46, 0.66, 18),
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
    getSharedCylinderGeometry(0.17, 0.17, 0.7, 12),
    ROADSTER_TRIM_MATERIAL,
    0,
    0,
    0,
    0,
    0,
    Math.PI / 2
  );

  return wheel;
}

function buildBucketSeat(side) {
  const seat = new THREE.Group();
  seat.position.set(side * 0.86, 0.28, -0.54);

  addRoadsterPart(seat, getSharedBoxGeometry(0.7, 0.2, 1.08), ROADSTER_SEAT_MATERIAL, 0, 0.18, 0);
  addRoadsterPart(
    seat,
    getSharedBoxGeometry(0.58, 1.08, 0.22),
    ROADSTER_SEAT_MATERIAL,
    0,
    0.9,
    -0.34,
    THREE.MathUtils.degToRad(-20)
  );
  addRoadsterPart(seat, getSharedBoxGeometry(0.12, 0.66, 0.98), ROADSTER_SEAT_BOLSTER_MATERIAL, -0.29, 0.48, -0.04);
  addRoadsterPart(seat, getSharedBoxGeometry(0.12, 0.66, 0.98), ROADSTER_SEAT_BOLSTER_MATERIAL, 0.29, 0.48, -0.04);
  addRoadsterPart(seat, getSharedBoxGeometry(0.34, 0.18, 0.18), ROADSTER_SEAT_BOLSTER_MATERIAL, 0, 1.36, -0.38);

  return seat;
}

function buildDoor(side) {
  const door = new THREE.Group();
  door.position.set(side * 1.2, 0.66, 1.08);
  door.rotation.y = 0;

  addRoadsterPart(door, getSharedBoxGeometry(0.18, 0.68, 1.82), ROADSTER_BODY_MATERIAL, side * 0.12, 0, -0.92);
  addRoadsterPart(door, getSharedBoxGeometry(0.16, 0.18, 1.62), ROADSTER_BODY_SHADOW_MATERIAL, side * 0.08, 0.3, -0.94);
  addRoadsterPart(door, getSharedBoxGeometry(0.08, 0.5, 1.46), ROADSTER_INTERIOR_MATERIAL, side * 0.04, -0.02, -0.94);
  addRoadsterPart(door, getSharedBoxGeometry(0.04, 0.1, 0.2), ROADSTER_TRIM_MATERIAL, side * 0.04, 0.08, -0.22);
  addRoadsterPart(door, getSharedCylinderGeometry(0.03, 0.03, 0.32, 10), ROADSTER_TRIM_MATERIAL, side * 0.02, 0.12, -0.22, Math.PI / 2);

  return door;
}

function buildClosedHeadlightCover(parent, side, x, y, z) {
  addRoadsterPart(parent, getSharedBoxGeometry(0.62, 0.024, 0.96), ROADSTER_PANEL_GAP_MATERIAL, x, y - 0.01, z);
  addRoadsterPart(parent, getSharedBoxGeometry(0.56, 0.05, 0.9), ROADSTER_BODY_MATERIAL, x, y, z);
  addRoadsterPart(parent, getSharedBoxGeometry(0.48, 0.02, 0.12), ROADSTER_TRIM_MATERIAL, x, y - 0.02, z + 0.36);
  addRoadsterPart(parent, getSharedBoxGeometry(0.14, 0.04, 0.12), ROADSTER_BADGE_MATERIAL, x + side * 0.12, y + 0.006, z - 0.08);
}

export function buildTracksideRoadster() {
  const root = new THREE.Group();
  const car = new THREE.Group();
  car.position.y = 0.03;
  root.add(car);

  addRoadsterPart(car, getSharedBoxGeometry(3.04, 0.16, 8.54), ROADSTER_TRIM_MATERIAL, 0, 0.16, -0.16);
  addRoadsterPart(car, getSharedBoxGeometry(2.56, 0.1, 0.58), ROADSTER_TRIM_MATERIAL, 0, 0.12, 4.74);
  addRoadsterPart(car, getSharedBoxGeometry(2.24, 0.12, 0.4), ROADSTER_TRIM_MATERIAL, 0, 0.16, -4.62);
  addRoadsterPart(car, getSharedBoxGeometry(2.68, 0.2, 3.82), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.32, 1.72);
  addRoadsterPart(car, getSharedBoxGeometry(2.86, 0.26, 2.86), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.42, -2.88);

  addRoadsterPart(car, getSharedBoxGeometry(2.5, 0.34, 2.18), ROADSTER_BODY_MATERIAL, 0, 0.46, 3.84);
  addRoadsterPart(car, getSharedSphereGeometry(0.62, 18, 14), ROADSTER_BODY_MATERIAL, 0, 0.46, 4.92, 0, 0, 0, 1.78, 0.44, 0.92);
  addRoadsterPart(car, getSharedBoxGeometry(0.82, 0.12, 0.24), ROADSTER_TRIM_MATERIAL, 0, 0.26, 4.82);
  addRoadsterPart(car, getSharedBoxGeometry(0.42, 0.08, 0.22), ROADSTER_BADGE_MATERIAL, 0, 0.64, 5.02);

  const hood = new THREE.Group();
  hood.position.set(0, 0, 0);
  car.add(hood);
  addRoadsterPart(hood, getSharedCapsuleGeometry(0.58, 3.42, 6, 18), ROADSTER_BODY_MATERIAL, 0, 0.78, 2.92, Math.PI / 2, 0, 0, 1.62, 0.56, 1.08);
  addRoadsterPart(hood, getSharedCapsuleGeometry(0.34, 1.46, 6, 16), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.9, 2.42, Math.PI / 2, 0, 0, 0.66, 0.2, 1);
  addRoadsterPart(hood, getSharedSphereGeometry(0.72, 18, 14), ROADSTER_BODY_MATERIAL, -1.08, 0.74, 3.16, 0, 0, 0, 0.84, 0.56, 1.36);
  addRoadsterPart(hood, getSharedSphereGeometry(0.72, 18, 14), ROADSTER_BODY_MATERIAL, 1.08, 0.74, 3.16, 0, 0, 0, 0.84, 0.56, 1.36);
  buildClosedHeadlightCover(hood, -1, -0.8, 0.9, 3.56);
  buildClosedHeadlightCover(hood, 1, 0.8, 0.9, 3.56);

  addRoadsterPart(car, getSharedCapsuleGeometry(0.34, 2.26, 6, 16), ROADSTER_BODY_MATERIAL, -1.3, 0.66, 0.76, Math.PI / 2, 0, Math.PI / 2, 1, 0.54, 1);
  addRoadsterPart(car, getSharedCapsuleGeometry(0.34, 2.26, 6, 16), ROADSTER_BODY_MATERIAL, 1.3, 0.66, 0.76, Math.PI / 2, 0, Math.PI / 2, 1, 0.54, 1);
  addRoadsterPart(car, getSharedBoxGeometry(2.24, 0.12, 0.54), ROADSTER_BODY_MATERIAL, 0, 1, 1.24);

  const cowl = new THREE.Group();
  car.add(cowl);
  addRoadsterPart(cowl, getSharedCapsuleGeometry(0.48, 1.04, 6, 16), ROADSTER_BODY_MATERIAL, 0, 1.08, 1.28, Math.PI / 2, 0, 0, 1.62, 0.48, 0.92);
  addRoadsterPart(cowl, getSharedCapsuleGeometry(0.18, 0.88, 6, 12), ROADSTER_BODY_MATERIAL, -1.04, 1.18, 1.12, THREE.MathUtils.degToRad(18), 0, THREE.MathUtils.degToRad(24), 1, 1, 1);
  addRoadsterPart(cowl, getSharedCapsuleGeometry(0.18, 0.88, 6, 12), ROADSTER_BODY_MATERIAL, 1.04, 1.18, 1.12, THREE.MathUtils.degToRad(18), 0, THREE.MathUtils.degToRad(-24), 1, 1, 1);
  const windshield = addRoadsterPart(
    car,
    getSharedPlaneGeometry(2.46, 1.22),
    ROADSTER_GLASS_MATERIAL,
    0,
    1.76,
    1.02,
    THREE.MathUtils.degToRad(-55)
  );
  windshield.renderOrder = 2;
  addRoadsterPart(car, getSharedBoxGeometry(2.48, 0.06, 0.08), ROADSTER_TRIM_MATERIAL, 0, 2.12, 0.72, THREE.MathUtils.degToRad(-55));

  const cockpit = new THREE.Group();
  car.add(cockpit);
  addRoadsterPart(cockpit, getSharedBoxGeometry(2.26, 0.16, 3.08), ROADSTER_INTERIOR_MATERIAL, 0, 0.26, -0.46);
  addRoadsterPart(cockpit, getSharedBoxGeometry(1.42, 0.22, 0.3), ROADSTER_TRIM_MATERIAL, 0, 1.02, 1.46, THREE.MathUtils.degToRad(-10));
  addRoadsterPart(cockpit, getSharedBoxGeometry(0.32, 0.16, 1.56), ROADSTER_TRIM_MATERIAL, 0, 0.36, -0.46);
  cockpit.add(buildBucketSeat(-1));
  cockpit.add(buildBucketSeat(1));

  const steeringColumn = addRoadsterPart(
    cockpit,
    getSharedCylinderGeometry(0.05, 0.05, 0.56, 10),
    ROADSTER_TRIM_MATERIAL,
    -0.68,
    1.02,
    1.18,
    THREE.MathUtils.degToRad(66),
    0,
    0
  );
  steeringColumn.rotation.z = THREE.MathUtils.degToRad(10);
  const steeringWheel = new THREE.Group();
  steeringWheel.position.set(-0.68, 1.18, 0.96);
  steeringWheel.rotation.set(THREE.MathUtils.degToRad(76), 0, THREE.MathUtils.degToRad(8));
  cockpit.add(steeringWheel);
  addRoadsterPart(steeringWheel, getSharedTorusGeometry(0.3, 0.045, 12, 24), ROADSTER_TRIM_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedSphereGeometry(0.06, 12, 10), ROADSTER_TRIM_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedBoxGeometry(0.24, 0.04, 0.05), ROADSTER_TRIM_MATERIAL, 0, 0, 0);
  addRoadsterPart(steeringWheel, getSharedBoxGeometry(0.04, 0.22, 0.05), ROADSTER_TRIM_MATERIAL, 0, -0.06, 0);

  const leftDoor = buildDoor(-1);
  const rightDoor = buildDoor(1);
  car.add(leftDoor);
  car.add(rightDoor);

  const driverDoorAnchor = new THREE.Object3D();
  driverDoorAnchor.position.set(-2.62, 0, 0.54);
  root.add(driverDoorAnchor);

  const driverStandAnchor = new THREE.Object3D();
  driverStandAnchor.position.set(-3.42, 0, 0.68);
  root.add(driverStandAnchor);

  const driverSeatAnchor = new THREE.Object3D();
  driverSeatAnchor.position.set(-0.7, -1.08, -0.56);
  root.add(driverSeatAnchor);

  const driverLookAnchor = new THREE.Object3D();
  driverLookAnchor.position.set(-0.12, -0.98, 2.92);
  root.add(driverLookAnchor);

  addRoadsterPart(car, getSharedBoxGeometry(0.08, 0.16, 2.04), ROADSTER_PANEL_GAP_MATERIAL, -1.18, 0.74, 0.06);
  addRoadsterPart(car, getSharedBoxGeometry(0.08, 0.16, 2.04), ROADSTER_PANEL_GAP_MATERIAL, 1.18, 0.74, 0.06);

  addRoadsterPart(car, getSharedCapsuleGeometry(0.74, 2.62, 6, 18), ROADSTER_BODY_MATERIAL, 0, 1.04, -2.42, Math.PI / 2, 0, 0, 1.82, 0.66, 1.14);
  addRoadsterPart(car, getSharedSphereGeometry(0.78, 18, 14), ROADSTER_BODY_MATERIAL, -1.2, 1.06, -2.08, 0, 0, 0, 0.92, 0.74, 1.24);
  addRoadsterPart(car, getSharedSphereGeometry(0.78, 18, 14), ROADSTER_BODY_MATERIAL, 1.2, 1.06, -2.08, 0, 0, 0, 0.92, 0.74, 1.24);
  addRoadsterPart(car, getSharedBoxGeometry(0.34, 0.48, 1.82), ROADSTER_BODY_MATERIAL, -0.9, 1.22, -1.28, THREE.MathUtils.degToRad(-14));
  addRoadsterPart(car, getSharedBoxGeometry(0.34, 0.48, 1.82), ROADSTER_BODY_MATERIAL, 0.9, 1.22, -1.28, THREE.MathUtils.degToRad(-14));
  addRoadsterPart(car, getSharedBoxGeometry(2.9, 0.4, 1.02), ROADSTER_BODY_MATERIAL, 0, 0.62, -4.14);
  addRoadsterPart(car, getSharedBoxGeometry(2.08, 0.1, 0.28), ROADSTER_BODY_MATERIAL, 0, 1.34, -3.82);
  addRoadsterPart(car, getSharedBoxGeometry(2.12, 0.22, 0.42), ROADSTER_BODY_SHADOW_MATERIAL, 0, 0.48, -4.22);

  for (let i = 0; i < 4; i += 1) {
    const z = -1.18 - i * 0.28;
    addRoadsterPart(car, getSharedBoxGeometry(0.04, 0.14, 0.8), ROADSTER_TRIM_MATERIAL, -1.44, 0.68, z);
    addRoadsterPart(car, getSharedBoxGeometry(0.04, 0.14, 0.8), ROADSTER_TRIM_MATERIAL, 1.44, 0.68, z);
  }

  addRoadsterPart(car, getSharedSphereGeometry(0.22, 16, 12), ROADSTER_LIGHT_MATERIAL, -0.94, 0.44, 5.02, 0, 0, 0, 1.28, 0.58, 0.5);
  addRoadsterPart(car, getSharedSphereGeometry(0.22, 16, 12), ROADSTER_LIGHT_MATERIAL, 0.94, 0.44, 5.02, 0, 0, 0, 1.28, 0.58, 0.5);
  addRoadsterPart(car, getSharedBoxGeometry(0.4, 0.14, 0.14), ROADSTER_TAIL_LIGHT_MATERIAL, -0.92, 0.74, -4.38);
  addRoadsterPart(car, getSharedBoxGeometry(0.4, 0.14, 0.14), ROADSTER_TAIL_LIGHT_MATERIAL, 0.92, 0.74, -4.38);
  addRoadsterPart(car, getSharedCylinderGeometry(0.09, 0.09, 0.32, 10), ROADSTER_TRIM_MATERIAL, -0.42, 0.28, -4.48, 0, 0, Math.PI / 2);
  addRoadsterPart(car, getSharedCylinderGeometry(0.09, 0.09, 0.32, 10), ROADSTER_TRIM_MATERIAL, 0.42, 0.28, -4.48, 0, 0, Math.PI / 2);

  const wheelOffsets = [
    [-1.74, 0.7, 2.72],
    [1.74, 0.7, 2.72],
    [-1.82, 0.7, -2.92],
    [1.82, 0.7, -2.92]
  ];
  const wheelRefs = [];
  for (let i = 0; i < wheelOffsets.length; i += 1) {
    const [x, y, z] = wheelOffsets[i];
    const wheel = buildRoadsterWheel();
    wheel.position.set(x, y, z);
    car.add(wheel);
    wheelRefs.push(wheel);
  }

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
