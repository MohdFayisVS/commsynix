import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeft, ArrowRight, Layers, Network, PhoneCall, Monitor } from "lucide-react";
import serverImg from "@/assets/server-architecture.png";

export const Route = createFileRoute("/services/it-infrastructure")({
  head: () => ({
    meta: [
      { title: "IT Infrastructure Services — COMMSYNIX" },
      { name: "description", content: "Enterprise computing, structured cabling, IP telephony, and high-performance routing." },
    ],
  }),
  component: ItInfrastructurePage,
});

const features = [
  {
    icon: Layers,
    title: "Structured Cabling & Fiber Optics",
    desc: "Category 6A/7 copper and multi-mode/single-mode backbone fiber networks certified for high-frequency transmission.",
  },
  {
    icon: Network,
    title: "High-Throughput Networking & SD-WAN",
    desc: "Robust routing, Layer 3 switching fabrics, Wi-Fi 6E/7 setups, and SD-WAN links configured for enterprise data throughput.",
  },
  {
    icon: PhoneCall,
    title: "IP Telephony (VoIP)",
    desc: "Feature-rich Unified Communications (UCaaS) and SIP trunking architectures delivering crystal-clear enterprise voice networks.",
  },
  {
    icon: Monitor,
    title: "Interactive IPTV Systems",
    desc: "Low-latency multicast video streams distributed over IP fabrics to screens, public areas, and corporate offices.",
  },
];

function ItInfrastructurePage() {
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
            eyebrow="Department 01"
            title={<>IT Infrastructure & <span className="text-gradient">Networks</span></>}
            description="The high-frequency backbone of modern spaces. We design, lay, test, and commission enterprise infrastructure for scale, redundancy, and speed."
          />
        </div>
      </section>

      {/* DETAILED CONTENT SECTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image / Showcase */}
          <div className="lg:col-span-5 relative corner-frame p-2 animate-fade-up">
            <img
              src={serverImg}
              alt="Server Infrastructure"
              width={1200}
              height={900}
              className="rounded-sm border border-border w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              Certified Fluke Testing
            </div>
          </div>

          {/* Right: Detailed Offerings */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
              Physical Layer to Software Orchestration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We translate abstract data flows into high-performance physical assets. From copper termination in a localized rack to enterprise SD-WAN policies linking multi-regional sites in the UAE and India, CommSynix delivers zero-compromise network stability.
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
              Configure Your IT Scope
            </h3>
            <p className="max-w-xl mx-auto text-xs text-muted-foreground leading-relaxed mb-6">
              Launch our custom project estimator tool to get an immediate specification overview and pricing framework for your networking requirements.
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
