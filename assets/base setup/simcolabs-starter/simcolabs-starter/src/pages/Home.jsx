import Hero from '../components/home/Hero';
import ProjectGrid from '../components/showcase/ProjectGrid';
import projects from '../content/projects';


export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/70">Featured work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              MVPs, concepts and applied experiments.
            </h2>
          </div>
        </div>

        <ProjectGrid projects={featured} />
      </section>
    </>
  );
}
