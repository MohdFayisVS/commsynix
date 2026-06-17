import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, Mic } from "lucide-react";
import { VoiceEnquiryDialog } from "./VoiceEnquiryDialog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${
            scrolled ? "glass-strong rounded-sm" : ""
          }`}
        >
          <div className="flex items-center justify-between h-14">
            <Logo />
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-all duration-300 rounded-sm"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{n.label}</span>
                      {/* Smooth slider hover state */}
                      <span
                        className={`absolute inset-x-3 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 hover:scale-x-100 hover:opacity-100"
                        }`}
                      />
                    </>
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setVoiceOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors border border-border/40 hover:border-primary/40 rounded-sm bg-background/20 cursor-pointer"
                aria-label="Voice Enquiry"
              >
                <Mic size={12} className="text-primary animate-float" />
                <span>Voice Desk</span>
              </button>
              
              <Link to="/quote" className="btn-hero !py-2 !px-4 !text-[10px]">
                Get a Quote
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setVoiceOpen(true)}
                className="p-2 text-primary cursor-pointer"
                aria-label="Voice Enquiry"
              >
                <Mic size={18} className="animate-float" />
              </button>
              
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="p-2 text-foreground cursor-pointer"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden mt-2 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 flex flex-col gap-1 animate-fade-up bg-background border-t border-b border-border/60 shadow-elev">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary border-b border-border/40 last:border-b-0"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm uppercase tracking-[0.2em] text-primary border-b border-border/40 font-semibold"
              >
                Get a Quote
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  setVoiceOpen(true);
                }}
                className="px-3 py-3 text-sm uppercase tracking-[0.2em] text-primary flex items-center gap-2 text-left cursor-pointer"
              >
                <Mic size={14} className="animate-float" /> Voice Enquiry Desk
              </button>
            </div>
          )}
        </div>
      </header>

      <VoiceEnquiryDialog
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onTranscribeComplete={(text) => {
          window.dispatchEvent(new CustomEvent("voice-transcribe", { detail: text }));
        }}
      />
    </>
  );
}
