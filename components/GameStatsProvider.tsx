import games from "@/constants/games";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export type GameStats = Record<string, boolean>;

const gameStatInit: GameStats = Object.fromEntries(
  games.map((game) => [game.id, false])
);

interface GameContextType {
  updateGameStat: (id: string) => Promise<void>;
  countStatus: string;
}

const GameStatsContext = createContext<GameContextType | undefined>(undefined);

export const GameStatsProvider = ({ children }: { children: ReactNode }) => {
  const [gameStats, setGameStats] = useState<GameStats>({});
  const storage = useAsyncStorage("gameStats");

  const initStorage = async () => {
    try {
      const statsStorageJson = await storage.getItem();
      const statsStorage: GameStats = statsStorageJson
        ? JSON.parse(statsStorageJson)
        : {};
      const mergedStats = { ...gameStatInit, ...statsStorage };
      setGameStats(mergedStats);
      await storage.setItem(JSON.stringify(mergedStats));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initStorage();
  }, []);

  const updateGameStat = async (id: string) => {
    const updatedStats = {
      ...gameStats,
      [id]: true,
    };
    setGameStats(updatedStats);
    await storage.setItem(JSON.stringify(updatedStats));
  };

  const countFinished = `${
    Object.values(gameStats).filter((status) => status).length
  }/${Object.keys(gameStats).length}`;

  return (
    <GameStatsContext.Provider
      value={{ updateGameStat, countStatus: countFinished }}
    >
      {children}
    </GameStatsContext.Provider>
  );
};

export const useGame = () => {
  const context = React.useContext(GameStatsContext);
  if (!context) {
    throw new Error("useGame should be used within a GameProvider");
  }
  return context;
};
