import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  useEffect(() => {
    document.getElementById("nss-splash")?.remove();
  }, []);

  return (
    <div className="nss-flex nss-items-center nss-justify-center nss-px-4" style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div className="nss-text-center" style={{ maxWidth: "28rem" }}>
        <h1 className="nss-text-5xl nss-font-bold nss-text-primary" style={{ fontSize: "6rem" }}>404</h1>
        <h2 className="nss-mt-4 nss-text-xl nss-font-semibold">Page not found</h2>
        <p className="nss-mt-2 nss-text-sm nss-text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="nss-mt-6">
          <Link
            to="/"
            className="nss-button nss-button-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    document.getElementById("nss-splash")?.remove();
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="nss-flex nss-items-center nss-justify-center nss-px-4" style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div className="nss-text-center" style={{ maxWidth: "28rem" }}>
        <h1 className="nss-text-xl nss-font-semibold">
          This page didn't load
        </h1>
        <p className="nss-mt-2 nss-text-sm nss-text-muted">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="nss-mt-6 nss-flex nss-flex-wrap nss-justify-center nss-gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="nss-button nss-button-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="nss-button nss-button-soft"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { getSiteSettings, getBatches } from "../lib/data";

export const Route = createRootRoute({
  loader: async () => {
    // Pre-fetch settings and batches to populate caches for layout components & helper rendering
    await Promise.all([getSiteSettings(), getBatches()]);
    return {};
  },
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  useEffect(() => {
    const splash = document.getElementById("nss-splash");
    if (splash) {
      splash.classList.add("fade-out");
      const handleTransitionEnd = () => {
        splash.remove();
      };
      splash.addEventListener("transitionend", handleTransitionEnd, { once: true });
      // Fallback if transitionend doesn't fire
      const timer = setTimeout(() => {
        splash.remove();
      }, 600);
      return () => {
        clearTimeout(timer);
        splash.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, []);

  return <Outlet />;
}
