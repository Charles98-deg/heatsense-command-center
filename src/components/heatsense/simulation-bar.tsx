import { AlertTriangle, Pause, Play, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { END_HOUR, START_HOUR, formatHour } from "@/lib/heatsense";
import { RiskBadge } from "./risk-badge";
import type { HeatSimulation } from "@/hooks/use-heat-simulation";

export function SimulationBar({ sim }: { sim: HeatSimulation }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
      {sim.anomaly && (
        <div className="flex items-center justify-center gap-2 border-b border-risk-moderate/30 bg-risk-moderate/10 px-4 py-1.5 text-[11px] text-risk-moderate">
          <AlertTriangle className="size-3.5" />
          Early warning: abnormal escalation detected {formatHour(sim.hour)} — peak heat expected
          within the hour.
        </div>
      )}
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant={sim.playing ? "secondary" : "default"}
            onClick={() => sim.setPlaying(!sim.playing)}
            aria-label={sim.playing ? "Pause simulation" : "Play simulation"}
          >
            {sim.playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
          <Button size="icon" variant="secondary" onClick={sim.step} aria-label="Step forward">
            <SkipForward className="size-4" />
          </Button>
        </div>

        <div className="flex min-w-[220px] flex-1 items-center gap-3">
          <span className="label-caps">08:00</span>
          <Slider
            value={[sim.hour]}
            min={START_HOUR}
            max={END_HOUR}
            step={0.25}
            onValueChange={([v]) => sim.setHour(v)}
            aria-label="Simulation time"
          />
          <span className="label-caps">18:00</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium tabular-nums">{formatHour(sim.hour)}</span>
          <span className="tabular-nums text-muted-foreground">
            {sim.current.toFixed(1)}°C
          </span>
          <RiskBadge level={sim.risk} />
        </div>
      </div>
    </div>
  );
}
