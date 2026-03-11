const topicNotes = {
  "AI-assisted modelling":
    "Using AI to support structured insight, pattern recognition and scenario exploration.",
  "Scenario simulation":
    "Testing possibilities before committing time, budget and momentum in the real world.",
  "Systems intelligence":
    "Understanding relationships, signals and dependencies across complex environments.",
  "Innovation frameworks":
    "Turning experiments into repeatable, practical models rather than decorative chaos.",
};

export default function Hero() {
  const defaultTopic = "AI-assisted modelling";

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/10 px-4 py-2 text-sm text-sky-100/80">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
            A research-driven innovation studio
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Exploring better ways to model,
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              simulate and transform complex systems.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            SimCo Labs is a platform for experimentation across AI, systems thinking,
            simulation and applied innovation — designed to showcase ideas, tools and
            evolving MVPs with clarity rather than noise.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {Object.keys(topicNotes).map((topic) => (
              <span
                key={topic}
                className={`rounded-full border px-4 py-2 text-sm ${
                  topic === defaultTopic
                    ? "border-sky-300/30 bg-sky-400/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                {topic}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-cyan-100/75">
            {topicNotes[defaultTopic]}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-sky-500/5 blur-3xl" />
          <div className="relative rounded-[28px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-slate-300">Research Themes</span>
              <span className="text-xs uppercase tracking-[0.16em] text-sky-300/75">
                Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                [
                  "Simulation",
                  "Testing ideas before implementation through models, scenarios and structured experimentation.",
                ],
                [
                  "Collaboration",
                  "Combining strategy, technical context and social thinking into shared problem-solving.",
                ],
                [
                  "Innovation",
                  "Exploring practical use of AI, automation and new workflows in evolving environments.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition duration-300 hover:border-sky-300/20 hover:bg-slate-900/80"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}