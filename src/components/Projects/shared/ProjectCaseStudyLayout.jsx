export default function ProjectCaseStudyLayout({
  children,
  eyebrow = "Case Study",
  title,
  intro,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_28%),radial-gradient(circle_at_85%_20%,_rgba(59,130,246,0.12),_transparent_22%),radial-gradient(circle_at_20%_80%,_rgba(14,165,233,0.08),_transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-8 lg:px-10">
        {(eyebrow || title || intro) && (
          <header className="mb-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
            )}
            {intro && (
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                {intro}
              </p>
            )}
          </header>
        )}

        <main className="space-y-8 md:space-y-10">{children}</main>
      </div>
    </div>
  );
}