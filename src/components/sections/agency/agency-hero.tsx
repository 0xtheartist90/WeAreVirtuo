'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AgencyButton } from '@/components/ui/agency-button';
import { MatrixText } from '@/components/ui/matrix-text';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { agencyHero } from '@/content/agency';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { videoUrl } from '@/lib/video';

import { ArrowUpRight, Asterisk } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function AgencyHero() {
    const reducedMotion = useReducedMotion();
    const [formOpen, setFormOpen] = useState(false);

    return (
        <section className='bg-background'>
            {/* Black top frame keeps the fixed nav legible above the white block */}
            <div className='px-3 pt-16 pb-3 md:px-4 md:pt-16 md:pb-4'>
                {/* ── White editorial block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white text-neutral-900'>
                    <div className='px-5 py-8 md:px-10 md:py-12'>
                        {/* Top micro row — labels converge from both sides, rule draws in */}
                        <div className='relative pb-4'>
                            <div className='flex items-center justify-between font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>
                                <motion.span
                                    initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}>
                                    [ Digital Marketing Agency ]
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                                    className='hidden sm:inline'>
                                    Toronto · CA / US
                                </motion.span>
                            </div>
                            <motion.span
                                aria-hidden='true'
                                className='absolute bottom-0 left-0 h-px w-full origin-left bg-neutral-300'
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                            />
                        </div>

                        {/* Headline + arrow */}
                        <div className='mt-8 flex items-start justify-between gap-6'>
                            <MatrixText
                                as='h1'
                                className='font-display text-6xl leading-[0.85] tracking-tight text-neutral-900 uppercase md:text-8xl lg:text-9xl'>
                                {agencyHero.headline}
                            </MatrixText>
                            {/* Big arrow — springs in diagonally, then gently floats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.4, rotate: -70, x: -28, y: 28 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                                transition={{ type: 'spring', stiffness: 170, damping: 14, delay: 0.55 }}
                                className='mt-1 hidden shrink-0 sm:block'>
                                <motion.div
                                    animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}>
                                    <ArrowUpRight className='h-12 w-12 text-neutral-900 md:h-20 md:w-20' strokeWidth={1.5} />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Bottom row: eyebrow + sub + CTA */}
                        <div className='mt-10 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-6 md:grid-cols-[1fr_auto] md:items-end'>
                            <div className='flex items-start gap-3'>
                                <motion.div
                                    initial={{ opacity: 0, rotate: -120, scale: 0 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}>
                                    <Asterisk className='text-accent h-5 w-5 shrink-0' />
                                </motion.div>
                                <div className='overflow-hidden'>
                                    <motion.p
                                        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                                        transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
                                        className='text-accent mb-1 text-[11px] font-semibold tracking-[0.2em] uppercase'>
                                        {agencyHero.eyebrow}
                                    </motion.p>
                                    <motion.p
                                        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0, y: 6 }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: EASE, delay: 0.58 }}
                                        className='max-w-md text-base text-neutral-600'>
                                        {agencyHero.subheadline}
                                    </motion.p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 md:justify-end'>
                                <motion.div
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
                                    className='hidden sm:block'>
                                    <Link
                                        href='/portfolio'
                                        className='group hover:text-accent inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors'>
                                        Our Work
                                        <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 70, clipPath: 'inset(0 0 0 100%)' }}
                                    animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)' }}
                                    transition={{ duration: 0.7, ease: EASE, delay: 0.66 }}>
                                    <AgencyButton type='button' onClick={() => setFormOpen(true)} className='group'>
                                        Get a Free Strategy Call
                                        <ArrowUpRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                    </AgencyButton>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Video panel below the block (clearly visible) ── */}
                <motion.div
                    initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                    className='mt-3 overflow-hidden md:mt-4'>
                    {!reducedMotion ? (
                        <video
                            src={videoUrl(agencyHero.videoSrc)}
                            poster={agencyHero.posterSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='auto'
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
