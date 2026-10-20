import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clampInput,
  compute,
  defaultInput,
  loadInput,
  presets,
  saveInput,
  type CalcInput,
} from "@/lib/calculator";
import { ksh, litres } from "@/lib/money";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
  head: () => ({
    meta: [
      { title: "Milk income calculator · Dairy Farmers Hub" },
      {
        name: "description",
        content:
          "Estimate daily and monthly milk income in Kenyan shillings after feed, labour, vet, and transport.",
      },
    ],
  }),
});

function CalculatorPage() {
  const [input, setInput] = useState<CalcInput>(defaultInput);
  const [ready, setReady] = useState(false);
  const [chartOn, setChartOn] = useState(false);

  useEffect(() => {
    const stored = loadInput();
    if (stored) setInput(stored);
    setReady(true);
    setChartOn(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveInput(input);
  }, [input, ready]);

  const result = useMemo(() => compute(input), [input]);
  const activePreset = presets.find(
    (preset) => JSON.stringify(clampInput(preset.input)) === JSON.stringify(clampInput(input)),
  );

  const set = (key: keyof CalcInput) => (value: number) => {
    setInput((current) => clampInput({ ...current, [key]: value }));
  };

  const rows = [
    { name: "Dairy meal", amount: input.feed },
    { name: "Fodder", amount: input.fodder },
    { name: "Labour", amount: input.labour },
    { name: "Vet and AI", amount: input.vet },
    { name: "Transport", amount: input.transport },
    { name: result.net >= 0 ? "Left over" : "Shortfall", amount: Math.abs(result.net), tone: "net" as const },
  ];

  const story = narrate(input, result);

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-semibold text-forest">Calculator</p>
        <h1 className="mt-2 max-w-3xl font-display text-title font-medium tracking-tight">
          What the milk is worth this month
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Litres, the price you were actually paid, and the cash that left the farm. Family meals, school fees, and loan principal sit outside this sum — add them in your notebook if you need the whole picture.
        </p>

        <div className="mt-8 flex flex-col gap-2">
          <p className="text-sm font-semibold text-ink">Start from a herd like yours</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setInput(preset.input)}
                className={cn(
                  "min-h-11 rounded-sm border px-4 text-left text-sm transition-colors duration-150 ease-smooth",
                  activePreset?.id === preset.id
                    ? "border-forest bg-forest text-paper"
                    : "border-line bg-card text-ink hover:bg-paper-2",
                )}
              >
                <span className="block font-semibold">{preset.label}</span>
                <span className={activePreset?.id === preset.id ? "text-paper" : "text-muted"}>
                  {preset.detail}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <form
            className="flex flex-col gap-6 rounded-sheet border border-line bg-card p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl">The herd</legend>
              <NumberField id="cows" label="Cows in milk" value={input.cows} onChange={set("cows")} step={1} />
              <NumberField
                id="litres"
                label="Litres per cow per day"
                value={input.litresPerCow}
                onChange={set("litresPerCow")}
                step={0.5}
              />
              <NumberField
                id="price"
                label="Price per litre (KSh)"
                hint="Use the last price you were paid. Highland centres often land somewhere between KSh 40 and 60, depending on season and quality."
                value={input.price}
                onChange={set("price")}
                step={1}
              />
              <NumberField
                id="days"
                label="Days in this month"
                value={input.days}
                onChange={set("days")}
                min={1}
                max={31}
              />
              <NumberField
                id="loss"
                label="Litres lost or rejected (%)"
                hint="Spoilage, spillage, calf milk, and cans sent home."
                value={input.lossPercent}
                onChange={set("lossPercent")}
                max={100}
                step={0.5}
              />
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl">Cash costs this month</legend>
              <NumberField id="feed" label="Dairy meal (KSh)" value={input.feed} onChange={set("feed")} step={100} />
              <NumberField
                id="fodder"
                label="Fodder and minerals (KSh)"
                hint="Put 0 if you only cut your own napier and buy nothing else."
                value={input.fodder}
                onChange={set("fodder")}
                step={100}
              />
              <NumberField
                id="labour"
                label="Paid labour (KSh)"
                hint="Leave at 0 if the family milks unpaid. The result will look kinder than the hours feel."
                value={input.labour}
                onChange={set("labour")}
                step={100}
              />
              <NumberField id="vet" label="Vet, AI, and dips (KSh)" value={input.vet} onChange={set("vet")} step={100} />
              <NumberField
                id="transport"
                label="Transport to the cooler (KSh)"
                value={input.transport}
                onChange={set("transport")}
                step={100}
              />
            </fieldset>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="secondary" onClick={() => setInput(defaultInput)}>
                Reset to one cow
              </Button>
              <p className="text-sm text-muted">{ready ? "Kept on this device." : "Loading your last figures…"}</p>
            </div>
          </form>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="rounded-sheet bg-forest p-6 text-paper">
              <p className="text-sm font-semibold text-foam">Left after cash costs</p>
              <p className="mt-2 font-display text-title tabular-nums sm:text-display">{ksh(result.net)}</p>
              <p className="mt-3 text-base text-foam">{story}</p>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Sold per day" value={litres(result.litresSoldDay)} />
              <Stat label="Sold this month" value={litres(result.litresMonth)} />
              <Stat label="Gross this month" value={ksh(result.grossMonth)} />
              <Stat label="About per day, before costs" value={ksh(result.grossDay)} />
              <Stat label="Per cow, after costs" value={ksh(result.netPerCow)} />
              <Stat label="Break-even price" value={result.litresMonth > 0 ? `${ksh(result.breakEven)} / L` : "—"} />
            </dl>

            <p className="text-sm text-muted">
              {result.litresMonth > 0
                ? `A drop of KSh 5 a litre would take about ${ksh(result.priceDropHit)} off this month.`
                : "Add cows and litres to see how a price change would land."}
            </p>

            <div className="rounded-sheet border border-line bg-card p-4">
              <h2 className="font-display text-lg">Where the month goes</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {rows.map((row) => (
                  <li key={row.name} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-muted">{row.name}</span>
                    <span className="font-semibold tabular-nums">{ksh(row.amount)}</span>
                  </li>
                ))}
              </ul>
              {chartOn && result.grossMonth > 0 ? (
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rows} layout="vertical" margin={{ left: 16, right: 8, top: 8, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={88}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "var(--color-paper-2)" }}
                        formatter={(value) => ksh(Number(value))}
                        contentStyle={{
                          background: "var(--color-card)",
                          border: "1px solid var(--color-line)",
                          borderRadius: "8px",
                          color: "var(--color-ink)",
                        }}
                      />
                      <Bar dataKey="amount" barSize={14} radius={[0, 4, 4, 0]}>
                        {rows.map((row) => (
                          <Cell
                            key={row.name}
                            fill={row.tone === "net" ? "var(--color-forest)" : "var(--color-ink)"}
                            fillOpacity={row.tone === "net" ? 1 : 0.55}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function narrate(
  input: CalcInput,
  result: ReturnType<typeof compute>,
): string {
  if (input.cows <= 0 || input.litresPerCow <= 0) {
    return "Enter the cows in milk and the litres each one gives.";
  }
  const labour =
    input.labour <= 0 ? " Family time is not in the costs yet." : "";
  if (result.net >= 0) {
    return `At ${ksh(input.price)} a litre, cash costs are covered, with about ${ksh(result.netPerCow)} left per cow.${labour}`;
  }
  return `Cash costs are about ${ksh(Math.abs(result.net))} above milk income. Look first at dairy meal, rejected litres, and the price.${labour}`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-xl tabular-nums">{value}</dd>
    </div>
  );
}

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onWheel={(event) => event.currentTarget.blur()}
        onChange={(event) => {
          const next = event.target.value === "" ? 0 : Number(event.target.value);
          onChange(Number.isFinite(next) ? next : 0);
        }}
      />
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
