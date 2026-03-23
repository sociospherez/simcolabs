export default function Contact() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/70">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Let’s shape the lab properly.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
        This page is intentionally simple for now. Replace the placeholder details with your real
        contact channels, collaboration pathways and external profile links.
      </p>
      <a href="mailto:info@simcolabs.uk" className="mt-8 inline-flex rounded-full border border-cyan-300/20 bg-blue-500/20 px-5 py-3 text-white no-underline">
        info@simcolabs.uk
      </a>

    </section>
  );
}
