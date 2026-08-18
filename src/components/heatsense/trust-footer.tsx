export function TrustFooter() {
  return (
    <footer className="mx-auto max-w-[1600px] space-y-2 px-5 pt-2 pb-28 text-xs text-muted-foreground">
      <p>
        Data Source: FortyGuard Temperature API • Forecast MAE:{" "}
        <span className="text-foreground">1.2°C</span> • Model Confidence:{" "}
        <span className="text-foreground">94%</span>
      </p>
      <p>
        Decision-support platform; not a medical diagnostic system or emergency dispatch tool.
      </p>
    </footer>
  );
}
