export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type ModeId =
  | "personal"
  | "worksite"
  | "transit"
  | "events"
  | "urban";

export interface ModeConfig {
  id: ModeId;
  label: string;
  short: string;
  offset: number;
  audience: string;
  zoneNames: [string, string, string];
  actions: Record<RiskLevel, string>;
}

export const MODES: ModeConfig[] = [
  {
    id: "personal",
    label: "Personal Heat Safety",
    short: "Personal",
    offset: 0,
    audience: "Individual exposure profile",
    zoneNames: ["Riverside Park", "Metro Arcade", "Home Block"],
    actions: {
      LOW: "Conditions are comfortable. Stay hydrated and keep light sun protection on hand.",
      MODERATE:
        "Limit continuous sun exposure to 30 minutes. Drink 250ml water every half hour.",
      HIGH: "Move activities indoors or into shade. Avoid strenuous effort until the peak passes.",
      CRITICAL:
        "Stop outdoor activity now. Relocate to an air-conditioned space and monitor for dizziness, nausea or cramping.",
    },
  },
  {
    id: "worksite",
    label: "Worksite / Outdoor Workers",
    short: "Worksite",
    offset: 1.4,
    audience: "Crew of 48 on open-air site",
    zoneNames: ["North Yard", "Equipment Bay", "Site Perimeter"],
    actions: {
      LOW: "Standard operations. Maintain normal hydration rotation for all crews.",
      MODERATE:
        "Introduce a 10-minute shaded break every hour and reschedule heavy lifting after 16:00.",
      HIGH: "Suspend non-essential tasks. Enforce buddy checks and 15-minute cooling breaks every 45 minutes.",
      CRITICAL:
        "Activate heat-response protocol. Reduce outdoor exposure and relocate personnel to designated cooling zones immediately.",
    },
  },
  {
    id: "transit",
    label: "Transportation Hubs",
    short: "Transit",
    offset: 2.1,
    audience: "Central Interchange • 21k passengers/hr",
    zoneNames: ["Platform 4 Canopy", "Concourse West", "Underground Hall"],
    actions: {
      LOW: "Normal passenger flow. Keep hydration points stocked at platform entries.",
      MODERATE:
        "Open shaded waiting areas and push comfort advisories to platform displays.",
      HIGH: "Deploy misting fans on exposed platforms and stage medical staff at the concourse.",
      CRITICAL:
        "Activate heat-response protocol. Redirect boarding queues into cooled concourse halls and extend dwell times to prevent crowd overheating.",
    },
  },
  {
    id: "events",
    label: "Events & Mass Gatherings",
    short: "Events",
    offset: 1.8,
    audience: "Open-air venue • 12,400 attendees",
    zoneNames: ["Main Field", "Vendor Row", "Shaded Terrace"],
    actions: {
      LOW: "Event may proceed as scheduled. Keep water stations visible on the field map.",
      MODERATE:
        "Announce hydration reminders every 20 minutes and open all shade structures.",
      HIGH: "Pause high-intensity programming and open cooled hospitality areas to general attendees.",
      CRITICAL:
        "Activate heat-response protocol. Halt field programming, open all cooling zones and begin staged crowd relocation from unshaded sections.",
    },
  },
  {
    id: "urban",
    label: "Urban Heat Intelligence",
    short: "Urban",
    offset: 2.6,
    audience: "District 7 • 4.2 km² monitored",
    zoneNames: ["Canal Green", "Civic Plaza", "Industrial Strip"],
    actions: {
      LOW: "No district action required. Continue routine microclimate monitoring.",
      MODERATE:
        "Notify neighbourhood coordinators and pre-position water at high-footfall corners.",
      HIGH: "Open public cooling centres and issue an advisory to vulnerable-resident registries.",
      CRITICAL:
        "Activate heat-response protocol. Escalate to city emergency management, open every cooling centre and dispatch welfare checks in the hotspot corridor.",
    },
  },
];

export const RISK_ORDER: RiskLevel[] = ["LOW", "MODERATE", "HIGH", "CRITICAL"];

export const RISK_STYLES: Record<
  RiskLevel,
  { text: string; bg: string; border: string; dot: string; glow: string }
> = {
  LOW: {
    text: "text-risk-low",
    bg: "bg-risk-low/12",
    border: "border-risk-low/40",
    dot: "bg-risk-low",
    glow: "shadow-[0_0_40px_-8px_var(--risk-low)]",
  },
  MODERATE: {
    text: "text-risk-moderate",
    bg: "bg-risk-moderate/12",
    border: "border-risk-moderate/40",
    dot: "bg-risk-moderate",
    glow: "shadow-[0_0_40px_-8px_var(--risk-moderate)]",
  },
  HIGH: {
    text: "text-risk-high",
    bg: "bg-risk-high/12",
    border: "border-risk-high/40",
    dot: "bg-risk-high",
    glow: "shadow-[0_0_40px_-8px_var(--risk-high)]",
  },
  CRITICAL: {
    text: "text-risk-critical",
    bg: "bg-risk-critical/14",
    border: "border-risk-critical/50",
    dot: "bg-risk-critical",
    glow: "shadow-[0_0_48px_-6px_var(--risk-critical)]",
  },
};

export const BASELINE = 33.4;
export const START_HOUR = 8;
export const END_HOUR = 18;

/** Deterministic diurnal heat curve, peaking mid-afternoon. */
export function temperatureAt(hour: number, offset: number): number {
  const t = Math.min(Math.max(hour, START_HOUR - 1), END_HOUR + 1);
  const peak = 15.2;
  const spread = 4.1;
  const amplitude = 9.8;
  const base = 27.4;
  const bell = Math.exp(-((t - peak) ** 2) / (2 * spread ** 2));
  const ripple = Math.sin((t - START_HOUR) * 1.7) * 0.32;
  return base + amplitude * bell + ripple + offset;
}

export function riskFromTemp(temp: number, rate: number): RiskLevel {
  const score = temp + rate * 1.6;
  if (score >= 41.5) return "CRITICAL";
  if (score >= 38.5) return "HIGH";
  if (score >= 35.5) return "MODERATE";
  return "LOW";
}

export function formatHour(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}
