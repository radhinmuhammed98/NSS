import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal } from "@/components/clay";
import { getSiteSettings } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const s = await getSiteSettings();
    return { s };
  },
  component: Contact,
});

function Contact() {
  const { s } = Route.useLoaderData();
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact · വഴികാട്ടി"
        title="Reach the NSS Unit"
        description={`${s.schoolName} · ${s.location}. We'd love to hear from students, alumni, and the community.`}
      />
      <Container className="nss-py-8">
        <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2">
          <Reveal>
            <ClayCard tilt={false} className="nss-flex nss-flex-col nss-p-4 nss-sm-p-6" style={{ height: "100%" }}>
              <h2 className="nss-font-display nss-text-xl nss-font-bold">{s.unitName}</h2>
              <p className="nss-mt-1 nss-text-sm nss-text-muted">{s.schoolName}</p>
              <ul className="nss-mt-5 nss-flex nss-flex-col nss-gap-4 nss-text-sm" style={{ listStyle: "none" }}>
                <li className="nss-flex nss-items-start nss-gap-3">
                  <MapPin className="nss-shrink-0" style={{ height: "1.25rem", width: "1.25rem", color: "var(--primary)", marginTop: "2px" }} /> 
                  <div>
                    <span className="nss-font-semibold" style={{ display: "block" }}>Location</span>
                    <span className="nss-text-muted">{s.location}</span>
                  </div>
                </li>
                <li className="nss-flex nss-items-start nss-gap-3">
                  <Mail className="nss-shrink-0" style={{ height: "1.25rem", width: "1.25rem", color: "var(--primary)", marginTop: "2px" }} /> 
                  <div>
                    <span className="nss-font-semibold" style={{ display: "block" }}>Email</span>
                    <a href={`mailto:${s.email}`} style={{ color: "var(--secondary)", textDecoration: "underline" }}>{s.email}</a>
                  </div>
                </li>
                {s.phone && (
                  <li className="nss-flex nss-items-start nss-gap-3">
                    <Phone className="nss-shrink-0" style={{ height: "1.25rem", width: "1.25rem", color: "var(--primary)", marginTop: "2px" }} /> 
                    <div>
                      <span className="nss-font-semibold" style={{ display: "block" }}>Phone</span>
                      <a href={`tel:${s.phone}`} style={{ color: "var(--secondary)", textDecoration: "underline" }}>{s.phone}</a>
                    </div>
                  </li>
                )}
              </ul>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard tilt={false} className="nss-flex nss-flex-col nss-p-4 nss-sm-p-6" style={{ height: "100%" }}>
              <h2 className="nss-font-display nss-text-xl nss-font-bold">Official Enquiries</h2>
              <p className="nss-mt-3 nss-text-sm nss-text-muted">
                For official enquiries, please contact the school office.
              </p>
              <div className="nss-mt-5" style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", opacity: 0.8, fontSize: "14px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p><span className="nss-font-semibold">Principal:</span> Asif PA</p>
                <p><span className="nss-font-semibold">Programme Officer:</span> Dr. Broose KV</p>
              </div>
              <p className="nss-mt-6 nss-font-display nss-text-base nss-font-semibold nss-text-accent">“{s.motto}”</p>
            </ClayCard>
          </Reveal>
        </div>
      </Container>
    </PageShell>
  );
}
