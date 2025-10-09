import AddTaskForm from "./AddTaskForm.jsx";
import TaskList from "./TaskList.jsx";

export default function ListPage({ list, onBack, onAddTask, onToggleTask, onDeleteTask, onDeleteList }) {
  // Show a message if the list is not found
  if (!list) {
    return (
      <section>
        {/* Fallback: list not found */}
        <p style={{ color: "#666" }}>List not found.</p>
        <button onClick={onBack}>Back</button>
      </section>
    );
  }

  return (
    <section>
      {/* Header: title and actions (Back, Delete). Parent persists changes. */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>{list.title}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onBack}>Back</button>
          <button onClick={() => onDeleteList?.(list.id)}>Delete List</button>
        </div>
      </div>

      {/* AddTaskForm: input + validation for adding tasks */}
      <div style={{ marginTop: 12 }}>
        <AddTaskForm onAdd={onAddTask} />
      </div>

      {/* TaskList: shows tasks, allows toggling and deleting. Parent persists changes. */}
      <div style={{ marginTop: 12 }}>
        <TaskList tasks={list.tasks || []} onToggle={onToggleTask} onDelete={onDeleteTask} />
      </div>
    </section>
  );
}
