
import useThemeMode from "../../hooks/useThemeMode";
export default function JoinLab() {
  const isNight = useThemeMode();
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <div className="rounded-[28px] border border-[var(--border-subtle)] theme-surface-strong/[0.04] p-8 backdrop-blur-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-sky-300/70">
          Join the Lab
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-text-primary md:text-4xl">
          Explore ideas, experiments and applied research.
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 theme-text-secondary">
          SimCo Labs is evolving as a space for structured experimentation across AI,
          systems thinking and emerging digital tools. The goal is not noise — it is
          useful exploration with real-world direction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:info@simcolabs.uk"
            className="rounded-full border border-sky-300/20 bg-sky-500/15 px-5 py-3 text-sm theme-text-primary transition hover:bg-sky-500/25"
          >
            Get in touch
          </a>
          <a
            href="/showcase"
            className="rounded-full border border-[var(--border-subtle)] theme-surface-strong/[0.05] px-5 py-3 text-sm text-slate-200 transition hover:theme-surface-strong/[0.08]"
          >
            View showcase
          </a>
        </div>
      </div>
    </section>
  );
}