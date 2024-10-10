import ColorPicker from "@/components/ColorPicker";
import { useCallback } from "react";
import { ColorValue, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

const colors = [
  "red",
  "pink",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0, 0, 0, 0.9)";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

function animateCircle({
  pickedColor,
}: {
  pickedColor: SharedValue<ColorValue>;
}): DefaultStyle {
  "worklet";

  return {
    backgroundColor: pickedColor.value,
  };
}

export default function ColorPickerAnimation() {
  const pickedColor = useSharedValue<ColorValue>(colors[0]);

  const onColorChange = useCallback((color: ColorValue) => {
    'worklet';
    pickedColor.value = color;
  }, []);

  const rCircleStyle = useAnimatedStyle(() => animateCircle({ pickedColor }));

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
      </View>

      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChange={onColorChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    height: 50,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
});
