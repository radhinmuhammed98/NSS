import { ClayCard } from "./ClayCard";
import { cn } from "@/lib/utils";

/**
 * LeaderCard — profile card for a team member or officer.
 *
 * Used in: Team page (leadership & volunteer grids).
 * Replaces duplicated photo + name + role + bio patterns in team.tsx.
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
    <ClayCard className={cn("h-full p-4 text-center sm:p-5", className)}>
      {/* Avatar */}
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto h-24 w-24 rounded-full bg-[#1b3a27]/10 flex flex-col items-center justify-center text-[#1b3a27] shadow-inner border border-[#1b3a27]/10">
          <span className="material-symbols-outlined text-3xl" aria-hidden>
            account_circle
          </span>
          <span className="text-[9px] font-bold uppercase opacity-80 mt-1">
            Photo Awaiting
          </span>
        </div>
      )}

      {/* Info */}
      <h3 className="mt-3 font-display font-bold leading-tight break-words">
        {name}
      </h3>
      {role && (
        <p className="text-xs font-semibold text-accent mt-0.5">{role}</p>
      )}
      {bio && (
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          {bio}
        </p>
      )}
    </ClayCard>
  );
}
