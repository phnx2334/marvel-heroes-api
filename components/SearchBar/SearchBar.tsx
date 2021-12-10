import React, { useContext, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import CharContext from "../../context/charactersContext";

interface ISearchBarProps {}

const SearchBar: React.FC<ISearchBarProps> = () => {
  const [enteredText, setenteredText] = useState("");
  const [filter, setFilter] = useState("characters");
  const ctx = useContext(CharContext);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (pathname === "/") {
      const timeoutid = setTimeout(() => {
        ctx.fetchCharacters(enteredText, filter);
      }, 500);

      return () => {
        clearTimeout(timeoutid);
      };
    }
  }, [enteredText]);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
  };

  const onChangeRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const makeSearchEnter = (e: React.KeyboardEvent) => {
    if (pathname === "/" && e.key === "Enter") {
      ctx.fetchCharacters(enteredText, filter);
    } else {
      router.push("/");
    }
  };

  const makeSearchLensClick = () => {
    if (pathname === "/") {
      ctx.fetchCharacters(enteredText, filter);
    } else {
      router.push("/");
    }
  };

  const makeSearchFilterClick = (e: React.MouseEvent<HTMLInputElement>) => {
    ctx.fetchCharacters(enteredText, e.currentTarget.value);
  };

  const onFavoritesFilter = () => {
    const storage = localStorage.getItem("favorites")!;

    ctx.fetchFavorites(storage);
  };

  return (
    <div className="flex flex-col p-2 md:self-baseline md:ml-auto group">
      <div className="mb-0.5 transition ease-in-out delay-150 opacity-0 group-hover:opacity-100 duration-300">
        <span className="p-1 max-w-min text-xs bg-black text-white sm:text-base">
          Min 3 characters
        </span>
      </div>

      <div className="flex text-black">
        <input
          value={enteredText}
          className="flex w-72"
          type="text"
          onChange={onChangeInputHandler}
          onKeyDown={makeSearchEnter}
          placeholder="Type a name to start"
        />
        <SearchIcon
          className="ml-2 w-7 text-white cursor-pointer"
          onClick={makeSearchLensClick}
        />
      </div>

      <div
        className=" text-sm flex flex-row items-start p-3 pl-0 w-80"
        onChange={onChangeRadioHandler}
      >
        <label className="flex items-center mr-2">
          <input
            type="radio"
            value="characters"
            name="filter"
            onClick={makeSearchFilterClick}
            defaultChecked
            className="mx-[3px]"
          />
          Characters
        </label>
        <label className="flex items-center mr-2">
          <input
            type="radio"
            value="comics"
            name="filter"
            onClick={makeSearchFilterClick}
            className="mx-[3px]"
          />
          Comics
        </label>
        <label className="flex items-center mr-2">
          <input
            type="radio"
            value="stories"
            name="filter"
            onClick={makeSearchFilterClick}
            className="mx-[3px]"
          />
          Stories
        </label>
        <label className="flex items-center mr-2">
          <input
            type="radio"
            value="series"
            name="filter"
            onClick={makeSearchFilterClick}
            className="mx-[3px]"
          />
          Series
        </label>
        <label className="flex items-center mr-2">
          <input
            type="radio"
            value="favorites"
            name="filter"
            onClick={onFavoritesFilter}
            className="mx-[3px]"
          />
          Favorites
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
