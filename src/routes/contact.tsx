import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, User } from "lucide-react";
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
      <Container className="py-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <ClayCard tilt={false} className="h-full">
              <h2 className="font-display text-xl font-bold">{s.unitName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.schoolName}</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  <div>
                    <span className="font-semibold block">Location</span>
                    <span className="text-muted-foreground">{s.location}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  <div>
                    <span className="font-semibold block">Email</span>
                    <a href={`mailto:${s.email}`} className="hover:text-primary text-muted-foreground">{s.email}</a>
                  </div>
                </li>
                {s.phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                    <div>
                      <span className="font-semibold block">Phone</span>
                      <a href={`tel:${s.phone}`} className="hover:text-primary text-muted-foreground">{s.phone}</a>
                    </div>
                  </li>
                )}
              </ul>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard tilt={false} className="h-full">
              <h2 className="font-display text-xl font-bold">Official Enquiries</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                For official enquiries, please contact the school office.
              </p>
              <div className="mt-5 pt-4 border-t border-border/50 text-sm space-y-2">
                <p><span className="font-semibold">Principal:</span> Asif PA</p>
                <p><span className="font-semibold">Programme Officer:</span> Dr. Broose KV</p>
              </div>
              <p className="mt-6 font-display text-base font-semibold text-accent">“{s.motto}”</p>
            </ClayCard>
          </Reveal>
        </div>
      </Container>
    </PageShell>
  );
}
