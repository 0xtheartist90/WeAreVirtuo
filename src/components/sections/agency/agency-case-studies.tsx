'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { MatrixText } from '@/components/ui/matrix-text';
import type { PortfolioItem } from '@/content/types';

import { ArrowUpRight, Pause, Play, Plus, Volume2, VolumeX, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { createPortal } from 'react-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

// Two card heights: cards 1,4,5 use the taller ratio; cards 2,3,6 the shorter one.
const TALL = 'aspect-[2/3]';
const SHORT = 'aspect-[4/5]';
const ASPECT = [TALL, SHORT, SHORT, TALL, TALL, SHORT];

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

/* ─────────── Masonry case-study card ─────────── */

function CaseCard({ item, index, onOpen }: { item: PortfolioItem; index: number; onOpen: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const num = String(index + 1).padStart(2, '0');
    const aspect = ASPECT[index % ASPECT.length];

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
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.1 }}
            className='mb-4 break-inside-avoid md:mb-5'>
            <button
                type='button'
                onClick={onOpen}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                aria-label={`View ${item.title}`}
                className='group block w-full text-left'>
                <div className={`tile-border relative overflow-hidden ${aspect}`}>
                    {/* index */}
                    <span className='pointer-events-none absolute top-3 left-3 z-10 font-mono text-[11px] tracking-widest text-white/70 uppercase'>
                        [{num}]
                    </span>

                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hovering && item.videoSrc ? 'scale-[1.05] opacity-0' : 'scale-100 opacity-100 group-hover:scale-[1.03]'
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

                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20' />

                    {/* centered brand lockup */}
                    <span className='pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 border border-white/25 bg-black/30 px-3 py-1.5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105'>
                        <span className='bg-accent h-1.5 w-1.5 rounded-full' />
                        <span className='font-display text-sm tracking-wide text-white uppercase'>{item.client}</span>
                    </span>

                    {/* plus affordance */}
                    <span className='absolute right-3 bottom-3 grid h-7 w-7 place-items-center border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent'>
                        <Plus className='h-4 w-4' />
                    </span>
                </div>

                {/* caption */}
                <div className='mt-3 flex items-start justify-between gap-3'>
                    <div>
                        <h3 className='font-display group-hover:text-accent text-foreground text-lg tracking-wide uppercase transition-colors'>
                            {item.title}
                        </h3>
                        <p className='mt-0.5 font-mono text-[11px] tracking-widest text-white/45 uppercase'>
                            {item.industry}
                        </p>
                    </div>
                    <ArrowUpRight className='text-accent mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>
            </button>
        </motion.div>
    );
}

export function AgencyCaseStudies({
    items,
    heading = 'Featured Work',
    viewAllHref
}: {
    items: PortfolioItem[];
    heading?: string;
    viewAllHref?: string;
}) {
    const [active, setActive] = useState<PortfolioItem | null>(null);
    const reduced = useReducedMotion();

    return (
        <section className='relative overflow-hidden py-16 md:py-24'>
            {/* Smoke video blended into the section background */}
            <div className='pointer-events-none absolute inset-0 z-0'>
                {/* Boomerang loop (forward + reversed) → no visible reset */}
                <video
                    src='/smoke-loop.mp4'
                    autoPlay={!reduced}
                    muted
                    loop
                    playsInline
                    preload='auto'
                    className='h-full w-full object-cover opacity-40 mix-blend-screen'
                />
                {/* fade the smoke into the section at top & bottom for legibility */}
                <div className='from-background via-background/30 to-background absolute inset-0 bg-gradient-to-b' />
            </div>

            <div className='relative z-10 mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='mb-12 flex flex-col items-center text-center md:mb-16'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Portfolio</p>
                    <MatrixText
                        as='h2'
                        trigger='view'
                        className='font-display text-foreground text-5xl tracking-tight uppercase md:text-7xl'>
                        {heading}
                    </MatrixText>
                </div>

                {/* Masonry grid */}
                <div className='gap-4 md:columns-2 md:gap-5 lg:columns-3'>
                    {items.map((item, idx) => (
                        <CaseCard key={item.slug} item={item} index={idx} onOpen={() => setActive(item)} />
                    ))}
                </div>

                {/* Footer link */}
                {viewAllHref && (
                    <div className='mt-8 flex justify-end'>
                        <Link
                            href={viewAllHref}
                            className='group hover:text-accent flex items-center gap-2 font-mono text-[11px] font-semibold tracking-widest text-white/70 uppercase transition-colors'>
                            View Full Portfolio
                            <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </Link>
                    </div>
                )}
            </div>

            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>{active && <WorkPlayer item={active} onClose={() => setActive(null)} />}</AnimatePresence>,
                    document.body
                )}
        </section>
    );
}
