import {
  COACH_PERSON_RADIUS,
  FOOTBALL_PERSON_RADIUS,
  JUKU_COLLIDER_RADIUS,
  TRACK_PERSON_RADIUS
} from "./game-config.js";

const COLLISION_IGNORE_GOAL_OPTIONS = { ignoreGoalColliders: true };
const COLLISION_SCRATCH_RESULT = { x: 0, z: 0 };
const COLLISION_SCRATCH_CLAMP = { x: 0, z: 0 };
const COLLISION_PEOPLE_POOL = [];

function getCollisionPersonSlot(index) {
  if (!COLLISION_PEOPLE_POOL[index]) {
    COLLISION_PEOPLE_POOL[index] = {
      kind: "",
      ref: null,
      radius: 0,
      x: 0,
      z: 0
    };
  }
  return COLLISION_PEOPLE_POOL[index];
}

function assignCollisionPerson(slot, kind, ref, radius, x, z) {
  slot.kind = kind;
  slot.ref = ref;
  slot.radius = radius;
  slot.x = x;
  slot.z = z;
  return slot;
}

function resolveJukuCollisionsIntoRuntime(result, nextX, nextZ, colliders, options = {}) {
  result.x = nextX;
  result.z = nextZ;
  if (!colliders || colliders.length === 0) return result;
  const ignoreGoalColliders = options.ignoreGoalColliders ?? false;

  for (let pass = 0; pass < 4; pass += 1) {
    let moved = false;

    for (let i = 0; i < colliders.length; i += 1) {
      const collider = colliders[i];
      if (ignoreGoalColliders && collider.role === "goal") continue;

      if (collider.type === "circle") {
        const minDist = collider.r + JUKU_COLLIDER_RADIUS;
        const dx = result.x - collider.x;
        const dz = result.z - collider.z;
        const distSq = dx * dx + dz * dz;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const nx = dist > 0.0001 ? dx / dist : 1;
          const nz = dist > 0.0001 ? dz / dist : 0;
          result.x = collider.x + nx * minDist;
          result.z = collider.z + nz * minDist;
          moved = true;
        }
        continue;
      }

      const sin = Math.sin(collider.yaw);
      const cos = Math.cos(collider.yaw);
      const relX = result.x - collider.x;
      const relZ = result.z - collider.z;
      let localX = relX * cos + relZ * sin;
      let localZ = -relX * sin + relZ * cos;
      const halfX = collider.halfX + JUKU_COLLIDER_RADIUS;
      const halfZ = collider.halfZ + JUKU_COLLIDER_RADIUS;

      if (Math.abs(localX) <= halfX && Math.abs(localZ) <= halfZ) {
        const penX = halfX - Math.abs(localX);
        const penZ = halfZ - Math.abs(localZ);
        if (penX < penZ) {
          localX = (localX >= 0 ? 1 : -1) * halfX;
        } else {
          localZ = (localZ >= 0 ? 1 : -1) * halfZ;
        }
        result.x = collider.x + localX * cos - localZ * sin;
        result.z = collider.z + localX * sin + localZ * cos;
        moved = true;
      }
    }

    if (!moved) break;
  }

  return result;
}

export function resolveJukuCollisionsRuntime(nextX, nextZ, colliders, options = {}) {
  return resolveJukuCollisionsIntoRuntime(COLLISION_SCRATCH_RESULT, nextX, nextZ, colliders, options);
}

