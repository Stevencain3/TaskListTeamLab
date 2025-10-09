import React, { useMemo, useState } from "react";
import AddListForm from "./AddListForm.jsx";
import ListCard from "./ListCard.jsx";


// ListDashboard is defined and exported
export default function ListDashboard({ lists, onAdd, onDelete, onOpen }) {
  // Filters what the lists contain, all, empty, and has tasks
  const [filter, setFilter] = useState("all");

  // Here we used a dependancy array, which only re-computes when a variable (the lists) changes
  // REF: https://devtrium.com/posts/dependency-arrays

  // useMemo to compute counts when the list changes
  const counts = useMemo(() => {
    return {
      // Total tasks
      total: lists.length,
      // Empty lists
      empty: lists.filter(l => !(l.tasks && l.tasks.length)).length,
      // Lists with tasks
      hasTasks: lists.filter(l => l.tasks && l.tasks.length).length,
    };
  }, [lists]); // Dependency array

  // Display all the lists
  let visible = lists;
  // Shows empty lists
  if (filter === "empty") visible = lists.filter(l => !(l.tasks && l.tasks.length));
  // Shows populated lists
  if (filter === "hasTasks") visible = lists.filter(l => l.tasks && l.tasks.length);

  // Returns the actual UI of the list dashboard
  return (
    <section>
      {/*  Calls "AddListForm" component to display the basic List page structure */}
      <AddListForm onAdd={onAdd} />
      {/* Calls the sorting buttons for the list */}
      <div style={{ margin: "12px 0" }}>
        <button onClick={() => setFilter("all")} aria-pressed={filter === "all"}>All ({counts.total})</button>
        <button onClick={() => setFilter("empty")} aria-pressed={filter === "empty"} style={{ marginLeft: 8 }}>Empty ({counts.empty})</button>
        <button onClick={() => setFilter("hasTasks")} aria-pressed={filter === "hasTasks"} style={{ marginLeft: 8 }}>With Tasks ({counts.hasTasks})</button>
      </div>

      {/* If there are no lists, then show a message, otherwise show the lists */}
      <div style={{ display: "grid", gap: 12 }}>
        {visible.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>No lists yet. Add one above.</p>
        ) : (
          visible.map(l => (
            <ListCard key={l.id} list={l} onDelete={onDelete} onOpen={onOpen} />
          ))
        )}
      </div>
    </section>
  );
}
