import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
