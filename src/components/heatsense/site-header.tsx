import { Flame } from "lucide-react";
import { MODES, type ModeId } from "@/lib/heatsense";
import { cn } from "@/lib/utils";

export function SiteHeader({
  modeId,
  onModeChange,
}: {
  modeId: ModeId;
  onModeChange: (id: ModeId) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="relative grid size-10 place-items-center rounded-xl border border-primary/40 bg-primary/12 shadow-[0_0_32px_-6px_var(--primary)]">
            <Flame className="size-5 text-primary" />
          </span>
          <div>
            <h1 className="text-lg leading-none font-semibold tracking-tight">
              HeatSense
            </h1>
            <p className="label-caps mt-1">Heat Intelligence Engine</p>
          </div>
          <span className="ml-1 hidden rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] text-muted-foreground lg:inline">
            Engine v1.0 • Powered by FortyGuard API
          </span>
        </div>

        <nav className="order-3 flex w-full gap-1 overflow-x-auto rounded-full border border-border bg-secondary/40 p-1 lg:order-none lg:ml-auto lg:w-auto">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                modeId === m.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_28px_-10px_var(--primary)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
