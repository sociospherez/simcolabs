export default function TransformationBrief() {
  return (
    <div className="min-h-screen text-white pt-24">

      {/* HERO */}
      <section className="px-6 md:px-10 lg:px-16 py-20 flex items-center min-h-[80vh]">
        <div className="mx-auto max-w-6xl w-full">

          <div className="rounded-[28px] border border-white/10 bg-slate-950/55 backdrop-blur-md p-10 shadow-2xl">

            <p className="text-sky-300 text-sm uppercase tracking-widest mb-4">
              Transformation Brief
            </p>

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              From Legacy Strength to{" "}
              <span className="text-sky-300">Future Scale</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              Repositioning telecom CRM into a scalable, API-first platform ecosystem.
            </p>

          </div>

        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-16 pb-16">
  <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm">
      <p className="text-sky-300 text-xs uppercase tracking-[0.2em] mb-3">Current State</p>
      <h3 className="text-2xl font-semibold mb-3">A valuable telecom CRM foundation</h3>
      <p className="text-slate-300 leading-7">
        The current proposition appears rooted in legacy telecom delivery models,
        bespoke implementation, and product-centric thinking.
      </p>
    </div>

    <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm">
      <p className="text-sky-300 text-xs uppercase tracking-[0.2em] mb-3">Market Reality</p>
      <h3 className="text-2xl font-semibold mb-3">The market now buys platforms</h3>
      <p className="text-slate-300 leading-7">
        Buyers increasingly expect SaaS, modularity, integrations, analytics,
        and faster time to value rather than closed standalone products.
      </p>
    </div>

    <div className="rounded-[24px] border border-rose-400/20 bg-rose-950/10 p-6 backdrop-blur-sm">
      <p className="text-rose-300 text-xs uppercase tracking-[0.2em] mb-3">Core Problem</p>
      <h3 className="text-2xl font-semibold mb-3">Not capability — positioning</h3>
      <p className="text-slate-300 leading-7">
        The challenge is less about whether the product works and more about whether
        it is packaged, architected, and presented in a way the modern market wants.
      </p>
    </div>

    <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-950/10 p-6 backdrop-blur-sm">
      <p className="text-emerald-300 text-xs uppercase tracking-[0.2em] mb-3">Strategic Opportunity</p>
      <h3 className="text-2xl font-semibold mb-3">Evolve legacy strength into platform value</h3>
      <p className="text-slate-300 leading-7">
        The real opportunity is to transform domain expertise into a reusable,
        API-first, ecosystem-ready platform model without discarding core strengths.
      </p>
    </div>

  </div>
</section>

    </div>
  );
}