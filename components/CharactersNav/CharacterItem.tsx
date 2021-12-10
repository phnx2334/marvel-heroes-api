import React, { useState } from "react";
import Image from "next/image";
import { CharacterMinImg } from "../../types/character";
import Link from "next/link";
import { StarIcon, PencilAltIcon } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid, TrashIcon } from "@heroicons/react/solid";

interface ICharactersItemProps {
  character: CharacterMinImg;
  wasClicked: () => void;
}

type nameStorage = {
  id: string;
  name: string;
};

const initFavStorage = (id: number) => {
  //Create storage if it doesn't exist
  const lstorage = localStorage.getItem("favorites");

  if (lstorage === null) {
    localStorage.setItem("favorites", "");
    return false;
  }

  //If found set favorites to true
  if (lstorage.includes(id.toString())) {
    return true;
  } else {
    return false;
  }
};

const initDeletedStorage = (id: number) => {
  //Create storage if it doesn't exist
  const lstorage = localStorage.getItem("deleted");

  if (lstorage === null) {
    localStorage.setItem("deleted", "");
    return false;
  }

  //If found set deleted to true
  if (lstorage.includes(id.toString())) {
    return true;
  } else {
    return false;
  }
};

const initNameStorage = (id: string) => {
  //Create storage if it doesn't exist
  const lstorage = localStorage.getItem("names");

  if (lstorage === null) {
    localStorage.setItem("names", "[]");
    return "";
  }

  const items: nameStorage[] = JSON.parse(lstorage);

  const index = items.findIndex((item) => item.id === id);

  //If found return it
  if (index !== -1) {
    return items[index].name;
  } else {
    return "";
  }
};

const CharacterItem: React.FC<ICharactersItemProps> = ({
  character,
  wasClicked,
}) => {
  const [favorite, setFavorite] = useState<boolean>(
    initFavStorage(character.id)
  );
  const [alterName, setAlterName] = useState<string>(
    initNameStorage(character.id.toString())
  );

  const [deleted, setDeleted] = useState<boolean>(
    initDeletedStorage(character.id)
  );

  const [isEditable, setIsEditable] = useState(false);

  const description = character.description
    ? character.description
    : "Description not available";

  const linkRef = `/character/${character.id}`;

  const onClickFavHandler = (e: React.MouseEvent) => {
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

  const onClickDeleteHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = character.id.toString();

    const currentLStorage = localStorage.getItem("deleted");

    if (currentLStorage!.length > 0) {
      const items = currentLStorage!.split(",");
      if (!items.includes(id)) {
        items.push(id);
        localStorage.setItem("deleted", items.join(","));
        setDeleted(true);
      }
    } else {
      const items = [];
      items.push(id);
      localStorage.setItem("deleted", items.join(","));
      setDeleted(true);
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
    if (e.key === "Enter") {
      setIsEditable(false);
    }
  };

  const onClickEditNameHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditable((prevState) => !prevState);
  };

  return (
    <Link
      href={{ pathname: linkRef, query: { alterName: alterName } }}
      passHref
    >
      <div
        className={`flex flex-col relative border-2 items-center m-1 max-h-[500px] max-w-min cursor-pointer group hover:scale-105 hover:z-50 ${
          deleted && "hidden"
        }`}
      >
        <div
          className="p0 m-0 min-w-[290px] max-w-[290px]   max-h-[290px]"
          onClick={wasClicked}
        >
          <Image
            src={character.image}
            alt={character.name}
            layout="responsive"
            height={1080}
            width={1080}
          />
        </div>

        <div className="flex bg-gray-800  p-1 flex-row justify-between  w-full">
          <PencilAltIcon
            width="30px"
            className="text-white mx-1 hover:text-blue-600 cursor-default"
            onClick={onClickEditNameHandler}
          />
          {favorite ? (
            <StarIconSolid
              width="30px"
              className={`text-white mx-1 hover:text-yellow-300 cursor-default ${
                favorite ? "text-yellow-300" : ""
              } `}
              onClick={onClickFavHandler}
            />
          ) : (
            <StarIcon
              width="30px"
              className={`text-white mx-1 hover:text-yellow-300 cursor-default ${
                favorite ? "text-yellow-300" : ""
              } `}
              onClick={onClickFavHandler}
            />
          )}

          <TrashIcon
            width="30px"
            className="text-white mx-1 hover:text-red-600 cursor-default"
            onClick={onClickDeleteHandler}
          />
        </div>
        {isEditable ? (
          <input
            type="text"
            className="max-w-sm bg-gray-400 text-opacity-100 bg-opacity-10 text-white m-auto"
            onChange={modifyNameStorage}
            value={alterName}
            onKeyDown={onKeyPressHandler}
            onClick={(e) => e.preventDefault()}
            maxLength={40}
            autoFocus
          />
        ) : (
          <h2
            className="max-w-sm m-auto mb-5 text-2xl px-2 text-center text-white whitespace-pre-wrap group-hover:font-bold active:text-red-500"
            onClick={wasClicked}
          >
            {alterName !== "" ? alterName : character.name}
          </h2>
        )}

        <div
          className="flex flex-col text-center  self-end mt-auto justify-center w-full text-base font-bold text-white bg-red-500"
          onClick={wasClicked}
        >
          <p>Find out more!</p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterItem;
