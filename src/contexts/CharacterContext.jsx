import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import * as api from "../utils/api";

const CharacterContext = createContext();

export const CharacterProvider = ({ children, isLoggedIn }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(() => {
    setIsLoading(true);
    setError(null);
    return api
      .getCharacters()
      .then((data) => {
        setCharacters(data);
        return data;
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch characters");
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCharacters().catch(console.error);
    } else {
      setCharacters([]);
    }
  }, [isLoggedIn, fetchCharacters]);

  const addCharacter = (data) => {
    setIsLoading(true);
    return api
      .createCharacter(data)
      .then((newChar) => {
        setCharacters((prev) => [...prev, newChar]);
        return newChar;
      })
      .catch((err) => {
        setError(err.message || "Failed to add character");
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateCharacter = (id, data) => {
    setIsLoading(true);
    return api
      .updateCharacter(id, data)
      .then((updatedChar) => {
        setCharacters((prev) =>
          prev.map((c) => (c._id === id ? updatedChar : c))
        );
        return updatedChar;
      })
      .catch((err) => {
        setError(err.message || "Failed to update character");
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteCharacter = (id) => {
    setIsLoading(true);
    return api
      .deleteCharacter(id)
      .then(() => {
        setCharacters((prev) => prev.filter((c) => c._id !== id));
      })
      .catch((err) => {
        setError(err.message || "Failed to delete character");
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const value = {
    characters,
    isLoading,
    error,
    fetchCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacters must be used within a CharacterProvider");
  }
  return context;
};
