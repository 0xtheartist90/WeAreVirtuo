'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import type { ReelItem } from '@/content/types';
import { MOTION } from '@/lib/motion';

import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    Pause,
    Phone,
    Play,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    XIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/* ─────────── Category labels ─────────── */

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'restaurant', label: 'Restaurant' },
    { key: 'nightlife', label: 'Nightlife' },
    { key: 'events', label: 'Events' },
    { key: 'hospitality', label: 'Hospitality' }
] as const;

/* ─────────── YouTube thumbnail helper ─────────── */

function ytThumb(videoId: string) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/* ─────────── Phone Frame ─────────── */

function PhoneFrame({ reel, isActive, onClick }: { reel: ReelItem; isActive: boolean; onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const shouldPlay = isActive || hovering;

    // Play when active or hovered
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (shouldPlay) {
            v.play().catch(() => {});
        } else {
            v.pause();
            v.currentTime = 0;
        }
    }, [shouldPlay]);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className='group relative flex shrink-0 flex-col items-center gap-3 focus:outline-none'
            aria-label={`Watch ${reel.name}`}>
            {/* Phone body */}
            <div className='relative w-[200px] overflow-hidden rounded-[2rem] border-[3px] border-white/[0.12] bg-black shadow-2xl shadow-black/60 transition-all duration-500 group-hover:border-white/20 md:w-[240px]'>
                {/* Notch */}
                <div className='absolute top-2 left-1/2 z-20 h-[18px] w-[60px] -translate-x-1/2 rounded-full bg-black' />
                <div className='absolute top-2 left-1/2 z-30 h-[6px] w-[6px] -translate-x-1/2 translate-y-[6px] rounded-full bg-white/10' />

                {/* Video area — 9:16 */}
                <div className='aspect-[9/16] overflow-hidden'>
                    <video
                        ref={videoRef}
                        src={reel.source}
                        muted
                        loop
                        playsInline
                        preload='metadata'
                        className='h-full w-full object-cover'
                    />

                    {/* Play overlay when not playing */}
                    {!shouldPlay && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/10'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform group-hover:scale-110'>
                                <Play className='ml-0.5 h-5 w-5 fill-white text-white' />
                            </div>
                        </div>
                    )}

                    {/* Active glow ring */}
                    {isActive && (
                        <motion.div
                            className='pointer-events-none absolute inset-0 rounded-[calc(2rem-3px)] ring-2 ring-red-500/40'
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    )}
                </div>

                {/* Home bar */}
                <div className='absolute bottom-2 left-1/2 z-20 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-white/20' />
            </div>

            {/* Label */}
            <span className='text-muted-foreground group-hover:text-foreground max-w-[200px] truncate text-xs font-medium tracking-wide transition-colors md:max-w-[240px]'>
                {reel.name}
            </span>
        </button>
    );
}

/* ─────────── Cinematic Reel Viewer (matches Portfolio CinematicPlayer) ─────────── */

function formatTime(t: number) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);

    return `${m}:${String(s).padStart(2, '0')}`;
}

