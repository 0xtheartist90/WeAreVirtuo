'use client';

import { useState } from 'react';

import { FocusCards } from '@/components/effects/focus-cards';
import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';
import type { PortfolioItem } from '@/content/types';

import { AnimatePresence, motion } from 'motion/react';
import { Play, X } from 'lucide-react';

interface PortfolioSectionProps {
    items: PortfolioItem[];
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    const cards = items.map((item, idx) => ({
        title: item.title,
        subtitle: item.client,
        label: item.industry,
        src: item.thumbnail,
        dataIndex: idx,
    }));

    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        Our Work
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Real results for real businesses. Click to see each project in action.
                    </p>
                </BlurFade>

                <BlurFade delay={0.1} inView inViewMargin={MOTION.viewport.margin}>
                    <FocusCards
                        cards={cards}
                        onCardClick={(idx) => setSelectedItem(items[idx])}
                    />
                </BlurFade>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4'
                        onClick={() => setSelectedItem(null)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setSelectedItem(null);
                        }}
                        role='dialog'
                        aria-modal='true'
                        aria-label={`${selectedItem.title} by ${selectedItem.client}`}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className='relative w-full max-w-4xl'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type='button'
                                onClick={() => setSelectedItem(null)}
                                className='absolute -top-12 right-0 rounded-full bg-card/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-card'
                                aria-label='Close lightbox'
                            >
                                <X className='h-5 w-5' />
                            </button>

                            {/* Video or Image */}
                            <div className='aspect-video overflow-hidden rounded-2xl border-2 border-border bg-black'>
                                {selectedItem.videoSrc ? (
                                    <video
                                        src={selectedItem.videoSrc}
                                        controls
                                        autoPlay
                                        className='h-full w-full rounded-2xl'
                                    />
                                ) : (
                                    <img
                                        src={selectedItem.thumbnail}
                                        alt={selectedItem.title}
                                        className='h-full w-full object-cover'
                                    />
                                )}
                            </div>

                            {/* Project details */}
                            <div className='mt-4 rounded-xl bg-card/80 p-6 backdrop-blur-sm'>
                                <div className='flex items-start justify-between'>
                                    <div>
                                        <span className='text-xs font-medium tracking-widest text-accent uppercase'>
                                            {selectedItem.industry}
                                        </span>
                                        <h3 className='mt-1 text-xl font-semibold text-foreground'>
                                            {selectedItem.title}
                                        </h3>
                                        <p className='text-muted-foreground text-sm'>{selectedItem.client}</p>
                                    </div>
                                    {selectedItem.videoSrc && (
                                        <div className='flex items-center gap-1.5 text-accent'>
                                            <Play className='h-4 w-4' />
                                            <span className='text-sm font-medium'>Video</span>
                                        </div>
                                    )}
                                </div>
                                <p className='text-muted-foreground mt-3 leading-relaxed'>
                                    {selectedItem.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
