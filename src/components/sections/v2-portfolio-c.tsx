'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { MagicCard } from '@/components/ui/magic-card';
import type { PortfolioItem } from '@/content/types';
import { MOTION } from '@/lib/motion';

import {
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
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/* ─────────────────── 3D Tilt Card ─────────────────── */

function TiltCard({
    item,
    index,
    onClick,
    isActive
}: {
    item: PortfolioItem;
    index: number;
    onClick: () => void;
    isActive: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setHovering(true);
        if (item.videoSrc) videoRef.current?.play().catch(() => {});
    }, [item.videoSrc]);

    const handleMouseLeave = useCallback(() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    const num = String(index + 1).padStart(2, '0');

    return (
        <MagicCard className='rounded-2xl' gradientSize={450}>
            <motion.div
                ref={cardRef}
                className='group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-2xl'
                style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onClick();
                }}
                role='button'
                tabIndex={0}
                aria-label={`Watch ${item.title}`}>
                {/* Large project number watermark */}
                <span className='pointer-events-none absolute top-3 left-4 z-10 font-mono text-6xl font-bold text-white/[0.06] md:top-4 md:left-6 md:text-8xl'>
                    {num}
                </span>

                {/* Thumbnail */}
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        hovering && item.videoSrc ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                    }`}
                />

                {/* Video preview on hover */}
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

                {/* Cinematic letterbox bars */}
                <div className='pointer-events-none absolute inset-x-0 top-0 h-[5%] bg-gradient-to-b from-black/60 to-transparent' />
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[5%] bg-gradient-to-t from-black/60 to-transparent' />

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent' />

                {/* Play button — pulses when active */}
                {item.videoSrc && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <motion.div
                            className='flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md'
                            animate={
                                hovering
                                    ? {
                                          scale: [1, 1.15, 1],
                                          borderColor: [
                                              'rgba(220,38,38,0.3)',
                                              'rgba(220,38,38,0.7)',
                                              'rgba(220,38,38,0.3)'
                                          ]
                                      }
                                    : isActive
                                      ? {
                                            scale: [1, 1.05, 1],
                                            borderColor: [
                                                'rgba(255,255,255,0.2)',
                                                'rgba(220,38,38,0.4)',
                                                'rgba(255,255,255,0.2)'
                                            ]
                                        }
                                      : { scale: 1 }
                            }
                            transition={{
                                duration: hovering ? 1.5 : 2.5,
                                repeat: hovering || isActive ? Infinity : 0,
                                ease: 'easeInOut'
                            }}>
                            <Play className='ml-1 h-7 w-7 fill-white text-white' />
                        </motion.div>
                    </div>
                )}

                {/* Bottom info */}
                <div className='absolute right-0 bottom-0 left-0 p-5 md:p-7'>
                    <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                        {item.industry}
                    </span>
                    <h3 className='text-foreground mt-1 text-xl font-semibold md:text-2xl'>{item.title}</h3>
                    <p className='text-muted-foreground text-sm'>{item.client}</p>
                </div>

                {/* Interactive border glow */}
                <div
                    className={`pointer-events-none absolute inset-0 rounded-2xl border transition-all duration-500 ${
                        hovering
                            ? 'border-accent/30 shadow-[inset_0_0_30px_rgba(220,38,38,0.05)]'
                            : isActive
                              ? 'border-white/15'
                              : 'border-white/[0.06]'
                    }`}
                />
            </motion.div>
        </MagicCard>
    );
}

/* ─────────────────── Custom Cinematic Video Player ─────────────────── */

function CinematicPlayer({
    item,
    items,
    onClose,
    onNavigate
}: {
    item: PortfolioItem;
    items: PortfolioItem[];
    onClose: () => void;
    onNavigate: (item: PortfolioItem) => void;
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
    const [isSeeking, setIsSeeking] = useState(false);
    const controlsTimer = useRef<ReturnType<typeof setTimeout>>(null);

    const currentIdx = items.findIndex((i) => i.slug === item.slug);
    const prevItem = currentIdx > 0 ? items[currentIdx - 1] : null;
    const nextItem = currentIdx < items.length - 1 ? items[currentIdx + 1] : null;

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

        return () => {
            if (controlsTimer.current) clearTimeout(controlsTimer.current);
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
            // Shift+Arrow to navigate projects
            if (e.key === 'ArrowRight' && e.shiftKey && nextItem) {
                onNavigate(nextItem);
            }
            if (e.key === 'ArrowLeft' && e.shiftKey && prevItem) {
                onNavigate(prevItem);
            }
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

    const handleProgressDrag = useCallback(
        (e: React.MouseEvent) => {
            if (!isSeeking) return;
            handleProgressClick(e);
        },
        [isSeeking, handleProgressClick]
    );

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);

        return `${m}:${String(s).padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 overflow-hidden'
            onClick={onClose}>
            {/* ── Blurred poster backdrop ── */}
            <div className='absolute inset-0'>
                <img
                    src={item.thumbnail}
                    alt=''
                    className='h-full w-full scale-110 object-cover blur-3xl'
                    aria-hidden='true'
                />
                <div className='absolute inset-0 bg-black/75' />
            </div>

            {/* ── Ambient glow from accent ── */}
            <div
                className='pointer-events-none absolute inset-0'
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                }}
            />

            {/* ── Main content ── */}
            <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
                {/* Prev project nav — desktop */}
                {prevItem && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(prevItem);
                        }}
                        className='group mr-4 hidden shrink-0 flex-col items-center gap-2 md:flex'
                        aria-label={`Previous: ${prevItem.title}`}>
                        <div className='group-hover:border-accent/30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:bg-white/10'>
                            <SkipBack className='h-5 w-5 text-white/60 group-hover:text-white' />
                        </div>
                        <span className='max-w-[80px] truncate text-[10px] text-white/40 group-hover:text-white/60'>
                            {prevItem.title}
                        </span>
                    </motion.button>
                )}

                <motion.div
                    ref={containerRef}
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className='relative w-full max-w-6xl'
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

                    {/* Film counter badge */}
                    <div className='absolute -top-12 left-0 flex items-center gap-3'>
                        <span className='font-mono text-xs text-white/40'>
                            <span className='text-accent font-semibold'>{String(currentIdx + 1).padStart(2, '0')}</span>
                            {' / '}
                            {String(items.length).padStart(2, '0')}
                        </span>
                        <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                            {item.industry}
                        </span>
                    </div>

                    {/* Video container */}
                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50'>
                        <div className='aspect-video'>
                            {item.videoSrc ? (
                                <video
                                    ref={videoRef}
                                    src={item.videoSrc}
                                    autoPlay
                                    className='size-full cursor-pointer object-cover'
                                    onClick={togglePlay}
                                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        if (nextItem) {
                                            // Auto-advance after 2s
                                            setTimeout(() => onNavigate(nextItem), 2000);
                                        }
                                    }}
                                />
                            ) : (
                                <img src={item.thumbnail} alt={item.title} className='size-full object-cover' />
                            )}
                        </div>

                        {/* Center play/pause on click feedback */}
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

                        {/* Custom controls overlay */}
                        <motion.div
                            className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 pt-16 pb-4'
                            initial={false}
                            animate={{ opacity: showControls ? 1 : 0 }}
                            transition={{ duration: 0.3 }}>
                            {/* Progress bar */}
                            <div
                                ref={progressRef}
                                className='group mb-4 h-1 cursor-pointer rounded-full bg-white/20 transition-all hover:h-2'
                                onClick={handleProgressClick}
                                onMouseDown={() => setIsSeeking(true)}
                                onMouseMove={handleProgressDrag}
                                onMouseUp={() => setIsSeeking(false)}
                                onMouseLeave={() => setIsSeeking(false)}
                                role='slider'
                                aria-label='Video progress'
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                tabIndex={0}>
                                <div className='relative h-full overflow-hidden rounded-full'>
                                    <div
                                        className='bg-accent absolute inset-y-0 left-0 rounded-full'
                                        style={{ width: `${progress}%` }}
                                    />
                                    <div
                                        className='bg-accent absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full opacity-0 shadow-lg ring-2 ring-black/30 transition-opacity group-hover:opacity-100'
                                        style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
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
                                        {item.title}
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

                    {/* ── Info panel below player ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
                        {/* Project details */}
                        <div className='rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm'>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <h3 className='text-foreground text-lg font-semibold'>{item.title}</h3>
                                    <p className='text-muted-foreground mt-0.5 text-sm'>{item.client}</p>
                                </div>
                                <span className='text-accent border-accent/20 bg-accent/5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase'>
                                    {item.industry}
                                </span>
                            </div>
                            <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>{item.description}</p>
                            {/* Up-next strip on mobile */}
                            {nextItem && (
                                <button
                                    onClick={() => onNavigate(nextItem)}
                                    className='mt-4 flex w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-left transition-colors hover:bg-white/[0.05] md:hidden'>
                                    <img
                                        src={nextItem.thumbnail}
                                        alt={nextItem.title}
                                        className='h-10 w-16 shrink-0 rounded object-cover'
                                    />
                                    <div className='min-w-0 flex-1'>
                                        <p className='text-[10px] text-white/40 uppercase'>Up next</p>
                                        <p className='text-foreground truncate text-sm font-medium'>{nextItem.title}</p>
                                    </div>
                                    <ChevronRight className='h-4 w-4 shrink-0 text-white/30' />
                                </button>
                            )}
                        </div>

                        {/* CTA card */}
                        <div className='border-accent/10 bg-accent/[0.03] flex flex-col items-center justify-center rounded-xl border p-5 text-center backdrop-blur-sm md:w-[220px]'>
                            <p className='text-foreground text-sm font-semibold'>Want something like this?</p>
                            <p className='text-muted-foreground mt-1 text-xs'>Let&apos;s create your story</p>
                            <motion.a
                                href='tel:6479530222'
                                className='bg-accent hover:bg-accent/90 mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors'
                                animate={{
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        '0 0 0 0 rgba(220,38,38,0)',
                                        '0 0 20px 4px rgba(220,38,38,0.3)',
                                        '0 0 0 0 rgba(220,38,38,0)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                                <Phone className='h-3.5 w-3.5' />
                                Call Now
                            </motion.a>
                            <a
                                href='#contact'
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className='text-accent/70 hover:text-accent mt-2 text-xs underline underline-offset-2 transition-colors'>
                                Or send a message
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Next project nav — desktop */}
                {nextItem && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(nextItem);
                        }}
                        className='group ml-4 hidden shrink-0 flex-col items-center gap-2 md:flex'
                        aria-label={`Next: ${nextItem.title}`}>
                        <div className='group-hover:border-accent/30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:bg-white/10'>
                            <SkipForward className='h-5 w-5 text-white/60 group-hover:text-white' />
                        </div>
                        <span className='max-w-[80px] truncate text-[10px] text-white/40 group-hover:text-white/60'>
                            {nextItem.title}
                        </span>
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────── Cinematic Carousel with Depth-of-Field ─────────── */

