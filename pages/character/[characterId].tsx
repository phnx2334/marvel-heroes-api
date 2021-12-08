import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { characterFull } from "../../types/character";
import Image from "next/image";
import CharDetails from "../../components/CharDetails/CharDetails";

interface ICharacterDetailProps {
  character: characterFull;
}

const CharacterDetail: React.FC<ICharacterDetailProps> = ({ character }) => {
  console.log("the character has", character);

  const description = character.description
    ? character.description
    : "Description not available";

  return (
    <>
      
        <h1 className="flex  font-teko justify-center items-center text-4xl text-white bg-gray-400 bg-opacity-20 h-14 sm:text-5xl md:text-6xl sm:h-20 md:h-28">
          {character.name}
        </h1>
      

      <main className="flex flex-col items-start p-2 m-2 overscroll-y-auto sm:grid grid-cols-2 sm:p-4">
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
            {description}
          </p>
          {character.comics.length > 0 && (
            <CharDetails items={character.comics} type="Comics" />
          )}
          {character.series.length > 0 && (
            <CharDetails items={character.series} type="Series" />
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const characterId = context.params!.characterId;
  const alterName = context.query!.alterName;
  console.log("the alter name is", alterName);

  try {
    //Get from API
    const response = await axios.get("http://localhost:3000/api/character", {
      params: {
        characterId: characterId,
        alterName: alterName,
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
