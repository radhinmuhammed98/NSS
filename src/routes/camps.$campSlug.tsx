import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
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
            {camp.campLeaders?.map((l: string) => <Badge key={l}>{l}</Badge>)}
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
                <div className="nss-flex-1">
                  <p className="nss-text-xs nss-text-muted">{formatDate(d.date || "")}</p>
                  <h3 className="nss-font-display nss-text-lg nss-font-bold">{d.title}</h3>
                  <p className="nss-mt-1 nss-text-sm nss-text-muted">{d.description}</p>
                  <div className="nss-mt-3 nss-flex nss-flex-wrap nss-gap-2">
                    {d.activities?.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}
                  </div>
                  {d.guests && d.guests.length > 0 && (
                    <p className="nss-mt-2 nss-text-xs nss-text-muted">Guests: {d.guests.join(", ")}</p>
                  )}
                  {d.images && d.images.length > 0 && (
                    <div className="nss-mt-3 nss-flex nss-gap-3" style={{ flexWrap: "wrap" }}>
                      {d.images.map((im: ImageAsset) => (
                        <img key={im.id} src={im.src} alt={im.alt} loading="lazy" decoding="async" className="nss-card nss-p-0" style={{ height: "5rem", width: "7rem", objectFit: "cover" }} />
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
    </PageShell>
  );
}
