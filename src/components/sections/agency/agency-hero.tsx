'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AgencyButton } from '@/components/ui/agency-button';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { agencyHero } from '@/content/agency';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { videoUrl } from '@/lib/video';

import { ArrowUpRight, Asterisk } from 'lucide-react';
import { motion } from 'motion/react';

export function AgencyHero() {
    const reducedMotion = useReducedMotion();
    const [formOpen, setFormOpen] = useState(false);

    return (
        <section className='bg-background'>
            {/* Black top frame keeps the fixed nav legible above the white block */}
            <div className='px-3 pt-20 pb-3 md:px-4 md:pt-24 md:pb-4'>
                {/* ── White editorial block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white text-neutral-900'>
                    <div className='px-5 py-8 md:px-10 md:py-12'>
                        {/* Top micro row */}
                        <div className='flex items-center justify-between border-b border-neutral-300 pb-4 font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>
                            <span>[ Digital Marketing Agency ]</span>
                            <span className='hidden sm:inline'>Toronto · CA / US</span>
                        </div>

                        {/* Headline + arrow */}
                        <div className='mt-8 flex items-start justify-between gap-6'>
                            <h1 className='font-display text-6xl leading-[0.85] tracking-tight text-neutral-900 uppercase md:text-8xl lg:text-9xl'>
                                {agencyHero.headline}
                            </h1>
                            <ArrowUpRight
                                className='mt-1 hidden h-12 w-12 shrink-0 text-neutral-900 sm:block md:h-20 md:w-20'
                                strokeWidth={1.5}
                            />
                        </div>

                        {/* Bottom row: eyebrow + sub + CTA */}
                        <div className='mt-10 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-6 md:grid-cols-[1fr_auto] md:items-end'>
                            <div className='flex items-start gap-3'>
                                <Asterisk className='text-accent h-5 w-5 shrink-0' />
                                <div>
                                    <p className='text-accent mb-1 text-[11px] font-semibold tracking-[0.2em] uppercase'>
                                        {agencyHero.eyebrow}
                                    </p>
                                    <p className='max-w-md text-base text-neutral-600'>{agencyHero.subheadline}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5'>
                                <Link
                                    href='/portfolio'
                                    className='group hover:text-accent hidden items-center gap-1.5 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors sm:inline-flex'>
                                    Our Work
                                    <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                </Link>
                                <AgencyButton type='button' onClick={() => setFormOpen(true)}>
                                    Get a Free Strategy Call
                                    <ArrowUpRight className='h-4 w-4' />
                                </AgencyButton>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Video panel below the block (clearly visible) ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className='mt-3 overflow-hidden md:mt-4'>
                    {!reducedMotion ? (
                        <video
                            src={videoUrl(agencyHero.videoSrc)}
                            poster={agencyHero.posterSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className='aspect-[2/1] w-full object-cover md:aspect-[21/9]'
                        />
                    ) : (
                        <img
                            src={agencyHero.posterSrc}
                            alt=''
                            aria-hidden='true'
                            className='aspect-[2/1] w-full object-cover md:aspect-[21/9]'
                        />
                    )}
                </motion.div>
            </div>

            <QuoteFormPanel open={formOpen} onClose={() => setFormOpen(false)} title='Free Strategy Call' location='hero' />
        </section>
    );
}
