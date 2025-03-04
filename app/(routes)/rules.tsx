import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";

type Props = {};

const rules = (props: Props) => {
  const {} = props;

  return (
    <ImageBackground
      source={require("@/assets/images/bg/bg_1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.wrapper}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            color: "white",
            marginBottom: 20,
          }}
        >
          RULES
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "white",
            lineHeight: 30,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. A ut sit pellentesque vel. Sit
          tincidunt praesent adipiscing in magna erat enim nec urna. Aliquet
          volutpat id arcu fames varius mus ultricies mollis. Adipiscing blandit
          cursus faucibus vel ullamcorper dignissim at...
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
});

export default rules;
