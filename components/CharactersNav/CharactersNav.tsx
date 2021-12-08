import React, { useContext } from "react";
import CharContext from "../../context/charactersContext";
import CharacterItem from "./CharacterItem";

const skeleton = (
  <div className="h-[400px] w-[220px] m-5 p-0 bg-gray-300 relative">
    <div className="flex animate-pulse flex-col justify-center">
      <div id="image" className="w-[220px] bg-gray-800 h-52"></div>
      <div id="texts" className="flex flex-col space-y-3 mt-2 p-2">
        <div className="w-36 bg-gray-900 h-6"></div>
        <div className="w-24 bg-gray-900 h-6"></div>
        <div className="w-36 bg-gray-900 h-6"></div>
      </div>
      <div
        id="charFooter"
        className="w-full absolute bottom-0 bg-gray-800 h-6 p-0"
      ></div>
    </div>
  </div>
);

const CharactersNav: React.FC = () => {
  const ctx = useContext(CharContext);

  if (ctx.isLoading) {
    const skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(skeleton);
    }
    return (
      <>
        <div className="flex p-6 space-x-10">
          {skeletons.map((skeleton) => {
            return skeleton;
          })}
        </div>
      </>
    );
  }

  if (!ctx.characterList.length) {
    return (
      <div className="flex  p-5 flex-row w-full h-full text-4xl text-center">
        <h1 className="m-auto">Start looking for your favorite heroes!</h1>
      </div>
    );
  }

  return (
    <nav className="relative">
      <div className="flex items-center justify-center w-full text-2xl font-bold text-white bg-red-500">
        <h1>Select your hero</h1>
      </div>
      <div className="flex p-6 space-x-10 overflow-x-scroll text-2xl px10  whitespace-nowrap sm:px-20 sm:space-x-20 scrollbar-hide">
        {ctx.characterList.map((item) => {
          return <CharacterItem key={item.id} character={item} />;
        })}
      </div>
    </nav>
  );
};

export default CharactersNav;

{
  /* <div className="absolute bottom-0 right-0 bg-gradient-to-l from-[#06202A] h-80 w-1/12" /> */
}
