'use client';

import { useCallback, useRef, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { MagicCard } from '@/components/ui/magic-card';
import type { PortfolioItem } from '@/content/types';
import { MOTION } from '@/lib/motion';

import { Play, XIcon } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';

/* ── Parallax Video Card ── */

function ParallaxCard({ item }: { item: PortfolioItem }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setHovering(true);
        if (item.videoSrc) videoRef.current?.play().catch(() => {});
    }, [item.videoSrc]);

    const handleMouseLeave = useCallback(() => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    return (
        <>
            <MagicCard className='rounded-xl'>
                <div
                    className='group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setDialogOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setDialogOpen(true);
                    }}
                    role='button'
                    tabIndex={0}
                    aria-label={`Play ${item.title}`}>
                    {/* Thumbnail */}
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                            hovering && item.videoSrc ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                        }`}
                    />

                    {/* Video preview */}
                    {item.videoSrc && (
                        <video
                            ref={videoRef}
                            src={item.videoSrc}
                            muted
                            loop
                            playsInline
                            preload='none'
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                                hovering ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    )}

                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />

                    {/* Play button */}
                    {item.videoSrc && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <motion.div
                                className='border-accent/30 bg-accent/10 flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm'
                                animate={hovering ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 2, repeat: hovering ? Infinity : 0, ease: 'easeInOut' }}>
                                <Play className='ml-0.5 h-6 w-6 fill-white text-white' />
                            </motion.div>
                        </div>
                    )}

                    {/* Info */}
                    <div className='absolute right-0 bottom-0 left-0 p-5'>
                        <span className='text-accent text-xs font-semibold tracking-widest uppercase'>
                            {item.industry}
                        </span>
                        <h3 className='text-foreground mt-1 text-lg font-semibold'>{item.title}</h3>
                        <p className='text-muted-foreground text-sm'>{item.client}</p>
                    </div>

                    <div className='pointer-events-none absolute inset-0 rounded-xl border border-white/[0.08] transition-colors duration-500 group-hover:border-white/15' />
                </div>
            </MagicCard>

            {/* Dialog */}
            <AnimatePresence>
                {dialogOpen && (
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
                            className='relative mx-4 w-full max-w-5xl'
                            onClick={(e) => e.stopPropagation()}>
                            <button
                                className='absolute -top-14 right-0 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20'
                                onClick={() => setDialogOpen(false)}
                                aria-label='Close'>
                                <XIcon className='h-5 w-5' />
                            </button>
                            <div className='aspect-video overflow-hidden rounded-2xl border border-white/20 bg-black'>
                                {item.videoSrc ? (
                                    <video src={item.videoSrc} controls autoPlay className='size-full' />
                                ) : (
                                    <img src={item.thumbnail} alt={item.title} className='size-full object-cover' />
                                )}
                            </div>
                            <div className='bg-card/80 mt-4 rounded-xl p-5 backdrop-blur-sm'>
                                <span className='text-accent text-xs tracking-widest uppercase'>{item.industry}</span>
                                <h3 className='text-foreground mt-1 text-lg font-semibold'>{item.title}</h3>
                                <p className='text-muted-foreground text-sm'>{item.client}</p>
                                <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{item.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ── Option A: Parallax Film Wall ── */

interface V2PortfolioAProps {
    items: PortfolioItem[];
}

export function V2PortfolioA({ items }: V2PortfolioAProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    const col1 = items.filter((_, i) => i % 2 === 0);
    const col2 = items.filter((_, i) => i % 2 === 1);

    return (
        <section ref={sectionRef} className='bg-background overflow-hidden py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>
                        Option A — Parallax Film Wall
                    </p>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        See It In Action
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Real video. Real results. Hover to preview, click to watch.
                    </p>
                </BlurFade>

                {/* Parallax columns */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
                    <motion.div style={{ y: y1 }} className='space-y-4 md:space-y-6'>
                        {col1.map((item, idx) => (
                            <BlurFade
                                key={item.slug}
                                delay={MOTION.stagger * idx}
                                inView
                                inViewMargin={MOTION.viewport.margin}>
                                <ParallaxCard item={item} />
                            </BlurFade>
                        ))}
                    </motion.div>
                    <motion.div style={{ y: y2 }} className='mt-0 space-y-4 md:mt-20 md:space-y-6'>
                        {col2.map((item, idx) => (
                            <BlurFade
                                key={item.slug}
                                delay={MOTION.stagger * (idx + 1)}
                                inView
                                inViewMargin={MOTION.viewport.margin}>
                                <ParallaxCard item={item} />
                            </BlurFade>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
