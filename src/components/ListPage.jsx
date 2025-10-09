import AddTaskForm from "./AddTaskForm.jsx";
import TaskList from "./TaskList.jsx";

export default function ListPage({ list, onBack, onAddTask, onToggleTask, onDeleteTask, onDeleteList }) {
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
        <TaskList tasks={list.tasks || []} onToggle={onToggleTask} onDelete={onDeleteTask} />
      </div>
    </section>
  );
}
