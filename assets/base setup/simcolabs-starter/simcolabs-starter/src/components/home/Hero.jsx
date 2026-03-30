import { useState } from 'react';

const pills = [
  {
    label: 'AI-assisted modelling',
    note: 'Using AI to support structured insight, pattern recognition and scenario exploration.',
  },
  {
    label: 'Digital transformation',
    note: 'Turning operational complexity into clearer pathways for change and scale.',
  },
  {
    label: 'Scenario simulation',
    note: 'Testing possibilities before committing time, budget and momentum in the real world.',
  },
  {
    label: 'Innovation frameworks',
    note: 'Shaping experimentation into repeatable models rather than exciting chaos in a fancy blazer.',
  },
];

export default function Hero() {
  const [active, setActive] = useState(pills[0]);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/10 px-4 py-2 text-sm text-blue-100/80 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
          A research-driven innovation studio
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight theme-text-primary md:text-6xl">
          Exploring better ways to model,
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            simulate and transform complex systems.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 theme-text-secondary">
          SimCo Labs is a showcase platform for applied experimentation across AI, simulation,
          communication, governance and transformation.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {pills.map((pill) => {
            const isActive = active.label === pill.label;
            return (
              <button
                key={pill.label}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? 'border-cyan-300/35 bg-blue-400/15 theme-text-primary shadow-[0_0_24px_rgba(56,189,248,0.14)]'
                    : 'border-[var(--border-subtle)] theme-surface-strong/5 theme-text-secondary hover:theme-surface-strong/10'
                }`}
                onMouseEnter={() => setActive(pill)}
                onFocus={() => setActive(pill)}
                onClick={() => setActive(pill)}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <p className="mt-4 min-h-6 text-sm text-cyan-100/80">{active.note}</p>
      </div>

      <div className="rounded-[28px] border border-[var(--border-subtle)] theme-surface-strong/5 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between text-sm theme-text-secondary">
          <span>Research Themes</span>
          <span className="text-xs uppercase tracking-[0.16em] text-cyan-300/70">Live direction</span>
        </div>

        {[
          ['Simulation', 'Testing ideas before implementation through models, scenarios and structured experimentation.'],
          ['Collaboration', 'Combining strategy, business context and technical thinking into shared problem-solving.'],
          ['Innovation', 'Exploring practical use of AI, automation and new workflows in evolving digital environments.'],
        ].map(([title, text]) => (
          <div key={title} className="mb-3 rounded-2xl border border-[var(--border-subtle)] bg-[#081223]/80 p-5 last:mb-0 hover:border-cyan-300/25 hover:bg-[#0b1730]/90">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              <h3 className="text-lg font-medium theme-text-primary">{title}</h3>
            </div>
            <p className="text-sm leading-6 text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
