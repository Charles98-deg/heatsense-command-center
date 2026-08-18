import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeatSimulation } from "@/hooks/use-heat-simulation";

export function ExplainabilityPanel({ sim }: { sim: HeatSimulation }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className="grid size-7 place-items-center rounded-lg border border-border bg-secondary/60 text-primary">
          <Brain className="size-4" />
        </span>
        <div>
          <h2 className="text-sm font-medium">Risk Model Explainability</h2>
          <p className="label-caps mt-0.5">Why this risk level was triggered</p>
        </div>
        <ChevronDown
          className={cn(
            "ml-auto size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="grid gap-6 border-t border-border px-5 py-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            {sim.drivers.map((d) => (
              <div key={d.label}>
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="text-foreground">{d.label}</span>
                  <span className="text-muted-foreground">
                    {d.status} • {d.value}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full heat-gradient-bar transition-[width] duration-500"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-primary/35 bg-primary/8 p-5 shadow-[0_0_50px_-24px_var(--primary)]">
            <p className="label-caps text-primary">AI reasoning</p>
            <p className="mt-2 text-sm leading-relaxed">
              <span className="font-semibold">Why {sim.risk}?</span> Temperature is{" "}
              {sim.deviation >= 0 ? "+" : ""}
              {sim.deviation.toFixed(1)}°C from the historical baseline, the warming rate is{" "}
              {sim.rate.toFixed(1)}°C/hr, heat has persisted for {sim.persistence.toFixed(1)} hours,
              and the forecast reaches {sim.forecast60.toFixed(1)}°C within 60 minutes — unsafe
              persistence past the exposure threshold.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
