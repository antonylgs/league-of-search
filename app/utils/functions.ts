import {
  Champion,
  ChampionMastery,
  PlayerStatsType,
  UserType,
  Match as MatchType,
  Map,
  Item,
} from "../../types";

import { MatchRegionCorrespondance } from "./constants";

// Get the player data
export const searchPlayer = async (region: string, username: string) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`
  );
  const data: UserType = await response.json();
  if (!data.puuid) {
    throw new Error("User not found");
  }
  return data;
};

// Get the player stats
export const searchPlayerStats = async (
  region: string,
  summonerEncryptedId: string
) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerEncryptedId}?api_key=${process.env.API_KEY}`
  );
  const data: PlayerStatsType[] = await response.json();
  return data;
};

// Get the top 3 champions of the player
export const getPlayerTopChampions = async (
  region: string,
  summonerEncryptedId: string
) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerEncryptedId}/top?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Get the all champion's mastery of the player
export const getPlayerChampionMastery = async (
  region: string,
  summonerEncryptedId: string
) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerEncryptedId}?api_key=${process.env.API_KEY}`
  );
  const data: ChampionMastery[] = await response.json();
  return data;
};

// Get the last 5 matches of the player
export const getMatches = async (region: string, puuid: string) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=7&api_key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Get the match informations with his id
export const getMatchInformationsById = async (
  region: string,
  matchId: string
) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Get all the champions from the JSON
export const getChampions = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json`
  );
  const data = await response.json();
  return data.data;
};

// Get all the items from the JSON
export const getItems = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/item.json`
  );
  const data = await response.json();
  return data.data;
};

// Search inside the champion's JSON and get the champion corresponding to the key
export const getChampionById = (champions: Champion[], key: string) => {
  const champion = Object.values(champions).find(
    (champion: Champion) => champion.key === key
  );
  return champion;
};

// Search inside the match the informations about the player
export const getPlayerMatchInformations = (
  match: MatchType,
  playerPuuid: string
) => {
  const player = match.info.participants.find(
    (player) => player.puuid === playerPuuid
  );
  return player;
};

// Get the region corresponding to the match region
export const getRegionByMatchRegion = (matchRegion: string) => {
  const region = Object.entries(MatchRegionCorrespondance).find(
    ([region, regions]) => regions.includes(matchRegion)
  );
  return region?.[0];
};

// Get maps informations
export const getMaps = async () => {
  const response = await fetch(
    `https://static.developer.riotgames.com/docs/lol/maps.json`
  );
  const data: Map[] = await response.json();
  return data;
};

// Get the map name corresponding to the map id
export const getMapNameById = (maps: Map[], id: number) => {
  const map = maps.find((map) => map.mapId === id);
  return map?.mapName;
};
