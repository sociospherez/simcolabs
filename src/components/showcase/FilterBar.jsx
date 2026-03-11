export default function FilterBar({
  categories,
  statuses,
  activeCategory,
  activeStatus,
  setActiveCategory,
  setActiveStatus,
}) {
  return (
    <div className="space-y-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
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
                  ? "border-sky-300/30 bg-sky-400/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
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
                  ? "border-sky-300/30 bg-sky-400/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
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