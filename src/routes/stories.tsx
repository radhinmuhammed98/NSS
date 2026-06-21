import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { StoryCard } from "@/components/media";

import { getStories } from "@/lib/data";

export const Route = createFileRoute("/stories")({
  component: Stories,
});

function Stories() {
  const stories = getStories();
  return (
    <PageShell>
      <PageHeader eyebrow="Stories" title="Volunteer Stories" description="Service, in their own words." />
      <Container className="py-8">
        {stories.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}><StoryCard story={s} /></Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No volunteer stories yet." />
        )}
      </Container>
    </PageShell>
  );
}
