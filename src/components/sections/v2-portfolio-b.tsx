'use client';

import { useEffect, useRef, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import type { PortfolioItem } from '@/content/types';
import { MOTION } from '@/lib/motion';

import { Play, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/* ── Option B: Director's Reel — Scroll-Synced Showcase ── */

interface V2PortfolioBProps {
    items: PortfolioItem[];
}

export function V2PortfolioB({ items }: V2PortfolioBProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Intersection Observer — detect which card is centered
    useEffect(() => {
        const refs = cardRefs.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = refs.indexOf(entry.target as HTMLDivElement);
                        if (idx !== -1) setActiveIdx(idx);
                    }
                });
            },
            { rootMargin: '-35% 0px -35% 0px', threshold: 0.3 }
        );

        refs.forEach((ref) => ref && observer.observe(ref));

        return () => observer.disconnect();
    }, [items]);

    // Auto-play video when active item changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {});
        }
    }, [activeIdx]);

    const activeItem = items[activeIdx];

    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>
                        Option B — Director&apos;s Reel
                    </p>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        See It In Action
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Scroll through our work. Each project tells a story.
                    </p>
                </BlurFade>

                <div className='grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12'>
                    {/* Sticky video player */}
                    <div className='md:sticky md:top-[12vh] md:h-fit'>
                        <BlurFade delay={MOTION.stagger} inView inViewMargin={MOTION.viewport.margin}>
                            <div
                                className='group relative cursor-pointer overflow-hidden rounded-2xl'
                                onClick={() => setDialogOpen(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') setDialogOpen(true);
                                }}
                                role='button'
                                tabIndex={0}
                                aria-label={`Watch ${activeItem.title}`}>
                                <div className='aspect-video bg-black'>
                                    {activeItem.videoSrc ? (
                                        <video
                                            ref={videoRef}
                                            key={activeItem.slug}
                                            src={activeItem.videoSrc}
                                            muted
                                            loop
                                            playsInline
                                            autoPlay
                                            className='size-full object-cover'
                                        />
                                    ) : (
                                        <img
                                            src={activeItem.thumbnail}
                                            alt={activeItem.title}
                                            className='size-full object-cover'
                                        />
                                    )}
                                </div>

                                {/* Play overlay on hover */}
                                <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div className='flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm'>
                                        <Play className='ml-1 h-7 w-7 fill-white text-white' />
                                    </div>
                                </div>

                                <BorderBeam duration={8} colorFrom='#DC2626' colorTo='rgba(255,255,255,0.3)' />
                            </div>

                            {/* Active project info */}
                            <motion.div
                                key={activeItem.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className='mt-5'>
                                <span className='text-accent text-xs font-semibold tracking-widest uppercase'>
                                    {activeItem.industry}
                                </span>
                                <h3 className='text-foreground mt-1 text-xl font-semibold'>{activeItem.title}</h3>
                                <p className='text-muted-foreground text-sm'>{activeItem.client}</p>
                                <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                    {activeItem.description}
                                </p>
                            </motion.div>
                        </BlurFade>
                    </div>

                    {/* Scrollable project cards */}
                    <div className='space-y-4'>
                        {items.map((item, idx) => (
                            <BlurFade
                                key={item.slug}
                                delay={MOTION.stagger * (idx + 2)}
                                inView
                                inViewMargin={MOTION.viewport.margin}>
                                <div
                                    ref={(el) => {
                                        cardRefs.current[idx] = el;
                                    }}>
                                    <motion.div
                                        className={`relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-500 ${
                                            idx === activeIdx
                                                ? 'border-accent/30 bg-white/[0.04]'
                                                : 'border-white/[0.06] bg-white/[0.01] opacity-50'
                                        }`}
                                        onClick={() => setActiveIdx(idx)}
                                        whileHover={{ opacity: 1 }}>
                                        <div className='flex gap-4 p-4'>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className='h-20 w-28 shrink-0 rounded-lg object-cover'
                                            />
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                                                    {item.industry}
                                                </span>
                                                <h4 className='text-foreground mt-0.5 text-sm font-semibold'>
                                                    {item.title}
                                                </h4>
                                                <p className='text-muted-foreground text-xs'>{item.client}</p>
                                            </div>
                                        </div>
                                        {idx === activeIdx && (
                                            <BorderBeam
                                                duration={6}
                                                colorFrom='#DC2626'
                                                colorTo='rgba(255,255,255,0.2)'
                                            />
                                        )}
                                    </motion.div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video dialog */}
            <AnimatePresence>
                {dialogOpen && activeItem.videoSrc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md'
                        onClick={() => setDialogOpen(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setDialogOpen(false);
                        }}
                        role='button'
                        tabIndex={0}>
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className='relative mx-4 aspect-video w-full max-w-5xl'
                            onClick={(e) => e.stopPropagation()}>
                            <button
                                className='absolute -top-14 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20'
                                onClick={() => setDialogOpen(false)}
                                aria-label='Close'>
                                <XIcon className='h-5 w-5' />
                            </button>
                            <div className='size-full overflow-hidden rounded-2xl border border-white/20'>
                                <video src={activeItem.videoSrc} controls autoPlay className='size-full bg-black' />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
