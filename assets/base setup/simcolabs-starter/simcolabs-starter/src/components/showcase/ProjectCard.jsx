import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-[24px] border border-[var(--border-subtle)] theme-surface-strong/5 p-6 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:theme-surface-strong/[0.07]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
          {project.status}
        </span>
        <span className="text-xs text-slate-400">{project.category}</span>
      </div>

      <h3 className="text-xl font-semibold theme-text-primary">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 theme-text-secondary">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs theme-text-secondary">
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-5 inline-flex text-sm text-cyan-300 no-underline hover:text-cyan-200"
      >
        Explore project →
      </Link>
    </article>
  );
}
