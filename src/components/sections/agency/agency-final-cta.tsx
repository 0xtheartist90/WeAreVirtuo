'use client';

import { useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { ShimmerButton } from '@/components/ui/shimmer-button';

import { ArrowRight, MapPin, Phone } from 'lucide-react';

export function AgencyFinalCta() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <CinematicSection
                id='contact'
                bgImage='/images/bts/full-production-set.jpg'
                overlayOpacity={60}
                className='py-24 md:py-36'>
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 text-center md:px-8'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>Let&apos;s Grow</p>

                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mx-auto max-w-3xl text-4xl leading-tight tracking-wide uppercase md:text-6xl lg:text-7xl'>
                        Ready to Get Found Everywhere?
                    </CharacterReveal>

                    <p className='mx-auto mt-5 max-w-xl text-lg text-white/80'>
                        Book a free strategy call. We&apos;ll show you exactly where your business is missing visibility —
                        and how to capture it.
                    </p>

                    <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                        <button type='button' onClick={() => setFormOpen(true)}>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-base font-semibold'>
                                Get a Free Strategy Call
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </ShimmerButton>
                        </button>
                        <a
                            href='tel:6479530222'
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            <Phone className='h-4 w-4' />
                            647-953-0222
                        </a>
                    </div>

                    <div className='mt-12 flex items-center justify-center gap-1.5'>
                        <MapPin className='text-accent h-3.5 w-3.5' />
                        <p className='text-sm text-white/70'>
                            Serving Canada &amp; the United States · Toronto HQ
                        </p>
                    </div>
                </div>
            </CinematicSection>

            <QuoteFormPanel
                open={formOpen}
                onClose={() => setFormOpen(false)}
                title='Free Strategy Call'
                location='final_cta'
            />
        </>
    );
}
