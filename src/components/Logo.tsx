import { Link } from "@tanstack/react-router";
import logo from "@/assets/commsynix-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center group ${className}`} aria-label="Commsynix">
      <img
        src={logo}
        alt="Commsynix"
        width={750}
        height={290}
        className="h-9 md:h-10 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}
