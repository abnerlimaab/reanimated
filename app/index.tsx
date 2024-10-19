import { CardClass } from "@/components/CardClass";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { routes } from "./routes";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      data={Object.values(routes).filter((r) => r.name !== "index")}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <CardClass
          title={item.title}
          onPress={() => {
            router.push(item.path);
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.spacer} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 20,
  },
  spacer: {
    height: 10,
  },
});
