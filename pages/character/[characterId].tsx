import { GetServerSidePropsContext } from "next";
import BaseLayout from "../../components/Layout/BaseLayout";
import axios from "axios";
import { characterFull } from "../../types/character";
import Image from "next/image";
import CharDetails from "../../components/CharDetails/CharDetails";
import { useEffect } from "react";

interface ICharacterDetailProps {
  character: characterFull;
}

const CharacterDetail: React.FC<ICharacterDetailProps> = ({ character }) => {

  console.log("the character has", character)



  
  return (
    <BaseLayout>
      <h1 className="m-8 text-2xl text-center sm:text-4xl">{character.name}</h1>
      <main className="flex flex-col items-start p-2 m-2 overscroll-y-auto sm:grid grid-cols-2">
        <div className="max-w-full m-auto w-80 sm:w-full">
          <Image
            src={character.image}
            alt={character.name}
            layout="responsive"
            height={1080}
            width={1080}
          />
        </div>

        <div className="flex flex-col items-center sm:m-4 last:mb-10">
          <p className="flex-wrap max-w-md p-6 text-sm text-justify whitespace-pre-wrap sm:mb-4 sm:p-0 sm:max-w-full">
            {character.description}
          </p>
          {character.comics.length > 0 && (
            <CharDetails items={character.comics} type="Comics" />
          )}
          {character.series.length > 0 && (
            <CharDetails items={character.series} type="Series" />
          )}
        </div>
      </main>
    </BaseLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const characterId = context.params!.characterId;
  const alterName = context.query!.alterName
  console.log("the alter name is", alterName)

  try {
    //Get from API
    const response = await axios.get("http://localhost:3000/api/character", {
      params: {
        characterId: characterId,
        alterName:alterName
      },
    });

    //Return props object to component
    return {
      props: {
        character: response.data,
      },
    };
  } catch (error) {
    console.log("Error fetching server side data", error);
    //Return empty props if error
    return {
      props: {
        character: [],
      },
    };
  }
};

export default CharacterDetail;
