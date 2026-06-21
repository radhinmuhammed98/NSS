import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat } from "@/components/clay";
import { HighlightCard } from "@/components/media";

import { formatDate, getBatchTitle, getCampBySlug, getHighlightsBySlugs } from "@/lib/data";
import type { CampDay, ImageAsset, ImpactMetric } from "@/types";

export const Route = createFileRoute("/camps/$campSlug")({
  loader: ({ params }: { params: { campSlug: string } }) => {
    const camp = getCampBySlug(params.campSlug);
    if (!camp) throw notFound();
    return { camp };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Camp not found</h1>
        <Link to="/camps" className="mt-4 inline-block text-primary">← Back to camps</Link>
      </Container>
    </PageShell>
  ),
  component: CampPage,
});

function CampPage() {
  const { camp } = Route.useLoaderData();
  const highlights = getHighlightsBySlugs(camp.highlightSlugs);
  return (
    <PageShell>
      <section className="px-3 pt-4">
        <Container className="px-0">
          <Reveal>
            <div className="clay overflow-hidden p-0">
              <div className="relative">
                <img src={camp.coverImage} alt={camp.title} width={1280} height={549} fetchPriority="high" decoding="async" className="aspect-[21/9] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-background sm:p-8">
                  <Badge variant="accent">{camp.theme}</Badge>
                  <h1 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">{camp.title}</h1>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-8">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {camp.location}</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(camp.startDate)} – {formatDate(camp.endDate)}</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {camp.volunteerCount} volunteers</span>
          <span>· {getBatchTitle(camp.batchSlug)}</span>
        </div>

        <ClayCard tilt={false} className="mt-6">
          <h2 className="font-display text-xl font-bold">Overview</h2>
          <p className="mt-3 text-muted-foreground">{camp.description}</p>
          <p className="mt-3 text-sm"><span className="font-semibold">Programme Officer:</span> {camp.programmeOfficer}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {camp.campLeaders.map((l: string) => <Badge key={l}>{l}</Badge>)}
          </div>
        </ClayCard>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {camp.impactMetrics.map((m: ImpactMetric) => <ImpactStat key={m.label} label={m.label} value={m.value} />)}
        </div>

        <h2 className="mb-4 mt-10 font-display text-2xl font-extrabold">Day-wise Timeline</h2>
        <div className="space-y-5">
          {camp.dayWiseActivities.map((d: CampDay, i: number) => (
            <Reveal key={d.dayNumber} delay={i * 0.05}>
              <ClayCard tilt={false} className="flex flex-col gap-4 sm:flex-row">
                <div className="clay-accent flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl">
                  <span className="text-[10px] font-bold uppercase">Day</span>
                  <span className="font-display text-2xl font-extrabold leading-none">{d.dayNumber}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{formatDate(d.date)}</p>
                  <h3 className="font-display text-lg font-bold">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {d.activities.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}
                  </div>
                  {d.guests && d.guests.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">Guests: {d.guests.join(", ")}</p>
                  )}
                  {d.images && d.images.length > 0 && (
                    <div className="mt-3 flex gap-3">
                      {d.images.map((im: ImageAsset) => (
                        <img key={im.id} src={im.src} alt={im.alt} loading="lazy" decoding="async" className="clay-sm h-20 w-28 object-cover p-0" />
                      ))}
                    </div>
                  )}
                </div>
              </ClayCard>
            </Reveal>
          ))}
        </div>

        {highlights.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold">Camp Highlights</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => <HighlightCard key={h.slug} highlight={h} />)}
            </div>
          </div>
        )}
      </Container>
    </PageShell>
  );
}
