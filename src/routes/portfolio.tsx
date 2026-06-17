import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
  description: string;
}

const filters = ["All", "AV", "ELV", "Networking", "Automation", "Smart Buildings"] as const;

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Case Studies — COMMSYNIX" },
      { name: "description", content: "Selected integration projects across AV, ELV, networking, automation and smart buildings in India and the UAE." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("commsynix_projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Seed default if empty
      const defaultProjects: Project[] = [
        { id: "proj-1", title: "Mission Command Center", category: "AV", imgUrl: "/src/assets/portfolio-1.jpg", description: "High-density command center video wall installation." },
        { id: "proj-2", title: "Executive Boardroom", category: "AV", imgUrl: "/src/assets/portfolio-2.jpg", description: "Interactive executive boardroom with Q-SYS audio integration." },
        { id: "proj-3", title: "Edge Data Facility", category: "Networking", imgUrl: "/src/assets/portfolio-3.jpg", description: "Structured cabling backbone and data racks." },
        { id: "proj-4", title: "Residential Automation", category: "Automation", imgUrl: "/src/assets/portfolio-4.jpg", description: "Luxury home lighting, climate, and security loops." },
      ];
      localStorage.setItem("commsynix_projects", JSON.stringify(defaultProjects));
      setProjects(defaultProjects);
    }
  }, []);

  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Portfolio Case Studies"
            title={<>Spaces, <span className="text-gradient">synchronized.</span></>}
            description="Explore our cross-regional engineering showcases where technical precision meets intelligent control."
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
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.25em] border transition-all cursor-pointer ${
                  active === f
                    ? "border-primary text-primary shadow-[0_0_14px_var(--cyan-glow)] bg-primary/5"
                    : "border-border/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((p, i) => (
              <div key={`${p.id}-${i}`} className="group relative overflow-hidden rounded-sm border border-border animate-fade-up">
                <img
                  src={p.imgUrl}
                  alt={p.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary glass px-2.5 py-1">
                      {p.category}
                    </span>
                    <ArrowUpRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl uppercase tracking-wide mb-1 text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
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
