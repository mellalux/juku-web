import * as THREE from "./three.js";
import {
  FOOTBALL_CENTER_CIRCLE_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_FIELD_HALF_WIDTH,
  TRACK_CURVE_INNER_RADIUS,
  TRACK_CURVE_OUTER_RADIUS,
  TRACK_LANE_COUNT,
  TRACK_LANE_WIDTH,
  TRACK_STRAIGHT_HALF
} from "./game-config.js";
import { createStaticInstancedMesh } from "./instanced-build.js";
import {
  getSharedCircleGeometry,
  getSharedCylinderGeometry,
  getSharedPlaneGeometry
} from "./shared-geometry.js";
import { getSharedStandardMaterial } from "./shared-materials.js";

function getTrackLaneRadius(laneIndex) {
  return TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * (laneIndex + 0.5);
}

export function getTrackLaneLength(laneIndex) {
  const radius = getTrackLaneRadius(laneIndex);
  return TRACK_STRAIGHT_HALF * 4 + Math.PI * 2 * radius;
}

function rotateTrackCoords(x, z) {
  return { x: -z, z: x };
}

function rotateTrackDirection(dirX, dirZ) {
  return { dirX: -dirZ, dirZ: dirX };
}

export function getTrackPointAtProgress(laneIndex, progress) {
  const radius = getTrackLaneRadius(laneIndex);
  const straightLen = TRACK_STRAIGHT_HALF * 2;
  const arcLen = Math.PI * radius;
  const lapLen = straightLen * 2 + arcLen * 2;
  let s = ((progress % lapLen) + lapLen) % lapLen;

  if (s <= straightLen) {
    const x = -TRACK_STRAIGHT_HALF + s;
    const z = -radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(1, 0);
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "homeStraight" };
  }
  s -= straightLen;

  if (s <= arcLen) {
    const angle = -Math.PI / 2 + s / radius;
    const x = TRACK_STRAIGHT_HALF + Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(-Math.sin(angle), Math.cos(angle));
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "rightCurve" };
  }
  s -= arcLen;

  if (s <= straightLen) {
    const x = TRACK_STRAIGHT_HALF - s;
    const z = radius;
    const pos = rotateTrackCoords(x, z);
    const dir = rotateTrackDirection(-1, 0);
    return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "backStraight" };
  }
  s -= straightLen;

  const angle = Math.PI / 2 + s / radius;
  const x = -TRACK_STRAIGHT_HALF + Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const pos = rotateTrackCoords(x, z);
  const dir = rotateTrackDirection(-Math.sin(angle), Math.cos(angle));
  return { x: pos.x, z: pos.z, dirX: dir.dirX, dirZ: dir.dirZ, segment: "leftCurve" };
}

