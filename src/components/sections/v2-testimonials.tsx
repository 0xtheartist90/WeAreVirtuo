'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import type { Testimonial } from '@/content/types';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface V2TestimonialsProps {
    testimonials: Testimonial[];
}

export function V2Testimonials({ testimonials }: V2TestimonialsProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const touchRef = useRef<number | null>(null);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, [testimonials.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    }, [testimonials.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);

        return () => clearInterval(timer);
    }, [next]);

    // Touch swipe support
    const handleTouchStart = (e: React.TouchEvent) => {
        touchRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchRef.current === null) return;
        const diff = touchRef.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
        touchRef.current = null;
    };

    const t = testimonials[current];

    return (
        <div className='py-24 md:py-32'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Client Stories</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-16 text-4xl tracking-wide uppercase md:text-5xl'>
                        What Our Clients Say
                    </CharacterReveal>
                </div>

                {/* Testimonial with navigation */}
                <div className='mx-auto max-w-4xl' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div className='relative min-h-[280px] md:min-h-[320px]'>
                        {/* Left arrow */}
                        {testimonials.length > 1 && (
                            <button
                                type='button'
                                onClick={prev}
                                className='absolute top-1/2 -left-2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white md:-left-14 md:flex'
                                aria-label='Previous testimonial'>
                                <ChevronLeft className='h-5 w-5' />
                            </button>
                        )}

                        <AnimatePresence mode='wait' custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -30 }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                className='flex flex-col items-center text-center'>
                                {/* 5 stars */}
                                <div className='mb-8 flex gap-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className='fill-accent text-accent h-4 w-4' />
                                    ))}
                                </div>

                                {/* Quote — large, editorial, cinematic */}
                                <blockquote className='text-foreground font-display text-2xl leading-relaxed tracking-wide uppercase md:text-4xl lg:text-5xl'>
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                {/* Attribution */}
                                <div className='mt-10 flex flex-col items-center'>
                                    <div className='bg-accent/50 mb-4 h-px w-16' />
                                    <p className='text-foreground text-sm font-semibold tracking-wider uppercase'>
                                        {t.name}
                                    </p>
                                    <p className='mt-1 text-sm text-white/70'>
                                        {t.title}, <span className='text-accent font-medium'>{t.company}</span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Right arrow */}
                        {testimonials.length > 1 && (
                            <button
                                type='button'
                                onClick={next}
                                className='absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white md:-right-14 md:flex'
                                aria-label='Next testimonial'>
                                <ChevronRight className='h-5 w-5' />
                            </button>
                        )}
                    </div>

                    {/* Dots + mobile arrows */}
                    {testimonials.length > 1 && (
                        <div className='mt-12 flex items-center justify-center gap-4'>
                            <button
                                type='button'
                                onClick={prev}
                                className='flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:text-white md:hidden'
                                aria-label='Previous'>
                                <ChevronLeft className='h-4 w-4' />
                            </button>
                            <div className='flex gap-2'>
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type='button'
                                        onClick={() => {
                                            setDirection(idx > current ? 1 : -1);
                                            setCurrent(idx);
                                        }}
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                            idx === current ? 'bg-accent w-10' : 'w-2 bg-white/20'
                                        }`}
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                type='button'
                                onClick={next}
                                className='flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:text-white md:hidden'
                                aria-label='Next'>
                                <ChevronRight className='h-4 w-4' />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
