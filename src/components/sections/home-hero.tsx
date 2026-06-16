'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { videoUrl } from '@/lib/video';

import { ArrowRight, ChevronDown, Phone, Play } from 'lucide-react';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';

/* ─── Parallax portfolio cards for the hero rows ─── */
const heroCards = [
    // Row 1
    {
        title: 'Nome Izakaya',
        thumbnail: '/images/portfolio/nome.png',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    {
        title: 'Grayline Toronto',
        thumbnail: '/images/portfolio/grayline.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Full Production',
        thumbnail: '/images/bts/full-production-set.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4')
    },
    {
        title: 'Nightlife',
        thumbnail: '/images/bts/silhouette-setup.png',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Commercial',
        thumbnail: '/images/bts/commercial-stage.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    // Row 2
    {
        title: 'UFC Stance',
        thumbnail: '/images/portfolio/ufc-stance.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4')
    },
    {
        title: 'Food Content',
        thumbnail: '/images/portfolio/nome2.png',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Cinematography',
        thumbnail: '/images/bts/cinematographer-red.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    { title: 'Steadicam Op', thumbnail: '/images/bts/steadicam-operator.jpg' },
    { title: 'Studio', thumbnail: '/images/about/studio-wide.png' },
    // Row 3
    {
        title: 'ANIML Toronto',
        thumbnail: '/images/portfolio/nome3.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4')
    },
    {
        title: 'Cooking Show',
        thumbnail: '/images/bts/cooking-show-setup.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4')
    },
    {
        title: 'Portfolio',
        thumbnail: '/images/portfolio/portfolio-shot.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4')
    },
    { title: 'On Set', thumbnail: '/images/portfolio/sindic8wide.jpg' },
    { title: 'Jeff Han', thumbnail: '/images/about/jeff-hero.jpg' }
];

/* ─── Parallax Card ─── */
function ParallaxCard({ card, translate }: { card: (typeof heroCards)[0]; translate: MotionValue<number> }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);

    return (
        <motion.div
            style={{ x: translate, willChange: 'transform' }}
            whileHover={{ y: -20 }}
            onMouseEnter={() => {
                setHovering(true);
                if (card.videoSrc) videoRef.current?.play().catch(() => {});
            }}
            onMouseLeave={() => {
                setHovering(false);
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }}
            className='group/card relative h-72 w-[25rem] shrink-0 overflow-hidden rounded-xl md:h-96 md:w-[30rem]'>
            <img
                src={card.thumbnail}
                alt={card.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hovering && card.videoSrc ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
            />
            {card.videoSrc && (
                <video
                    ref={videoRef}
                    src={card.videoSrc}
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
            <div className='absolute inset-0 bg-black/10 transition-colors group-hover/card:bg-black/40' />
            <h2 className='absolute bottom-4 left-4 text-lg font-semibold text-white opacity-0 transition-opacity group-hover/card:opacity-100'>
                {card.title}
            </h2>
            {card.videoSrc && (
                <div className='absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover/card:opacity-100'>
                    <Play className='ml-0.5 h-4 w-4 fill-white text-white' />
                </div>
            )}
        </motion.div>
    );
}

/* ─── Main Hero ─── */
export function HomeHero() {
    const reducedMotion = useReducedMotion();
    const ref = useRef(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });

    // Parallax transforms
    const springConfig = { stiffness: 300, damping: 30 };
    const translateX = useTransform(scrollYProgress, [0, 1], [0, 800]);
    const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, -800]);
    const rotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);
    const rotateZ = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.2], [-600, 400]);

    const row1 = heroCards.slice(0, 5);
    const row2 = heroCards.slice(5, 10);
    const row3 = heroCards.slice(10, 15);

    // IntersectionObserver gate for scroll indicator
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setScrollIndicatorVisible(entry.isIntersecting), {
            rootMargin: '50px'
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className='relative flex h-[280vh] flex-col self-auto overflow-hidden antialiased [perspective:1000px] [transform-style:preserve-3d]'>
            {/* ── Video Background (fills first viewport) ── */}
            <div className='absolute inset-x-0 top-0 h-screen'>
                <video
                    src={videoUrl('videos/hero/virtuo-showreel.mp4')}
                    poster='/images/bts/full-production-set.jpg'
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='auto'
                    className='h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
            </div>

            {/* ── Hero Header Content ── */}
            <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-end px-4 pb-24 md:items-center md:px-8 md:pb-0'>
                <div className='w-full max-w-2xl'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>
                        Toronto&apos;s Premier Video Production Studio
                    </p>
                    <CharacterReveal
                        as='h1'
                        className='font-display text-foreground text-5xl leading-[0.95] tracking-wide uppercase md:text-7xl lg:text-8xl'>
                        Every Story Deserves Cinema
                    </CharacterReveal>
                    <p className='mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl'>
                        Cinematic video production for restaurants, hotels, corporate brands, and everything in between.
                    </p>

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
                        <a
                            href='#industries'
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            View Our Work
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </a>
                    </div>
                    <p className='text-accent mt-4 text-sm font-medium tracking-wide'>Currently booking Summer 2026</p>
                </div>
            </div>

            {/* ── Parallax Portfolio Rows ── */}
            {!reducedMotion && (
                <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className='mt-[-10vh]'>
                    <motion.div className='mb-16 flex flex-row-reverse space-x-16 space-x-reverse md:mb-20 md:space-x-20 md:space-x-reverse'>
                        {row1.map((card) => (
                            <ParallaxCard card={card} translate={translateX} key={card.title} />
                        ))}
                    </motion.div>
                    <motion.div className='mb-16 flex flex-row space-x-16 md:mb-20 md:space-x-20'>
                        {row2.map((card) => (
                            <ParallaxCard card={card} translate={translateXReverse} key={card.title} />
                        ))}
                    </motion.div>
                    <motion.div className='flex flex-row-reverse space-x-16 space-x-reverse md:space-x-20 md:space-x-reverse'>
                        {row3.map((card) => (
                            <ParallaxCard card={card} translate={translateX} key={card.title} />
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* Scroll indicator */}
            <div ref={scrollRef} className='absolute bottom-8 left-1/2 z-20 -translate-x-1/2'>
                {!reducedMotion && scrollIndicatorVisible && (
                    <motion.div
                        animate={{ opacity: 0.8, y: [0, 8, 0] }}
                        transition={{ y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } }}>
                        <ChevronDown className='h-8 w-8 text-white' />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
