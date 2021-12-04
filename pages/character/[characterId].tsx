import { GetServerSidePropsContext } from "next";
import BaseLayout from "../../components/Layout/BaseLayout";
import axios from "axios";

interface ICharacterDetailProps {
  character: any;
}

const CharacterDetail: React.FC<ICharacterDetailProps> = (props) => {
  console.log("the data is", props.character);
  return <BaseLayout></BaseLayout>;
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
