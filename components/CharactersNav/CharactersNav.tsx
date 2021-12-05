import React from "react";
import { CharacterMin } from "../../types/character";
import CharacterItem from "./CharacterItem";

interface ICharactersNavProps {
  characters: CharacterMin[];
}

const CharactersNav: React.FC<ICharactersNavProps> = ({ characters }) => {
  if (!characters.length) {
    return (
      <h1 className="flex text-center">
        Start looking for your favorite heroes!
      </h1>
    );
  }

  return (
    <nav className="relative">
      <div className="flex items-center justify-center w-full text-2xl font-bold text-white bg-red-500">
        <h1>Select your hero</h1>
      </div>
      <div className="flex p-6 space-x-10 overflow-x-scroll text-2xl px10  whitespace-nowrap sm:px-20 sm:space-x-20 scrollbar-hide">
        {characters.map((item) => {
          return <CharacterItem key={item.id} character={item} />;
        })}
      </div>
      {/* <div className="absolute bottom-0 right-0 bg-gradient-to-l from-[#06202A] h-80 w-1/12" /> */}
    </nav>
  );
};

export default CharactersNav;
