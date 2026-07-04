/**
 * ImpactStat — key metric tile
 *
 * One of the core use-cases for stronger clay (clay-sm with restrained shadow).
 * The value uses crimson (primary) to highlight the brand number.
 */
export function ImpactStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="clay-sm flex h-full min-h-24 w-full min-w-0 flex-col items-center justify-center px-3 py-4 text-center">
      <span className="font-display text-2xl font-extrabold leading-none text-primary sm:text-3xl">
        {value}
      </span>
      <span className="mt-2 max-w-full text-[11px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
}
