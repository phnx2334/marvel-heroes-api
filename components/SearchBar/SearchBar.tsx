import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CharContext from "../../context/charactersContext";

interface ISearchBarProps {}

const SearchBar: React.FC<ISearchBarProps> = () => {
  const [enteredText, setenteredText] = useState("");
  const [filter, setFilter] = useState("characters");
  const ctx = useContext(CharContext);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    ctx.fetchCharacters(enteredText, filter);
  }, [pathname]);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
  };

  const onChangeRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("selected", e.target.value);
    setFilter(e.target.value);
  };

  const makeSearchEnter = (e: React.KeyboardEvent) => {
    if (pathname === "/") {
      ctx.fetchCharacters(enteredText, filter);
    } else {
      router.push("/");
    }
  };

  const makeSearchLensClick = () => {
    if (e.key === "Enter" && pathname === "/") {
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
    <div className="flex flex-col p-2 md:self-baseline md:ml-auto">
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
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="characters"
            name="filter"
            onClick={makeSearchFilterClick}
            defaultChecked
          />
          Characters
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="comics"
            name="filter"
            onClick={makeSearchFilterClick}
          />
          Comics
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="stories"
            name="filter"
            onClick={makeSearchFilterClick}
          />
          Stories
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="series"
            name="filter"
            onClick={makeSearchFilterClick}
          />
          Series
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="favorites"
            name="filter"
            onClick={onFavoritesFilter}
          />
          Favorites
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
