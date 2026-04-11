import { useEffect, useMemo, useState } from "react";

const routeSamples = {
  "Oxford|Liverpool Street": {
    duration: "2h 48m",
    traffic: "+22m",
    buffer: "+30m",
    cover: "4 Hours",
    insight: "Optimised for a same-day city route with live traffic tolerance.",
  },
  "Reading|Canary Wharf": {
    duration: "1h 31m",
    traffic: "+18m",
    buffer: "+20m",
    cover: "2.5 Hours",
    insight: "Shorter commuter route with sensible protection against congestion.",
  },
  "Cambridge|Heathrow": {
    duration: "2h 05m",
    traffic: "+27m",
    buffer: "+28m",
    cover: "3 Hours",
    insight: "Airport run with extra resilience for traffic variance and delays.",
  },
};

export default function RouteInsuranceHero() {
  const [from, setFrom] = useState("Oxford");
  const [to, setTo] = useState("Liverpool Street");
  const [isCalculating, setIsCalculating] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  const [activePulse, setActivePulse] = useState(0);

  const key = `${from}|${to}`;

  const result = useMemo(() => {
    return (
      routeSamples[key] || {
        duration: "2h 20m",
        traffic: "+20m",
        buffer: "+25m",
        cover: "3.5 Hours",
        insight:
          "Adaptive estimate based on route length, traffic exposure, and safety margin.",
      }
    );
  }, [key]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    setAnimateResult(false);

    setTimeout(() => {
      setIsCalculating(false);
      setAnimateResult(true);
    }, 1400);
  };

  const quickRoutes = [
    ["Oxford", "Liverpool Street"],
    ["Reading", "Canary Wharf"],
    ["Cambridge", "Heathrow"],
  ];

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-[#07111f]/85 to-slate-950/70" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full border border-sky-300/10 blur-3xl animate-pulse" />
        <div className="absolute right-[10%] top-[15%] h-96 w-96 rounded-full border border-cyan-300/10 blur-3xl animate-pulse [animation-delay:700ms]" />
        <div className="absolute left-[22%] bottom-[12%] h-64 w-64 rounded-full border border-white/5 blur-3xl animate-pulse [animation-delay:1200ms]" />
      </div>

      <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-sky-200">
            Simcolabs · InsurTech Simulation
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl xl:text-7xl">
              Insurance that thinks in{" "}
              <span className="text-sky-300">journeys</span>, not hours.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Enter a route, simulate live cover logic, and see how flexible
              insurance can feel when time, traffic, and risk are calculated for
              you.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickRoutes.map(([start, end]) => (
              <button
                key={`${start}-${end}`}
                onClick={() => {
                  setFrom(start);
                  setTo(end);
                  setAnimateResult(false);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/30 hover:bg-sky-400/10"
              >
                {start} → {end}
              </button>
            ))}
          </div>

          <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { label: "Route logic", value: "Live journey fit" },
              { label: "Flexibility", value: "Only what you need" },
              { label: "Outcome", value: "Best-fit cover window" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[34px] bg-sky-400/10 blur-3xl" />
          <div className="relative rounded-[34px] border border-white/10 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-xl md:p-6">
            <div className="rounded-[28px] border border-white/10 bg-[#081320]/95 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Smart Journey Cover
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                    Live Simulation
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Interactive
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/40"
                  placeholder="From"
                />
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/40"
                  placeholder="To"
                />
                <button
                  onClick={handleCalculate}
                  className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  {isCalculating ? "Calculating..." : "Calculate"}
                </button>
              </div>

              <div className="mt-7 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(6,17,31,0.96))] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Route Visual
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {from} → {to}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activePulse === i ? "bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.8)]" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative h-40 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
                  <div className="absolute left-[10%] top-[70%] h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
                  <div className="absolute right-[12%] top-[28%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.95)]" />

                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 12 72 C 26 70, 32 82, 44 62 S 66 36, 88 28"
                      fill="none"
                      stroke="rgba(125,211,252,0.22)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 12 72 C 26 70, 32 82, 44 62 S 66 36, 88 28"
                      fill="none"
                      stroke="rgba(125,211,252,0.95)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="120"
                      strokeDashoffset={isCalculating ? 120 : 0}
                      style={{
                        transition: isCalculating
                          ? "none"
                          : "stroke-dashoffset 1.2s ease",
                      }}
                    />
                  </svg>

                  <div
                    className={`absolute top-[62%] h-4 w-4 rounded-full bg-sky-300 shadow-[0_0_20px_rgba(125,211,252,0.95)] ${
                      isCalculating ? "animate-route-travel" : ""
                    }`}
                    style={{ left: isCalculating ? "10%" : "78%" }}
                  />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Base Time", value: result.duration },
                    { label: "Traffic", value: result.traffic },
                    { label: "Safety Buffer", value: result.buffer },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-5 rounded-[24px] border border-sky-300/20 bg-sky-400/10 p-5 transition duration-500 ${
                    animateResult ? "scale-[1.01] shadow-[0_0_40px_rgba(56,189,248,0.15)]" : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
                    Optimal Cover
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold md:text-4xl">
                        {isCalculating ? "Thinking..." : result.cover}
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                        {isCalculating
                          ? "Analysing route length, congestion exposure, and resilience margin."
                          : result.insight}
                      </p>
                    </div>
                    <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right md:block">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        Enough cover.
                        <br />
                        Less waste.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                  Explore the Concept
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-300/30 hover:bg-sky-400/10">
                  See How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes route-travel {
          0% { left: 10%; top: 62%; opacity: 0.85; }
          30% { left: 30%; top: 66%; opacity: 1; }
          55% { left: 48%; top: 48%; opacity: 1; }
          78% { left: 64%; top: 34%; opacity: 1; }
          100% { left: 78%; top: 20%; opacity: 0.95; }
        }

        .animate-route-travel {
          animation: route-travel 1.35s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
}