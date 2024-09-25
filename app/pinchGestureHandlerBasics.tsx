import { Dimensions, ImageStyle, StyleSheet } from "react-native";
import {
  GestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";

const imageUri =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";

const { width, height } = Dimensions.get("window");

function animateImageWorklet(
  scale: SharedValue<number>,
  focalX: SharedValue<number>,
  focalY: SharedValue<number>
): ImageStyle {
  "worklet";
  return {
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  };
}

function animateFocalPointWorklet(
  focalX: SharedValue<number>,
  focalY: SharedValue<number>
): DefaultStyle {
  "worklet";
  return {
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  };
}

function usePinchGestureHandlerBasics() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const rImageStyle = useAnimatedStyle(
    () => animateImageWorklet(scale, focalX, focalY),
    []
  );
  const rFocalPointStyle = useAnimatedStyle(
    () => animateFocalPointWorklet(focalX, focalY),
    []
  );

  const handleGestureEvent = (
    event: GestureEvent<PinchGestureHandlerEventPayload>
  ) => {
    scale.value = event.nativeEvent.scale;
    focalX.value = event.nativeEvent.focalX;
    focalY.value = event.nativeEvent.focalY;
  };

  const handleEnded = () => {
    scale.value = withTiming(1);
    focalX.value = withTiming(0);
    focalY.value = withTiming(0);
  };

  return {
    scale,
    focalX,
    focalY,
    rImageStyle,
    rFocalPointStyle,
    handleGestureEvent,
    handleEnded,
  };
}

export default function PinchGestureHandlerBasics() {
  const pinchGestureHandlerBasics = usePinchGestureHandlerBasics();

  return (
    <PinchGestureHandler
      onGestureEvent={pinchGestureHandlerBasics.handleGestureEvent}
      onEnded={pinchGestureHandlerBasics.handleEnded}
    >
      <Animated.View style={styles.container}>
        <Animated.Image
          source={{ uri: imageUri }}
          style={[styles.image, pinchGestureHandlerBasics.rImageStyle]}
        />

        <Animated.View
          style={[
            styles.focalPoint,
            pinchGestureHandlerBasics.rFocalPointStyle,
          ]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
