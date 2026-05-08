import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const boroughs = {
  havering: {
    label: "Havering",
    file: "/data/havering_elections_master_v1.csv",
    status: "Declared dataset",
    accent: "#12B6CF",
    source: "https://www.havering.gov.uk/news/article/1761/local-election-2026-results",
    narrative: "A live civic intelligence view of borough-level results, candidate performance and party dominance.",
  },
  redbridge: {
    label: "Redbridge",
    file: "/data/redbridge_elections_master_v1.csv",
    status: "Candidate dataset / votes pending",
    accent: "#7C3AED",
    source: "https://www.redbridge.gov.uk/voting-and-elections/local-election-results/",
    narrative: "Candidate and turnout intelligence is ready; vote metrics will activate automatically when the count values are added.",
  },
};

const fallbackColor = "#64748b";
const money = new Intl.NumberFormat("en-GB");

function parseCSV(text) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuote = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && insideQuote && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === "," && !insideQuote) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !insideQuote) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      current = "";
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
    } else {
      current += char;
    }
  }
  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }
  const [headers, ...body] = rows;
  return body.map((cells) => Object.fromEntries(headers.map((header, index) => [header.trim(), (cells[index] || "").trim()])));
}

function numberValue(value) {
  const cleaned = String(value ?? "").replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normaliseParty(party = "") {
  return party
    .replace("The Conservative Party Candidate", "Conservative Party")
    .replace("Conservative Party Candidate", "Conservative Party")
    .replace("Local Conservatives", "Conservative Party")
    .replace("Green Party Candidate", "Green Party")
    .replace("Redbridge Independents", "Redbridge and Ilford Independents")
    .trim();
}

function StatCard({ label, value, hint }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      {hint && <p className="mt-2 text-sm text-slate-400">{hint}</p>}
    </motion.div>
  );
}

