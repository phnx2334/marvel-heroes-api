import React, { useContext, useEffect, useRef, useState } from "react";
import CharContext from "../../context/charactersContext";
import CharacterItem from "./CharacterItem";
import { CogIcon } from "@heroicons/react/outline";

/* import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"; */

const skeleton = (
  <div className="h-[400px] w-[220px] m-5 p-0 bg-gray-300 relative opacity-50 ">
    <div className="flex animate-pulse flex-col justify-center">
      <div id="image" className="w-[220px] bg-gray-400 h-52"></div>
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
  const [_, setShowModal] = ctx.modal;
  const charsLen = ctx.characterList.length;

  /* const [isScrollable, setIsScrollable] = useState(false); */

  const resultDiv = useRef<HTMLDivElement | null>(null);
 /*  const currentDiv = resultDiv.current */

/*   useEffect(() => {

    console.log("div durrent",resultDiv.current )
    if (currentDiv) {
      const isScrollable =
        resultDiv.current!.scrollWidth > resultDiv.current!.clientWidth;

        console.log("is scrollable", isScrollable)
      setIsScrollable(isScrollable);
    }
  }, [currentDiv]); */

  if (ctx.hasError) {
    return (
      <div className="flex  p-5 flex-row w-full h-full text-4xl text-center">
        <h1 className="m-auto">{ctx.errorMsg}</h1>
      </div>
    );
  }

  if (ctx.isLoading) {
    const skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(skeleton);
    }
    return (
      <>
        <div className="flex p-6 space-x-10 animate-fadeIn">
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
        <h1 className="m-auto">Look for your favorite heroes!</h1>
      </div>
    );
  }

  const scroll = (side: string) => {
    if (side === "left") {
      resultDiv.current!.scrollLeft -= 235;
    } else {
      resultDiv.current!.scrollLeft += 235;
    }
  };

  return (
    <>
      <nav>
        <div className="flex pl-1 items-center justify-center w-full text-2xl font-bold text-white bg-red-500">
          <h1>Select your hero...</h1>
          <CogIcon
            width="20px"
            className="absolute right-1"
            onClick={() => setShowModal(true)}
          />
        </div>

        {/* {isScrollable && (
          <span className="hidden items-center justify-center m-4 sm:flex">
            <ChevronLeftIcon
              width={40}
              onClick={() => scroll("left")}
              className="transform ease-in-out delay-150  hover:scale-125 duration-300"
            />
            <ChevronRightIcon
              width={40}
              onClick={() => scroll("right")}
              className="transform ease-in-out delay-150  hover:scale-125 duration-300"
            />
          </span>
        )} */}

        <div
          className={`flex p-6 space-x-10 overflow-x-scroll text-2xl px10 whitespace-nowrap ${
            charsLen === 1 && "justify-center"
          }sm:px-20 sm:space-x-20 scrollbar-hide sm:scrollbar-default`}
          ref={resultDiv}
        >
          {ctx.characterList.map((item) => {
            return <CharacterItem key={item.id} character={item} />;
          })}
        </div>
      </nav>
    </>
  );
};

export default CharactersNav;
