'use client';

import { useRef } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';

import { motion, useScroll, useTransform } from 'motion/react';

export function AboutJeff() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

    return (
        <section ref={ref} className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16'>
                    {/* Image side */}
                    <div className='relative'>
                        <motion.div
                            style={{ y: imageY }}
                            className='relative overflow-hidden rounded-2xl border border-white/[0.06]'>
                            <img
                                src='/images/about/jeff-hero.jpg'
                                alt='Jeff Han — Founder & Creative Director'
                                className='aspect-[3/4] w-full object-cover object-top'
                            />
                            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
                        </motion.div>
                    </div>

                    {/* Text side */}
                    <div className='text-center md:text-left'>
                        <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>
                            Meet the Founder
                        </p>
                        <CharacterReveal
                            as='h2'
                            className='font-display text-foreground mb-6 text-3xl tracking-wide uppercase md:text-5xl'>
                            Jeff Han
                        </CharacterReveal>
                        <div className='bg-accent mx-auto mb-6 h-px w-12 md:mx-0' />
                        <div className='space-y-4 text-base leading-relaxed text-white/80 md:text-lg'>
                            <p>
                                Jeff didn&apos;t start in a film school classroom. He started on the streets of Toronto
                                with a borrowed camera and an obsession with light, movement, and story.
                            </p>
                            <p>
                                Over 8 years and 150+ projects later, that obsession hasn&apos;t faded — it&apos;s
                                sharpened. From intimate restaurant reels to large-scale commercial productions for
                                brands like BMW and Mercedes-Benz, Jeff brings the same meticulous eye to every frame.
                            </p>
                            <p className='font-medium text-white/90 italic'>
                                &ldquo;Every project is personal. I don&apos;t hand off your vision to a junior editor —
                                I&apos;m on set, behind the camera, in the edit suite. That&apos;s the Virtuo
                                difference.&rdquo;
                            </p>
                        </div>
                        <div className='mt-8 flex items-center justify-center gap-4 md:justify-start'>
                            <span className='text-foreground text-sm font-semibold'>Jeff Han</span>
                            <span className='text-sm text-white/70'>Founder & Creative Director</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
