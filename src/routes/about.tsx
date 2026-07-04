import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2, Award } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, Badge } from "@/components/clay";

import { getSiteSettings } from "@/lib/data";
import type { SiteSettings } from "@/types";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const s = await getSiteSettings();
    return { s };
  },
  component: About,
});

function About() {
  const { s } = Route.useLoaderData() as { s: SiteSettings };
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="About Our NSS Unit"
        description={`${s.unitName}, ${s.schoolName} — ${s.location}.`}
      />

      <Container className="py-8">
        <Reveal>
          <ClayCard tilt={false} className="text-center">
            <p className="font-display text-2xl font-extrabold text-accent sm:text-3xl">
              “{s.motto}”
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              The guiding motto of the National Service Scheme.
            </p>
          </ClayCard>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <ClayCard className="h-full">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="mt-3 font-display text-xl font-bold">Mission</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.mission}</p>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard className="h-full">
              <Eye className="h-8 w-8 text-primary" />
              <h2 className="mt-3 font-display text-xl font-bold">Vision</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.vision}</p>
            </ClayCard>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <ClayCard tilt={false}>
            <Badge variant="accent">Objectives</Badge>
            <h2 className="mt-3 font-display text-xl font-bold">What we set out to do</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </ClayCard>
        </Reveal>

        <Reveal className="mt-8">
          <ClayCard tilt={false}>
            <Badge variant="accent">Unit Details</Badge>
            <h2 className="mt-3 font-display text-xl font-bold">Official Unit Profile</h2>
            <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">School Name</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">{s.schoolName}</dd>
              </div>
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">NSS Unit</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">{s.unitName}</dd>
              </div>
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">Location</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">{s.location}</dd>
              </div>
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">Principal</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">Asif PA</dd>
              </div>
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">Programme Officer</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">Dr. Broose KV</dd>
              </div>
              <div className="clay-sm p-4">
                <dt className="text-xs text-muted-foreground uppercase font-bold ">Volunteer Strength</dt>
                <dd className="font-semibold text-base mt-1 text-[#1b3a27]">50 Volunteers</dd>
              </div>
            </dl>
          </ClayCard>
        </Reveal>
      </Container>
    </PageShell>
  );
}
