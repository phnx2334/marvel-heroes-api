import React from "react";

import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import { useRouter } from "next/router";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const router = useRouter();

  const handleReload = () => {
    if (router.pathname === "/") {
      router.reload();
    }
  };

  return (
    <header className="h-auto w-full bg-[#ac171c] flex flex-col items-center justify-center md:flex-row md:p-8 md:items-start">
      <Link href="/" passHref>
        <div
          className="flex items-center mt-7 cursor-pointer"
          onClick={handleReload}
        >
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
