import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

interface ISearchBarProps {
  changeValueHandler: (enteredText: string) => void;
  onClickSearch: () => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ changeValueHandler }) => {
  const [enteredText, setenteredText] = useState("");

  useEffect(() => {
    let timeoutid = setTimeout(() => {
      changeValueHandler(enteredText);
    }, 500);
    return () => {
      clearTimeout(timeoutid);
    };
  }, [enteredText]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col p-2 md:self-baseline md:ml-auto">
      <p>Look for your favorite heroes</p>
      <div className="flex">
        <input
          value={enteredText}
          className="flex w-80"
          type="text"
          onChange={onChangeHandler}
        />
        <SearchIcon className="ml-2 w-7" />
      </div>
    </div>
  );
};

export default SearchBar;
