import { Link } from "@tanstack/react-router";
import icon from "@/assets/commsynix-icon.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="Commsynix">
      <img
        src={icon}
        alt=""
        width={175}
        height={250}
        className="h-8 md:h-9 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <span className="font-display text-[15px] md:text-base tracking-[0.22em] text-foreground/95 group-hover:text-primary transition-colors">
        COMMSYNIX
      </span>
    </Link>
  );
}
