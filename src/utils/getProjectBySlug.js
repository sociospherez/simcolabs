import projects from "../content/projects";

export default function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}