'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { MatrixText } from '@/components/ui/matrix-text';
import { NumberTicker } from '@/components/ui/number-ticker';
import { agencyStats } from '@/content/agency';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MOTION } from '@/lib/motion';
import { videoUrl } from '@/lib/video';

import { Building2, Hotel, MapPinned, UtensilsCrossed } from 'lucide-react';

const hospitality = [
    { icon: Hotel, label: 'Luxury Hotels' },
    { icon: UtensilsCrossed, label: 'Restaurants' },
    { icon: MapPinned, label: 'Multi-Location Brands' },
    { icon: Building2, label: 'Hospitality Groups' }
];

const RESULTS_VIDEO = 'videos/portfolio/nome-fort-york.mp4';
const RESULTS_POSTER = '/images/portfolio/nome.png';

/* Light section — compact white band: header + small video, then a stat row. */
export function AgencyResults() {
    const reducedMotion = useReducedMotion();

    return (
        <section id='results' className='relative bg-white py-14 text-neutral-900 md:py-20'>
            <div className='dot-grid-dark pointer-events-none absolute inset-0 opacity-60' />

            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header + small video */}
                <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                            [ Proven at Scale ]
                        </p>
                        <MatrixText
                            as='h2'
                            trigger='view'
                            className='font-display block text-4xl leading-[0.9] tracking-tight text-neutral-900 uppercase md:text-6xl'>
                            Trusted Across North America
                        </MatrixText>
                        <p className='mt-4 max-w-md text-base text-neutral-600'>
                            Hundreds of hospitality and multi-location businesses getting found and growing.
                        </p>
                    </div>
                    <div className='relative w-full shrink-0 overflow-hidden border border-neutral-200 md:w-72'>
                        {!reducedMotion ? (
                            <video
                                src={videoUrl(RESULTS_VIDEO)}
                                poster={RESULTS_POSTER}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className='aspect-video w-full object-cover'
                            />
                        ) : (
                            <img src={RESULTS_POSTER} alt='' className='aspect-video w-full object-cover' />
                        )}
                        <span className='border-accent absolute top-2.5 left-2.5 h-4 w-4 border-t border-l' />
                        <span className='border-accent absolute right-2.5 bottom-2.5 h-4 w-4 border-r border-b' />
                    </div>
                </div>

                {/* Stat row */}
                <div className='mt-10 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-4'>
                    {agencyStats.map((stat, idx) => (
                        <BlurFade key={stat.label} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                            <div className='group relative flex h-full flex-col justify-between gap-6 overflow-hidden bg-white p-5 transition-colors duration-300 hover:bg-neutral-50 md:p-6'>
                                {/* accent top bar grows on hover */}
                                <span className='bg-accent absolute top-0 left-0 h-0.5 w-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full' />
                                <span className='font-mono text-[10px] tracking-widest text-neutral-300 tabular-nums transition-colors duration-300 group-hover:text-accent'>
                                    /{String(idx + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <div className='font-display text-5xl leading-none text-neutral-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 md:text-6xl'>
                                        <NumberTicker value={stat.value} delay={0.2 + idx * 0.1} className='!text-neutral-900' />
                                        <span className='text-accent'>{stat.suffix}</span>
                                    </div>
                                    <p className='mt-3 font-mono text-[10px] tracking-widest text-neutral-500 uppercase'>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* Industry chips */}
                <div className='mt-6 flex flex-wrap items-center gap-2'>
                    <span className='mr-1 font-mono text-[10px] tracking-widest text-neutral-400 uppercase'>
                        Built for
                    </span>
                    {hospitality.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className='hover:border-accent group flex items-center gap-2 border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition-colors duration-300 hover:text-neutral-900'>
                            <Icon className='text-accent h-4 w-4 transition-transform duration-300 group-hover:scale-110' />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
