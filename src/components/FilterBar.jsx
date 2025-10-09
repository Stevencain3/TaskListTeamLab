// Grabbed from "ClassEx2" and completly unchanged

export default function FilterBar({ filter, onChange }) {
  const opts = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <nav className="filterbar" aria-label="Task filters">
      {opts.map(o => (
        <button
          key={o.id}
          className="btn neutral filter-btn"
          onClick={() => onChange?.(o.id)}
          aria-pressed={filter === o.id}
        >
          {o.label}
        </button>
      ))}
    </nav>
  );
}
