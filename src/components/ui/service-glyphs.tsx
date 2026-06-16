/**
 * Abstract geometric line-art glyphs for the services.
 * Minimal, designed — not literal pictograms.
 */
import type { SVGProps } from 'react';

type GlyphProps = SVGProps<SVGSVGElement>;

const base = (props: GlyphProps) => ({
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props
});

/** Reach — radiating arcs from a node (visibility / digital marketing) */
export function GlyphReach(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='9' cy='31' r='1.8' fill='currentColor' stroke='none' />
            <path d='M9 23 A8 8 0 0 1 17 31' />
            <path d='M9 15 A16 16 0 0 1 25 31' />
            <path d='M9 7 A24 24 0 0 1 33 31' />
        </svg>
    );
}

/** Structure — nested frame + diamond (web development) */
export function GlyphStructure(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <rect x='7' y='7' width='26' height='26' />
            <path d='M20 11 L29 20 L20 29 L11 20 Z' />
            <circle cx='20' cy='20' r='1.6' fill='currentColor' stroke='none' />
        </svg>
    );
}

/** Orbit — sphere with a tilted ring + node (virtual tours / 360) */
export function GlyphOrbit(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='20' cy='20' r='12' />
            <ellipse cx='20' cy='20' rx='12' ry='4.4' transform='rotate(-24 20 20)' />
            <circle cx='30.4' cy='14' r='1.8' fill='currentColor' stroke='none' />
        </svg>
    );
}

/** Prism — circle with an inscribed triangle (video / content) */
export function GlyphPrism(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='20' cy='20' r='12' />
            <path d='M20 9 L29.5 25.5 L10.5 25.5 Z' />
            <circle cx='20' cy='20' r='1.6' fill='currentColor' stroke='none' />
        </svg>
    );
}

export const serviceGlyphs = [GlyphReach, GlyphStructure, GlyphOrbit, GlyphPrism];
