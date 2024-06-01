import Image from "next/image";
import React from "react";
import {
  Champion,
  ChampionMastery,
  PlayerStatsType,
  UserType,
  Match as MatchType,
  Map,
} from "../../types";
import {
  getChampions,
  getMaps,
  getMatches,
  getPlayerTopChampions,
  getRegionByMatchRegion,
  searchPlayer,
  searchPlayerStats,
  getMatchInformationsById,
  getPlayerMatchInformations,
  getChampionById,
  getMapNameById,
  getPlayerChampionMastery,
  getItems,
} from "../utils/functions";
import OneMatch from "./OneMatch";
import SummonerStats from "./SummonerStats";
import TopChampions from "./TopChampions";

type PageProps = {
  params: {
    userSearch: string[];
  };
};

async function SearchResult({ params: { userSearch } }: PageProps) {
  try {
    // Get the region and the username from the url
    const region: string = userSearch[0];
    const username: string = userSearch[1];
    const tagline: string = userSearch[2];

    // Get the champions and the maps data
    const champions: Champion[] = await getChampions();
    const maps: Map[] = await getMaps();
    const items = await getItems();

    // Get the player data adn their stats
    const player: UserType = await searchPlayer(region, username, tagline);
    const playerStats: PlayerStatsType[] = await searchPlayerStats(
      region,
      player.id
    );

    console.log(player.puuid);

    const playerTopChampions: ChampionMastery[] = await getPlayerTopChampions(
      region,
      player.puuid
    );
    const playerAllChampionsMastery: ChampionMastery[] =
      await getPlayerChampionMastery(region, player.puuid);

    // Get the last 5 matches of the player
    const matchRegion: string = getRegionByMatchRegion(region)!;
    const playerMatches: string[] = await getMatches(matchRegion, player.puuid);
    const matches: MatchType[] = await Promise.all(
      playerMatches.map((matchId) =>
        getMatchInformationsById(matchRegion, matchId)
      )
    );

    return (
      <>
        {/* Summoner Profile */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-fit pb-4 flex flex-col text-white items-center rounded-lg">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${player.profileIconId}.png`}
              width={100}
              height={100}
              alt="Profile icon of the player"
              className="rounded-full pb-2"
            />
            <div className="flex flex-col text-center ml-2">
              <p className="font-bold">{player.name}</p>
              <p className="text-xs text-neutral-500">
                Level. {player.summonerLevel}
              </p>
            </div>
          </div>

          {/* Top Champions */}
          <TopChampions
            champions={champions}
            playerTopChampions={playerTopChampions}
            playerAllChampionsMastery={playerAllChampionsMastery}
          />
        </div>

        {/* Summoner Stats + Matches */}
        <div className="flex md:flex-row flex-col gap-8 sm:gap-4">
          {/* Summoner Stats */}
          <div className="flex items-center sm:items-start justify-center md:justify-start gap-5 flex-col-reverse sm:flex-row-reverse md:flex-col-reverse">
            {playerStats.map((playerStat) => (
              <SummonerStats
                key={playerStat.queueType}
                playerStat={playerStat}
              />
            ))}
          </div>

          {/* Matches */}
          <div className="flex flex-col gap-4 sm:gap-2 mb-8 items-center">
            {matches.map((match) => {
              const playerMatchInformations = getPlayerMatchInformations(
                match,
                player.puuid
              );
              if (!playerMatchInformations) return null;

              const champion: Champion = getChampionById(
                champions,
                playerMatchInformations.championId.toString()
              ) as Champion;

              const mapName = getMapNameById(maps, match.info.mapId);
              if (!mapName) return null;

              return (
                <OneMatch
                  key={match.info.gameId}
                  match={match}
                  playerMatchInformations={playerMatchInformations}
                  champion={champion}
                  mapName={mapName}
                  items={items}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  } catch (error: any) {
    return <div className="font-bold text-center">{error.message}</div>;
  }
}

export default SearchResult;
