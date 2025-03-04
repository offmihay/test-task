import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React from "react";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const DefaultBtn = (props: Props) => {
  const { onPress, children } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require("@/assets/images/app/assets/btn.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <View style={styles.textContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 160,
    height: 40,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DefaultBtn;
