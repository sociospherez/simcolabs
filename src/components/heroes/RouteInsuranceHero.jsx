import { useMemo, useState } from "react";

const routeSamples = {
  "Oxford|Liverpool Street": {
    duration: "2h 48m",
    traffic: "+22m",
    buffer: "+30m",
    cover: "4 Hours",
    confidence: "Route matched with urban congestion tolerance.",
  },
  "Reading|Canary Wharf": {
    duration: "1h 31m",
    traffic: "+18m",
    buffer: "+20m",
    cover: "2.5 Hours",
    confidence: "Balanced for commuter traffic and time certainty.",
  },
  "Cambridge|Heathrow": {
    duration: "2h 05m",
    traffic: "+27m",
    buffer: "+28m",
    cover: "3 Hours",
    confidence: "Extended for airport variability and travel resilience.",
  },
};

const fallbackResult = {
  duration: "2h 20m",
  traffic: "+20m",
  buffer: "+25m",
  cover: "3.5 Hours",
  confidence: "Adaptive estimate based on route length and journey risk.",
};

export default function RouteInsuranceHero() {
  const [from, setFrom] = useState("Oxford");
  const [to, setTo] = useState("Liverpool Street");
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(true);

  const routeKey = `${from}|${to}`;

  const result = useMemo(() => {
    return routeSamples[routeKey] || fallbackResult;
  }, [routeKey]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setHasCalculated(false);

    window.setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
    }, 1400);
  };

  const applyQuickRoute = (start, end) => {
    setFrom(start);
    setTo(end);
    setHasCalculated(true);
    setIsCalculating(false);
  };

  const quickRoutes = [
    ["Oxford", "Liverpool Street"],
    ["Reading", "Canary Wharf"],
    ["Cambridge", "Heathrow"],
  ];

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-14 pt-28 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(34,211,238,0.14),transparent_26%),radial-gradient(circle_at_60%_80%,rgba(59,130,246,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-[#06111f]/90 to-slate-950/70" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-80 w-80 rounded-full border border-sky-300/10 blur-3xl animate-pulse" />
        <div className="absolute right-[8%] top-[12%] h-[26rem] w-[26rem] rounded-full border border-cyan-300/10 blur-3xl animate-pulse [animation-delay:900ms]" />
        <div className="absolute bottom-[10%] left-[30%] h-72 w-72 rounded-full border border-white/5 blur-3xl animate-pulse [animation-delay:1400ms]" />
      </div>

      <div className="relative mx-auto flex min-h-[84vh] max-w-7xl flex-col justify-between">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-sky-200">
              Simcolabs · InsurTech Simulation
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-300">
              Route-aware cover logic
            </span>
          </div>

          <div className="max-w-5xl space-y-5">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl xl:text-7xl">
              Insurance that thinks in{" "}
              <span className="text-sky-300">journeys</span>, not hours.
            </h1>

            <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
              A full-width simulation of how smarter cover could work: route,
              traffic, resilience margin, and optimal cover window — all
              calculated as one connected experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickRoutes.map(([start, end]) => (
              <button
                key={`${start}-${end}`}
                onClick={() => applyQuickRoute(start, end)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/30 hover:bg-sky-400/10"
              >
                {start} → {end}
              </button>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.1fr_1.1fr_auto]">
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/40"
            />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/40"
            />
            <button
              onClick={handleCalculate}
              className="rounded-2xl bg-sky-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              {isCalculating ? "Calculating..." : "Simulate Cover"}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <div className="rounded-[34px] border border-white/10 bg-slate-950/45 p-4 shadow-2xl backdrop-blur-xl md:p-6">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,19,32,0.88),rgba(5,12,22,0.96))] p-5 md:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Live route simulation
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {from} → {to}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Base Time", value: result.duration },
                    { label: "Traffic", value: result.traffic },
                    { label: "Buffer", value: result.buffer },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] transition duration-500 ${
                        isCalculating
                          ? "border-sky-300/30 bg-sky-400/10 text-sky-200 animate-pulse"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                      style={{ transitionDelay: `${index * 120}ms` }}
                    >
                      {item.label}: {item.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-4 py-8 md:px-8 md:py-10">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.04),transparent)] animate-[heroSweep_7s_linear_infinite]" />

                <div className="relative h-[18rem] md:h-[22rem]">
                  <div className="absolute left-[3%] top-[65%] rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md">
                    Start · {from}
                  </div>

                  <div className="absolute right-[3%] top-[18%] rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-xs text-sky-200 backdrop-blur-md">
                    Destination · {to}
                  </div>

                  <svg
                    viewBox="0 0 1000 320"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
                        <stop offset="50%" stopColor="rgba(125,211,252,0.55)" />
                        <stop offset="100%" stopColor="rgba(56,189,248,0.95)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 70 235 C 180 245, 245 275, 355 210 S 540 95, 650 130 S 815 115, 930 78"
                      fill="none"
                      stroke="rgba(125,211,252,0.16)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 70 235 C 180 245, 245 275, 355 210 S 540 95, 650 130 S 815 115, 930 78"
                      fill="none"
                      stroke="url(#routeGlow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="1200"
                      strokeDashoffset={isCalculating ? 1200 : 0}
                      style={{
                        transition: isCalculating
                          ? "none"
                          : "stroke-dashoffset 1.4s ease-out",
                      }}
                    />
                  </svg>

                  <div className="absolute left-[6%] top-[72%] h-4 w-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
                  <div className="absolute right-[5.5%] top-[22%] h-4 w-4 rounded-full bg-sky-300 shadow-[0_0_26px_rgba(125,211,252,0.95)]" />

                  <div
                    className={`absolute h-5 w-5 rounded-full bg-sky-300 shadow-[0_0_28px_rgba(125,211,252,0.95)] ${
                      isCalculating ? "animate-route-glide" : ""
                    }`}
                    style={{
                      left: isCalculating ? "6%" : "88%",
                      top: isCalculating ? "72%" : "24%",
                    }}
                  />

                  <div className="absolute left-[20%] top-[58%] rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-200 backdrop-blur-md animate-[floatCard_5s_ease-in-out_infinite]">
                    Journey Time
                    <div className="mt-1 text-lg font-semibold text-white">
                      {result.duration}
                    </div>
                  </div>

                  <div className="absolute left-[45%] top-[28%] rounded-2xl border border-sky-300/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100 backdrop-blur-md animate-[floatCard_6s_ease-in-out_infinite] [animation-delay:600ms]">
                    Traffic Exposure
                    <div className="mt-1 text-lg font-semibold text-white">
                      {result.traffic}
                    </div>
                  </div>

                  <div className="absolute right-[18%] top-[48%] rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-200 backdrop-blur-md animate-[floatCard_5.5s_ease-in-out_infinite] [animation-delay:900ms]">
                    Safety Buffer
                    <div className="mt-1 text-lg font-semibold text-white">
                      {result.buffer}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div
                  className={`rounded-[28px] border border-sky-300/20 bg-sky-400/10 p-5 transition duration-500 ${
                    hasCalculated
                      ? "shadow-[0_0_40px_rgba(56,189,248,0.14)]"
                      : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
                    Optimal Cover
                  </p>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold md:text-5xl">
                        {isCalculating ? "Thinking..." : result.cover}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
                        {isCalculating
                          ? "Analysing route conditions, travel span, and resilience margin."
                          : result.confidence}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
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

                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Why this matters
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    <p>
                      Traditional temporary cover still makes the user decide the
                      time window manually.
                    </p>
                    <p>
                      This concept flips the experience: the route becomes the
                      input, and the policy window becomes the outcome.
                    </p>
                    <p className="text-sky-200">
                      That is the shift from insurance selection to insurance
                      intelligence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                    Explore the Concept
                  </button>
                  <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-300/30 hover:bg-sky-400/10">
                    See Product Logic
                  </button>
                </div>

                <p className="max-w-xl text-sm leading-6 text-slate-400">
                  A full-width product pitch demo designed to show how Simcolabs
                  turns ideas into intelligent, visual, buildable concepts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes route-glide {
          0% {
            left: 6%;
            top: 72%;
            opacity: 0.85;
            transform: scale(0.95);
          }
          25% {
            left: 25%;
            top: 74%;
            opacity: 1;
            transform: scale(1);
          }
          45% {
            left: 42%;
            top: 50%;
            opacity: 1;
          }
          65% {
            left: 62%;
            top: 35%;
            opacity: 1;
          }
          85% {
            left: 77%;
            top: 40%;
            opacity: 1;
          }
          100% {
            left: 88%;
            top: 24%;
            opacity: 0.95;
            transform: scale(1.05);
          }
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes heroSweep {
          0% {
            transform: translateX(-35%);
          }
          100% {
            transform: translateX(35%);
          }
        }

        .animate-route-glide {
          animation: route-glide 1.45s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
}