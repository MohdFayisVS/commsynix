import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Commsynix" },
      { name: "description", content: "Commsynix unifies communication, automation and intelligent infrastructure into seamless, future-ready ecosystems." },
      { property: "og:title", content: "About — Commsynix" },
      { property: "og:description", content: "Premium technology integration company. Engineering the intelligent environment." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-24 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="About"
            title={<>Intelligent synchronization of <span className="text-gradient">communication & technology.</span></>}
            description="Commsynix represents the convergence of communication (COMM), synchronization (SYN), and intelligent future technologies (IX) — a next-generation integrator engineering premium, connected environments."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-px bg-border/60 corner-frame">
          {[
            { k: "COMM", t: "Communication", d: "Network fabrics, AV pipelines and unified collaboration that connect every endpoint with cinematic clarity." },
            { k: "SYN", t: "Synchronization", d: "Cross-system orchestration where lighting, climate, security and media operate as one intelligent organism." },
            { k: "IX", t: "Intelligent Future", d: "AI, IoT and edge intelligence that elevate spaces from automated to genuinely adaptive." },
          ].map((c) => (
            <div key={c.k} className="bg-background p-8">
              <div className="font-display text-xs tracking-[0.35em] text-primary">{c.k}</div>
              <h3 className="mt-3 text-xl uppercase tracking-wide font-semibold">{c.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass-strong rounded-sm p-10 md:p-14">
            <h3 className="text-2xl md:text-3xl font-semibold uppercase tracking-tight leading-snug">
              We design environments that <span className="text-gradient">think, respond and evolve</span> — built on premium engineering and lifecycle partnership.
            </h3>
            <Link to="/services" className="btn-hero mt-8">See our capabilities <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
