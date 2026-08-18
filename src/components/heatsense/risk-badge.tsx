import { cn } from "@/lib/utils";
import { RISK_STYLES, type RiskLevel } from "@/lib/heatsense";

export function RiskBadge({
  level,
  size = "sm",
  className,
}: {
  level: RiskLevel;
  size?: "sm" | "lg";
  className?: string;
}) {
  const s = RISK_STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-semibold tracking-[0.16em] uppercase",
        s.bg,
        s.border,
        s.text,
        size === "lg" ? "px-6 py-3 text-lg" : "px-3 py-1 text-[11px]",
        size === "lg" && s.glow,
        className,
      )}
    >
      <span className={cn("size-2 rounded-full pulse-dot", s.dot)} />
      {level}
    </span>
  );
}
