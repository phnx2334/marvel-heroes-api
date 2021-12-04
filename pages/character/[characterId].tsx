import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import BaseLayout from "../../components/Layout/BaseLayout";

interface IParams extends ParsedUrlQuery {
  characterId: string;
}

interface ICharacterDetailProps {}

const CharacterDetail: React.FC<ICharacterDetailProps> = (props) => {
  const router = useRouter();

  const charId = router.query.characterId;

  useEffect(() => {}, []);

  return <BaseLayout></BaseLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { characterId } = context.params as IParams;

  

  return {
    props: {
      results: [],
    },
  };
};

export default CharacterDetail;
