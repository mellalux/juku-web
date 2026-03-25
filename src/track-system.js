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

const TRACK_SURFACE_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xad4f3b, roughness: 0.9 });
const TRACK_CURB_MATERIAL = getSharedStandardMaterial(0xf0f3ea, 0.9);
const FOOTBALL_FIELD_MARK_MATERIAL = getSharedStandardMaterial(0xeef7eb, 0.9);
const FOOTBALL_PITCH_MATERIAL = new THREE.MeshStandardMaterial({ color: 0x2f8f3d, roughness: 1 });
const TRACK_LANE_LINE_MATERIAL = new THREE.LineBasicMaterial({ color: 0xf7efe1, transparent: true, opacity: 0.82 });
const FOOTBALL_LINE_MATERIAL = new THREE.LineBasicMaterial({ color: 0xeef7eb, transparent: true, opacity: 0.94 });
const CORNER_FLAG_PENNANT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.95,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.95
});

const FOOTBALL_BOUNDARY_INSET_X = FOOTBALL_FIELD_HALF_WIDTH - 0.08;
const FOOTBALL_BOUNDARY_INSET_Z = FOOTBALL_FIELD_HALF_LENGTH - 0.08;
const FOOTBALL_PENALTY_BOX_HALF_WIDTH = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 1.15, 4.2);
const FOOTBALL_PENALTY_BOX_DEPTH = 2.45;
const FOOTBALL_GOAL_BOX_HALF_WIDTH = Math.min(FOOTBALL_FIELD_HALF_WIDTH - 2.1, 2.15);
const FOOTBALL_GOAL_BOX_DEPTH = 1.05;
const FOOTBALL_PENALTY_SPOT_RADIUS = 0.085;
const FOOTBALL_PENALTY_ARC_RADIUS = 0.9;
const FOOTBALL_CORNER_ARC_RADIUS = 0.55;

const TRACK_SURFACE_GEOMETRY = new THREE.ShapeGeometry(
  makeStadiumShape(TRACK_CURVE_INNER_RADIUS, TRACK_CURVE_OUTER_RADIUS),
  64
);
const TRACK_CURB_INNER_GEOMETRY = new THREE.ShapeGeometry(
  makeStadiumShape(TRACK_CURVE_INNER_RADIUS - 0.18, TRACK_CURVE_INNER_RADIUS),
  48
);
const TRACK_CURB_OUTER_GEOMETRY = new THREE.ShapeGeometry(
  makeStadiumShape(TRACK_CURVE_OUTER_RADIUS, TRACK_CURVE_OUTER_RADIUS + 0.18),
  48
);

const TRACK_LANE_LINE_GEOMETRIES = [];
for (let lane = 1; lane < TRACK_LANE_COUNT; lane += 1) {
  const laneRadius = TRACK_CURVE_INNER_RADIUS + TRACK_LANE_WIDTH * lane;
  TRACK_LANE_LINE_GEOMETRIES.push(
    new THREE.BufferGeometry().setFromPoints(getTrackCurveLinePoints(laneRadius, 0.022, 52))
  );
}

const FOOTBALL_BOUNDARY_GEOMETRY = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-FOOTBALL_BOUNDARY_INSET_X, 0.028, -FOOTBALL_BOUNDARY_INSET_Z),
  new THREE.Vector3(FOOTBALL_BOUNDARY_INSET_X, 0.028, -FOOTBALL_BOUNDARY_INSET_Z),
  new THREE.Vector3(FOOTBALL_BOUNDARY_INSET_X, 0.028, FOOTBALL_BOUNDARY_INSET_Z),
  new THREE.Vector3(-FOOTBALL_BOUNDARY_INSET_X, 0.028, FOOTBALL_BOUNDARY_INSET_Z),
  new THREE.Vector3(-FOOTBALL_BOUNDARY_INSET_X, 0.028, -FOOTBALL_BOUNDARY_INSET_Z)
]);

const FOOTBALL_CENTER_CIRCLE_POINTS = [];
for (let i = 0; i <= 64; i += 1) {
  const a = (i / 64) * Math.PI * 2;
  FOOTBALL_CENTER_CIRCLE_POINTS.push(
    new THREE.Vector3(Math.cos(a) * FOOTBALL_CENTER_CIRCLE_RADIUS, 0.028, Math.sin(a) * FOOTBALL_CENTER_CIRCLE_RADIUS)
  );
}
const FOOTBALL_CENTER_CIRCLE_GEOMETRY = new THREE.BufferGeometry().setFromPoints(FOOTBALL_CENTER_CIRCLE_POINTS);
const FOOTBALL_MIDLINE_GEOMETRY = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-FOOTBALL_BOUNDARY_INSET_X, 0.028, 0),
  new THREE.Vector3(FOOTBALL_BOUNDARY_INSET_X, 0.028, 0)
]);

