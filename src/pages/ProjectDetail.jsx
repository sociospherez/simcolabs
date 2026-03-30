import { Link, useParams } from "react-router-dom";
import getProjectBySlug from "../utils/getProjectBySlug";
import StatusBadge from "../components/ui/StatusBadge";
import projects from "../content/projects";
import LabBackground from "../components/background/LabBakckground";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="px-6 py-24 theme-text-primary">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="mt-4 theme-text-secondary">
            The page you are looking for does not exist or has not been created yet.
          </p>
          <Link
            to="/showcase"
            className="mt-6 inline-flex rounded-full border border-[var(--border-subtle)] theme-surface-strong/[0.05] px-5 py-3 text-sm text-slate-200 transition hover:theme-surface-strong/[0.08]"
          >
            Back to showcase
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.domain === project.domain)
    .slice(0, 3);

  return (
    <div className="px-6 pb-24 pt-24 md:pt-32">
      <section className="mx-auto max-w-6xl">
        <Link
          to="/showcase"
          className="inline-flex rounded-full border border-[var(--border-subtle)] theme-surface-strong/[0.05] px-4 py-2 text-sm theme-text-secondary transition hover:theme-surface-strong/[0.08]"
        >
          ← Back to showcase
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                {project.category}
              </span>
              <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs uppercase tracking-[0.14em] theme-text-muted">
                {project.domain}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight theme-text-primary md:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 theme-text-secondary">
              {project.summary}
            </p>
          </div>

          <aside className="rounded-[28px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Project Snapshot
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--border-subtle)] theme-surface-strong/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] theme-text-muted">
                  Status
                </p>
                <p className="mt-2 theme-text-primary">{project.status}</p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] theme-surface-strong/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] theme-text-muted">
                  Maturity
                </p>
                <p className="mt-2 theme-text-primary">{project.maturity || project.status}</p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] theme-surface-strong/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] theme-text-muted">
                  Domain
                </p>
                <p className="mt-2 theme-text-primary">{project.domain}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[26px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Problem
            </p>
            <p className="leading-7 theme-text-secondary">{project.problem}</p>
          </div>

          <div className="rounded-[26px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Approach
            </p>
            <p className="leading-7 theme-text-secondary">{project.approach}</p>
          </div>

          <div className="rounded-[26px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Potential Impact
            </p>
            <p className="leading-7 theme-text-secondary">{project.impact}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[26px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Tags
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm theme-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-[var(--border-subtle)] theme-card p-6 backdrop-blur-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Next Steps
            </p>
            <div className="space-y-3">
              {project.nextSteps?.map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-[var(--border-subtle)] theme-surface-strong/[0.03] px-4 py-3 text-sm theme-text-secondary"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="mx-auto mt-14 max-w-6xl">
          <div className="rounded-[28px] border border-[var(--border-subtle)] bg-slate-950/50 p-6 backdrop-blur-sm md:p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Related Projects
            </p>
            <h2 className="text-2xl font-semibold tracking-tight theme-text-primary">
              More from this domain
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="rounded-[22px] border border-[var(--border-subtle)] theme-surface-strong/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:theme-surface-strong/[0.05]"
                >
                  <p className="text-xs uppercase tracking-[0.14em] theme-text-muted">
                    {item.status}
                  </p>
                  <h3 className="mt-3 text-lg font-medium theme-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 theme-text-secondary">
                    {item.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <LabBackground />
        </section>
      )}
    </div>
  );
}