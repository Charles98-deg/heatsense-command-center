# HeatSense Command Center

use the images as reference as your design style.

Build a modern, high-density decision-support web application dashboard for HeatSense, a Heat Intelligence Engine powered by the FortyGuard API. The visual design should resemble a high-tech climate command center using a dark theme (slate/zinc background #0F172A), crisp typography, glowing status indicators, and sleek data visualization cards.
Top Navigation & Context Switcher
* Header: Display the logo mark "HeatSense" with a glowing flame/thermostat icon and a subtle pill badge: Engine v1.0 • Powered by FortyGuard API.
* Application Mode Selector: A tab navigation menu allowing the user to switch context views between:
* Personal Heat Safety
* Worksite / Outdoor Workers
* Transportation Hubs
* Events & Mass Gatherings
* Urban Heat Intelligence
* Top Status Bar: Show a real-time clock, a live API status badge (● Connected to FortyGuard), last update timestamp (12:41 PM), and a toggle switch between Live Stream and Historical Backtest Mode.
Hero Dashboard Grid (The 4 Core Intelligence Questions)
Create four visual cards side-by-side (or in a 2x2 grid) answering the main product questions directly:
| Card Title | Main Display Metric | Visual Sub-elements |
|---|---|---|
| 1. What is happening? | 38.7°C (Large font) | Rate of change indicator (+2.4°C/hr), Heat Persistence metric (3 hrs), Baseline Deviation (+4.2°C above normal). |
| 2. What is coming? | 42.1°C in 60 mins | Mini Sparkline/Line Chart showing the forecast temperature curve escalating over the next 1–3 hours. |
| 3. How serious is it? | Glowing Risk Badge: CRITICAL | Include interactive toggle state buttons to test colors: LOW (Emerald Green), MODERATE (Amber Yellow), HIGH (Orange), CRITICAL (Crimson Red). |
| 4. What should I do? | Primary Action Card | Highlighted alert box displaying contextual recommendation rules: "Activate heat-response protocol. Reduce outdoor exposure and relocate personnel to designated cooling zones immediately." |
Explainability & Risk Drivers Panel ("Why?")
Directly underneath the hero cards, render an expandable section titled "Risk Model Explainability" detailing why the specific risk level was triggered:
* Visual horizontal progress bars indicating contributing risk drivers:
* Current Temperature vs. Threshold (High)
* Rate of Heat Escalation (Abnormal)
* Heat Persistence Duration (Extended)
* Spatial Hotspot Proximity (Critical)
* An explicit AI Reasoning callout box: "Why CRITICAL? Temperature is +4.2°C above historical baseline, warming rate exceeds 2.0°C/hr, and forecast predicts unsafe persistence past 60 minutes."
Spatial Intelligence & Location Comparison
* Interactive Map Area: Display a simulated spatial heatmap with color-coded thermal zones (green to deep red) representing local microclimates.
* Safe Zone Recommendation Sidebar: Display a comparison panel comparing the user's current location with nearby microclimates:
* Current Location (Zone C): 42.1°C — Critical
* Alternative Option A (Zone A): 35.2°C — Moderate
* Alternative Option B (Zone B): 32.8°C — Low
* Include a primary CTA button: "Guide to Lower-Risk Zone".
Demo Storytelling Control Bar (Interactive Simulation)
At the bottom of the viewport, provide a fixed simulation bar to demonstrate the early warning capabilities during presentations:
* A time slider (08:00 to 18:00) with Play, Pause, and Step Forward controls.
* Sliding the timeline dynamically updates temperature values, triggers anomaly alerts before peak heat arrives, and updates the risk badges in real-time.
Footer & Trust Layer
* Display technical metadata: Data Source: FortyGuard Temperature API • Forecast MAE: 1.2°C • Model Confidence: 94%.
* Safety Disclaimer: "Decision-support platform; not a medical diagnostic system or emergency dispatch tool."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eee481a4-9021-4f06-8fac-f41cc68ff53d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
