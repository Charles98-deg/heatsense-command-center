import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BASELINE,
  END_HOUR,
  MODES,
  START_HOUR,
  riskFromTemp,
  temperatureAt,
  type ModeConfig,
  type ModeId,
  type RiskLevel,
} from "@/lib/heatsense";

export interface ForecastPoint {
  hour: number;
  label: string;
  temp: number;
}

export interface Driver {
  label: string;
  status: string;
  value: number;
}

export interface ZoneReading {
  id: string;
  name: string;
  code: string;
  temp: number;
  risk: RiskLevel;
}

export function useHeatSimulation() {
  const [modeId, setModeId] = useState<ModeId>("worksite");
  const [hour, setHour] = useState(13.5);
  const [playing, setPlaying] = useState(false);
  const [riskOverride, setRiskOverride] = useState<RiskLevel | null>(null);
  const [liveMode, setLiveMode] = useState(true);

  const mode: ModeConfig = useMemo(
    () => MODES.find((m) => m.id === modeId) ?? MODES[0]!,
    [modeId],
  );

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setHour((h) => (h >= END_HOUR ? START_HOUR : +(h + 0.25).toFixed(2)));
    }, 700);
    return () => window.clearInterval(id);
  }, [playing]);

  const current = temperatureAt(hour, mode.offset);
  const prev = temperatureAt(hour - 1, mode.offset);
  const rate = +(current - prev).toFixed(2);
  const forecast60 = temperatureAt(hour + 1, mode.offset);
  const deviation = +(current - BASELINE).toFixed(1);

  let persistence = 0;
  for (let h = hour; h >= START_HOUR - 1; h -= 0.25) {
    if (temperatureAt(h, mode.offset) >= BASELINE) persistence += 0.25;
    else break;
  }

  const computedRisk = riskFromTemp(current, rate);
  const risk = riskOverride ?? computedRisk;

  const forecastSeries: ForecastPoint[] = useMemo(() => {
    const points: ForecastPoint[] = [];
    for (let i = 0; i <= 12; i += 1) {
      const h = hour + i * 0.25;
      points.push({
        hour: h,
        label: `+${i * 15}m`,
        temp: +temperatureAt(h, mode.offset).toFixed(2),
      });
    }
    return points;
  }, [hour, mode.offset]);

  const drivers: Driver[] = useMemo(() => {
    const clamp = (n: number) => Math.max(4, Math.min(100, Math.round(n)));
    return [
      {
        label: "Current temperature vs. threshold",
        status: current >= 40 ? "High" : current >= 36 ? "Elevated" : "Nominal",
        value: clamp(((current - 26) / 18) * 100),
      },
      {
        label: "Rate of heat escalation",
        status: rate >= 2 ? "Abnormal" : rate >= 1 ? "Rising" : "Stable",
        value: clamp(((rate + 1) / 4) * 100),
      },
      {
        label: "Heat persistence duration",
        status:
          persistence >= 3 ? "Extended" : persistence >= 1.5 ? "Sustained" : "Brief",
        value: clamp((persistence / 6) * 100),
      },
      {
        label: "Spatial hotspot proximity",
        status:
          current >= 40 ? "Critical" : current >= 37 ? "Close" : "Distant",
        value: clamp(((current - 24) / 20) * 100),
      },
    ];
  }, [current, rate, persistence]);

  const zones: ZoneReading[] = useMemo(() => {
    const deltas = [0, -6.9, -9.3];
    const codes = ["C", "A", "B"];
    return mode.zoneNames.map((name, i) => {
      const temp = +(forecast60 + (deltas[i] ?? 0)).toFixed(1);
      return {
        id: codes[i] ?? String(i),
        code: `Zone ${codes[i] ?? i}`,
        name,
        temp,
        risk: i === 0 ? risk : riskFromTemp(temp, Math.max(0, rate - i)),
      };
    });
  }, [mode.zoneNames, forecast60, risk, rate]);

  const anomaly = rate >= 1.6 && current < 40;

  const step = useCallback(() => {
    setHour((h) => (h >= END_HOUR ? START_HOUR : +(h + 0.5).toFixed(2)));
  }, []);

  return {
    mode,
    modeId,
    setModeId,
    hour,
    setHour,
    playing,
    setPlaying,
    step,
    liveMode,
    setLiveMode,
    risk,
    computedRisk,
    riskOverride,
    setRiskOverride,
    current,
    rate,
    forecast60,
    deviation,
    persistence,
    forecastSeries,
    drivers,
    zones,
    anomaly,
  };
}

export type HeatSimulation = ReturnType<typeof useHeatSimulation>;
