'use client';

import { useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { ShimmerButton } from '@/components/ui/shimmer-button';

import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export function AboutCta() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <CinematicSection
                id='contact'
                bgImage='/images/bts/full-production-set.jpg'
                overlayOpacity={55}
                className='py-24 md:py-36'>
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 text-center md:px-8'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>Ready to Start?</p>

                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mx-auto max-w-3xl text-4xl leading-tight tracking-wide uppercase md:text-6xl lg:text-7xl'>
                        Your Story Deserves Cinema
                    </CharacterReveal>

                    <p className='mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80'>
                        From concept to final cut, we&apos;re ready to bring your vision to life. Reach out and
                        let&apos;s talk about your next project.
                    </p>

                    {/* Two CTAs */}
                    <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-base font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call Jeff — 647-953-0222
                            </ShimmerButton>
                        </a>
                        <a
                            href='/v2#contact'
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Send a Message
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </a>
                    </div>

                    <p className='text-accent mt-4 text-sm font-medium tracking-wide'>Currently booking Summer 2026</p>

                    {/* Inline testimonial */}
                    <div className='mx-auto mt-14 max-w-lg'>
                        <div className='mb-3 flex justify-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className='fill-accent text-accent h-4 w-4' />
                            ))}
                        </div>
                        <blockquote className='text-foreground text-base leading-relaxed italic'>
                            &ldquo;Their expertise in creating engaging reels and 360 content transformed our online
                            presence and enhanced our marketing efforts.&rdquo;
                        </blockquote>
                        <p className='mt-3 text-sm text-white/70'>
                            — Patrick Lee, Owner, <span className='text-accent font-medium'>Nome Izakaya</span>
                        </p>
                    </div>

                    {/* Footer line */}
                    <div className='mt-12 flex items-center justify-center gap-1.5'>
                        <MapPin className='text-accent h-3.5 w-3.5' />
                        <p className='text-sm text-white/70'>548 Dundas St W, Toronto &middot; Mon–Fri 9AM–7PM</p>
                    </div>
                </div>
            </CinematicSection>
        </>
    );
}
