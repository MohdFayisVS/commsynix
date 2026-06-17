import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ArrowRight, Globe, Layers, Settings, ShieldCheck, HeartHandshake, Milestone } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Engineering Workflow — COMMSYNIX" },
      { name: "description", content: "CommSynix is a cross-regional engineering powerhouse serving India and the Middle East. Learn about our 6-step systems integration lifecycle." },
    ],
  }),
  component: AboutPage,
});

const lifecycleSteps = [
  {
    step: "01",
    name: "Design",
    desc: "CAD layouts, schematic engineering, architectural AV calculations, and structured cable mapping.",
  },
  {
    step: "02",
    name: "Installation",
    desc: "First-fix site cabling, server rack assembly, speaker mounting, and low-voltage terminations.",
  },
  {
    step: "03",
    name: "Integration",
    desc: "Connecting subsystems via IP fabrics, bridging KNX/DALI nodes, and unifying communication pipes.",
  },
  {
    step: "04",
    name: "Configuration",
    desc: "Crestron/Q-SYS programming, network security firewall rules, DSP calibration, and logic scripting.",
  },
  {
    step: "05",
    name: "Testing",
    desc: "Fluke copper/fiber certification tests, acoustics analysis, load testing, and regulatory compliance checks.",
  },
  {
    step: "06",
    name: "Commissioning",
    desc: "Final handoff, operator training logs, as-built documentation delivery, and system activation.",
  },
];

function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HEADER HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Corporate Profile"
            title={<>Cross-Regional <span className="text-gradient">Engineering Powerhouse</span></>}
            description="CommSynix unifies communication (COMM), synchronization (SYN), and intelligent systems (IX) into flawless technological infrastructure across India and the Middle East."
          />
        </div>
      </section>

      {/* CORPORATE SUMMARY */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
              Connecting India & The Middle East
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CommSynix operates at the forefront of systems engineering, offering comprehensive low-voltage ELV, network backbone architectures, and high-fidelity audiovisual solutions. By linking operations between the **UAE (Dubai, Abu Dhabi)** and **India (Kerala - Cochin, Tamil Nadu - Chennai)**, we provide multi-national enterprises, small business SOHOs, and luxury residential clients with cross-border engineering expertise.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every system is engineered, configured, and certified in-house by our accredited Crestron, Q-SYS, and KNX programmers, ensuring compliance with strict regional regulations like SIRA in Dubai and ADMCC in Abu Dhabi.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                <Globe size={16} /> 2 Regional Hubs
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                <ShieldCheck size={16} /> Accredited Engineers
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border p-6 rounded-sm text-center">
              <div className="font-display text-4xl text-primary mb-2">UAE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dubai & Abu Dhabi Operations</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-sm text-center">
              <div className="font-display text-4xl text-primary mb-2">IND</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Kerala & Tamil Nadu Hubs</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-sm text-center col-span-2">
              <div className="font-display text-2xl text-foreground mb-1">KNX, Q-SYS, Crestron</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Direct Manufacturer Partnerships</div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 border-t border-b border-border/40 bg-card/20 relative">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Our Process</span>
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-wide text-foreground mt-2">
              Execution Lifecycle Timeline
            </h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mt-2">
              We guide every project through six rigorous engineering phases, ensuring flawless deployment.
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="grid md:grid-cols-6 gap-4 relative z-10">
            {lifecycleSteps.map((item, idx) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`relative border p-6 rounded-sm cursor-pointer transition-all duration-300 ${
                  activeStep === idx
                    ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                    : "border-border/60 hover:border-border bg-background/50"
                }`}
              >
                {/* Connector Line */}
                {idx < 5 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border/60 z-0" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-primary/40">PHASE</span>
                  <span className="font-display text-xs text-primary">{item.step}</span>
                </div>
                <h4 className="font-heading text-lg uppercase tracking-wide text-foreground mb-2">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WORKFLOW */}
      <section className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass p-10 md:p-14 text-center rounded-sm corner-frame relative">
            <h3 className="text-2xl md:text-3xl font-semibold uppercase tracking-tight leading-snug">
              Let's engineer your environment to <span className="text-gradient">think, respond, and evolve</span>.
            </h3>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/services" className="btn-hero cursor-pointer">
                See Capabilities <ArrowRight size={16} />
              </Link>
              <Link to="/quote" className="btn-ghost cursor-pointer">
                Launch Estimator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
