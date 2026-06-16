'use client';

import { useState } from 'react';

import Link from 'next/link';

import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { AgencyButton, outlineButtonClass } from '@/components/ui/agency-button';
import { MagicCard } from '@/components/ui/magic-card';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { MOTION } from '@/lib/motion';

import { ArrowLeft, ArrowUpRight, Check, Phone } from 'lucide-react';

export interface ServicePageStubProps {
    eyebrow: string;
    title: string;
    intro: string;
    bgImage: string;
    capabilities: { title: string; detail: string }[];
}

export function ServicePageStub({ eyebrow, title, intro, bgImage, capabilities }: ServicePageStubProps) {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            {/* Hero */}
            <CinematicSection bgImage={bgImage} overlayOpacity={72} className='min-h-[80svh]'>
                <div className='mx-auto flex min-h-[80svh] max-w-[var(--max-width-content)] flex-col justify-center px-4 py-32 md:px-8'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>{eyebrow}</p>
                    <CharacterReveal
                        as='h1'
                        className='font-display text-foreground max-w-4xl text-5xl leading-[0.95] tracking-wide uppercase md:text-7xl'>
                        {title}
                    </CharacterReveal>
                    <p className='mt-6 max-w-2xl text-lg text-white/80 md:text-xl'>{intro}</p>
                    <div className='mt-10 flex flex-col items-start gap-4 sm:flex-row'>
                        <AgencyButton type='button' onClick={() => setFormOpen(true)} className='px-8 py-4 text-base'>
                            Get a Free Strategy Call
                            <ArrowUpRight className='h-4 w-4' />
                        </AgencyButton>
                        <a href='tel:6479530222' className={`${outlineButtonClass} px-8 py-4 text-base`}>
                            <Phone className='h-4 w-4' />
                            647-953-0222
                        </a>
                    </div>
                </div>
            </CinematicSection>

            {/* Capabilities */}
            <section className='py-20 md:py-28'>
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>What&apos;s Included</p>
                    <h2 className='font-display text-foreground mb-12 text-3xl tracking-wide uppercase md:text-4xl'>
                        Capabilities
                    </h2>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        {capabilities.map((cap, idx) => (
                            <BlurFade key={cap.title} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                                <MagicCard className='h-full rounded-xl'>
                                    <div className='flex h-full items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6'>
                                        <span className='border-accent/20 bg-accent/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border'>
                                            <Check className='text-accent h-3.5 w-3.5' />
                                        </span>
                                        <div>
                                            <h3 className='text-foreground text-base font-semibold'>{cap.title}</h3>
                                            <p className='text-muted-foreground mt-1 text-sm'>{cap.detail}</p>
                                        </div>
                                    </div>
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </div>

                    <div className='mt-12'>
                        <Link
                            href='/'
                            className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors'>
                            <ArrowLeft className='h-4 w-4' />
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>

            <QuoteFormPanel open={formOpen} onClose={() => setFormOpen(false)} title='Free Strategy Call' location={eyebrow} />
        </>
    );
}
