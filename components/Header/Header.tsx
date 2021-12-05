import React, { useEffect, useState } from "react";

import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

interface IHeaderProps {
  changeValueHandler?: (enteredText: string) => void;
  onClickSearch?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ changeValueHandler }) => {
  return (
    <header className="h-36 w-full bg-[#EC1D24] flex flex-col items-center justify-center md:flex-row md:p-8">
      <Link href="/" passHref>
        <div className="flex items-center mb-2 cursor-pointer">
          <h1 className="text-2xl">Marvel Heroes</h1>
        </div>
      </Link>

      {changeValueHandler && (
        <SearchBar
          changeValueHandler={changeValueHandler}
          onClickSearch={() => {}}
        />
      )}
    </header>
  );
};

export default Header;
