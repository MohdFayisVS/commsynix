import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeft, ArrowRight, Presentation, MonitorPlay, Speaker, Settings } from "lucide-react";
import avImg from "@/assets/corporate-boardroom.png";

export const Route = createFileRoute("/services/advanced-av")({
  head: () => ({
    meta: [
      { title: "Advanced AV Integration — COMMSYNIX" },
      { name: "description", content: "State-of-the-art corporate boardrooms, digital signage networks, auditorium sound, and automated AV control." },
    ],
  }),
  component: AdvancedAvPage,
});

const features = [
  {
    icon: Presentation,
    title: "Boardrooms & Meeting Spaces",
    desc: "Seamless Teams/Zoom rooms configured with beamforming microphones, intelligent 4K tracking cameras, and wireless sharing hubs.",
  },
  {
    icon: MonitorPlay,
    title: "Digital Signage Networks",
    desc: "Centralized content management systems driving high-brightness commercial displays, stretch panels, and video walls.",
  },
  {
    icon: Speaker,
    title: "Auditorium & Sound Systems",
    desc: "Acoustically calibrated line-arrays, digital audio processors (Dante network), and wireless microphone channels for clean speech.",
  },
  {
    icon: Settings,
    title: "Control Systems Integration",
    desc: "Crestron, AMX, and Q-SYS control programming that unifies displays, amplifiers, and lighting controls into one touch panel interface.",
  },
];

function AdvancedAvPage() {
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
            eyebrow="Department 03"
            title={<>Advanced AV & <span className="text-gradient">Collaboration</span></>}
            description="Fusing audio precision with cinematic clarity. We engineer unified communication platforms that enable flawless collaboration."
          />
        </div>
      </section>

      {/* DETAILED CONTENT SECTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image / Showcase */}
          <div className="lg:col-span-5 relative corner-frame p-2 animate-fade-up">
            <img
              src={avImg}
              alt="Advanced AV Integration"
              width={1200}
              height={900}
              className="rounded-sm border border-border w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              Crestron & Q-SYS Certified
            </div>
          </div>

          {/* Right: Detailed Offerings */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
              Flawless Collaborative Experiences
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We design and implement comprehensive audio-visual ecosystems that eliminate conferencing friction. Whether you are executing a high-stakes presentation in a Dubai boardroom or streaming an event to a multi-tiered corporate auditorium, CommSynix ensures that control interfaces are intuitive, audio is crisp, and video feeds are latency-free.
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
              Configure Your AV Scope
            </h3>
            <p className="max-w-xl mx-auto text-xs text-muted-foreground leading-relaxed mb-6">
              Launch our custom project estimator tool to get an immediate specification overview and pricing framework for your AV requirements.
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
