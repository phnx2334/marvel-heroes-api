import React from "react";
import requests from "../../util/requests";
import { useRouter } from "next/router";
import Image from "next/image";
import { CharacterMin } from "../../types/character";

interface ICharactersNavProps {
  characters: CharacterMin[];
}

const CharactersNav: React.FC<ICharactersNavProps> = ({ characters }) => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex items-center justify-center w-screen text-2xl font-bold text-white bg-red-500">
        <h1>Select your hero</h1>
      </div>
      <div className="flex p-6 space-x-10 overflow-x-scroll text-2xl px10 sm:px-20 whitespace-nowrap sm:space-x-20 scrollbar-hide">
        {characters.map((character) => {
          return (
            <div
              key={character.name}
              className="flex flex-col items-center cursor-pointer group sm:hover:scale-105 hover:z-50"
            >
              <Image
                src={character.image}
                alt="Hero"
                layout="fixed"
                height={250}
                width={250}
              />

              <h2
                onClick={() => {
                  router.push(`/?genre=${character.name}`);
                }}
                className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold active:text-red-500"
              >
                {character.name}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 right-0 bg-gradient-to-l from-[#06202A] h-80 w-1/12" />
    </nav>
  );
};

export default CharactersNav;
