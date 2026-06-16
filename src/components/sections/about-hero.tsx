'use client';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

import { ArrowRight, ChevronDown, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutHero() {
    const reducedMotion = useReducedMotion();

    return (
        <section className='relative min-h-screen overflow-hidden bg-black'>
            {/* Background — cinematic production shot */}
            <div className='absolute inset-0 z-0'>
                <img
                    src='/images/bts/commercial-stage.jpg'
                    alt=''
                    aria-hidden='true'
                    className='h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40' />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
            </div>

            <div className='relative z-10 mx-auto flex min-h-screen max-w-[var(--max-width-content)] items-end px-4 pb-20 md:items-center md:px-8 md:pb-0'>
                <div className='w-full max-w-2xl'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>
                        About Virtuo Video
                    </p>

                    <CharacterReveal
                        as='h1'
                        className='font-display text-foreground text-4xl leading-[1.1] tracking-wide uppercase md:text-6xl lg:text-7xl'>
                        Where Story Meets Craft
                    </CharacterReveal>

                    <p className='mt-6 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl'>
                        One filmmaker. One obsession. Eight years of proving that video changes everything.
                    </p>

                    <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-base font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call 647-953-0222
                            </ShimmerButton>
                        </a>
                        <button
                            type='button'
                            onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Our Story
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>

                    <p className='text-accent mt-4 text-sm font-medium tracking-wide'>Currently booking Summer 2026</p>
                </div>
            </div>

            {/* Scroll indicator */}
            {!reducedMotion && (
                <motion.div
                    className='absolute bottom-6 left-1/2 z-20 -translate-x-1/2'
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                    <ChevronDown className='h-6 w-6 text-white/60' />
                </motion.div>
            )}
        </section>
    );
}
