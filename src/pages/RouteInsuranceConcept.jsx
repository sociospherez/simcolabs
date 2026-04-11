export default function RouteInsuranceConcept() {
  return (
    <div className="min-h-screen text-white pt-24">

      {/* HERO */}
      <section className="px-6 md:px-10 lg:px-16 py-20 flex items-center min-h-[80vh]">
        <div className="mx-auto max-w-6xl w-full">

          <div className="rounded-[28px] border border-white/10 bg-slate-950/55 backdrop-blur-md p-10 shadow-2xl">

            <p className="text-sky-300 text-sm uppercase tracking-widest mb-4">
              Simcolabs Concept
            </p>

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Insurance that thinks in{" "}
              <span className="text-sky-300">journeys</span>, not hours
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              A smarter layer that calculates and activates temporary cover
              based on your route — not guesswork.
            </p>

          </div>

        </div>
      </section>

      {/* PROBLEM + SOLUTION */}
      <section className="px-6 md:px-10 lg:px-16 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm">
            <p className="text-rose-300 text-xs uppercase tracking-[0.2em] mb-3">
              Problem
            </p>
            <h3 className="text-2xl font-semibold mb-3">
              Insurance is bought through guesswork
            </h3>
            <p className="text-slate-300 leading-7">
              Users must estimate how long they need cover, often overpaying
              or risking under-insuring their journey.
            </p>
          </div>

          <div className="rounded-[24px] border border-sky-300/20 bg-sky-950/10 p-6 backdrop-blur-sm">
            <p className="text-sky-300 text-xs uppercase tracking-[0.2em] mb-3">
              Solution
            </p>
            <h3 className="text-2xl font-semibold mb-3">
              Route-aware insurance experience
            </h3>
            <p className="text-slate-300 leading-7">
              The system calculates journey time, adds buffers, and selects
              the optimal temporary insurance automatically.
            </p>
          </div>

        </div>
      </section>

      {/* JOURNEY CARD */}
      <section className="px-6 md:px-10 lg:px-16 pb-16">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-[28px] border border-white/10 bg-slate-950/55 backdrop-blur-md p-8">

            <p className="text-slate-400 text-sm uppercase tracking-[0.2em] mb-4">
              Example Journey
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">From</p>
                <p className="text-lg font-medium">Oxford</p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">To</p>
                <p className="text-lg font-medium">Liverpool Street, London</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-sky-400/10 p-6 border border-sky-300/20">
              <p className="text-sky-300 text-sm uppercase tracking-[0.2em]">
                Smart Estimate
              </p>
              <p className="text-3xl font-semibold mt-2">3h 30m</p>
              <p className="text-sm text-slate-300 mt-2">
                Includes traffic + safety buffer
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-slate-400 text-sm">Recommended</p>
                <p className="text-xl font-semibold mt-1">4 Hours</p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-slate-400 text-sm">Why</p>
                <p className="mt-1">Enough cover without waste</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FLOW */}
      <section className="px-6 md:px-10 lg:px-16 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">

          {[
            "Route Input",
            "Smart Calculation",
            "Policy Selection",
            "Live Coverage"
          ].map((step) => (
            <div
              key={step}
              className="rounded-[24px] border border-white/10 bg-slate-950/45 p-6"
            >
              <p className="text-sky-300 text-sm mb-2">{step}</p>
              <p className="text-slate-300 text-sm">
                Simple front-end experience powered by intelligent backend logic.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* FINAL */}
      <section className="px-6 md:px-10 lg:px-16 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-[28px] border border-white/10 bg-slate-950/55 p-10 text-center">

            <h3 className="text-3xl md:text-5xl font-semibold leading-tight">
              Insurance shouldn’t be a decision.
              <br />
              <span className="text-sky-300">It should be an outcome.</span>
            </h3>

          </div>

        </div>
      </section>

    </div>
  );
}