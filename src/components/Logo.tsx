import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-sm border border-primary/60 group-hover:rotate-45 transition-transform duration-500" />
        <span className="absolute inset-1.5 rounded-sm bg-primary/20 blur-[2px]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--cyan-glow)]" />
      </span>
      <span className="font-display text-base font-bold uppercase tracking-[0.28em] text-foreground">
        Comm<span className="text-gradient">synix</span>
      </span>
    </Link>
  );
}
