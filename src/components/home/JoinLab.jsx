export default function JoinLab() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-sky-300/70">
          Join the Lab
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Explore ideas, experiments and applied research.
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          SimCo Labs is evolving as a space for structured experimentation across AI,
          systems thinking and emerging digital tools. The goal is not noise — it is
          useful exploration with real-world direction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:info@simcolabs.uk"
            className="rounded-full border border-sky-300/20 bg-sky-500/15 px-5 py-3 text-sm text-white transition hover:bg-sky-500/25"
          >
            Get in touch
          </a>
          <a
            href="/showcase"
            className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
          >
            View showcase
          </a>
        </div>
      </div>
    </section>
  );
}