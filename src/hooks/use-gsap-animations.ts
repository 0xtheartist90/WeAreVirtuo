'use client';

import { useEffect, useRef } from 'react';

import { DURATION, LUXURY_EASE, STAGGER, ScrollTrigger, gsap } from '@/lib/gsap-setup';

/**
 * Character reveal animation — the ONE signature text animation.
 * Text slides up from below, character by character, with luxury easing.
 * Replaces: BlurFade on titles, TextGenerateEffect, random fade-ins.
 */
export function useCharacterReveal(options?: { delay?: number; start?: string }) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Split text into words, then chars within words
        const text = el.textContent || '';
        const words = text.split(' ');

        el.innerHTML = words
            .map(
                (word) =>
                    `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.1em"><span style="display:inline-block;transform:translateY(110%)">${word}</span></span>`
            )
            .join('<span style="display:inline-block;width:0.3em"></span>');

        const chars = el.querySelectorAll('span > span');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: options?.start || 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: options?.delay || 0
        });

        tl.to(chars, {
            y: '0%',
            duration: DURATION.reveal,
            ease: LUXURY_EASE,
            stagger: STAGGER.words
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === el)
                .forEach((st) => st.kill());
            // Restore original text
            el.textContent = text;
        };
    }, [options?.delay, options?.start]);

    return ref;
}

/**
 * Parallax background image — image moves slower than scroll creating depth.
 * Apply to a container with an absolute-positioned image inside.
 */
export function useParallaxBg(speed: number = 30) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        const tl = gsap.fromTo(
            image,
            { y: `-${speed / 2}%` },
            {
                y: `${speed / 2}%`,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );

        return () => {
            tl.kill();
        };
    }, [speed]);

    return { containerRef, imageRef };
}

/**
 * Section entrance — fade up with luxury easing, scroll-triggered.
 * For general content blocks (not titles — those use character reveal).
 */
export function useSectionEntrance(options?: { delay?: number; y?: number; start?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: options?.y ?? 40 },
            {
                opacity: 1,
                y: 0,
                duration: DURATION.normal,
                ease: LUXURY_EASE,
                delay: options?.delay || 0,
                scrollTrigger: {
                    trigger: el,
                    start: options?.start || 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === el)
                .forEach((st) => st.kill());
        };
    }, [options?.delay, options?.y, options?.start]);

    return ref;
}

/**
 * Staggered children entrance — children fade up one by one.
 * Apply to a container, children animate in sequence.
 */
export function useStaggerEntrance(options?: { stagger?: number; start?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const children = el.children;
        if (!children.length) return;

        gsap.fromTo(
            children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: DURATION.normal,
                ease: LUXURY_EASE,
                stagger: options?.stagger || STAGGER.items,
                scrollTrigger: {
                    trigger: el,
                    start: options?.start || 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === el)
                .forEach((st) => st.kill());
        };
    }, [options?.stagger, options?.start]);

    return ref;
}

/**
 * Pinned scroll section — section stays fixed while scroll drives animation progress.
 * Returns containerRef (tall scroll area) and pinnedRef (the sticky viewport).
 */
export function usePinnedScroll(options: { steps: number; onProgress: (progress: number, stepIndex: number) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: `+=${options.steps * 100}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const stepIndex = Math.min(options.steps - 1, Math.floor(progress * options.steps));
                options.onProgress(progress, stepIndex);
            }
        });

        return () => {
            trigger.kill();
        };
    }, [options]);

    return containerRef;
}

/**
 * Vignette overlay — cinematic dark-edges effect.
 * Returns a style object to apply to a pseudo-element or overlay div.
 */
export const VIGNETTE_STYLE = {
    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
    position: 'absolute' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    zIndex: 2
};
