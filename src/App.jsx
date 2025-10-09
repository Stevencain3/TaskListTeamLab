// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ListDashboard from "./components/ListDashboard.jsx";
import ListPage from "./components/ListPage.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

const STORAGE_KEY = "tasklists:v1";

function nextId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

function parseLocationHash() {
  // expected hashes: "" or "#/" or "#/lists/:id"
  const hash = (window.location.hash || "").replace(/^#/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "lists" && parts[1]) {
    const id = Number(parts[1]);
    return { page: "list", id: Number.isFinite(id) ? id : null };
  }
  return { page: "dashboard" };
}

export default function App() {
  const [lists, setLists] = useLocalStorage(STORAGE_KEY, () => []);
  const [route, setRoute] = useState(() => parseLocationHash());

  useEffect(() => {
    const onHash = () => setRoute(parseLocationHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleAddList = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setLists(prev => [...prev, { id: nextId(prev), title: trimmed, tasks: [] }]);
  };

  const handleDeleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
    // if currently viewing the deleted list, navigate back to dashboard
    if (route.page === "list" && route.id === id) {
      window.location.hash = "#/";
    }
  };

  // Task handlers operate by list id
  const handleAddTask = (listId, text) => {
    setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: [...(l.tasks || []), { id: nextId(l.tasks || []), text, done: false }] } : l));
  };

  const handleToggleTask = (listId, taskId) => {
    setLists(prev => prev.map(l => {
      if (l.id !== listId) return l;
      return { ...l, tasks: (l.tasks || []).map(t => t.id === taskId ? { ...t, done: !t.done } : t) };
    }));
  };

  const handleDeleteTask = (listId, taskId) => {
    setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: (l.tasks || []).filter(t => t.id !== taskId) } : l));
  };

  const currentList = useMemo(() => {
    if (route.page === "list" && route.id != null) return lists.find(l => l.id === route.id) || null;
    return null;
  }, [route, lists]);

  const openList = (id) => {
    window.location.hash = `#/lists/${id}`;
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        {route.page === "dashboard" ? (
          <ListDashboard lists={lists} onAdd={handleAddList} onDelete={handleDeleteList} onOpen={openList} />
        ) : (
          <ListPage
            list={currentList}
            onBack={() => (window.location.hash = "#/")}
            onAddTask={(text) => handleAddTask(route.id, text)}
            onToggleTask={(taskId) => handleToggleTask(route.id, taskId)}
            onDeleteTask={(taskId) => handleDeleteTask(route.id, taskId)}
            onDeleteList={handleDeleteList}
          />
        )}
      </main>
    </div>
  );
}
