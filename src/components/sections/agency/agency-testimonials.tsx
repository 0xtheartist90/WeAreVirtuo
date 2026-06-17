'use client';

import { MatrixText } from '@/components/ui/matrix-text';
import { agencyTestimonials } from '@/content/agency';

import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function AgencyTestimonials() {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                {/* Header */}
                <div className='col-span-full mb-10 flex items-end justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>[ Testimonials ]</p>
                        <MatrixText
                            as='h2'
                            trigger='view'
                            className='font-display text-foreground block text-4xl tracking-tight uppercase md:text-6xl'>
                            In Their Words
                        </MatrixText>
                    </div>
                    <span className='font-mono text-[11px] tracking-widest text-white/40 tabular-nums'>
                        ({String(agencyTestimonials.length).padStart(2, '0')})
                    </span>
                </div>

                {/* Editorial columns */}
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0'>
                        {agencyTestimonials.map((t, idx) => (
                            <motion.figure
                                key={t.name}
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, ease: EASE, delay: idx * 0.12 }}
                                className='tech-select group relative flex h-full flex-col overflow-hidden py-8 md:px-10 md:py-6 md:first:pl-0 md:last:pr-0'>
                                <div className='relative z-[1] flex items-start justify-between'>
                                    <span className='text-accent font-display -mt-2 text-6xl leading-none transition-transform duration-300 group-hover:scale-110'>
                                        &ldquo;
                                    </span>
                                    <span className='text-accent/40 font-mono text-[11px] tracking-widest tabular-nums'>
                                        /{String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <blockquote className='text-foreground/85 group-hover:text-foreground relative z-[1] mt-2 flex-1 text-lg leading-relaxed transition-colors'>
                                    {t.quote}
                                </blockquote>

                                <figcaption className='relative z-[1] mt-8 border-t border-white/10 pt-5 transition-colors group-hover:border-accent/40'>
                                    <p className='tech-title font-display text-foreground text-xl tracking-wide uppercase'>
                                        {t.name}
                                    </p>
                                    <p className='mt-1 font-mono text-[11px] tracking-widest text-white/45 uppercase'>
                                        {t.title} · <span className='text-accent'>{t.company}</span>
                                    </p>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
