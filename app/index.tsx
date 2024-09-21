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
