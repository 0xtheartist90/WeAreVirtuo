'use client';

import { useCallback, useEffect, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';
import type { Testimonial } from '@/content/types';

import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(
        () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1)),
        [testimonials.length]
    );
    const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

    // Auto-rotate every 6 seconds
    useEffect(() => {
        const timer = setInterval(next, 6000);

        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[current];

    return (
        <section className='relative overflow-hidden py-16 md:py-24'>
            {/* Subtle background */}
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]' />

            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <h2 className='font-display text-foreground mb-16 text-center text-4xl tracking-wide uppercase md:text-5xl'>
                        What Our Clients Say
                    </h2>
                </BlurFade>

                <div className='mx-auto max-w-4xl'>
                    <div className='relative min-h-[280px]'>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className='flex flex-col items-center text-center'
                            >
                                {/* Avatar placeholder */}
                                <div className='mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent/30 bg-card'>
                                    <Quote className='h-8 w-8 text-accent/50' />
                                </div>

                                <blockquote className='text-foreground mb-8 text-2xl leading-relaxed font-light md:text-3xl'>
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                <div className='flex flex-col items-center'>
                                    <p className='text-foreground text-lg font-semibold'>{t.name}</p>
                                    <p className='text-muted-foreground'>
                                        {t.title}, <span className='text-accent'>{t.company}</span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {testimonials.length > 1 && (
                        <div className='mt-12 flex items-center justify-center gap-6'>
                            <button
                                type='button'
                                onClick={prev}
                                className='border-border bg-card/50 hover:border-accent/30 rounded-full border p-3 transition-all'
                                aria-label='Previous testimonial'
                            >
                                <ChevronLeft className='text-muted-foreground h-5 w-5' />
                            </button>
                            <div className='flex gap-2'>
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type='button'
                                        onClick={() => setCurrent(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            idx === current ? 'bg-accent w-8' : 'bg-border w-2'
                                        }`}
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                type='button'
                                onClick={next}
                                className='border-border bg-card/50 hover:border-accent/30 rounded-full border p-3 transition-all'
                                aria-label='Next testimonial'
                            >
                                <ChevronRight className='text-muted-foreground h-5 w-5' />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
