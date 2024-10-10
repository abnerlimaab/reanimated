import React, { useCallback, useState } from "react";
import {
  LinearGradient as LG,
  LinearGradientProps,
} from "expo-linear-gradient";
import { ColorValue, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import { worklet } from "@/utils/worlet";

function pickerAnimation({
  translateX,
  translateY,
  scale,
}: {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}): DefaultStyle {
  "worklet";
  return {
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
      {
        scale: scale.value,
      },
    ],
  };
}

function internalPickerAnimation({
  translateX,
  maxWidth,
  colors,
}: {
  translateX: SharedValue<number>;
  maxWidth: number;
  colors: string[];
}): DefaultStyle {
  "worklet";

  const inputRange = colors.map(
    (_, index) => (index / colors.length) * maxWidth
  );

  const backgroundColor = interpolateColor(
    translateX.value,
    inputRange,
    colors
  );

  return {
    backgroundColor,
  };
}

type ColorPickerProps = LinearGradientProps & {
  colors: string[];
  maxWidth: number;
  onColorChange: (color: ColorValue) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChange,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() =>
    clamp(translateX.value, 0, maxWidth - CIRCLE_PICKER_SIZE)
  );

  const [rContext, setRContext] = useState<{
    x: number;
  }>({
    x: 0,
  });

  const rPickerStyçle = useAnimatedStyle(
    () =>
      pickerAnimation({
        translateX: adjustedTranslateX,
        translateY: translateY,
        scale: scale,
      }),
    []
  );

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const style = internalPickerAnimation({
      translateX: adjustedTranslateX,
      colors,
      maxWidth,
    });

    if (style.backgroundColor) {
      onColorChange(style.backgroundColor);
    }

    return style;
  }, []);

  const onEnded = useCallback(
    worklet(() => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    }),
    []
  );

  return (
    <TapGestureHandler
      onBegan={({ nativeEvent }) => {
        translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
        scale.value = withSpring(1.2);
        if (typeof nativeEvent.absoluteX === "number") {
          translateX.value = withTiming(
            nativeEvent.absoluteX - CIRCLE_PICKER_SIZE
          );
        }
      }}
      onEnded={onEnded}
    >
      <Animated.View>
        <PanGestureHandler
          onBegan={() => {
            setRContext({
              x: adjustedTranslateX.value,
            });
          }}
          onGestureEvent={({ nativeEvent }) => {
            translateX.value = nativeEvent.translationX + rContext.x;
          }}
          onEnded={onEnded}
        >
          <Animated.View style={styles.container}>
            <LG colors={colors} start={start} end={end} style={style} />

            <Animated.View style={[styles.picker, rPickerStyçle]}>
              <Animated.View
                style={[styles.internalPicker, rInternalPickerStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
});

export default ColorPicker;
