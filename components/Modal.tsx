import { StyleSheet, View, Image } from "react-native";
import React from "react";
import SmallBtn from "./SmallBtn";
import { router } from "expo-router";

type Props = {
  type: "lose" | "win";
  onHomePress: () => void;
  onActionPress: () => void;
};

const ModalContent = (props: Props) => {
  const { type, onHomePress, onActionPress } = props;

  return (
    <View style={styles.wrapper}>
      <View>
        <Image
          source={
            type === "lose"
              ? require("@/assets/images/app/lose-modal.png")
              : require("@/assets/images/app/win-modal.png")
          }
          resizeMode="contain"
          style={{ width: 300, height: 200 }}
        />
        <View style={styles.btns}>
          <SmallBtn type="home" onPress={onHomePress} />
          <SmallBtn
            type={type === "lose" ? "back" : "next"}
            onPress={onActionPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  btns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    gap: 100,
  },
});

export default ModalContent;
