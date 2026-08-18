import { MapPin, Navigation, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "./risk-badge";
import { cn } from "@/lib/utils";
import type { HeatSimulation } from "@/hooks/use-heat-simulation";

const GRID = 12;

function cellColor(intensity: number) {
  const stops = [
    "var(--risk-low)",
    "var(--risk-moderate)",
    "var(--risk-high)",
    "var(--risk-critical)",
  ];
  const idx = Math.min(stops.length - 1, Math.floor(intensity * stops.length));
  return stops[idx];
}

export function SpatialIntelligence({ sim }: { sim: HeatSimulation }) {
  const heatCenter = { x: 7.5, y: 4.5 };
  const bias = Math.min(1, Math.max(0, (sim.current - 30) / 12));

  return (
    <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="panel p-5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg border border-border bg-secondary/60 text-primary">
            <Layers className="size-4" />
          </span>
          <h2 className="text-sm font-medium">Spatial Thermal Intelligence</h2>
          <span className="ml-auto text-xs text-muted-foreground">
            Microclimate grid • 250m resolution
          </span>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-background">
          <div
            className="grid gap-px p-px"
            style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: GRID * GRID / 1.5 }).map((_, i) => {
              const x = i % GRID;
              const y = Math.floor(i / GRID);
              const dist = Math.hypot(x - heatCenter.x, y - heatCenter.y);
              const intensity = Math.max(0, Math.min(0.999, (1 - dist / 9) * (0.45 + bias)));
              return (
                <div
                  key={i}
                  className="aspect-square transition-colors duration-500"
                  style={{
                    backgroundColor: cellColor(intensity),
                    opacity: 0.16 + intensity * 0.8,
                  }}
                />
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <span className="absolute top-[38%] left-[60%] -translate-x-1/2 rounded-full border border-risk-critical/60 bg-background/80 px-2.5 py-1 text-[10px] font-medium text-risk-critical backdrop-blur">
              Zone C • You
            </span>
            <span className="absolute top-[18%] left-[18%] rounded-full border border-risk-moderate/50 bg-background/80 px-2.5 py-1 text-[10px] text-risk-moderate backdrop-blur">
              Zone A
            </span>
            <span className="absolute bottom-[14%] left-[30%] rounded-full border border-risk-low/50 bg-background/80 px-2.5 py-1 text-[10px] text-risk-low backdrop-blur">
              Zone B
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>Cooler</span>
          <span className="h-1.5 flex-1 rounded-full heat-gradient-bar" />
          <span>Hotter</span>
        </div>
      </div>

      <div className="panel flex flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg border border-border bg-secondary/60 text-primary">
            <MapPin className="size-4" />
          </span>
          <h2 className="text-sm font-medium">Safe Zone Recommendation</h2>
        </div>

        <div className="mt-4 space-y-3">
          {sim.zones.map((z, i) => (
            <div
              key={z.id}
              className={cn(
                "rounded-xl border p-4",
                i === 0
                  ? "border-risk-critical/40 bg-risk-critical/8"
                  : "border-border bg-surface-raised",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {i === 0 ? "Current Location" : `Alternative Option ${z.id}`} ({z.code})
                  </p>
                  <p className="text-xs text-muted-foreground">{z.name}</p>
                </div>
                <RiskBadge level={z.risk} />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
                {z.temp.toFixed(1)}
                <span className="text-base text-muted-foreground">°C</span>
                {i > 0 && (
                  <span className="ml-2 text-xs font-normal text-risk-low">
                    {(z.temp - (sim.zones[0]?.temp ?? z.temp)).toFixed(1)}°C cooler
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        <Button className="mt-5 w-full gap-2 shadow-[0_0_36px_-12px_var(--primary)]">
          <Navigation className="size-4" />
          Guide to Lower-Risk Zone
        </Button>
      </div>
    </section>
  );
}
