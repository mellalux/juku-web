import { FOOTBALL_PLAYER_COUNT } from "./game-config.js";

export const DEFAULT_FOOTBALL_TEAM_DATA = {
  red: [
    { number: 1, name: "Markus Saar", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced" },
    { number: 4, name: "Karl Tamm", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "tackle", speedProfile: "balanced" },
    { number: 17, name: "Rene Kask", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "press", speedProfile: "fast" },
    { number: 9, name: "Artur Lepp", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast" },
    { number: 11, name: "Martin Kuusk", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced" },
    { number: 27, name: "Sander Oja", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter" }
  ],
  blue: [
    { number: 1, name: "Rasmus Kivi", role: "keeper", positionLabel: "Goalkeeper", preferredFoot: "right", trait: "reflex", speedProfile: "balanced" },
    { number: 5, name: "Oliver Kask", role: "defender", positionLabel: "Center Back", preferredFoot: "right", trait: "mark", speedProfile: "balanced" },
    { number: 14, name: "Mark Randel", role: "defender", positionLabel: "Full Back", preferredFoot: "left", trait: "intercept", speedProfile: "fast" },
    { number: 19, name: "Mihkel Aron", role: "attacker", positionLabel: "Left Forward", preferredFoot: "left", trait: "dribble", attackProfile: "playmaker", speedProfile: "fast" },
    { number: 51, name: "Lucas Nikolas", role: "attacker", positionLabel: "Striker", preferredFoot: "right", trait: "finish", attackProfile: "poacher", speedProfile: "balanced" },
    { number: 7, name: "Teodor Oliver", role: "attacker", positionLabel: "Right Forward", preferredFoot: "right", trait: "pace", attackProfile: "runner", speedProfile: "sprinter" }
  ]
};

const FOOTBALL_TEAM_DATA_URL = `${import.meta.env.BASE_URL}data/football-team-data.json`;
const FOOTBALL_PLAYERS_PER_TEAM = FOOTBALL_PLAYER_COUNT / 2;

function normalizeFootballTeamSide(entries, fallbackEntries) {
  const source = Array.isArray(entries) ? entries : fallbackEntries;
  return Array.from({ length: FOOTBALL_PLAYERS_PER_TEAM }, (_, index) => source[index] ?? fallbackEntries[index] ?? {});
}

export function normalizeFootballTeamData(teamData) {
  return {
    red: normalizeFootballTeamSide(teamData?.red, DEFAULT_FOOTBALL_TEAM_DATA.red),
    blue: normalizeFootballTeamSide(teamData?.blue, DEFAULT_FOOTBALL_TEAM_DATA.blue)
  };
}

export async function loadFootballTeamData() {
  try {
    const response = await fetch(FOOTBALL_TEAM_DATA_URL);
    if (!response.ok) {
      throw new Error(`Roster request failed with ${response.status}`);
    }
    const teamData = await response.json();
    return normalizeFootballTeamData(teamData);
  } catch (error) {
    console.warn("Falling back to embedded football roster data.", error);
    return normalizeFootballTeamData(DEFAULT_FOOTBALL_TEAM_DATA);
  }
}
