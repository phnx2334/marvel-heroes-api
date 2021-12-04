import { GetServerSidePropsContext } from "next";
import BaseLayout from "../../components/Layout/BaseLayout";
import axios from "axios";
import { Character } from "../../types/character";
import Image from "next/image";
import Collapsible from "../../components/Layout/Collapsible";

interface ICharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<ICharacterDetailProps> = ({ character }) => {
  const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <BaseLayout>
      <main className="flex flex-col items-center overscroll-y-auto">
        <h1 className="m-8 text-2xl text-center">{character.name}</h1>

        <Image
          src={image}
          alt={character.name}
          layout="fixed"
          height={300}
          width={300}
        />

        <p className="flex-wrap max-w-md p-6 text-sm text-justify whitespace-pre-wrap">
          {character.description}
        </p>

        <Collapsible label="Comics">
          <h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            doloremque quisquam esse numquam alias odio fugiat. Qui ullam
            perferendis soluta quo, nihil culpa iste suscipit nulla ea
            aspernatur minima rerum.
          </h1>
        </Collapsible>
      </main>
    </BaseLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const characterId = context.params!.characterId;

  try {
    const response = await axios.get("http://localhost:3000/api/character", {
      params: {
        characterId: characterId,
      },
    });

    return {
      props: {
        character: response.data,
      },
    };
  } catch (error) {
    console.log("Error fetching server side data", error);
    return {
      props: {
        character: [],
      },
    };
  }
};

export default CharacterDetail;
