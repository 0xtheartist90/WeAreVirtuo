'use client';

import { useState } from 'react';

import Link from 'next/link';

import { MatrixText } from '@/components/ui/matrix-text';
import { visibilityChannels } from '@/content/agency';

import { ArrowUpRight, Bot, MapPin, MessageSquare, Plus, Search, Sparkles, Target } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ['Own Every', 'Search', 'Surface.'];

const channelIcons = [Search, MapPin, Sparkles, Bot, Target, MessageSquare];

/* Red-bleed editorial SEO statement — micro labels, oversized right-aligned
   headline, centered B&W portrait, left copy block, and an oversized stat. */
export function AgencyApproach() {
    const [active, setActive] = useState<number | null>(0);

    return (
        <section id='approach' className='bg-accent relative overflow-hidden text-white'>
            {/* faint dot texture keeps it in our styling */}
            <div className='dot-grid pointer-events-none absolute inset-0 opacity-[0.12]' />

            <div className='relative mx-auto flex min-h-[92vh] max-w-[1600px] flex-col px-5 py-8 md:px-10 md:py-10'>
                {/* ── Top micro row ── */}
                <div className='flex items-start justify-between gap-4 border-b border-white/20 pb-4 font-mono text-[11px] tracking-widest text-white/70 uppercase'>
                    <span>
                        [ <MatrixText as='span' trigger='view'>Beyond Traditional SEO</MatrixText> ]
                    </span>
                    <span className='hidden md:inline'>Search · Maps · AI · Ads</span>
                    <span>2019–26 ©</span>
                </div>

                {/* ── Oversized headline, top-right ── */}
                <div className='mt-8 flex justify-end md:mt-4'>
                    <h2 className='font-display text-right text-6xl leading-[0.82] tracking-tight uppercase md:text-8xl lg:text-9xl'>
                        {HEADLINE.map((line) => (
                            <MatrixText key={line} as='span' trigger='view' className='block'>
                                {line}
                            </MatrixText>
                        ))}
                    </h2>
                </div>

                {/* ── Middle: left copy + centered portrait + channel list ── */}
                <div className='relative grid flex-1 grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-8'>
                    {/* Left copy block */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                        className='order-2 max-w-xs text-sm leading-relaxed text-white/70 md:order-1 md:col-span-3 md:col-start-1'>
                        <span className='font-semibold text-white'>Customers decide before they ever call.</span>{' '}
                        They search Google, Maps, and AI answers — then choose whoever shows up first,{' '}
                        <span className='font-semibold text-white'>everywhere</span>. Rankings alone don&apos;t win
                        anymore. We make sure you appear across every surface —{' '}
                        <span className='font-semibold text-white'>and turn that visibility into booked customers</span>.
                    </motion.p>

                    {/* Centered B&W portrait */}
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.3 }}
                        whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className='media-zoom group order-1 overflow-hidden md:order-2 md:col-span-4 md:col-start-5'>
                        <img
                            src='/images/bts/commercial-stage.jpg'
                            alt=''
                            aria-hidden='true'
                            className='aspect-[3/4] w-full object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105'
                        />
                    </motion.div>

                    {/* Right: SEO channels / sub-categories with icons */}
                    <div className='order-3 md:col-span-4 md:col-start-9'>
                        <p className='mb-2 font-mono text-[11px] tracking-widest text-white/60 uppercase'>
                            Where we get you found
                        </p>
                        <div className='border-t border-white/20'>
                            {visibilityChannels.map((channel, idx) => {
                                const Icon = channelIcons[idx % channelIcons.length];
                                const isActive = active === idx;

                                return (
                                    <motion.div
                                        key={channel.label}
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.4, ease: EASE, delay: idx * 0.06 }}
                                        className='border-b border-white/20'>
                                        <button
                                            type='button'
                                            onClick={() => setActive(isActive ? null : idx)}
                                            aria-expanded={isActive}
                                            className='group flex w-full items-center gap-3 py-3 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-4'>
                                            <Icon
                                                className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/70'}`}
                                                strokeWidth={1.5}
                                            />
                                            <span
                                                className={`flex-1 text-xs font-semibold tracking-wide uppercase transition-all duration-300 group-hover:translate-x-0.5 ${isActive ? 'text-white' : 'text-white/85'}`}>
                                                {channel.label}
                                            </span>
                                            <Plus
                                                className={`h-4 w-4 shrink-0 text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'rotate-45' : 'opacity-60 group-hover:opacity-100'}`}
                                                strokeWidth={1.75}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: EASE }}
                                                    className='overflow-hidden'>
                                                    <p className='pb-4 pl-7 text-xs leading-relaxed text-white/75'>
                                                        <MatrixText as='span' trigger='mount'>
                                                            {channel.detail}
                                                        </MatrixText>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Bottom row: link + oversized stat ── */}
                <div className='flex items-end justify-between gap-6 border-t border-white/20 pt-6'>
                    <Link
                        href='/services'
                        className='group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:text-white/70'>
                        See How We Rank You
                        <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className='text-right'>
                        <div className='font-display text-6xl leading-none tracking-tight md:text-8xl'>6+</div>
                        <p className='mt-2 ml-auto max-w-[16rem] font-mono text-[11px] leading-relaxed tracking-wide text-white/70 uppercase'>
                            Search & ad surfaces we get you found on — from Google to AI answers
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
