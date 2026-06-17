import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Mail, Phone, MapPin, MessageCircle, Mic, Send } from "lucide-react";
import { VoiceEnquiryDialog } from "@/components/VoiceEnquiryDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Systems Integration Desk — COMMSYNIX" },
      { name: "description", content: "Reach our ELV, AV, and networking engineers in India (Kerala, Tamil Nadu) and the Middle East (Dubai, Abu Dhabi)." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Valid phone number is required").max(30),
  message: z.string().trim().min(5, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [voiceOpen, setVoiceOpen] = useState(false);

  // Listen for transcriptions from header voice desk triggers
  useEffect(() => {
    const handleTranscribe = (e: Event) => {
      const text = (e as CustomEvent).detail;
      if (text) {
        setMessage(text);
      }
    };
    window.addEventListener("voice-transcribe", handleTranscribe);
    return () => window.removeEventListener("voice-transcribe", handleTranscribe);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: message, // Use the state message
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    const payload = {
      id: "lead-" + Date.now(),
      type: "contact",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      description: parsed.data.message,
      date: new Date().toISOString(),
      status: "new",
    };

    // Save lead to localStorage
    const existing = JSON.parse(localStorage.getItem("commsynix_leads") || "[]");
    localStorage.setItem("commsynix_leads", JSON.stringify([...existing, payload]));

    setSent(true);
    toast.success("Enquiry logged. An engineer will respond shortly.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Regional Contact Hubs"
            title={<>Let's architect your <span className="text-gradient">intelligent environment.</span></>}
            description="Connect with our integration desk. We support enterprise tenders and smart residential environments across India and the Gulf."
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-8">
          {/* REGIONAL CONTACT INFO */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, l: "UAE Operations", v: "Office 114, Al Tiqani Street, Central District, Al Ain, Abu Dhabi" },
              { icon: MapPin, l: "India Operations (Kerala)", v: "1/290 Silent Valley, Mukkali PO, Mannarkkad, Cochin" },
              { icon: MapPin, l: "India Operations (Tamil Nadu)", v: "Level 4, Techno-Hub, OMR Road, Chennai" },
              { icon: Mail, l: "Regional Desk Email", v: "hello@commsynix.com" },
              { icon: Phone, l: "UAE Support", v: "+971 52 168 7833" },
              { icon: Phone, l: "India Support", v: "+91 88840 08432" },
            ].map((c) => (
              <div key={c.l} className="glass rounded-sm p-5 flex items-start gap-4">
                <span className="h-10 w-10 grid place-items-center rounded-sm bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <c.icon size={16} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{c.l}</div>
                  <div className="text-sm text-foreground mt-1 leading-relaxed">{c.v}</div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => setVoiceOpen(true)}
              className="glass rounded-sm p-5 w-full flex items-center gap-4 hover:border-primary/60 transition-colors text-left cursor-pointer"
            >
              <span className="h-10 w-10 grid place-items-center rounded-sm bg-primary/15 text-primary border border-primary/30 animate-float shrink-0">
                <Mic size={16} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Voice Desk Enquiry</div>
                <div className="text-sm text-foreground mt-1">Dictate your environment specifications</div>
              </div>
            </button>
          </div>

          {/* CONTACT FORM */}
          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-sm p-8 md:p-10 corner-frame space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Full Name</label>
              <input
                name="name"
                maxLength={100}
                required
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
                placeholder="e.g. Rahul Nair"
              />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Corporate Email</label>
                <input
                  name="email"
                  type="email"
                  maxLength={255}
                  required
                  className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  maxLength={30}
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
                  placeholder="e.g. +971 50 123 4567"
                />
              </div>
            </div>
            
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-primary">Project Brief</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={1000}
                required
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none transition-colors"
                placeholder="Describe your ELV, AV, or structured cabling requirements..."
              />
            </div>
            
            {error && <p className="text-xs text-destructive uppercase tracking-[0.2em]">{error}</p>}
            
            {sent ? (
              <p className="text-sm text-primary uppercase tracking-[0.2em] animate-fade-up">
                Enquiry logged in Control Console. We will connect shortly.
              </p>
            ) : (
              <button type="submit" className="btn-hero cursor-pointer">
                Send Enquiry <Send size={14} />
              </button>
            )}
          </form>
        </div>
      </section>
      
      <SiteFooter />

      <VoiceEnquiryDialog
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onTranscribeComplete={(text) => {
          setMessage(text);
        }}
      />
    </div>
  );
}
