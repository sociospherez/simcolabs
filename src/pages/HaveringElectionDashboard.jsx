import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PARTY_COLORS = {
  "Reform UK": "#22d3ee",
  "Labour Party": "#fb3b52",
  "Hornchurch Residents Association": "#facc15",
  "Harold Wood Hill Park Residents Association": "#f59e0b",
  "Havering Residents Association - Beam Park": "#facc15",
  "Havering Residents Association - Emerson Park": "#facc15",
  "Havering Residents Association - Havering-atte-Bower": "#facc15",
};

const partyGroup = (party = "") => {
  if (party.includes("Residents Association")) return "Residents' Associations";
  if (party.includes("Labour")) return "Labour";
  if (party.includes("Reform")) return "Reform UK";
  if (party.includes("Conservative")) return "Conservative";
  if (party.includes("Green")) return "Green";
  if (party.includes("Liberal")) return "Liberal Democrat";
  return party || "Other";
};

const groupColor = (name) => ({
  "Reform UK": "#22d3ee",
  "Labour": "#fb3b52",
  "Residents' Associations": "#facc15",
  "Conservative": "#2563eb",
  "Green": "#22c55e",
  "Liberal Democrat": "#f97316",
  Other: "#94a3b8",
}[name] || "#94a3b8");

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(",").map((h) => h.trim());
  return lines.map((line) => {
    const values = line.match(/("[^"]*"|[^,]+)/g)?.map((v) => v.replace(/^"|"$/g, "")) || [];
    return headers.reduce((row, header, index) => {
      const value = values[index] ?? "";
      row[header] = ["votes", "ward_total_votes", "vote_share_pct", "rank_in_ward", "winning_margin"].includes(header)
        ? Number(value || 0)
        : header === "elected"
          ? value.toLowerCase() === "true"
          : value;
      return row;
    }, {});
  });
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value || 0);
}

function KpiCard({ label, value, sub, accent = "#22d3ee" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[26px] border border-white/10 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]" style={{ background: accent, color: accent }} />
        <p className="text-sm text-slate-300">{label}</p>
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{sub}</p>
    </motion.div>
  );
}

