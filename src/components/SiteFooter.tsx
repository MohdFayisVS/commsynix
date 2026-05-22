import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { BrandMark } from "./BrandMark";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <BrandMark size={360} className="pointer-events-none absolute -left-20 -bottom-24 text-primary/[0.05]" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Intelligent synchronization of communication and technology systems.
            Engineering future-ready environments across enterprise, infrastructure
            and smart spaces.
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-float" />
            System online · v1.0
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Contact</h4>
          <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary" /> 1/290 Silent Valley, Mukkali PO, Mannarkkad, Palakkad</p>
          <p className="flex items-center gap-2"><Mail size={14} className="text-primary" /> hello@commsynix.com</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-primary" /> +91 88840 08432</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Commsynix · Intelligent Systems. Seamlessly Integrated.
      </div>
    </footer>
  );
}
