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
    <div className="clay-sm flex flex-col items-center justify-center w-full min-w-fit px-4 py-4 text-center h-full">
      <span className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-medium text-muted-foreground whitespace-normal sm:whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
