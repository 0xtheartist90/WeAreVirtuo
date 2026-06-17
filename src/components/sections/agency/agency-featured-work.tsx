'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import type { PortfolioItem } from '@/content/types';

import { ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';

/* Derive short category chips from the item's industry label. */
function chipsFor(item: PortfolioItem): string[] {
    return item.industry
        .split(/[&,/]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);
}

/* ─────────── Inline player (no external redirect) ─────────── */

function WorkPlayer({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play().catch(() => {});
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 overflow-hidden'
            onClick={onClose}>
            <div className='absolute inset-0'>
                <img src={item.thumbnail} alt='' aria-hidden='true' className='h-full w-full scale-110 object-cover blur-3xl' />
                <div className='absolute inset-0 bg-black/80' />
            </div>
            <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className='relative w-full max-w-5xl'
                    onClick={(e) => e.stopPropagation()}>
                    <button
                        className='absolute -top-12 right-0 z-20 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
                        onClick={onClose}
                        aria-label='Close'>
                        <span className='hidden text-xs md:inline'>ESC</span>
                        <X className='h-4 w-4' />
                    </button>
                    <div className='relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl'>
                        {item.videoSrc ? (
                            <video
                                ref={videoRef}
                                src={item.videoSrc}
                                autoPlay
                                loop
                                playsInline
                                className='size-full cursor-pointer object-cover'
                                onClick={togglePlay}
                            />
                        ) : (
                            <img src={item.thumbnail} alt={item.title} className='size-full object-cover' />
                        )}
                        {item.videoSrc && (
                            <div className='absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pt-12 pb-4'>
                                <button onClick={togglePlay} className='rounded-full p-2 text-white hover:bg-white/10' aria-label={playing ? 'Pause' : 'Play'}>
                                    {playing ? <Pause className='h-5 w-5 fill-white' /> : <Play className='ml-0.5 h-5 w-5 fill-white' />}
                                </button>
                                <button onClick={toggleMute} className='rounded-full p-2 text-white hover:bg-white/10' aria-label={muted ? 'Unmute' : 'Mute'}>
                                    {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='mt-4'>
                        <h3 className='text-foreground text-lg font-semibold'>{item.title}</h3>
                        <p className='text-muted-foreground mt-1 text-sm'>{item.client}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─────────── Sticky-stacking work row ─────────── */

function WorkRow({ item, index, onOpen }: { item: PortfolioItem; index: number; onOpen: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const num = String(index + 1).padStart(2, '0');

    const onEnter = useCallback(() => {
        setHovering(true);
        videoRef.current?.play().catch(() => {});
    }, []);
    const onLeave = useCallback(() => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    return (
        <div className='lg:sticky lg:top-24' style={{ zIndex: index + 1 }}>
            <div className='bg-background grid-layout border-t border-white/15 !px-0 py-4'>
                {/* Media */}
                <button
                    type='button'
                    onClick={onOpen}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    className='tile-border group relative col-span-full block aspect-video overflow-hidden lg:col-span-7'
                    aria-label={`Watch ${item.title}`}>
                    <span className='pointer-events-none absolute top-3 left-4 z-10 font-mono text-5xl font-bold text-white/[0.07] md:text-7xl'>
                        {num}
                    </span>
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hovering && item.videoSrc ? 'scale-[1.07] opacity-0' : 'scale-100 opacity-100'
                        }`}
                    />
                    {item.videoSrc && (
                        <video
                            ref={videoRef}
                            src={item.videoSrc}
                            muted
                            loop
                            playsInline
                            preload='none'
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
                    <div className='border-accent/30 bg-accent/10 absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-transform group-hover:scale-110'>
                        <Play className='ml-0.5 h-6 w-6 fill-white text-white' />
                    </div>
                </button>

                {/* Copy */}
                <div className='col-span-full mt-4 flex flex-col gap-3 lg:col-span-3 lg:mt-0 lg:pr-4'>
                    <button type='button' onClick={onOpen} className='text-left'>
                        <span className='font-display text-foreground hover:text-accent text-2xl tracking-wide uppercase transition-colors lg:text-3xl'>
                            {item.title}
                        </span>
                    </button>
                    <p className='text-sm leading-relaxed text-white/70'>{item.description}</p>
                    <div className='mt-auto flex flex-wrap gap-1.5'>
                        {chipsFor(item).map((chip) => (
                            <span key={chip} className='bg-secondary text-foreground px-1.5 py-0.5 text-xs'>
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Arrow link */}
                <button
                    type='button'
                    onClick={onOpen}
                    className='group text-foreground col-span-2 col-start-11 hidden h-max items-center justify-end gap-2 self-start text-right lg:flex'
                    aria-label={`Watch ${item.title}`}>
                    <span className='font-display translate-x-4 text-2xl tracking-wide uppercase transition-transform duration-200 group-hover:translate-x-0'>
                        {item.client}
                    </span>
                    <ArrowUpRight className='text-accent h-6 w-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
                </button>
            </div>
        </div>
    );
}

export function AgencyFeaturedWork({
    items,
    heading = 'Featured Work',
    viewAllHref
}: {
    items: PortfolioItem[];
    heading?: string;
    viewAllHref?: string;
}) {
    const [active, setActive] = useState<PortfolioItem | null>(null);

    return (
        <section className='relative py-16 md:py-24'>
            <div className='grid-layout'>
                <div className='bg-background col-span-full flex items-end justify-between lg:sticky lg:top-20 lg:z-[1]'>
                    <div>
                        <p className='text-accent mb-2 text-sm font-medium tracking-widest uppercase'>Selected Work</p>
                        <h2 className='font-display text-foreground pb-6 text-4xl tracking-wide uppercase md:text-6xl'>
                            {heading}
                        </h2>
                    </div>
                    {viewAllHref && (
                        <Link
                            href={viewAllHref}
                            className='group hover:text-accent mb-7 hidden items-center gap-2 text-sm font-semibold tracking-widest text-white/70 uppercase transition-colors md:flex'>
                            All Work
                            <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </Link>
                    )}
                </div>
            </div>

            <div>
                {items.map((item, idx) => (
                    <WorkRow key={item.slug} item={item} index={idx} onOpen={() => setActive(item)} />
                ))}
            </div>

            {viewAllHref && (
                <div className='grid-layout mt-10'>
                    <Link
                        href={viewAllHref}
                        className='group bg-accent hover:bg-accent/90 col-span-full inline-flex w-fit items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors md:hidden'>
                        View All Work
                        <ArrowUpRight className='h-4 w-4' />
                    </Link>
                </div>
            )}

            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>{active && <WorkPlayer item={active} onClose={() => setActive(null)} />}</AnimatePresence>,
                    document.body
                )}
        </section>
    );
}
