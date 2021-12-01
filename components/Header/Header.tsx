import React from "react";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="w-screen h-32 bg-[#EC1D24] flex items-center justify-start p-8">
      <h1 className="text-2xl">Marvel Heroes</h1>
    </header>
  );
};

export default Header;
