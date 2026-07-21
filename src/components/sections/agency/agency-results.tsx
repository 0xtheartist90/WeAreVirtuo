'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { MatrixText } from '@/components/ui/matrix-text';
import { NumberTicker } from '@/components/ui/number-ticker';
import { agencyStats } from '@/content/agency';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MOTION } from '@/lib/motion';
import { videoUrl } from '@/lib/video';

import { Building2, Hotel, MapPinned, UtensilsCrossed } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const hospitality = [
    { icon: Hotel, label: 'Luxury Hotels' },
    { icon: UtensilsCrossed, label: 'Restaurants' },
    { icon: MapPinned, label: 'Multi-Location Brands' },
    { icon: Building2, label: 'Hospitality Groups' }
];

const RESULTS_VIDEO = 'videos/portfolio/nome-fort-york.mp4';
const RESULTS_POSTER = '/images/portfolio/nome.png';

/* Red band — compact accent section: header + small video, then a stat row. */
export function AgencyResults() {
    const reducedMotion = useReducedMotion();

    return (
        <section id='results' className='bg-accent relative py-14 text-white md:py-20'>
            <div className='dot-grid pointer-events-none absolute inset-0 opacity-[0.12]' />

            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header + small video */}
                <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <p className='mb-2 font-mono text-[11px] tracking-widest text-white/70 uppercase'>
                            [ Proven at Scale ]
                        </p>
                        <MatrixText
                            as='h2'
                            trigger='view'
                            className='font-display block text-4xl leading-[0.9] tracking-tight text-white uppercase md:text-6xl'>
                            Trusted Across North America
                        </MatrixText>
                        <p className='mt-4 max-w-md text-base text-white/70'>
                            Hundreds of hospitality and multi-location businesses getting found and growing.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                        whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
                        className='relative w-full shrink-0 overflow-hidden border border-white/20 md:w-72'>
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
                        <span className='absolute top-2.5 left-2.5 h-4 w-4 border-t border-l border-white' />
                        <span className='absolute right-2.5 bottom-2.5 h-4 w-4 border-r border-b border-white' />
                    </motion.div>
                </div>

                {/* Stat row */}
                <div className='mt-10 grid grid-cols-2 gap-px border border-white/15 bg-white/15 md:grid-cols-4'>
                    {agencyStats.map((stat, idx) => (
                        <BlurFade key={stat.label} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                            <div className='bg-accent group relative flex h-full flex-col justify-between gap-6 overflow-hidden p-5 transition-colors duration-300 hover:bg-white/[0.06] md:p-6'>
                                {/* white top bar grows on hover */}
                                <span className='absolute top-0 left-0 h-0.5 w-0 bg-white transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full' />
                                <span className='font-mono text-[10px] tracking-widest text-white/40 tabular-nums transition-colors duration-300 group-hover:text-white'>
                                    /{String(idx + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <div className='font-display text-5xl leading-none text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 md:text-6xl'>
                                        <NumberTicker value={stat.value} delay={0.2 + idx * 0.1} className='!text-white' />
                                        <span className='text-white/70'>{stat.suffix}</span>
                                    </div>
                                    <p className='mt-3 font-mono text-[10px] tracking-widest text-white/60 uppercase'>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* Industry chips */}
                <div className='mt-6 flex flex-wrap items-center gap-2'>
                    <span className='mr-1 font-mono text-[10px] tracking-widest text-white/50 uppercase'>Built for</span>
                    {hospitality.map(({ icon: Icon, label }, idx) => (
                        <motion.span
                            key={label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                            transition={{ duration: 0.4, ease: EASE, delay: idx * 0.08 }}
                            className='group flex items-center gap-2 border border-white/25 px-3 py-1.5 text-sm text-white/85 transition-colors duration-300 hover:border-white hover:text-white'>
                            <Icon className='h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110' />
                            {label}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
