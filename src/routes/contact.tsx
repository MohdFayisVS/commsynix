import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Mail, Phone, MapPin, MessageCircle, Mic, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Commsynix" },
      { name: "description", content: "Request a consultation, send a voice enquiry, or connect with our integration team." },
      { property: "og:title", content: "Contact — Commsynix" },
      { property: "og:description", content: "Let's architect your intelligent environment." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Contact"
            title={<>Let's architect your <span className="text-gradient">intelligent environment.</span></>}
            description="Reach our integration desk. We'll respond within one business day."
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, l: "Address", v: "1/290 Silent Valley, Mukkali PO, Mannarkkad, Palakkad" },
              { icon: Mail, l: "Email", v: "hello@commsynix.com" },
              { icon: Phone, l: "Phone", v: "+91 00000 00000" },
              { icon: MessageCircle, l: "WhatsApp", v: "Chat with our team" },
            ].map((c) => (
              <div key={c.l} className="glass rounded-sm p-5 flex items-start gap-4">
                <span className="h-10 w-10 grid place-items-center rounded-sm bg-primary/10 text-primary border border-primary/20">
                  <c.icon size={16} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{c.l}</div>
                  <div className="text-sm text-foreground mt-1">{c.v}</div>
                </div>
              </div>
            ))}
            <button className="glass rounded-sm p-5 w-full flex items-center gap-4 hover:border-primary/60 transition-colors text-left">
              <span className="h-10 w-10 grid place-items-center rounded-sm bg-primary/15 text-primary border border-primary/30 animate-float">
                <Mic size={16} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Voice Enquiry</div>
                <div className="text-sm text-foreground mt-1">Send a voice note to our team</div>
              </div>
            </button>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-sm p-8 md:p-10 corner-frame space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Name</label>
              <input
                name="name"
                maxLength={100}
                required
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-foreground placeholder:text-muted-foreground/60"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Email</label>
              <input
                name="email"
                type="email"
                maxLength={255}
                required
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-foreground placeholder:text-muted-foreground/60"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Project Brief</label>
              <textarea
                name="message"
                rows={5}
                maxLength={1000}
                required
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-foreground placeholder:text-muted-foreground/60 resize-none"
                placeholder="Tell us about your environment, scope and timeline…"
              />
            </div>
            {error && <p className="text-xs text-destructive uppercase tracking-[0.2em]">{error}</p>}
            {sent ? (
              <p className="text-sm text-primary uppercase tracking-[0.2em]">Enquiry received — we'll be in touch shortly.</p>
            ) : (
              <button type="submit" className="btn-hero">
                Send Enquiry <Send size={14} />
              </button>
            )}
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