function BarChart({ data, labelKey = "name", valueKey = "value", suffix = "" }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item[labelKey]}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-200">{item[labelKey]}</span>
            <span className="font-medium text-white">{item[valueKey]}{suffix}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item[valueKey] / max) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full"
              style={{ background: item.color || "linear-gradient(90deg,#0284c7,#22d3ee)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  let offset = 25;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
      <svg viewBox="0 0 100 100" className="h-56 w-56 -rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,.08)" strokeWidth="14" fill="none" />
        {data.map((item) => {
          const dash = (item.value / total) * circumference;
          const circle = (
            <circle
              key={item.name}
              cx="50"
              cy="50"
              r={radius}
              stroke={item.color}
              strokeWidth="14"
              fill="none"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          );
          offset -= dash;
          return circle;
        })}
      </svg>
      <div className="flex-1 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex items-center gap-3 text-sm text-slate-200">
              <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WardTiles({ wards, selectedWard, setSelectedWard }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {wards.map((ward) => (
        <button
          key={ward.ward}
          onClick={() => setSelectedWard(selectedWard === ward.ward ? "All" : ward.ward)}
          className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${selectedWard === ward.ward ? "border-cyan-300/60 bg-cyan-400/15" : "border-white/10 bg-white/[0.035] hover:border-cyan-300/30"}`}
        >
          <div className="mb-2 h-2 rounded-full" style={{ background: groupColor(partyGroup(ward.winning_party)) }} />
          <p className="text-sm font-semibold text-white">{ward.ward}</p>
          <p className="mt-1 text-xs text-slate-400">{partyGroup(ward.winning_party)}</p>
        </button>
      ))}
    </div>
  );
}

export default function HaveringElectionDashboard() {
  const [rows, setRows] = useState([]);
  const [selectedWard, setSelectedWard] = useState("All");
  const [selectedParty, setSelectedParty] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/havering_elections_master_v1.csv")
      .then((res) => res.text())
      .then((text) => setRows(parseCSV(text)))
      .catch(() => setRows([]));
  }, []);

  const filtered = useMemo(() => rows.filter((row) => {
    const party = partyGroup(row.party);
    const text = `${row.ward} ${row.candidate} ${row.party}`.toLowerCase();
    return (selectedWard === "All" || row.ward === selectedWard)
      && (selectedParty === "All" || party === selectedParty)
      && (!search || text.includes(search.toLowerCase()));
  }), [rows, selectedWard, selectedParty, search]);

  const wards = useMemo(() => [...new Set(rows.map((r) => r.ward))].sort(), [rows]);
  const parties = useMemo(() => [...new Set(rows.map((r) => partyGroup(r.party)))].sort(), [rows]);

  const wardSummary = useMemo(() => {
    const map = new Map();
    rows.forEach((row) => {
      if (!map.has(row.ward)) map.set(row.ward, row);
    });
    return [...map.values()].sort((a, b) => a.ward.localeCompare(b.ward));
  }, [rows]);

  const electedRows = useMemo(() => rows.filter((r) => r.elected), [rows]);

  const seatsByParty = useMemo(() => {
    const map = new Map();
    electedRows.forEach((row) => {
      const group = partyGroup(row.party);
      map.set(group, (map.get(group) || 0) + 1);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value, color: groupColor(name) })).sort((a, b) => b.value - a.value);
  }, [electedRows]);

  const voteShareByParty = useMemo(() => {
    const map = new Map();
    rows.forEach((row) => {
      const group = partyGroup(row.party);
      map.set(group, (map.get(group) || 0) + row.votes);
    });
    const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
    return [...map.entries()].map(([name, votes]) => ({
      name,
      value: Number(((votes / total) * 100).toFixed(1)),
      color: groupColor(name),
    })).sort((a, b) => b.value - a.value);
  }, [rows]);

  const topWards = useMemo(() => wardSummary
    .filter((row) => partyGroup(row.winning_party) === "Reform UK")
    .sort((a, b) => b.vote_share_pct - a.vote_share_pct)
    .slice(0, 6)
    .map((row) => ({ name: row.ward, value: Number(row.vote_share_pct.toFixed(1)), color: "linear-gradient(90deg,#0e7490,#22d3ee)" })), [wardSummary]);

  const totalVotes = rows.reduce((sum, row) => sum + row.votes, 0);
  const selectedWardRows = selectedWard === "All" ? [] : rows.filter((r) => r.ward === selectedWard).sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen px-6 pb-16 pt-32 text-white md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-xl md:p-10"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_.8fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Civic Intelligence • Havering
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Local Election 2026 Results Dashboard
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                A SimCoLabs-style interactive view of ward results, party strength, elected seats and political control — driven by the master CSV dataset.
              </p>
            </div>
            <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-400/10 p-6">
              <p className="text-sm text-cyan-100">Council Control Signal</p>
              <p className="mt-2 text-4xl font-semibold text-cyan-200">Reform UK</p>
              <p className="mt-3 text-sm text-slate-300">Dominant elected-seat position across the current extracted master dataset.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/50 p-4 backdrop-blur-md md:grid-cols-4">
          <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none">
            <option>All</option>
            {wards.map((ward) => <option key={ward}>{ward}</option>)}
          </select>
          <select value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none">
            <option>All</option>
            {parties.map((party) => <option key={party}>{party}</option>)}
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ward, candidate or party" className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none md:col-span-2" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Valid Votes" value={formatNumber(totalVotes)} sub="From master CSV rows" />
          <KpiCard label="Wards Covered" value={wardSummary.length} sub="Ready for map linkage" accent="#facc15" />
          <KpiCard label="Elected Seats" value={electedRows.length} sub="Across declared ward rows" accent="#a78bfa" />
          <KpiCard label="Filtered Records" value={filtered.length} sub="Live dashboard state" accent="#fb7185" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Seats Won by Party</h2>
            <p className="mt-1 text-sm text-slate-400">Elected candidate count</p>
            <div className="mt-6"><DonutChart data={seatsByParty} /></div>
          </div>
          <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Vote Share by Party Group</h2>
            <p className="mt-1 text-sm text-slate-400">Percentage of total votes in the current dataset</p>
            <div className="mt-6"><BarChart data={voteShareByParty} suffix="%" /></div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Ward Intelligence Map Placeholder</h2>
                <p className="mt-1 text-sm text-slate-400">Clickable ward tiles now; GeoJSON map layer later</p>
              </div>
              <button onClick={() => setSelectedWard("All")} className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:border-cyan-300/40">Reset</button>
            </div>
            <WardTiles wards={wardSummary} selectedWard={selectedWard} setSelectedWard={setSelectedWard} />
          </div>
          <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Top Reform UK Ward Strength</h2>
            <p className="mt-1 text-sm text-slate-400">By winning candidate vote share</p>
            <div className="mt-6"><BarChart data={topWards} suffix="%" /></div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/55 backdrop-blur-md">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-xl font-semibold">Ward Results Table</h2>
              <p className="mt-1 text-sm text-slate-400">Live filtered records from the CSV</p>
            </div>
            <div className="max-h-[520px] overflow-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="sticky top-0 bg-slate-950/95 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Ward</th>
                    <th className="px-5 py-4">Candidate</th>
                    <th className="px-5 py-4">Party</th>
                    <th className="px-5 py-4">Votes</th>
                    <th className="px-5 py-4">Share</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filtered.sort((a, b) => a.ward.localeCompare(b.ward) || b.votes - a.votes).map((row, index) => (
                    <tr key={`${row.ward}-${row.candidate}-${index}`} onClick={() => setSelectedWard(row.ward)} className="cursor-pointer transition hover:bg-cyan-300/10">
                      <td className="px-5 py-4 font-medium text-white">{row.ward}</td>
                      <td className="px-5 py-4 text-slate-300">{row.candidate}</td>
                      <td className="px-5 py-4"><span className="rounded-full px-3 py-1 text-xs" style={{ background: `${groupColor(partyGroup(row.party))}22`, color: groupColor(partyGroup(row.party)) }}>{partyGroup(row.party)}</span></td>
                      <td className="px-5 py-4 text-slate-200">{formatNumber(row.votes)}</td>
                      <td className="px-5 py-4 text-slate-200">{row.vote_share_pct}%</td>
                      <td className="px-5 py-4">{row.elected ? <span className="text-cyan-200">Elected</span> : <span className="text-slate-500">Not elected</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Selected Ward Detail</h2>
            <p className="mt-1 text-sm text-slate-400">Click a ward tile or table row</p>
            {selectedWard === "All" ? (
              <div className="mt-8 rounded-3xl border border-dashed border-white/15 p-6 text-sm leading-7 text-slate-300">
                Select a ward to see its candidate ranking, winning party and margin. This will later become the ward intelligence side panel.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                  <p className="text-sm text-cyan-100">{selectedWard}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{selectedWardRows[0]?.winning_party}</p>
                  <p className="mt-2 text-sm text-slate-300">Winning margin: {formatNumber(selectedWardRows[0]?.winning_margin)} votes</p>
                </div>
                {selectedWardRows.map((row) => (
                  <div key={row.candidate} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{row.candidate}</p>
                        <p className="text-xs text-slate-400">{partyGroup(row.party)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{formatNumber(row.votes)}</p>
                        <p className="text-xs text-slate-400">{row.vote_share_pct}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
