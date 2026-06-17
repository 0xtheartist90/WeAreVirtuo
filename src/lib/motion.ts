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
