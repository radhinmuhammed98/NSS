import { cn } from "@/lib/utils";

/**
 * Badge — semantic label pill
 *
 * Variants:
 *   soft    — primary/10 background, crimson text (categories, tags)
 *   accent  — gold/15 background, gold text (awards, featured, milestones)
 *   outline — neutral border (metadata, secondary labels)
 */
export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: React.ReactNode;
  variant?: "soft" | "accent" | "outline";
  className?: string;
}) {
  const styles = {
    soft: "bg-primary/10 text-primary",
    accent: "bg-legacy-gold/15 text-legacy-gold",
    outline: "border border-border text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
