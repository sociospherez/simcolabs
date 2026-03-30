import ProjectGrid from '../components/showcase/ProjectGrid';
import projects from '../content/projects';

export default function Showcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/70">Showcase</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight theme-text-primary">Innovation catalogue</h1>
      <p className="mt-4 max-w-3xl theme-text-secondary">
        A structured view of current MVPs, prototypes and concept tracks across AI, simulation,
        civic security, communication and governance.
      </p>

      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
