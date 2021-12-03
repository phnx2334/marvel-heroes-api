import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import axios from "axios";
import { Character, CharacterMin } from "../types/character";

const Home: NextPage = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [info, setInfo] = useState<CharacterMin[]>([]);

  const fetchData = async (input: string) => {
    console.log("the input is", input);
    try {
      const response = await axios.get("api/characters", {
        params: {
          text: input,
        },
      });

      console.log("response data", response);

      if (response.data.length) {
        console.log("the response in the client is", response);

        const purged = purgeData(response.data.results);

        setInfo(purged);
      }
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

  useEffect(() => {
    let timoutid = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchData(searchTerm);
      }
    }, 500);
    return () => {
      clearTimeout(timoutid);
    };
  }, [fetchData, searchTerm]);

  const onClickSearch = () => {};

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
      <Header
        changeValueHandler={setsearchTerm}
        onClickSearch={onClickSearch}
      />
      <CharactersNav characters={info} />
    </div>
  );
};

export default Home;
