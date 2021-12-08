import axios from "axios";
import React, { useState } from "react";
import { CharacterMin } from "../types/character";

interface ICharContextType {
  characterList: CharacterMin[];
  fetchCharacters: (newText: string, filter: string) => void;
  fetchFavorites: (ids: string) => void;
  isLoading: boolean;
  hasError: boolean;
  errorMsg: string;
}

const CharContext = React.createContext<ICharContextType>({
  characterList: [],
  fetchCharacters: (newText: string, filter: string) => {},
  fetchFavorites: (ids: string) => {},
  isLoading: false,
  hasError: false,
  errorMsg:""
});

export const CharContextProvider: React.FC = (props) => {
  const [charactersList, setCharactersList] = useState<CharacterMin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async (input: string, filter: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await axios.get("api/charactersList", {
        params: {
          text: input,
          filter: filter,
        },
      });

      console.log("the response was", response.data);

      setCharactersList(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      setErrorMsg("No character was found")
      console.log("Error fetching server side data", error);
    }
  };

  const updateCharList = async (newText: string, filter: string) => {
    if (newText.length < 3) {
      return;
    }

    await fetchData(newText, filter);
  };

  const fetchFavorites = async (ids: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await axios.get("api/favoritesList", {
        params: {
          charactersId: ids,
        },
      });

      setCharactersList(response.data);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setErrorMsg("No favorite characters were found")
      console.log("Error fetching server side data", error);
    }
  };

  return (
    <CharContext.Provider
      value={{
        characterList: charactersList,
        isLoading: isLoading,
        hasError: hasError,
        errorMsg:errorMsg,
        fetchCharacters: updateCharList,
        fetchFavorites: fetchFavorites,
      }}
    >
      {props.children}
    </CharContext.Provider>
  );
};

export default CharContext;
