import React from "react";
import Image from "next/image";
import { Champion, Item, Match, Participant } from "../../types";

type OneMatchProps = {
  match: Match;
  playerMatchInformations: Participant;
  champion: Champion;
  mapName: string;
  items: Item[];
};

function OneMatch({
  match,
  playerMatchInformations,
  champion,
  mapName,
  items,
}: OneMatchProps) {
  return (
    <div
      key={match.info.gameId}
      className="flex sm:flex-row relative flex-col gap-4 sm:gap-0 pt-12 sm:pt-7 items-center bg-black/[0.8] px-4 py-2 rounded-lg sm:min-w-[500px] h-min sm:max-w-[90vw] lg:max-w-[100%]"
    >
      {/* Win or Lose, map and date */}
      <div className="flex sm:min-w-[50%] items-center">
        <p className="absolute text-[0.7em] top-1 left-4 flex flex-col sm:flex-row sm:gap-2">
          <span>
            <span
              className={`${
                playerMatchInformations.win ? "text-green-500" : "text-red-500"
              }`}
            >
              {playerMatchInformations.win ? "Win" : "Lose"}
            </span>{" "}
            <span className="text-neutral-500">
              {mapName} - {match.info.gameMode}
            </span>
          </span>
          <span className="text-neutral-500">
            ({new Date(match.info.gameCreation).toUTCString()})
          </span>
        </p>
        {/* Champion image, name and lane */}
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${champion.image.full}`}
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
          alt={`Profile icon of ${champion.name}`}
          className="rounded-full mr-2"
        />
        <div className="min-w-[5em] text-left">
          <p className="mr-2 relative w-fit leading-4">
            {champion.name}
            <br />
            <span className="text-[0.5em] absolute left-1/2 transform -translate-x-1/2 text-neutral-500">
              {playerMatchInformations.lane !== "NONE" &&
                playerMatchInformations.lane}
            </span>
          </p>
        </div>
        {/* KDA */}
        <p className="relative leading-4">
          <span className="text-green-500">
            {playerMatchInformations.kills}
          </span>
          <span className="text-neutral-500">/</span>
          <span className="text-red-500">{playerMatchInformations.deaths}</span>
          <span className="text-neutral-500">/</span>
          {playerMatchInformations.assists}
          <br />
          <span className="text-neutral-500 text-[0.5em] w-max absolute left-1/2 transform -translate-x-1/2">
            ({playerMatchInformations.challenges.kda.toFixed(2)} KDA)
          </span>
        </p>
      </div>
      {/* Items */}
      <div className="flex flex-1 gap-2">
        {playerMatchInformations.item0 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item0}.png`}
            width={30}
            height={30}
            alt={`Item 1`}
            className="rounded-full"
          />
        )}
        {playerMatchInformations.item1 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item1}.png`}
            width={30}
            height={30}
            alt={`Item 2`}
            className="rounded-full"
          />
        )}
        {playerMatchInformations.item2 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item2}.png`}
            width={30}
            height={30}
            alt={`Item 3`}
            className="rounded-full"
          />
        )}
        {playerMatchInformations.item3 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item3}.png`}
            width={30}
            height={30}
            alt={`Item 4`}
            className="rounded-full"
          />
        )}
        {playerMatchInformations.item4 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item4}.png`}
            width={30}
            height={30}
            alt={`Item 5`}
            className="rounded-full"
          />
        )}
        {playerMatchInformations.item5 !== 0 && (
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${playerMatchInformations.item5}.png`}
            width={30}
            height={30}
            alt={`Item 6`}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default OneMatch;
