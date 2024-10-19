import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export const CardClass: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
