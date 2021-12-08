import React from "react";

import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <header className="h-auto w-full bg-[#EC1D24] flex flex-col items-center justify-center md:flex-row md:p-8 md:items-start">
      <Link href="/" passHref>
        <div className="flex items-center mb-2 cursor-pointer m-3">
          <h1 className="text-4xl font-permanent text-white uppercase">
            Marvel Heroes
          </h1>
        </div>
      </Link>
      <SearchBar />
    </header>
  );
};

export default Header;
