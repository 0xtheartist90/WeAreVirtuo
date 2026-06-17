'use client';

import { MatrixText } from '@/components/ui/matrix-text';

import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const story = [
    {
        phase: 'The Origin',
        title: 'Behind the Lens',
        body: 'Virtuo began as a video and 360° production studio — crafting cinematic content and immersive tours for Toronto’s most ambitious hospitality, automotive, and luxury brands.'
    },
    {
        phase: 'The Shift',
        title: 'Content Wasn’t Enough',
        body: 'Clients kept asking the same question: how do we actually get found? Beautiful work meant little if no one discovered it — so we went deeper, into SEO, local search, and the platforms where customers really decide.'
    },
    {
        phase: 'Today',
        title: 'A Full Digital Engine',
        body: 'Now we connect visibility, advertising, web, and production into one engine — built for how people search today across Google, Maps, and AI. 10,000+ tours and hundreds of brands later, we’re just getting started.'
    }
];

export function AgencyStory() {
    return (
        <section id='our-story' className='py-20 md:py-28'>
            <div className='grid-layout'>
                {/* Intro + image */}
                <div className='col-span-full lg:col-start-2 lg:col-end-7'>
                    <p className='text-accent mb-4 font-mono text-[11px] tracking-widest uppercase'>[ Our Story ]</p>
                    <MatrixText
                        as='h2'
                        trigger='view'
                        className='font-display text-foreground block text-4xl leading-[0.92] tracking-tight uppercase md:text-5xl'>
                        From the Lens to the Whole Funnel
                    </MatrixText>
                    <p className='mt-5 max-w-md text-lg text-white/70'>
                        What started as a camera and a 360° rig became a full digital marketing agency. The thread that
                        connects it all: helping ambitious brands get seen.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, scale: 1.06 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className='relative mt-8 overflow-hidden border border-white/10'>
                        <img
                            src='/images/bts/full-production-set.jpg'
                            alt='Virtuo on a production set'
                            className='aspect-[4/3] w-full object-cover'
                        />
                        <span className='border-accent absolute top-3 left-3 h-5 w-5 border-t border-l' />
                        <span className='border-accent absolute right-3 bottom-3 h-5 w-5 border-r border-b' />
                    </motion.div>
                </div>

                {/* Animated timeline */}
                <div className='col-span-full mt-12 lg:col-start-8 lg:col-end-12 lg:mt-0 lg:self-center'>
                    <ol className='relative'>
                        {/* drawing line */}
                        <motion.span
                            aria-hidden='true'
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className='absolute top-1.5 bottom-2 left-0 w-px origin-top bg-white/15'
                        />
                        {story.map((ch, i) => (
                            <motion.li
                                key={ch.phase}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: EASE }}
                                className='relative pb-10 pl-8 last:pb-0'>
                                <motion.span
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.35 + i * 0.15 }}
                                    className='bg-accent absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full'
                                />
                                <p className='text-accent flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase'>
                                    <span className='text-white/40'>/{String(i + 1).padStart(2, '0')}</span>
                                    {ch.phase}
                                </p>
                                <h3 className='font-display text-foreground mt-1.5 text-2xl tracking-wide uppercase'>
                                    {ch.title}
                                </h3>
                                <p className='mt-2 max-w-md text-sm leading-relaxed text-white/65'>{ch.body}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
