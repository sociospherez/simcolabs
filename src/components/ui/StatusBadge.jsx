const statusStyles = {
  Concept: "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-200",
  Prototype: "border-amber-300/20 bg-amber-400/10 text-amber-200",
  MVP: "border-sky-300/20 bg-sky-400/10 text-sky-200",
  Pilot: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
  Live: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
        statusStyles[status] ||
        "border-white/10 bg-white/5 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}