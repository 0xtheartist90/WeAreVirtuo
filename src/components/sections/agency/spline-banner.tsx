'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';

import { MatrixText } from '@/components/ui/matrix-text';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineBannerProps {
    scene?: string;
    /** Tailwind height classes for the banner */
    heightClassName?: string;
}

/** Full-width interactive 3D banner (scroll passes through, drag still works). */
export function SplineBanner({ scene = '/banner.splinecode', heightClassName = 'h-[27.5vh] md:h-[35vh]' }: SplineBannerProps) {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const wrap = wrapRef.current;
            if (wrap && e.target instanceof Node && wrap.contains(e.target)) {
                e.stopPropagation();
            }
        };
        window.addEventListener('wheel', onWheel, { capture: true, passive: true });

        return () => window.removeEventListener('wheel', onWheel, { capture: true });
    }, []);

    return (
        <section className={`bg-background relative w-full overflow-hidden ${heightClassName}`}>
            {/* Scene renders at its original height and is vertically centered, so the
                shorter section crops the top & bottom instead of squashing the scene. */}
            <div
                ref={wrapRef}
                className='absolute inset-x-0 top-1/2 h-[55vh] -translate-y-1/2 md:h-[70vh]'
                style={{ touchAction: 'pan-y' }}>
                <Suspense
                    fallback={
                        <div className='absolute inset-0 grid place-items-center'>
                            <span className='animate-pulse font-mono text-[11px] tracking-widest text-white/40 uppercase'>
                                Loading…
                            </span>
                        </div>
                    }>
                    <Spline scene={scene} className='!h-full !w-full' />
                </Suspense>
            </div>

            {/* Big overlay title — pointer-events-none so drag still reaches the scene */}
            <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4'>
                <h2 className='font-display text-center text-6xl leading-[0.85] tracking-tight text-white uppercase drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] md:text-8xl lg:text-[10rem]'>
                    <MatrixText as='span' trigger='view' className='block'>
                        Get Chosen.
                    </MatrixText>
                </h2>
            </div>
        </section>
    );
}
