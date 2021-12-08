import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header/Header";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import axios from "axios";
import { CharacterMin } from "../types/character";
import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marvel Heroes!</title>
        <meta
          name="description"
          content="Mavel Heroes page with all you need to know about your favorite heroes"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharactersNav />
    </div>
  );
};

export default Home;
