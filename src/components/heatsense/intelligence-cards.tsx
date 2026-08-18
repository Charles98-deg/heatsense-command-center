import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, Gauge, ShieldAlert, Thermometer, TrendingUp } from "lucide-react";
import { RISK_ORDER, RISK_STYLES } from "@/lib/heatsense";
import { RiskBadge } from "./risk-badge";
import { cn } from "@/lib/utils";
import type { HeatSimulation } from "@/hooks/use-heat-simulation";

function CardShell({
  index,
  title,
  icon,
  children,
  className,
}: {
  index: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel flex flex-col gap-4 p-5", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-lg border border-border bg-secondary/60 text-muted-foreground">
          {icon}
        </span>
        <h2 className="text-sm font-medium">
          <span className="text-muted-foreground">{index}. </span>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-raised px-3 py-2">
      <p className="label-caps">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

export function IntelligenceCards({ sim }: { sim: HeatSimulation }) {
  const styles = RISK_STYLES[sim.risk];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <CardShell index={1} title="What is happening?" icon={<Thermometer className="size-4" />}>
        <div className="flex items-end gap-3">
          <p className="text-6xl font-semibold tracking-tighter tabular-nums">
            {sim.current.toFixed(1)}
            <span className="text-3xl text-muted-foreground">°C</span>
          </p>
          <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-risk-high/40 bg-risk-high/10 px-2.5 py-1 text-xs text-risk-high">
            <ArrowUpRight className="size-3.5" />
            {sim.rate >= 0 ? "+" : ""}
            {sim.rate.toFixed(1)}°C/hr
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full heat-gradient-bar opacity-70" />
        <div className="grid grid-cols-3 gap-2">
          <Metric label="Rate of change" value={`${sim.rate >= 0 ? "+" : ""}${sim.rate.toFixed(1)}°C/hr`} />
          <Metric label="Persistence" value={`${sim.persistence.toFixed(1)} hrs`} />
          <Metric
            label="Baseline dev."
            value={`${sim.deviation >= 0 ? "+" : ""}${sim.deviation.toFixed(1)}°C`}
          />
        </div>
      </CardShell>

      <CardShell index={2} title="What is coming?" icon={<TrendingUp className="size-4" />}>
        <div className="flex items-end justify-between gap-4">
          <p className="text-5xl font-semibold tracking-tighter tabular-nums">
            {sim.forecast60.toFixed(1)}
            <span className="text-2xl text-muted-foreground">°C</span>
          </p>
          <p className="pb-2 text-xs text-muted-foreground">
            forecast in <span className="text-foreground">60 mins</span> • 3-hour outlook
          </p>
        </div>
        <div className="h-40 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sim.forecastSeries} margin={{ top: 6, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="heatFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--risk-critical)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--risk-critical)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 1", "dataMax + 1"]}
                width={40}
                tickFormatter={(v: number) => `${Math.round(v)}°`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--popover-foreground)",
                }}
                formatter={(v: number) => [`${v.toFixed(1)}°C`, "Forecast"]}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="var(--risk-high)"
                strokeWidth={2}
                fill="url(#heatFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardShell>

      <CardShell index={3} title="How serious is it?" icon={<Gauge className="size-4" />}>
        <div className={cn("rounded-xl border p-6 text-center", styles.border, styles.bg)}>
          <p className="label-caps">Composite heat risk</p>
          <div className="mt-3 flex justify-center">
            <RiskBadge level={sim.risk} size="lg" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Model output: {sim.computedRisk}
            {sim.riskOverride ? " (manual preview active)" : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {RISK_ORDER.map((level) => {
            const s = RISK_STYLES[level];
            const active = sim.riskOverride === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => sim.setRiskOverride(active ? null : level)}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-[11px] font-semibold tracking-wider uppercase transition-all",
                  s.border,
                  s.text,
                  active ? cn(s.bg, s.glow) : "bg-transparent opacity-70 hover:opacity-100",
                )}
              >
                {level}
              </button>
            );
          })}
        </div>
      </CardShell>

      <CardShell index={4} title="What should I do?" icon={<ShieldAlert className="size-4" />}>
        <div className={cn("rounded-xl border p-5", styles.border, styles.bg, styles.glow)}>
          <p className={cn("label-caps", styles.text)}>Recommended action</p>
          <p className="mt-2 text-base leading-relaxed font-medium">
            {sim.mode.actions[sim.risk]}
          </p>
        </div>
        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-raised px-3 py-2">
            Context: <span className="text-foreground">{sim.mode.label}</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised px-3 py-2">
            Trigger window: <span className="text-foreground">next 60 minutes</span>
          </div>
        </div>
      </CardShell>
    </div>
  );
}
