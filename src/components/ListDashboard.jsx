import React, { useMemo, useState } from "react";
import AddListForm from "./AddListForm.jsx";
import ListCard from "./ListCard.jsx";

export default function ListDashboard({ lists, onAdd, onDelete, onOpen }) {
  const [filter, setFilter] = useState("all"); // all | empty | hasTasks

  const counts = useMemo(() => {
    return {
      total: lists.length,
      empty: lists.filter(l => !(l.tasks && l.tasks.length)).length,
      hasTasks: lists.filter(l => l.tasks && l.tasks.length).length,
    };
  }, [lists]);

  let visible = lists;
  if (filter === "empty") visible = lists.filter(l => !(l.tasks && l.tasks.length));
  if (filter === "hasTasks") visible = lists.filter(l => l.tasks && l.tasks.length);

  return (
    <section>
      <AddListForm onAdd={onAdd} />
      <div style={{ margin: "12px 0" }}>
        <button onClick={() => setFilter("all")} aria-pressed={filter === "all"}>All ({counts.total})</button>
        <button onClick={() => setFilter("empty")} aria-pressed={filter === "empty"} style={{ marginLeft: 8 }}>Empty ({counts.empty})</button>
        <button onClick={() => setFilter("hasTasks")} aria-pressed={filter === "hasTasks"} style={{ marginLeft: 8 }}>With Tasks ({counts.hasTasks})</button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {visible.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>No lists yet. Add one above.</p>
        ) : (
          visible.map(l => (
            <ListCard key={l.id} list={l} onDelete={onDelete} onOpen = {onOpen} />
          ))
        )}
      </div>
    </section>
  );
}
