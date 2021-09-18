import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === "") return;
    const currentTask = tasks.filter((task) => task.title === newTaskTitle);
    if (currentTask.length === 1) {
      Alert.alert(
        "Task já Cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : { ...task }
    );

    setTasks(task);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover Item", "Tem certeza que deseja remover este item?", [
      {
        text: "Não",
        onPress: () => false,
      },
      {
        text: "Sim",
        onPress: () => {
          const tasksFilter = tasks.filter((task) => task.id !== id);
          setTasks(tasksFilter);
        },
      },
    ]);
  }

  function handleEditTask(id: number, newTitle: string) {
    const task = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : { ...task }
    );

    setTasks(task);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
