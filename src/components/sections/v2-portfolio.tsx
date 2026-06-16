'use client';

import { useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';
import type { PortfolioItem } from '@/content/types';

import { AnimatePresence, motion } from 'motion/react';
import { Play, X } from 'lucide-react';

interface V2PortfolioProps {
    items: PortfolioItem[];
}

export function V2Portfolio({ items }: V2PortfolioProps) {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>
                        Selected Work
                    </p>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        See It In Action
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Real video. Real results. Click any project to watch.
                    </p>
                </BlurFade>

                {/* Large 2-column grid */}
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {items.map((item, idx) => (
                        <BlurFade
                            key={item.slug}
                            delay={MOTION.stagger * idx}
                            inView
                            inViewMargin={MOTION.viewport.margin}
                        >
                            <motion.div
                                className='group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card'
                                onMouseEnter={() => setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setSelectedItem(item)}
                                style={{
                                    filter:
                                        hovered !== null && hovered !== idx
                                            ? 'blur(4px) brightness(0.7)'
                                            : 'none',
                                    transform:
                                        hovered !== null && hovered !== idx ? 'scale(0.98)' : 'scale(1)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {/* Image */}
                                <div className='aspect-[4/3] overflow-hidden'>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                                    />
                                </div>

                                {/* Gradient overlay */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />

                                {/* Play button (if video) */}
                                {item.videoSrc && (
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 opacity-0 shadow-lg shadow-accent/30 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-110'>
                                            <Play className='ml-1 h-7 w-7 fill-white text-white' />
                                        </div>
                                    </div>
                                )}

                                {/* Content overlay at bottom */}
                                <div className='absolute bottom-0 left-0 right-0 p-6'>
                                    <span className='mb-1 inline-block text-xs font-medium tracking-widest text-accent uppercase'>
                                        {item.industry}
                                    </span>
                                    <h3 className='text-xl font-semibold text-white md:text-2xl'>{item.title}</h3>
                                    <p className='mt-1 text-sm text-white/60'>{item.client}</p>
                                </div>
                            </motion.div>
                        </BlurFade>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4'
                        onClick={() => setSelectedItem(null)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setSelectedItem(null);
                        }}
                        role='dialog'
                        aria-modal='true'
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className='relative w-full max-w-5xl'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type='button'
                                onClick={() => setSelectedItem(null)}
                                className='absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20'
                                aria-label='Close'
                            >
                                <X className='h-6 w-6' />
                            </button>

                            <div className='aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl'>
                                {selectedItem.videoSrc ? (
                                    <video
                                        src={selectedItem.videoSrc}
                                        controls
                                        autoPlay
                                        className='h-full w-full'
                                    />
                                ) : (
                                    <img
                                        src={selectedItem.thumbnail}
                                        alt={selectedItem.title}
                                        className='h-full w-full object-cover'
                                    />
                                )}
                            </div>

                            <div className='mt-4 flex items-start justify-between rounded-xl bg-card/80 p-5 backdrop-blur-sm'>
                                <div>
                                    <span className='text-xs font-medium tracking-widest text-accent uppercase'>
                                        {selectedItem.industry}
                                    </span>
                                    <h3 className='mt-1 text-lg font-semibold text-foreground'>
                                        {selectedItem.title}
                                    </h3>
                                    <p className='text-muted-foreground text-sm'>{selectedItem.client}</p>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
