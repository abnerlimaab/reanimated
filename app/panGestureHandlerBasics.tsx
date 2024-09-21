import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

const SIZE = 80;
const CIRCLE_RADIUS = SIZE * 2;

const handleAnimation = (
  translateX: SharedValue<number>,
  translateY: SharedValue<number>
): DefaultStyle => {
  "worklet";
  return {
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  };
};

export default function PanGestureHandlerBasics() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [context, setContext] = useState({
    translateX: 0,
    translateY: 0,
  });
  const animatedStyle = useAnimatedStyle(
    () => handleAnimation(translateX, translateY),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler
          onBegan={() => {
            setContext({
              translateX: translateX.value,
              translateY: translateY.value,
            });
          }}
          onGestureEvent={(event) => {
            translateX.value =
              event.nativeEvent.translationX + context.translateX;
            translateY.value =
              event.nativeEvent.translationY + context.translateY;
          }}
          onEnded={() => {
            const distance = Math.sqrt(
              Math.pow(translateX.value, 2) + Math.pow(translateY.value, 2)
            );

            if (distance > CIRCLE_RADIUS + SIZE / 2) return;

            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
          }}
        >
          <Animated.View style={[styles.square, animatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,255,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "rgba(0,0,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
