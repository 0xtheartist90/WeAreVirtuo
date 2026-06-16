'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { MagicCard } from '@/components/ui/magic-card';
import { MOTION } from '@/lib/motion';
import { videoUrl } from '@/lib/video';

import { ArrowRight, Maximize2, Minimize2, Pause, Phone, Play, Volume2, VolumeX, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';

/* ─────────────────────────── Data ─────────────────────────── */

const services = [
    {
        title: 'Menu Showcase Videos',
        description: 'Close-up food shots that drive orders and foot traffic.',
        image: '/images/portfolio/nome2.png',
        video: videoUrl('videos/portfolio/nome-don-mills.mp4')
    },
    {
        title: 'Ambiance Reels',
        description: 'Capture the vibe — lighting, decor, energy.',
        image: '/images/hero/services-parallax.jpg',
        video: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Social Content',
        description: 'Scroll-stopping reels for Instagram, TikTok & Shorts.',
        image: '/images/portfolio/nome3.png',
        video: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    {
        title: 'Event Coverage',
        description: 'Multi-camera capture, same-week delivery.',
        image: '/images/portfolio/grayline.jpg',
        video: videoUrl('videos/portfolio/nome-don-mills.mp4')
    }
];

/* ──────────────────── Cinematic Video Player (matches Portfolio) ──────────────────── */

function formatTime(t: number) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);

    return `${m}:${String(s).padStart(2, '0')}`;
}

function ServiceVideoPlayer({
    title,
    description,
    image,
    videoSrc,
    label,
    onClose
}: {
    title: string;
    description: string;
    image: string;
    videoSrc: string;
    label?: string;
    onClose: () => void;
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

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
            if (e.key === 'm') toggleMute();
            if (e.key === 'f') toggleFullscreen();
            if (e.key === 'ArrowRight' && videoRef.current) {
                videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
            }
            if (e.key === 'ArrowLeft' && videoRef.current) {
                videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
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

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 overflow-hidden'
            onClick={onClose}>
            {/* Blurred poster backdrop */}
            <div className='absolute inset-0'>
                <img src={image} alt='' className='h-full w-full scale-110 object-cover blur-3xl' aria-hidden='true' />
                <div className='absolute inset-0 bg-black/75' />
            </div>

            {/* Ambient glow */}
            <div
                className='pointer-events-none absolute inset-0'
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                }}
            />

            {/* Main content */}
            <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
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

                    {/* Category badge */}
                    {label && (
                        <div className='absolute -top-12 left-0'>
                            <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                                {label}
                            </span>
                        </div>
                    )}

                    {/* Video container */}
                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50'>
                        <div className='aspect-video'>
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                autoPlay
                                className='size-full cursor-pointer object-cover'
                                onClick={togglePlay}
                                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                                onEnded={() => setPlaying(false)}
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
                            className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 pt-16 pb-4'
                            initial={false}
                            animate={{ opacity: showControls ? 1 : 0 }}
                            transition={{ duration: 0.3 }}>
                            {/* Progress bar */}
                            <div
                                ref={progressRef}
                                className='group mb-4 h-1 cursor-pointer rounded-full bg-white/20 transition-all hover:h-2'
                                onClick={handleProgressClick}>
                                <div className='relative h-full overflow-hidden rounded-full'>
                                    <div
                                        className='bg-accent absolute inset-y-0 left-0 rounded-full'
                                        style={{ width: `${progress}%` }}
                                    />
                                    <div
                                        className='bg-accent absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full opacity-0 shadow-lg ring-2 ring-black/30 transition-opacity group-hover:opacity-100'
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
                                        {title}
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
                        className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
                        <div className='rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm'>
                            <h3 className='text-foreground text-lg font-semibold'>{title}</h3>
                            <p className='text-muted-foreground mt-1 text-sm'>{description}</p>
                        </div>
                        <div className='border-accent/10 bg-accent/[0.03] flex flex-col items-center justify-center rounded-xl border p-5 text-center backdrop-blur-sm md:w-[220px]'>
                            <p className='text-foreground text-sm font-semibold'>Want something like this?</p>
                            <a
                                href='tel:6479530222'
                                className='bg-accent hover:bg-accent/90 mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors'>
                                <Phone className='h-3.5 w-3.5' />
                                Call Now
                            </a>
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
            </div>
        </motion.div>
    );
}

/* ──────────────────── Video Cell (shared) ──────────────────── */

