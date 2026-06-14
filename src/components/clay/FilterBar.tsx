import { cn } from "@/lib/utils";

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

/**
 * FilterBar — horizontal filter pill groups
 *
 * Active filter pill: NSS crimson background (selected state = brand intent).
 * Inactive pill: clean neutral, no clay shadow.
 */
export function FilterBar({
  groups,
  active,
  onChange,
}: {
  groups: FilterGroup[];
  active: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="clay-sm mb-8 flex flex-col gap-4 p-4" role="group" aria-label="Filters">
      {groups.map((group) => (
        <div key={group.key} className="flex flex-wrap items-center gap-2">
          <span
            id={`filter-label-${group.key}`}
            className="mr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            {group.label}
          </span>
          <div role="group" aria-labelledby={`filter-label-${group.key}`} className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const isActive = (active[group.key] ?? "all") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(group.key, opt.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-surface"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
