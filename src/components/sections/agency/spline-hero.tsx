'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';

import { ChevronDown } from 'lucide-react';

// Lazy-load so the heavy Spline runtime never blocks first paint.
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = '/scene.splinecode';

export function SplineHero() {
    const wrapRef = useRef<HTMLDivElement>(null);

    // Let wheel/scroll pass through to the page while keeping pointer-drag on the
    // 3D scene. A window-level capture listener fires before Spline's own wheel
    // handler; stopping propagation there prevents Spline from consuming the
    // scroll, so the browser performs its native page scroll instead.
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
        <section className='bg-background relative h-[100svh] w-full overflow-hidden'>
            {/* Interactive scene — drag works; touch-action pan-y lets vertical
                swipes scroll the page while horizontal gestures still rotate. */}
            <div ref={wrapRef} className='absolute inset-0' style={{ touchAction: 'pan-y' }}>
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
