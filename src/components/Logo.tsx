import { Link } from "@tanstack/react-router";
import logo from "@/assets/commsynix-logo-dark.jpg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center group ${className}`} aria-label="Commsynix">
      <img
        src={logo}
        alt="Commsynix"
        width={1000}
        height={1000}
        className="h-8 md:h-10 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity mix-blend-screen"
      />
    </Link>
  );
}
