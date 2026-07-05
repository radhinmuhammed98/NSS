import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, Badge } from "@/components/clay";
import { getSiteSettings, getAboutPage } from "@/lib/data";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { SiteSettings, AboutPage } from "@/types";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const s = await getSiteSettings();
    const about = await getAboutPage();
    return { s, about };
  },
  component: About,
});

function About() {
  const { s, about } = Route.useLoaderData() as { s: SiteSettings; about: AboutPage };
  usePageMeta({
    title: "About",
    description: `Learn about NSS Unit 466 at ${s.schoolName || "KHMHSS Valakkulam"} — our mission, vision, history, and the spirit of service.`,
  });
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="About Our NSS Unit"
        description={`${s.unitName}, ${s.schoolName} — ${s.location}.`}
      />

      <Container className="nss-py-8">
        <Reveal>
          <ClayCard tilt={false} className="nss-text-center">
            <p className="nss-font-display nss-text-2xl nss-font-extrabold nss-text-accent nss-sm-text-3xl">
              “{s.motto}”
            </p>
            <p className="nss-mt-3 nss-text-sm nss-text-muted">
              The guiding motto of the National Service Scheme.
            </p>
          </ClayCard>
        </Reveal>

        <div className="nss-mt-8 nss-grid nss-gap-5 nss-sm-grid-cols-2">
          <Reveal>
            <ClayCard className="nss-flex nss-flex-col nss-p-4 nss-sm-p-6" style={{ height: "100%" }}>
              <Target style={{ height: "2rem", width: "2rem", color: "var(--primary)" }} />
              <h2 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">Mission</h2>
              <p className="nss-mt-2 nss-text-sm nss-text-muted">{about.mission}</p>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard className="nss-flex nss-flex-col nss-p-4 nss-sm-p-6" style={{ height: "100%" }}>
              <Eye style={{ height: "2rem", width: "2rem", color: "var(--primary)" }} />
              <h2 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">Vision</h2>
              <p className="nss-mt-2 nss-text-sm nss-text-muted">{about.vision}</p>
            </ClayCard>
          </Reveal>
        </div>

        <Reveal className="nss-mt-8">
          <ClayCard tilt={false} className="nss-p-4 nss-sm-p-6">
            <Badge variant="accent" className="w-fit">Objectives</Badge>
            <h2 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">What we set out to do</h2>
            <ul className="nss-mt-4 nss-grid nss-gap-3 nss-sm-grid-cols-2" style={{ listStyle: "none" }}>
              {about.objectives.map((o) => (
                <li key={o} className="nss-flex nss-items-start nss-gap-2 nss-text-sm nss-text-muted">
                  <CheckCircle2 className="nss-shrink-0 nss-text-accent" style={{ marginTop: "2px", height: "1rem", width: "1rem" }} />
                  {o}
                </li>
              ))}
            </ul>
          </ClayCard>
        </Reveal>

        <Reveal className="nss-mt-8">
          <ClayCard tilt={false} className="nss-p-4 nss-sm-p-6">
            <Badge variant="accent" className="w-fit">Unit Details</Badge>
            <h2 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">Official Unit Profile</h2>
            <dl className="nss-mt-5 nss-grid nss-gap-4 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">School Name</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.schoolName}</dd>
              </div>
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">NSS Unit</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.unitName}</dd>
              </div>
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">Location</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.location}</dd>
              </div>
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">Principal</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.principal || "Asif PA"}</dd>
              </div>
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">Programme Officer</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.programmeOfficer || "Dr. Broose KV"}</dd>
              </div>
              <div className="nss-impact-stat" style={{ padding: "1rem" }}>
                <dt className="nss-text-xs nss-text-muted nss-uppercase nss-font-bold">Volunteer Strength</dt>
                <dd className="nss-font-semibold nss-text-base nss-mt-1 nss-text-primary">{s.volunteerStrength || 50} Volunteers</dd>
              </div>
            </dl>
          </ClayCard>
        </Reveal>
      </Container>
    </PageShell>
  );
}
