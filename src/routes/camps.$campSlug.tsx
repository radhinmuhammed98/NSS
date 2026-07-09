import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Users, X } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat } from "@/components/clay";
import { HighlightCard } from "@/components/media";

import { formatDate, getCampBySlug, getHighlightsBySlugs } from "@/lib/data";
import type { CampDay, ImageAsset, ImpactMetric, Camp, Highlight } from "@/types";

export const Route = createFileRoute("/camps/$campSlug")({
  loader: async ({ params }: { params: { campSlug: string } }) => {
    const camp = await getCampBySlug(params.campSlug);
    if (!camp) throw notFound();
    const highlights = await getHighlightsBySlugs(camp.highlightSlugs);
    return { camp, highlights };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="nss-py-20 nss-text-center">
        <h1 className="nss-font-display nss-text-3xl nss-font-extrabold">Camp not found</h1>
        <Link to="/camps" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>← Back to camps</Link>
      </Container>
    </PageShell>
  ),
  component: CampPage,
});

function CampPage() {
  const { camp, highlights } = Route.useLoaderData() as {
    camp: Camp;
    highlights: Highlight[];
  };

  const [lightboxImage, setLightboxImage] = useState<ImageAsset | null>(null);

  return (
    <PageShell>
      <section className="nss-px-3 nss-pt-4">
        <Container className="nss-px-0">
          <Reveal>
            <div className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                {camp.coverImage && <img src={camp.coverImage} alt={camp.title} width={1280} height={549} fetchPriority="high" decoding="async" style={{ aspectRatio: "21/9", width: "100%", objectFit: "cover" }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27, 28, 25, 0.7) 0%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, padding: "1.5rem", color: "#ffffff" }}>
                  <Badge variant="accent">{camp.theme}</Badge>
                  <h1 className="nss-mt-2 nss-font-display nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl" style={{ color: "#ffffff" }}>{camp.title}</h1>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="nss-py-8">
        <div className="nss-flex nss-flex-wrap nss-gap-4 nss-text-sm nss-text-muted">
          <span className="nss-flex nss-items-center nss-gap-1"><MapPin style={{ height: "1rem", width: "1rem" }} /> {camp.location}</span>
          <span className="nss-flex nss-items-center nss-gap-1"><Calendar style={{ height: "1rem", width: "1rem" }} /> {formatDate(camp.startDate)} – {formatDate(camp.endDate)}</span>
          <span className="nss-flex nss-items-center nss-gap-1"><Users style={{ height: "1rem", width: "1rem" }} /> {camp.volunteerCount} volunteers</span>
        </div>

        <ClayCard tilt={false} className="nss-mt-6 nss-p-4 nss-sm-p-6">
          <h2 className="nss-font-display nss-text-xl nss-font-bold">Overview</h2>
          <p className="nss-mt-3 nss-text-muted">{camp.description}</p>
          <p className="nss-mt-3 nss-text-sm"><span className="nss-font-semibold">Programme Officer:</span> {camp.programmeOfficer}</p>
          <div className="nss-mt-2 nss-flex nss-flex-wrap nss-gap-2">
            {camp.campLeaders?.map((l: any, idx: number) => {
              const label = typeof l === "string" ? l : (l?.name || l?.title || "Leader");
              return <Badge key={`${label}-${idx}`}>{label}</Badge>;
            })}
          </div>
        </ClayCard>

        <div className="nss-mt-6 nss-grid nss-grid-cols-2 nss-gap-4 nss-sm-grid-cols-3">
          {camp.impactMetrics?.map((m: ImpactMetric) => <ImpactStat key={m.label} label={m.label} value={m.value} />)}
        </div>

        <h2 className="nss-mb-4 nss-mt-10 nss-font-display nss-text-2xl nss-font-extrabold">Day-wise Timeline</h2>
        <div className="nss-flex nss-flex-col nss-gap-5">
          {camp.dayWiseActivities?.map((d: CampDay, i: number) => (
            <Reveal key={d.dayNumber} delay={i * 0.05}>
              <ClayCard tilt={false} className="nss-flex nss-flex-col nss-gap-4 nss-sm-flex-row">
                <div className="nss-badge-accent nss-flex nss-shrink-0 nss-flex-col nss-items-center nss-justify-center" style={{ height: "4rem", width: "4rem", borderRadius: "var(--radius-lg)" }}>
                  <span className="nss-text-xs nss-font-bold nss-uppercase" style={{ fontSize: "10px" }}>Day</span>
                  <span className="nss-font-display nss-text-2xl nss-font-extrabold nss-leading-none">{d.dayNumber}</span>
                </div>
                <div className="nss-flex-1 nss-flex nss-gap-4 nss-justify-between nss-items-center" style={{ minWidth: 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="nss-text-xs nss-text-muted">{formatDate(d.date || "")}</p>
                    <h3 className="nss-font-display nss-text-lg nss-font-bold">{d.title}</h3>
                    <p className="nss-mt-1 nss-text-sm nss-text-muted">{d.description}</p>
                    <div className="nss-mt-3 nss-flex nss-flex-wrap nss-gap-2">
                      {d.activities?.map((a: any, idx: number) => {
                        const label = typeof a === "string" ? a : (a?.title || a?.name || "Activity");
                        return <Badge key={`${label}-${idx}`} variant="outline">{label}</Badge>;
                      })}
                    </div>
                    {d.guests && d.guests.length > 0 && (
                      <div className="nss-mt-3">
                        <p className="nss-text-xs nss-font-semibold nss-text-muted" style={{ margin: 0 }}>Guests & Resource Persons:</p>
                        <div className="nss-mt-1.5 nss-flex nss-flex-wrap nss-gap-2">
                          {d.guests.map((g: any, idx: number) => {
                            if (typeof g === "string") {
                              return (
                                <Badge key={idx} variant="outline" className="nss-py-1 nss-px-2.5">
                                  👤 {g}
                                </Badge>
                              );
                            }
                            return (
                              <div
                                key={idx}
                                className="nss-flex nss-items-center nss-gap-2 nss-px-2.5 nss-py-1 nss-rounded-full nss-border nss-bg-card nss-text-xs"
                                style={{ borderColor: "var(--border)", maxWidth: "100%", background: "var(--clay-deep)" }}
                              >
                                {g.photo ? (
                                  <img
                                    src={g.photo}
                                    alt={g.name}
                                    style={{
                                      height: "1.5rem",
                                      width: "1.5rem",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="nss-flex nss-items-center nss-justify-center nss-rounded-full"
                                    style={{ height: "1.5rem", width: "1.5rem", fontSize: "10px", background: "var(--muted)" }}
                                  >
                                    👤
                                  </div>
                                )}
                                <div style={{ minWidth: 0, lineHeight: 1.1 }}>
                                  <span className="nss-font-semibold">{g.name}</span>
                                  {(g.designation || g.organisation) && (
                                    <span className="nss-text-muted" style={{ fontSize: "10px", marginLeft: "4px" }}>
                                      ({[g.designation, g.organisation].filter(Boolean).join(" · ")})
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  {d.images && d.images.length > 0 && (
                    <div className="nss-flex nss-gap-2 nss-shrink-0" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "16rem", alignSelf: "center" }}>
                      {d.images.map((im: ImageAsset) => (
                        <img 
                          key={im.id} 
                          src={im.src} 
                          alt={im.alt} 
                          loading="lazy" 
                          decoding="async" 
                          onClick={() => setLightboxImage(im)}
                          className="nss-card nss-p-0 nss-card-tilt" 
                          style={{ height: "6rem", width: "8rem", objectFit: "cover", cursor: "pointer", border: "1.5px solid var(--border)" }} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </ClayCard>
            </Reveal>
          ))}
        </div>

        {highlights.length > 0 && (
          <div className="nss-mt-10">
            <h2 className="nss-mb-4 nss-font-display nss-text-xl nss-font-bold">Camp Highlights</h2>
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {highlights.map((h) => <HighlightCard key={h.slug} highlight={h} />)}
            </div>
          </div>
        )}
      </Container>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            className="nss-modal-backdrop"
            onClick={() => setLightboxImage(null)}
            aria-hidden
          />
          <div
            className="nss-modal-panel"
            style={{ position: "relative", zIndex: 110, width: "100%", maxWidth: "52rem", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image viewer"
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                zIndex: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2.5rem",
                width: "2.5rem",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.72)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X style={{ height: "1.25rem", width: "1.25rem" }} aria-hidden />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-xl)"
              }}
            />
            {lightboxImage.caption && (
              <p style={{ color: "#fff", textAlign: "center", marginTop: "1rem", fontSize: "0.875rem", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
