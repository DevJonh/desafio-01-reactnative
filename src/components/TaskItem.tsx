import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";

import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [editable, setEditable] = useState(false);
  const [valueEditable, setValueEditable] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditable(true);
  }

  function handleCancelEditing() {
    setValueEditable(task.title);
    setEditable(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, valueEditable);
    setEditable(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editable) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editable]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={valueEditable}
            editable={editable}
            onChangeText={setValueEditable}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {!editable ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleStartEditing}
          >
            <Icon name="edit-3" size={20} color="#929292" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={20} color="#929292" />
          </TouchableOpacity>
        )}

        <View style={styles.isDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          disabled={editable}
        >
          <Icon
            name="trash-2"
            size={20}
            color={editable ? "#92929233" : "#929292"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
  },
  taskButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  isDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: "#C4C4C4",
  },
});
