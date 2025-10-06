// src/App.jsx
import { useState } from "react";
import Header from "./components/Header.jsx";
import ListDashboard from "./components/ListDashboard.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

const STORAGE_KEY = "tasklists:v1";

function nextId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

export default function App() {
  const [lists, setLists] = useLocalStorage(STORAGE_KEY, () => []);

  const handleAddList = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setLists(prev => [...prev, { id: nextId(prev), title: trimmed, tasks: [] }]);
  };

  const handleDeleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <ListDashboard lists={lists} onAdd={handleAddList} onDelete={handleDeleteList} />
      </main>
    </div>
  );
}
