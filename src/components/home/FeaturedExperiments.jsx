import SectionHeading from "../ui/SectionHeading";
import projects from "../../content/projects";
import useThemeMode from "../../hooks/useThemeMode";
export default function FeaturedExperiments() {
  const featured = projects.slice(0, 6);
  const isNight = useThemeMode();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Current Experiments"
        title="A focused set of MVPs and exploratory tools."
        text="These projects represent the first visible layer of the lab — early frameworks, evaluation tools and experimental systems designed to test ideas before they scale."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project) => (
          <article
            key={project.slug}
            className="theme-card group rounded-[24px] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="theme-chip rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
                {project.status}
              </span>
              <span className="theme-text-secondary text-xs">{project.category}</span>
            </div>

            <h3 className="theme-text-primary text-xl font-semibold tracking-tight">
              {project.title}
            </h3>

            <p className="theme-text-secondary mt-3 text-sm leading-7">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="theme-pill rounded-full px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}