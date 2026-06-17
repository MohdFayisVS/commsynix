import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeft, ArrowRight, Eye, Key, Lightbulb, Bell } from "lucide-react";
import elvImg from "@/assets/command-center.png";

export const Route = createFileRoute("/services/elv-systems")({
  head: () => ({
    meta: [
      { title: "ELV Systems Integration — COMMSYNIX" },
      { name: "description", content: "Extra Low Voltage (ELV) solutions: CCTV, Access Control (ACS), lighting controls, disabled toilet alarms, and IP clocks." },
    ],
  }),
  component: ElvSystemsPage,
});

const features = [
  {
    icon: Eye,
    title: "CCTV & Video Analytics",
    desc: "IP surveillance setups equipped with AI object detection, license plate recognition, and centralized server-side NVR storage.",
  },
  {
    icon: Key,
    title: "Access Control Systems (ACS)",
    desc: "Biometric scanners, RFID gate barriers, electromagnetic locks, and turnstiles linked to database management software.",
  },
  {
    icon: Lightbulb,
    title: "Smart Lighting Control",
    desc: "Energy-saving digital control panels (KNX, DALI protocols) that regulate brightness, dimming arrays, and schedule scene presets.",
  },
  {
    icon: Bell,
    title: "Toilet Alarms & IP Clocks",
    desc: "Disabled toilet alarm emergency systems and network-synchronized IP clocks for airports, hospitals, and educational institutions.",
  },
];

function ElvSystemsPage() {
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
            eyebrow="Department 02"
            title={<>ELV Systems & <span className="text-gradient">Security</span></>}
            description="Intelligent building ecosystems. We integrate surveillance, security, and low-voltage notification grids into a central management console."
          />
        </div>
      </section>

      {/* DETAILED CONTENT SECTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image / Showcase */}
          <div className="lg:col-span-5 relative corner-frame p-2 animate-fade-up">
            <img
              src={elvImg}
              alt="ELV Systems Control"
              width={1200}
              height={900}
              className="rounded-sm border border-border w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              SIRA & ADMCC Compliant
            </div>
          </div>

          {/* Right: Detailed Offerings */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
              Unified Building Intelligence
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We design and install complex Extra Low Voltage (ELV) networks that safeguard assets and automate facility logic. From commercial campuses requiring enterprise access control to luxury retail spaces needing DALI lighting loops, our engineers coordinate every detail to meet regional regulatory guidelines in the Middle East and India.
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
              Configure Your ELV Scope
            </h3>
            <p className="max-w-xl mx-auto text-xs text-muted-foreground leading-relaxed mb-6">
              Launch our custom project estimator tool to get an immediate specification overview and pricing framework for your ELV requirements.
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
