/**
 * Service glyphs — delicate, abstract, thin-line geometric marks built from
 * primitives (dashes, squares, crossed ellipses, bars). Minimal-iconography style.
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

/** Radiate — dashes broadcasting from a point (digital marketing / visibility) */
export function GlyphRadiate(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <circle cx='20' cy='20' r='1.1' fill='currentColor' stroke='none' />
            <path d='M20 12 L20 7.5' />
            <path d='M25.66 14.34 L28.84 11.16' />
            <path d='M28 20 L32.5 20' />
            <path d='M25.66 25.66 L28.84 28.84' />
            <path d='M20 28 L20 32.5' />
            <path d='M14.34 25.66 L11.16 28.84' />
            <path d='M12 20 L7.5 20' />
            <path d='M14.34 14.34 L11.16 11.16' />
        </svg>
    );
}

/** Frames — two offset overlapping squares (web development / structure) */
export function GlyphFrames(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <rect x='8.5' y='8.5' width='16' height='16' />
            <rect x='15.5' y='15.5' width='16' height='16' />
        </svg>
    );
}

/** Orbit — two crossed ellipses with a node (virtual tours / 360) */
export function GlyphOrbit(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <ellipse cx='20' cy='20' rx='11.5' ry='4.6' transform='rotate(30 20 20)' />
            <ellipse cx='20' cy='20' rx='11.5' ry='4.6' transform='rotate(-30 20 20)' />
            <circle cx='20' cy='20' r='1.2' fill='currentColor' stroke='none' />
        </svg>
    );
}

/** Wave — symmetric bars, a media waveform (video / content) */
export function GlyphWave(props: GlyphProps) {
    return (
        <svg {...base(props)}>
            <path d='M11 17 L11 23' />
            <path d='M15.5 13.5 L15.5 26.5' />
            <path d='M20 10 L20 30' />
            <path d='M24.5 13.5 L24.5 26.5' />
            <path d='M29 17 L29 23' />
        </svg>
    );
}

export const serviceGlyphs = [GlyphRadiate, GlyphFrames, GlyphOrbit, GlyphWave];
