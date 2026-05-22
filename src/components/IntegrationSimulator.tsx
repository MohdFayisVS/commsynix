import { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Activity, Zap, Layers } from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  protocols: string[];
  desc: string;
}

const NODES: NodeItem[] = [
  { id: "it", name: "IT Infra", code: "01", x: 328, y: 72, protocols: ["SNMP", "LDAP", "VLAN"], desc: "High-density servers and structured cabling" },
  { id: "elv", name: "ELV Systems", code: "02", x: 250, y: 40, protocols: ["RTSP", "ONVIF", "SIP"], desc: "IP CCTV, Access Control and PA systems" },
  { id: "av", name: "AV Sync", code: "03", x: 172, y: 72, protocols: ["Dante", "SRT", "EDID"], desc: "High-resolution LED walls & boardroom AV" },
  { id: "auto", name: "Automation", code: "04", x: 140, y: 150, protocols: ["KNX", "Crestron", "BACnet"], desc: "Lighting controls, shading and scene presets" },
  { id: "ai", name: "AI Analytics", code: "05", x: 172, y: 228, protocols: ["TensorRT", "gRPC", "REST"], desc: "Edge vision analytics and voice commands" },
  { id: "bms", name: "Smart Buildings", code: "06", x: 250, y: 260, protocols: ["Modbus", "OPC-UA", "MQTT"], desc: "BMS integration and HVAC controllers" },
  { id: "iot", name: "IoT Gateway", code: "07", x: 328, y: 228, protocols: ["CoAP", "MQTT", "BLE"], desc: "Edge sensor grids and micro-gateways" },
  { id: "net", name: "Networking", code: "08", x: 360, y: 150, protocols: ["SD-WAN", "Wi-Fi 6E", "BGP"], desc: "Core routing, firewalls and fiber rings" },
];

