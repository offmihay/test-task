import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import DefaultBtn from "@/components/DefaultBtn";

export default function WelcomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const geoCodingApi =
    "https://nominatim.openstreetmap.org/reverse?format=json";

  const handleStart = async () => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      setIsLoading(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    const responseJson = await fetch(
      `${geoCodingApi}&lat=${latitude}&lon=${longitude}`
    );
    const response = await responseJson.json();
    setIsLoading(false);
    if (response.address.country_code !== "ua") {
      await WebBrowser.openBrowserAsync("https://www.wikipedia.org");
    } else {
      router.navigate("/menu");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg/bg_2.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/app/logo.png")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      {isLoading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <View style={styles.btnContainer}>
        <DefaultBtn onPress={handleStart}>
          <Text style={{ fontSize: 20, color: "white", letterSpacing: 1.5 }}>
            START
          </Text>
        </DefaultBtn>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    marginBottom: 100,
  },

  indicatorContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  btnContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 90,
  },

  logo: {
    width: 250,
    height: 250,
  },
});
