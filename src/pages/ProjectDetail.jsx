import { Link, useParams } from "react-router-dom";
import LabBackground from "../components/background/LabBakckground";
import getProjectBySlug from "../utils/getProjectBySlug";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050b16] px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="mt-4 text-slate-300">
            The page you are looking for does not exist or has not been created yet.
          </p>
          <Link
            to="/showcase"
            className="mt-6 inline-block rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
          >
            Back to showcase
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b16]/90 text-white">
      <LabBackground />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 md:pt-32">
        <Link
          to="/showcase"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08]"
        >
          ← Back to showcase
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sky-200/80">
            {project.status}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
            {project.domain}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {project.summary}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
            Problem
          </p>
          <p className="text-slate-300 leading-7">{project.problem}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
            Approach
          </p>
          <p className="text-slate-300 leading-7">{project.approach}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm md:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sky-300/70">
            Potential impact
          </p>
          <p className="text-slate-300 leading-7">{project.impact}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm md:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
            Tags
          </p>
          <div className="flex flex-wrap gap-3">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}