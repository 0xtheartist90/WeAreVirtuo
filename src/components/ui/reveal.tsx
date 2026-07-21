'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { HANZA } from '@/lib/motion';

interface RevealProps {
    children: ReactNode;
    /** slide-in axis */
    axis?: 'x' | 'y';
    /** starting offset in px */
    distance?: number;
    /** ms before it starts */
    delay?: number;
    /** duration in ms */
    duration?: number;
    className?: string;
}

/**
 * Lightweight block reveal — fades + translates a whole block in as it enters
 * the viewport (once). Use axis='x' to slide editorial blocks in from the side.
 */
export function Reveal({
    children,
    axis = 'y',
    distance = 40,
    delay = 0,
    duration = HANZA.duration.reveal,
    className
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setRevealed(true);

            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setRevealed(true);
                    io.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
        );
        io.observe(el);

        return () => io.disconnect();
    }, []);

    const style = {
        '--reveal-x': axis === 'x' ? `${distance}px` : '0px',
        '--reveal-y': axis === 'y' ? `${distance}px` : '0px',
        '--reveal-delay': `${delay}ms`,
        transitionDuration: `${duration}ms`
    } as CSSProperties & Record<'--reveal-x' | '--reveal-y' | '--reveal-delay', string>;

    return (
        <div ref={ref} className={`reveal-block ${revealed ? 'is-revealed ' : ''}${className ?? ''}`} style={style}>
            {children}
        </div>
    );
}
