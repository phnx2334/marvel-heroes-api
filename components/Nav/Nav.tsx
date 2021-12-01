import React from "react";
import requests from "../../util/requests";
import { useRouter } from "next/router";
import Image from "next/image";

interface INavProps {
  items: { name: string; image: any }[];
}

const Nav: React.FC<INavProps> = ({ items }) => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex bg-red-300 text-2xl text-black font-bold items-center w-screen justify-center">
        <h1>Select your hero</h1>
      </div>
      <div className="flex space-x-10 overflow-x-scroll text-2xl px10 sm:px-20 whitespace-nowrap sm:space-x-20 scrollbar-hide p-6">
        {items.map((item) => {
          return (
            <div
              key={item.name}
              className="flex flex-col items-center group cursor-pointer sm:hover:scale-105 hover:z-50"
            >
              <Image
                src={item.image}
                alt="Hero"
                layout="fixed"
                height={200}
                width={200}
              />

              <h2
                onClick={() => {
                  router.push(`/?genre=${item.name}`);
                }}
                className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold active:text-red-500"
              >
                {item.name}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-72 w-1/12" />
    </nav>
  );
};

export default Nav;
