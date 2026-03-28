import {
  FOOTBALL_PLAYER_COUNT,
  FOOTBALL_ROLE_LABELS,
  TRACK_RUNNER_COUNT
} from "./game-config.js";

const WORLD_CHARACTER_DATA_URL = `${import.meta.env.BASE_URL}data/world-character-data.json`;
const FOOTBALL_PLAYERS_PER_TEAM = FOOTBALL_PLAYER_COUNT / 2;
const DEFAULT_HAIR_STYLE_VARIANTS = ["short", "parted", "curly", "bob", "spiky", "bangs", "pigtails"];
const DEFAULT_HAIR_COLOR_VARIANTS = [0x2f1a0f, 0x5a3822, 0xc89b58, 0x121416, 0x6d4932];

export const DEFAULT_WORLD_CHARACTER_DATA = {
  juku: {
    name: "Juku",
    hairStyle: "short",
    colors: {
      skin: "#e7c1a3",
      shirt: "#2d63b5",
      pants: "#c5202a",
      shoe: "#151618",
      hair: "#2f1a0f"
    }
  },
  referee: {
    name: "Ronaldo",
    hairStyle: "parted",
    colors: {
      shirt: "#f3f4f6",
      stripe: "#111214",
      shorts: "#16181c",
      shoe: "#121316",
      hair: "#2a1a12",
      whistle: "#0f1115",
      yellowCard: "#f6d32d",
      redCard: "#c1272d"
    }
  },
  trackRunners: [
    { name: "Aksel", speed: 2.02, speedVariance: 0.16, hairStyle: "parted", colors: { shirt: "#2d63b5", shorts: "#202431", shoe: "#151617", hair: "#c89b58" } },
    { name: "Bruno", speed: 2.15, speedVariance: 0.16, hairStyle: "curly", colors: { shirt: "#f28f2d", shorts: "#202431", shoe: "#151617", hair: "#121416" } },
    { name: "Carla", speed: 2.28, speedVariance: 0.16, hairStyle: "bob", colors: { shirt: "#30a46f", shorts: "#202431", shoe: "#151617", hair: "#6d4932" } },
    { name: "Dorian", speed: 2.41, speedVariance: 0.16, hairStyle: "spiky", colors: { shirt: "#8f4bcf", shorts: "#202431", shoe: "#151617", hair: "#2f1a0f" } },
    { name: "Elmar", speed: 2.54, speedVariance: 0.16, hairStyle: "bangs", colors: { shirt: "#cf3f4f", shorts: "#202431", shoe: "#151617", hair: "#5a3822" } },
    { name: "Freya", speed: 2.67, speedVariance: 0.16, hairStyle: "pigtails", colors: { shirt: "#2d63b5", shorts: "#202431", shoe: "#151617", hair: "#c89b58" } },
    { name: "Grete", speed: 2.8, speedVariance: 0.16, hairStyle: "short", colors: { shirt: "#f28f2d", shorts: "#202431", shoe: "#151617", hair: "#121416" } },
    { name: "Hendrik", speed: 2.93, speedVariance: 0.16, hairStyle: "parted", colors: { shirt: "#30a46f", shorts: "#202431", shoe: "#151617", hair: "#6d4932" } }
  ],
  teams: [
    {
      id: "bosbos",
      name: "Bosbos",
      colors: {
        primary: "#cf3a2f",
        secondary: "#6a1f1b",
        accent: "#991b1b"
      },
      players: [
        { number: 1, name: "Markus Saar", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced", hairStyle: "short", hairColor: "#5a3822" },
        { number: 4, name: "Karl Tamm", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "tackle", speedProfile: "balanced", hairStyle: "parted", hairColor: "#c89b58" },
        { number: 17, name: "Rene Kask", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "press", speedProfile: "fast", hairStyle: "curly", hairColor: "#121416" },
        { number: 9, name: "Artur Lepp", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast", hairStyle: "bob", hairColor: "#6d4932" },
        { number: 11, name: "Martin Kuusk", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced", hairStyle: "spiky", hairColor: "#2f1a0f" },
        { number: 27, name: "Sander Oja", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter", hairStyle: "bangs", hairColor: "#5a3822" }
      ]
    },
    {
      id: "volta",
      name: "Volta",
      colors: {
        primary: "#1d58b4",
        secondary: "#163869",
        accent: "#1e40af"
      },
      players: [
        { number: 1, name: "Mart Poom", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced", hairStyle: "parted", hairColor: "#121416" },
        { number: 5, name: "Oliver Kask", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "mark", speedProfile: "balanced", hairStyle: "curly", hairColor: "#6d4932" },
        { number: 14, name: "Mark Randel", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "intercept", speedProfile: "fast", hairStyle: "bob", hairColor: "#2f1a0f" },
        { number: 19, name: "Mihkel Aron", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "balanced", hairStyle: "spiky", hairColor: "#5a3822" },
        { number: 51, name: "Lucas Nikolas Luks", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "fast", hairStyle: "bangs", hairColor: "#c89b58" },
        { number: 7, name: "Teodor Oliver", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter", hairStyle: "pigtails", hairColor: "#121416" }
      ]
    },
    {
      id: "kuma",
      name: "Kuma",
      colors: {
        primary: "#16a34a",
        secondary: "#14532d",
        accent: "#166534"
      },
      players: [
        { number: 1, name: "Robin Vaher", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced", hairStyle: "short", hairColor: "#2f1a0f" },
        { number: 3, name: "Kristjan Pold", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "tackle", speedProfile: "balanced", hairStyle: "parted", hairColor: "#5a3822" },
        { number: 22, name: "Joosep Nurm", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "intercept", speedProfile: "fast", hairStyle: "curly", hairColor: "#c89b58" },
        { number: 10, name: "Andreas Sild", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast", hairStyle: "spiky", hairColor: "#121416" },
        { number: 8, name: "Henri Paas", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced", hairStyle: "bangs", hairColor: "#6d4932" },
        { number: 77, name: "Gregor Raid", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter", hairStyle: "bob", hairColor: "#2f1a0f" }
      ]
    }
  ]
};

function getDefaultFootballRole(lane) {
  if (lane === 0) return "keeper";
  if (lane <= 2) return "defender";
  return "attacker";
}

function parseFootballColor(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return value >>> 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (/^#?[0-9a-f]{6}$/.test(normalized)) {
      return parseInt(normalized.replace("#", ""), 16);
    }
    if (/^0x[0-9a-f]{6}$/.test(normalized)) {
      return parseInt(normalized.slice(2), 16);
    }
  }
  return fallback;
}

function mixFootballColors(base, target, amount) {
  const mix = Math.max(0, Math.min(1, amount));
  const baseR = (base >> 16) & 0xff;
  const baseG = (base >> 8) & 0xff;
  const baseB = base & 0xff;
  const targetR = (target >> 16) & 0xff;
  const targetG = (target >> 8) & 0xff;
  const targetB = target & 0xff;
  const r = Math.round(baseR + (targetR - baseR) * mix);
  const g = Math.round(baseG + (targetG - baseG) * mix);
  const b = Math.round(baseB + (targetB - baseB) * mix);
  return (r << 16) | (g << 8) | b;
}

function toFootballCssHex(color) {
  return `#${(color >>> 0).toString(16).padStart(6, "0")}`;
}

function toFootballCssRgba(color, alpha = 1) {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createFootballTeamUi(primary, accent) {
  const scoreboard = mixFootballColors(primary, 0xffffff, 0.38);
  const attack = mixFootballColors(primary, 0xffffff, 0.56);
  const player = mixFootballColors(primary, 0xffffff, 0.72);
  const nameTagBackground = mixFootballColors(primary, 0xffffff, 0.84);
  return {
    scoreboard: toFootballCssHex(scoreboard),
    attack: toFootballCssHex(attack),
    player: toFootballCssHex(player),
    nameTagBackground: toFootballCssRgba(nameTagBackground, 0.95),
    nameTagText: "#111827",
    numberPatchBackground: toFootballCssHex(accent),
    numberPatchText: "#ffffff",
    goalTitle: toFootballCssHex(player),
    goalScorer: toFootballCssHex(attack)
  };
}

function normalizeJukuData(juku, fallbackJuku = null) {
  const source = juku ?? {};
  const fallback = fallbackJuku ?? {};
  const colors = source.colors ?? {};
  const fallbackColors = fallback.colors ?? {};
  const shirt = parseFootballColor(colors.shirt ?? source.shirt, parseFootballColor(fallbackColors.shirt, 0x2d63b5));
  return {
    name: source.name ?? fallback.name ?? "Juku",
    hairStyle: source.hairStyle ?? fallback.hairStyle ?? "short",
    colors: {
      skin: parseFootballColor(colors.skin ?? source.skin, parseFootballColor(fallbackColors.skin, 0xe7c1a3)),
      shirt,
      pants: parseFootballColor(colors.pants ?? source.pants, parseFootballColor(fallbackColors.pants, 0xc5202a)),
      shoe: parseFootballColor(colors.shoe ?? source.shoe, parseFootballColor(fallbackColors.shoe, 0x151618)),
      hair: parseFootballColor(colors.hair ?? source.hair, parseFootballColor(fallbackColors.hair, 0x2f1a0f))
    },
    ui: {
      nameTagBackground: toFootballCssRgba(shirt, 0.92),
      nameTagText: "#111827"
    }
  };
}

function normalizeFootballReferee(referee, fallbackReferee = null) {
  const source = referee ?? {};
  const fallback = fallbackReferee ?? {};
  const colors = source.colors ?? {};
  const fallbackColors = fallback.colors ?? {};
  const shirt = parseFootballColor(colors.shirt ?? source.shirt, parseFootballColor(fallbackColors.shirt, 0xf3f4f6));
  return {
    name: source.name ?? fallback.name ?? "Ronaldo",
    hairStyle: source.hairStyle ?? fallback.hairStyle ?? "parted",
    colors: {
      shirt,
      stripe: parseFootballColor(colors.stripe ?? source.stripe, parseFootballColor(fallbackColors.stripe, 0x111214)),
      shorts: parseFootballColor(colors.shorts ?? source.shorts, parseFootballColor(fallbackColors.shorts, 0x16181c)),
      shoe: parseFootballColor(colors.shoe ?? source.shoe, parseFootballColor(fallbackColors.shoe, 0x121316)),
      hair: parseFootballColor(colors.hair ?? source.hair, parseFootballColor(fallbackColors.hair, 0x2a1a12)),
      whistle: parseFootballColor(colors.whistle ?? source.whistle, parseFootballColor(fallbackColors.whistle, 0x0f1115)),
      yellowCard: parseFootballColor(colors.yellowCard ?? source.yellowCard, parseFootballColor(fallbackColors.yellowCard, 0xf6d32d)),
      redCard: parseFootballColor(colors.redCard ?? source.redCard, parseFootballColor(fallbackColors.redCard, 0xc1272d))
    },
    ui: {
      nameTagBackground: toFootballCssRgba(shirt, 0.94),
      nameTagText: "#111827"
    }
  };
}

function normalizeTrackRunner(entry, index, fallbackRunner = null) {
  const source = entry ?? {};
  const fallback = fallbackRunner ?? {};
  const colors = source.colors ?? {};
  const fallbackColors = fallback.colors ?? {};
  return {
    name: source.name ?? fallback.name ?? `Runner ${index + 1}`,
    speed: typeof source.speed === "number"
      ? source.speed
      : typeof fallback.speed === "number"
        ? fallback.speed
        : 2.02 + index * 0.13,
    speedVariance: typeof source.speedVariance === "number"
      ? source.speedVariance
      : typeof fallback.speedVariance === "number"
        ? fallback.speedVariance
        : 0.16,
    hairStyle: source.hairStyle ?? fallback.hairStyle ?? DEFAULT_HAIR_STYLE_VARIANTS[(index + 1) % DEFAULT_HAIR_STYLE_VARIANTS.length],
    colors: {
      shirt: parseFootballColor(colors.shirt ?? source.shirt, parseFootballColor(fallbackColors.shirt, 0x2d63b5)),
      shorts: parseFootballColor(colors.shorts ?? source.shorts, parseFootballColor(fallbackColors.shorts, 0x202431)),
      shoe: parseFootballColor(colors.shoe ?? source.shoe, parseFootballColor(fallbackColors.shoe, 0x151617)),
      hair: parseFootballColor(
        colors.hair ?? source.hair,
        parseFootballColor(fallbackColors.hair, DEFAULT_HAIR_COLOR_VARIANTS[(index + 2) % DEFAULT_HAIR_COLOR_VARIANTS.length])
      )
    }
  };
}

function normalizeFootballTeamPlayer(entry, teamName, lane, fallbackPlayer = null) {
  const rosterEntry = entry ?? {};
  const fallback = fallbackPlayer ?? {};
  const role = rosterEntry.role ?? fallback.role ?? getDefaultFootballRole(lane);
  return {
    number: rosterEntry.number ?? fallback.number ?? lane + 1,
    name: rosterEntry.name ?? fallback.name ?? `${teamName} ${lane + 1}`,
    role,
    positionLabel: rosterEntry.positionLabel ?? fallback.positionLabel ?? FOOTBALL_ROLE_LABELS[role] ?? role,
    preferredFoot: rosterEntry.preferredFoot ?? fallback.preferredFoot ?? "right",
    trait: rosterEntry.trait ?? fallback.trait ?? null,
    speedProfile: rosterEntry.speedProfile ?? fallback.speedProfile ?? "balanced",
    attackProfile: rosterEntry.attackProfile ?? fallback.attackProfile ?? null,
    homeX: rosterEntry.homeX ?? fallback.homeX ?? null,
    homeZ: rosterEntry.homeZ ?? fallback.homeZ ?? null,
    hairStyle: rosterEntry.hairStyle ?? fallback.hairStyle ?? DEFAULT_HAIR_STYLE_VARIANTS[lane % DEFAULT_HAIR_STYLE_VARIANTS.length],
    hairColor: parseFootballColor(
      rosterEntry.hairColor ?? rosterEntry.hair ?? fallback.hairColor ?? fallback.hair,
      DEFAULT_HAIR_COLOR_VARIANTS[lane % DEFAULT_HAIR_COLOR_VARIANTS.length]
    )
  };
}

function normalizeFootballTeam(team, fallbackTeam, index) {
  const sourceTeam = team ?? {};
  const fallback = fallbackTeam ?? {};
  const colors = sourceTeam.colors ?? {};
  const fallbackColors = fallback.colors ?? {};
  const primaryFallback = parseFootballColor(fallbackColors.primary, 0xcf3a2f);
  const primary = parseFootballColor(colors.primary ?? sourceTeam.primary, primaryFallback);
  const secondary = parseFootballColor(
    colors.secondary ?? sourceTeam.secondary,
    parseFootballColor(fallbackColors.secondary, mixFootballColors(primary, 0x000000, 0.48))
  );
  const accent = parseFootballColor(
    colors.accent ?? sourceTeam.accent,
    parseFootballColor(fallbackColors.accent, mixFootballColors(primary, 0x000000, 0.28))
  );
  const shoe = parseFootballColor(
    colors.shoe ?? sourceTeam.shoe,
    parseFootballColor(fallbackColors.shoe, 0x151617)
  );
  const teamName = sourceTeam.name ?? fallback.name ?? `Team ${index + 1}`;
  const sourcePlayers = Array.isArray(sourceTeam.players)
    ? sourceTeam.players
    : Array.isArray(sourceTeam.roster)
      ? sourceTeam.roster
      : [];
  const fallbackPlayers = Array.isArray(fallback.players) ? fallback.players : [];

  return {
    id: sourceTeam.id ?? fallback.id ?? `team-${index + 1}`,
    name: teamName,
    colors: {
      primary,
      secondary,
      accent,
      shoe
    },
    ui: createFootballTeamUi(primary, accent),
    players: Array.from(
      { length: FOOTBALL_PLAYERS_PER_TEAM },
      (_, lane) => normalizeFootballTeamPlayer(sourcePlayers[lane], teamName, lane, fallbackPlayers[lane])
    )
  };
}

function getFootballRawTeamPool(teamData) {
  if (Array.isArray(teamData?.teams) && teamData.teams.length > 0) {
    return teamData.teams;
  }
  if (Array.isArray(teamData)) {
    return teamData;
  }
  if (Array.isArray(teamData?.red) || Array.isArray(teamData?.blue)) {
    return [
      {
        ...DEFAULT_WORLD_CHARACTER_DATA.teams[0],
        players: Array.isArray(teamData?.red) ? teamData.red : DEFAULT_WORLD_CHARACTER_DATA.teams[0].players
      },
      {
        ...DEFAULT_WORLD_CHARACTER_DATA.teams[1],
        players: Array.isArray(teamData?.blue) ? teamData.blue : DEFAULT_WORLD_CHARACTER_DATA.teams[1].players
      },
      DEFAULT_WORLD_CHARACTER_DATA.teams[2]
    ];
  }
  return DEFAULT_WORLD_CHARACTER_DATA.teams;
}

function normalizeFootballTeamPool(teamData) {
  const rawTeams = getFootballRawTeamPool(teamData);
  const fallbackTeams = DEFAULT_WORLD_CHARACTER_DATA.teams;
  const normalizedTeams = rawTeams.map((team, index) => normalizeFootballTeam(team, fallbackTeams[index % fallbackTeams.length], index));
  if (normalizedTeams.length >= 2) return normalizedTeams;

  const usedIds = new Set(normalizedTeams.map((team) => team.id));
  for (let i = 0; i < fallbackTeams.length && normalizedTeams.length < 2; i += 1) {
    const fallbackTeam = normalizeFootballTeam(fallbackTeams[i], fallbackTeams[i], i);
    if (usedIds.has(fallbackTeam.id)) continue;
    normalizedTeams.push(fallbackTeam);
    usedIds.add(fallbackTeam.id);
  }
  return normalizedTeams;
}

function pickRandomFootballMatchup(teams) {
  const shuffled = teams.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    red: shuffled[0],
    blue: shuffled[1] ?? shuffled[0]
  };
}

export function normalizeWorldCharacterData(teamData) {
  const teams = normalizeFootballTeamPool(teamData);
  const matchup = pickRandomFootballMatchup(teams);
  const juku = normalizeJukuData(teamData?.juku, DEFAULT_WORLD_CHARACTER_DATA.juku);
  const referee = normalizeFootballReferee(teamData?.referee, DEFAULT_WORLD_CHARACTER_DATA.referee);
  const sourceTrackRunners = Array.isArray(teamData?.trackRunners) ? teamData.trackRunners : [];
  const fallbackTrackRunners = DEFAULT_WORLD_CHARACTER_DATA.trackRunners;
  const trackRunners = Array.from(
    { length: TRACK_RUNNER_COUNT },
    (_, index) => normalizeTrackRunner(sourceTrackRunners[index], index, fallbackTrackRunners[index])
  );
  return {
    juku,
    referee,
    trackRunners,
    teams,
    red: matchup.red,
    blue: matchup.blue
  };
}

export async function loadWorldCharacterData() {
  try {
    const response = await fetch(WORLD_CHARACTER_DATA_URL);
    if (!response.ok) {
      throw new Error(`Roster request failed with ${response.status}`);
    }
    const teamData = await response.json();
    return normalizeWorldCharacterData(teamData);
  } catch (error) {
    console.warn("Falling back to embedded world character data.", error);
    return normalizeWorldCharacterData(DEFAULT_WORLD_CHARACTER_DATA);
  }
}