function getTrackCurveLinePoints(radius, y = 0.02, segments = 40) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = -TRACK_STRAIGHT_HALF + t * TRACK_STRAIGHT_HALF * 2;
    const pos = rotateTrackCoords(x, -radius);
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const angle = -Math.PI / 2 + (i / segments) * Math.PI;
    const pos = rotateTrackCoords(
      TRACK_STRAIGHT_HALF + Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    const x = TRACK_STRAIGHT_HALF - t * TRACK_STRAIGHT_HALF * 2;
    const pos = rotateTrackCoords(x, radius);
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  for (let i = 1; i <= segments; i += 1) {
    const angle = Math.PI / 2 + (i / segments) * Math.PI;
    const pos = rotateTrackCoords(
      -TRACK_STRAIGHT_HALF + Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    points.push(new THREE.Vector3(pos.x, y, pos.z));
  }
  return points;
}

function makeStadiumShape(innerRadius, outerRadius) {
  const shape = new THREE.Shape();
  const outer = getTrackCurveLinePoints(outerRadius, 0, 44).map((p) => new THREE.Vector2(p.x, p.z));
  shape.moveTo(outer[0].x, outer[0].y);
  for (let i = 1; i < outer.length; i += 1) shape.lineTo(outer[i].x, outer[i].y);
  shape.closePath();

  if (Number.isFinite(innerRadius) && innerRadius > 0) {
    const holePath = new THREE.Path();
    const inner = getTrackCurveLinePoints(innerRadius, 0, 44).map((p) => new THREE.Vector2(p.x, p.z)).reverse();
    holePath.moveTo(inner[0].x, inner[0].y);
    for (let i = 1; i < inner.length; i += 1) holePath.lineTo(inner[i].x, inner[i].y);
    holePath.closePath();
    shape.holes.push(holePath);
  }

  return shape;
}

export function buildRunningTrack() {
  const group = new THREE.Group();
  const curbMaterial = getSharedStandardMaterial(0xf0f3ea, 0.9);
  const fieldMarkMaterial = getSharedStandardMaterial(0xeef7eb, 0.9);

  const track = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_INNER_RADIUS, TRACK_CURVE_OUTER_RADIUS), 64),
    new THREE.MeshStandardMaterial({ color: 0xad4f3b, roughness: 0.9 })
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = 0.012;
  track.receiveShadow = true;
  group.add(track);

  const curbInner = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_INNER_RADIUS - 0.18, TRACK_CURVE_INNER_RADIUS), 48),
    curbMaterial
  );
  curbInner.rotation.x = -Math.PI / 2;
  curbInner.position.y = 0.013;
  group.add(curbInner);

  const curbOuter = new THREE.Mesh(
    new THREE.ShapeGeometry(makeStadiumShape(TRACK_CURVE_OUTER_RADIUS, TRACK_CURVE_OUTER_RADIUS + 0.18), 48),
    curbMaterial
  );
  curbOuter.rotation.x = -Math.PI / 2;
  curbOuter.position.y = 0.013;
  group.add(curbOuter);

  const laneMaterial = new THREE.LineBasicMaterial({ color: 0xf7efe1, transparent: true, opacity: 0.82 });
  for (let lane = 1; lane < TRACK_LANE_COUNT; lane += 1) {
    const laneRadius = TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * lane;
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(getTrackCurveLinePoints(laneRadius, 0.022, 52)), laneMaterial));
  }

  const pitch = new THREE.Mesh(
    getSharedPlaneGeometry(FOOTBALL_FIELD_HALF_WIDTH * 2, FOOTBALL_FIELD_HALF_LENGTH * 2),
    new THREE.MeshStandardMaterial({ color: 0x2f8f3d, roughness: 1 })
  );
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.y = 0.014;
  pitch.receiveShadow = true;
  group.add(pitch);

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xeef7eb, transparent: true, opacity: 0.94 });
  const boundaryInsetX = FOOTBALL_FIELD_HALF_WIDTH - 0.08;
  const boundaryInsetZ = FOOTBALL_FIELD_HALF_LENGTH - 0.08;
  const boundary = [
    new THREE.Vector3(-boundaryInsetX, 0.028, -boundaryInsetZ),
    new THREE.Vector3(boundaryInsetX, 0.028, -boundaryInsetZ),
    new THREE.Vector3(boundaryInsetX, 0.028, boundaryInsetZ),
    new THREE.Vector3(-boundaryInsetX, 0.028, boundaryInsetZ),
    new THREE.Vector3(-boundaryInsetX, 0.028, -boundaryInsetZ)
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(boundary), lineMaterial));

  const centerCircle = [];
  for (let i = 0; i <= 64; i += 1) {
    const a = (i / 64) * Math.PI * 2;
    centerCircle.push(new THREE.Vector3(Math.cos(a) * FOOTBALL_CENTER_CIRCLE_RADIUS, 0.028, Math.sin(a) * FOOTBALL_CENTER_CIRCLE_RADIUS));
  }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(centerCircle), lineMaterial));

  group.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-boundaryInsetX, 0.028, 0),
        new THREE.Vector3(boundaryInsetX, 0.028, 0)
      ]),
      lineMaterial
    )
  );

  const penaltyBoxHalfWidth = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 1.15, 4.2);
  const penaltyBoxDepth = 2.45;
  const goalBoxHalfWidth = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 2.1, 2.15);
  const goalBoxDepth = 1.05;
  [-1, 1].forEach((side) => {
    const goalZ = side * boundaryInsetZ;
    const penaltyFrontZ = goalZ - side * penaltyBoxDepth;
    const goalBoxFrontZ = goalZ - side * goalBoxDepth;
    const penaltyBox = [
      new THREE.Vector3(-penaltyBoxHalfWidth, 0.028, goalZ),
      new THREE.Vector3(-penaltyBoxHalfWidth, 0.028, penaltyFrontZ),
      new THREE.Vector3(penaltyBoxHalfWidth, 0.028, penaltyFrontZ),
      new THREE.Vector3(penaltyBoxHalfWidth, 0.028, goalZ)
    ];
    const goalBox = [
      new THREE.Vector3(-goalBoxHalfWidth, 0.028, goalZ),
      new THREE.Vector3(-goalBoxHalfWidth, 0.028, goalBoxFrontZ),
      new THREE.Vector3(goalBoxHalfWidth, 0.028, goalBoxFrontZ),
      new THREE.Vector3(goalBoxHalfWidth, 0.028, goalZ)
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(penaltyBox), lineMaterial));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(goalBox), lineMaterial));
  });

  const penaltySpotRadius = 0.085;
  const penaltySpotInstances = [-1, 1].map((side) => ({
    position: new THREE.Vector3(0, 0.029, side * (boundaryInsetZ - 1.85)),
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0)
  }));
  group.add(
    createStaticInstancedMesh({
      geometry: getSharedCircleGeometry(penaltySpotRadius, 16),
      material: fieldMarkMaterial,
      instances: penaltySpotInstances
    })
  );

  const cornerXs = [-boundaryInsetX, boundaryInsetX];
  const cornerZs = [-boundaryInsetZ, boundaryInsetZ];

  const penaltyArcRadius = 0.9;
  [-1, 1].forEach((side) => {
    const penaltySpotZ = side * (boundaryInsetZ - 1.85);
    const penaltyFrontZ = side * (boundaryInsetZ - penaltyBoxDepth);
    const arcPoints = [];
    for (let step = 0; step <= 48; step += 1) {
      const a = (step / 48) * Math.PI * 2;
      const px = Math.cos(a) * penaltyArcRadius;
      const pz = penaltySpotZ + Math.sin(a) * penaltyArcRadius;
      if (side * (pz - penaltyFrontZ) <= 0.001) {
        arcPoints.push(new THREE.Vector3(px, 0.028, pz));
      }
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPoints), lineMaterial));
  });

  const cornerArcRadius = 0.55;
  for (let xi = 0; xi < cornerXs.length; xi += 1) {
    for (let zi = 0; zi < cornerZs.length; zi += 1) {
      const xSign = Math.sign(cornerXs[xi]);
      const zSign = Math.sign(cornerZs[zi]);
      const arcPoints = [];
      const startAngle = xSign > 0 && zSign > 0 ? Math.PI : xSign > 0 && zSign < 0 ? Math.PI * 0.5 : xSign < 0 && zSign > 0 ? Math.PI * 1.5 : 0;
      for (let step = 0; step <= 16; step += 1) {
        const a = startAngle + (step / 16) * (Math.PI * 0.5);
        arcPoints.push(new THREE.Vector3(
          cornerXs[xi] + Math.cos(a) * cornerArcRadius,
          0.028,
          cornerZs[zi] + Math.sin(a) * cornerArcRadius
        ));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPoints), lineMaterial));
    }
  }

  const centerSpot = new THREE.Mesh(
    getSharedCircleGeometry(0.1, 18),
    fieldMarkMaterial
  );
  centerSpot.rotation.x = -Math.PI / 2;
  centerSpot.position.set(0, 0.029, 0);
  group.add(centerSpot);

  const flagColors = [0xf43f5e, 0xf59e0b, 0x22c55e, 0x38bdf8];
  const flagPoleInstances = [];
  const flagPennantInstances = [];
  let flagIndex = 0;
  for (let xi = 0; xi < cornerXs.length; xi += 1) {
    for (let zi = 0; zi < cornerZs.length; zi += 1) {
      const baseX = cornerXs[xi];
      const baseZ = cornerZs[zi];
      flagPoleInstances.push({
        position: new THREE.Vector3(baseX, 0.416, baseZ)
      });
      flagPennantInstances.push({
        position: new THREE.Vector3(baseX + 0.18, 0.676, baseZ),
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
        color: flagColors[flagIndex % flagColors.length]
      });
      flagIndex += 1;
    }
  }

  group.add(
    createStaticInstancedMesh({
      geometry: getSharedCylinderGeometry(0.028, 0.028, 0.8, 10),
      material: getSharedStandardMaterial(0xf8fafc),
      instances: flagPoleInstances
    }),
    createStaticInstancedMesh({
      geometry: getSharedPlaneGeometry(0.34, 0.2),
      material: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.95,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      }),
      instances: flagPennantInstances
    })
  );

  return group;
}

