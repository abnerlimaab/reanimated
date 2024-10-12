import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, CircleProps } from "react-native-svg";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useEffect } from "react";
import { ReText } from "react-native-redash";

const BACKGROUUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

function strokeOffsetAnimation(progress: SharedValue<number>): CircleProps {
  "worklet";
  return {
    strokeDashoffset: (1 - progress.value) * CIRCLE_LENGTH,
  };
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularProgressBar() {
  const adjustedHeight = height - useHeaderHeight();
  const progress = useSharedValue(0);
  const progressText = useDerivedValue(
    () => `${Math.floor(progress.value * 100)}`
  );

  const animatedStrokeOffset = useAnimatedProps(() =>
    strokeOffsetAnimation(progress)
  );

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      <ReText text={progressText} style={styles.progressText} />

      <Svg style={[styles.circle]} fill="none">
        <Circle
          cx={width / 2}
          cy={adjustedHeight / 2}
          r={RADIUS}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />

        <AnimatedCircle
          cx={width / 2}
          cy={adjustedHeight / 2}
          r={RADIUS}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap="round"
          animatedProps={animatedStrokeOffset}
        />
      </Svg>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.bottonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
  },
  progressText: {
    fontSize: 88,
    color: "rgba(255, 255, 255, 0.8)",
    width: 200,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 80,
    width: width * 0.8,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  bottonText: {
    fontSize: 25,
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 2,
  },
});
