import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2, Award } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, Badge } from "@/components/clay";

import { getSiteSettings } from "@/lib/data";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const s = getSiteSettings();
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ClayCard tilt={false} className="h-full">
              <h2 className="font-display text-xl font-bold">Our Story</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.history}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="clay-sm p-3">
                  <dt className="text-xs text-muted-foreground">Programme Officer</dt>
                  <dd className="font-semibold">{s.programmeOfficer}</dd>
                </div>
                <div className="clay-sm p-3">
                  <dt className="text-xs text-muted-foreground">Volunteer Secretary</dt>
                  <dd className="font-semibold">{s.volunteerSecretary}</dd>
                </div>
                <div className="clay-sm p-3">
                  <dt className="text-xs text-muted-foreground">Academic Year</dt>
                  <dd className="font-semibold">{s.academicYear}</dd>
                </div>
                <div className="clay-sm p-3">
                  <dt className="text-xs text-muted-foreground">Location</dt>
                  <dd className="font-semibold">{s.location}</dd>
                </div>
              </dl>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard tilt={false} className="h-full">
              <Award className="h-8 w-8 text-accent" />
              <h2 className="mt-3 font-display text-xl font-bold">Achievements</h2>
              <ul className="mt-4 space-y-3">
                {s.achievements.map((a) => (
                  <li key={a} className="clay-sm flex items-center gap-3 p-3 text-sm">
                    <span className="text-accent">★</span>
                    {a}
                  </li>
                ))}
              </ul>
            </ClayCard>
          </Reveal>
        </div>
      </Container>
    </PageShell>
  );
}
