// src/components/ListCard.jsx

export default function ListCard({ list, onDelete, onOpen }) {
  // Stateless/presentational component - actions go to parent handlers

  return (
    <div className="list-card" style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>
        {/* Title button: clickable for going into each list */}
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            font: "inherit",
            textAlign: "left",
            cursor: "pointer",
            color: "inherit",
          }}
          aria-label={`Open ${list.title}`}
          onClick={() => onOpen?.(list.id)} // Call onOpen handler from props
        >
          {list.title}
        </button>
      </h3>
      <p style={{ margin: 0, color: "#555" }}>{(list.tasks || []).length} tasks</p>
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        {/* Delete: deletes at the parent level */}
        <button onClick={() => onDelete?.(list.id)} aria-label={`Delete ${list.title}`}>
          Delete
        </button>
      </div>
    </div>
  );
}
