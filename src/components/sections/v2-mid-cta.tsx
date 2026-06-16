'use client';

import { MovingBorder } from '@/components/effects/moving-border';
import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { LeadMagnetButton } from '@/components/ui/lead-magnet-modal';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { MOTION } from '@/lib/motion';

import { Phone } from 'lucide-react';

export function V2MidCta() {
    return (
        <section className='py-12 pb-20 md:py-16 md:pb-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <MovingBorder
                        duration={3000}
                        className='relative overflow-hidden px-8 py-16 text-center md:px-16 md:py-20'>
                        {/* Background glow */}
                        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06),transparent_70%)]' />

                        <div className='relative'>
                            <p className='text-accent mb-4 text-sm font-medium tracking-widest uppercase'>Impressed?</p>
                            <CharacterReveal
                                as='h2'
                                className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                                Like What You See?
                            </CharacterReveal>
                            <p className='mx-auto mb-10 max-w-[var(--max-width-prose)] text-lg text-white/80'>
                                Your restaurant could look this good. Let&apos;s talk about making it happen.
                            </p>
                            <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
                                <a href='tel:6479530222'>
                                    <ShimmerButton
                                        shimmerColor='rgba(220, 38, 38, 0.8)'
                                        background='rgba(220, 38, 38, 0.9)'
                                        className='px-10 py-4 text-lg font-semibold'>
                                        <Phone className='mr-2 h-4 w-4' />
                                        Call 647-953-0222
                                    </ShimmerButton>
                                </a>
                                <LeadMagnetButton />
                            </div>
                            <p className='text-accent mt-6 text-sm font-medium'>Limited spots for Summer 2026</p>
                        </div>
                    </MovingBorder>
                </BlurFade>
            </div>
        </section>
    );
}
