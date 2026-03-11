import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import getProjectBySlug from '../utils/getProjectBySlug';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  if (!project) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-semibold text-white">Project not found</h1>
        <p className="mt-4 text-slate-300">That project slug does not exist in the content layer yet.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-200">
          {project.status}
        </span>
        <span className="text-sm text-slate-400">{project.category}</span>
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{project.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.summary}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Problem</h2>
          <p className="mt-4 text-slate-300">{project.problem}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Approach</h2>
          <p className="mt-4 text-slate-300">{project.approach}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Next steps</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          {project.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
