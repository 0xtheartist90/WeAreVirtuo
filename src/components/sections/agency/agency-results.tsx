'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { agencyStats } from '@/content/agency';
import { MOTION } from '@/lib/motion';

import { Building2, Hotel, MapPinned, UtensilsCrossed } from 'lucide-react';

const hospitality = [
    { icon: Hotel, label: 'Luxury Hotels' },
    { icon: UtensilsCrossed, label: 'Restaurants' },
    { icon: MapPinned, label: 'Multi-Location Brands' },
    { icon: Building2, label: 'Hospitality Groups' }
];

/* Light section — a stark white band to break up the black. */
export function AgencyResults() {
    return (
        <section id='results' className='relative bg-white py-20 text-neutral-900 md:py-28'>
            <div className='dot-grid-dark pointer-events-none absolute inset-0 opacity-60' />

            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                            [ Proven at Scale ]
                        </p>
                        <h2 className='font-display text-5xl leading-[0.9] tracking-tight text-neutral-900 uppercase md:text-7xl'>
                            Trusted Across
                            <br />
                            North America
                        </h2>
                    </div>
                    <p className='max-w-sm text-base text-neutral-600'>
                        Hundreds of hospitality and multi-location businesses getting found and growing — across Canada
                        and the United States.
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-4'>
                    {agencyStats.map((stat, idx) => (
                        <BlurFade key={stat.label} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                            <div className='flex h-full flex-col justify-between bg-white p-6 md:p-8'>
                                <div className='font-display text-5xl text-neutral-900 md:text-7xl'>
                                    <NumberTicker value={stat.value} delay={0.2 + idx * 0.1} className='!text-neutral-900' />
                                    <span className='text-accent'>{stat.suffix}</span>
                                </div>
                                <p className='mt-4 font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>
                                    {stat.label}
                                </p>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                <div className='mt-10 flex flex-wrap items-center gap-2'>
                    {hospitality.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className='flex items-center gap-2 border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700'>
                            <Icon className='text-accent h-4 w-4' />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
