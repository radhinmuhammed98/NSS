import { createFileRoute } from "@tanstack/react-router";
import { SANITY_PROJECT_ID } from "@/lib/content/config";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    const sanityUrl = `https://${SANITY_PROJECT_ID}.sanity.studio`;
    window.location.replace(sanityUrl);
  },
  component: () => (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh", 
        fontFamily: "var(--font-sans)",
        backgroundColor: "var(--background)",
        color: "var(--foreground)" 
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: 600, fontSize: "1.125rem" }}>Redirecting to Sanity Studio...</p>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
          If you are not redirected automatically, <a href={`https://${SANITY_PROJECT_ID}.sanity.studio`} style={{ color: "var(--secondary)", textDecoration: "underline" }}>click here</a>.
        </p>
      </div>
    </div>
  ),
});
