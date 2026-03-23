import LabBackground from "../components/background/LabBakckground";

export default function Research() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/70">Research</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Themes in motion.</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          'Prompt quality and continuity',
          'Interpretation fingerprints and reasoning traces',
          'AI for SEND and case support',
          'Simulation for defence and civic security',
          'Communication intelligence and infographics',
          'Governance dashboards and decision visibility',
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
            {item}
          </div>
        ))}
      </div>
      <LabBackground />
    </section>
  );
}
