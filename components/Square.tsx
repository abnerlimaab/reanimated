import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

const N = 12;
const SQUARE_SIZE = 12;
const OFFSET_ANGLE = (2 * Math.PI) / N;

const squareAnimation = ({
  rotate,
  translateY,
}: {
  rotate: SharedValue<number>;
  translateY: SharedValue<number>;
}): DefaultStyle => {
  "worklet";

  return {
    transform: [
      {
        rotate: `${rotate.value}rad`,
      },
      {
        translateY: translateY.value,
      },
    ],
  };
};

const derivedRotate = ({
  finalAngle,
  progress,
}: {
  finalAngle: number;
  progress: SharedValue<number>;
}): number => {
  "worklet";
  if (progress.value <= 2 * Math.PI) {
    return Math.min(finalAngle, progress.value);
  }

  if (progress.value - 2 * Math.PI < finalAngle) {
    return finalAngle;
  }

  return progress.value;
};

const derivedTranslateY = ({
  finalAngle,
  index,
  rotate,
  progress,
}: {
  finalAngle: number;
  index: number;
  rotate: SharedValue<number>;
  progress: SharedValue<number>;
}): number => {
  "worklet";
  if (rotate.value === finalAngle) {
    return withSpring(-N * SQUARE_SIZE);
  }

  if (progress.value > 2 * Math.PI) {
    return withTiming((index - N) * SQUARE_SIZE);
  }

  return withTiming(-index * SQUARE_SIZE);
};

type SquareProps = {
  index: number;
  progress: SharedValue<number>;
};

const Square: FC<SquareProps> = ({ index, progress }) => {
  const finalAngle = OFFSET_ANGLE * (N - 1 - index);

  const rotate = useDerivedValue(
    () => derivedRotate({ finalAngle, progress }),
    []
  );

  const translateY = useDerivedValue(
    () => derivedTranslateY({ finalAngle, index, rotate, progress }),
    []
  );

  const rSquareStyle = useAnimatedStyle(() =>
    squareAnimation({ rotate, translateY })
  );

  return (
    <Animated.View
      key={index}
      style={[
        styles.square,
        rSquareStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    position: "absolute",
    height: SQUARE_SIZE,
    aspectRatio: 1,
    backgroundColor: "white",
  },
});

export default Square;
