// Grabbed from "ClassEx2" and completly unchanged

import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete, filter = "all" }) {
  let visible = tasks;
  if (filter === "active") visible = tasks.filter(t => !t.done);
  if (filter === "completed") visible = tasks.filter(t => t.done);
  //add code 333333 class changes
  if(visible.length === 0){
    //Empty state UI add
    return (
      <p role="status" style={{color: "#666", fontStyle: "italic", marginTop: "0.5rem"}}>
        No TaskList
      </p>
    );
    //end 3333 add
  }

  return (
    <ul>
      {visible.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
