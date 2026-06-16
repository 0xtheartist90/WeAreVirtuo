'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Luxury easing standard ──
// Used across ALL animations for consistency
export const LUXURY_EASE = 'power3.out';
export const LUXURY_EASE_IN = 'power3.in';
export const LUXURY_EASE_INOUT = 'power3.inOut';

// ── Standard durations ──
export const DURATION = {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
    reveal: 1.0
};

// ── Standard stagger ──
export const STAGGER = {
    chars: 0.02,
    words: 0.05,
    items: 0.1,
    sections: 0.15
};

export { gsap, ScrollTrigger };