function VideoCell({
    title,
    description,
    label,
    image,
    videoSrc,
    featured
}: {
    title: string;
    description: string;
    label?: string;
    image: string;
    videoSrc: string;
    featured?: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setHovering(true);
        videoRef.current?.play().catch(() => {});
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    return (
        <>
            <MagicCard className='h-full rounded-xl'>
                <div
                    className='group relative h-full cursor-pointer overflow-hidden rounded-xl'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setDialogOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setDialogOpen(true);
                    }}
                    role='button'
                    tabIndex={0}
                    aria-label={`Play ${title} video`}>
                    {/* Thumbnail */}
                    <img
                        src={image}
                        alt={title}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                            hovering ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                        }`}
                    />

                    {/* Video preview on hover */}
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        muted
                        loop
                        playsInline
                        preload='none'
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                            hovering ? 'opacity-100' : 'opacity-0'
                        }`}
                    />

                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:via-black/20' />

                    {/* Play icon */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <motion.div
                            className={`border-accent/30 bg-accent/10 flex items-center justify-center rounded-full border backdrop-blur-sm ${
                                featured ? 'h-20 w-20' : 'h-12 w-12'
                            }`}
                            animate={
                                hovering
                                    ? {
                                          scale: [1, 1.1, 1],
                                          borderColor: [
                                              'rgba(220,38,38,0.3)',
                                              'rgba(220,38,38,0.6)',
                                              'rgba(220,38,38,0.3)'
                                          ]
                                      }
                                    : { scale: 1 }
                            }
                            transition={{ duration: 2, repeat: hovering ? Infinity : 0, ease: 'easeInOut' }}>
                            <Play className={`fill-white text-white ${featured ? 'ml-1 h-8 w-8' : 'ml-0.5 h-5 w-5'}`} />
                        </motion.div>
                    </div>

                    {/* Bottom content */}
                    <div className='absolute right-0 bottom-0 left-0 p-4 md:p-6'>
                        {label && (
                            <span className='text-accent text-xs font-semibold tracking-widest uppercase'>{label}</span>
                        )}
                        <h3
                            className={`text-foreground font-semibold ${
                                featured ? 'mt-2 text-xl md:text-2xl' : 'text-sm md:text-base'
                            }`}>
                            {title}
                        </h3>
                        <p className={`text-muted-foreground mt-1 ${featured ? 'text-sm' : 'text-xs'}`}>
                            {description}
                        </p>
                    </div>

                    {/* Border beam on featured only */}
                    {featured && <BorderBeam duration={10} colorFrom='#DC2626' colorTo='rgba(255,255,255,0.3)' />}

                    {/* Subtle border on non-featured */}
                    {!featured && (
                        <div className='pointer-events-none absolute inset-0 rounded-xl border border-white/[0.08] transition-colors duration-500 group-hover:border-white/15' />
                    )}
                </div>
            </MagicCard>

            {/* Cinematic Video Player — portaled to body to escape overflow:hidden */}
            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {dialogOpen && (
                            <ServiceVideoPlayer
                                title={title}
                                description={description}
                                image={image}
                                videoSrc={videoSrc}
                                label={label}
                                onClose={() => setDialogOpen(false)}
                            />
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}

/* ──────────────────── Main Section ──────────────────── */

export function V2Services() {
    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Section header */}
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>What We Create</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        Video That Works
                    </CharacterReveal>
                    <p className='mb-12 max-w-[var(--max-width-prose)] text-lg text-white/80 md:mx-0'>
                        Every video is tailored to your brand, your audience, and your goals.
                    </p>
                </div>

                {/* ── Bento Grid ── */}
                <div className='grid grid-cols-1 gap-3 md:auto-rows-[15rem] md:grid-cols-2'>
                    {/* Featured video — 2 cols, 2 rows */}
                    <BlurFade
                        delay={MOTION.stagger}
                        inView
                        inViewMargin={MOTION.viewport.margin}
                        className='md:col-span-2 md:row-span-2'>
                        <VideoCell
                            title='Nome Izakaya — Fort York'
                            description='Restaurant ambiance & menu showcase'
                            label='Featured Reel'
                            image='/images/portfolio/nome.png'
                            videoSrc={videoUrl('videos/portfolio/nome-fort-york.mp4')}
                            featured
                        />
                    </BlurFade>

                    {/* Service video cards */}
                    {services.map((service, idx) => (
                        <BlurFade
                            key={service.title}
                            delay={MOTION.stagger * (idx + 2)}
                            inView
                            inViewMargin={MOTION.viewport.margin}>
                            <VideoCell
                                title={service.title}
                                description={service.description}
                                image={service.image}
                                videoSrc={service.video}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </div>
    );
}
