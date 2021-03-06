import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CharacterMinImg } from "../types/character";

interface ICharContextType {
  characterList: CharacterMinImg[];
  fetchCharacters: (newText: string, filter: string) => void;
  fetchFavorites: (ids: string) => void;
  isLoading: boolean;
  hasError: boolean;
  errorMsg: string;
  modal: [boolean, Dispatch<SetStateAction<boolean>>];
}

const CharContext = React.createContext<ICharContextType>({
  characterList: [],
  fetchCharacters: (newText: string, filter: string) => {},
  fetchFavorites: (ids: string) => {},
  isLoading: false,
  hasError: false,
  errorMsg: "",
  modal: [false, () => {}],
});


//Context handles all the fetching operations for the lists of characters. Single character page is server side rendered.
export const CharContextProvider: React.FC = (props) => {
  const [charactersList, setCharactersList] = useState<CharacterMinImg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

      setCharactersList(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      setErrorMsg(
        "Too bad! This search had no results. Want to try a different one?"
      );
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
      setErrorMsg("No favorite characters were found. Try adding some first!");
      console.log("Error fetching server side data", error);
    }
  };

  return (
    <CharContext.Provider
      value={{
        characterList: charactersList,
        isLoading: isLoading,
        hasError: hasError,
        errorMsg: errorMsg,
        modal: [modalOpen, setModalOpen],
        fetchCharacters: updateCharList,
        fetchFavorites: fetchFavorites,
      }}
    >
      {props.children}
    </CharContext.Provider>
  );
};

export default CharContext;
