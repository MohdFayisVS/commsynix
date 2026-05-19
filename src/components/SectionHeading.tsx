export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary" />
        <span className="text-[11px] uppercase tracking-[0.35em] text-primary font-display">{eyebrow}</span>
      </div>
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.05] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
