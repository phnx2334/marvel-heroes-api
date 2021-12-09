import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CharacterMin } from "../types/character";

interface ICharContextType {
  characterList: CharacterMin[];
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

export const CharContextProvider: React.FC = (props) => {
  const [charactersList, setCharactersList] = useState<CharacterMin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

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
      setErrorMsg("No favorite characters were found");
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
