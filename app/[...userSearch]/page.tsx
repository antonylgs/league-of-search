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
import Match from "./Match";
import SummonerStats from "./SummonerStats";
import TopChampions from "./TopChampions";

type PageProps = {
  params: {
    userSearch: string[];
  };
};

async function SearchResult({ params: { userSearch } }: PageProps) {
  // Get the region and the username from the url
  const region: string = userSearch[0];
  const username: string = userSearch[1];

  // Get the champions and the maps data
  const champions: Champion[] = await getChampions();
  const maps: Map[] = await getMaps();
  const items = await getItems();

  // Get the player data adn their stats
  const player: UserType = await searchPlayer(region, username);
  const playerStats: PlayerStatsType[] = await searchPlayerStats(
    region,
    player.id
  );
  const playerTopChampions: ChampionMastery[] = await getPlayerTopChampions(
    region,
    player.id
  );
  const playerAllChampionsMastery: ChampionMastery[] =
    await getPlayerChampionMastery(region, player.id);

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
            src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${player.profileIconId}.png`}
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
        <div className="flex items-center sm:items-start justify-center md:justify-start gap-5 flex-col sm:flex-row md:flex-col">
          {playerStats.map((playerStat) => (
            <SummonerStats key={playerStat.queueType} playerStat={playerStat} />
          ))}
        </div>

        {/* Matches */}
        <div className="flex flex-col gap-4 sm:gap-2 mb-8">
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
              <Match
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
}

export default SearchResult;
