import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg/bg_1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
