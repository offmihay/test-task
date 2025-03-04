import { useGame } from "@/components/GameStatsProvider";
import HeaderAsset from "@/components/HeaderAsset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { Image, View, Text } from "react-native";

const headerBackground = () => (
  <View style={{ width: "100%", height: "100%" }}>
    <Image
      source={require("@/assets/images/app/header.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />
  </View>
);

const RoutesLayout = () => {
  const { countStatus } = useGame();
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <HeaderAsset
            source={require("@/assets/images/app/assets/back.png")}
            onPress={() => router.back()}
          />
        ),
        headerTitle: () => (
          <HeaderAsset
            source={require("@/assets/images/app/logo-header.png")}
            isTitle
          />
        ),
        headerRight: () => <HeaderAsset />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="menu"
        options={{
          headerBackground,
          headerLeft: () => <HeaderAsset />,
          headerRight: () => (
            <HeaderAsset
              source={require("@/assets/images/app/assets/info.png")}
              onPress={() => router.navigate("/rules")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="game/[id]"
        options={{
          headerBackground,
          headerRight: () => (
            <HeaderAsset
              source={require("@/assets/images/app/assets/count.png")}
              style={{ width: "90%", height: "90%" }}
            >
              <Text>{countStatus}</Text>
            </HeaderAsset>
          ),
          headerTitle: () => (
            <HeaderAsset
              source={require("@/assets/images/app/assets/heart.png")}
              isTitle
            />
          ),
        }}
      />
      <Stack.Screen
        name="rules"
        options={{
          headerBackground,
        }}
      />
    </Stack>
  );
};

export default RoutesLayout;
