import { TouchableOpacity, Image } from "react-native";
import React from "react";

type Props = {
  type: "back" | "next" | "home" | "info";
  onPress?: () => void;
};

const icons = {
  back: require("@/assets/images/app/assets/back.png"),
  next: require("@/assets/images/app/assets/next.png"),
  home: require("@/assets/images/app/assets/home.png"),
  info: require("@/assets/images/app/assets/info.png"),
};

const SmallBtn = (props: Props) => {
  const { type, onPress } = props;
  const iconSource = icons[type];

  if (!iconSource) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 50, height: 50 }}
      activeOpacity={0.9}
    >
      <Image
        source={iconSource}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default SmallBtn;
