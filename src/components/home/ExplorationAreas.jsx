import SectionHeading from "../ui/SectionHeading";

const areas = [
  "AI reasoning systems",
  "Simulation & modelling",
  "Decision-support tools",
  "Civic innovation",
  "Communication intelligence",
  "Transformation frameworks",
];

export default function ExplorationAreas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Areas of Exploration"
        title="Themes that shape the lab."
        text="The lab spans applied AI, simulation, civic thinking and organisational experimentation — with each area treated as a system to be understood, tested and refined."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <div
            key={area}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-200 transition duration-300 hover:bg-white/[0.05] hover:border-sky-300/15"
          >
            {area}
          </div>
        ))}
      </div>
    </section>
  );
}