const CARD_GAP = 24; // gap-6
const DRAG_THRESHOLD = 8; // px — must move more than this to count as drag

interface V2PortfolioCProps {
    items: PortfolioItem[];
}

export function V2PortfolioC({ items }: V2PortfolioCProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [cardFocus, setCardFocus] = useState<number[]>(items.map((_, i) => (i === 0 ? 1 : 0)));
    const [pad, setPad] = useState(0);
    const [dialogItem, setDialogItem] = useState<PortfolioItem | null>(null);
    const dragRef = useRef({
        startX: 0,
        scrollLeft: 0,
        dragging: false,
        hasDragged: false,
        lastX: 0,
        lastT: 0,
        velocity: 0
    });

    // Animated progress line
    const progressWidth = useMotionValue(0);
    const springProgress = useSpring(progressWidth, { stiffness: 300, damping: 30 });
    const progressPct = useTransform(springProgress, (v) => `${v}%`);

    // ── Compute padding: flush-left start, centering for last card ──
    useEffect(() => {
        const measure = () => {
            const wrapper = wrapperRef.current;
            const container = scrollRef.current;
            if (!wrapper || !container) return;
            const card = container.querySelector<HTMLElement>('[data-card]');
            if (!card) return;
            const p = Math.max(0, (wrapper.clientWidth - card.offsetWidth) / 2);
            setPad(p);
        };

        measure();
        const init = setTimeout(measure, 100);
        window.addEventListener('resize', measure);

        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(init);
        };
    }, [items]);

    // ── Scroll-driven depth-of-field effect ──
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let rafId: number;
        const update = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const cards = container.querySelectorAll<HTMLElement>('[data-card]');

                let maxC = -1;
                let maxI = 0;
                const vals: number[] = [];

                cards.forEach((card, i) => {
                    const cr = card.getBoundingClientRect();
                    const cc = cr.left + cr.width / 2;
                    const dist = Math.abs(cc - center);
                    const falloff = rect.width * 0.5;
                    const c = Math.max(0, Math.min(1, 1 - dist / falloff));
                    vals.push(c);
                    if (c > maxC) {
                        maxC = c;
                        maxI = i;
                    }
                });

                setCardFocus(vals);
                setActiveIdx(maxI);
                progressWidth.set(((maxI + 1) / items.length) * 100);
            });
        };

        container.addEventListener('scroll', update, { passive: true });
        const timer = setTimeout(update, 200);

        return () => {
            container.removeEventListener('scroll', update);
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, [items, progressWidth]);

    // ── Scroll to specific card index ──
    const scrollToCard = useCallback((idx: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const cards = container.querySelectorAll<HTMLElement>('[data-card]');
        cards[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

    // ── Drag-to-scroll with momentum + distance threshold ──
    const handleDragStart = useCallback((e: React.MouseEvent) => {
        const container = scrollRef.current;
        if (!container) return;
        dragRef.current = {
            startX: e.clientX,
            scrollLeft: container.scrollLeft,
            dragging: true,
            hasDragged: false,
            lastX: e.clientX,
            lastT: Date.now(),
            velocity: 0
        };
        container.style.cursor = 'grabbing';
        container.style.scrollSnapType = 'none';
        container.style.scrollBehavior = 'auto';
    }, []);

    const handleDragMove = useCallback((e: React.MouseEvent) => {
        const d = dragRef.current;
        if (!d.dragging || !scrollRef.current) return;
        e.preventDefault();
        const dx = e.clientX - d.startX;
        if (Math.abs(dx) > DRAG_THRESHOLD) {
            d.hasDragged = true;
        }
        d.lastX = e.clientX;
        d.lastT = Date.now();
        // Reduced sensitivity: 0.6x mouse movement
        scrollRef.current.scrollLeft = d.scrollLeft - dx * 0.6;
    }, []);

    const handleDragEnd = useCallback(() => {
        const d = dragRef.current;
        d.dragging = false;
        const container = scrollRef.current;
        if (!container) return;
        container.style.cursor = '';
        // Re-enable snap — browser handles smooth snapping natively
        container.style.scrollSnapType = 'x mandatory';
        container.style.scrollBehavior = '';

        // Reset hasDragged after a tick so the click handler can read it
        setTimeout(() => {
            d.hasDragged = false;
        }, 50);
    }, []);

    // ── Card click — only fire if not dragging ──
    const handleCardClick = useCallback((item: PortfolioItem) => {
        if (!dragRef.current.hasDragged) {
            setDialogItem(item);
        }
    }, []);

    // ── Navigate to different project in the player ──
    const handlePlayerNavigate = useCallback((newItem: PortfolioItem) => {
        setDialogItem(newItem);
    }, []);

    // ── Keyboard navigation ──
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (dialogItem) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollToCard(Math.max(0, activeIdx - 1));
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollToCard(Math.min(items.length - 1, activeIdx + 1));
            }
        };

        window.addEventListener('keydown', handleKey);

        return () => window.removeEventListener('keydown', handleKey);
    }, [activeIdx, items.length, scrollToCard, dialogItem]);

    // ── Arrow button handler ──
    const nav = useCallback(
        (dir: 'left' | 'right') => {
            scrollToCard(dir === 'left' ? Math.max(0, activeIdx - 1) : Math.min(items.length - 1, activeIdx + 1));
        },
        [activeIdx, items.length, scrollToCard]
    );

    return (
        <section className='py-20 md:py-28'>
            {/* ── Header ── */}
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between'>
                    <div className='text-center md:text-left'>
                        <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Selected Work</p>
                        <CharacterReveal
                            as='h2'
                            className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                            See It In Action
                        </CharacterReveal>
                        <p className='max-w-[var(--max-width-prose)] text-lg text-white/80'>
                            Drag to explore. Hover to preview. Click to watch.
                        </p>
                    </div>
                    <div className='hidden items-center gap-6 md:flex'>
                        {/* Animated film counter */}
                        <div className='flex items-baseline gap-1'>
                            <motion.span
                                key={activeIdx}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='text-accent font-mono text-2xl font-bold tabular-nums'>
                                {String(activeIdx + 1).padStart(2, '0')}
                            </motion.span>
                            <span className='font-mono text-sm text-white/50'>/</span>
                            <span className='font-mono text-sm text-white/60 tabular-nums'>
                                {String(items.length).padStart(2, '0')}
                            </span>
                        </div>
                        {/* Arrows */}
                        <div className='flex gap-2'>
                            <button
                                onClick={() => nav('left')}
                                disabled={activeIdx === 0}
                                className='hover:border-accent/40 hover:text-accent flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-white/50'
                                aria-label='Previous project'>
                                <ChevronLeft className='h-5 w-5' />
                            </button>
                            <button
                                onClick={() => nav('right')}
                                disabled={activeIdx === items.length - 1}
                                className='hover:border-accent/40 hover:text-accent flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-white/50'
                                aria-label='Next project'>
                                <ChevronRight className='h-5 w-5' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Carousel with depth-of-field ── */}
            <div ref={wrapperRef} className='relative mt-12'>
                {/* Edge fades */}
                <div className='from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent md:w-24' />
                <div className='from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent md:w-24' />

                <div
                    ref={scrollRef}
                    className='flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    style={{ paddingLeft: '16px', paddingRight: `${pad}px` }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}>
                    {items.map((item, idx) => {
                        const f = cardFocus[idx] ?? 0;
                        const isFirst = idx === 0;
                        const scale = 0.85 + f * 0.15;
                        const opacity = 0.35 + f * 0.65;

                        return (
                            <div
                                key={item.slug}
                                data-card
                                className={`shrink-0 snap-center ${isFirst ? 'w-[88vw] max-w-[1000px] md:w-[60vw]' : 'w-[85vw] max-w-[900px] md:w-[55vw]'}`}
                                style={{
                                    transform: `scale(${scale})`,
                                    opacity,
                                    transition:
                                        'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s cubic-bezier(0.22,1,0.36,1)',
                                    willChange: 'transform, opacity'
                                }}>
                                <TiltCard
                                    item={item}
                                    index={idx}
                                    onClick={() => handleCardClick(item)}
                                    isActive={idx === activeIdx}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Cinematic progress bar ── */}
            <div className='mx-auto mt-8 max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='flex items-center gap-4'>
                    {/* Progress line */}
                    <div className='relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.06]'>
                        <motion.div
                            className='bg-accent absolute inset-y-0 left-0 rounded-full'
                            style={{ width: progressPct }}>
                            <motion.div
                                className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent to-white/30'
                                style={{ width: '100%' }}
                            />
                        </motion.div>
                    </div>
                    {/* Dot indicators */}
                    <div className='flex gap-1.5'>
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToCard(idx)}
                                className={`h-2 rounded-full transition-all duration-400 ${
                                    idx === activeIdx
                                        ? 'bg-accent w-6'
                                        : idx < activeIdx
                                          ? 'bg-accent/30 w-2'
                                          : 'w-2 bg-white/15 hover:bg-white/30'
                                }`}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Active project name ticker */}
                <div className='mt-4 flex items-center justify-between'>
                    <AnimatePresence mode='wait'>
                        <motion.p
                            key={activeIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='text-muted-foreground text-sm'>
                            <span className='text-accent font-mono text-xs'>
                                {String(activeIdx + 1).padStart(2, '0')}
                            </span>{' '}
                            {items[activeIdx]?.title}
                            <span className='text-white/40'> — </span>
                            <span className='text-white/70'>{items[activeIdx]?.client}</span>
                        </motion.p>
                    </AnimatePresence>
                    {/* Mobile arrows */}
                    <div className='flex gap-2 md:hidden'>
                        <button
                            onClick={() => nav('left')}
                            disabled={activeIdx === 0}
                            className='hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                            aria-label='Previous'>
                            <ChevronLeft className='h-4 w-4' />
                        </button>
                        <button
                            onClick={() => nav('right')}
                            disabled={activeIdx === items.length - 1}
                            className='hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                            aria-label='Next'>
                            <ChevronRight className='h-4 w-4' />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Micro-CTA after portfolio ── */}
            <div className='mx-auto mt-12 max-w-[var(--max-width-content)] px-4 text-center md:px-8'>
                <div className='rounded-xl border border-white/[0.08] bg-white/[0.03] px-8 py-6'>
                    <p className='text-foreground text-lg font-medium'>Want results like these for your restaurant?</p>
                    <div className='mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6'>
                        <a
                            href='tel:6479530222'
                            className='text-accent hover:text-accent/80 flex items-center gap-2 font-semibold transition-colors'>
                            <Phone className='h-4 w-4' />
                            Call 647-953-0222
                        </a>
                        <span className='hidden text-white/30 sm:inline'>|</span>
                        <a
                            href='#contact'
                            className='text-foreground hover:text-accent font-semibold transition-colors'>
                            Send a message &rarr;
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Custom Cinematic Video Player ── */}
            <AnimatePresence>
                {dialogItem && (
                    <CinematicPlayer
                        item={dialogItem}
                        items={items}
                        onClose={() => setDialogItem(null)}
                        onNavigate={handlePlayerNavigate}
                    />
                )}
            </AnimatePresence>

            {/* Bottom spacing for diagonal transition */}
            <div className='h-12 md:h-20' />
        </section>
    );
}
