import React, { useState } from "react";

import { SearchIcon } from "@heroicons/react/outline";

interface IHeaderProps {
  changeValueHandler: (enteredText: string) => void;
  onClickSearch: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const [enteredText, setenteredText] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setenteredText(e.currentTarget.value);
    props.changeValueHandler(e.currentTarget.value);
  };

  return (
    <header className="w-screen h-32 bg-[#EC1D24] flex items-center p-8">
      <div className="flex m-16">
        <h1 className="text-2xl">Marvel Heroes</h1>
      </div>

      <div className="flex flex-col mr-40">
        <p>Look for your favorite heroes</p>
        <div className="flex flex-grow">
          <input
            value={enteredText}
            className="flex w-96"
            type="text"
            onChange={onChangeHandler}
          />
          <SearchIcon className="w-7" />
        </div>
      </div>
    </header>
  );
};

export default Header;
