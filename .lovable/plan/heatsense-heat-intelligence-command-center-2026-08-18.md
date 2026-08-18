# HeatSense — Heat Intelligence Command Center

A single-page, dark-theme decision-support dashboard styled like a high-tech climate command center (inspired by the reference dashboards: deep slate canvas, glowing accents, dense card grid, crisp small-caps labels).

## Scope

Front-end only, built at `/` (replacing the placeholder). All temperature, forecast and risk data comes from a local simulation engine so the demo runs deterministically without network calls. The FortyGuard API is represented as a status badge and data-source label; wiring the real API can follow later.

## Screen structure

1. **Header** — HeatSense flame/thermostat mark with a soft glow, pill badge "Engine v1.0 • Powered by FortyGuard API", right side: live clock, "● Connected to FortyGuard" pulsing badge, "Last update 12:41 PM", and a Live Stream / Historical Backtest toggle.
2. **Mode tabs** — Personal Heat Safety, Worksite / Outdoor Workers, Transportation Hubs, Events & Mass Gatherings, Urban Heat Intelligence. Switching mode changes thresholds, recommendation copy, and zone labels.
3. **Four intelligence cards** (2x2 on desktop, stacked on mobile):
   - What is happening? — large current temp, rate of change, persistence hours, baseline deviation.
   - What is coming? — forecast peak in 60 min plus a 3-hour sparkline (Recharts area/line).
   - How serious is it? — glowing risk badge with LOW / MODERATE / HIGH / CRITICAL toggle buttons to preview each colour state.
   - What should I do? — highlighted action box with contextual protocol text per mode and risk level.
4. **Risk Model Explainability** — collapsible panel with four animated horizontal driver bars (temperature vs threshold, escalation rate, persistence, hotspot proximity) and an AI reasoning callout that reads back the live numbers.
5. **Spatial intelligence** — CSS/SVG thermal grid heatmap (green → deep red) with hoverable zones, plus a sidebar comparing Zone C (current), Zone A and Zone B with their temps and risk chips and a "Guide to Lower-Risk Zone" CTA.
6. **Simulation control bar** — fixed to the bottom: 08:00–18:00 slider with Play / Pause / Step Forward. Advancing time drives every number on the page, fires an early anomaly alert before peak heat, and re-colours badges and the heatmap.
7. **Footer trust layer** — "Data Source: FortyGuard Temperature API • Forecast MAE: 1.2°C • Model Confidence: 94%" and the safety disclaimer.

## Technical notes

- Route: rewrite `src/routes/index.tsx` with a route-level `head()` (title, description, og/twitter tags).
- Design tokens added to `src/styles.css`: slate command-center base (#0F172A family), risk colours (emerald / amber / orange / crimson) with glow shadow tokens and gradient tokens. No hardcoded colour utilities in components.
- Simulation state lives in one `useHeatSimulation` hook (current hour, playing state, mode, manual risk override) that derives temperature curve, rate of change, persistence, drivers, and zone temps. Components are presentational and read from it.
- Charts via existing Recharts; icons via lucide-react; existing shadcn card/badge/tabs/slider/progress/collapsible primitives reused.
- Components under `src/components/heatsense/`: Header, ModeTabs, StatusBar, IntelligenceCards, ExplainabilityPanel, ThermalMap, ZoneComparison, SimulationBar, TrustFooter.
- Responsive down to mobile; the simulation bar collapses to a compact strip on small screens.
