'use client';

import { useCallback, useEffect, useState } from 'react';

import { FocusCards } from '@/components/effects/focus-cards';
import { CharacterReveal } from '@/components/ui/character-reveal';
import type { BTSItem } from '@/content/types';

import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface AboutBTSProps {
    items: BTSItem[];
}

export function AboutBTS({ items }: AboutBTSProps) {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    const handleCardClick = useCallback((idx: number) => {
        setLightboxIdx(idx);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIdx(null);
    }, []);

    const navigate = useCallback(
        (dir: 'prev' | 'next') => {
            if (lightboxIdx === null) return;
            const newIdx = dir === 'prev' ? Math.max(0, lightboxIdx - 1) : Math.min(items.length - 1, lightboxIdx + 1);
            setLightboxIdx(newIdx);
        },
        [lightboxIdx, items.length]
    );

    // Keyboard controls
    useEffect(() => {
        if (lightboxIdx === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigate('next');
            if (e.key === 'ArrowLeft') navigate('prev');
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [lightboxIdx, closeLightbox, navigate]);

    const focusCards = items.map((item, idx) => ({
        title: item.title,
        subtitle: item.subtitle,
        label: item.label,
        src: item.src,
        dataIndex: idx
    }));

    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Behind the Scenes</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-3xl tracking-wide uppercase md:text-6xl'>
                        Where the Magic Happens
                    </CharacterReveal>
                    <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80 md:mx-0'>
                        A look inside our productions. Real sets, real gear, real craft.
                    </p>
                </div>

                {/* Focus Cards Gallery */}
                <div className='mt-12'>
                    <FocusCards cards={focusCards} onCardClick={handleCardClick} />
                </div>
            </div>

            {/* Cinematic Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && items[lightboxIdx] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-[100] overflow-hidden'
                        onClick={closeLightbox}>
                        {/* Blurred backdrop */}
                        <div className='absolute inset-0'>
                            <img
                                src={items[lightboxIdx].src}
                                alt=''
                                className='h-full w-full scale-110 object-cover blur-3xl'
                                aria-hidden='true'
                            />
                            <div className='absolute inset-0 bg-black/75' />
                        </div>

                        {/* Ambient glow */}
                        <div
                            className='pointer-events-none absolute inset-0'
                            style={{
                                background:
                                    'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                            }}
                        />

                        {/* Main content */}
                        <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
                            {/* Prev nav */}
                            {lightboxIdx > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('prev');
                                    }}
                                    className='group mr-4 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 md:flex'
                                    aria-label='Previous'>
                                    <ChevronLeft className='h-5 w-5 text-white/60 group-hover:text-white' />
                                </button>
                            )}

                            <motion.div
                                key={lightboxIdx}
                                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className='relative max-w-5xl'
                                onClick={(e) => e.stopPropagation()}>
                                {/* Close button */}
                                <button
                                    className='absolute -top-12 right-0 z-20 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
                                    onClick={closeLightbox}
                                    aria-label='Close'>
                                    <span className='hidden text-xs md:inline'>ESC</span>
                                    <XIcon className='h-4 w-4' />
                                </button>

                                {/* Counter badge */}
                                <div className='absolute -top-12 left-0 flex items-center gap-3'>
                                    <span className='font-mono text-xs text-white/40'>
                                        <span className='text-accent font-semibold'>
                                            {String(lightboxIdx + 1).padStart(2, '0')}
                                        </span>
                                        {' / '}
                                        {String(items.length).padStart(2, '0')}
                                    </span>
                                    {items[lightboxIdx].label && (
                                        <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                                            {items[lightboxIdx].label}
                                        </span>
                                    )}
                                </div>

                                {/* Image */}
                                <div className='relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50'>
                                    <img
                                        src={items[lightboxIdx].src}
                                        alt={items[lightboxIdx].title}
                                        className='max-h-[75vh] w-full object-contain'
                                    />
                                    <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
                                        <h3 className='text-foreground text-lg font-semibold'>
                                            {items[lightboxIdx].title}
                                        </h3>
                                        {items[lightboxIdx].subtitle && (
                                            <p className='mt-1 text-sm text-white/70'>{items[lightboxIdx].subtitle}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Next nav */}
                            {lightboxIdx < items.length - 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('next');
                                    }}
                                    className='group ml-4 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 md:flex'
                                    aria-label='Next'>
                                    <ChevronRight className='h-5 w-5 text-white/60 group-hover:text-white' />
                                </button>
                            )}
                        </div>

                        {/* Mobile nav */}
                        <div className='absolute right-0 bottom-8 left-0 flex justify-center gap-6 md:hidden'>
                            {lightboxIdx > 0 && (
                                <button
                                    onClick={() => navigate('prev')}
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50'>
                                    <ChevronLeft className='h-4 w-4' />
                                </button>
                            )}
                            {lightboxIdx < items.length - 1 && (
                                <button
                                    onClick={() => navigate('next')}
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50'>
                                    <ChevronRight className='h-4 w-4' />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
