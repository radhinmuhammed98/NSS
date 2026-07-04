/**
 * EmptyState — shown when a list has no results (Vanilla CSS implementation)
 */
export function EmptyState({
  title,
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div className="clay-inset nss-flex nss-flex-col nss-items-center nss-justify-center nss-gap-2 nss-px-5 nss-py-14 nss-text-center">
      <span style={{ fontSize: "1.875rem" }} aria-hidden>
        🌱
      </span>
      {title && (
        <p className="nss-font-display nss-text-lg nss-font-semibold">{title}</p>
      )}
      <p className="nss-text-sm nss-text-muted" style={{ maxWidth: "24rem" }}>{message}</p>
    </div>
  );
}
