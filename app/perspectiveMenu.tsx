import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import { Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THRESHOLD = SCREEN_WIDTH / 2;

const BACKGROUND_COLOR = "#1e1e23";

function menuContainerAnimation(translateX: SharedValue<number>): DefaultStyle {
  "worklet";
  const rotate = interpolate(
    translateX.value,
    [0, THRESHOLD],
    [0, 3],
    Extrapolation.CLAMP
  );

  const borderRadius = interpolate(
    translateX.value,
    [0, THRESHOLD],
    [0, 11],
    Extrapolation.CLAMP
  );

  return {
    borderRadius,
    transform: [
      { perspective: 100 },
      { translateX: translateX.value },
      { rotateY: `-${rotate}deg` },
    ],
  };
}

export default function PerspectiveMenu() {
  const [gestureContext, setGestureContext] = useState({
    x: 0,
  });

  const translateX = useSharedValue(0);

  const rMenuContainerStyle = useAnimatedStyle(() =>
    menuContainerAnimation(translateX)
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onBegan={() => {
          setGestureContext({ x: translateX.value });
        }}
        onGestureEvent={({ nativeEvent }) => {
          translateX.value = nativeEvent.translationX + gestureContext.x;
        }}
        onEnded={() => {
          if (translateX.value <= THRESHOLD) {
            return (translateX.value = withTiming(0));
          }

          translateX.value = withTiming(THRESHOLD);
        }}
      >
        <Animated.View style={[styles.menuContainer, rMenuContainerStyle]}>
          <Feather
            name="menu"
            size={32}
            color={BACKGROUND_COLOR}
            style={styles.menuIcon}
            onPress={() => {
              if (translateX.value > 0) {
                return (translateX.value = withTiming(0));
              }

              translateX.value = withTiming(THRESHOLD);
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  menuIcon: {
    margin: 15,
  },
});
