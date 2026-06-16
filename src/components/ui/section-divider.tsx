/**
 * Section dividers for visual rhythm between page sections.
 * Three variants: glow (gradient line), curve (SVG wave), fade (gradient blend).
 */

interface SectionDividerProps {
    variant: 'glow' | 'curve' | 'fade';
    /** For curve: the background color of the NEXT section */
    toColor?: string;
    /** For fade: the background color transitioning TO */
    fadeTo?: string;
    className?: string;
}

export function SectionDivider({
    variant,
    toColor = '#111111',
    fadeTo = '#0f0d0b',
    className = ''
}: SectionDividerProps) {
    if (variant === 'glow') {
        return (
            <div className={`relative py-1 ${className}`}>
                <div className='mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-red-500/40 to-transparent' />
            </div>
        );
    }

    if (variant === 'curve') {
        return (
            <div className={`relative ${className}`}>
                <svg
                    className='absolute -bottom-px left-0 w-full'
                    viewBox='0 0 1440 60'
                    preserveAspectRatio='none'
                    aria-hidden='true'>
                    <path d='M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z' fill={toColor} />
                </svg>
            </div>
        );
    }

    // fade
    return (
        <div className={`pointer-events-none relative h-24 ${className}`}>
            <div
                className='absolute inset-0'
                style={{ background: `linear-gradient(to bottom, transparent, ${fadeTo})` }}
            />
        </div>
    );
}

/**
 * Accent orb — large soft radial glow behind content.
 * Place as absolute-positioned child of a relative container.
 */
export function AccentOrb({
    size = 'md',
    position = 'center',
    className = ''
}: {
    size?: 'sm' | 'md' | 'lg';
    position?: 'center' | 'left' | 'right' | 'top';
    className?: string;
}) {
    const sizeMap = {
        sm: 'h-[300px] w-[400px]',
        md: 'h-[400px] w-[600px]',
        lg: 'h-[500px] w-[800px]'
    };

    const posMap = {
        center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        left: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/3',
        right: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/3',
        top: 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/3'
    };

    return (
        <div
            className={`pointer-events-none absolute rounded-full bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_70%)] blur-3xl ${sizeMap[size]} ${posMap[position]} ${className}`}
        />
    );
}
