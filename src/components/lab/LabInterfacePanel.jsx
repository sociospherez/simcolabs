import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import projects from "../../content/projects";

const exampleInputs = [
  "I want to improve supplier evaluation in a small organisation.",
  "How could AI support SEND planning and communication?",
  "I need a way to assess prompt quality and continuity.",
  "Can simulation support civic warning systems?",
];

export default function LabInterfacePanel() {
  const location = useLocation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const launchContext = useMemo(() => {
    if (location.state?.sourceLabel) return location.state.sourceLabel;
    if (location.pathname === "/lab-interface") return "Lab Interface";
    return "SimCo Labs";
  }, [location]);

  const analyseIdea = () => {
    const text = input.trim().toLowerCase();
    if (!text) return;

    let domain = "General Innovation";
    let interpretation =
      "This idea appears to relate to structured innovation, experimentation or systems thinking.";
    let suggestions = [
      "Clarify the primary problem being solved",
      "Define likely stakeholders or users",
      "Map the idea to a testable MVP or experimental framework",
    ];
    let related = projects.slice(0, 2);

    if (
      text.includes("supplier") ||
      text.includes("procurement") ||
      text.includes("vendor")
    ) {
      domain = "Procurement / Governance";
      interpretation =
        "This looks like a procurement or supplier decision-support challenge.";
      suggestions = [
        "Introduce weighted evaluation criteria",
        "Add a risk-aware scoring structure",
        "Compare suppliers through a structured dashboard view",
      ];
      related = projects.filter(
        (p) =>
          p.slug.includes("supplier") ||
          p.category.toLowerCase().includes("procurement")
      );
    } else if (
      text.includes("send") ||
      text.includes("education") ||
      text.includes("ehcp") ||
      text.includes("school")
    ) {
      domain = "SEND / Education";
      interpretation =
        "This appears related to education support, SEND workflows or structured communication needs.";
      suggestions = [
        "Explore drafting and summarisation support",
        "Map communication pathways between stakeholders",
        "Prototype a structured planning assistant",
      ];
      related = projects.filter(
        (p) =>
          p.slug.includes("send") ||
          p.domain.toLowerCase().includes("send") ||
          p.category.toLowerCase().includes("education")
      );
    } else if (
      text.includes("prompt") ||
      text.includes("llm") ||
      text.includes("ai") ||
      text.includes("reasoning")
    ) {
      domain = "AI Systems / Prompt Intelligence";
      interpretation =
        "This idea appears to focus on prompt quality, reasoning behaviour or AI-assisted analysis.";
      suggestions = [
        "Define scoring dimensions for quality and continuity",
        "Visualise interpretation or reasoning patterns",
        "Compare prompt variants to understand structural impact",
      ];
      related = projects.filter(
        (p) =>
          p.slug.includes("prompt") ||
          p.domain.toLowerCase().includes("ai") ||
          p.category.toLowerCase().includes("ai")
      );
    } else if (
      text.includes("warning") ||
      text.includes("security") ||
      text.includes("civic") ||
      text.includes("simulate") ||
      text.includes("simulation")
    ) {
      domain = "Civic / Simulation";
      interpretation =
        "This reads like a simulation or early-warning concept tied to public-interest systems.";
      suggestions = [
        "Map the relevant signals and triggers",
        "Define a simulation model for scenario testing",
        "Explore how warnings could be visualised or prioritised",
      ];
      related = projects.filter(
        (p) =>
          p.slug.includes("predict") ||
          p.slug.includes("simulate") ||
          p.domain.toLowerCase().includes("civic")
      );
    }

    setResult({
      domain,
      interpretation,
      suggestions,
      related,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md md:p-7">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/70">
              Interactive Console
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Lab Interface
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-200 shadow-[0_0_24px_rgba(59,130,246,0.10)]">
            <div className="h-3.5 w-3.5 rotate-45 bg-gradient-to-br from-cyan-300 to-sky-500 shadow-[0_0_14px_rgba(103,232,249,0.5)]" />
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
          Launch context: <span className="text-slate-200">{launchContext}</span>
        </div>

        <label className="mb-3 block text-xs uppercase tracking-[0.18em] text-sky-300/70">
          Describe an idea
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe an idea, challenge or area of interest..."
          className="min-h-[150px] w-full rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/25 focus:bg-black/30"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={analyseIdea}
            className="rounded-full border border-sky-300/20 bg-sky-500/12 px-5 py-2.5 text-sm text-white transition hover:bg-sky-500/20"
          >
            Analyse idea
          </button>

          <button
            onClick={() =>
              setInput(
                exampleInputs[Math.floor(Math.random() * exampleInputs.length)]
              )
            }
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-200 transition hover:bg-white/[0.08]"
          >
            Try an example
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-sky-300/70">
                Detected Domain
              </p>
              <p className="text-lg font-medium text-white">{result.domain}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-sky-300/70">
                Interpretation
              </p>
              <p className="leading-7 text-slate-300">{result.interpretation}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-sky-300/70">
                Suggested Direction
              </p>

              <div className="space-y-3">
                {result.suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-300"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-sky-300/70">
                Related Experiments
              </p>

              <div className="space-y-3">
                {result.related.length > 0 ? (
                  result.related.slice(0, 3).map((project) => (
                    <Link
                      key={project.slug}
                      to={`/projects/${project.slug}`}
                      className="block rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-4 transition hover:border-sky-300/20 hover:bg-slate-900/70"
                    >
                      <div className="text-sm font-medium text-white">
                        {project.title}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {project.category} • {project.status}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-400">
                    No closely related experiment surfaced yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}