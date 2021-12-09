import { SearchIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import CharContext from "../../context/charactersContext";

interface ISearchBarProps {}

const SearchBar: React.FC<ISearchBarProps> = () => {
  const [enteredText, setenteredText] = useState("");
  const [filter, setFilter] = useState("characters");
  const ctx = useContext(CharContext);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
  };

  const onChangeRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("selected", e.target.value);
    setFilter(e.target.value);
  };

  const makeSearchEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      ctx.fetchCharacters(enteredText, filter);
    }
  };

  const makeSearchClick = (e: React.MouseEvent<HTMLInputElement>) => {
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
          onClick={() => ctx.fetchCharacters(enteredText, filter)}
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
            onClick={makeSearchClick}
            defaultChecked
          />
          Characters
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="comics"
            name="filter"
            onClick={makeSearchClick}
          />
          Comics
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="stories"
            name="filter"
            onClick={makeSearchClick}
          />
          Stories
        </label>
        <label className="flex items-center mr-3">
          <input
            type="radio"
            value="series"
            name="filter"
            onClick={makeSearchClick}
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
