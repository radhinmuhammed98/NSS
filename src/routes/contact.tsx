import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, User } from "lucide-react";
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
      <PageHeader eyebrow="Contact" title="Reach the NSS Unit" description="We'd love to hear from students, alumni, and the community." />
      <Container className="py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <ClayCard tilt={false} className="h-full">
              <h2 className="font-display text-xl font-bold">{s.unitName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.schoolName}</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> {s.location}</li>
                <li className="flex items-center gap-3"><User className="h-5 w-5 text-primary" /> {s.programmeOfficer} (Programme Officer)</li>
                <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> <a href={`mailto:${s.email}`} className="hover:text-primary">{s.email}</a></li>
              </ul>
            </ClayCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ClayCard tilt={false} className="h-full">
              <h2 className="font-display text-xl font-bold">How to reach us</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Visit the NSS room during school hours, or email us with your name, batch (if any), and message.
                For collaboration or media requests, please mention your organization.
              </p>
              <p className="mt-4 font-display text-base font-semibold text-accent">“{s.motto}”</p>
            </ClayCard>
          </Reveal>
        </div>
      </Container>
    </PageShell>
  );
}
