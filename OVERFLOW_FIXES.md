# UI Overflow Bug Fixes

## Issues Found:
1. **Fixed mobile menu**: Uses `inset-x-0` with `mx-4` causing conflicting constraints
2. **Bottom nav**: Width calculation overflows on < 358px screens
3. **Body overflow-x: hidden**: Masks overflow without fixing it
4. **Missing page padding**: Content overflows on small screens
5. **Dialog max-width**: Too large for mobile (512px)

## Files to Update:
- `src/components/layout/Navbar.tsx` - Lines 311, 399
- `src/components/layout/PageShell.tsx` - Line 10
- `src/components/ui/dialog.tsx` - Fix max-width with mobile padding
- `src/styles.css` - Remove or fix `overflow-x: hidden`

## Recommended Changes:

### Navbar.tsx (Line 311):
```tsx
// Change from:
className="fixed inset-x-0 top-16 z-40 mx-4 rounded-2xl overflow-hidden"
// To:
className="fixed inset-x-4 top-16 z-40 rounded-2xl overflow-hidden"
```

### Navbar.tsx (Line 399):
```tsx
// Change from:
width: "calc(100% - 48px)",
// To:
width: "min(calc(100% - 48px), 400px)",
```

### PageShell.tsx (Line 10):
```tsx
// Add padding:
<main className="flex-1 pt-16 pb-28 sm:pb-32 xl:pb-0 px-4 sm:px-6">
```

### Dialog.tsx (Line 41):
```tsx
// Change max-w-lg to have responsive padding:
className={cn(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg px-4 sm:px-0 duration-200...",
```

### styles.css (Line 272):
```css
/* Remove overflow-x: hidden - let content flow naturally */
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  /* overflow-x: hidden; */ /* ← Comment out or remove */
}
```
