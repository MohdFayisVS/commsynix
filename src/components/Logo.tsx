import { Link } from "@tanstack/react-router";
import logo from "@/assets/commsynix-logo-transparent.png";

export function Logo({
  className = "",
  imgClassName = "h-10 md:h-12",
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link to="/" className={`flex items-center group ${className}`} aria-label="Commsynix">
      <img
        src={logo}
        alt="Commsynix"
        width={1200}
        height={1200}
        className={`w-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-500 ${imgClassName}`}
      />
    </Link>
  );
}
