import { createFileRoute } from "@tanstack/react-router";
import { SANITY_PROJECT_ID } from "@/lib/content/config";

export const Route = createFileRoute("/admin")({
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
      <div 
        style={{ 
          textAlign: "center", 
          maxWidth: "28rem", 
          padding: "2rem",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)"
        }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700 }} className="nss-text-gradient">
          NSS Content Management
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.75rem", lineHeight: 1.5 }}>
          Manage your batches, projects, photos, and announcements.
        </p>
        
        <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a 
            href={`https://www.sanity.io/manage/project/${SANITY_PROJECT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nss-button nss-button-primary"
            style={{ display: "inline-flex", width: "100%", justifyContent: "center" }}
          >
            Go to Sanity Project Dashboard
          </a>
          
          <a 
            href={`https://${SANITY_PROJECT_ID}.sanity.studio`}
            target="_blank"
            rel="noopener noreferrer"
            className="nss-button nss-button-soft"
            style={{ display: "inline-flex", width: "100%", justifyContent: "center" }}
          >
            Go to Hosted Sanity Studio
          </a>
        </div>

        <div style={{ marginTop: "1.5rem", textAlign: "left", fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
          <p style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.25rem" }}>💡 Setting up your studio:</p>
          <p>
            If the "Hosted Sanity Studio" link returns a 404, you haven't deployed your studio yet. You can run it locally in the project's <code style={{ backgroundColor: "var(--surface-elevated)", padding: "1px 4px", borderRadius: "3px" }}>/studio</code> folder using <code style={{ backgroundColor: "var(--surface-elevated)", padding: "1px 4px", borderRadius: "3px" }}>npm run dev</code>, or deploy it permanently by running <code style={{ backgroundColor: "var(--surface-elevated)", padding: "1px 4px", borderRadius: "3px" }}>npx sanity deploy</code> in the studio folder.
          </p>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          Sanity Project ID: <code style={{ backgroundColor: "var(--surface-elevated)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>{SANITY_PROJECT_ID}</code>
        </p>
      </div>
    </div>
  ),
});
