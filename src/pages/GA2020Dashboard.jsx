import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Upload,
  Table2,
  BarChart3,
  Info,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cur);
      cur = "";
      if (row.some((c) => c !== "")) rows.push(row);
      row = [];
    } else {
      cur += ch;
    }
  }

  row.push(cur);
  if (row.some((c) => c !== "")) rows.push(row);

  const headerIndex = rows.findIndex((r) =>
  r.includes("RP_code") && r.includes("RP_name")
);

const header = headerIndex !== -1 ? rows[headerIndex] : rows[0];

const data = rows.slice(headerIndex + 1).map((r) => {
  const obj = {};
  header.forEach((h, idx) => {
    obj[h] = r[idx] ?? "";
  });
  return obj;
});
  const data = rows.slice(1).map((r) => {
    const obj = {};
    header.forEach((h, idx) => {
      obj[h] = r[idx] ?? "";
    });
    return obj;
  });

  return { header, data };
}

function toNumber(val) {
  if (val == null) return null;
  const cleaned = String(val)
    .trim()
    .replace(/£/g, "")
    .replace(/,/g, "")
    .replace(/\s/g, "")
    .replace(/\(\s*/g, "-")
    .replace(/\s*\)/g, "");

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function quantile(arr, q) {
  if (!arr.length) return null;
  const a = [...arr].sort((x, y) => x - y);
  const pos = (a.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (a[base + 1] !== undefined) {
    return a[base] + rest * (a[base + 1] - a[base]);
  }

  return a[base];
}

function fmtGBP(n) {
  if (n == null || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);

  if (abs >= 1e9) return `£${(n / 1e9).toFixed(2)}bn`;
  if (abs >= 1e6) return `£${(n / 1e6).toFixed(2)}m`;
  if (abs >= 1e3) return `£${(n / 1e3).toFixed(1)}k`;

  return `£${n.toFixed(0)}`;
}

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#64748b",
  "#14b8a6",
];

const chartTooltip = {
  backgroundColor: "#020617",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  color: "#e5e7eb",
};

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-[26px] border border-white/10 bg-slate-950/55 p-6 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function Badge({ children, active }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs ${
        active
          ? "bg-sky-400/15 text-sky-300 border border-sky-300/20"
          : "bg-white/5 text-slate-400 border border-white/10"
      }`}
    >
      {children}
    </span>
  );
}

export default function GA2020Dashboard() {
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("concentration");

  const suggestedFields = useMemo(() => {
    if (!parsed?.header) return [];

    const h = parsed.header;
    const pick = (reList) =>
      h.find((x) => reList.some((re) => re.test(String(x))));

    return [
      {
        key: "orgName",
        label: "Organisation name",
        value: pick([/^RP_name$/i, /provider|organisation|organization|name/i]),
      },
        {
        key: "turnover",
        label: "Turnover / total income",
        value: pick([/turnover/i, /total\s*income/i, /^income$/i]),
      },
      {
        key: "opSurplus",
        label: "Operating surplus / deficit",
        value: pick([/operating\s*(surplus|deficit)/i]),
      },
      {
        key: "opEx",
        label: "Operating expenditure",
        value: pick([
          /operating\s*expenditure/i,
          /total\s*operating\s*cost/i,
          /expenditure/i,
        ]),
      },
      {
        key: "totalAssets",
        label: "Total assets",
        value: pick([/total\s*assets/i]),
      },
      {
        key: "housingProps",
        label: "Housing properties",
        value: pick([
          /fixed\s*assets.*housing\s*properties/i,
          /housing\s*properties/i,
        ]),
      },
      {
        key: "cash",
        label: "Cash & equivalents",
        value: pick([/cash\s*(and)?\s*cash\s*equivalents/i, /^cash$/i]),
      },
      {
        key: "debt",
        label: "Debt / loans / borrowings",
        value: pick([
          /loans/i,
          /borrowings/i,
          /long\s*term\s*creditors/i,
          /total\s*debt/i,
        ]),
      },
    ];
  }, [parsed]);

  const fieldMap = useMemo(() => {
    const map = {};
    suggestedFields.forEach((f) => {
      map[f.key] = f.value;
    });
    return map;
  }, [suggestedFields]);

  const dataset = useMemo(() => {
    if (!parsed?.data?.length) return null;

    return parsed.data
      .map((r, idx) => {
        const org = fieldMap.orgName
          ? r[fieldMap.orgName] ?? ""
          : r[parsed.header[0]] ?? "";

        const turnover = fieldMap.turnover
          ? toNumber(r[fieldMap.turnover])
          : null;
        const opSurplus = fieldMap.opSurplus
          ? toNumber(r[fieldMap.opSurplus])
          : null;
        const opEx = fieldMap.opEx ? toNumber(r[fieldMap.opEx]) : null;
        const totalAssets = fieldMap.totalAssets
          ? toNumber(r[fieldMap.totalAssets])
          : null;
        const housingProps = fieldMap.housingProps
          ? toNumber(r[fieldMap.housingProps])
          : null;
        const cash = fieldMap.cash ? toNumber(r[fieldMap.cash]) : null;
        const debt = fieldMap.debt ? toNumber(r[fieldMap.debt]) : null;

        const opMargin =
          turnover != null && opSurplus != null && turnover !== 0
            ? (opSurplus / turnover) * 100
            : null;

        const cashToDebt =
          cash != null && debt != null && debt !== 0
            ? (cash / debt) * 100
            : null;

        const assetsToDebt =
          totalAssets != null && debt != null && debt !== 0
            ? totalAssets / debt
            : null;

        return {
          id: idx + 1,
          org: String(org || "(unknown)").trim(),
          turnover,
          opSurplus,
          opEx,
          totalAssets,
          housingProps,
          cash,
          debt,
          opMargin,
          cashToDebt,
          assetsToDebt,
        };
      })
      .filter((r) => r.org && r.org !== "(unknown)");
  }, [parsed, fieldMap]);

  const sectorStats = useMemo(() => {
    if (!dataset?.length) return null;

    const pick = (k) =>
      dataset.map((d) => d[k]).filter((x) => x != null && Number.isFinite(x));

    const statsFor = (k) => {
      const arr = pick(k);
      if (!arr.length) return null;

      return {
        count: arr.length,
        min: Math.min(...arr),
        p25: quantile(arr, 0.25),
        median: quantile(arr, 0.5),
        p75: quantile(arr, 0.75),
        max: Math.max(...arr),
      };
    };

    return {
      turnover: statsFor("turnover"),
      opMargin: statsFor("opMargin"),
      totalAssets: statsFor("totalAssets"),
      debt: statsFor("debt"),
      cashToDebt: statsFor("cashToDebt"),
    };
  }, [dataset]);

  const topByTurnover = useMemo(() => {
    if (!dataset?.length) return [];

    return [...dataset]
      .filter((d) => d.turnover != null)
      .sort((a, b) => b.turnover - a.turnover)
      .slice(0, 10);
  }, [dataset]);

  const distributionBars = useMemo(() => {
    if (!sectorStats?.turnover) return [];

    const t = sectorStats.turnover;
    const buckets = [
      { name: "Bottom 25%", from: t.min, to: t.p25 },
      { name: "25–50%", from: t.p25, to: t.median },
      { name: "50–75%", from: t.median, to: t.p75 },
      { name: "Top 25%", from: t.p75, to: t.max },
    ];

    const counts = buckets.map((b) => ({ ...b, count: 0 }));

    for (const d of dataset || []) {
      if (d.turnover == null) continue;
      const i =
        d.turnover <= t.p25
          ? 0
          : d.turnover <= t.median
          ? 1
          : d.turnover <= t.p75
          ? 2
          : 3;
      counts[i].count++;
    }

    return counts;
  }, [sectorStats, dataset]);

  const scatterData = useMemo(() => {
    if (!dataset?.length) return [];

    return dataset
      .filter((d) => d.turnover != null && d.opMargin != null)
      .map((d) => ({
        org: d.org,
        turnover: d.turnover,
        opMargin: d.opMargin,
        debt: d.debt,
      }));
  }, [dataset]);

  const filteredTable = useMemo(() => {
    if (!dataset?.length) return [];

    const q = search.trim().toLowerCase();
    const rows = q
      ? dataset.filter((d) => d.org.toLowerCase().includes(q))
      : dataset;

    return rows.slice(0, 50);
  }, [dataset, search]);

  const pie = useMemo(() => {
    if (!dataset?.length) return [];

    const top = [...dataset]
      .filter((d) => d.turnover != null)
      .sort((a, b) => b.turnover - a.turnover);

    const top5 = top.slice(0, 5);
    const rest = top.slice(5);
    const restSum = rest.reduce((s, d) => s + (d.turnover || 0), 0);

    const out = top5.map((d) => ({
      name: d.org,
      value: d.turnover,
    }));

    if (restSum > 0) {
      out.push({
        name: "All other providers",
        value: restSum,
      });
    }

    return out;
  }, [dataset]);

  function handleFile(file) {
    setError("");

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = String(e.target?.result || "");

      try {
        const p = parseCSV(text);
        setParsed(p);
      } catch {
        setError("Could not parse that CSV. Please check the file is valid.");
      }
    };

    reader.onerror = () => setError("Could not read that file.");
    reader.readAsText(file);
  }

  function downloadSample() {
    const sample = [
      [
        "Organisation",
        "Turnover",
        "Operating surplus",
        "Operating expenditure",
        "Total assets",
        "Cash",
        "Debt",
      ],
      [
        "Example HA A",
        350000000,
        18000000,
        310000000,
        4200000000,
        90000000,
        2500000000,
      ],
      [
        "Example HA B",
        210000000,
        9000000,
        195000000,
        2500000000,
        40000000,
        1400000000,
      ],
      [
        "Example HA C",
        120000000,
        3000000,
        117000000,
        1400000000,
        22000000,
        900000000,
      ],
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([sample], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "ga2020_dashboard_sample.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="px-6 md:px-10 lg:px-16 pt-28 pb-20 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-300">
              Showcase Data Intelligence
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              GA2020 Sector Dashboard
            </h1>

            <p className="mt-4 max-w-3xl text-slate-300">
              Upload GA2020_Datafile__-_consolidated.csv to visualise income,
              costs, assets and leverage patterns across providers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadSample}
              className="inline-flex items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-300 transition hover:bg-sky-400/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Download sample CSV
            </button>

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300 file:mr-3 file:rounded-xl file:border-0 file:bg-sky-400/20 file:px-3 file:py-1 file:text-sky-300"
            />
          </div>
        </div>

        {!parsed && (
          <div className="rounded-2xl border border-sky-300/20 bg-sky-400/5 p-5 text-slate-300">
            <div className="mb-2 flex items-center gap-2 font-semibold text-sky-300">
              <Info className="h-4 w-4" />
              How this works
            </div>
            <p className="text-sm">
              This page builds a lightweight dashboard in your browser. After
              you upload the CSV, it automatically detects key fields and plots
              sector patterns.
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm text-red-200">
            {error}
          </div>
        )}

        {parsed && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Panel>
              <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                <Upload className="h-4 w-4 text-sky-300" />
                Data loaded
              </h3>

              <p className="mb-4 text-sm text-slate-400">
                {parsed.data.length.toLocaleString()} rows •{" "}
                {parsed.header.length.toLocaleString()} columns
              </p>

              <p className="mb-3 text-sm text-slate-300">Detected fields:</p>

              <div className="flex flex-wrap gap-2">
                {suggestedFields.map((f) => (
                  <Badge key={f.key} active={Boolean(f.value)}>
                    {f.label}: {f.value || "not found"}
                  </Badge>
                ))}
              </div>

              <div className="my-4 h-px bg-white/10" />

              <p className="text-xs text-slate-500">
                If a field shows “not found”, the dashboard still loads but that
                metric will not be charted.
              </p>
            </Panel>

            <Panel className="lg:col-span-2">
              <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-4 w-4 text-sky-300" />
                Sector snapshot
              </h3>

              <p className="mb-4 text-sm text-slate-400">
                Turnover quartiles show how concentrated income is across
                providers.
              </p>

              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionBars}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" allowDecimals={false} />
                    <Tooltip
                      contentStyle={chartTooltip}
                      formatter={(v) => [v, "Providers"]}
                    />
                    <Bar
                      dataKey="count"
                      fill="#0ea5e9"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>
        )}

        {parsed && (
          <>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-slate-950/50 p-2 backdrop-blur-md">
              {[
                {
                  id: "concentration",
                  label: "Concentration",
                  icon: BarChart3,
                },
                {
                  id: "efficiency",
                  label: "Income vs margin",
                  icon: TrendingUp,
                },
                {
                  id: "table",
                  label: "Table",
                  icon: Table2,
                },
              ].map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center rounded-xl px-4 py-2 text-sm transition ${
                      activeTab === tab.id
                        ? "bg-sky-400/20 text-sky-300"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === "concentration" && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Panel className="lg:col-span-2">
                  <h3 className="text-lg font-semibold">
                    Top 5 share of turnover
                  </h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Quick view of whether a small number of providers dominate
                    sector income.
                  </p>

                  <div className="h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          contentStyle={chartTooltip}
                          formatter={(v) => fmtGBP(v)}
                        />
                        <Legend />
                        <Pie
                          data={pie}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={120}
                        >
                          {pie.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel>
                  <h3 className="text-lg font-semibold">
                    Top providers by turnover
                  </h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Top 10 as available
                  </p>

                  <div className="space-y-3">
                    {topByTurnover.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        Turnover column not detected.
                      </p>
                    ) : (
                      topByTurnover.map((d, i) => (
                        <div
                          key={d.id}
                          className="flex items-start justify-between gap-3"
                        >
                          <div className="text-sm">
                            <div className="font-medium leading-tight">
                              {i + 1}. {d.org}
                            </div>
                            <div className="text-slate-500">
                              Operating margin:{" "}
                              {d.opMargin == null
                                ? "—"
                                : `${d.opMargin.toFixed(1)}%`}
                            </div>
                          </div>

                          <div className="text-sm font-semibold tabular-nums text-sky-300">
                            {fmtGBP(d.turnover)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Panel>
              </div>
            )}

            {activeTab === "efficiency" && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Panel className="lg:col-span-2">
                  <h3 className="text-lg font-semibold">
                    Turnover vs operating margin
                  </h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Each dot is a provider. Large income does not always mean
                    strong margin.
                  </p>

                  <div className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                        <XAxis
                          dataKey="turnover"
                          tickFormatter={fmtGBP}
                          name="Turnover"
                          stroke="#94a3b8"
                        />
                        <YAxis
                          dataKey="opMargin"
                          tickFormatter={(v) => `${v}%`}
                          name="Operating margin"
                          stroke="#94a3b8"
                        />
                        <Tooltip
                          contentStyle={chartTooltip}
                          formatter={(value, name) => {
                            if (name === "turnover") {
                              return [fmtGBP(value), "Turnover"];
                            }

                            if (name === "opMargin") {
                              return [
                                `${Number(value).toFixed(1)}%`,
                                "Operating margin",
                              ];
                            }

                            return [value, name];
                          }}
                          labelFormatter={(_, payload) =>
                            payload?.[0]?.payload?.org || "Provider"
                          }
                        />
                        <Legend />
                        <Scatter
                          name="Providers"
                          data={scatterData}
                          fill="#a855f7"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel>
                  <h3 className="text-lg font-semibold">Sector medians</h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Quick reference where fields are detected
                  </p>

                  {sectorStats ? (
                    <div className="space-y-3 text-sm">
                      {[
                        ["Median turnover", fmtGBP(sectorStats.turnover?.median)],
                        [
                          "Median operating margin",
                          sectorStats.opMargin?.median == null
                            ? "—"
                            : `${sectorStats.opMargin.median.toFixed(1)}%`,
                        ],
                        [
                          "Median total assets",
                          fmtGBP(sectorStats.totalAssets?.median),
                        ],
                        ["Median debt", fmtGBP(sectorStats.debt?.median)],
                        [
                          "Median cash / debt",
                          sectorStats.cashToDebt?.median == null
                            ? "—"
                            : `${sectorStats.cashToDebt.median.toFixed(1)}%`,
                        ],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="text-slate-400">{label}</span>
                          <span className="font-semibold tabular-nums text-white">
                            {value}
                          </span>
                        </div>
                      ))}

                      <div className="my-4 h-px bg-white/10" />

                      <p className="text-xs text-slate-500">
                        These are computed from the uploaded CSV in-browser.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Not enough data yet.</p>
                  )}
                </Panel>
              </div>
            )}

            {activeTab === "table" && (
              <Panel>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Provider table</h3>
                    <p className="text-sm text-slate-400">
                      Showing up to 50 rows. Filter using search.
                    </p>
                  </div>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search provider…"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500 md:w-[280px]"
                  />
                </div>

                <div className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/50">
                  <table className="min-w-[920px] w-full text-sm">
                    <thead className="bg-white/5 text-slate-400">
                      <tr>
                        <th className="p-3 text-left">Organisation</th>
                        <th className="p-3 text-right">Turnover</th>
                        <th className="p-3 text-right">Op. surplus</th>
                        <th className="p-3 text-right">Op. margin</th>
                        <th className="p-3 text-right">Total assets</th>
                        <th className="p-3 text-right">Debt</th>
                        <th className="p-3 text-right">Cash</th>
                        <th className="p-3 text-right">Cash/Debt</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredTable.map((d) => (
                        <tr key={d.id} className="border-t border-white/10">
                          <td className="p-3 font-medium">{d.org}</td>
                          <td className="p-3 text-right tabular-nums">
                            {fmtGBP(d.turnover)}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {fmtGBP(d.opSurplus)}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {d.opMargin == null
                              ? "—"
                              : `${d.opMargin.toFixed(1)}%`}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {fmtGBP(d.totalAssets)}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {fmtGBP(d.debt)}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {fmtGBP(d.cash)}
                          </td>
                          <td className="p-3 text-right tabular-nums">
                            {d.cashToDebt == null
                              ? "—"
                              : `${d.cashToDebt.toFixed(1)}%`}
                          </td>
                        </tr>
                      ))}

                      {filteredTable.length === 0 && (
                        <tr>
                          <td className="p-6 text-slate-500" colSpan={8}>
                            No matching providers.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}
          </>
        )}

        <p className="text-xs text-slate-500">
          Tip: For an enterprise version, this pattern can be expanded into
          Power BI-style measures, workspace publishing, governance reporting and
          recurring dataset refresh.
        </p>
      </div>
    </section>
  );
}