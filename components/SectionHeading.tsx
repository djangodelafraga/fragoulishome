// ============================================
// fragoulishome.gr — SectionHeading
// Reusable section heading with optional subtitle.
// ============================================

interface SectionHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ as: Tag = "h2", children, subtitle, id }: SectionHeadingProps) {
  return (
    <header style={{ marginBottom: "var(--space-xl)" }}>
      <Tag id={id} style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", marginBottom: subtitle ? "var(--space-sm)" : 0 }}>
        {children}
      </Tag>
      {subtitle && (
        <p style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)", maxWidth: "36em", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </header>
  );
}