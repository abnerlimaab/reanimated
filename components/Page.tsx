import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import { useHeaderHeight } from "@react-navigation/elements";
import { StatusBar } from "react-native";

type PageProps = {
  title: string;
  index: number;
  translateX: SharedValue<number>;
};

const { width, height } = Dimensions.get("window");

const SIZE = width * 0.7;

const handleSquareAnimation = (
  translateX: SharedValue<number>,
  index: number
): DefaultStyle => {
  "worklet";
  const wrapperInterpolate = (outputRange: number[]) =>
    interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      outputRange,
      Extrapolation.CLAMP
    );

  const scale = wrapperInterpolate([0, 1, 0]);
  const borderRadius = wrapperInterpolate([0, SIZE / 2, 0]);

  return {
    borderRadius,
    transform: [{ scale }],
  };
};

const handleTextAnimation = (
  translateX: SharedValue<number>,
  index: number
): DefaultStyle => {
  "worklet";
  const wrapperInterpolate = (outputRange: number[]) =>
    interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      outputRange,
      Extrapolation.CLAMP
    );

  const translateY = wrapperInterpolate([height / 2, 0, height / 2]);

  const opacity = wrapperInterpolate([-1, 1, -1]);

  return {
    opacity,
    transform: [{ translateY }],
  };
};

export const Page: React.FC<PageProps> = ({ title, translateX, index }) => {
  const headerHeight = useHeaderHeight();
  const rSquareStyle = useAnimatedStyle(
    () => handleSquareAnimation(translateX, index),
    []
  );

  const rTextStyle = useAnimatedStyle(
    () => handleTextAnimation(translateX, index),
    []
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(0, 0, 255, 0.${index * 2})`,
          height: height - headerHeight + (StatusBar.currentHeight ?? 0),
        },
      ]}
    >
      <Animated.View style={[styles.square, rSquareStyle]} />

      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,255,0.4)",
  },
  text: {
    fontSize: 64,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
