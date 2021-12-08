import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

interface ISearchBarProps {
  changeValueHandler: (enteredText: string, filter: string) => void;
  onClickSearch: () => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ changeValueHandler }) => {
  const [enteredText, setenteredText] = useState("");
  const [filter, setFilter] = useState("characters");

  useEffect(() => {
    let timeoutid = setTimeout(() => {
      changeValueHandler(enteredText, filter);
    }, 500);
    return () => {
      clearTimeout(timeoutid);
    };
  }, [enteredText]);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
  };

  const onChangeRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("selected", e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col p-2 md:self-baseline md:ml-auto">
{/*       <p>Look for your favorite heroes</p> */}
      <div className="flex text-black">
        <input
          value={enteredText}
          className="flex w-80"
          type="text"
          onChange={onChangeInputHandler}
          placeholder="Look for your favorite heroes!"
        />
        <SearchIcon className="ml-2 w-7 text-white" />
      </div>

      <div
        className=" text-sm flex flex-row items-start p-3 pl-0 w-80"
        onChange={onChangeRadioHandler}
      >
        <label className="flex items-center mr-3">
          <input type="radio" value="characters" name="filter" defaultChecked/>
          Characters
        </label>
        <label className="flex items-center mr-3">
          <input type="radio" value="comics" name="filter" />
          Comics
        </label>
        <label className="flex items-center mr-3">
          <input type="radio" value="stories" name="filter" />
          Stories
        </label>
        <label className="flex items-center mr-3">
          <input type="radio" value="series" name="filter" />
          Series
        </label>
        <label className="flex items-center mr-3">
          <input type="radio" value="favorites" name="filter" />
          Favorites
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
