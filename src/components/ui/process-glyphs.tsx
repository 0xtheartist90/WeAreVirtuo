/**
 * "How we work" glyphs — minimal abstract line marks, same delicate style as the
 * service glyphs but a distinct set (target, chevrons, rising arc).
 */
import type { SVGProps } from 'react';

type GlyphProps = SVGProps<SVGSVGElement>;

const base = (props: GlyphProps) => ({
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props
});

/** Target — small circle with crosshair ticks (strategy / aim) */
export function GlyphTarget(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='20' cy='20' r='6' />
            <path d='M20 11 L20 6.5' />
            <path d='M20 29 L20 33.5' />
            <path d='M29 20 L33.5 20' />
            <path d='M11 20 L6.5 20' />
        </svg>
    );
}

/** Chevrons — forward momentum (execution) */
export function GlyphChevrons(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M14 12 L22 20 L14 28' />
            <path d='M21 12 L29 20 L21 28' />
        </svg>
    );
}

/** Rise — a sun/arc rising over a baseline (growth) */
export function GlyphRise(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M7 27 L33 27' />
            <path d='M12 27 A8 8 0 0 1 28 27' />
            <path d='M20 13 L20 9.5' />
            <path d='M27.78 15.22 L30.3 12.7' />
            <path d='M12.22 15.22 L9.7 12.7' />
        </svg>
    );
}

export const processGlyphs = [GlyphTarget, GlyphChevrons, GlyphRise];
