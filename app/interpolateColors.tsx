import React from "react";
import RN from "react-native";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

enum ThemeName {
  light = "light",
  dark = "dark",
}

type Theme = {
  background: string;
  circle: string;
  text: string;
};

const Colors: { [key in ThemeName]: Theme } = {
  [ThemeName.dark]: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  [ThemeName.light]: {
    background: "#F8F8F8",
    circle: "#FFFFFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0, 0, 0, 0.1)",
};

function animateContainerWorklet(progress: SharedValue<number>): DefaultStyle {
  "worklet";
  const backgroundColor = interpolateColor(
    progress.value,
    [0, 1],
    [Colors.light.background, Colors.dark.background]
  );
  return {
    backgroundColor,
  };
}

function animateCircleWorklet(progress: SharedValue<number>): DefaultStyle {
  "worklet";
  const backgroundColor = interpolateColor(
    progress.value,
    [0, 1],
    [Colors.light.circle, Colors.dark.circle]
  );
  return {
    backgroundColor,
  };
}

function animateTextWorklet(progress: SharedValue<number>): DefaultStyle {
  "worklet";
  const color = interpolateColor(
    progress.value,
    [0, 1],
    [Colors.light.text, Colors.dark.text]
  );
  return {
    color,
  };
}

export default function InterpolateColors() {
  const [theme, setTheme] = React.useState<ThemeName>(ThemeName.light);
  const progress = useDerivedValue(
    () => (theme === ThemeName.dark ? withTiming(1) : withTiming(0)),
    [theme]
  );

  const rContainerStyle = useAnimatedStyle(
    () => animateContainerWorklet(progress),
    []
  );

  const rCircleStyle = useAnimatedStyle(
    () => animateCircleWorklet(progress),
    []
  );

  const rTexttStyle = useAnimatedStyle(() => animateTextWorklet(progress), []);

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.Text style={[styles.text, rTexttStyle]}>THEME</Animated.Text>
      
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <RN.Switch
          value={theme === ThemeName.dark}
          onValueChange={() =>
            setTheme(
              theme === ThemeName.dark ? ThemeName.light : ThemeName.dark
            )
          }
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = RN.Dimensions.get("window").width * 0.7;

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 35,
  },
});
