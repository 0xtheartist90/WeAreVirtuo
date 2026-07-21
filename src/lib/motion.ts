// lib/motion.ts — SINGLE SOURCE OF TRUTH for all animation timing
// From UX Design Spec Step 8: Visual Foundation (Build Contract)

export const MOTION = {
    duration: {
        fast: 0.2, // hover states, button feedback
        normal: 0.35, // section reveals, blur-fade
        slow: 0.5 // hero entrance, Lamp Effect, dramatic moments
    },
    ease: [0.22, 1, 0.36, 1] as const, // premium expo-out — smooth, refined deceleration
    stagger: 0.1, // delay between staggered children
    viewport: {
        once: true, // animate only on first entry
        margin: '-100px' as const // trigger 100px before element enters viewport
    }
} as const;

// Niche timing overrides (imported per LP variant)
export const NICHE_TIMING = {
    restaurant: { normal: 0.4, slow: 0.55 }, // slightly slower — savoring
    nightlife: { normal: 0.25, slow: 0.4 }, // faster — energetic
    corporate: { normal: 0.3, slow: 0.45 } // precise — default
} as const;

export type NicheKey = keyof typeof NICHE_TIMING;

/* ─────────────────────────────────────────────────────────────
   HANZA-STYLE PREMIUM MOTION SYSTEM
   One easing curve + a slow, deliberate timing scale for every
   scroll reveal, deck transform, and progress fill on the site.
   ───────────────────────────────────────────────────────────── */

// Strong ease-out, no overshoot — the single shared curve.
export const HANZA_EASE = [0.16, 1, 0.3, 1] as const;
export const HANZA_EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const HANZA = {
    ease: HANZA_EASE,
    easeCss: HANZA_EASE_CSS,
    // Reveal durations are slow (600–900ms), never snappy.
    duration: {
        reveal: 760, // per-token / block reveals (ms)
        deck: 820 // deck card transforms (ms)
    },
    // Stagger between tokens / items (ms).
    stagger: {
        char: 38,
        word: 64,
        item: 70
    }
} as const;

/** clamp helper shared by scroll-scrubbed sections. */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
