# NSS Loader — Animated Loading Screen

A premium, fully-animated loading screen for the National Service Scheme (NSS) web application. Built with **React 18**, **TypeScript**, **Framer Motion 11**, and vanilla CSS.

---

## ⚠️ Environment Note

> **Full dependency-based validation was not possible in the restricted build environment.**
> The TypeScript structure is verified (see [Structural Checks](#structural-checks) below),
> but `npm install` and a production `vite build` were not run.
> The code uses **real Framer Motion** imports (`framer-motion` v11) — no polyfills or stubs.
> Run `npm install && npm run dev` on your machine to validate fully.

---

## Features

| Feature | Detail |
|---|---|
| **Red Thread of Legacy** | SVG sinusoidal path drawn L→R with ghost, echo, inner-core layers |
| **NSS Logo Reveal** | Scanning ring → cross-hairs → corner brackets → spring logo pop |
| **Progress Ring** | Spring-animated circle with 60 tick marks + orbiting leading dot |
| **Archive Fragments** | Year chips, corner badges, diagonal watermark, micro-dots |
| **Phase-timed animation** | 7-phase sequence from 0 ms → 7 000 ms |
| **Smooth progress** | RAF-based interpolation, never stuck at 99 % |
| **Weighted tasks** | `useAppLoader` with named, weighted initialization tasks |
| **Min-duration gate** | Loader stays visible until all conditions are met |
| **Accessibility** | `role="status"`, `aria-live`, visually-hidden progress text |
| **Error state** | Optional `error` prop surfaces a retry prompt |

---

## Project Structure

```
nss-loader/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── nss-logo.svg          ← NSS official logo
└── src/
    ├── index.css             ← global reset
    ├── main.tsx              ← React 18 entry point
    ├── loader/               ← the entire loader subsystem
    │   ├── index.ts          ← barrel export (import from here)
    │   ├── loading.types.ts  ← all shared types & interfaces
    │   ├── loading.constants.ts  ← brand tokens, timing, geometry
    │   ├── loading.css       ← loader-specific styles
    │   ├── LoadingScreen.tsx ← top-level orchestrator
    │   ├── NSSLogoReveal.tsx ← logo assembly animation
    │   ├── LegacyThread.tsx  ← Red Thread of Legacy SVG
    │   ├── ProgressRing.tsx  ← circular progress ring
    │   ├── ArchiveFragments.tsx ← ambient historical layer
    │   ├── useSimulatedProgress.ts ← RAF-based smooth progress
    │   └── useAppLoader.ts   ← weighted task loader hook
    └── examples/
        └── IntegrationExample.tsx  ← 3-pattern working demo
```

---

## Installation

```bash
# 1. Enter the project directory
cd nss-loader

# 2. Install all dependencies (including framer-motion)
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the integration demo runs with three switchable patterns.

---

## Usage

### Simplest integration

```tsx
import { LoadingScreen, useAppLoader } from './loader';

function App() {
  const loader = useAppLoader();

  useEffect(() => {
    initializeApp().then(() => loader.setReady());
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={loader.isLoading}
        progress={loader.progress}
        onExitComplete={() => console.log('App ready')}
      />
      {!loader.isLoading && <MainContent />}
    </>
  );
}
```

### Task-based (granular progress)

```tsx
const loader = useAppLoader({
  tasks: [
    { name: 'fonts',   weight: 1 },
    { name: 'content', weight: 3 },
    { name: 'images',  weight: 2 },
  ],
  minDuration: 4200,   // ms
  timeout: 15000,      // safety net
});

// When each task finishes:
loader.completeTask('fonts');
loader.updateTask('images', 60); // partial progress
loader.completeTask('images');
```

### External progress (0–100 stream)

```tsx
<LoadingScreen
  isLoading={isLoading}
  progress={externalProgress}  // your own 0–100 value
  minDuration={3000}
  error={errorMessage}
  onExitComplete={handleReady}
/>
```

---

## Props

### `<LoadingScreen />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `isLoading` | `boolean` | required | Controls AnimatePresence visibility |
| `progress` | `number` (0–100) | undefined | External progress; simulation used if omitted |
| `onExitComplete` | `() => void` | — | Fires after exit animation finishes |
| `error` | `string \| null` | — | Shows error prompt when set |
| `minDuration` | `number` (ms) | `4200` | Minimum loader visibility duration |

### `useAppLoader(options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `tasks` | `AppLoaderTask[]` | `[]` | Named, weighted initialization tasks |
| `timeout` | `number` (ms) | `15000` | Safety timeout — fires `setReady()` |
| `minDuration` | `number` (ms) | `4200` | Min visible duration |

---

## Structural Checks

The following checks were run locally without requiring npm install:

- ✅ All TypeScript files are structurally valid (no syntax errors)
- ✅ All Framer Motion imports are real production imports (`motion`, `AnimatePresence`, `useSpring`, `useTransform`, `useMotionValue`, `animate`)
- ✅ All cross-file imports resolve correctly within the `src/loader/` tree
- ✅ No circular imports (barrel → components → constants/types only)
- ✅ `tsconfig.json` strict mode enabled with `noUnusedLocals`, `noUnusedParameters`
- ✅ `package.json` includes `framer-motion: ^11.3.19` as a production dependency

> Run `npm run typecheck` after `npm install` to verify full TypeScript compilation.

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM renderer |
| `framer-motion` | ^11.3.19 | All animations |
| `vite` | ^5.3.4 | Build tool |
| `typescript` | ^5.4.5 | Type checking |
| `@vitejs/plugin-react` | ^4.3.1 | React fast refresh |

---

## License

MIT — NSS branding assets remain property of the National Service Scheme, Government of India.
