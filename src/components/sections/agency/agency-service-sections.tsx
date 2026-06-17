'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { NumberTicker } from '@/components/ui/number-ticker';
import { serviceGlyphs } from '@/components/ui/service-glyphs';
import { type ServiceDetailItem, servicesDetail, videoReels } from '@/content/agency';
import { videoUrl } from '@/lib/video';

import { ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { createPortal } from 'react-dom';

type Reel = { title: string; image: string; video: string };

const EASE = [0.22, 1, 0.36, 1] as const;

function parseStat(v: string): { num: number; suffix: string } | null {
    const m = v.match(/^([\d,]+)(.*)$/);
    if (!m) return null;

    return { num: parseInt(m[1].replace(/,/g, ''), 10), suffix: m[2] };
}

/* ─────────── Reel player + cell ─────────── */
function ReelPlayer({ reel, onClose }: { reel: Reel; onClose: () => void }) {
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
                <img src={reel.image} alt='' aria-hidden='true' className='h-full w-full scale-110 object-cover blur-3xl' />
                <div className='absolute inset-0 bg-black/80' />
            </div>
            <div className='relative flex h-full items-center justify-center px-4'>
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
                        <X className='h-4 w-4' />
                    </button>
                    <span className='absolute -top-12 left-0 text-lg font-semibold text-white'>{reel.title}</span>
                    <div className='relative aspect-[9/16] overflow-hidden border border-white/10 bg-black shadow-2xl'>
                        <video ref={videoRef} src={videoUrl(reel.video)} autoPlay loop playsInline className='size-full cursor-pointer object-cover' onClick={togglePlay} />
                        <div className='absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pt-12 pb-4'>
                            <button onClick={togglePlay} className='rounded-full p-2 text-white hover:bg-white/10' aria-label={playing ? 'Pause' : 'Play'}>
                                {playing ? <Pause className='h-5 w-5 fill-white' /> : <Play className='ml-0.5 h-5 w-5 fill-white' />}
                            </button>
                            <button onClick={toggleMute} className='rounded-full p-2 text-white hover:bg-white/10' aria-label={muted ? 'Unmute' : 'Mute'}>
                                {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

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
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className='group relative block aspect-[9/12] w-full overflow-hidden border border-white/[0.08]'
            aria-label={`Play ${reel.title} reel`}>
            <img
                src={reel.image}
                alt={reel.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hovering ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
            />
            <video
                ref={videoRef}
                src={videoUrl(reel.video)}
                muted
                loop
                playsInline
                preload='none'
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />
            <div className='border-accent/30 bg-accent/10 absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-transform group-hover:scale-110'>
                <Play className='ml-0.5 h-4 w-4 fill-white text-white' />
            </div>
            <span className='absolute bottom-3 left-3 text-xs font-semibold text-white'>{reel.title}</span>
        </button>
    );
}

/* ─────────── One service section (full viewport, alternating bg) ─────────── */
function ServiceSection({
    s,
    i,
    total,
    onOpenReel
}: {
    s: ServiceDetailItem;
    i: number;
    total: number;
    onOpenReel: (r: Reel) => void;
}) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const ghostY = useTransform(scrollYProgress, [0, 1], ['14%', '-14%']);

    const Glyph = serviceGlyphs[i % serviceGlyphs.length];
    const isVideo = s.kind === 'reels';
    const reversed = i % 2 === 1; // 02 & 04 are reversed → white
    const light = reversed;
    const stat = s.stat ? parseStat(s.stat.value) : null;
    const num = String(i + 1).padStart(2, '0');

    const c = light
        ? {
              section: 'bg-white text-neutral-900',
              ghost: 'text-black/[0.04]',
              title: 'text-neutral-900',
              tagline: 'text-neutral-600',
              desc: 'text-neutral-700',
              divide: 'border-neutral-200',
              capTitle: 'text-neutral-900',
              capDetail: 'text-neutral-600',
              capHover: 'hover:bg-black/[0.03]',
              indexMuted: 'text-neutral-400',
              exploreBtn: 'border-neutral-300 text-neutral-900 hover:border-neutral-500 hover:bg-black/[0.04]',
              statLabel: 'text-neutral-500',
              tickerCls: '!text-neutral-900'
          }
        : {
              section: 'bg-background text-foreground',
              ghost: 'text-white/[0.025]',
              title: 'text-foreground',
              tagline: 'text-white/70',
              desc: 'text-white/75',
              divide: 'border-white/10',
              capTitle: 'text-foreground',
              capDetail: 'text-white/55',
              capHover: 'hover:bg-white/[0.02]',
              indexMuted: 'text-white/40',
              exploreBtn: 'border-white/25 text-white hover:border-white/60 hover:bg-white/5',
              statLabel: 'text-white/45',
              tickerCls: ''
          };

    return (
        <section
            ref={ref}
            id={isVideo ? 'video' : undefined}
            className={`relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden py-24 md:py-28 ${c.section}`}>
            {/* Giant ghost number — parallax */}
            <motion.span
                aria-hidden='true'
                style={{ y: ghostY }}
                className={`font-display pointer-events-none absolute -top-[3vw] z-0 hidden text-[24vw] leading-none select-none lg:block ${c.ghost} ${
                    reversed ? 'right-[-1vw]' : 'left-[-1vw]'
                }`}>
                {num}
            </motion.span>

            <div className='relative z-[1] grid-layout w-full items-center'>
                {/* Content column */}
                <div className={`col-span-full mb-10 lg:col-span-5 lg:mb-0 lg:self-center ${reversed ? 'lg:col-start-8' : 'lg:col-start-2'}`}>
                    {/* index / total */}
                    <div className='mb-5 flex items-center gap-3 font-mono text-[11px] tracking-widest'>
                        <span className='text-accent'>{num}</span>
                        <span className={`h-px w-8 ${light ? 'bg-neutral-300' : 'bg-white/20'}`} />
                        <span className={c.indexMuted}>{String(total).padStart(2, '0')}</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ type: 'spring', stiffness: 180, damping: 15 }}>
                        <Glyph className='text-accent h-12 w-12 md:h-16 md:w-16' />
                    </motion.div>

                    <motion.h2
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                        className={`font-display mt-4 text-5xl leading-[0.9] tracking-tight uppercase md:text-6xl ${c.title}`}>
                        {s.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`mt-4 max-w-md text-base leading-relaxed ${c.tagline}`}>
                        {s.tagline}
                    </motion.p>

                    {/* quick capability tags — selector hint, detail lives on the service page */}
                    <div className='mt-6 flex flex-wrap gap-1.5'>
                        {s.capabilities.slice(0, 4).map((cap) => (
                            <span
                                key={cap.title}
                                className={`px-1.5 py-0.5 text-xs ${light ? 'bg-neutral-900/[0.06] text-neutral-700' : 'bg-secondary text-foreground'}`}>
                                {cap.title}
                            </span>
                        ))}
                    </div>

                    {/* explore + stat */}
                    <div className='mt-7 flex flex-wrap items-center gap-x-10 gap-y-5'>
                        <Link
                            href={s.href}
                            className={`glitch-hover inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors ${c.exploreBtn}`}>
                            {isVideo ? 'See Our Work' : `Explore ${s.title.split(' ')[0]}`}
                            <ArrowUpRight className='h-4 w-4' />
                        </Link>
                        {s.stat && (
                            <div>
                                <div className={`font-display text-3xl md:text-4xl ${c.title}`}>
                                    {stat ? (
                                        <>
                                            <NumberTicker value={stat.num} className={c.tickerCls} />
                                            <span className='text-accent'>{stat.suffix}</span>
                                        </>
                                    ) : (
                                        s.stat.value
                                    )}
                                </div>
                                <p className={`mt-0.5 font-mono text-[10px] tracking-widest uppercase ${c.statLabel}`}>
                                    {s.stat.label}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Media column — big image / big reels */}
                <div className={`col-span-full lg:col-span-6 lg:self-center ${reversed ? 'lg:col-start-1' : 'lg:col-start-7'}`}>
                    {isVideo ? (
                        <div className='grid grid-cols-2 gap-3 md:gap-4'>
                            {videoReels.map((reel, idx) => (
                                <motion.div
                                    key={reel.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.5, ease: EASE, delay: idx * 0.08 }}>
                                    <ReelCell reel={reel} onOpen={() => onOpenReel(reel)} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        s.image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 1.06 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, ease: EASE }}
                                className='relative overflow-hidden'>
                                <img
                                    src={s.image}
                                    alt={s.title}
                                    className='h-[52vh] w-full object-cover md:h-[64vh]'
                                />
                                <div className='absolute inset-0 ring-1 ring-inset ring-black/10' />
                                <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent' />
                                <span className='absolute bottom-4 left-4 font-mono text-[11px] tracking-widest text-white/90 uppercase'>
                                    {s.title}
                                </span>
                                {/* corner accent */}
                                <span className='border-accent absolute top-3 left-3 h-5 w-5 border-t border-l' />
                                <span className='border-accent absolute right-3 bottom-3 h-5 w-5 border-r border-b' />
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export function AgencyServiceSections() {
    const [activeReel, setActiveReel] = useState<Reel | null>(null);

    return (
        <>
            {servicesDetail.map((s, i) => (
                <ServiceSection key={s.key} s={s} i={i} total={servicesDetail.length} onOpenReel={setActiveReel} />
            ))}

            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>{activeReel && <ReelPlayer reel={activeReel} onClose={() => setActiveReel(null)} />}</AnimatePresence>,
                    document.body
                )}
        </>
    );
}
