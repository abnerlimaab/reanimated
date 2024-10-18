import React from "react";
import { Task } from "@/types/Task";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import { FontAwesome5 } from "@expo/vector-icons";

const TASK_HEIGHT = 70;

const { width } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -width * 0.3;

function taskContainerAnimation(
  height: SharedValue<number>,
  marginVertical: SharedValue<number>,
  opacity: SharedValue<number>
): DefaultStyle {
  "worklet";
  return {
    height: height.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value,
  };
}

function taskAnimation(translateX: SharedValue<number>): DefaultStyle {
  "worklet";
  return {
    transform: [{ translateX: translateX.value }],
  };
}

function iconAnimation(translateX: SharedValue<number>): DefaultStyle {
  "worklet";
  const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);

  return {
    opacity,
  };
}

type ListItemProps = Pick<PanGestureHandlerProps, "simultaneousHandlers"> & {
  task: Task;
  onDismiss: (task: Task) => void;
};

export const ListItem: React.FC<ListItemProps> = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const taskHeight = useSharedValue(TASK_HEIGHT);

  const rTaskContainerStyle = useAnimatedStyle(() =>
    taskContainerAnimation(taskHeight, marginVertical, opacity)
  );
  const rTaskStyle = useAnimatedStyle(() => taskAnimation(translateX));
  const rIconStyle = useAnimatedStyle(() => iconAnimation(translateX));

  return (
    <Animated.View style={[styles.container, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconStyle]}>
        <FontAwesome5 name="trash-alt" size={TASK_HEIGHT * 0.4} color="red" />
      </Animated.View>

      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={({ nativeEvent }) => {
          translateX.value = nativeEvent.translationX;
        }}
        onEnded={() => {
          const shouldBeDimissed = translateX.value < TRANSLATE_X_THRESHOLD;

          if (shouldBeDimissed) {
            translateX.value = withTiming(-width);
            taskHeight.value = withTiming(0);
            marginVertical.value = withTiming(0);
            opacity.value = withTiming(0, undefined, (isFinished) => {
              if (isFinished) runOnJS(onDismiss)(task);
            });
            return;
          }

          translateX.value = withTiming(0);
        }}
      >
        <Animated.View style={[styles.task, rTaskStyle]}>
          <Text style={styles.title}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: TASK_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 16,
  },
  iconContainer: {
    height: TASK_HEIGHT,
    width: TASK_HEIGHT,
    position: "absolute",
    right: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
