import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mic, Sparkles, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-network.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceGrid";
import { HudPanel } from "@/components/HudPanel";
import { IntegrationSimulator } from "@/components/IntegrationSimulator";
import { VoiceEnquiryDialog } from "@/components/VoiceEnquiryDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COMMSYNIX — Intelligent Systems. Seamlessly Integrated." },
      { name: "description", content: "Future-ready technology integration: IT infrastructure, ELV, AV, smart automation, AI, networking and smart buildings." },
    ],
  }),
  component: Index,
});

function Index() {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>
        <GridBackdrop />

        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-primary font-display">
                Technology Integration · EST 2024
              </span>
            </div>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,5.25rem)] font-semibold uppercase leading-[0.95] tracking-tight">
              Intelligent <br />
              <span className="text-gradient">Systems.</span> <br />
              Seamlessly Integrated.
            </h1>
            <p className="mt-7 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Commsynix engineers next-generation technology environments —
              fusing IT, AV, ELV, automation and AI into one synchronized,
              future-ready experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/services" className="btn-hero">
                Explore Services <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Request Consultation
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
                { k: "120+", v: "Integrations" },
                { k: "8", v: "Verticals" },
                { k: "24/7", v: "Engineering" },
              ].map((m) => (
                <div key={m.v} className="bg-background/80 backdrop-blur-sm p-5">
                  <div className="font-display text-2xl text-primary">{m.k}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{m.v}</div>
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

      {/* ABOUT SPLIT */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="About Commsynix"
              title={<>Engineering the <span className="text-gradient">intelligent</span> environment.</>}
              description="Commsynix is a premium technology integration company unifying communication, automation and intelligent infrastructure into seamless, future-ready ecosystems for enterprise and smart spaces."
            />
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              {[
                "Premium engineering",
                "Vendor-agnostic design",
                "End-to-end commissioning",
                "Lifecycle support",
              ].map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-ghost mt-10 !text-[11px]">
              More about us <ChevronRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-3">
              <img src={portfolio1} alt="" width={1280} height={960} loading="lazy" className="aspect-[4/5] object-cover rounded-sm border border-border" />
              <img src={portfolio2} alt="" width={1280} height={960} loading="lazy" className="aspect-[4/5] object-cover rounded-sm border border-border mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-32 border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Capabilities"
              title={<>Eight disciplines. <span className="text-gradient">One platform.</span></>}
            />
            <Link to="/services" className="btn-ghost !text-[11px]">All services <ArrowRight size={14} /></Link>
          </div>
          <ServiceGrid />
        </div>
      </section>

      {/* INTERACTIVE NETWORK SIMULATOR */}
      <section className="relative py-32 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-3 justify-center">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-primary font-display">System Sandbox</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.05] text-foreground">
              Orchestrate your <span className="text-gradient">environment</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Toggle technology disciplines on the digital grid to visualize live connection mesh connections, protocols, and efficiency scores.
            </p>
          </div>
          <IntegrationSimulator />
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Selected Work"
              title={<>Spaces, <span className="text-gradient">synchronized.</span></>}
            />
            <Link to="/portfolio" className="btn-ghost !text-[11px]">View portfolio <ArrowRight size={14} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { img: portfolio1, t: "Command Center", c: "AV · ELV" },
              { img: portfolio2, t: "Executive Boardroom", c: "AV Integration" },
              { img: portfolio3, t: "Edge Data Facility", c: "IT · Networking" },
            ].map((p) => (
              <div key={p.t} className="group relative overflow-hidden rounded-sm border border-border">
                <img src={p.img} alt={p.t} width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.c}</div>
                    <div className="font-heading text-lg uppercase tracking-wide mt-1">{p.t}</div>
                  </div>
                  <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
                <Link to="/contact" className="btn-hero">Request Consultation <ArrowRight size={16} /></Link>
                <Link to="/services" className="btn-ghost">Explore Services</Link>
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
