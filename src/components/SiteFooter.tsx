import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import icon from "@/assets/commsynix-icon.png";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <img
        src={icon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 w-72 opacity-[0.04] select-none"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <Logo imgClassName="h-12 md:h-16" />
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Intelligent synchronization of communication and technology systems.
            Engineering future-ready environments across enterprise, infrastructure
            and smart spaces.
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-float" />
            System online · v2.26
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-primary">Project Estimator</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground col-span-1">
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Contact Desk</h4>
          <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary shrink-0" /> <span><span className="block text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-0.5">India Operations</span>Chennai & Cochin Office Hubs</span></p>
          <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary shrink-0" /> <span><span className="block text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-0.5">UAE Operations</span>Dubai & Abu Dhabi Office Hubs</span></p>
          <p className="flex items-center gap-2"><Mail size={14} className="text-primary shrink-0" /> hello@commsynix.com</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-primary shrink-0" /> <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80">IN</span> +91 88840 08432</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-primary shrink-0" /> <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80">UAE</span> +971 52 168 7833</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-center flex-wrap gap-2">
        <span>© {new Date().getFullYear()} COMMSYNIX · INTELLIGENT SYSTEMS.</span>
        <span className="text-border/60">|</span>
        <Link to="/admin-portal-login" className="hover:text-primary transition-colors lowercase tracking-normal text-muted-foreground/60">
          admin-portal
        </Link>
      </div>
    </footer>
  );
}
