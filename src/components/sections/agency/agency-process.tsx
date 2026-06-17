'use client';

import { MatrixText } from '@/components/ui/matrix-text';
import { processGlyphs } from '@/components/ui/process-glyphs';

import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const approach = [
    {
        n: '01',
        title: 'Strategy',
        body: 'We map exactly where your customers are searching — Google, Maps, AI Overviews, paid — and where you’re invisible.'
    },
    {
        n: '02',
        title: 'Execution',
        body: 'SEO, Google & Meta ads, landing pages, and tracking — built and managed end to end, under one roof.'
    },
    {
        n: '03',
        title: 'Growth',
        body: 'We optimize against real conversions, not vanity rankings, and report on what actually moves the business.'
    }
];

export function AgencyProcess() {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                <div className='col-span-full mb-12 border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                    <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>[ How We Work ]</p>
                    <MatrixText
                        as='h2'
                        trigger='view'
                        className='font-display text-foreground block text-4xl tracking-tight uppercase md:text-6xl'>
                        Strategy to Growth
                    </MatrixText>
                </div>

                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3'>
                        {approach.map((step, i) => {
                            const Glyph = processGlyphs[i % processGlyphs.length];

                            return (
                                <motion.div
                                    key={step.n}
                                    initial={{ opacity: 0, y: 26 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                                    className='group relative border-t-2 border-white/15 pt-6 transition-colors hover:border-accent'>
                                    {/* accent grow line on hover */}
                                    <span className='bg-accent absolute -top-0.5 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full' />

                                    <div className='flex items-start justify-between'>
                                        <span className='font-display text-7xl leading-[0.8] text-white/10 transition-colors group-hover:text-white/20 md:text-8xl'>
                                            {step.n}
                                        </span>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.4, rotate: -14 }}
                                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 + i * 0.12 }}>
                                            <Glyph className='text-accent h-14 w-14 shrink-0 md:h-16 md:w-16' />
                                        </motion.div>
                                    </div>

                                    <h3 className='font-display text-foreground group-hover:text-accent mt-6 text-3xl tracking-wide uppercase transition-colors md:text-4xl'>
                                        {step.title}
                                    </h3>
                                    <p className='mt-3 text-sm leading-relaxed text-white/65'>{step.body}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