export function IntegrationSimulator() {
  const [activeNodes, setActiveNodes] = useState<string[]>(["it", "net", "av"]);
  const [logs, setLogs] = useState<string[]>([
    "SYS · System ready. Toggle nodes to simulate integration fabric.",
    "CON · Connected IT Infra [01] <--> Networking [08]",
    "CON · Connected AV Sync [03] <--> Networking [08]"
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const toggleNode = (id: string) => {
    setActiveNodes((prev) => {
      const node = NODES.find((n) => n.id === id);
      const isActivating = !prev.includes(id);
      
      let nextList: string[];
      if (isActivating) {
        nextList = [...prev, id];
        addLog(`SYNC · Node '${node?.name}' online. Initiating handshake...`);
        // Add connection logs
        NODES.forEach((n) => {
          if (n.id !== id && prev.includes(n.id) && areRelated(id, n.id)) {
            setTimeout(() => {
              addLog(`MESH · Linked '${node?.name}' with '${n.name}' [Active Protocols: ${intersectProtocols(node, n).join(", ")}]`);
            }, 300);
          }
        });
      } else {
        nextList = prev.filter((x) => x !== id);
        addLog(`SYS · Node '${node?.name}' offline. Recalibrating route tables...`);
      }
      return nextList;
    });
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    setLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Determine if two nodes have an integration relationship
  const areRelated = (a: string, b: string) => {
    // In our simulator, networking integrates with almost everything.
    // Neighbors also integrate.
    if (a === "net" || b === "net") return true;
    if (a === "iot" || b === "iot") return true;
    
    const idxA = NODES.findIndex((n) => n.id === a);
    const idxB = NODES.findIndex((n) => n.id === b);
    return Math.abs(idxA - idxB) <= 2 || Math.abs(idxA - idxB) >= NODES.length - 2;
  };

  const intersectProtocols = (nodeA: any, nodeB: any) => {
    // Return all protocols if we want, or a subset
    return [...new Set([...nodeA.protocols, ...nodeB.protocols])].slice(0, 3);
  };

  // Calculate statistics
  const activeCount = activeNodes.length;
  const syncPercentage = Math.round((activeCount / NODES.length) * 100);
  
  const allActiveProtocols = Array.from(
    new Set(NODES.filter((n) => activeNodes.includes(n.id)).flatMap((n) => n.protocols))
  );

  return (
    <div className="w-full grid lg:grid-cols-12 gap-8 items-stretch select-none">
      {/* Interactive Map Visual */}
      <div className="lg:col-span-7 bg-card/40 border border-border/60 rounded-sm p-6 relative flex flex-col justify-between overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="font-display text-[10px] tracking-[0.3em] text-primary">INTEGRATION MAP</div>
            <div className="text-[11px] text-muted-foreground mt-1">Click nodes to connect and sync systems</div>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] border border-border px-2 py-0.5 uppercase text-muted-foreground bg-background/50">
              Active: {activeCount}/{NODES.length}
            </span>
          </div>
        </div>

        {/* SVG Network Map */}
        <div className="relative flex-grow flex items-center justify-center py-6">
          <svg className="w-full max-w-[420px] aspect-[5/4]" viewBox="0 0 500 300">
            {/* Draw grid background line design */}
            <circle cx="250" cy="150" r="110" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 6" />
            
            {/* Draw active connection lines */}
            {NODES.map((node, i) => {
              return NODES.slice(i + 1).map((other) => {
                const isActive = activeNodes.includes(node.id) && activeNodes.includes(other.id);
                const related = areRelated(node.id, other.id);
                if (isActive && related) {
                  return (
                    <g key={`${node.id}-${other.id}`}>
                      {/* Ambient Glow Line */}
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={other.x}
                        y2={other.y}
                        stroke="var(--primary)"
                        strokeWidth="2.5"
                        strokeOpacity="0.45"
                        className="animate-draw-line"
                        style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
                      />
                      {/* Crisp Center Line */}
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={other.x}
                        y2={other.y}
                        stroke="var(--foreground)"
                        strokeWidth="0.75"
                        strokeOpacity="0.8"
                        className="animate-draw-line"
                      />
                    </g>
                  );
                }
                return null;
              });
            })}

            {/* Draw Hub Spokes to Core */}
            {NODES.map((node) => {
              const isActive = activeNodes.includes(node.id);
              if (isActive) {
                return (
                  <line
                    key={`spoke-${node.id}`}
                    x1="250"
                    y1="150"
                    x2={node.x}
                    y2={node.y}
                    stroke="var(--primary)"
                    strokeWidth="1.25"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                  />
                );
              }
              return null;
            })}

            {/* Core Node */}
            <g transform="translate(250, 150)" className="cursor-pointer">
              <circle r="26" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
              {activeCount > 0 ? (
                <>
                  <circle r="18" fill="var(--primary)" fillOpacity="0.15" className="animate-pulse-glow" />
                  <circle r="8" fill="var(--primary)" />
                </>
              ) : (
                <circle r="8" fill="var(--muted-foreground)" />
              )}
              <text y="3" textAnchor="middle" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-display)" letterSpacing="1">
                CSX
              </text>
            </g>

            {/* Render Nodes */}
            {NODES.map((node) => {
              const isActive = activeNodes.includes(node.id);
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onClick={() => toggleNode(node.id)}
                >
                  {/* Glowing halo */}
                  {isActive && (
                    <circle r="16" fill="var(--primary)" fillOpacity="0.2" className="animate-pulse-glow" />
                  )}
                  {/* Outer circle */}
                  <circle
                    r="12"
                    fill={isActive ? "var(--background)" : "var(--background)"}
                    stroke={isActive ? "var(--primary)" : "var(--border)"}
                    strokeWidth={isActive ? "2" : "1"}
                    className="transition-colors duration-300"
                  />
                  {/* Code inner text */}
                  <text
                    y="3.5"
                    textAnchor="middle"
                    fill={isActive ? "var(--primary)" : "var(--muted-foreground)"}
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="var(--font-mono)"
                    className="transition-colors duration-300"
                  >
                    {node.code}
                  </text>
                  {/* Label */}
                  <text
                    y="24"
                    textAnchor="middle"
                    fill={isActive ? "fill-foreground" : "var(--muted-foreground)"}
                    fontSize="8"
                    fontWeight={isActive ? "600" : "400"}
                    fontFamily="var(--font-heading)"
                    letterSpacing="0.5"
                    className="fill-foreground transition-all duration-300 uppercase"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Sync Status bar */}
        <div className="relative z-10 pt-4 border-t border-border/40 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Sync Capacity</div>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex-grow h-1.5 bg-border/40 overflow-hidden rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${syncPercentage}%` }}
                />
              </div>
              <span className="font-mono text-xs text-primary font-semibold">{syncPercentage}%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Orchestration Level</div>
            <div className="text-xs uppercase text-foreground font-semibold mt-1 flex items-center justify-end gap-1.5">
              <Zap size={10} className="text-primary" />
              {syncPercentage === 0 ? "Offline" : syncPercentage < 40 ? "Connected" : syncPercentage < 85 ? "Optimized" : "Synchronized"}
            </div>
          </div>
        </div>
      </div>

      {/* Control Console & Stats */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        {/* Parameters Box */}
        <div className="bg-card/40 border border-border/60 rounded-sm p-6 corner-frame flex-grow">
          <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-3">
            <Layers size={14} className="text-primary" />
            <h4 className="font-heading text-xs uppercase tracking-[0.25em] text-foreground">Orchestration Parameters</h4>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Active Protocols</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {allActiveProtocols.length > 0 ? (
                  allActiveProtocols.map((p) => (
                    <span
                      key={p}
                      className="text-[9px] uppercase font-mono px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-sm transition-all"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground italic">
                    Select nodes to load protocol stack...
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Selected Architectures</span>
              <div className="space-y-2 mt-2 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                {activeNodes.map((id) => {
                  const node = NODES.find((n) => n.id === id);
                  if (!node) return null;
                  return (
                    <div key={id} className="flex items-start justify-between p-2 bg-background/50 border border-border/40 rounded-sm">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-foreground">{node.name}</span>
                        <p className="text-[9px] text-muted-foreground mt-0.5 leading-snug">{node.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNode(id)}
                        className="text-[8px] uppercase tracking-[0.1em] text-destructive hover:underline ml-2"
                      >
                        Disconnect
                      </button>
                    </div>
                  );
                })}
                {activeNodes.length === 0 && (
                  <div className="text-[10px] text-muted-foreground/80 italic p-2 border border-dashed border-border/60 text-center">
                    No active integration layers. Click map nodes to initiate.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Shell Terminal */}
        <div className="bg-background/95 border border-border/80 rounded-sm p-4 h-48 flex flex-col justify-between font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2 text-muted-foreground/80">
            <span className="flex items-center gap-1.5">
              <Terminal size={11} className="text-primary" />
              INTEGRATION_ENGINE_SHELL
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            {logs.map((log, index) => {
              const isSync = log.includes("SYNC");
              const isMesh = log.includes("MESH");
              const isCon = log.includes("CON");
              let colorClass = "text-muted-foreground/80";
              if (isSync) colorClass = "text-primary font-semibold";
              if (isMesh) colorClass = "text-secondary font-semibold";
              if (isCon) colorClass = "text-foreground/90";

              return (
                <div key={index} className={`leading-normal ${colorClass}`}>
                  {log}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>

          <div className="border-t border-border/40 pt-2 mt-2 flex items-center justify-between text-muted-foreground/50 text-[9px]">
            <span>ENGINE STATUS: OK</span>
            <span>v1.0.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
