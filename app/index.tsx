import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="01 - Introduction"
        onPress={() => {
          router.push("/introduction");
        }}
      />
      <Button
        title="02 - PanGestureHandler Basics"
        onPress={() => {
          router.push("/panGestureHandlerBasics");
        }}
      />
      <Button
        title="03 - Interpolate With ScrollView"
        onPress={() => {
          router.push("/interpolateWithScrollView");
        }}
      />
      <Button
        title="04 - Interpolate Colors"
        onPress={() => {
          router.push("/interpolateColors");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
