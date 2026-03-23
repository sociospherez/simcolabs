import { useMemo, useState } from "react";
import LabBackground from "../components/background/LabBakckground";
import SectionHeading from "../components/ui/SectionHeading";
import FilterBar from "../components/showcase/FilterBar";
import ProjectCard from "../components/showcase/ProjectCard";

import projects from "../content/projects";

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    []
  );

  const statuses = useMemo(
    () => [...new Set(projects.map((project) => project.status))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        activeCategory === "All" || project.category === activeCategory;
      const statusMatch =
        activeStatus === "All" || project.status === activeStatus;

      return categoryMatch && statusMatch;
    });
  }, [activeCategory, activeStatus]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b16]20 text-white">


      <section className="mx-auto max-w-6xl px-6 pb-10 pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Showcase"
          title="Experiments, MVPs and structured concepts."
          text="This space brings together active ideas across AI, systems thinking, civic innovation, SEND and decision-support tooling. Each project represents an experiment in clarity, usefulness and applied research."
        />

        <FilterBar
          categories={categories}
          statuses={statuses}
          activeCategory={activeCategory}
          activeStatus={activeStatus}
          setActiveCategory={setActiveCategory}
          setActiveStatus={setActiveStatus}
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 text-sm text-slate-400">
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <GlowingCards key={project.slug} project={project} />
          ))}
        </div>
      </section>
            <LabBackground />
    </div>
  );
}