import { Link } from "@tanstack/react-router";
import logo from "@/assets/commsynix-logo-white.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center group ${className}`} aria-label="Commsynix">
      <img
        src={logo}
        alt="Commsynix"
        width={647}
        height={121}
        className="h-7 md:h-8 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}
