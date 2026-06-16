'use client';

import { useParallaxBg } from '@/hooks/use-gsap-animations';

interface CinematicSectionProps {
    bgImage?: string;
    overlayOpacity?: number;
    parallax?: boolean;
    parallaxSpeed?: number;
    vignette?: boolean;
    /** Diagonal clip on top edge */
    diagonal?: boolean;
    /** Diagonal clip on bottom edge */
    diagonalBottom?: boolean;
    className?: string;
    id?: string;
    children: React.ReactNode;
}

export function CinematicSection({
    bgImage,
    overlayOpacity = 80,
    parallax = true,
    parallaxSpeed = 40,
    vignette = true,
    diagonal = false,
    diagonalBottom = false,
    className = '',
    id,
    children
}: CinematicSectionProps) {
    const { containerRef, imageRef } = useParallaxBg(parallaxSpeed);

    // Build clip-path based on diagonal flags
    let clipPath = '';
    if (diagonal && diagonalBottom) {
        clipPath = 'polygon(0 0vw, 100% 0, 100% calc(100% - 0vw), 0 100%)';
    } else if (diagonal) {
        clipPath = 'polygon(0 0vw, 100% 0, 100% 100%, 0 100%)';
    } else if (diagonalBottom) {
        clipPath = 'polygon(0 0, 100% 0, 100% calc(100% - 0vw), 0% 100%)';
    }

    const diagonalClasses =
        diagonal || diagonalBottom
            ? `${diagonal ? 'mt-8 pt-[7vw] md:mt-12' : ''} ${diagonalBottom ? 'pb-[7vw]' : ''}`
            : '';

    return (
        <section
            ref={bgImage && parallax ? containerRef : undefined}
            id={id}
            className={`relative overflow-hidden ${diagonalClasses} ${className}`}
            style={clipPath ? { clipPath } : undefined}>
            {/* BTS Background Image */}
            {bgImage && (
                <div ref={parallax ? imageRef : undefined} className='absolute inset-0 -top-[20%] -bottom-[20%]'>
                    <img src={bgImage} alt='' aria-hidden='true' className='h-full w-full object-cover' />
                </div>
            )}

            {/* Dark overlay */}
            {bgImage && (
                <div
                    className='absolute inset-0'
                    style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                />
            )}

            {/* Gradient blend */}
            {bgImage && <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50' />}

            {/* Cinematic vignette */}
            {vignette && bgImage && (
                <div
                    className='pointer-events-none absolute inset-0 z-[2]'
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
                    }}
                />
            )}

            {/* Content */}
            <div className='relative z-[3]'>{children}</div>
        </section>
    );
}
