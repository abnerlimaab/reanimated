import { Ripple } from "@/components/Ripple";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RippleEffect() {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => console.log("Tap")}>
        <Text style={styles.rippleText}>Tap</Text>
      </Ripple>
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
  ripple: {
    width: 200,
    height: 200,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    elevation: 10,
  },
  rippleText: {
    fontSize: 25,
  },
});
