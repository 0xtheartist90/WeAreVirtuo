'use client';

import { useEffect, useState } from 'react';

import { Spotlight } from '@/components/effects/spotlight';
import { TextGenerateEffect } from '@/components/effects/text-generate-effect';
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MOTION, NICHE_TIMING, type NicheKey } from '@/lib/motion';

import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [...MOTION.ease] as [number, number, number, number];

interface HeroSectionProps {
    headline: string;
    subheadline: string;
    nicheKey: NicheKey;
    videoSrc?: string;
    posterSrc?: string;
}

export function HeroSection({ headline, subheadline, nicheKey, videoSrc, posterSrc }: HeroSectionProps) {
    const reducedMotion = useReducedMotion();
    const timing = NICHE_TIMING[nicheKey] ?? NICHE_TIMING.corporate;

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const spotlightEnabled = !reducedMotion && !isTouchDevice;
    const animationsEnabled = !reducedMotion;

    // Headline word count determines animation cascade timing
    const headlineWords = headline.split(' ').length;
    const headlineDuration = headlineWords * MOTION.stagger + timing.slow;
    const subDelay = headlineDuration + 0.1;
    const ctaDelay = subDelay + 0.4;

    return (
        <section className='bg-background relative min-h-screen overflow-hidden'>
            {/* Background video or poster */}
            {posterSrc && (
                <div className='absolute inset-0 z-0'>
                    {videoSrc ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={posterSrc}
                            className='h-full w-full object-cover opacity-30'>
                            <source src={videoSrc} type='video/mp4' />
                        </video>
                    ) : (
                        <img src={posterSrc} alt='' className='h-full w-full object-cover opacity-30' />
                    )}
                    <div className='from-background via-background/80 to-background/40 absolute inset-0 bg-gradient-to-t' />
                </div>
            )}

            {/* Subtle ambient gradient when no poster */}
            {!posterSrc && (
                <div className='absolute inset-0 z-0'>
                    <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_50%)]' />
                </div>
            )}

            <Spotlight enabled={spotlightEnabled} className='min-h-screen'>
                <div className='relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-24 md:px-8 md:py-32'>
                    <div className='mx-auto max-w-[var(--max-width-content)] text-center'>
                        {/* Headline */}
                        <h1 className='font-display text-hero text-foreground leading-[0.95] tracking-wide uppercase'>
                            {animationsEnabled && !isTouchDevice ? (
                                <TextGenerateEffect
                                    words={headline}
                                    duration={timing.slow}
                                    staggerDelay={MOTION.stagger}
                                />
                            ) : (
                                headline
                            )}
                        </h1>

                        {/* Subheadline */}
                        <motion.p
                            className='text-muted-foreground mx-auto mt-6 max-w-[var(--max-width-prose)] text-lg md:text-xl'
                            initial={animationsEnabled ? { opacity: 0, y: 20 } : undefined}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: animationsEnabled ? subDelay : 0,
                                duration: timing.normal,
                                ease: EASE
                            }}>
                            {subheadline}
                        </motion.p>

                        {/* CTA row */}
                        <motion.div
                            className='mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'
                            initial={animationsEnabled ? { opacity: 0, y: 20 } : undefined}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: animationsEnabled ? ctaDelay : 0,
                                duration: timing.normal,
                                ease: EASE
                            }}>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-lg font-semibold'
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                Get a Free Quote
                            </ShimmerButton>
                        </motion.div>

                        {/* Video dialog — shown when video is provided */}
                        {videoSrc && posterSrc && (
                            <motion.div
                                className='mx-auto mt-12 w-full max-w-3xl'
                                initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : undefined}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: animationsEnabled ? ctaDelay + 0.3 : 0,
                                    duration: timing.normal,
                                    ease: EASE
                                }}>
                                <HeroVideoDialog
                                    videoSrc={videoSrc}
                                    thumbnailSrc={posterSrc}
                                    thumbnailAlt='Watch our showreel'
                                    animationStyle='from-center'
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className='absolute bottom-8 left-1/2 -translate-x-1/2'
                        initial={animationsEnabled ? { opacity: 0 } : undefined}
                        animate={{
                            opacity: 0.6,
                            y: [0, 8, 0]
                        }}
                        transition={{
                            opacity: {
                                delay: animationsEnabled ? ctaDelay + 0.5 : 0,
                                duration: 0.5
                            },
                            y: {
                                repeat: Infinity,
                                duration: 1.5,
                                ease: 'easeInOut'
                            }
                        }}>
                        <ChevronDown className='text-muted-foreground h-8 w-8' />
                    </motion.div>
                </div>
            </Spotlight>
        </section>
    );
}
