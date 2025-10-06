// Logic copied from "AddTaskForm.jsx", logic is largely unchanged

import { useState } from "react";

export default function AddListForm({ onAdd }) {
  const [text, setText] = useState("");
  const trimmed = text.trim();
  const isValid = trimmed.length >= 3; // at least 3 non-space chars

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAdd?.(trimmed);
    setText("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <label htmlFor="list" className="sr-only">New List</label>
      <input
        id="list"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., Grocery List"
        aria-label="New List"
        aria-invalid={!isValid && trimmed.length > 0}
      />

      <button type="submit" disabled={!isValid} title="Enter at least 3 characters">
        Add List
      </button>
    </form>
  );
}
