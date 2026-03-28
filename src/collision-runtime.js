import {
  FOOTBALL_BALL_RADIUS,
  COACH_PERSON_RADIUS,
  FOOTBALL_FIELD_HALF_LENGTH,
  FOOTBALL_GOAL_DEPTH,
  FOOTBALL_GOAL_WIDTH,
  FOOTBALL_PERSON_RADIUS,
  JUKU_COLLIDER_RADIUS,
  TRACK_PERSON_RADIUS
} from "./game-config.js";

const COLLISION_SCRATCH_RESULT = { x: 0, z: 0 };
const COLLISION_SCRATCH_CLAMP = { x: 0, z: 0 };
const COLLISION_PEOPLE_POOL = [];

function getFootballGoalInteriorState(x, z) {
  const side = Math.sign(z || 0);
  if (side === 0) return null;

  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalTraverseFrontDepth = goalLine - (JUKU_COLLIDER_RADIUS + 0.2);
  const goalDepthLimit = goalLine + FOOTBALL_GOAL_DEPTH - 0.38;
  const goalMouthHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 - JUKU_COLLIDER_RADIUS - 0.04;
  const depth = z * side;
  if (depth < goalTraverseFrontDepth || depth > goalDepthLimit || Math.abs(x) > goalMouthHalfWidth + 0.08) {
    return null;
  }

  return { side, depth };
}

export function canTraverseFootballGoalPocket(prevX, prevZ, nextX, nextZ) {
  const goalLine = FOOTBALL_FIELD_HALF_LENGTH - 0.9;
  const goalTraverseFrontDepth = goalLine - (JUKU_COLLIDER_RADIUS + 0.2);
  const goalMouthHalfWidth = FOOTBALL_GOAL_WIDTH * 0.5 - JUKU_COLLIDER_RADIUS - 0.04;
  const previous = getFootballGoalInteriorState(prevX, prevZ);
  const next = getFootballGoalInteriorState(nextX, nextZ);

  if (previous) {
    return true;
  }
  if (!next) {
    return false;
  }

  const prevSide = Math.sign(prevZ || nextZ || 0) || next.side;
  if (prevSide !== next.side) {
    return false;
  }

  const prevDepth = prevZ * next.side;
  return prevDepth <= goalTraverseFrontDepth + 0.08
    && Math.abs(prevX) <= goalMouthHalfWidth + 0.08;
}

