import React, { useEffect, useState } from "react";

import { SearchIcon } from "@heroicons/react/outline";

interface IHeaderProps {
  changeValueHandler: (enteredText: string) => void;
  onClickSearch: () => void;
}

const Header: React.FC<IHeaderProps> = ({ changeValueHandler }) => {
  const [enteredText, setenteredText] = useState("");

  useEffect(() => {
    console.log("entered header useffect");
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
    <header className="h-36 w-screen bg-[#EC1D24] flex flex-col items-center justify-center md:flex-row md:p-8">
      <div className="flex items-center mb-2">
        <h1 className="text-2xl">Marvel Heroes</h1>
      </div>

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
    </header>
  );
};

export default Header;
