
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Upload, Table2, BarChart3, Info, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter, Legend, PieChart, Pie, Cell } from "recharts";

// Minimal CSV parser (handles quoted fields, commas inside quotes, CRLF)
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
      // Avoid pushing trailing empty row
      if (row.some((c) => c !== "")) rows.push(row);
      row = [];
    } else {
      cur += ch;
    }
  }
  // last cell
  row.push(cur);
  if (row.some((c) => c !== "")) rows.push(row);

  const header = rows[0] || [];
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
  const s = String(val).trim();
  if (!s) return null;
  // remove currency symbols and thousands separators
  const cleaned = s
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
  if (a[base + 1] !== undefined) return a[base] + rest * (a[base + 1] - a[base]);
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

const COLORS = ["#0ea5e9", "#22c55e", "#a855f7", "#f97316", "#ef4444", "#64748b", "#14b8a6"]; 

export default function GA2020Dashboard() {
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const suggestedFields = useMemo(() => {
    if (!parsed?.header) return [];
    const h = parsed.header;
    const pick = (reList) => h.find((x) => reList.some((re) => re.test(String(x))));

    const orgName = pick([/provider|organisation|organization|name/i]);
    const turnover = pick([/turnover/i, /total\s*income/i, /^income$/i]);
    const opSurplus = pick([/operating\s*(surplus|deficit)/i]);
    const opEx = pick([/operating\s*expenditure/i, /total\s*operating\s*cost/i, /expenditure/i]);
    const totalAssets = pick([/total\s*assets/i]);
    const housingProps = pick([/fixed\s*assets.*housing\s*properties/i, /housing\s*properties/i]);
    const cash = pick([/cash\s*(and)?\s*cash\s*equivalents/i, /^cash$/i]);
    const debt = pick([/loans/i, /borrowings/i, /long\s*term\s*creditors/i, /total\s*debt/i]);

    return [
      { key: "orgName", label: "Organisation name", value: orgName },
      { key: "turnover", label: "Turnover / total income", value: turnover },
      { key: "opSurplus", label: "Operating surplus / deficit", value: opSurplus },
      { key: "opEx", label: "Operating expenditure", value: opEx },
      { key: "totalAssets", label: "Total assets", value: totalAssets },
      { key: "housingProps", label: "Housing properties (fixed assets)", value: housingProps },
      { key: "cash", label: "Cash & equivalents", value: cash },
      { key: "debt", label: "Debt / loans / borrowings", value: debt },
    ];
  }, [parsed]);

  const fieldMap = useMemo(() => {
    const map = {};
    for (const f of suggestedFields) map[f.key] = f.value;
    return map;
  }, [suggestedFields]);

  const dataset = useMemo(() => {
    if (!parsed?.data?.length) return null;
    const { data } = parsed;

    const rows = data
      .map((r, idx) => {
        const org = fieldMap.orgName ? (r[fieldMap.orgName] ?? "") : (r[parsed.header[0]] ?? "");
        const turnover = fieldMap.turnover ? toNumber(r[fieldMap.turnover]) : null;
        const opSurplus = fieldMap.opSurplus ? toNumber(r[fieldMap.opSurplus]) : null;
        const opEx = fieldMap.opEx ? toNumber(r[fieldMap.opEx]) : null;
        const totalAssets = fieldMap.totalAssets ? toNumber(r[fieldMap.totalAssets]) : null;
        const housingProps = fieldMap.housingProps ? toNumber(r[fieldMap.housingProps]) : null;
        const cash = fieldMap.cash ? toNumber(r[fieldMap.cash]) : null;
        const debt = fieldMap.debt ? toNumber(r[fieldMap.debt]) : null;

        const opMargin = turnover != null && opSurplus != null && turnover !== 0 ? (opSurplus / turnover) * 100 : null;
        const cashToDebt = cash != null && debt != null && debt !== 0 ? (cash / debt) * 100 : null;
        const assetsToDebt = totalAssets != null && debt != null && debt !== 0 ? (totalAssets / debt) : null;

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

    return rows;
  }, [parsed, fieldMap]);

  const sectorStats = useMemo(() => {
    if (!dataset?.length) return null;
    const pick = (k) => dataset.map((d) => d[k]).filter((x) => x != null && Number.isFinite(x));

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
    // Create buckets from turnover quartiles
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
      const i = d.turnover <= t.p25 ? 0 : d.turnover <= t.median ? 1 : d.turnover <= t.p75 ? 2 : 3;
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
    const rows = q ? dataset.filter((d) => d.org.toLowerCase().includes(q)) : dataset;
    return rows.slice(0, 50);
  }, [dataset, search]);

  const pie = useMemo(() => {
    if (!dataset?.length) return [];
    const top = [...dataset].filter((d) => d.turnover != null).sort((a, b) => b.turnover - a.turnover);
    const top5 = top.slice(0, 5);
    const rest = top.slice(5);
    const restSum = rest.reduce((s, d) => s + (d.turnover || 0), 0);
    const out = top5.map((d) => ({ name: d.org, value: d.turnover }));
    if (restSum > 0) out.push({ name: "All other providers", value: restSum });
    return out;
  }, [dataset]);

  function handleFile(file) {
    setError("");
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = String(e.target?.result || "");
      setRawText(text);
      try {
        const p = parseCSV(text);
        setParsed(p);
      } catch (err) {
        setError("Could not parse that CSV. Please check the file is a valid CSV export.");
      }
    };
    reader.onerror = () => setError("Could not read that file.");
    reader.readAsText(file);
  }

  function downloadSample() {
    const sample = [
      ["Organisation", "Turnover", "Operating surplus", "Operating expenditure", "Total assets", "Cash", "Debt"],
      ["Example HA A", 350000000, 18000000, 310000000, 4200000000, 90000000, 2500000000],
      ["Example HA B", 210000000, 9000000, 195000000, 2500000000, 40000000, 1400000000],
      ["Example HA C", 120000000, 3000000, 117000000, 1400000000, 22000000, 900000000],
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([sample], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ga2020_dashboard_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">GA2020 Sector Dashboard</h1>
            <p className="text-slate-600">Upload <span className="font-medium">GA2020_Datafile__-_consolidated.csv</span> to visualise income, costs, assets and leverage patterns across providers.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={downloadSample} className="rounded-2xl">
              <Download className="h-4 w-4 mr-2" /> Download sample CSV
            </Button>
            <label className="inline-flex items-center gap-2">
              <Input
                type="file"
                accept=".csv,text/csv"
                className="w-[260px] rounded-2xl bg-white"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        {!parsed && (
          <Alert className="rounded-2xl">
            <Info className="h-4 w-4" />
            <AlertTitle>How this works</AlertTitle>
            <AlertDescription>
              This page builds a lightweight dashboard in your browser. After you upload the CSV, it will automatically detect key fields (organisation name, turnover, operating surplus, assets, cash, debt) and plot sector patterns.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="rounded-2xl" variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {parsed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Upload className="h-4 w-4" /> Data loaded</CardTitle>
                <CardDescription>{parsed.data.length.toLocaleString()} rows • {parsed.header.length.toLocaleString()} columns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-slate-600">Detected fields:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestedFields.map((f) => (
                    <Badge key={f.key} variant={f.value ? "default" : "secondary"} className="rounded-full">
                      {f.label}: {f.value || "not found"}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-3" />
                <div className="text-xs text-slate-500">
                  If a field shows “not found”, the dashboard will still load but that metric won’t be charted.
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Sector snapshot (distribution)</CardTitle>
                <CardDescription>Turnover quartiles show how concentrated income is across providers.</CardDescription>
              </CardHeader>
              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionBars}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(v) => [v, "Providers"]} />
                    <Bar dataKey="count" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {parsed && (
          <Tabs defaultValue="concentration" className="space-y-4">
            <TabsList className="rounded-2xl bg-white shadow-sm">
              <TabsTrigger value="concentration" className="rounded-2xl"><BarChart3 className="h-4 w-4 mr-2" />Concentration</TabsTrigger>
              <TabsTrigger value="efficiency" className="rounded-2xl"><TrendingUp className="h-4 w-4 mr-2" />Income vs margin</TabsTrigger>
              <TabsTrigger value="table" className="rounded-2xl"><Table2 className="h-4 w-4 mr-2" />Table</TabsTrigger>
            </TabsList>

            <TabsContent value="concentration">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="rounded-2xl shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Top 5 share of turnover</CardTitle>
                    <CardDescription>Quick view of whether a small number of providers dominate sector income.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip formatter={(v) => fmtGBP(v)} />
                        <Legend />
                        <Pie data={pie} dataKey="value" nameKey="name" outerRadius={120}>
                          {pie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle>Top providers by turnover</CardTitle>
                    <CardDescription>Top 10 (as available)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topByTurnover.length === 0 ? (
                      <div className="text-sm text-slate-500">Turnover column not detected.</div>
                    ) : (
                      topByTurnover.map((d, i) => (
                        <div key={d.id} className="flex items-start justify-between gap-3">
                          <div className="text-sm">
                            <div className="font-medium leading-tight">{i + 1}. {d.org}</div>
                            <div className="text-slate-500">Operating margin: {d.opMargin == null ? "—" : `${d.opMargin.toFixed(1)}%`}</div>
                          </div>
                          <div className="text-sm font-semibold tabular-nums">{fmtGBP(d.turnover)}</div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="efficiency">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="rounded-2xl shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Turnover vs operating margin</CardTitle>
                    <CardDescription>Each dot is a provider. Large income does not always mean strong margin.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="turnover" tickFormatter={fmtGBP} name="Turnover" />
                        <YAxis dataKey="opMargin" tickFormatter={(v) => `${v}%`} name="Operating margin" />
                        <Tooltip
                          formatter={(value, name) => {
                            if (name === "turnover") return [fmtGBP(value), "Turnover"];
                            if (name === "opMargin") return [`${Number(value).toFixed(1)}%`, "Operating margin"];
                            return [value, name];
                          }}
                          labelFormatter={(_, payload) => payload?.[0]?.payload?.org || "Provider"}
                        />
                        <Legend />
                        <Scatter name="Providers" data={scatterData} fill="#a855f7" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle>Sector medians</CardTitle>
                    <CardDescription>Quick reference (where fields are detected)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {sectorStats ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Median turnover</span>
                          <span className="font-semibold tabular-nums">{fmtGBP(sectorStats.turnover?.median)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Median operating margin</span>
                          <span className="font-semibold tabular-nums">{sectorStats.opMargin?.median == null ? "—" : `${sectorStats.opMargin.median.toFixed(1)}%`}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Median total assets</span>
                          <span className="font-semibold tabular-nums">{fmtGBP(sectorStats.totalAssets?.median)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Median debt</span>
                          <span className="font-semibold tabular-nums">{fmtGBP(sectorStats.debt?.median)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Median cash / debt</span>
                          <span className="font-semibold tabular-nums">{sectorStats.cashToDebt?.median == null ? "—" : `${sectorStats.cashToDebt.median.toFixed(1)}%`}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="text-xs text-slate-500">
                          These are computed from the uploaded CSV in-browser.
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-500">Not enough data yet.</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3">
                    <span>Provider table</span>
                    <div className="w-[260px]"><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search provider…" className="rounded-2xl bg-white" /></div>
                  </CardTitle>
                  <CardDescription>Showing up to 50 rows (filter using search).</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto rounded-2xl border bg-white">
                    <table className="min-w-[920px] w-full text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          <th className="text-left p-3">Organisation</th>
                          <th className="text-right p-3">Turnover</th>
                          <th className="text-right p-3">Op. surplus</th>
                          <th className="text-right p-3">Op. margin</th>
                          <th className="text-right p-3">Total assets</th>
                          <th className="text-right p-3">Debt</th>
                          <th className="text-right p-3">Cash</th>
                          <th className="text-right p-3">Cash/Debt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTable.map((d) => (
                          <tr key={d.id} className="border-t">
                            <td className="p-3 font-medium">{d.org}</td>
                            <td className="p-3 text-right tabular-nums">{fmtGBP(d.turnover)}</td>
                            <td className="p-3 text-right tabular-nums">{fmtGBP(d.opSurplus)}</td>
                            <td className="p-3 text-right tabular-nums">{d.opMargin == null ? "—" : `${d.opMargin.toFixed(1)}%`}</td>
                            <td className="p-3 text-right tabular-nums">{fmtGBP(d.totalAssets)}</td>
                            <td className="p-3 text-right tabular-nums">{fmtGBP(d.debt)}</td>
                            <td className="p-3 text-right tabular-nums">{fmtGBP(d.cash)}</td>
                            <td className="p-3 text-right tabular-nums">{d.cashToDebt == null ? "—" : `${d.cashToDebt.toFixed(1)}%`}</td>
                          </tr>
                        ))}
                        {filteredTable.length === 0 && (
                          <tr>
                            <td className="p-6 text-slate-500" colSpan={8}>No matching providers.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <div className="text-xs text-slate-500">
          Tip: If you’d rather build this as a shareable enterprise dashboard, Power BI is ideal: import the CSV, create measures for Operating Margin and Cash/Debt, then publish to a workspace.
        </div>
      </div>
    </div>
  );
}
