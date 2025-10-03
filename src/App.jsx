// src/App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "campusTasks:v1";

/* ---------- Robust localStorage hook ---------- */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) {
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn("Failed to read localStorage, using initialValue:", err);
    }
    // If initialValue is a function, call it (lazy init)
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("Failed to write localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}
/* ---------------------------------------------- */

function nextId(tasks) {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, () => [
    { id: 1, text: "Buy textbook", done: false },
    { id: 2, text: "Email advisor", done: true },
  ]);

  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  const handleAdd = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, { id: nextId(prev), text: trimmed, done: false }]);
  };

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  return (
    <div className="app-container">
      <Header />
      <AddTaskForm onAdd={handleAdd} />
      <p aria-live="polite" className="summary">
        {completed} of {total} completed
      </p>
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={tasks}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
