'use client';

import { useCallback, useEffect, useState } from 'react';

import { MatrixText } from '@/components/ui/matrix-text';
import { agencyTestimonials } from '@/content/agency';

import { ArrowLeft, ArrowUpRight, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

export function AgencyTestimonials() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = agencyTestimonials.length;

    const go = useCallback((dir: number) => setActive((prev) => (prev + dir + total) % total), [total]);

    // Auto-advance (pauses on hover / focus)
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => setActive((prev) => (prev + 1) % total), AUTOPLAY_MS);

        return () => clearInterval(id);
    }, [paused, total, active]);

    const t = agencyTestimonials[active];

    return (
        <section className='relative overflow-hidden bg-white py-20 text-neutral-900 md:py-28'>
            <div className='with-diagonal-lines-dark pointer-events-none absolute inset-0 opacity-40' />
            {/* Oversized ghost index */}
            <span
                aria-hidden='true'
                className='font-display pointer-events-none absolute -top-6 right-2 z-0 text-[26vw] leading-none text-neutral-900/[0.04] tabular-nums select-none md:right-10'>
                {String(active + 1).padStart(2, '0')}
            </span>

            <div className='grid-layout relative z-[1]'>
                {/* Header */}
                <div className='col-span-full mb-10 flex items-end justify-between border-b border-neutral-300 pb-4 lg:col-start-2 lg:col-end-12'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>[ Testimonials ]</p>
                        <MatrixText
                            as='h2'
                            trigger='view'
                            className='font-display block text-4xl tracking-tight text-neutral-900 uppercase md:text-6xl'>
                            In Their Words
                        </MatrixText>
                    </div>
                    <span className='font-mono text-[11px] tracking-widest text-neutral-400 tabular-nums'>
                        ({String(total).padStart(2, '0')})
                    </span>
                </div>

                {/* Body: featured quote + client selector */}
                <div
                    className='col-span-full grid grid-cols-1 gap-10 lg:col-start-2 lg:col-end-12 lg:grid-cols-[1fr_320px] lg:gap-16'
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={() => setPaused(false)}>
                    {/* ── Featured quote ── */}
                    <div className='relative flex min-h-[340px] flex-col md:min-h-[300px]'>
                        <Quote className='text-accent h-10 w-10 shrink-0' strokeWidth={1.25} />

                        <motion.blockquote
                            key={active}
                            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
                            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className='mt-6 flex-1 text-2xl leading-snug font-light tracking-tight text-neutral-900 md:text-4xl md:leading-[1.15]'>
                            {t.quote}
                        </motion.blockquote>

                        {/* Author */}
                        <div className='mt-8 flex items-center gap-4 border-t border-neutral-200 pt-6'>
                            <motion.img
                                key={t.image}
                                src={t.image}
                                alt={t.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className='h-14 w-14 shrink-0 rounded-none object-cover grayscale'
                            />
                            <div className='min-w-0'>
                                <p className='tech-title font-display text-xl tracking-wide text-neutral-900 uppercase'>
                                    <MatrixText key={`n${active}`} as='span' trigger='mount'>
                                        {t.name}
                                    </MatrixText>
                                </p>
                                <p className='mt-0.5 font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>
                                    {t.title} · <span className='text-accent'>{t.company}</span>
                                </p>
                            </div>
                            <span className='ml-auto hidden shrink-0 border border-neutral-300 px-3 py-1.5 font-mono text-[10px] tracking-widest text-neutral-500 uppercase sm:block'>
                                {t.tag}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className='mt-8 flex items-center gap-4'>
                            <button
                                type='button'
                                onClick={() => go(-1)}
                                aria-label='Previous testimonial'
                                className='hover:border-accent hover:text-accent grid h-11 w-11 place-items-center border border-neutral-300 text-neutral-900 transition-colors duration-300'>
                                <ArrowLeft className='h-4 w-4' />
                            </button>
                            <button
                                type='button'
                                onClick={() => go(1)}
                                aria-label='Next testimonial'
                                className='hover:border-accent hover:text-accent grid h-11 w-11 place-items-center border border-neutral-300 text-neutral-900 transition-colors duration-300'>
                                <ArrowUpRight className='h-4 w-4 rotate-45' />
                            </button>
                            <span className='ml-2 font-mono text-[11px] tracking-widest text-neutral-400 tabular-nums'>
                                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    {/* ── Client selector ── */}
                    <div className='border-t border-neutral-300 lg:border-t-0 lg:border-l lg:pl-10'>
                        <p className='mb-2 font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>Clients</p>
                        {agencyTestimonials.map((c, idx) => {
                            const isActive = active === idx;

                            return (
                                <button
                                    key={c.name}
                                    type='button'
                                    onClick={() => setActive(idx)}
                                    className='group relative flex w-full items-center gap-4 border-b border-neutral-200 py-4 text-left'>
                                    {/* active accent bar */}
                                    <motion.span
                                        aria-hidden='true'
                                        className='bg-accent absolute top-0 left-0 h-full w-0.5 origin-top'
                                        initial={false}
                                        animate={{ scaleY: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.35, ease: EASE }}
                                    />
                                    <img
                                        src={c.image}
                                        alt=''
                                        aria-hidden='true'
                                        className={`h-10 w-10 shrink-0 object-cover grayscale transition-all duration-300 ${isActive ? 'opacity-100 grayscale-0' : 'opacity-50 group-hover:opacity-80'}`}
                                    />
                                    <span className='min-w-0 flex-1'>
                                        <span
                                            className={`font-display block truncate text-base tracking-wide uppercase transition-colors duration-300 ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-700'}`}>
                                            {c.name}
                                        </span>
                                        <span className='block truncate font-mono text-[10px] tracking-widest text-neutral-400 uppercase'>
                                            {c.company}
                                        </span>
                                    </span>
                                    <span
                                        className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${isActive ? 'text-accent' : 'text-neutral-300'}`}>
                                        /{String(idx + 1).padStart(2, '0')}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
