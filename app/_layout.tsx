import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebaseConfig";
export { ErrorBoundary } from "expo-router";
import appsFlyer from "react-native-appsflyer";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      const firebaseApp = initializeApp(firebaseConfig);
      console.log("firebaseApp SDK: ", firebaseApp);

      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize("YOUR-ONESIGNAL-APP-ID");
      OneSignal.Notifications.requestPermission(true); // test

      appsFlyer.initSdk(
        {
          devKey: "fake123",
          isDebug: true,
          appId: "fake1234",
        },
        (result) => {
          console.log("appsFlyer SDK status: ", result);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(routes)" options={{ headerShown: false }} />
    </Stack>
  );
}
