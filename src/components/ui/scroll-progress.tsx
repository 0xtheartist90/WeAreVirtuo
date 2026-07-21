'use client';

import { useEffect, useState } from 'react';

import { clamp } from '@/lib/motion';

const SEGMENTS = 12;
const R_INNER = 28;
const R_OUTER = 44;

interface ScrollProgressProps {
    /** id of the section whose visibility this tracks */
    targetId: string;
    className?: string;
}

/**
 * Understated radial progress indicator — a ring of rounded line segments with a
 * bright accent "head" that travels around as you scroll, trailing a soft glow.
 * Tracks the target's FULL visibility window (top enters bottom → bottom leaves top).
 */
export function ScrollProgress({ targetId, className }: ScrollProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        let raf = 0;
        let scheduled = false;
        const apply = () => {
            scheduled = false;
            const rect = target.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const total = rect.height + vh;
            setProgress(clamp((vh - rect.top) / total, 0, 1));
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
    }, [targetId]);

    const head = progress * SEGMENTS;

    const segments = Array.from({ length: SEGMENTS }, (_, i) => {
        const angle = ((i * 360) / SEGMENTS - 90) * (Math.PI / 180);
        const x1 = 50 + R_INNER * Math.cos(angle);
        const y1 = 50 + R_INNER * Math.sin(angle);
        const x2 = 50 + R_OUTER * Math.cos(angle);
        const y2 = 50 + R_OUTER * Math.sin(angle);
        let d = Math.abs(i - head);
        d = Math.min(d, SEGMENTS - d);
        const glow = Math.pow(clamp(1 - d / SEGMENTS, 0, 1), 1.6) * 0.7;

        return { i, x1, y1, x2, y2, glow };
    });

    return (
        <svg
            viewBox='0 0 100 100'
            aria-hidden='true'
            className={`h-9 w-9 ${className ?? ''}`}
            fill='none'
            strokeWidth={3}
            strokeLinecap='round'>
            {/* faint ink base ring */}
            <g className='text-white' stroke='currentColor'>
                {segments.map((s) => (
                    <line key={`b${s.i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} strokeOpacity={0.14} />
                ))}
            </g>
            {/* accent head + trailing glow */}
            <g className='text-accent' stroke='currentColor'>
                {segments.map((s) => (
                    <line key={`a${s.i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} strokeOpacity={s.glow} />
                ))}
            </g>
        </svg>
    );
}