function BarList({ data, metricKey, labelKey = "party", title, emptyText }) {
  const max = Math.max(...data.map((d) => d[metricKey]), 1);
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">Live from CSV</span>
      </div>
      <div className="space-y-4">
        {data.length === 0 ? <p className="text-sm text-slate-400">{emptyText}</p> : data.map((item) => (
          <div key={item[labelKey]}>
            <div className="mb-1 flex justify-between text-sm text-slate-300">
              <span>{item[labelKey]}</span>
              <span>{money.format(item[metricKey])}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${(item[metricKey] / max) * 100}%`, background: item.colour || fallbackColor }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniDonut({ data }) {
  const total = data.reduce((sum, d) => sum + d.seats, 0) || 1;
  let offset = 25;
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Seat Distribution</h2>
      <div className="mt-6 flex flex-col items-center gap-5 lg:flex-row">
        <svg viewBox="0 0 42 42" className="h-44 w-44 -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          {data.map((item) => {
            const dash = (item.seats / total) * 100;
            const circle = (
              <circle
                key={item.party}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={item.colour || fallbackColor}
                strokeWidth="5"
                strokeDasharray={`${dash} ${100 - dash}`}
                strokeDashoffset={offset}
              />
            );
            offset -= dash;
            return circle;
          })}
        </svg>
        <div className="w-full space-y-3">
          {data.length === 0 ? <p className="text-sm text-slate-400">Seat distribution will appear when elected rows are available.</p> : data.map((item) => (
            <div key={item.party} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
              <span className="flex items-center gap-2 text-slate-200"><span className="h-2.5 w-2.5 rounded-full" style={{ background: item.colour }} />{item.party}</span>
              <strong className="text-white">{item.seats}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CivicElectionDashboard() {
  const [selectedBorough, setSelectedBorough] = useState("havering");
  const [rows, setRows] = useState([]);
  const [ward, setWard] = useState("All");
  const [party, setParty] = useState("All");
  const [query, setQuery] = useState("");
  const [loadError, setLoadError] = useState("");

  const config = boroughs[selectedBorough];

  useEffect(() => {
    setWard("All");
    setParty("All");
    setQuery("");
    fetch(config.file)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${config.file}`);
        return response.text();
      })
      .then((text) => {
        const parsed = parseCSV(text).map((row) => ({
          ...row,
          borough: row.borough || config.label,
          party_normalised: normaliseParty(row.party),
          votes_num: numberValue(row.votes),
          elected_bool: String(row.elected).toLowerCase() === "true" || String(row.seat_position).toLowerCase() === "elected",
          colour: row.party_colour || fallbackColor,
        }));
        setRows(parsed);
        setLoadError("");
      })
      .catch((err) => setLoadError(err.message));
  }, [selectedBorough, config.file, config.label]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((row) => {
      const wardMatch = ward === "All" || row.ward === ward;
      const partyMatch = party === "All" || row.party_normalised === party;
      const textMatch = !q || [row.ward, row.candidate, row.party, row.party_normalised].join(" ").toLowerCase().includes(q);
      return wardMatch && partyMatch && textMatch;
    });
  }, [rows, ward, party, query]);

  const wardOptions = useMemo(() => ["All", ...Array.from(new Set(rows.map((r) => r.ward))).sort()], [rows]);
  const partyOptions = useMemo(() => ["All", ...Array.from(new Set(rows.map((r) => r.party_normalised))).sort()], [rows]);
  const hasVotes = rows.some((row) => row.votes_num > 0);

  const kpis = useMemo(() => {
    const wards = new Set(filtered.map((row) => row.ward)).size;
    const candidates = filtered.length;
    const votes = filtered.reduce((sum, row) => sum + row.votes_num, 0);
    const seats = filtered.filter((row) => row.elected_bool).length;
    const turnoutValues = filtered.map((row) => numberValue(row.turnout_pct)).filter(Boolean);
    const avgTurnout = turnoutValues.length ? (turnoutValues.reduce((a, b) => a + b, 0) / turnoutValues.length).toFixed(1) : "—";
    return { wards, candidates, votes, seats, avgTurnout };
  }, [filtered]);

  const partyVotes = useMemo(() => {
    const map = new Map();
    filtered.forEach((row) => {
      const key = row.party_normalised;
      const existing = map.get(key) || { party: key, votes: 0, candidates: 0, colour: row.colour };
      existing.votes += row.votes_num;
      existing.candidates += 1;
      if (!existing.colour && row.colour) existing.colour = row.colour;
      map.set(key, existing);
    });
    return Array.from(map.values()).filter((d) => hasVotes ? d.votes > 0 : d.candidates > 0).sort((a, b) => (hasVotes ? b.votes - a.votes : b.candidates - a.candidates)).slice(0, 8);
  }, [filtered, hasVotes]);

  const seatData = useMemo(() => {
    const map = new Map();
    filtered.filter((row) => row.elected_bool).forEach((row) => {
      const key = row.party_normalised;
      const existing = map.get(key) || { party: key, seats: 0, colour: row.colour };
      existing.seats += 1;
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.seats - a.seats);
  }, [filtered]);

  const wardTable = useMemo(() => {
    const map = new Map();
    filtered.forEach((row) => {
      const existing = map.get(row.ward) || { ward: row.ward, candidates: 0, votes: 0, turnout: row.turnout_pct || "", parties: new Set() };
      existing.candidates += 1;
      existing.votes += row.votes_num;
      existing.parties.add(row.party_normalised);
      if (!existing.turnout && row.turnout_pct) existing.turnout = row.turnout_pct;
      map.set(row.ward, existing);
    });
    return Array.from(map.values()).sort((a, b) => hasVotes ? b.votes - a.votes : a.ward.localeCompare(b.ward));
  }, [filtered, hasVotes]);

  return (
    <main className="min-h-screen bg-slate-950 pt-28 text-white">
      <section className="relative overflow-hidden px-6 pb-12 pt-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-10 top-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl md:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">SimCoLabs Civic Intelligence</span>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">London Election Intelligence Dashboard</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">{config.narrative}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Borough Dataset</p>
                <select value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none">
                  {Object.entries(boroughs).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
                </select>
                <p className="mt-3 text-sm text-slate-400">{config.status}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        {loadError && <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">{loadError}</div>}

        <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl md:grid-cols-4">
          <select value={ward} onChange={(e) => setWard(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
            {wardOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={party} onChange={(e) => setParty(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
            {partyOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ward, party or candidate" className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none md:col-span-2" />
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <StatCard label="Wards" value={kpis.wards} hint="Filtered scope" />
          <StatCard label="Candidates" value={kpis.candidates} hint="Rows in source" />
          <StatCard label="Votes" value={hasVotes ? money.format(kpis.votes) : "Pending"} hint={hasVotes ? "Filtered total" : "Awaiting count values"} />
          <StatCard label="Seats" value={kpis.seats || "Pending"} hint="Elected rows" />
          <StatCard label="Avg turnout" value={`${kpis.avgTurnout}${kpis.avgTurnout === "—" ? "" : "%"}`} hint="Where available" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BarList data={partyVotes} metricKey={hasVotes ? "votes" : "candidates"} title={hasVotes ? "Party Vote Strength" : "Candidate Coverage by Party"} emptyText="No matching party data yet." />
          <MiniDonut data={seatData} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Ward Intelligence Table</h2>
            <div className="mt-5 max-h-[520px] overflow-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="sticky top-0 bg-slate-900 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Ward</th>
                    <th className="px-4 py-3">Candidates</th>
                    <th className="px-4 py-3">Parties</th>
                    <th className="px-4 py-3">Votes</th>
                    <th className="px-4 py-3">Turnout</th>
                  </tr>
                </thead>
                <tbody>
                  {wardTable.map((item) => (
                    <tr key={item.ward} className="border-t border-white/10 text-slate-200 hover:bg-white/[0.04]">
                      <td className="px-4 py-3 font-medium text-white">{item.ward}</td>
                      <td className="px-4 py-3">{item.candidates}</td>
                      <td className="px-4 py-3">{item.parties.size}</td>
                      <td className="px-4 py-3">{hasVotes ? money.format(item.votes) : "Pending"}</td>
                      <td className="px-4 py-3">{item.turnout ? `${item.turnout}%` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-purple-500/10 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Insight Layer</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
              <p><strong className="text-white">Current mode:</strong> {hasVotes ? "Declared result analytics" : "Pre-result / count staging intelligence"}.</p>
              <p><strong className="text-white">Best next enhancement:</strong> connect ward boundary GeoJSON so this becomes a clickable London political topology map.</p>
              <p><strong className="text-white">Source:</strong> <a href={config.source} className="text-cyan-200 underline" target="_blank" rel="noreferrer">official borough election page</a></p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
              The same component now reads multiple borough-level CSV files. Once Redbridge vote counts are added, the party vote chart, seats chart and margins activate without changing the UI code.
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
