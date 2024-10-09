// App.tsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

type Task = {
  id: number;
  name: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // Add a new task
  const addTask = () => {
    if (!taskName.trim()) {
      Alert.alert('Error', 'Please enter a task name.');
      return;
    }
    const newTask = {id: Date.now(), name: taskName};
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  // Edit an existing task
  const editTask = () => {
    if (!taskName.trim()) {
      Alert.alert('Error', 'Please enter a task name.');
      return;
    }
    setTasks(
      tasks.map(task =>
        task.id === editingTaskId ? {...task, name: taskName} : task,
      ),
    );
    setTaskName('');
    setEditingTaskId(null);
  };

  // Set a task for editing
  const startEditing = (task: Task) => {
    setTaskName(task.name);
    setEditingTaskId(task.id);
  };

  // Delete a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Render a task item
  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => startEditing(item)}
          style={styles.actionButton}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTask(item.id)}
          style={styles.actionButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button
        title={editingTaskId !== null ? 'Update Task' : 'Add Task'}
        onPress={editingTaskId !== null ? editTask : addTask}
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
  },
});
