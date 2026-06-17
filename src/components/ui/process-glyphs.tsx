/**
 * "How we work" glyphs — minimal abstract line marks, same delicate style as the
 * service glyphs but a distinct set (compass, chevrons, ascending trend).
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

/** Compass — a four-point star (strategy / direction) */
export function GlyphCompass(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M20 6 L22.4 17.6 L34 20 L22.4 22.4 L20 34 L17.6 22.4 L6 20 L17.6 17.6 Z' />
            <circle cx='20' cy='20' r='1.2' fill='currentColor' stroke='none' />
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

/** Ascend — a rising trend line with an arrow (growth) */
export function GlyphAscend(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M7 28 L15 21.5 L21 24.5 L31 12' />
            <path d='M24 12 L31 12 L31 19' />
        </svg>
    );
}

export const processGlyphs = [GlyphCompass, GlyphChevrons, GlyphAscend];
