import type { NextPage } from "next";
import Head from "next/head";
import pic1 from "../assets/1.jpg";
import pic2 from "../assets/2.jpg";
import pic3 from "../assets/3.jpg";
import pic4 from "../assets/4.jpg";
import pic5 from "../assets/5.jpg";
import pic6 from "../assets/6.jpg";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";

const Home: NextPage = () => {
  const images = [
    { name: "Spidey", image: pic1 },
    { name: "Avengers", image: pic2 },
    { name: "Black Panther", image: pic3 },
    { name: "IronMan", image: pic4 },
    { name: "Deadpool", image: pic5 },
    { name: "Captain America", image: pic6 },
    { name: "Spidey", image: pic1 },
    { name: "Avengers", image: pic2 },
    { name: "Black Panther", image: pic3 },
    { name: "IronMan", image: pic4 },
    { name: "Deadpool", image: pic5 },
    { name: "Captain America", image: pic6 },
    { name: "Spidey", image: pic1 },
    { name: "Avengers", image: pic2 },
    { name: "Black Panther", image: pic3 },
    { name: "IronMan", image: pic4 },
    { name: "Deadpool", image: pic5 },
    { name: "Captain America", image: pic6 },
  ];
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
      <Nav items={images} />
    </div>
  );
};

export default Home;
