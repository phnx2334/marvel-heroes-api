import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import axios from "axios";
import { Character, CharacterMin } from "../types/character";
import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [info, setInfo] = useState<CharacterMin[]>([]);

  useEffect(() => {
    const fetchData = async (input: string) => {
      console.log("fetching data")
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

    let timeoutid = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchData(searchTerm);
      }
    }, 500);
    return () => {
      clearTimeout(timeoutid);
    };
  }, []);

  const onClickSearch = () => {};

  return (
    <div className="flex flex-col max-h-screen">
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

      <Footer />
    </div>
  );
};

export default Home;
