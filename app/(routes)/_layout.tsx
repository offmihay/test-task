import { Stack } from "expo-router";
import { Image } from "react-native";

const RoutesLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackground: () => (
          <Image source={require("@/assets/images/app/header.png")} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="two" />
    </Stack>
  );
};

export default RoutesLayout;