export function resolvePeopleCollisionsRuntime(
  game,
  state,
  {
    colliders,
    clampFootballHumanPosition,
    clampFootballRefereePosition,
    clampGoalInteriorPosition,
    getTrackPointAtProgress
  }
) {
  const people = COLLISION_PEOPLE_POOL;
  let peopleCount = 0;

  for (let i = 0; i < game.players.length; i += 1) {
    const p = game.players[i];
    assignCollisionPerson(
      getCollisionPersonSlot(peopleCount),
      "football",
      p,
      FOOTBALL_PERSON_RADIUS,
      p.runner.root.position.x,
      p.runner.root.position.z
    );
    peopleCount += 1;
  }

  for (let i = 0; i < game.trackRunners.length; i += 1) {
    const r = game.trackRunners[i];
    assignCollisionPerson(
      getCollisionPersonSlot(peopleCount),
      "track",
      r,
      TRACK_PERSON_RADIUS,
      r.runner.root.position.x,
      r.runner.root.position.z
    );
    peopleCount += 1;
  }

  if (game.coach) {
    assignCollisionPerson(
      getCollisionPersonSlot(peopleCount),
      "coach",
      game.coach,
      COACH_PERSON_RADIUS,
      game.coach.runner.root.position.x,
      game.coach.runner.root.position.z
    );
    peopleCount += 1;
  }

  assignCollisionPerson(
    getCollisionPersonSlot(peopleCount),
    "juku",
    null,
    JUKU_COLLIDER_RADIUS,
    state.x,
    state.z
  );
  peopleCount += 1;
  people.length = peopleCount;

  const clampFootball = (person) => {
    const clamped = clampFootballHumanPosition(person.x, person.z, COLLISION_SCRATCH_CLAMP);
    person.x = clamped.x;
    person.z = clamped.z;
  };

  const constrainPerson = (person) => {
    if (person.kind === "football") {
      clampFootball(person);
      return;
    }
    if (person.kind === "track") {
      const point = getTrackPointAtProgress(person.ref.laneIndex, person.ref.progress);
      person.x = point.x;
      person.z = point.z;
      return;
    }
    if (person.kind === "coach") {
      const clamped = clampFootballRefereePosition(person.x, person.z, COLLISION_SCRATCH_CLAMP);
      person.x = clamped.x;
      person.z = clamped.z;
      const resolved = resolveJukuCollisionsIntoRuntime(COLLISION_SCRATCH_RESULT, person.x, person.z, colliders);
      person.x = resolved.x;
      person.z = resolved.z;
      return;
    }
    const resolved = resolveJukuCollisionsIntoRuntime(
      COLLISION_SCRATCH_RESULT,
      person.x,
      person.z,
      colliders,
      COLLISION_IGNORE_GOAL_OPTIONS
    );
    const clamped = clampGoalInteriorPosition(resolved.x, resolved.z, COLLISION_SCRATCH_CLAMP);
    person.x = clamped.x;
    person.z = clamped.z;
  };

  for (let pass = 0; pass < 4; pass += 1) {
    let moved = false;

    for (let i = 0; i < peopleCount; i += 1) {
      const a = people[i];
      for (let j = i + 1; j < peopleCount; j += 1) {
        const b = people[j];
        if (game.refRestart?.active && (a.kind === "coach" || b.kind === "coach")) {
          continue;
        }
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const minDist = a.radius + b.radius;
        const distSq = dx * dx + dz * dz;
        if (distSq >= minDist * minDist) continue;

        const dist = Math.sqrt(distSq);
        const nx = dist > 0.0001 ? dx / dist : 1;
        const nz = dist > 0.0001 ? dz / dist : 0;
        const overlap = minDist - dist;
        const split = overlap * 0.5;

        a.x -= nx * split;
        a.z -= nz * split;
        b.x += nx * split;
        b.z += nz * split;
        moved = true;
      }
    }

    for (let i = 0; i < peopleCount; i += 1) {
      constrainPerson(people[i]);
    }

    if (!moved) break;
  }

  for (let i = 0; i < peopleCount; i += 1) {
    const person = people[i];
    if (person.kind === "football") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      continue;
    }
    if (person.kind === "track") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      const point = getTrackPointAtProgress(person.ref.laneIndex, person.ref.progress);
      const dir = person.ref.dir ?? 1;
      person.ref.runner.root.rotation.y = Math.atan2(point.dirX * dir, point.dirZ * dir);
      continue;
    }
    if (person.kind === "coach") {
      person.ref.runner.root.position.x = person.x;
      person.ref.runner.root.position.z = person.z;
      continue;
    }
    state.x = person.x;
    state.z = person.z;
  }
}
