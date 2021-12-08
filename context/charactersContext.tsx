import axios from "axios";
import React, { useState } from "react";
import { CharacterMin } from "../types/character";

interface ICharContextType {
  characterList: CharacterMin[];
  fetchCharacters: (newText: string, filter: string) => void;
  searchClickHandler: () => void;
  isLoading: boolean;
}

const CharContext = React.createContext<ICharContextType>({
  characterList: [],
  fetchCharacters: (newText: string, filter: string) => {},
  searchClickHandler: () => {},
  isLoading: false,
});

export const CharContextProvider: React.FC = (props) => {
  const [charactersList, setCharactersList] = useState<CharacterMin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (input: string, filter: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get("api/charactersList", {
        params: {
          text: input,
          filter: filter,
        },
      });

      setCharactersList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching server side data", error);
    }
  };

  const updateCharList = async (newText: string, filter: string) => {
    if (newText.length < 3) {
      return;
    }

    await fetchData(newText, filter);
  };

  const onClickSearch = () => {};

  return (
    <CharContext.Provider
      value={{
        characterList: charactersList,
        isLoading: isLoading,
        fetchCharacters: updateCharList,
        searchClickHandler: onClickSearch,
      }}
    >
      {props.children}
    </CharContext.Provider>
  );
};

export default CharContext;
