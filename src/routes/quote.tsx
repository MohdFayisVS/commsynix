import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Project Estimator — COMMSYNIX" },
      { name: "description", content: "Configure your integration requirements dynamically and request a customized commercial proposal." },
    ],
  }),
  component: GetQuotePage,
});

type MarketType = "commercial" | "soho" | "residential" | "";

const SCOPE_OPTIONS: Record<Exclude<MarketType, "">, { id: string; label: string; desc: string }[]> = {
  commercial: [
    { id: "structured_cabling", label: "Structured Cabling", desc: "Cat6A/7 copper & fiber backbone grids" },
    { id: "cctv_acs", label: "ELV Security (CCTV & ACS)", desc: "IP surveillance & access control integrations" },
    { id: "boardrooms", label: "AV Meeting Rooms", desc: "Unified corporate conferencing & automation" },
    { id: "bms_integration", label: "BMS Integration", desc: "Centralized energy and HVAC control loops" },
  ],
  soho: [
    { id: "soho_network", label: "Secure Networking", desc: "Low-latency office Wi-Fi & SD-WAN firewall" },
    { id: "access_security", label: "Access & CCTV", desc: "Smart security & electronic lock locks" },
    { id: "conferencing", label: "Small Meeting Rooms", desc: "Efficient video display & soundbar systems" },
  ],
  residential: [
    { id: "home_automation", label: "Home Automation", desc: "KNX or Control4 centralized lighting & climate" },
    { id: "acoustic_av", label: "Home Theater & AV", desc: "Luxury private acoustics & multi-room audio" },
    { id: "smart_security", label: "Smart IoT & Security", desc: "Smart doorlocks, cameras, and sensor fabrics" },
  ],
};

