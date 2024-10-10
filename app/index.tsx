import { CardClass } from "@/components/CardClass";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CardClass
        title="01 - Introduction"
        onPress={() => {
          router.push("/introduction");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="02 - PanGestureHandler Basics"
        onPress={() => {
          router.push("/panGestureHandlerBasics");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="03 - Interpolate With ScrollView"
        onPress={() => {
          router.push("/interpolateWithScrollView");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="04 - Interpolate Colors"
        onPress={() => {
          router.push("/interpolateColors");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="05 - PinchGestureHandler Basics"
        onPress={() => {
          router.push("/pinchGestureHandlerBasics");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="06 - Animate Double Tap"
        onPress={() => {
          router.push("/animateDoubleTap");
        }}
      />
      <View style={styles.spacer} />
      <CardClass
        title="07 - Color Picker Animation"
        onPress={() => {
          router.push("/colorPickerAnimation");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 10,
  },
});
