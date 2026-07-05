import { ClayCard } from "./ClayCard";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

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
    <ClayCard
      className={cn("nss-text-center", className)}
      style={{ padding: "1.25rem", height: "100%" }}
    >
      {/* Avatar — square crop, smooth circle */}
      <div
        style={{
          margin: "0 auto",
          width: "5.5rem",
          height: "5.5rem",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: "2.5px solid var(--border)",
          boxShadow: "0 4px 16px hsl(150 30% 10% / 0.10)",
          transition: "box-shadow 0.25s ease",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "var(--muted)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted-foreground)",
            }}
          >
            <User style={{ height: "1.75rem", width: "1.75rem" }} aria-hidden />
            <span style={{ fontSize: "8px", fontWeight: 700, marginTop: "4px", opacity: 0.7 }}>No Photo</span>
          </div>
        )}
      </div>

      <h3 className="nss-mt-3 nss-font-bold nss-leading-tight nss-break-words" style={{ fontSize: "0.9375rem" }}>
        {name}
      </h3>
      {role && (
        <p
          className="nss-text-xs nss-font-semibold nss-mt-1"
          style={{ color: "var(--accent)", letterSpacing: "0.03em", textTransform: "uppercase" }}
        >
          {role}
        </p>
      )}
      {bio && (
        <p className="nss-mt-2 nss-text-xs nss-text-muted nss-leading-relaxed">{bio}</p>
      )}
    </ClayCard>
  );
}
