/**
 * ImpactStat — key metric tile (Vanilla CSS implementation)
 */
export function ImpactStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="nss-impact-stat" style={{ minHeight: "6rem" }}>
      <span className="nss-font-display nss-text-2xl nss-font-extrabold nss-leading-none nss-text-primary nss-sm-text-3xl">
        {value}
      </span>
      <span className="nss-mt-2 nss-text-xs nss-font-semibold nss-uppercase nss-leading-tight nss-text-muted">
        {label}
      </span>
    </div>
  );
}
