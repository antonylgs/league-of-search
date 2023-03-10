"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { regions } from "./utils/constants";

function Search() {
  const [username, setUsername] = useState<string>("");
  const [region, setRegion] = useState<string>("EUW1");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/${region}/${username}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:gap-0 sm:flex-row w-min mx-auto mb-8 sm:mb-12"
    >
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="border-2 border-gray-300 bg-black h-8 mr-4 px-5 pr-20 rounded-lg text-sm focus:outline-none"
        />
        <div className="h-4 bg-gray-300 w-[0.5px] absolute right-[90px] top-2" />
        <select
          className="absolute right-5 bg-transparent h-8 px-2 text-sm focus:outline-none"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-black/[0.8] text-white font-bold h-8 px-4 mx-auto rounded-lg"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
