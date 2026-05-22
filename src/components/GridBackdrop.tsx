import { BrandMark } from "./BrandMark";

export function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-animated opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
      <BrandMark
        size={520}
        className="absolute -right-32 -bottom-32 text-primary/[0.04] hidden md:block"
      />
      <span className="absolute top-1/4 left-[12%] h-1.5 w-1.5 rounded-full bg-primary animate-float shadow-[0_0_14px_var(--cyan-glow)]" />
      <span className="absolute top-1/3 right-[18%] h-1 w-1 rounded-full bg-primary/70 animate-float [animation-delay:1s]" />
      <span className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-primary/80 animate-float [animation-delay:2s]" />
      <span className="absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-primary animate-float [animation-delay:0.5s] shadow-[0_0_12px_var(--cyan-glow)]" />
    </div>
  );
}
