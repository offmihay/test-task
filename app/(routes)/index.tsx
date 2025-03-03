import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default function WelcomeScreen() {
  const handleStart = () => {
    router.navigate("./two", {
      relativeToDirectory: true,
    });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg/bg_2.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/app/logo.png")}
          resizeMode="cover"
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleStart}>
          <Text style={{ fontSize: 40 }}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },

  logo: {
    width: 250,
  },
});
