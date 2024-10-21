import SlidingCounterComponent from "@/components/SlidingCounterComponent";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SlidingCounter() {
  return (
    <View style={styles.container}>
      <SlidingCounterComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
