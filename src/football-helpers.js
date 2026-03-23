import { FOOTBALL_ROLE_LABELS } from "./game-config.js";

function getDefaultFootballRole(lane) {
  if (lane === 0) return "keeper";
  if (lane <= 2) return "defender";
  return "attacker";
}

export function normalizeFootballRosterEntry(entry, teamName, lane) {
  const fallbackName = teamName === "red" ? `Red ${lane + 1}` : `Blue ${lane + 1}`;
  const fallbackRole = getDefaultFootballRole(lane);
  const rosterEntry = entry ?? {};
  const role = rosterEntry.role ?? fallbackRole;
  return {
    number: rosterEntry.number ?? 0,
    name: rosterEntry.name ?? fallbackName,
    role,
    positionLabel: rosterEntry.positionLabel ?? FOOTBALL_ROLE_LABELS[role] ?? role,
    preferredFoot: rosterEntry.preferredFoot ?? "right",
    trait: rosterEntry.trait ?? null,
    speedProfile: rosterEntry.speedProfile ?? "balanced",
    attackProfile: rosterEntry.attackProfile ?? null,
    homeX: rosterEntry.homeX ?? null,
    homeZ: rosterEntry.homeZ ?? null
  };
}

export function getFootballSpeedProfileModifiers(speedProfile) {
  switch (speedProfile) {
    case "slow":
      return { speedBias: -0.28, burstBoost: -0.12 };
    case "fast":
      return { speedBias: 0.24, burstBoost: 0.12 };
    case "sprinter":
      return { speedBias: 0.42, burstBoost: 0.24 };
    default:
      return { speedBias: 0, burstBoost: 0 };
  }
}

export function getFootballTraitModifiers(trait, role) {
  const modifiers = {
    shotHunger: 0,
    speedBias: 0,
    pressBias: 0,
    burstBoost: 0,
    passVision: 0,
    tackleBias: 0,
    saveReach: 0,
    shotPower: 0,
    shotAccuracy: 0,
    crossQuality: 0,
    dribbleBias: 0
  };
  switch (trait) {
    case "pace":
      modifiers.speedBias += 0.12;
      modifiers.burstBoost += 0.08;
      modifiers.dribbleBias += 0.08;
      break;
    case "finish":
      modifiers.shotHunger += 0.16;
      modifiers.shotPower += 0.18;
      modifiers.shotAccuracy += 0.14;
      break;
    case "dribble":
      modifiers.speedBias += 0.05;
      modifiers.dribbleBias += 0.18;
      break;
    case "press":
      modifiers.pressBias += 0.16;
      modifiers.tackleBias += 0.08;
      break;
    case "tackle":
      modifiers.pressBias += 0.08;
      modifiers.tackleBias += 0.18;
      break;
    case "intercept":
      modifiers.pressBias += 0.1;
      modifiers.passVision += 0.06;
      modifiers.tackleBias += 0.12;
      break;
    case "mark":
      modifiers.pressBias += 0.08;
      modifiers.tackleBias += 0.1;
      break;
    case "reflex":
      modifiers.saveReach += role === "keeper" ? 0.22 : 0;
      break;
  }
  return modifiers;
}

export function getFootballFootedness(player, ball, targetX = null) {
  const preferred = player?.preferredFoot === "left" ? "left" : "right";
  let naturalSide = preferred === "left" ? 1 : -1;
  let weakFoot = false;
  if (ball && player?.runner?.root) {
    const localBall = player.runner.root.worldToLocal(ball.position.clone());
    const ballSide = localBall.x >= 0 ? 1 : -1;
    const towardSide = targetX == null ? ballSide : Math.sign((targetX - player.runner.root.position.x) || ballSide || naturalSide);
    if (towardSide && towardSide !== naturalSide) {
      weakFoot = true;
      naturalSide = towardSide;
    }
  }
  return {
    kickSide: naturalSide,
    weakFoot,
    preferred
  };
}

export function getFootballPlayerLabel(player) {
  if (!player) return "";
  return player.positionLabel ? `${player.shirtNumber} - ${player.displayName} (${player.positionLabel})` : `${player.shirtNumber} - ${player.displayName}`;
}
