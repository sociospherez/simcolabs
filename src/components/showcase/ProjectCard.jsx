import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-[26px] border border-slate-200/70 bg-white/20 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-300/60 hover:bg-white dark:border-white/10 dark:bg-slate-950/55 dark:shadow-none dark:hover:border-sky-300/20 dark:hover:bg-slate-900/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent opacity-70 dark:via-sky-300/40 dark:opacity-60" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/60 blur-2xl transition duration-500 group-hover:bg-blue-100/80 dark:bg-sky-400/8 dark:group-hover:bg-sky-400/12" />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <StatusBadge status={project.status} />
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200/80 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                {project.category}
              </span>
              <span className="rounded-full border border-slate-200/80 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-400 dark:border-white/10 dark:text-slate-500">
                {project.domain}
              </span>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200/70 bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-105 group-hover:border-blue-300 dark:border-sky-300/15 dark:bg-sky-400/10 dark:text-sky-200 dark:group-hover:border-sky-300/25">
            <div className="h-3 w-3 rotate-45 bg-blue-500 dark:bg-gradient-to-br dark:from-cyan-300 dark:to-sky-500 dark:shadow-[0_0_14px_rgba(103,232,249,0.45)]" />
          </div>
        </div>

        <h3 className="max-w-[18rem] text-xl font-semibold leading-tight tracking-tight text-slate-900 transition duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-sky-100">
          {project.title}
        </h3>

        <p className="mt-4 min-h-[88px] text-sm leading-7 text-slate-600 dark:text-slate-300">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-slate-500 transition duration-300 group-hover:text-slate-700 dark:border-white/10 dark:text-slate-400 dark:group-hover:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-white/8">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {project.maturity || project.status}
          </span>
          <span className="text-sm font-medium text-blue-600 transition duration-300 group-hover:text-blue-700 dark:text-sky-300 dark:group-hover:text-cyan-200">
            Explore project →
          </span>
        </div>
      </div>
    </Link>
  );
}