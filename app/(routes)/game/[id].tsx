import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import games, { Asset, Game } from "@/constants/games";
import ModalContent from "@/components/Modal";
import { useGame } from "@/components/GameStatsProvider";

const GameScreen = () => {
  const { id } = useLocalSearchParams();
  const { updateGameStat } = useGame();

  const [game, setGame] = useState<Game | null>(null);
  const cardWidth = game && (Dimensions.get("window").width - 80) / game.rows;

  const [gameState, setGameState] = useState<
    (Asset & { isSelected: boolean })[] | null
  >(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  const startGame = () => {
    setSelectedCards([]);
    setIsPlaying(false);
    setGameResult(null);
    setGameState(
      (prev) => prev && prev.map((card) => ({ ...card, isSelected: true }))
    );

    setTimeout(() => {
      setGameState(
        (prev) => prev && prev.map((card) => ({ ...card, isSelected: false }))
      );
      setIsPlaying(true);
    }, 2000);
  };

  useEffect(() => {
    const game = games.find((g) => g.id === id);
    if (!game) {
      return;
    }
    setGame(game);

    const cards = mixCards(game);
    setGameState(cards);

    startGame();
  }, [id]);

  const mixCards = (game: Game) => {
    return [
      ...game.assets.map((a) => ({ ...a, isSelected: false })),
      ...game.assets.map((a) => ({ ...a, isSelected: false })),
    ].sort(() => 0.5 - Math.random());
  };

  const handleWin = async () => {
    setGameResult("win");
    game && updateGameStat(game.id);
  };

  const handlePick = (index: number) => {
    if (
      !game ||
      !gameState ||
      !isPlaying ||
      gameState[index].isSelected ||
      selectedCards.length === 2
    ) {
      return;
    }

    const newGameState = gameState.map((card, i) =>
      i === index ? { ...card, isSelected: true } : card
    );

    const newSelectedCards = [...selectedCards, index];

    setGameState(newGameState);
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;

      if (newGameState[firstIndex].id === newGameState[secondIndex].id) {
        setSelectedCards([]);
        if (newGameState.every((card) => card.isSelected)) {
          handleWin();
          setIsPlaying(false);
        }
      } else {
        setSelectedCards([]);
        setIsPlaying(false);
        setGameResult("lose");
      }
    }
  };

  const restartGame = () => {
    setGameResult(null);
    const cards = mixCards(game!);
    setGameState(cards);
    startGame();
  };

  const handleGoMenu = () => {
    setGameResult(null);
    router.back();
  };

  const handleGoNext = () => {
    setGameResult(null);
    const currIndex = games.findIndex((game) => game.id === id);
    if (currIndex + 1 < games.length) {
      router.navigate({
        pathname: "/game/[id]",
        params: { id: games[currIndex + 1].id },
      });
    } else {
      handleGoMenu();
    }
  };

  return (
    <ImageBackground
      source={game?.bgImage}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.cards}>
          {gameState?.map((card, index) => (
            <View
              key={index}
              style={{ width: cardWidth, height: cardWidth, padding: 5 }}
            >
              {card.isSelected ? (
                <Image
                  source={card.image}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handlePick(index)}
                >
                  <Image
                    source={require("@/assets/images/app/games/empty_card.png")}
                    resizeMode="contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
      <Modal visible={gameResult === "win"} transparent={true}>
        <ModalContent
          type="win"
          onActionPress={handleGoNext}
          onHomePress={handleGoMenu}
        />
      </Modal>
      <Modal visible={gameResult === "lose"} transparent={true}>
        <ModalContent
          type="lose"
          onActionPress={restartGame}
          onHomePress={handleGoMenu}
        />
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default GameScreen;
