import { AntDesign } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  clamp,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

const CONTAINER_WIDTH = 150;
const CIRCLE_SIZE = 50;
const ICON_SIZE = 20;
const TRANSLATION_AREA = CONTAINER_WIDTH - CIRCLE_SIZE;
const MAX_SLIDE_OFFSET = TRANSLATION_AREA / 2;

const circleAnimation = ({
  translateX,
  translateY,
}: {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
}): DefaultStyle => {
  "worklet";
  return {
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  };
};

const plusMinusIconAnimation = ({
  translateX,
  translateY,
}: {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
}): DefaultStyle => {
  "worklet";
  const opacityX = interpolate(
    translateX.value,
    [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
    [0.4, 0.8, 0.4]
  );

  const opacityY = interpolate(translateY.value, [0, MAX_SLIDE_OFFSET], [1, 0]);

  return {
    opacity: opacityX * opacityY,
  };
};

const closeIconAnimation = ({
  translateY,
}: {
  translateY: SharedValue<number>;
}): DefaultStyle => {
  "worklet";
  const opacity = interpolate(
    translateY.value,
    [0, MAX_SLIDE_OFFSET],
    [0, 0.8]
  );
  return {
    opacity,
  };
};

const containerAnimation = ({
  translateX,
  translateY,
}: {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
}): DefaultStyle => {
  "worklet";
  return {
    transform: [
      { translateX: translateX.value * 0.1 },
      { translateY: translateY.value * 0.1 },
    ],
  };
};

type SlidingCounterComponentProps = {};

const SlidingCounterComponent: FC<SlidingCounterComponentProps> = ({}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [count, setCount] = useState(0);

  const rCicleStyle = useAnimatedStyle(() =>
    circleAnimation({ translateX, translateY })
  );

  const rPlusMinusIconStyle = useAnimatedStyle(() =>
    plusMinusIconAnimation({ translateX, translateY })
  );

  const rCloseIconStyle = useAnimatedStyle(() =>
    closeIconAnimation({ translateY })
  );

  const rContainerStyle = useAnimatedStyle(() =>
    containerAnimation({ translateX, translateY })
  );

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View style={[rPlusMinusIconStyle]}>
        <AntDesign name="minus" size={ICON_SIZE} color="white" />
      </Animated.View>

      <Animated.View style={[rCloseIconStyle]}>
        <AntDesign name="close" size={ICON_SIZE} color="white" />
      </Animated.View>

      <Animated.View style={[rPlusMinusIconStyle]}>
        <AntDesign name="plus" size={ICON_SIZE} color="white" />
      </Animated.View>

      <View style={styles.circleContainer}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            translateX.value = clamp(
              nativeEvent.translationX,
              -MAX_SLIDE_OFFSET,
              MAX_SLIDE_OFFSET
            );

            translateY.value = clamp(
              nativeEvent.translationY,
              0,
              MAX_SLIDE_OFFSET
            );
          }}
          onEnded={() => {
            if (translateX.value === MAX_SLIDE_OFFSET) {
              setCount(count + 1);
            }

            if (translateX.value === -MAX_SLIDE_OFFSET) {
              setCount(count - 1);
            }

            if (translateY.value === MAX_SLIDE_OFFSET) {
              setCount(0);
            }

            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
          }}
        >
          <Animated.View style={[styles.circle, rCicleStyle]}>
            <Text style={styles.countText}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: CONTAINER_WIDTH,
    backgroundColor: "#111",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    backgroundColor: "#232323",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 25,
    color: "white",
  },
});

export default SlidingCounterComponent;
