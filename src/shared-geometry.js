import * as THREE from "./three.js";

const geometryCache = new Map();

function getCachedGeometry(key, createGeometry) {
  let geometry = geometryCache.get(key);
  if (!geometry) {
    geometry = createGeometry();
    geometryCache.set(key, geometry);
  }
  return geometry;
}

export function getSharedBoxGeometry(width, height, depth) {
  return getCachedGeometry(
    `box:${width}:${height}:${depth}`,
    () => new THREE.BoxGeometry(width, height, depth)
  );
}

export function getSharedCapsuleGeometry(radius, length, capSegments = 4, radialSegments = 8) {
  return getCachedGeometry(
    `capsule:${radius}:${length}:${capSegments}:${radialSegments}`,
    () => new THREE.CapsuleGeometry(radius, length, capSegments, radialSegments)
  );
}

export function getSharedCircleGeometry(radius, segments = 8) {
  return getCachedGeometry(
    `circle:${radius}:${segments}`,
    () => new THREE.CircleGeometry(radius, segments)
  );
}

export function getSharedCylinderGeometry(radiusTop, radiusBottom, height, radialSegments = 8) {
  return getCachedGeometry(
    `cylinder:${radiusTop}:${radiusBottom}:${height}:${radialSegments}`,
    () => new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
  );
}

export function getSharedPlaneGeometry(width, height) {
  return getCachedGeometry(
    `plane:${width}:${height}`,
    () => new THREE.PlaneGeometry(width, height)
  );
}

export function getSharedSphereGeometry(
  radius,
  widthSegments = 8,
  heightSegments = 6,
  phiStart = 0,
  phiLength = Math.PI * 2,
  thetaStart = 0,
  thetaLength = Math.PI
) {
  return getCachedGeometry(
    `sphere:${radius}:${widthSegments}:${heightSegments}:${phiStart}:${phiLength}:${thetaStart}:${thetaLength}`,
    () => new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
  );
}

export function getSharedTorusGeometry(radius, tube, radialSegments = 8, tubularSegments = 6) {
  return getCachedGeometry(
    `torus:${radius}:${tube}:${radialSegments}:${tubularSegments}`,
    () => new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)
  );
}
