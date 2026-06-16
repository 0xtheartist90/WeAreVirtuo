'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { MagicCard } from '@/components/ui/magic-card';
import { agencyTestimonials } from '@/content/agency';
import { MOTION } from '@/lib/motion';

import { Quote, Star } from 'lucide-react';

export function AgencyTestimonials() {
    return (
        <section className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='mx-auto mb-14 max-w-3xl text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Client Results</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground text-4xl tracking-wide uppercase md:text-5xl'>
                        What Partners Say
                    </CharacterReveal>
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {agencyTestimonials.map((t, idx) => (
                        <BlurFade key={t.name} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                            <MagicCard className='h-full rounded-xl'>
                                <div className='flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-7'>
                                    <Quote className='text-accent/40 h-8 w-8' />
                                    <div className='my-4 flex gap-1'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className='fill-accent text-accent h-4 w-4' />
                                        ))}
                                    </div>
                                    <blockquote className='flex-1 text-base leading-relaxed text-white/85 italic'>
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                    <div className='mt-6 border-t border-white/[0.06] pt-4'>
                                        <p className='text-foreground text-sm font-semibold'>{t.name}</p>
                                        <p className='text-muted-foreground text-xs'>
                                            {t.title}, <span className='text-accent'>{t.company}</span>
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
