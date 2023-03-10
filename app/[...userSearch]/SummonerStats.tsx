import React from "react";
import { PlayerStatsType } from "../../types";

type SummonerStatsProps = {
  playerStat: PlayerStatsType;
};

function SummonerStats({ playerStat }: SummonerStatsProps) {
  const winrate = Math.round(
    (playerStat.wins / (playerStat.wins + playerStat.losses)) * 100
  );

  return (
    <div
      key={playerStat.queueType}
      className="bg-black/[0.8] p-8 rounded-lg justify-center text-center w-[250px] overflow-hidden"
    >
      {/* Ranked type */}
      <div className="font-bold text-sm mb-6">
        {playerStat.queueType.split("_").join(" ")}
      </div>
      {/* Rank icon */}
      <div>
        <div className="relative h-[100px] mb-2">
          <img
            src={`/ranked-emblems/emblem-${playerStat.tier}.png`}
            alt={`Icon of ${playerStat.tier} rank`}
            className="absolute w-[600px] max-w-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        {/* Rank and LP */}
        <p>
          {playerStat.tier} {playerStat.rank}{" "}
          <span className="text-neutral-500 text-xs">
            ({playerStat.leaguePoints} LP)
          </span>
        </p>
        {/* Winrate */}
        <span className={winrate >= 50 ? "text-green-500" : "text-red-500"}>
          {winrate}% WR{" "}
        </span>
        <p className=" text-neutral-500 text-xs">
          (<span className="text-green-900">{playerStat.wins}W</span>~
          <span className="text-red-900">{playerStat.losses}L</span>)
        </p>
      </div>
    </div>
  );
}

export default SummonerStats;
