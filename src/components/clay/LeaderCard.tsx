import { ClayCard } from "./ClayCard";
import { cn } from "@/lib/utils";

/**
 * LeaderCard — profile card for a team member or officer (Vanilla CSS implementation)
 */
export function LeaderCard({
  name,
  role,
  bio,
  photo,
  className,
}: {
  name: string;
  role?: string;
  bio?: string;
  photo?: string | null;
  className?: string;
}) {
  return (
    <ClayCard className={cn("nss-text-center", className)} style={{ height: "100%", padding: "1rem" }}>
      {/* Avatar */}
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          decoding="async"
          style={{
            margin: "0 auto",
            height: "6rem",
            width: "6rem",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      ) : (
        <div
          style={{
            margin: "0 auto",
            height: "6rem",
            width: "6rem",
            borderRadius: "50%",
            backgroundColor: "rgba(27, 58, 63, 0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)",
            border: "1px solid rgba(27, 58, 63, 0.1)"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "2rem" }} aria-hidden>
            account_circle
          </span>
          <span className="nss-text-xs nss-font-bold nss-uppercase" style={{ fontSize: "9px", opacity: 0.8, marginTop: "4px" }}>
            Photo Awaiting
          </span>
        </div>
      )}

      {/* Info */}
      <h3 className="nss-mt-3 nss-font-bold nss-leading-tight nss-break-words">
        {name}
      </h3>
      {role && (
        <p className="nss-text-xs nss-font-semibold nss-text-accent nss-mt-1">{role}</p>
      )}
      {bio && (
        <p className="nss-mt-2 nss-text-xs nss-text-muted nss-leading-relaxed">
          {bio}
        </p>
      )}
    </ClayCard>
  );
}