function ReelViewer({
    reel,
    reels,
    onClose,
    onNavigate
}: {
    reel: ReelItem;
    reels: ReelItem[];
    onClose: () => void;
    onNavigate: (reel: ReelItem) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const controlsTimer = useRef<ReturnType<typeof setTimeout>>(null);

    const currentIdx = reels.findIndex((r) => r.id === reel.id);
    const prevReel = currentIdx > 0 ? reels[currentIdx - 1] : null;
    const nextReel = currentIdx < reels.length - 1 ? reels[currentIdx + 1] : null;

    // Auto-hide controls after 3s
    const resetControlsTimer = useCallback(() => {
        setShowControls(true);
        if (controlsTimer.current) clearTimeout(controlsTimer.current);
        controlsTimer.current = setTimeout(() => {
            if (playing) setShowControls(false);
        }, 3000);
    }, [playing]);

    useEffect(() => {
        resetControlsTimer();
        document.body.style.overflow = 'hidden';

        return () => {
            if (controlsTimer.current) clearTimeout(controlsTimer.current);
            document.body.style.overflow = '';
        };
    }, [resetControlsTimer]);

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
            if (e.key === 'm') toggleMute();
            if (e.key === 'f') toggleFullscreen();
            if (e.key === 'ArrowRight' && !e.shiftKey && videoRef.current) {
                videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
            }
            if (e.key === 'ArrowLeft' && !e.shiftKey && videoRef.current) {
                videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
            }
            if (e.key === 'ArrowRight' && e.shiftKey && nextReel) onNavigate(nextReel);
            if (e.key === 'ArrowLeft' && e.shiftKey && prevReel) onNavigate(prevReel);
        };

        window.addEventListener('keydown', handleKey);

        return () => window.removeEventListener('keydown', handleKey);
    });

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

    const toggleFullscreen = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen?.().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.().catch(() => {});
            setIsFullscreen(false);
        }
    }, []);

    const handleProgressClick = useCallback(
        (e: React.MouseEvent) => {
            const bar = progressRef.current;
            const v = videoRef.current;
            if (!bar || !v) return;
            const rect = bar.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            v.currentTime = pct * duration;
        },
        [duration]
    );

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] overflow-hidden'
            onClick={onClose}>
            {/* Blurred backdrop */}
            <div className='absolute inset-0 bg-black/90 backdrop-blur-xl' />

            {/* Ambient glow */}
            <div
                className='pointer-events-none absolute inset-0'
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                }}
            />

            {/* Main content */}
            <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
                {/* Prev nav — desktop */}
                {prevReel && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(prevReel);
                        }}
                        className='group mr-4 hidden shrink-0 flex-col items-center gap-2 md:flex'
                        aria-label={`Previous: ${prevReel.name}`}>
                        <div className='group-hover:border-accent/30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:bg-white/10'>
                            <SkipBack className='h-5 w-5 text-white/60 group-hover:text-white' />
                        </div>
                        <span className='max-w-[80px] truncate text-[10px] text-white/40 group-hover:text-white/60'>
                            {prevReel.name}
                        </span>
                    </motion.button>
                )}

                <motion.div
                    ref={containerRef}
                    key={reel.id}
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className='relative w-full max-w-sm'
                    onClick={(e) => e.stopPropagation()}
                    onMouseMove={resetControlsTimer}>
                    {/* Close button */}
                    <button
                        className='absolute -top-12 right-0 z-20 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
                        onClick={onClose}
                        aria-label='Close'>
                        <span className='hidden text-xs md:inline'>ESC</span>
                        <XIcon className='h-4 w-4' />
                    </button>

                    {/* Counter badge */}
                    <div className='absolute -top-12 left-0 flex items-center gap-3'>
                        <span className='font-mono text-xs text-white/40'>
                            <span className='text-accent font-semibold'>{String(currentIdx + 1).padStart(2, '0')}</span>
                            {' / '}
                            {String(reels.length).padStart(2, '0')}
                        </span>
                        <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                            {reel.category}
                        </span>
                    </div>

                    {/* Video container — 9:16 */}
                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50'>
                        <div className='aspect-[9/16]'>
                            <video
                                ref={videoRef}
                                src={reel.source}
                                autoPlay
                                loop
                                playsInline
                                className='size-full cursor-pointer object-cover'
                                onClick={togglePlay}
                                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                            />
                        </div>

                        {/* Center play overlay */}
                        <AnimatePresence>
                            {!playing && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20'
                                    onClick={togglePlay}>
                                    <div className='flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md'>
                                        <Play className='ml-1 h-9 w-9 fill-white text-white' />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Controls overlay */}
                        <motion.div
                            className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pt-16 pb-4'
                            initial={false}
                            animate={{ opacity: showControls ? 1 : 0 }}
                            transition={{ duration: 0.3 }}>
                            {/* Progress bar */}
                            <div
                                ref={progressRef}
                                className='group mb-3 h-1 cursor-pointer rounded-full bg-white/20 transition-all hover:h-1.5'
                                onClick={handleProgressClick}>
                                <div className='relative h-full overflow-hidden rounded-full'>
                                    <div
                                        className='bg-accent absolute inset-y-0 left-0 rounded-full'
                                        style={{ width: `${progress}%` }}
                                    />
                                    <div
                                        className='bg-accent absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full opacity-0 shadow-lg group-hover:opacity-100'
                                        style={{
                                            left: `${progress}%`,
                                            transform: `translateX(-50%) translateY(-50%)`
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Controls row */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={togglePlay}
                                        className='rounded-full p-2 text-white transition-colors hover:bg-white/10'
                                        aria-label={playing ? 'Pause' : 'Play'}>
                                        {playing ? (
                                            <Pause className='h-5 w-5 fill-white' />
                                        ) : (
                                            <Play className='ml-0.5 h-5 w-5 fill-white' />
                                        )}
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className='rounded-full p-2 text-white transition-colors hover:bg-white/10'
                                        aria-label={muted ? 'Unmute' : 'Mute'}>
                                        {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                                    </button>
                                    <span className='ml-1 font-mono text-xs text-white/60 tabular-nums'>
                                        {formatTime(currentTime)}
                                        <span className='text-white/30'> / {formatTime(duration)}</span>
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/50 backdrop-blur-sm md:inline-block'>
                                        {reel.name}
                                    </span>
                                    <button
                                        onClick={toggleFullscreen}
                                        className='rounded-full p-2 text-white transition-colors hover:bg-white/10'
                                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                                        {isFullscreen ? (
                                            <Minimize2 className='h-4 w-4' />
                                        ) : (
                                            <Maximize2 className='h-4 w-4' />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Info + CTA below player */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mt-4 grid grid-cols-[1fr_auto] gap-3'>
                        <div className='flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-sm'>
                            <div>
                                <h3 className='text-foreground text-sm font-semibold'>{reel.name}</h3>
                                <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                                    {reel.category}
                                </span>
                            </div>
                            {reel.instagramUrl && (
                                <a
                                    href={reel.instagramUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-accent/70 hover:text-accent ml-auto text-xs underline underline-offset-2 transition-colors'>
                                    Instagram
                                </a>
                            )}
                        </div>
                        <a
                            href='tel:6479530222'
                            className='bg-accent hover:bg-accent/90 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors'>
                            <Phone className='h-3.5 w-3.5' />
                            Call
                        </a>
                    </motion.div>

                    {/* Mobile prev/next */}
                    <div className='mt-4 flex justify-center gap-4 md:hidden'>
                        {prevReel && (
                            <button
                                onClick={() => onNavigate(prevReel)}
                                className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50'
                                aria-label='Previous'>
                                <ChevronLeft className='h-4 w-4' />
                            </button>
                        )}
                        {nextReel && (
                            <button
                                onClick={() => onNavigate(nextReel)}
                                className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50'
                                aria-label='Next'>
                                <ChevronRight className='h-4 w-4' />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Next nav — desktop */}
                {nextReel && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(nextReel);
                        }}
                        className='group ml-4 hidden shrink-0 flex-col items-center gap-2 md:flex'
                        aria-label={`Next: ${nextReel.name}`}>
                        <div className='group-hover:border-accent/30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:bg-white/10'>
                            <SkipForward className='h-5 w-5 text-white/60 group-hover:text-white' />
                        </div>
                        <span className='max-w-[80px] truncate text-[10px] text-white/40 group-hover:text-white/60'>
                            {nextReel.name}
                        </span>
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────── Main Reels Showcase Section ─────────── */

const DRAG_THRESHOLD = 8;

interface V2ReelsShowcaseProps {
    reels: ReelItem[];
}

export function V2ReelsShowcase({ reels }: V2ReelsShowcaseProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeIdx, setActiveIdx] = useState(0);
    const [viewerReel, setViewerReel] = useState<ReelItem | null>(null);
    const dragRef = useRef({ startX: 0, scrollLeft: 0, dragging: false, hasDragged: false });

    const filtered = activeCategory === 'all' ? reels : reels.filter((r) => r.category === activeCategory);

    // Reset active index when category changes
    useEffect(() => {
        setActiveIdx(0);
        if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, [activeCategory]);

    // ── Scroll-driven active detection ──
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let rafId: number;
        const update = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const cards = container.querySelectorAll<HTMLElement>('[data-reel]');
                let minDist = Infinity;
                let bestIdx = 0;
                cards.forEach((card, i) => {
                    const cr = card.getBoundingClientRect();
                    const dist = Math.abs(cr.left + cr.width / 2 - center);
                    if (dist < minDist) {
                        minDist = dist;
                        bestIdx = i;
                    }
                });
                setActiveIdx(bestIdx);
            });
        };

        container.addEventListener('scroll', update, { passive: true });
        const timer = setTimeout(update, 200);

        return () => {
            container.removeEventListener('scroll', update);
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, [filtered]);

    // ── Scroll to card ──
    const scrollToCard = useCallback((idx: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const cards = container.querySelectorAll<HTMLElement>('[data-reel]');
        cards[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

    // ── Drag handlers ──
    const handleDragStart = useCallback((e: React.MouseEvent) => {
        const container = scrollRef.current;
        if (!container) return;
        dragRef.current = { startX: e.clientX, scrollLeft: container.scrollLeft, dragging: true, hasDragged: false };
        container.style.cursor = 'grabbing';
        container.style.scrollSnapType = 'none';
    }, []);

    const handleDragMove = useCallback((e: React.MouseEvent) => {
        const d = dragRef.current;
        if (!d.dragging || !scrollRef.current) return;
        e.preventDefault();
        const dx = e.clientX - d.startX;
        if (Math.abs(dx) > DRAG_THRESHOLD) d.hasDragged = true;
        scrollRef.current.scrollLeft = d.scrollLeft - dx;
    }, []);

    const handleDragEnd = useCallback(() => {
        const d = dragRef.current;
        d.dragging = false;
        const container = scrollRef.current;
        if (!container) return;
        container.style.cursor = '';
        container.style.scrollSnapType = 'x mandatory';
        setTimeout(() => {
            d.hasDragged = false;
        }, 50);
    }, []);

    const handleCardClick = useCallback((reel: ReelItem) => {
        if (!dragRef.current.hasDragged) {
            setViewerReel(reel);
        }
    }, []);

    // ── Navigation ──
    const nav = useCallback(
        (dir: 'left' | 'right') => {
            scrollToCard(dir === 'left' ? Math.max(0, activeIdx - 1) : Math.min(filtered.length - 1, activeIdx + 1));
        },
        [activeIdx, filtered.length, scrollToCard]
    );

    return (
        <div className='py-20 md:py-28'>
            {/* ── Header ── */}
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Social Content</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        Reels That Convert
                    </CharacterReveal>
                    <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80 md:mx-0'>
                        Scroll-stopping vertical content for Instagram, TikTok, and YouTube Shorts.
                    </p>
                </div>

                {/* ── Category filters ── */}
                <div className='mt-8 flex flex-wrap justify-center gap-2 md:justify-start'>
                    {CATEGORIES.map((cat) => {
                        const count =
                            cat.key === 'all' ? reels.length : reels.filter((r) => r.category === cat.key).length;
                        const isActive = activeCategory === cat.key;

                        return (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
                                    isActive
                                        ? 'border-accent/50 bg-accent/10 text-accent'
                                        : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                                }`}>
                                {cat.label}
                                <span className={`ml-1.5 ${isActive ? 'text-accent/60' : 'text-white/25'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Phone carousel ── */}
            <div className='relative mt-12'>
                {/* Edge fades */}
                <div className='from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent md:w-16' />
                <div className='from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l to-transparent md:w-16' />

                <div
                    ref={scrollRef}
                    className='flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pr-[calc(50vw-100px)] pb-4 pl-[calc(50vw-100px)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 md:pr-[calc(50vw-120px)] md:pl-[calc(50vw-120px)] [&::-webkit-scrollbar]:hidden'
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}>
                    <AnimatePresence mode='popLayout'>
                        {filtered.map((reel, idx) => {
                            return (
                                <motion.div
                                    key={reel.id}
                                    data-reel
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: idx === activeIdx ? 1 : 0.75,
                                        scale: idx === activeIdx ? 1 : 0.92
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className='shrink-0 snap-center'>
                                    <PhoneFrame
                                        reel={reel}
                                        isActive={idx === activeIdx}
                                        onClick={() => handleCardClick(reel)}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Navigation + counter ── */}
            <div className='mx-auto mt-6 flex max-w-[var(--max-width-content)] items-center justify-between px-4 md:px-8'>
                <AnimatePresence mode='wait'>
                    <motion.p
                        key={`${activeCategory}-${activeIdx}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className='text-muted-foreground text-sm'>
                        <span className='text-accent font-mono text-xs'>{String(activeIdx + 1).padStart(2, '0')}</span>{' '}
                        {filtered[activeIdx]?.name}
                    </motion.p>
                </AnimatePresence>

                <div className='flex gap-2'>
                    <button
                        onClick={() => nav('left')}
                        disabled={activeIdx === 0}
                        className='hover:border-accent/40 hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20 md:h-10 md:w-10'
                        aria-label='Previous reel'>
                        <ChevronLeft className='h-4 w-4' />
                    </button>
                    <button
                        onClick={() => nav('right')}
                        disabled={activeIdx === filtered.length - 1}
                        className='hover:border-accent/40 hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20 md:h-10 md:w-10'
                        aria-label='Next reel'>
                        <ChevronRight className='h-4 w-4' />
                    </button>
                </div>
            </div>

            {/* ── Fullscreen Viewer ── */}
            <AnimatePresence>
                {viewerReel && (
                    <ReelViewer
                        reel={viewerReel}
                        reels={filtered}
                        onClose={() => setViewerReel(null)}
                        onNavigate={(r) => setViewerReel(r)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
