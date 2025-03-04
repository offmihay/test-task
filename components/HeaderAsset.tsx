import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageResizeMode,
  StyleProp,
  ImageStyle,
  View,
} from "react-native";
import React from "react";

type Props = {
  source?: ImageSourcePropType | undefined;
  onPress?: () => void;
  resizeMode?: ImageResizeMode | undefined;
  isTitle?: boolean;
  style?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
};

const HeaderAsset = (props: Props) => {
  const { source, onPress, resizeMode, isTitle, style, children } = props;

  return (
    <TouchableOpacity
      style={isTitle ? styles.title : styles.btn}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      {source && (
        <Image
          source={source}
          resizeMode={resizeMode || "contain"}
          style={style || { width: "60%", height: "60%" }}
        />
      )}
      <View style={styles.childContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  childContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderAsset;
