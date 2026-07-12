import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    // Only execute on the client-side
    if (typeof window !== "undefined") {
      window.location.replace("https://khmhss-nss-466.sanity.studio/");
    }
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
      <p style={{ fontSize: "1rem", color: "var(--muted-foreground)" }}>
        Redirecting to Sanity Studio...
      </p>
    </div>
  ),
});
