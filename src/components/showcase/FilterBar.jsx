export default function FilterBar({
  categories,
  statuses,
  activeCategory,
  activeStatus,
  setActiveCategory,
  setActiveStatus,
}) {
  return (
    <div className="space-y-4 rounded-[24px] border border-[var(--border-subtle)] theme-surface-strong/[0.03] p-5 backdrop-blur-sm">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
          Filter by category
        </p>
        <div className="flex flex-wrap gap-3">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? "border-[var(--border-soft)] theme-chip theme-text-primary"
                  : "border-[var(--border-subtle)] theme-surface-strong/[0.04] theme-text-secondary hover:theme-surface-strong/[0.08]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
          Filter by status
        </p>
        <div className="flex flex-wrap gap-3">
          {["All", ...statuses].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeStatus === status
                  ? "border-[var(--border-soft)] theme-chip theme-text-primary"
                  : "border-[var(--border-subtle)] theme-surface-strong/[0.04] theme-text-secondary hover:theme-surface-strong/[0.08]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}