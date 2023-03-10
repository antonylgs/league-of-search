"use client";
import { useState } from "react";
import { Champion, ChampionMastery } from "../../types";
import { getChampionById } from "../utils/functions";
import TopChampion from "./TopChampion";

type TopChampionProps = {
  champions: Champion[];
  playerTopChampions: ChampionMastery[];
  playerAllChampionsMastery: ChampionMastery[];
};

function TopChampions({
  champions,
  playerTopChampions,
  playerAllChampionsMastery,
}: TopChampionProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col ${
          showAll && "justify-center flex-wrap w-[90vw] mb-4 order-2"
        } sm:flex-row items-center`}
      >
        {!showAll &&
          playerTopChampions.map((champion) => {
            const championData = getChampionById(
              champions,
              champion.championId.toString()
            );
            return (
              <TopChampion
                key={championData?.name}
                championData={championData}
                champion={champion}
              />
            );
          })}

        {showAll &&
          playerAllChampionsMastery.map((champion) => {
            const championData = getChampionById(
              champions,
              champion.championId.toString()
            );
            return (
              <TopChampion
                key={championData?.name}
                championData={championData}
                champion={champion}
              />
            );
          })}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className={`text-neutral-500 text-xs mb-4 ${
          showAll && "mb-1"
        } hover:text-neutral-300`}
      >
        {showAll ? "Show less champions" : "Show all champions"}
      </button>
    </div>
  );
}

export default TopChampions;
