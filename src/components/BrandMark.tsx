type Props = {
  className?: string;
  size?: number;
  withNodes?: boolean;
  title?: string;
};

/**
 * Commsynix brand mark — abstract C+S circuit glyph.
 * Stroke uses currentColor so it inherits theme color.
 * Accent nodes use the cyan primary token.
 */
export function BrandMark({
  className = "",
  size = 24,
  withNodes = true,
  title = "Commsynix mark",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <title>{title}</title>
      {/* Outer C */}
      <path
        d="M50 16c-4-5-10-8-18-8C18 8 8 18 8 32s10 24 24 24c8 0 14-3 18-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Inner S sweep */}
      <path
        d="M40 22c-3-2-7-3-10-2-5 2-6 8-2 11l8 4c4 2 3 8-2 10-3 1-7 0-10-2"
        stroke="var(--cyan-glow)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {withNodes && (
        <>
          <circle cx="50" cy="16" r="2.5" fill="var(--cyan-glow)" />
          <circle cx="50" cy="48" r="2.5" fill="var(--cyan-glow)" />
          <circle cx="44" cy="32" r="1.5" fill="currentColor" opacity="0.7" />
        </>
      )}
    </svg>
  );
}
