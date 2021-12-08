import Image from "next/image";
import { CharacterMin } from "../../types/character";
import Link from "next/link";
import { StarIcon, PencilAltIcon } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import React, { useState } from "react";
import { json } from "stream/consumers";

interface ICharactersItemProps {
  character: CharacterMin;
}

type nameStorage = {
  id: string;
  name: string;
};

const initFavStorage = (id: number) => {
  //If the favorites do not exist, I create it
  const lstorage = localStorage.getItem("favorites");

  if (lstorage === null) {
    console.log("created local storage for favorites");
    localStorage.setItem("favorites", "");
    return false;
  }

  if (lstorage.includes(id.toString())) {
    return true;
  } else {
    return false;
  }
};

const initNameStorage = (id: string) => {
  //If the names do not exist, I create it
  const lstorage = localStorage.getItem("names");

  if (lstorage === null) {
    console.log("created local storage for names");
    localStorage.setItem("names", "[]");
    return "";
  }

  const items: nameStorage[] = JSON.parse(lstorage);

  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    return items[index].name;
  } else {
    return "";
  }
};

const CharacterItem: React.FC<ICharactersItemProps> = ({ character }) => {
  const [favorite, setFavorite] = useState<boolean>(
    initFavStorage(character.id)
  );
  const [alterName, setAlterName] = useState<string>(
    initNameStorage(character.id.toString())
  );

  const [isEditable, setIsEditable] = useState(false);

  const description = character.description
    ? character.description
    : "Description not available";

  const linkRef = `/character/${character.id}`;

  const clickFavHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = character.id.toString();

    const currentLStorage = localStorage.getItem("favorites");

    if (currentLStorage!.length > 0) {
      const items = currentLStorage!.split(",");

      if (items.includes(id)) {
        localStorage.setItem(
          "favorites",
          items.filter((item) => item !== id).join(",")
        );
        setFavorite(false);
      } else {
        items.push(id);
        localStorage.setItem("favorites", items.join(","));
        setFavorite(true);
      }
    } else {
      const items = [];
      items.push(id);
      localStorage.setItem("favorites", items.join(","));
      setFavorite(true);
    }
  };

  const modifyNameStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lstorage = localStorage.getItem("names");
    const items: nameStorage[] = JSON.parse(lstorage!);

    const index = items.findIndex(
      (item) => item.id === character.id.toString()
    );

    if (index !== -1) {
      items[index].name = e.target.value;
    } else {
      items.push({ id: character.id.toString(), name: e.target.value });
    }

    localStorage.setItem("names", JSON.stringify(items));
    setAlterName(e.target.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    console.log("the pressed key is", e.key);
    if (e.key === "Enter") {
      setIsEditable(false);
    }
  };

  const clickEditNameHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditable((prevState) => !prevState);
  };

  return (
    <Link
      href={{ pathname: linkRef, query: { alterName: alterName } }}
      passHref
    >
      <div
        className={`flex flex-col relative border-2 items-center m-1 max-h-[400px] cursor-pointer group hover:scale-105 hover:z-50`}
      >
        <div className="p0 m-0   min-w-[220px] max-w-[220px]   max-h-[220px]">
          <Image
            src={character.image}
            alt="Hero"
            layout="responsive"
            height={1080}
            width={1080}
          />
        </div>

        <div className="flex bg-gray-800  p-1 flex-row justify-between  w-full">
          <PencilAltIcon
            width="20px"
            className="text-white mx-1 hover:text-red-600 cursor-default"
            onClick={clickEditNameHandler}
          />
          {favorite ? (
            <StarIconSolid
              width="20px"
              className={`text-white mx-1 hover:text-yellow-300 cursor-default ${
                favorite ? "text-yellow-300" : ""
              } `}
              onClick={clickFavHandler}
            />
          ) : (
            <StarIcon
              width="20px"
              className={`text-white mx-1 hover:text-yellow-300 cursor-default ${
                favorite ? "text-yellow-300" : ""
              } `}
              onClick={clickFavHandler}
            />
          )}
        </div>
        {isEditable ? (
          <input
            type="text"
            className="max-w-sm bg-gray-400 text-opacity-100 bg-opacity-10 text-white"
            onChange={modifyNameStorage}
            value={alterName}
            onKeyDown={onKeyPressHandler}
            onClick={(e) => e.preventDefault()}
            maxLength={40}
          />
        ) : (
          <h2 className="max-w-sm mt-1 text-2xl px-2 text-center text-white whitespace-pre-wrap group-hover:font-bold active:text-red-500">
            {alterName !== "" ? alterName : character.name}
          </h2>
        )}

        <p className="flex truncate max-h-40  p-4  mb-2 text-justify text-base whitespace-pre-wrap">
          {description}
        </p>
        <div className="flex absolute bottom-0 justify-center w-full text-base font-bold text-white bg-red-500">
          <p>Find out more!</p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterItem;
