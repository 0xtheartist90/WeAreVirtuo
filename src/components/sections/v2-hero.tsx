'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { videoUrl } from '@/lib/video';

import { ArrowRight, ChevronDown, Pause, Phone, Play, Volume2, VolumeX, XIcon } from 'lucide-react';
import { AnimatePresence, MotionValue, motion, useScroll, useSpring, useTransform } from 'motion/react';

interface V2HeroProps {
    headline: string;
    nicheKey: string;
    videoSrc?: string;
    posterSrc?: string;
}

type HeroProduct = { title: string; thumbnail: string; videoSrc?: string };

/* ─── Portfolio items for the parallax rows ─── */
const heroProducts: HeroProduct[] = [
    // Row 1 — real clients, real videos, all clickable
    {
        title: 'Nome Fort York',
        thumbnail: '/images/portfolio/nome.png',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    {
        title: 'Try Lychee',
        thumbnail: '/images/portfolio/nome2.png',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Nome Don Mills',
        thumbnail: '/images/portfolio/nome3.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4')
    },
    {
        title: 'ANIML Toronto',
        thumbnail: '/images/portfolio/nome4.png',
        videoSrc: videoUrl('videos/reels/animl-toronto.mp4')
    },
    { title: 'BMW', thumbnail: '/images/portfolio/portfolio-shot.jpg', videoSrc: videoUrl('videos/reels/bmw.mp4') },
    // Row 2 — more real clients
    {
        title: 'Grayline Toronto',
        thumbnail: '/images/portfolio/grayline.jpg',
        videoSrc: videoUrl('videos/reels/globe-and-mail-centre.mp4')
    },
    {
        title: 'UFC Stance',
        thumbnail: '/images/portfolio/ufc-stance.png',
        videoSrc: videoUrl('videos/reels/canadian-international-autoshow.mp4')
    },
    {
        title: 'Chambers Toronto',
        thumbnail: '/images/portfolio/sindic8wide.jpg',
        videoSrc: videoUrl('videos/reels/chambers-steak-house.mp4')
    },
    { title: 'FIGO', thumbnail: '/images/bts/cooking-show-setup.jpg', videoSrc: videoUrl('videos/reels/figo.mp4') },
    {
        title: 'Hazelton Hotel',
        thumbnail: '/images/bts/commercial-stage.jpg',
        videoSrc: videoUrl('videos/reels/hazelton-reel.mp4')
    },
    // Row 3 — more real clients
    {
        title: 'AMAL Miami',
        thumbnail: '/images/bts/cinematographer-red.jpg',
        videoSrc: videoUrl('videos/reels/amal-miami.mp4')
    },
    {
        title: 'Level 6 Miami',
        thumbnail: '/images/bts/silhouette-setup.png',
        videoSrc: videoUrl('videos/reels/level-6-miami.mp4')
    },
    {
        title: 'Chaiiwala',
        thumbnail: '/images/bts/steadicam-operator.jpg',
        videoSrc: videoUrl('videos/reels/chaiiwala.mp4')
    },
    {
        title: 'LayLak Lebanese',
        thumbnail: '/images/bts/full-production-set.jpg',
        videoSrc: videoUrl('videos/reels/laylak-lebanese-cuisine.mp4')
    },
    {
        title: 'Friday Harbour',
        thumbnail: '/images/about/studio-wide.png',
        videoSrc: videoUrl('videos/reels/friday-harbour.mp4')
    }
];

/* ─── Hero Video Player Modal ─── */

