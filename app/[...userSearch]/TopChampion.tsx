import React from "react";
import Image from "next/image";
import { Champion, ChampionMastery } from "../../types";

type TopChampionProps = {
  championData: Champion | undefined;
  champion: ChampionMastery;
};

function TopChampion({ championData, champion }: TopChampionProps) {
  return (
    <div
      key={champion.championId}
      className="bg-black/[0.8] px-4 py-2 m-2 rounded-lg justify-center w-[170px] h-min flex flex-col text-xs"
    >
      {/* Champion's icon */}
      <div className="flex">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${championData?.image.full}`}
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
          alt={`Profile icon of ${championData?.name}`}
          className="rounded-full mr-2"
        />
        {/* Name and datas */}
        <div>
          <div className="font-bold w-max">{championData?.name}</div>
          <p>LVL. {champion.championLevel}</p>
          <p>{champion.championPoints} MP</p>
        </div>
      </div>
    </div>
  );
}

export default TopChampion;
