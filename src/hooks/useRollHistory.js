import { useState, useEffect } from "react";

const HISTORY_KEY = "sanguihedral_roll_history";
const MAX_ROLLS = 25;

const useRollHistory = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addRoll = (rollData) => {
    const newEntry = {
      ...rollData,
      id: rollData.id || Date.now(),
      timestamp: rollData.timestamp || new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev];
      return updated.slice(0, MAX_ROLLS);
    });
  };

  const deleteRoll = (id) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addRoll,
    deleteRoll,
    clearHistory,
  };
};

export default useRollHistory;
