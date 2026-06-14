import React, { useState, useEffect } from "react";
import { LoadingScreen, useAppLoader } from "../loader";

/**
 * IntegrationExample
 *
 * A complete, working demonstration of how to integrate the NSS LoadingScreen
 * into a real application. Three integration patterns are shown via tabs.
 *
 * ─ Pattern A: Simple (no tasks, setReady() when app is done)
 * ─ Pattern B: Task-based (weighted tasks drive granular progress)
 * ─ Pattern C: External progress (pass raw 0–100 directly)
 *
 * Drop this component at the root of your app (inside <App />) and choose
 * the pattern that matches your initialization architecture.
 */

// ── Pattern A: Simple ────────────────────────────────────────────────────────
function SimpleLoaderDemo() {
  const loader = useAppLoader({ minDuration: 5_000 });

  // Simulate app init completing after 3 s
  useEffect(() => {
    const t = setTimeout(() => loader.setReady(), 3_000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={loader.isLoading}
        progress={loader.progress}
        onExitComplete={() => console.log("Loader exited — app is ready.")}
      />
      {!loader.isLoading && (
        <main style={appStyles.main}>
          <h1 style={appStyles.h1}>🎉 App Loaded</h1>
          <p style={appStyles.p}>
            Pattern A: <code>setReady()</code> was called after 3 s.
          </p>
        </main>
      )}
    </>
  );
}

// ── Pattern B: Task-based ────────────────────────────────────────────────────
function TaskLoaderDemo() {
  const loader = useAppLoader({
    tasks: [
      { name: "fonts",   weight: 1 },
      { name: "content", weight: 3 },
      { name: "images",  weight: 2 },
    ],
    minDuration: 4_200,
  });

  useEffect(() => {
    // Simulate staggered task completions
    const timers = [
      setTimeout(() => loader.completeTask("fonts"),   800),
      setTimeout(() => loader.completeTask("images"),  2_200),
      setTimeout(() => loader.completeTask("content"), 3_500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={loader.isLoading}
        progress={loader.progress}
        onExitComplete={() => console.log("Task-based loader exited.")}
      />
      {!loader.isLoading && (
        <main style={appStyles.main}>
          <h1 style={appStyles.h1}>✅ All Tasks Complete</h1>
          <p style={appStyles.p}>
            Pattern B: fonts (800 ms) → images (2.2 s) → content (3.5 s).
          </p>
        </main>
      )}
    </>
  );
}

// ── Pattern C: External progress ─────────────────────────────────────────────
function ExternalProgressDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    // Simulate an external API streaming progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 800);
      } else {
        setProgress(Math.round(p));
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        progress={progress}
        minDuration={3_000}
        onExitComplete={() => console.log("External-progress loader exited.")}
      />
      {!isLoading && (
        <main style={appStyles.main}>
          <h1 style={appStyles.h1}>📡 Stream Complete</h1>
          <p style={appStyles.p}>
            Pattern C: progress driven by an external stream (0–100).
          </p>
        </main>
      )}
    </>
  );
}

// ── Tab switcher ─────────────────────────────────────────────────────────────
const DEMOS = [
  { label: "Simple",    Component: SimpleLoaderDemo },
  { label: "Task-based", Component: TaskLoaderDemo },
  { label: "External",  Component: ExternalProgressDemo },
] as const;

export function IntegrationExample() {
  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const [key, setKey] = useState(0);

  const switchTab = (i: 0 | 1 | 2) => {
    setTab(i);
    setKey((k) => k + 1); // remount demo to restart animation
  };

  const { Component } = DEMOS[tab];

  return (
    <div style={appStyles.root}>
      {/* Tab bar */}
      <div style={appStyles.tabBar}>
        {DEMOS.map((d, i) => (
          <button
            key={d.label}
            id={`demo-tab-${i}`}
            onClick={() => switchTab(i as 0 | 1 | 2)}
            style={{
              ...appStyles.tabBtn,
              ...(tab === i ? appStyles.tabBtnActive : {}),
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Demo mount */}
      <div key={key} style={appStyles.demoWrap}>
        <Component />
      </div>
    </div>
  );
}

// ── Minimal app styles ────────────────────────────────────────────────────────
const appStyles = {
  root: {
    minHeight: "100vh",
    background: "#0E0C0A",
    color: "#F5F0E8",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  tabBar: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10_000,
    display: "flex",
    gap: 2,
    background: "rgba(14, 12, 10, 0.92)",
    backdropFilter: "blur(8px)",
    padding: "10px 16px",
    borderBottom: "1px solid rgba(196, 30, 58, 0.2)",
  },
  tabBtn: {
    background: "transparent",
    border: "1px solid rgba(196, 30, 58, 0.25)",
    color: "rgba(245, 240, 232, 0.5)",
    fontFamily: "inherit",
    fontSize: 12,
    letterSpacing: "0.1em",
    padding: "6px 18px",
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabBtnActive: {
    background: "rgba(196, 30, 58, 0.15)",
    borderColor: "#C41E3A",
    color: "#F5F0E8",
  },
  demoWrap: {
    position: "relative" as const,
    minHeight: "100vh",
  },
  main: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "48px 24px",
    textAlign: "center" as const,
    gap: 16,
  },
  h1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 36,
    fontWeight: 700,
    color: "#F5F0E8",
    margin: 0,
  },
  p: {
    fontSize: 15,
    color: "rgba(245, 240, 232, 0.55)",
    margin: 0,
    lineHeight: 1.7,
  },
} as const;
