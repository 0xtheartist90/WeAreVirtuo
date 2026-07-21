'use client';

import { type ReactNode, useEffect } from 'react';

import Lenis from 'lenis';

/**
 * Mounts Lenis once at the root to give the whole site smooth inertia scrolling —
 * the liquid feel that makes the scrubbed / pinned sections read as premium.
 *
 * - Respects prefers-reduced-motion: skips Lenis entirely (native scroll).
 * - Leaves touch scrolling native (syncTouch: false) for a natural mobile feel.
 * - Emits normal scroll events, so IntersectionObserver + scroll-scrubbed
 *   sections keep working unchanged.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.15,
            // expo-out — matches the site's shared easing philosophy
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: false
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
