import { cn } from "@/lib/utils";

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

/**
 * FilterBar — horizontal filter pill groups (Vanilla CSS implementation)
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
    <div className="clay-sm nss-mb-8 nss-flex nss-flex-col nss-gap-4 nss-p-4" role="group" aria-label="Filters">
      {groups.map((group) => (
        <div key={group.key} className="nss-flex nss-flex-wrap nss-items-center nss-gap-2">
          <span
            id={`filter-label-${group.key}`}
            className="nss-text-xs nss-font-bold nss-uppercase nss-text-muted"
            style={{ marginRight: "0.25rem" }}
          >
            {group.label}
          </span>
          <div role="group" aria-labelledby={`filter-label-${group.key}`} className="nss-flex nss-flex-wrap nss-gap-2">
            {group.options.map((opt) => {
              const isActive = (active[group.key] ?? "all") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(group.key, opt.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "nss-badge cursor-pointer",
                    isActive
                      ? "nss-badge-default"
                      : "nss-badge-outline hover:nss-bg-muted"
                  )}
                  style={{ padding: "0.375rem 0.75rem", borderRadius: "var(--radius-md)" }}
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
