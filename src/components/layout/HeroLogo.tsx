/**
 * HeroLogo.tsx
 *
 * Implements a Framer Motion shared-element logo transition.
 * The hero logo and navbar logo share the same `layoutId="nss-logo"`.
 * Framer Motion automatically animates between the two positions on scroll.
 *
 * The actual logo in the navbar is hidden (opacity: 0) while the hero logo
 * is visible — only ONE logo element exists in the DOM at any time (the hero
 * version). When the hero scrolls away Framer Motion morphs it into the navbar.
 */

export { HeroLogoHero, useHeroLogoProgress } from "./HeroLogoImpl";
