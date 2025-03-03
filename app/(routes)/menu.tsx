import games from "@/constants/games";
import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function MenuScreen() {
  const handlePress = (id: string) => {
    router.navigate({ pathname: "/game/[id]", params: { id } });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg/bg_1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {games.map((game, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handlePress(game.id)}
            style={{ width: 120, height: 120 }}
          >
            <Image
              source={game.image}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
});