function getCollisionPersonSlot(index) {
  if (!COLLISION_PEOPLE_POOL[index]) {
    COLLISION_PEOPLE_POOL[index] = {
      kind: "",
      ref: null,
      prevX: 0,
      prevZ: 0,
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
  slot.prevX = x;
  slot.prevZ = z;
  slot.radius = radius;
  slot.x = x;
  slot.z = z;
  return slot;
}

function getPeoplePairCollisionResponse(a, b) {
  return {
    minDist: a.radius + b.radius,
    aShare: 0.5,
    bShare: 0.5
  };
}

function canApplyLooseBallHumanContact(game) {
  return Boolean(game?.ball)
    && !game.ballHolder
    && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.58;
}

function canEnforceGroundBallBodySeparation(game) {
  return Boolean(game?.ball)
    && game.ball.position.y <= FOOTBALL_BALL_RADIUS + 0.58;
}

function moveLooseBallWithColliders(game, moveX, moveZ) {
  const totalDist = Math.hypot(moveX, moveZ);
  if (totalDist <= 0.0001) return false;

  const stepSize = Math.max(0.06, FOOTBALL_BALL_RADIUS * 0.4);
  const steps = Math.max(1, Math.ceil(totalDist / stepSize));
  let blocked = false;
  let currentX = game.ball.position.x;
  let currentZ = game.ball.position.z;

  for (let i = 0; i < steps; i += 1) {
    const nextX = currentX + moveX / steps;
    const nextZ = currentZ + moveZ / steps;
    const resolved = resolveCircularCollisionsIntoRuntime(
      COLLISION_SCRATCH_RESULT,
      nextX,
      nextZ,
      FOOTBALL_BALL_RADIUS,
      game.colliders ?? []
    );
    if (Math.hypot(resolved.x - nextX, resolved.z - nextZ) > 0.0005) {
      blocked = true;
    }
    currentX = resolved.x;
    currentZ = resolved.z;
  }

  game.ball.position.x = currentX;
  game.ball.position.z = currentZ;
  return blocked;
}

function personHasBallOverlapPrivilege(game, person) {
  if (person.kind === "coach") {
    return Boolean(game.refRestart?.active)
      && game.refRestart.phase !== "clear"
      && game.refRestart.phase !== "toBall";
  }
  if (person.kind !== "football" || !person.ref) return false;

  const player = person.ref;
  if ((game.kickoffScriptTimer ?? 0) > 0.001 && player.kickoffRole === "taker" && player.team === (game.restartTeam ?? 0)) {
    return true;
  }
  return player === game.ballHolder
    || player === game.firstTouchPlayer
    || player === game.touchShieldPlayer
    || player === game.duelControlPlayer
    || player === game.contestOwnerPlayer
    || player === game.kickoffReceiver;
}

function applyLooseBallContactForPerson(game, person, dt, constrainPerson) {
  const dx = game.ball.position.x - person.x;
  const dz = game.ball.position.z - person.z;
  const dist = Math.hypot(dx, dz);
  const minDist = person.radius + FOOTBALL_BALL_RADIUS + 0.06;
  if (dist >= minDist) return false;

  const moveDx = person.x - person.prevX;
  const moveDz = person.z - person.prevZ;
  const moveDist = Math.hypot(moveDx, moveDz);
  const moveDirX = moveDist > 0.0001 ? moveDx / moveDist : 0;
  const moveDirZ = moveDist > 0.0001 ? moveDz / moveDist : 0;
  const nx = dist > 0.0001 ? dx / dist : (moveDirX || 1);
  const nz = dist > 0.0001 ? dz / dist : moveDirZ;
  const overlap = minDist - dist;
  const ballShove = Math.max(0.04, overlap * 0.88);

  const ballBlocked = moveLooseBallWithColliders(game, nx * ballShove, nz * ballShove);
  person.x = game.ball.position.x - nx * minDist;
  person.z = game.ball.position.z - nz * minDist;
  constrainPerson(person);

  const moveSpeed = dt > 0.0001 ? moveDist / dt : 0;
  const pushSpeed = 0.36 + Math.min(2.8, overlap * 7.4 + moveSpeed * 0.34);
  game.ballVel.x += nx * (pushSpeed * 0.62) + moveDirX * (pushSpeed * 0.38);
  game.ballVel.z += nz * (pushSpeed * 0.62) + moveDirZ * (pushSpeed * 0.38);
  const planarSpeed = Math.hypot(game.ballVel.x, game.ballVel.z);
  const maxPlanarSpeed = 5.4;
  if (planarSpeed > maxPlanarSpeed) {
    const scale = maxPlanarSpeed / planarSpeed;
    game.ballVel.x *= scale;
    game.ballVel.z *= scale;
  }
  if (ballBlocked) {
    game.ballVel.x *= 0.72;
    game.ballVel.z *= 0.72;
  }
  game.ballVel.y = Math.min(game.ballVel.y, 0.12);
  if (game.ball.position.y < FOOTBALL_BALL_RADIUS) {
    game.ball.position.y = FOOTBALL_BALL_RADIUS;
  }
  return true;
}

function applyGroundBallSeparationForPerson(game, person, constrainPerson) {
  if (personHasBallOverlapPrivilege(game, person)) return false;

  const dx = game.ball.position.x - person.x;
  const dz = game.ball.position.z - person.z;
  const dist = Math.hypot(dx, dz);
  const minDist = person.radius + FOOTBALL_BALL_RADIUS + 0.06;
  if (dist >= minDist) return false;

  const nx = dist > 0.0001 ? dx / dist : 1;
  const nz = dist > 0.0001 ? dz / dist : 0;
  person.x = game.ball.position.x - nx * minDist;
  person.z = game.ball.position.z - nz * minDist;
  constrainPerson(person);
  return true;
}

function resolveCircularCollisionsIntoRuntime(result, nextX, nextZ, radius, colliders, options = {}) {
  result.x = nextX;
  result.z = nextZ;
  if (!colliders || colliders.length === 0) return result;
  const ignoreGoalColliders = options.ignoreGoalColliders ?? false;

  for (let pass = 0; pass < 4; pass += 1) {
    let moved = false;

    for (let i = 0; i < colliders.length; i += 1) {
      const collider = colliders[i];
      if (ignoreGoalColliders && typeof collider.role === "string" && collider.role.startsWith("goal")) continue;

      if (collider.type === "circle") {
        const minDist = collider.r + radius;
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
      const halfX = collider.halfX + radius;
      const halfZ = collider.halfZ + radius;

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

function resolveJukuCollisionsIntoRuntime(result, nextX, nextZ, colliders, options = {}) {
  return resolveCircularCollisionsIntoRuntime(result, nextX, nextZ, JUKU_COLLIDER_RADIUS, colliders, options);
}

export function resolveJukuCollisionsRuntime(nextX, nextZ, colliders, options = {}) {
  return resolveJukuCollisionsIntoRuntime(COLLISION_SCRATCH_RESULT, nextX, nextZ, colliders, options);
}

export function resolvePeopleCollisionsRuntime(
  game,
  state,
  dt,
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
      const resolved = resolveCircularCollisionsIntoRuntime(
        COLLISION_SCRATCH_RESULT,
        person.x,
        person.z,
        person.radius,
        colliders
      );
      person.x = resolved.x;
      person.z = resolved.z;
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
      const resolved = resolveCircularCollisionsIntoRuntime(
        COLLISION_SCRATCH_RESULT,
        person.x,
        person.z,
        person.radius,
        colliders
      );
      person.x = resolved.x;
      person.z = resolved.z;
      return;
    }
    const resolved = resolveCircularCollisionsIntoRuntime(
      COLLISION_SCRATCH_RESULT,
      person.x,
      person.z,
      person.radius,
      colliders
    );
    const clamped = clampGoalInteriorPosition(
      resolved.x,
      resolved.z,
      COLLISION_SCRATCH_CLAMP,
      person.prevX,
      person.prevZ
    );
    person.x = clamped.x;
    person.z = clamped.z;
  };

  for (let pass = 0; pass < 6; pass += 1) {
    let moved = false;

    for (let i = 0; i < peopleCount; i += 1) {
      const a = people[i];
      for (let j = i + 1; j < peopleCount; j += 1) {
        const b = people[j];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const response = getPeoplePairCollisionResponse(a, b);
        const minDist = response.minDist;
        const distSq = dx * dx + dz * dz;
        if (distSq >= minDist * minDist) continue;

        const dist = Math.sqrt(distSq);
        const nx = dist > 0.0001 ? dx / dist : 1;
        const nz = dist > 0.0001 ? dz / dist : 0;
        const overlap = minDist - dist;
        const aSplit = overlap * response.aShare;
        const bSplit = overlap * response.bShare;

        a.x -= nx * aSplit;
        a.z -= nz * aSplit;
        b.x += nx * bSplit;
        b.z += nz * bSplit;
        moved = true;
      }
    }

    for (let i = 0; i < peopleCount; i += 1) {
      constrainPerson(people[i]);
    }

    if (!moved) break;
  }

  if (canApplyLooseBallHumanContact(game)) {
    for (let pass = 0; pass < 2; pass += 1) {
      let movedBall = false;
      for (let i = 0; i < peopleCount; i += 1) {
        movedBall = applyLooseBallContactForPerson(game, people[i], dt, constrainPerson) || movedBall;
      }
      if (!movedBall) break;
    }
  } else if (canEnforceGroundBallBodySeparation(game)) {
    for (let pass = 0; pass < 2; pass += 1) {
      let movedPerson = false;
      for (let i = 0; i < peopleCount; i += 1) {
        movedPerson = applyGroundBallSeparationForPerson(game, people[i], constrainPerson) || movedPerson;
      }
      if (!movedPerson) break;
    }
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
