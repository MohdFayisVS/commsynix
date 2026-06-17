import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Mic, Sparkles, ChevronRight, Server, Shield, Video, Cpu, Building2, UserCheck, Home } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { HudPanel } from "@/components/HudPanel";
import { IntegrationSimulator } from "@/components/IntegrationSimulator";
import { VoiceEnquiryDialog } from "@/components/VoiceEnquiryDialog";
import { toast } from "sonner";
import heroImg from "@/assets/hero-network.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COMMSYNIX — Systems Integration | IT, ELV, AV & Automation" },
      { name: "description", content: "Engineering future-ready technology environments: IT infrastructure, ELV systems, Advanced AV, and smart automation across the UAE (Dubai, Abu Dhabi) and India (Kerala, Tamil Nadu)." },
    ],
  }),
  component: Index,
});

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

const DEFAULT_PARTNERS: Partner[] = [
  { id: "p-1", name: "Crestron", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Crestron_logo.svg" },
  { id: "p-2", name: "AMX", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Harman_International_Industries_logo.svg" },
  { id: "p-3", name: "Extron", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Extron_logo.svg" },
  { id: "p-4", name: "Control4", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Control4_logo.svg" },
  { id: "p-5", name: "Q-SYS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/QSC_Audio_Products_logo.svg" },
];

function Index() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("commsynix_partners");
    if (saved) {
      setPartners(JSON.parse(saved));
    } else {
      localStorage.setItem("commsynix_partners", JSON.stringify(DEFAULT_PARTNERS));
      setPartners(DEFAULT_PARTNERS);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="CommSynix Network"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>
        <GridBackdrop />

        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-primary font-display">
                Engineering Regional Powerhouse · India & Middle East
              </span>
            </div>
            <h1 className="font-heading text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
              Engineering the Future of <br />
              <span className="text-gradient">Connected Spaces.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Next-Gen IT, ELV, AV, and Smart Automation Solutions for Enterprise, Small Business, and Luxury Residential Environments. Serving Dubai, Abu Dhabi, Kerala, and Tamil Nadu.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/quote" className="btn-hero cursor-pointer">
                Launch Project Estimator <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-ghost">
                Explore Services
              </Link>
              <button
                onClick={() => setVoiceOpen(true)}
                className="btn-ghost cursor-pointer"
              >
                <Mic size={14} className="text-primary" /> Voice Enquiry
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-px bg-border/60 max-w-lg corner-frame">
              {[
                { k: "150+", v: "Tenders Executed" },
                { k: "4", v: "Core Pillars" },
                { k: "24/7", v: "Engineering Desk" },
              ].map((m) => (
                <div key={m.v} className="bg-background/80 backdrop-blur-sm p-5">
                  <div className="font-display text-xl text-primary">{m.k}</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC TELEMETRY HUD PANEL */}
          <div className="hidden lg:block lg:col-span-5">
            <HudPanel />
          </div>
        </div>
      </section>

      {/* MARKET SEGMENTATION (3-Column Layout) */}
      <section className="relative py-32 border-t border-b border-border/40 bg-card/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Target Integration</span>
            <h2 className="font-heading text-3xl md:text-5xl uppercase tracking-wide text-foreground mt-2">
              Market Verticals
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              Custom-engineered system topologies scaled for specific commercial and residential architectures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Commercial & Enterprise",
                desc: "High-throughput structured cabling, command center video walls, server architecture, and SIRA/ADMCC compliant access controls for corporate offices, banks, and public spaces.",
                points: ["Structured Backbone Cabling", "Command Center Operations", "Biometric Access Control (ACS)", "Video Wall Integrations"],
              },
              {
                icon: UserCheck,
                title: "SOHO / Small Business",
                desc: "Efficient, secure networking, IP telephony, localized CCTV setups, and automated meeting rooms designed to scale alongside your growing business footprint.",
                points: ["SD-WAN Firewalls & Wi-Fi", "SIP VoIP Telephony", "Localized CCTV Surveillance", "Integrated Audio Soundbars"],
              },
              {
                icon: Home,
                title: "Premium Residential",
                desc: "High-end KNX home automation control interfaces, multi-room acoustic calibration, solar BMS loops, and luxury IoT setups for luxury villas and residential properties.",
                points: ["KNX Lighting & Shading", "Calibrated Home Cinemas", "Multi-Room Acoustic Systems", "IoT Sensor Environments"],
              },
            ].map((market, idx) => {
              const Icon = market.icon;
              return (
                <div key={idx} className="group relative bg-card border border-border p-8 rounded-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-sm bg-primary/10 text-primary">
                        <Icon size={20} className="animate-pulse-glow" />
                      </div>
                      <h3 className="font-heading text-xl uppercase tracking-wide text-foreground">
                        {market.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {market.desc}
                    </p>
                  </div>
                  <ul className="space-y-2.5 border-t border-border/60 pt-6 mt-4">
                    {market.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1 w-1 bg-primary rounded-full shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE PILLARS GRID */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Core Pillars"
              title={<>Four Departments. <span className="text-gradient">Fully Synchronized.</span></>}
              description="Our specialized departments deliver end-to-end consulting, programming, and handoff services."
            />
            <Link to="/services" className="btn-ghost !text-[11px]">All Services <ArrowRight size={14} /></Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "it-infrastructure", icon: Server, title: "IT Infrastructure", desc: "Structured cabling, enterprise switching, SD-WAN, and high-performance server networks." },
              { id: "elv-systems", icon: Shield, title: "ELV Systems", desc: "Access control, IP CCTV analytics, fire alarms, and public address notification arrays." },
              { id: "advanced-av", icon: Video, title: "Advanced AV", desc: "Corporate boardrooms, auditorium audio distribution, and control touchscreens." },
              { id: "smart-automation", icon: Cpu, title: "Smart Automation", desc: "KNX lighting controls, smart climate loops, IoT sensors, and home automation." },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.id} className="group relative bg-card p-6 border border-border/80 hover:border-primary/45 rounded-sm transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <Icon size={24} className="text-primary animate-pulse-glow" />
                    <h3 className="font-heading text-lg uppercase tracking-wide text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <Link to={`/services/${pillar.id}`} className="mt-6 flex items-center gap-1.5 text-xs text-primary font-heading uppercase tracking-wider hover:underline">
                    View Department <ArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE NETWORK SIMULATOR */}
      <section className="relative py-32 border-t border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.35em] text-primary font-display block">System Sandbox</span>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.05] text-foreground">
              Orchestrate your <span className="text-gradient">environment</span>
            </h2>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Activate technology nodes on our octagonal network coordinate grid to map protocols, draw glowing SVG signal lines, and simulate data synchronization.
            </p>
          </div>
          <IntegrationSimulator />
        </div>
      </section>

      {/* INTEGRATION PARTNERS SHOWCASE */}
      <section className="relative py-20 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6 block">Supported Brands & Manufacturers</span>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
            {partners.map((p) => (
              <div key={p.id} className="h-10 w-28 flex items-center justify-center filter invert grayscale hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-300" title={p.name}>
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative glass-strong rounded-sm p-12 md:p-16 text-center corner-frame overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative">
              <span className="font-display text-[11px] tracking-[0.35em] text-primary">Begin Integration</span>
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold uppercase tracking-tight leading-tight">
                Let's architect your <br /> <span className="text-gradient">intelligent environment.</span>
              </h2>
              <div className="mt-9 flex flex-wrap gap-3 justify-center">
                <Link to="/quote" className="btn-hero cursor-pointer">Launch Project Estimator <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn-ghost cursor-pointer">Request Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      <VoiceEnquiryDialog
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onTranscribeComplete={(text) => {
          navigator.clipboard.writeText(text);
          toast.success("Voice enquiry transcription copied to clipboard! You can paste it into the contact form.");
        }}
      />
    </div>
  );
}
