import { Page } from "@/components/Page";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const WORDS = ["What's", "up", "mobile", "devs?"];

export default function InterpolateWithScrollView() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      style={styles.container}
      horizontal
      scrollEventThrottle={16}
      onScroll={scrollHandler}
    >
      {WORDS.map((word, index) => (
        <Page key={word} title={word} index={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
