import TypeGuard from "@/types/TypeGuard";
import React, { useRef, useState } from "react";
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

type CircleAnimationProps = {
  centerX: SharedValue<number>;
  centerY: SharedValue<number>;
  scale: SharedValue<number>;
  width: SharedValue<number>;
  height: SharedValue<number>;
  rippleOpacity: SharedValue<number>;
};

function circleAnimation({
  centerX,
  centerY,
  scale,
  width,
  height,
  rippleOpacity,
}: CircleAnimationProps): DefaultStyle {
  "worklet";
  const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
  const size = circleRadius * 2;

  const translateX = centerX.value - circleRadius;
  const translateY = centerY.value - circleRadius;

  return {
    width: size,
    height: size,
    borderRadius: circleRadius,
    opacity: rippleOpacity.value,
    transform: [{ translateX }, { translateY }, { scale: scale.value }],
  };
}

type RippleProps = {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: React.ReactNode;
};

export const Ripple: React.FC<RippleProps> = ({
  style = {},
  onTap = () => {},
  children = <></>,
}) => {
  const [viewLayout, setViewLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  const rCircleStyle = useAnimatedStyle(
    () =>
      circleAnimation({
        centerX,
        centerY,
        scale,
        width,
        height,
        rippleOpacity,
      }),
    []
  );

  return (
    <View
      style={style}
      onLayout={({ nativeEvent }) => {
        setViewLayout(nativeEvent.layout);
      }}
    >
      <TapGestureHandler
        onBegan={({ nativeEvent }) => {
          const { x, y } = nativeEvent;
          if (!TypeGuard.isNumber(x) || !TypeGuard.isNumber(y)) return;

          width.value = viewLayout.width;
          height.value = viewLayout.height;
          centerX.value = x;
          centerY.value = y;

          rippleOpacity.value = 1;
          scale.value = 0;
          scale.value = withTiming(1, {
            duration: 1000,
          });
        }}
        onActivated={onTap}
        onEnded={() => {
          rippleOpacity.value = withTiming(0);
        }}
        onFailed={() => {
          rippleOpacity.value = withTiming(0);
        }}
      >
        <Animated.View style={[styles.tapWrapper, style]}>
          <View>{children}</View>
          <Animated.View style={[styles.circle, rCircleStyle]} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  tapWrapper: {
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});
