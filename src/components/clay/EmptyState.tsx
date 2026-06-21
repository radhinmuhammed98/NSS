/**
 * EmptyState — shown when a list has no results.
 *
 * Uses clay-inset (neutral warm well) — restrained, not a red block.
 */
export function EmptyState({ title, message }: { title?: string; message: string }) {
  return (
    <div className="clay-inset flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="text-3xl" aria-hidden>
        🌱
      </span>
      {title && <p className="font-display text-lg font-semibold">{title}</p>}
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
