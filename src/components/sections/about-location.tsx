'use client';

import { PinContainer } from '@/components/ui/3d-pin';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { ShimmerButton } from '@/components/ui/shimmer-button';

import { Clock, MapPin, Phone } from 'lucide-react';

export function AboutLocation() {
    return (
        <section className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Visit Us</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-3xl tracking-wide uppercase md:text-6xl'>
                        Our Toronto Studio
                    </CharacterReveal>
                </div>

                <div className='mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-2'>
                    {/* 3D Pin with studio image */}
                    <div className='flex items-center justify-center'>
                        <PinContainer title='548 Dundas St W, Toronto'>
                            <div className='flex w-[20rem] flex-col p-4 tracking-tight'>
                                <div className='relative overflow-hidden rounded-xl'>
                                    <img
                                        src='/images/about/studio.jpg'
                                        alt='Virtuo Video Studio'
                                        className='h-40 w-full object-cover'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                                    <span className='absolute bottom-2 left-3 inline-flex items-center gap-1.5 text-xs font-medium text-white'>
                                        <MapPin className='text-accent h-3 w-3' />
                                        Dundas & Bathurst
                                    </span>
                                </div>
                                <h3 className='mt-3 text-base font-bold text-white'>Virtuo Video Studio</h3>
                                <p className='mt-1 text-sm text-white/70'>
                                    Full-service production studio in the heart of Toronto&apos;s creative district.
                                </p>
                            </div>
                        </PinContainer>
                    </div>

                    {/* Info card */}
                    <div className='flex h-full flex-col justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8'>
                        <div className='space-y-6'>
                            <div className='flex items-start gap-4'>
                                <div className='bg-accent/10 border-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border'>
                                    <MapPin className='text-accent h-5 w-5' />
                                </div>
                                <div>
                                    <h3 className='text-foreground font-semibold'>Studio Address</h3>
                                    <p className='mt-1 text-sm text-white/80'>
                                        548 Dundas Street West, Unit B
                                        <br />
                                        Toronto, ON M5T 1H3
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-accent/10 border-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border'>
                                    <Phone className='text-accent h-5 w-5' />
                                </div>
                                <div>
                                    <h3 className='text-foreground font-semibold'>Phone</h3>
                                    <a
                                        href='tel:6479530222'
                                        className='hover:text-accent mt-1 text-sm text-white/80 transition-colors'>
                                        (647) 953-0222
                                    </a>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-accent/10 border-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border'>
                                    <Clock className='text-accent h-5 w-5' />
                                </div>
                                <div>
                                    <h3 className='text-foreground font-semibold'>Studio Hours</h3>
                                    <p className='mt-1 text-sm text-white/80'>
                                        Monday – Friday: 9 AM – 7 PM
                                        <br />
                                        Weekends: By appointment
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='w-full px-6 py-4 text-base font-semibold'
                                onClick={() =>
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }>
                                Book a Studio Visit
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
