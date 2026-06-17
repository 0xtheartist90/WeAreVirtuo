'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { agencyTestimonials } from '@/content/agency';
import { MOTION } from '@/lib/motion';

export function AgencyTestimonials() {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                {/* Header */}
                <div className='col-span-full mb-10 flex items-end justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>[ Testimonials ]</p>
                        <h2 className='font-display text-foreground text-4xl tracking-tight uppercase md:text-6xl'>
                            In Their Words
                        </h2>
                    </div>
                    <span className='font-mono text-[11px] tracking-widest text-white/40 tabular-nums'>
                        ({String(agencyTestimonials.length).padStart(2, '0')})
                    </span>
                </div>

                {/* Editorial columns */}
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0'>
                        {agencyTestimonials.map((t, idx) => (
                            <BlurFade key={t.name} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                                <figure className='flex h-full flex-col py-8 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0'>
                                    <div className='flex items-start justify-between'>
                                        <span className='text-accent font-display -mt-2 text-6xl leading-none'>&ldquo;</span>
                                        <span className='text-accent/40 font-mono text-[11px] tracking-widest tabular-nums'>
                                            /{String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <blockquote className='text-foreground/90 mt-2 flex-1 text-lg leading-relaxed'>
                                        {t.quote}
                                    </blockquote>

                                    <figcaption className='mt-8 border-t border-white/10 pt-5'>
                                        <p className='font-display text-foreground text-xl tracking-wide uppercase'>{t.name}</p>
                                        <p className='mt-1 font-mono text-[11px] tracking-widest text-white/45 uppercase'>
                                            {t.title} · <span className='text-accent'>{t.company}</span>
                                        </p>
                                    </figcaption>
                                </figure>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