function HeroVideoModal({ product, onClose }: { product: HeroProduct; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
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
            className='fixed inset-0 z-[100] overflow-hidden'
            onClick={onClose}>
            {/* Blurred poster backdrop */}
            <div className='absolute inset-0'>
                <img
                    src={product.thumbnail}
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
                    background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                }}
            />

            {/* Main content */}
            <div className='relative flex h-full flex-col items-center justify-center px-4 md:px-8'>
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className='relative w-full max-w-5xl'
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

                    {/* Title */}
                    <div className='absolute -top-12 left-0'>
                        <span className='text-lg font-semibold text-white'>{product.title}</span>
                    </div>

                    {/* Video container */}
                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50'>
                        <div className='aspect-video'>
                            <video
                                ref={videoRef}
                                src={product.videoSrc}
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
                                className='group mb-3 h-1 cursor-pointer rounded-full bg-white/20 transition-all hover:h-1.5'
                                onClick={handleProgressClick}>
                                <div
                                    className='bg-accent relative h-full rounded-full transition-all'
                                    style={{ width: `${progress}%` }}>
                                    <div className='bg-accent absolute -top-1 -right-1.5 h-3 w-3 rounded-full opacity-0 shadow-lg group-hover:opacity-100' />
                                </div>
                            </div>

                            {/* Controls row */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <button
                                        onClick={togglePlay}
                                        className='flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10'
                                        aria-label={playing ? 'Pause' : 'Play'}>
                                        {playing ? (
                                            <Pause className='h-4 w-4 fill-white' />
                                        ) : (
                                            <Play className='ml-0.5 h-4 w-4 fill-white' />
                                        )}
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className='flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10'
                                        aria-label={muted ? 'Unmute' : 'Mute'}>
                                        {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                                    </button>
                                    <span className='font-mono text-xs text-white/50'>
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA below video */}
                    <div className='mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-3 text-sm font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call 647-953-0222
                            </ShimmerButton>
                        </a>
                        <button
                            type='button'
                            onClick={() => {
                                onClose();
                                setTimeout(
                                    () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                                    300
                                );
                            }}
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Get a Quote
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─── Parallax Product Card with Video on Hover ─── */
function ProductCard({
    product,
    translate,
    onCardClick
}: {
    product: HeroProduct;
    translate: MotionValue<number>;
    onCardClick: (product: HeroProduct) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);

    const handleMouseEnter = () => {
        setHovering(true);
        if (product.videoSrc) videoRef.current?.play().catch(() => {});
    };

    const handleMouseLeave = () => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            style={{ x: translate, willChange: 'transform' }}
            whileHover={{ y: -20 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => product.videoSrc && onCardClick(product)}
            className={`group/product relative h-72 w-[25rem] shrink-0 overflow-hidden rounded-xl md:h-96 md:w-[30rem] ${product.videoSrc ? 'cursor-pointer' : ''}`}>
            {/* Thumbnail */}
            <img
                src={product.thumbnail}
                alt={product.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hovering ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
            />
            {/* Video on hover */}
            {product.videoSrc && (
                <video
                    ref={videoRef}
                    src={product.videoSrc}
                    muted
                    loop
                    playsInline
                    preload='none'
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
            <div className='absolute inset-0 bg-black/10 transition-colors group-hover/product:bg-black/40' />
            <h2 className='absolute bottom-4 left-4 text-lg font-semibold text-white opacity-0 transition-opacity group-hover/product:opacity-100'>
                {product.title}
            </h2>
            {/* Play icon for cards with video */}
            {product.videoSrc && (
                <div className='absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover/product:opacity-100'>
                    <Play className='ml-0.5 h-4 w-4 fill-white text-white' />
                </div>
            )}
        </motion.div>
    );
}

/* ─── Main Hero ─── */
export function V2Hero({ headline }: V2HeroProps) {
    const reducedMotion = useReducedMotion();
    const ref = useRef(null);
    const [activeProduct, setActiveProduct] = useState<HeroProduct | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });

    // Springs only on the parallax rows (need momentum). Perspective transforms use raw useTransform (no spring overhead — they settle in first 20% of scroll).
    const springConfig = { stiffness: 300, damping: 30 };
    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig);
    const rotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);
    const rotateZ = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.2], [-600, 400]);

    const firstRow = heroProducts.slice(0, 5);
    const secondRow = heroProducts.slice(5, 10);
    const thirdRow = heroProducts.slice(10, 15);

    const handleCardClick = useCallback((product: HeroProduct) => {
        setActiveProduct(product);
    }, []);

    return (
        <>
            <div
                ref={ref}
                className='relative flex h-[220vh] flex-col self-auto overflow-hidden py-20 antialiased [perspective:1000px] [transform-style:preserve-3d] md:py-40'>
                {/* ── Hero Header Content ── */}
                <div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-20 md:py-40'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>
                        Toronto&apos;s Premier Video Production Team
                    </p>
                    <h1 className='font-display max-w-4xl text-5xl leading-[0.95] tracking-wide text-white uppercase md:text-7xl lg:text-8xl'>
                        {headline.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word === 'Restaurant' ? <span className='text-accent'>{word.charAt(0)}</span> : null}
                                {word === 'Restaurant' ? word.slice(1) : word}
                                {i < headline.split(' ').length - 1 ? ' ' : ''}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className='mt-6 max-w-2xl text-lg text-white/80 md:text-xl'>
                        Cinematic video production for Toronto&apos;s finest restaurants and hospitality brands. We
                        create content that fills tables and builds reputations.
                    </p>

                    {/* CTAs */}
                    <div className='mt-10 flex flex-col items-start gap-4 sm:flex-row'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-10 py-4 text-lg font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call 647-953-0222
                            </ShimmerButton>
                        </a>
                        <button
                            type='button'
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Send a Message
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                    <p className='text-accent mt-4 text-sm font-medium tracking-wide'>Currently booking Summer 2026</p>
                </div>

                {/* ── Parallax Portfolio Rows ── */}
                {!reducedMotion && (
                    <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
                        <motion.div className='mb-16 flex flex-row-reverse space-x-16 space-x-reverse md:mb-20 md:space-x-20 md:space-x-reverse'>
                            {firstRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateX}
                                    key={product.title}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </motion.div>
                        <motion.div className='mb-16 flex flex-row space-x-16 md:mb-20 md:space-x-20'>
                            {secondRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateXReverse}
                                    key={product.title}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </motion.div>
                        <motion.div className='flex flex-row-reverse space-x-16 space-x-reverse md:space-x-20 md:space-x-reverse'>
                            {thirdRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateX}
                                    key={product.title}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {/* Scroll indicator */}
                <motion.div
                    className='absolute bottom-8 left-1/2 z-20 -translate-x-1/2'
                    animate={{ opacity: 0.8, y: [0, 8, 0] }}
                    transition={{ y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } }}>
                    <ChevronDown className='h-8 w-8 text-white' />
                </motion.div>
            </div>

            {/* Video player modal */}
            <AnimatePresence>
                {activeProduct?.videoSrc && (
                    <HeroVideoModal product={activeProduct} onClose={() => setActiveProduct(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
