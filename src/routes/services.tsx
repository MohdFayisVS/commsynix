import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ServiceGrid } from "@/components/ServiceGrid";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Commsynix" },
      { name: "description", content: "IT, ELV, AV, smart automation, AI, networking, smart buildings and IoT — engineered into one synchronized platform." },
      { property: "og:title", content: "Services — Commsynix" },
      { property: "og:description", content: "Eight integration disciplines, one intelligent platform." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Capabilities"
            title={<>Eight disciplines. <span className="text-gradient">One intelligent platform.</span></>}
            description="From low-voltage cabling to AI-driven orchestration, every layer is engineered, integrated and commissioned in-house."
          />
        </div>
      </section>
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <ServiceGrid />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
