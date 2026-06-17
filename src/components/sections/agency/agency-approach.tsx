'use client';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { visibilityChannels } from '@/content/agency';

import { Bot, MapPin, MessageSquare, Search, Sparkles, Target } from 'lucide-react';
import { motion } from 'motion/react';

const icons = [Search, MapPin, Sparkles, Bot, Target, MessageSquare];

export function AgencyApproach() {
    return (
        <section id='approach' className='relative'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                {/* ── Image side — full height, top to bottom ── */}
                <div className='relative min-h-[55vh] overflow-hidden lg:min-h-full'>
                    <img
                        src='/images/bts/commercial-stage.jpg'
                        alt=''
                        aria-hidden='true'
                        className='absolute inset-0 h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30 lg:bg-gradient-to-r' />
                    <div className='absolute top-0 left-0 p-6 md:p-10'>
                        <p className='text-accent font-mono text-[11px] tracking-widest uppercase'>[ Beyond Traditional SEO ]</p>
                    </div>
                    <div className='absolute bottom-0 left-0 p-6 md:p-10'>
                        <p className='font-mono text-[11px] tracking-widest text-white/60 uppercase'>
                            Search · Maps · AI · Ads
                        </p>
                    </div>
                </div>

                {/* ── Content side ── */}
                <div className='relative flex flex-col justify-center px-4 py-16 md:px-10 md:py-24 lg:px-14'>
                    <div className='dot-grid pointer-events-none absolute inset-0 opacity-30' />
                    <div className='relative'>
                        <CharacterReveal
                            as='h2'
                            className='font-display text-foreground text-4xl leading-[0.92] tracking-tight uppercase md:text-6xl'>
                            Rankings Alone Are No Longer Enough
                        </CharacterReveal>
                        <p className='mt-5 max-w-lg text-lg text-white/75'>
                            Your customers discover businesses across Google, Maps, AI Overviews, and ChatGPT-style
                            search. We make sure you appear in every one — then turn that visibility into booked
                            customers.
                        </p>

                        {/* Channel list */}
                        <div className='mt-10 border-t border-white/10'>
                            {visibilityChannels.map((channel, idx) => {
                                const Icon = icons[idx % icons.length];

                                return (
                                    <motion.div
                                        key={channel.label}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className='group flex items-center gap-4 border-b border-white/10 py-4'>
                                        <Icon className='text-accent h-5 w-5 shrink-0' strokeWidth={1.5} />
                                        <span className='text-foreground w-40 shrink-0 text-sm font-semibold tracking-wide uppercase'>
                                            {channel.label}
                                        </span>
                                        <span className='hidden text-sm text-white/55 sm:block'>{channel.detail}</span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <p className='mt-8 max-w-lg text-sm text-white/60'>
                            <span className='text-foreground font-semibold'>You run your business. Virtuo runs your marketing.</span>{' '}
                            Setup, ads, tracking, landing pages, analytics, and conversion — handled end to end.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
