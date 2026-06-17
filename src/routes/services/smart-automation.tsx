import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeft, ArrowRight, Home, Cpu, Sun, Smartphone } from "lucide-react";
import homeImg from "@/assets/smart-home.png";

export const Route = createFileRoute("/services/smart-automation")({
  head: () => ({
    meta: [
      { title: "Smart Automation & IoT — COMMSYNIX" },
      { name: "description", content: "Home automation, smart acoustics, IoT environments, robotics, and intelligent BMS integrations." },
    ],
  }),
  component: SmartAutomationPage,
});

const features = [
  {
    icon: Home,
    title: "Luxury Home Automation",
    desc: "KNX, Control4, and Crestron Home environments centralizing climate, shading, gates, and acoustic presets.",
  },
  {
    icon: Cpu,
    title: "AI & Smart System Logic",
    desc: "Integrating edge-learning controllers to predict schedule demands, balance energy grids, and automate security states.",
  },
  {
    icon: Sun,
    title: "Energy & Climate Optimization",
    desc: "Centralized HVAC control loops and solar grid integrations that automatically optimize resource usage based on load forecasts.",
  },
  {
    icon: Smartphone,
    title: "IoT Sensor Fabrics",
    desc: "Deployment of multi-protocol sensors (Zigbee, Z-Wave, MQTT) linking building telemetry to single-pane-of-glass UI.",
  },
];

function SmartAutomationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HEADER SECTION */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={12} /> Back to Services
            </Link>
          </div>
          <SectionHeading
            eyebrow="Department 04"
            title={<>Smart Automation & <span className="text-gradient">IoT</span></>}
            description="Spaces that learn. We unify lighting, climate, acoustics, and security into context-aware systems that adapt to you."
          />
        </div>
      </section>

      {/* DETAILED CONTENT SECTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image / Showcase */}
          <div className="lg:col-span-5 relative corner-frame p-2 animate-fade-up">
            <img
              src={homeImg}
              alt="Smart Automation Panel"
              width={1200}
              height={900}
              className="rounded-sm border border-border w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              KNX Partner Certified
            </div>
          </div>

          {/* Right: Detailed Offerings */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
              Predictive Environmental Intelligence
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We design and construct intelligent residential and corporate spaces that respond automatically to environmental variables. Using certified KNX hardware backbones combined with advanced software logic, our systems deliver unprecedented convenience, resource savings, and security control via elegant wall touchscreens and mobile interfaces.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon size={18} className="animate-pulse-glow" />
                      <h4 className="font-heading text-base uppercase tracking-wide text-foreground">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass p-10 text-center rounded-sm relative overflow-hidden">
            <h3 className="font-heading text-2xl uppercase tracking-wide mb-3">
              Configure Your Automation Scope
            </h3>
            <p className="max-w-xl mx-auto text-xs text-muted-foreground leading-relaxed mb-6">
              Launch our custom project estimator tool to get an immediate specification overview and pricing framework for your smart automation requirements.
            </p>
            <Link to="/quote" className="btn-hero !px-6 !py-3 !text-xs cursor-pointer">
              Launch Estimator <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