function GetQuotePage() {
  const [step, setStep] = useState(1);
  const [market, setMarket] = useState<MarketType>("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("flexible");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNextStep = () => {
    if (step === 1 && !market) {
      toast.error("Please select a market sector");
      return;
    }
    if (step === 2 && scopes.length === 0) {
      toast.error("Please select at least one engineering scope");
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    setStep((s) => s - 1);
  };

  const handleMarketSelect = (val: MarketType) => {
    setMarket(val);
    setScopes([]); // Reset scopes when market changes
  };

  const handleScopeToggle = (id: string) => {
    setScopes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Please fill out name, email, and phone number");
      return;
    }

    const payload = {
      id: "lead-" + Date.now(),
      type: "estimator",
      market,
      scopes,
      description,
      timeline,
      name,
      email,
      phone,
      company,
      date: new Date().toISOString(),
      status: "new",
    };

    // Save lead to localStorage
    const existing = JSON.parse(localStorage.getItem("commsynix_leads") || "[]");
    localStorage.setItem("commsynix_leads", JSON.stringify([...existing, payload]));

    setSubmitted(true);
    toast.success("Project estimate request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-40 pb-32 overflow-hidden">
        <GridBackdrop />

        <div className="relative mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Interactive Estimator"
            title={<>Configure your <span className="text-gradient">system.</span></>}
            description="Complete this 3-step project builder to qualify your deployment details and receive a customized technical outline."
          />

          <div className="mt-12 bg-card rounded-sm border border-border p-8 md:p-10 corner-frame">
            {/* PROGRESS BAR */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/60">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`h-7 w-7 rounded-sm flex items-center justify-center font-heading text-xs transition-all ${
                      step >= num
                        ? "bg-primary text-background font-semibold shadow-[0_0_10px_var(--cyan-glow)]"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {step > num ? <Check size={12} /> : num}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-wider hidden sm:inline ${
                      step >= num ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {num === 1 ? "Sector" : num === 2 ? "Scope" : "Contact Details"}
                  </span>
                  {num < 3 && <div className="h-px w-8 sm:w-16 bg-border/60 ml-2" />}
                </div>
              ))}
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-5 animate-fade-up">
                <div className="h-16 w-16 bg-primary/10 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-4 text-primary animate-pulse-glow">
                  <Check size={32} />
                </div>
                <h3 className="font-heading text-2xl uppercase tracking-wide">
                  Configuration Logged
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your project requirements have been synthesized. An integration engineer from our regional branch will contact you within 24 hours to present a draft layout.
                </p>
                <div className="pt-4">
                  <Link to="/" className="btn-hero cursor-pointer">
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: MARKET */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-up">
                    <h3 className="font-heading text-xl uppercase tracking-wide text-foreground mb-4">
                      Select Your Market Sector
                    </h3>
                    <div className="grid gap-4">
                      {[
                        {
                          id: "commercial",
                          label: "Commercial & Enterprise",
                          desc: "Boardrooms, structured cabling backbones, command centers, and SIRA-compliant security setups.",
                        },
                        {
                          id: "soho",
                          label: "SOHO / Small Business",
                          desc: "Low-latency office networks, smart lighting control, digital signage, and secure access systems.",
                        },
                        {
                          id: "residential",
                          label: "Premium Residential",
                          desc: "Luxury KNX automation, home acoustics, security cameras, smart climate loops, and IoT control.",
                        },
                      ].map((item) => (
                        <label
                          key={item.id}
                          onClick={() => handleMarketSelect(item.id as MarketType)}
                          className={`relative border p-5 rounded-sm cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                            market === item.id
                              ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(34,211,238,0.05)]"
                              : "border-border/60 bg-transparent hover:border-border"
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="font-heading text-base uppercase tracking-wide text-foreground block">
                              {item.label}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed block max-w-lg">
                              {item.desc}
                            </span>
                          </div>
                          <div
                            className={`h-5 w-5 rounded-sm border flex items-center justify-center shrink-0 ${
                              market === item.id
                                ? "border-primary bg-primary text-background"
                                : "border-border/80"
                            }`}
                          >
                            {market === item.id && <Check size={12} className="stroke-[3]" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: SCOPE */}
                {step === 2 && market && (
                  <div className="space-y-4 animate-fade-up">
                    <h3 className="font-heading text-xl uppercase tracking-wide text-foreground mb-4">
                      Select Engineering Scope
                    </h3>
                    <div className="grid gap-4">
                      {SCOPE_OPTIONS[market].map((opt) => {
                        const isSelected = scopes.includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            onClick={() => handleScopeToggle(opt.id)}
                            className={`relative border p-5 rounded-sm cursor-pointer flex items-center justify-between gap-4 transition-all duration-300 ${
                              isSelected
                                ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(34,211,238,0.05)]"
                                : "border-border/60 bg-transparent hover:border-border"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-heading text-base uppercase tracking-wide text-foreground block">
                                {opt.label}
                              </span>
                              <span className="text-xs text-muted-foreground leading-relaxed block">
                                {opt.desc}
                              </span>
                            </div>
                            <div
                              className={`h-5 w-5 rounded-sm border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-primary bg-primary text-background"
                                  : "border-border/80"
                              }`}
                            >
                              {isSelected && <Check size={12} className="stroke-[3]" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: DETAILS & CONTACT */}
                {step === 3 && (
                  <div className="space-y-5 animate-fade-up">
                    <h3 className="font-heading text-xl uppercase tracking-wide text-foreground mb-4">
                      Project Details & Contact
                    </h3>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Tell us about the project
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please outline any specific requirements, estimated area size, location, or constraints..."
                        rows={4}
                        className="w-full bg-background/50 border border-border/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 rounded-sm text-sm text-foreground transition-all custom-scrollbar"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                        Expected Project Timeline
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "urgent", label: "Urgent (< 1 month)" },
                          { id: "standard", label: "1 - 3 Months" },
                          { id: "flexible", label: "Flexible / Planning" },
                        ].map((t) => (
                          <label
                            key={t.id}
                            onClick={() => setTimeline(t.id)}
                            className={`border p-3 text-center text-xs uppercase tracking-wider rounded-sm cursor-pointer transition-all ${
                              timeline === t.id
                                ? "border-primary text-primary bg-primary/5"
                                : "border-border/60 text-muted-foreground hover:border-border"
                            }`}
                          >
                            {t.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full bg-background/50 border border-border/80 focus:border-primary outline-none px-4 py-3 rounded-sm text-sm text-foreground transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@company.com"
                          className="w-full bg-background/50 border border-border/80 focus:border-primary outline-none px-4 py-3 rounded-sm text-sm text-foreground transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +971 50 123 4567"
                          className="w-full bg-background/50 border border-border/80 focus:border-primary outline-none px-4 py-3 rounded-sm text-sm text-foreground transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. CommSynix Global"
                          className="w-full bg-background/50 border border-border/80 focus:border-primary outline-none px-4 py-3 rounded-sm text-sm text-foreground transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* NAVIGATION BUTTONS */}
                <div className="flex justify-between pt-6 border-t border-border/60">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost !py-2.5 !px-5 !text-[11px] cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-hero !py-2.5 !px-5 !text-[11px] cursor-pointer flex items-center gap-2"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-hero !py-2.5 !px-5 !text-[11px] cursor-pointer flex items-center gap-2 bg-primary text-background"
                    >
                      Submit Specification <Send size={12} />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
