import { useEffect, useState, useRef } from "react";

interface TelemetryPoint {
  x: number;
  y: number;
}

export function HudPanel() {
  const [dataPoints, setDataPoints] = useState<number[]>([40, 50, 45, 60, 55, 70, 65, 80, 75, 90]);
  const [latency, setLatency] = useState(4);
  const [uptime, setUptime] = useState(99.98);
  const [nodes, setNodes] = useState(2184);
  const [logs, setLogs] = useState<string[]>([
    "SYS · INITIALIZING AV-OVER-IP CHANNELS",
    "NET · SECURE SD-WAN FABRIC ESTABLISHED",
    "BMS · KNX BUS AUTO-CONFIGURATION COMPLETE",
    "AI  · INFERENCE AGENTS SYNCED AT EDGE"
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  // Generate dynamic data points & fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      // Telemetry
      setDataPoints((prev) => {
        const next = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 20;
        const newVal = Math.max(10, Math.min(100, lastVal + change));
        next.push(newVal);
        return next;
      });

      // Latency
      setLatency((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(8, prev + delta));
      });

      // Nodes
      setNodes((prev) => {
        if (Math.random() > 0.8) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          return prev + delta;
        }
        return prev;
      });

      // Logs
      if (Math.random() > 0.6) {
        const logTemplates = [
          "SYS · HANDSHAKE COMPLETE AT NODE #" + Math.floor(Math.random() * 500 + 100),
          "NET · OPTIMIZING LATENCY IN PATH B",
          "AV  · STREAM BITRATE ADJUSTED [SRT PROTOCOL]",
          "BMS · DYNAMIC CLIMATE BOUNDARY ADJUSTED",
          "AI  · VOICE PIPELINE CALIBRATING ACCURACY",
          "NET · BORDER CONTROLLER STATUS: STABLE",
          "IoT · MQTT DECOMPRESSION METRICS RE-ROUTED"
        ];
        const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const timestamp = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        setLogs((prev) => [...prev.slice(-15), `[${timestamp}] ${randomLog}`]);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Construct SVG path from dataPoints
  const width = 320;
  const height = 80;
  const padding = 5;
  const step = width / (dataPoints.length - 1);
  const points = dataPoints.map((val, idx) => {
    const x = idx * step;
    // Map val (0-100) to svg height (padding to height - padding)
    const y = height - padding - (val / 100) * (height - 2 * padding);
    return { x, y };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Path for gradient fill below line
  const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="relative glass-strong rounded-sm p-6 corner-frame animate-fade-up [animation-delay:200ms] select-none">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-display text-[10px] tracking-[0.3em] text-primary">SYS · TELEMETRY FEED</span>
        <div className="flex gap-1.5 items-center">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-primary">Live Connection</span>
        </div>
      </div>

      {/* SVG Wave/Chart */}
      <div className="relative h-20 mb-6 border-b border-border/40 bg-background/30 rounded-sm overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Gradient Fill */}
          <path d={fillD} fill="url(#chartGradient)" />
          {/* Stroke Path */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
          />
        </svg>
        {/* Floating Indicator */}
        <div
          className="absolute h-1.5 w-1.5 rounded-full bg-primary"
          style={{
            left: `${width - 6}px`,
            top: `${points[points.length - 1].y - 3}px`,
            boxShadow: "0 0 8px var(--primary)",
            transition: "top 0.3s ease-out"
          }}
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        {[
          { l: "AV Integration", v: 96 },
          { l: "Network Mesh", v: 88 },
          { l: "Automation Bus", v: 74 },
          { l: "AI Pipeline", v: 62 },
        ].map((row) => (
          <div key={row.l}>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              <span>{row.l}</span>
              <span className="text-primary font-mono">{row.v}%</span>
            </div>
            <div className="h-1 bg-border/80 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                style={{ width: `${row.v}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Block */}
      <div className="mt-6 pt-4 border-t border-border/40 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.22em] font-mono">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Uptime</span>
          <span className="text-foreground">{uptime}%</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Latency</span>
          <span className="text-foreground transition-all duration-300">{latency}ms</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Nodes</span>
          <span className="text-foreground transition-all duration-300">{nodes.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Zones</span>
          <span className="text-foreground">38</span>
        </div>
      </div>

      {/* Scrolling Logger Terminal */}
      <div className="mt-6 pt-4 border-t border-border/40">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-[0.25em] text-primary">System Handshakes</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Console Log</span>
        </div>
        <div className="h-20 bg-background/60 border border-border/60 p-2.5 rounded-sm overflow-y-auto font-mono text-[9px] text-muted-foreground/80 space-y-1.5 custom-scrollbar">
          {logs.map((log, index) => {
            const isSystem = log.includes("[");
            return (
              <div
                key={index}
                className={`transition-opacity duration-300 leading-normal ${
                  index === logs.length - 1 ? "text-primary/95" : ""
                }`}
              >
                {isSystem ? (
                  <>
                    <span className="text-secondary/70">{log.slice(0, 10)}</span>
                    <span>{log.slice(10)}</span>
                  </>
                ) : (
                  log
                )}
              </div>
            );
          })}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
