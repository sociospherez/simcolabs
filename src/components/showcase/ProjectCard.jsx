import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block rounded-[24px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:bg-slate-900/70"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sky-200/80">
          {project.status}
        </span>
        <span className="text-xs text-slate-400">{project.category}</span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-white">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 text-sm text-sky-300 transition duration-300 group-hover:text-cyan-200">
        View project →
      </div>
    </Link>
  );
}