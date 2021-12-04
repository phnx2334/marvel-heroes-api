import router from "next/router";
import Image from "next/image";
import { CharacterMin } from "../../types/character";
import Link from "next/link";

interface ICharactersItemProps {
  character: CharacterMin;
}

const CharacterItem: React.FC<ICharactersItemProps> = ({ character }) => {
  const description = character.description
    ? character.description
    : "Content not available";

  const linkRef = character.description ? `/character/${character.id}` : "";

  const pointer = character.description ? "cursor-pointer" : "";

  return (
    <Link href={linkRef} passHref>
      <div
        className={`flex flex-col items-center min-w-full m-1 ${pointer} group sm:min-w-min sm:hover:scale-105 hover:z-50`}
      >
        <Image
          src={character.image}
          alt="Hero"
          layout="fixed"
          height={220}
          width={220}
        />
        <h2 className="max-w-sm mt-1 text-2xl text-center text-white whitespace-pre-wrap group-hover:font-bold active:text-red-500">
          {character.name}
        </h2>
        <div>
          <p className="flex-wrap max-w-md p-2 text-base whitespace-pre-wrap line-clamp-6">
            {description}
          </p>

          {description !== "Content not available" && (
            <div className="flex items-center justify-center w-full text-base font-bold text-white bg-red-500">
              <p>Find out more!</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CharacterItem;
