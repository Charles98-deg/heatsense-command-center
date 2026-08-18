import { useEffect, useState } from "react";
import { Activity, Clock, History, Radio } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { formatHour } from "@/lib/heatsense";
import { cn } from "@/lib/utils";

export function StatusBar({
  hour,
  liveMode,
  onLiveModeChange,
  audience,
}: {
  hour: number;
  liveMode: boolean;
  onLiveModeChange: (v: boolean) => void;
  audience: string;
}) {
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2 font-medium text-foreground">
        <Clock className="size-3.5 text-primary" />
        {clock ?? "--:--:--"}
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-risk-low/40 bg-risk-low/10 px-3 py-1 text-risk-low">
        <span className="size-1.5 rounded-full bg-risk-low pulse-dot" />
        Connected to FortyGuard
      </span>
      <span className="inline-flex items-center gap-2">
        <Activity className="size-3.5" />
        Last update {formatHour(hour)}
      </span>
      <span className="hidden md:inline">{audience}</span>

      <div className="ml-auto inline-flex items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5",
            liveMode ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Radio className="size-3.5" /> Live Stream
        </span>
        <Switch
          checked={!liveMode}
          onCheckedChange={(v) => onLiveModeChange(!v)}
          aria-label="Toggle historical backtest mode"
        />
        <span
          className={cn(
            "inline-flex items-center gap-1.5",
            !liveMode ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <History className="size-3.5" /> Historical Backtest
        </span>
      </div>
    </div>
  );
}
