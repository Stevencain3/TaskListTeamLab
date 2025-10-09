import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import TaskList from "./TaskList.jsx";

export default function ListPage({ list, onBack, onAddTask, onToggleTask, onDeleteTask, onDeleteList }) {
  const [filter, setFilter] = useState("all"); // all | active (not done) | completed (done)

  if (!list) {
    return (
      <section>
        <p style={{ color: "#666" }}>List not found.</p>
        <button onClick={onBack}>Back</button>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>{list.title}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onBack}>Back</button>
          <button onClick={() => onDeleteList?.(list.id)}>Delete List</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <AddTaskForm onAdd={onAddTask} />
      </div>

      <div style={{ marginTop: 12 }}>
        <div role="tablist" aria-label="Task filters" style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            aria-pressed={filter === "active"}
            onClick={() => setFilter("active")}
          >
            Uncompleted
          </button>
          <button
            type="button"
            aria-pressed={filter === "completed"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <TaskList tasks={list.tasks || []} onToggle={onToggleTask} onDelete={onDeleteTask} filter={filter} />
      </div>
    </section>
  );
}
