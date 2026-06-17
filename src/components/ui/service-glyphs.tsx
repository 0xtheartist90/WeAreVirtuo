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

/** Boho Sun — celestial sun with organic rays (visibility / digital marketing) */
export function GlyphSun(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='20' cy='20' r='6' />
            {/* cardinal rays (longer) */}
            <path d='M20 12 L20 7' />
            <path d='M28 20 L33 20' />
            <path d='M20 28 L20 33' />
            <path d='M12 20 L7 20' />
            {/* diagonal rays (shorter) */}
            <path d='M25.66 14.34 L27.78 12.22' />
            <path d='M25.66 25.66 L27.78 27.78' />
            <path d='M14.34 25.66 L12.22 27.78' />
            <path d='M14.34 14.34 L12.22 12.22' />
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

/** Boho Arch — celestial portal with an inner sun + horizon (virtual tours / 360) */
export function GlyphArch(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M12 33 L12 19 A8 8 0 0 1 28 19 L28 33' />
            <circle cx='20' cy='18' r='3' />
            <path d='M13.5 24.5 L26.5 24.5' />
            <circle cx='20' cy='8.5' r='1' fill='currentColor' stroke='none' />
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

export const serviceGlyphs = [GlyphSun, GlyphStructure, GlyphArch, GlyphPrism];
