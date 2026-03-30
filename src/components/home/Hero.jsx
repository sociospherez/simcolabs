import useThemeMode from "../../hooks/useThemeMode";

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
  const isNight = useThemeMode();

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-500 ${
              isNight
                ? "border-sky-300/15 theme-chip text-sky-100/80"
                : "border-sky-400/20 bg-sky-100/70 text-sky-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
            A research-driven innovation studio
          </div>

          <h1
            className={`mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl transition-colors duration-500 ${
              isNight ? "theme-text-primary" : "text-slate-900"
            }`}
          >
            Exploring better ways to model,
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              simulate and transform complex systems.
            </span>
          </h1>

          <p
            className={`mt-6 max-w-2xl text-lg leading-8 transition-colors duration-500 ${
              isNight ? "theme-text-secondary" : "theme-text-muted"
            }`}
          >
            SimCo Labs is a platform for experimentation across AI, systems thinking,
            simulation and applied innovation — designed to showcase ideas, tools and
            evolving MVPs with clarity rather than noise.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {Object.keys(topicNotes).map((topic) => (
              <span
                key={topic}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-500 ${
                  topic === defaultTopic
                    ? isNight
                      ? "border-[var(--border-soft)] theme-chip theme-text-primary"
                      : "border-sky-300/40 bg-sky-100 text-slate-900"
                    : isNight
                    ? "border-[var(--border-subtle)] theme-surface-strong/5 theme-text-secondary"
                    : "border-slate-300 theme-surface theme-text-muted"
                }`}
              >
                {topic}
              </span>
            ))}
          </div>

          <p
            className={`mt-5 max-w-xl text-sm leading-6 transition-colors duration-500 ${
              isNight ? "text-cyan-100/75" : "text-sky-700"
            }`}
          >
            {topicNotes[defaultTopic]}
          </p>
        </div>

        <div className="relative">
          <div
            className={`absolute inset-0 rounded-[32px] blur-3xl transition-colors duration-500 ${
              isNight ? "bg-sky-500/5" : "bg-sky-300/20"
            }`}
          />
          <div
            className={`relative rounded-[28px] border p-6 backdrop-blur-md transition-colors duration-500 ${
              isNight
                ? "border-[var(--border-subtle)] theme-card"
                : "border-[var(--border-subtle)] theme-surface shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <span
                className={`text-sm transition-colors duration-500 ${
                  isNight ? "theme-text-secondary" : "theme-text-muted"
                }`}
              >
                Research Themes
              </span>
              <span
                className={`text-xs uppercase tracking-[0.16em] transition-colors duration-500 ${
                  isNight ? "text-sky-300/75" : "text-sky-700"
                }`}
              >
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
                  className={`rounded-2xl border p-5 transition duration-300 ${
                    isNight
                      ? "border-[var(--border-subtle)] theme-card hover:border-sky-300/20 hover:theme-card"
                      : "border-[var(--border-subtle)] theme-surface hover:border-sky-300/40 hover:theme-surface-strong"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                    <h3
                      className={`text-lg font-medium transition-colors duration-500 ${
                        isNight ? "theme-text-primary" : "text-slate-900"
                      }`}
                    >
                      {title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-6 transition-colors duration-500 ${
                      isNight ? "text-slate-400" : "theme-text-muted"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}