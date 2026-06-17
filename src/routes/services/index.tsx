import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, Server, Shield, Video, Cpu } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Engineering Services — COMMSYNIX" },
      { name: "description", content: "Explore our specialized integration capabilities: IT Infrastructure, ELV Systems, Advanced AV, and Smart Automation." },
    ],
  }),
  component: ServicesHubPage,
});

const corePillars = [
  {
    id: "it-infrastructure",
    icon: Server,
    title: "IT Infrastructure",
    description: "Enterprise-grade compute, networking, and structured cabling solutions designed for maximum uptime and scalability.",
    subServices: ["Structured Cabling", "High-Throughput Networking", "IP Telephony (VoIP)", "Interactive IPTV Systems"],
    href: "/services/it-infrastructure",
  },
  {
    id: "elv-systems",
    icon: Shield,
    title: "ELV Systems",
    description: "Unified low-voltage systems engineered for comprehensive security, communications, and safety operations.",
    subServices: ["CCTV & Video Analytics", "Access Control Systems (ACS)", "Smart Lighting Control", "Disable Toilet Alarms & IP Clocks"],
    href: "/services/elv-systems",
  },
  {
    id: "advanced-av",
    icon: Video,
    title: "Advanced AV Integration",
    description: "Cinematic and high-fidelity AV setups for corporate collaboration, public spaces, and command centers.",
    subServices: ["Meeting Rooms & Boardrooms", "Command Centers & Video Walls", "Digital Signage Networks", "Auditorium Sound & Acoustic Integration"],
    href: "/services/advanced-av",
  },
  {
    id: "smart-automation",
    icon: Cpu,
    title: "Smart Automation & IoT",
    description: "Intelligent, sensor-driven control systems that centralize energy management, comfort, and IoT devices.",
    subServices: ["KNX & Crestron Home Automation", "Integrated Robotics & AI Smart Systems", "BMS & Energy Optimization", "IoT Sensor Networks"],
    href: "/services/smart-automation",
  },
];

function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HEADER SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Capabilities Hub"
            title={<>Engineering precision. <span className="text-gradient">Fully integrated.</span></>}
            description="We deliver end-to-end design, configuration, and commissioning for complex low-voltage, networking, and audiovisual environments."
          />
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="group relative bg-card rounded-sm border border-border p-8 flex flex-col justify-between transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={120} className="text-primary" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-sm bg-primary/10 text-primary">
                        <Icon size={22} className="animate-pulse-glow" />
                      </div>
                      <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {pillar.description}
                    </p>

                    <div className="border-t border-border/60 pt-6 mb-10">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4 font-semibold">
                        Engineering Focus Areas
                      </div>
                      <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {pillar.subServices.map((service, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1 w-1 bg-primary rounded-full" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link to={pillar.href} className="btn-ghost w-full justify-between group-hover:border-primary group-hover:text-primary">
                    <span>Explore Department</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass p-10 md:p-12 text-center rounded-sm corner-frame relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-wide mb-4">
              Need a Custom Engineering Estimate?
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed mb-8">
              Use our interactive Project Estimator to configure your market vertical, select integration modules, and submit specifications for your project tender.
            </p>
            <Link to="/quote" className="btn-hero cursor-pointer">
              Launch Project Estimator <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
