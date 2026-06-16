'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { videoReels } from '@/content/agency';
import { MOTION } from '@/lib/motion';
import { videoUrl } from '@/lib/video';

import { Pause, Play, Volume2, VolumeX, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';

type Reel = { title: string; image: string; video: string };

/* ─────────── Inline cinematic player (no external redirect) ─────────── */

function ReelPlayer({ reel, onClose }: { reel: Reel; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
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
                <img src={reel.image} alt='' aria-hidden='true' className='h-full w-full scale-110 object-cover blur-3xl' />
                <div className='absolute inset-0 bg-black/80' />
            </div>

            <div className='relative flex h-full items-center justify-center px-4 md:px-8'>
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className='relative w-full max-w-md'
                    onClick={(e) => e.stopPropagation()}>
                    <button
                        className='absolute -top-12 right-0 z-20 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white'
                        onClick={onClose}
                        aria-label='Close'>
                        <span className='hidden text-xs md:inline'>ESC</span>
                        <XIcon className='h-4 w-4' />
                    </button>
                    <span className='absolute -top-12 left-0 text-lg font-semibold text-white'>{reel.title}</span>

                    <div className='relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl'>
                        <video
                            ref={videoRef}
                            src={videoUrl(reel.video)}
                            autoPlay
                            loop
                            playsInline
                            className='size-full cursor-pointer object-cover'
                            onClick={togglePlay}
                        />
                        <div className='absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pt-12 pb-4'>
                            <button
                                onClick={togglePlay}
                                className='rounded-full p-2 text-white transition-colors hover:bg-white/10'
                                aria-label={playing ? 'Pause' : 'Play'}>
                                {playing ? <Pause className='h-5 w-5 fill-white' /> : <Play className='ml-0.5 h-5 w-5 fill-white' />}
                            </button>
                            <button
                                onClick={toggleMute}
                                className='rounded-full p-2 text-white transition-colors hover:bg-white/10'
                                aria-label={muted ? 'Unmute' : 'Mute'}>
                                {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─────────── Reel thumbnail with hover preview ─────────── */

function ReelCell({ reel, onOpen }: { reel: Reel; onOpen: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);

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
        <button
            type='button'
            onClick={onOpen}
            className='group relative block aspect-[9/12] w-full overflow-hidden rounded-xl border border-white/[0.08]'
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            aria-label={`Play ${reel.title} reel`}>
            <img
                src={reel.image}
                alt={reel.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    hovering ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                }`}
            />
            <video
                ref={videoRef}
                src={videoUrl(reel.video)}
                muted
                loop
                playsInline
                preload='none'
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    hovering ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
            <div className='border-accent/30 bg-accent/10 absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-transform group-hover:scale-110'>
                <Play className='ml-0.5 h-5 w-5 fill-white text-white' />
            </div>
            <span className='absolute bottom-4 left-4 text-sm font-semibold text-white'>{reel.title}</span>
        </button>
    );
}

export function AgencyVideo() {
    const [activeReel, setActiveReel] = useState<Reel | null>(null);

    return (
        <section id='video' className='relative overflow-hidden py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='max-w-2xl'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Virtuo Video</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground text-4xl tracking-wide uppercase md:text-5xl'>
                        Cinematic Content That Converts
                    </CharacterReveal>
                    <p className='mt-4 max-w-xl text-lg text-white/80'>
                        Video production, reels, photography, and hospitality content — produced in house and built to
                        feed every channel we manage. Tap any reel to watch.
                    </p>
                </div>

                <div className='mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
                    {videoReels.map((reel, idx) => (
                        <BlurFade key={reel.title} delay={MOTION.stagger * idx} inView inViewMargin={MOTION.viewport.margin}>
                            <ReelCell reel={reel} onOpen={() => setActiveReel(reel)} />
                        </BlurFade>
                    ))}
                </div>
            </div>

            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {activeReel && <ReelPlayer reel={activeReel} onClose={() => setActiveReel(null)} />}
                    </AnimatePresence>,
                    document.body
                )}
        </section>
    );
}
