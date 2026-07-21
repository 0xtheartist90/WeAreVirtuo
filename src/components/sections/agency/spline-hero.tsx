'use client';

import { Suspense, lazy } from 'react';

import { ChevronDown } from 'lucide-react';

// Lazy-load so the heavy Spline runtime never blocks first paint.
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = '/scene.splinecode';

interface SplineHeroProps {
    /** Render as an absolute-fill background layer (for overlaying content on top). */
    asBackground?: boolean;
}

export function SplineHero({ asBackground = false }: SplineHeroProps) {
    // Decorative scene: pointer-events-none so wheel + touch pass straight through
    // to Lenis / the page. (Capturing wheel here fought the smooth-scroll engine and
    // made scrolling hang/glitch over the section.) The scene still plays its idle
    // animation on its own.
    const scene = (
        <div className='pointer-events-none absolute inset-0'>
            <Suspense
                fallback={
                    <div className='absolute inset-0 grid place-items-center'>
                        <span className='animate-pulse font-mono text-[11px] tracking-widest text-white/40 uppercase'>
                            Loading experience…
                        </span>
                    </div>
                }>
                <Spline scene={SCENE_URL} className='!h-full !w-full' />
            </Suspense>
        </div>
    );

    // Background mode: fill the parent so content can be overlaid on top of the scene.
    if (asBackground) {
        return <div className='absolute inset-0'>{scene}</div>;
    }

    return (
        <section className='bg-background relative h-[100svh] w-full overflow-hidden'>
            {scene}

            {/* subtle brand label, top-left (clears the fixed nav) */}
            <div className='pointer-events-none absolute top-24 left-0 z-10 hidden md:block'>
                <div className='grid-layout'>
                    <p className='col-span-full font-mono text-[11px] tracking-widest text-white/60 uppercase'>
                        [ Virtuo — Digital Marketing Agency ]
                    </p>
                </div>
            </div>

            {/* fade into the section below + scroll cue */}
            <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent' />
            <div className='pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2'>
                <ChevronDown className='h-7 w-7 animate-bounce text-white/70' />
            </div>
        </section>
    );
}
