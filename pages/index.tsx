import type { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useState } from "react";
import CharactersNav from "../components/CharactersNav/CharactersNav";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import CharContext from "../context/charactersContext";

const Home: NextPage = () => {
  const ctx = useContext(CharContext);
  const [showModal, setShowModal] = ctx.modal;
  const [resetFeedback, setResetFeedback] = useState("");

  const clearStorage = (type: string) => {
    localStorage.removeItem(type);
    setResetFeedback("Done!");
    setTimeout(() => {
      setResetFeedback("");
    }, 1000);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setShowModal(false);
          window.location.reload();
        }}
        show={showModal}
      >
        <button
          className="border-2 text-sm p-2 m-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={() => clearStorage("favorites")}
        >
          Reset Favorites
        </button>
        <button
          className="border-2 text-sm p-2 m-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={() => clearStorage("names")}
        >
          Reset Names
        </button>
        <button
          className="border-2 text-sm p-2 m-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={() => clearStorage("deleted")}
        >
          Reset Deleted
        </button>

        <div>{resetFeedback}</div>
      </Modal>
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
      <Footer />
    </>
  );
};

export default Home;
