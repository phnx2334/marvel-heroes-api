import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import axios from "axios";
import { Character, CharacterMin } from "../types/character";

const Home: NextPage = () => {
  const [info, setInfo] = useState<CharacterMin[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (input?: string) => {
    input = "spi";

    try {
      const response = await axios.get("api/characters", {
        params: {
          text: input,
        },
      });

      const purged = purgeData(response.data.data.results);

      setInfo(purged);
    } catch (error) {
      console.log("Error fetching server side data", error);
    }
  };

  const purgeData = (data: Character[]) => {
    const characters = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        apiPage: `api/${item.name}`,
      };
    });

    return characters;
  };

  return (
    <div className="">
      <Head>
        <title>Marvel Heroes!</title>
        <meta
          name="description"
          content="Mavel Heroes page with all you need to know about your favorite heroes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CharactersNav characters={info} />
    </div>
  );
};

export default Home;
