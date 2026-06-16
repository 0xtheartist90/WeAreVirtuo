'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { MagicCard } from '@/components/ui/magic-card';
import { visibilityChannels } from '@/content/agency';
import { MOTION } from '@/lib/motion';

import { Bot, MapPin, MessageSquare, Search, Sparkles, Target } from 'lucide-react';

const icons = [Search, MapPin, Sparkles, Bot, Target, MessageSquare];

export function AgencyApproach() {
    return (
        <section id='approach' className='relative py-20 md:py-28'>
            <div className='dot-grid pointer-events-none absolute inset-0 opacity-40' />
            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='mx-auto max-w-3xl text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>
                        Beyond Traditional SEO
                    </p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-5 text-4xl tracking-wide uppercase md:text-5xl'>
                        Rankings Alone Are No Longer Enough
                    </CharacterReveal>
                    <p className='mx-auto mb-14 max-w-2xl text-lg text-white/80'>
                        Your customers discover businesses across Google, Maps, AI Overviews, and ChatGPT-style search.
                        We make sure you appear in every one of them — then turn that visibility into booked customers.
                    </p>
                </div>

                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                    {visibilityChannels.map((channel, idx) => {
                        const Icon = icons[idx % icons.length];

                        return (
                            <BlurFade key={channel.label} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                                <MagicCard className='h-full rounded-xl'>
                                    <div className='flex h-full items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6'>
                                        <div className='border-accent/20 bg-accent/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border'>
                                            <Icon className='text-accent h-5 w-5' />
                                        </div>
                                        <div>
                                            <h3 className='text-foreground text-base font-semibold'>{channel.label}</h3>
                                            <p className='text-muted-foreground mt-1 text-sm'>{channel.detail}</p>
                                        </div>
                                    </div>
                                </MagicCard>
                            </BlurFade>
                        );
                    })}
                </div>

                <p className='mx-auto mt-12 max-w-2xl text-center text-base text-white/70'>
                    <span className='text-foreground font-semibold'>You run your business. Virtuo runs your marketing.</span>{' '}
                    Setup, ad management, tracking, landing pages, analytics, and conversion optimization — handled end to end.
                </p>
            </div>
        </section>
    );
}
