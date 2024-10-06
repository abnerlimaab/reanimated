import { useCallback, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  View,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

function heartAnimation(scale: SharedValue<number>): ImageStyle {
  "worklet";
  return {
    transform: [{ scale: Math.max(scale.value, 0) }],
  };
}

function iconsAnimation(opacity: SharedValue<number>): ImageStyle {
  "worklet";
  return {
    opacity: opacity.value,
  };
}

export default function AnimateDoubleTap() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = useRef(null);

  const rHeartStyle = useAnimatedStyle(() => heartAnimation(scale));
  const rIconsStyle = useAnimatedStyle(() => iconsAnimation(opacity));

  const handleDoubleTap = useCallback(() => {
    scale.value = withSpring(2, undefined, (finished) => {
      if (finished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const handleSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (finished) => {
      if (finished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        numberOfTaps={1}
        onActivated={handleSingleTap}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={handleDoubleTap}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/images/like-background.jpg")}
              style={styles.image}
            >
              <Animated.Image
                source={require("../assets/images/heart.png")}
                style={[
                  styles.image,
                  {
                    shadowOffset: {
                      width: 0,
                      height: 20,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 35,
                  },
                  rHeartStyle,
                ]}
                resizeMode="center"
              />
            </ImageBackground>

            <Animated.Text style={[styles.icons, rIconsStyle]}>
              💕💕💕💕
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  icons: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 35,
  },
});
