import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import axios from "axios";
import { Character, CharacterMin } from "../types/character";
import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  const [info, setInfo] = useState<CharacterMin[]>([]);

  const fetchData = async (input: string) => {
    console.log("fetching data");
    try {
      const response = await axios.get("api/characters", {
        params: {
          text: input,
        },
      });

      setInfo(response.data);
    } catch (error) {
      console.log("Error fetching server side data", error);
    }
  };


  const updateResults = async (newText: string) => {
    console.log("trying to update", newText);
    if (newText.length < 3) {
      return;
    }

    await fetchData(newText);
  };

  const onClickSearch = () => {};

  return (
    <div>
      <Head>
        <title>Marvel Heroes!</title>
        <meta
          name="description"
          content="Mavel Heroes page with all you need to know about your favorite heroes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        changeValueHandler={updateResults}
        onClickSearch={onClickSearch}
      />
      <CharactersNav characters={info} />

      <Footer />
    </div>
  );
};

export default Home;