const FOOTBALL_PENALTY_BOX_GEOMETRIES = [];
const FOOTBALL_GOAL_BOX_GEOMETRIES = [];
const FOOTBALL_PENALTY_ARC_GEOMETRIES = [];
for (let sideIndex = 0; sideIndex < 2; sideIndex += 1) {
  const side = sideIndex === 0 ? -1 : 1;
  const goalZ = side * FOOTBALL_BOUNDARY_INSET_Z;
  const penaltyFrontZ = goalZ - side * FOOTBALL_PENALTY_BOX_DEPTH;
  const goalBoxFrontZ = goalZ - side * FOOTBALL_GOAL_BOX_DEPTH;
  FOOTBALL_PENALTY_BOX_GEOMETRIES.push(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-FOOTBALL_PENALTY_BOX_HALF_WIDTH, 0.028, goalZ),
      new THREE.Vector3(-FOOTBALL_PENALTY_BOX_HALF_WIDTH, 0.028, penaltyFrontZ),
      new THREE.Vector3(FOOTBALL_PENALTY_BOX_HALF_WIDTH, 0.028, penaltyFrontZ),
      new THREE.Vector3(FOOTBALL_PENALTY_BOX_HALF_WIDTH, 0.028, goalZ)
    ])
  );
  FOOTBALL_GOAL_BOX_GEOMETRIES.push(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-FOOTBALL_GOAL_BOX_HALF_WIDTH, 0.028, goalZ),
      new THREE.Vector3(-FOOTBALL_GOAL_BOX_HALF_WIDTH, 0.028, goalBoxFrontZ),
      new THREE.Vector3(FOOTBALL_GOAL_BOX_HALF_WIDTH, 0.028, goalBoxFrontZ),
      new THREE.Vector3(FOOTBALL_GOAL_BOX_HALF_WIDTH, 0.028, goalZ)
    ])
  );

  const penaltySpotZ = side * (FOOTBALL_BOUNDARY_INSET_Z - 1.85);
  const arcPoints = [];
  for (let step = 0; step <= 48; step += 1) {
    const a = (step / 48) * Math.PI * 2;
    const px = Math.cos(a) * FOOTBALL_PENALTY_ARC_RADIUS;
    const pz = penaltySpotZ + Math.sin(a) * FOOTBALL_PENALTY_ARC_RADIUS;
    if (side * (pz - penaltyFrontZ) <= 0.001) {
      arcPoints.push(new THREE.Vector3(px, 0.028, pz));
    }
  }
  FOOTBALL_PENALTY_ARC_GEOMETRIES.push(new THREE.BufferGeometry().setFromPoints(arcPoints));
}

const FOOTBALL_CORNER_ARC_GEOMETRIES = [];
const FOOTBALL_CORNER_XS = [-FOOTBALL_BOUNDARY_INSET_X, FOOTBALL_BOUNDARY_INSET_X];
const FOOTBALL_CORNER_ZS = [-FOOTBALL_BOUNDARY_INSET_Z, FOOTBALL_BOUNDARY_INSET_Z];
for (let xi = 0; xi < FOOTBALL_CORNER_XS.length; xi += 1) {
  for (let zi = 0; zi < FOOTBALL_CORNER_ZS.length; zi += 1) {
    const xSign = Math.sign(FOOTBALL_CORNER_XS[xi]);
    const zSign = Math.sign(FOOTBALL_CORNER_ZS[zi]);
    const arcPoints = [];
    const startAngle = xSign > 0 && zSign > 0 ? Math.PI : xSign > 0 && zSign < 0 ? Math.PI * 0.5 : xSign < 0 && zSign > 0 ? Math.PI * 1.5 : 0;
    for (let step = 0; step <= 16; step += 1) {
      const a = startAngle + (step / 16) * (Math.PI * 0.5);
      arcPoints.push(new THREE.Vector3(
        FOOTBALL_CORNER_XS[xi] + Math.cos(a) * FOOTBALL_CORNER_ARC_RADIUS,
        0.028,
        FOOTBALL_CORNER_ZS[zi] + Math.sin(a) * FOOTBALL_CORNER_ARC_RADIUS
      ));
    }
    FOOTBALL_CORNER_ARC_GEOMETRIES.push(new THREE.BufferGeometry().setFromPoints(arcPoints));
  }
}

const FOOTBALL_PENALTY_SPOT_INSTANCES = [-1, 1].map((side) => ({
  position: new THREE.Vector3(0, 0.029, side * (FOOTBALL_BOUNDARY_INSET_Z - 1.85)),
  rotation: new THREE.Euler(-Math.PI / 2, 0, 0)
}));

