import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import { ArrowUpRight } from "lucide-react";

const filters = ["All", "AV", "ELV", "Networking", "Automation", "Smart Buildings"] as const;

const projects = [
  { img: p1, t: "Mission Command Center", c: "AV", loc: "Bengaluru" },
  { img: p2, t: "Executive Boardroom", c: "AV", loc: "Dubai" },
  { img: p3, t: "Edge Data Facility", c: "Networking", loc: "Cochin" },
  { img: p4, t: "Residential Automation", c: "Automation", loc: "Palakkad" },
  { img: p1, t: "Security Operations", c: "ELV", loc: "Riyadh" },
  { img: p2, t: "Smart Campus", c: "Smart Buildings", loc: "Abu Dhabi" },
];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Commsynix" },
      { name: "description", content: "Selected integration projects across AV, ELV, networking, automation and smart buildings." },
      { property: "og:title", content: "Portfolio — Commsynix" },
      { property: "og:description", content: "Spaces synchronized. Explore our project gallery." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.c === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title={<>Spaces, <span className="text-gradient">synchronized.</span></>}
            description="A glimpse into environments where engineering precision meets cinematic experience."
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.25em] border transition-all ${
                  active === f
                    ? "border-primary text-primary shadow-[0_0_14px_var(--cyan-glow)]"
                    : "border-border/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((p, i) => (
              <div key={`${p.t}-${i}`} className="group relative overflow-hidden rounded-sm border border-border animate-fade-up">
                <img src={p.img} alt={p.t} width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary glass px-2.5 py-1">{p.c}</span>
                    <ArrowUpRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <div className="font-heading text-xl uppercase tracking-wide">{p.t}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{p.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
