'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';

import { clamp } from '@/lib/motion';

// Resting fan offsets + entrance distance (rem).
const H_STEP = 5.5;
const V_STEP = 1.4;
const ENTER = 66;

interface CardDeckProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    theme?: 'dark' | 'light';
    /** total scroll distance in vh (the extra height we scrub across) */
    heightVh?: number;
    className?: string;
}

/**
 * Scroll-pinned card deck (the core "Hanza" move). The wrapper is tall; the inner
 * layer is sticky and full-height. As you scroll, cards slide in from the right and
 * stack/overlap, ending with all visible — scrubbed to scroll progress.
 *
 * Reduced-motion / below-lg: renders a plain vertical stack, no pinning.
 */
export function CardDeck<T>({ items, renderItem, theme = 'dark', heightVh = 360, className }: CardDeckProps<T>) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mqSmall = window.matchMedia('(max-width: 1023px)');
        let raf = 0;
        let scheduled = false;

        const clearTransforms = () => {
            cardRefs.current.forEach((c) => {
                if (!c) return;
                c.style.transform = '';
                c.style.zIndex = '';
                c.style.opacity = '';
            });
        };

        const apply = () => {
            scheduled = false;
            const w = wrapRef.current;
            if (!w) return;
            if (mqReduced.matches || mqSmall.matches) {
                clearTransforms();

                return;
            }
            const rect = w.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const progress = clamp(-rect.top / (rect.height - vh), 0, 1);
            const n = items.length;
            const position = progress * (n - 1);
            cardRefs.current.forEach((c, i) => {
                if (!c) return;
                const enterK = clamp(i - position, 0, 1); // 1 = still off to the side, 0 = arrived
                const x = i * H_STEP + enterK * ENTER;
                const y = i * V_STEP;
                c.style.transform = `translate3d(calc(-50% + ${x}rem), calc(-50% + ${y}rem), 0)`;
                c.style.zIndex = String(i);
                c.style.opacity = String(clamp(1 - enterK * 0.2, 0, 1));
            });
        };

        const onScroll = () => {
            if (scheduled) return;
            scheduled = true;
            raf = requestAnimationFrame(apply);
        };

        apply();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [items.length]);

    const shell =
        theme === 'light'
            ? 'border-black/10 bg-[#f4efe6] text-neutral-900'
            : 'border-white/12 bg-[#111] text-white';

    return (
        <div
            ref={wrapRef}
            className={`relative h-auto lg:h-[var(--deck-h)] ${className ?? ''}`}
            style={{ '--deck-h': `${heightVh}vh` } as CSSProperties}>
            <div className='flex flex-col gap-8 lg:sticky lg:top-0 lg:block lg:h-screen'>
                {items.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            cardRefs.current[i] = el;
                        }}
                        className='relative w-full will-change-transform lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[min(78vw,460px)]'>
                        <div
                            className={`tile-border overflow-hidden border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] ${shell}`}>
                            {renderItem(item, i)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
