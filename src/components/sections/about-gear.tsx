'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import type { GearItem } from '@/content/types';

import {
    Camera,
    ChevronLeft,
    ChevronRight,
    Clapperboard,
    Headphones,
    Lightbulb,
    MonitorPlay,
    Move3D
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Camera: Camera,
    Lenses: Camera,
    Lighting: Lightbulb,
    Stabilization: Move3D,
    Audio: Headphones,
    'Post-Production': MonitorPlay
};

const DRAG_THRESHOLD = 8;

interface AboutGearProps {
    gear: GearItem[];
}

export function AboutGear({ gear }: AboutGearProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [pad, setPad] = useState(0);
    const dragRef = useRef({ startX: 0, scrollLeft: 0, dragging: false, hasDragged: false });

    // Compute centering padding
    useEffect(() => {
        const measure = () => {
            const wrapper = wrapperRef.current;
            const container = scrollRef.current;
            if (!wrapper || !container) return;
            const card = container.querySelector<HTMLElement>('[data-gear]');
            if (!card) return;
            const p = Math.max(0, (wrapper.clientWidth - card.offsetWidth) / 2);
            setPad(p);
        };

        measure();
        const t = setTimeout(measure, 100);
        window.addEventListener('resize', measure);

        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(t);
        };
    }, [gear]);

    // Scroll-driven active detection
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let rafId: number;
        const update = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const cards = container.querySelectorAll<HTMLElement>('[data-gear]');
                let minDist = Infinity;
                let best = 0;
                cards.forEach((card, i) => {
                    const cr = card.getBoundingClientRect();
                    const dist = Math.abs(cr.left + cr.width / 2 - center);
                    if (dist < minDist) {
                        minDist = dist;
                        best = i;
                    }
                });
                setActiveIdx(best);
            });
        };

        container.addEventListener('scroll', update, { passive: true });
        const t = setTimeout(update, 200);

        return () => {
            container.removeEventListener('scroll', update);
            cancelAnimationFrame(rafId);
            clearTimeout(t);
        };
    }, [gear]);

    const scrollToCard = useCallback((idx: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const cards = container.querySelectorAll<HTMLElement>('[data-gear]');
        cards[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

    // Drag handlers
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
        if (Math.abs(e.clientX - d.startX) > DRAG_THRESHOLD) d.hasDragged = true;
        scrollRef.current.scrollLeft = d.scrollLeft - (e.clientX - d.startX) * 0.6;
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

    const nav = useCallback(
        (dir: 'left' | 'right') => {
            scrollToCard(dir === 'left' ? Math.max(0, activeIdx - 1) : Math.min(gear.length - 1, activeIdx + 1));
        },
        [activeIdx, gear.length, scrollToCard]
    );

    return (
        <section className='bg-background py-20 md:py-28'>
            {/* Header */}
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between'>
                    <div className='text-center md:text-left'>
                        <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Our Toolkit</p>
                        <CharacterReveal
                            as='h2'
                            className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                            Premium Gear
                        </CharacterReveal>
                        <p className='max-w-[var(--max-width-prose)] text-lg text-white/80'>
                            Professional equipment for professional results. Every project gets the right tool for the
                            job.
                        </p>
                    </div>
                    <div className='hidden items-center gap-2 md:flex'>
                        <button
                            onClick={() => nav('left')}
                            disabled={activeIdx === 0}
                            className='hover:border-accent/40 hover:text-accent flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                            aria-label='Previous'>
                            <ChevronLeft className='h-5 w-5' />
                        </button>
                        <button
                            onClick={() => nav('right')}
                            disabled={activeIdx === gear.length - 1}
                            className='hover:border-accent/40 hover:text-accent flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                            aria-label='Next'>
                            <ChevronRight className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Gear carousel */}
            <div ref={wrapperRef} className='relative mt-12'>
                <div className='from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent md:w-24' />
                <div className='from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent md:w-24' />

                <div
                    ref={scrollRef}
                    className='flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden'
                    style={{ paddingInline: `${pad}px` }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}>
                    {gear.map((item, idx) => {
                        const isActive = idx === activeIdx;
                        const Icon = categoryIcons[item.category] || Clapperboard;

                        return (
                            <div
                                key={item.name}
                                data-gear
                                className='w-[80vw] max-w-[380px] shrink-0 snap-center md:w-[340px]'
                                style={{
                                    transform: `scale(${isActive ? 1 : 0.92})`,
                                    opacity: isActive ? 1 : 0.75,
                                    transition: 'transform 0.4s ease, opacity 0.4s ease'
                                }}>
                                <div className='overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]'>
                                    {/* Image header */}
                                    {item.image && (
                                        <div className='relative aspect-[16/10] overflow-hidden'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                                            {/* Category badge on image */}
                                            <div className='absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm'>
                                                <Icon className='text-accent h-3.5 w-3.5' />
                                                <span className='text-[10px] font-semibold tracking-widest text-white/80 uppercase'>
                                                    {item.category}
                                                </span>
                                            </div>
                                            {/* Name overlay on image */}
                                            <div className='absolute right-4 bottom-3 left-4'>
                                                <h3 className='text-foreground text-lg font-semibold drop-shadow-lg'>
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className='p-5'>
                                        {/* Fallback header when no image */}
                                        {!item.image && (
                                            <>
                                                <div className='mb-4 flex items-center gap-3'>
                                                    <div className='bg-accent/10 border-accent/20 flex h-10 w-10 items-center justify-center rounded-lg border'>
                                                        <Icon className='text-accent h-5 w-5' />
                                                    </div>
                                                    <span className='text-accent text-[10px] font-semibold tracking-widest uppercase'>
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <h3 className='text-foreground text-xl font-semibold'>{item.name}</h3>
                                            </>
                                        )}

                                        {/* Specs badge */}
                                        <div className='mt-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2'>
                                            <p className='font-mono text-[11px] tracking-wide text-white/40'>
                                                {item.specs}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className='mt-3 text-sm leading-relaxed text-white/80'>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Active indicator + mobile nav */}
            <div className='mx-auto mt-6 flex max-w-[var(--max-width-content)] items-center justify-between px-4 md:px-8'>
                <AnimatePresence mode='wait'>
                    <motion.p
                        key={activeIdx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className='text-muted-foreground text-sm'>
                        <span className='text-accent font-mono text-xs'>{String(activeIdx + 1).padStart(2, '0')}</span>{' '}
                        {gear[activeIdx]?.name}
                    </motion.p>
                </AnimatePresence>
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
                        disabled={activeIdx === gear.length - 1}
                        className='hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                        aria-label='Next'>
                        <ChevronRight className='h-4 w-4' />
                    </button>
                </div>
            </div>
        </section>
    );
}
