import { services } from "@/data/services";

export function ServiceGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((s) => (
        <div
          key={s.code}
          className="group relative bg-background p-7 min-h-[230px] flex flex-col justify-between transition-all duration-500 hover:bg-card"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="font-display text-[10px] tracking-[0.35em] text-primary">{s.code}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_10px_var(--cyan-glow)] transition-all" />
            </div>
            <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground">
              {s.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {s.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border/80 px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
