import { createFileRoute } from "@tanstack/react-router";
import { useHeatSimulation } from "@/hooks/use-heat-simulation";
import { SiteHeader } from "@/components/heatsense/site-header";
import { StatusBar } from "@/components/heatsense/status-bar";
import { IntelligenceCards } from "@/components/heatsense/intelligence-cards";
import { ExplainabilityPanel } from "@/components/heatsense/explainability-panel";
import { SpatialIntelligence } from "@/components/heatsense/spatial-intelligence";
import { SimulationBar } from "@/components/heatsense/simulation-bar";
import { TrustFooter } from "@/components/heatsense/trust-footer";

const title = "HeatSense — Heat Intelligence Engine";
const description =
  "Real-time heat risk command center: current conditions, 60-minute forecasts, explainable risk scoring and safe-zone routing powered by the FortyGuard API.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const sim = useHeatSimulation();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader modeId={sim.modeId} onModeChange={sim.setModeId} />
      <StatusBar
        hour={sim.hour}
        liveMode={sim.liveMode}
        onLiveModeChange={sim.setLiveMode}
        audience={sim.mode.audience}
      />
      <main className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 pb-4">
        <IntelligenceCards sim={sim} />
        <ExplainabilityPanel sim={sim} />
        <SpatialIntelligence sim={sim} />
      </main>
      <TrustFooter />
      <SimulationBar sim={sim} />
    </div>
  );
}
