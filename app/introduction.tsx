import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

const SIZE = 100;

const handleAnimation = (
  progress: SharedValue<number>,
  scale: SharedValue<number>
) => {
  "worklet";
  return {
    opacity: progress.value,
    borderRadius: (progress.value * SIZE) / 2,
    transform: [
      { scale: scale.value },
      { rotate: `${progress.value * 2 * Math.PI}rad` },
    ],
  };
};

export default function IntroductionScreen() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(
    () => handleAnimation(progress, scale),
    []
  );

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5, { duration: 5000 }), -1, true);
    scale.value = withRepeat(withSpring(2, { duration: 5000 }), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: "blue",
          },
          reanimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
