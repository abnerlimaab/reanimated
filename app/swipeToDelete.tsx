import { ListItem } from "@/components/ListItem";
import { Task } from "@/types/Task";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const TITLES = [
  "Record the dimissible tutorial",
  "Leave like to the video",
  "Check comments",
  "Subscribe to the channel",
  "Favorite the Github repo",
];

const TASKS: Task[] = TITLES.map((title, index) => ({
  title,
  index,
}));

const BACKGROUND_COLOR = "#FAFBFF";

export default function SwipeToDelete() {
  const scrollRef = useRef<ScrollView>(null);
  const [tasks, setTasks] = useState(TASKS);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Tasks</Text>

      <ScrollView ref={scrollRef} style={[styles.tasksContainer]}>
        {tasks.map((task) => (
          <ListItem
            key={task.index}
            simultaneousHandlers={scrollRef}
            task={task}
            onDismiss={() =>
              setTasks(tasks.filter((t) => t.index !== task.index))
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
  tasksContainer: {
    flex: 1,
  },
});