const FOOTBALL_CORNER_FLAG_COLORS = [0xf43f5e, 0xf59e0b, 0x22c55e, 0x38bdf8];
const FOOTBALL_FLAG_POLE_INSTANCES = [];
const FOOTBALL_FLAG_PENNANT_INSTANCES = [];
let footballFlagIndex = 0;
for (let xi = 0; xi < FOOTBALL_CORNER_XS.length; xi += 1) {
  for (let zi = 0; zi < FOOTBALL_CORNER_ZS.length; zi += 1) {
    const baseX = FOOTBALL_CORNER_XS[xi];
    const baseZ = FOOTBALL_CORNER_ZS[zi];
    FOOTBALL_FLAG_POLE_INSTANCES.push({
      position: new THREE.Vector3(baseX, 0.416, baseZ)
    });
    FOOTBALL_FLAG_PENNANT_INSTANCES.push({
      position: new THREE.Vector3(baseX + 0.18, 0.676, baseZ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
      color: FOOTBALL_CORNER_FLAG_COLORS[footballFlagIndex % FOOTBALL_CORNER_FLAG_COLORS.length]
    });
    footballFlagIndex += 1;
  }
}

export function buildRunningTrack() {
  const group = new THREE.Group();

  const track = new THREE.Mesh(
    TRACK_SURFACE_GEOMETRY,
    TRACK_SURFACE_MATERIAL
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = 0.012;
  track.receiveShadow = true;
  group.add(track);

  const curbInner = new THREE.Mesh(
    TRACK_CURB_INNER_GEOMETRY,
    TRACK_CURB_MATERIAL
  );
  curbInner.rotation.x = -Math.PI / 2;
  curbInner.position.y = 0.013;
  group.add(curbInner);

  const curbOuter = new THREE.Mesh(
    TRACK_CURB_OUTER_GEOMETRY,
    TRACK_CURB_MATERIAL
  );
  curbOuter.rotation.x = -Math.PI / 2;
  curbOuter.position.y = 0.013;
  group.add(curbOuter);

  for (let i = 0; i < TRACK_LANE_LINE_GEOMETRIES.length; i += 1) {
    group.add(new THREE.Line(TRACK_LANE_LINE_GEOMETRIES[i], TRACK_LANE_LINE_MATERIAL));
  }

  const pitch = new THREE.Mesh(
    getSharedPlaneGeometry(FOOTBALL_FIELD_HALF_WIDTH * 2, FOOTBALL_FIELD_HALF_LENGTH * 2),
    FOOTBALL_PITCH_MATERIAL
  );
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.y = 0.014;
  pitch.receiveShadow = true;
  group.add(pitch);

  group.add(new THREE.Line(FOOTBALL_BOUNDARY_GEOMETRY, FOOTBALL_LINE_MATERIAL));
  group.add(new THREE.Line(FOOTBALL_CENTER_CIRCLE_GEOMETRY, FOOTBALL_LINE_MATERIAL));

  group.add(
    new THREE.Line(FOOTBALL_MIDLINE_GEOMETRY, FOOTBALL_LINE_MATERIAL)
  );

  for (let i = 0; i < FOOTBALL_PENALTY_BOX_GEOMETRIES.length; i += 1) {
    group.add(new THREE.Line(FOOTBALL_PENALTY_BOX_GEOMETRIES[i], FOOTBALL_LINE_MATERIAL));
    group.add(new THREE.Line(FOOTBALL_GOAL_BOX_GEOMETRIES[i], FOOTBALL_LINE_MATERIAL));
  }

  group.add(
    createStaticInstancedMesh({
      geometry: getSharedCircleGeometry(FOOTBALL_PENALTY_SPOT_RADIUS, 16),
      material: FOOTBALL_FIELD_MARK_MATERIAL,
      instances: FOOTBALL_PENALTY_SPOT_INSTANCES
    })
  );

  for (let i = 0; i < FOOTBALL_PENALTY_ARC_GEOMETRIES.length; i += 1) {
    group.add(new THREE.Line(FOOTBALL_PENALTY_ARC_GEOMETRIES[i], FOOTBALL_LINE_MATERIAL));
  }

  for (let i = 0; i < FOOTBALL_CORNER_ARC_GEOMETRIES.length; i += 1) {
    group.add(new THREE.Line(FOOTBALL_CORNER_ARC_GEOMETRIES[i], FOOTBALL_LINE_MATERIAL));
  }

  const centerSpot = new THREE.Mesh(
    getSharedCircleGeometry(0.1, 18),
    FOOTBALL_FIELD_MARK_MATERIAL
  );
  centerSpot.rotation.x = -Math.PI / 2;
  centerSpot.position.set(0, 0.029, 0);
  group.add(centerSpot);

  group.add(
    createStaticInstancedMesh({
      geometry: getSharedCylinderGeometry(0.028, 0.028, 0.8, 10),
      material: getSharedStandardMaterial(0xf8fafc),
      instances: FOOTBALL_FLAG_POLE_INSTANCES
    }),
    createStaticInstancedMesh({
      geometry: getSharedPlaneGeometry(0.34, 0.2),
      material: CORNER_FLAG_PENNANT_MATERIAL,
      instances: FOOTBALL_FLAG_PENNANT_INSTANCES
    })
  );

  return group;
}

