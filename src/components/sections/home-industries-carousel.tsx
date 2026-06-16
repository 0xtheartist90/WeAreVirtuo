'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { IndustryCard } from '@/components/ui/industry-card';
import type { IndustryItem } from '@/content/shared/industries';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const DRAG_THRESHOLD = 8;

interface Props {
    industries: IndustryItem[];
}

/** Variant C: Full-width horizontal scroll carousel */
export function IndustriesCarousel({ industries }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const dragRef = useRef({ startX: 0, scrollLeft: 0, dragging: false, hasDragged: false });

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
                const cards = container.querySelectorAll<HTMLElement>('[data-industry]');
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
    }, [industries]);

    const scrollToCard = useCallback((idx: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const cards = container.querySelectorAll<HTMLElement>('[data-industry]');
        cards[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

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
            scrollToCard(dir === 'left' ? Math.max(0, activeIdx - 1) : Math.min(industries.length - 1, activeIdx + 1));
        },
        [activeIdx, industries.length, scrollToCard]
    );

    return (
        <>
            <div className='relative'>
                {/* Edge fades */}
                <div className='from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent md:w-16' />
                <div className='from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l to-transparent md:w-16' />

                <div
                    ref={scrollRef}
                    className='flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pr-[calc(50vw-280px)] pb-4 pl-[calc(50vw-280px)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}>
                    {industries.map((industry, idx) => (
                        <div
                            key={industry.slug}
                            data-industry
                            className='w-[560px] shrink-0 snap-center'
                            style={{
                                transform: `scale(${idx === activeIdx ? 1 : 0.92})`,
                                opacity: idx === activeIdx ? 1 : 0.75,
                                transition: 'transform 0.4s ease, opacity 0.4s ease'
                            }}>
                            <IndustryCard industry={industry} aspectRatio='aspect-[16/10]' />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation + counter */}
            <div className='mx-auto mt-6 flex max-w-[var(--max-width-content)] items-center justify-between px-4 md:px-8'>
                <AnimatePresence mode='wait'>
                    <motion.p
                        key={activeIdx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className='text-sm text-white/70'>
                        <span className='text-accent font-mono text-xs'>{String(activeIdx + 1).padStart(2, '0')}</span>{' '}
                        {industries[activeIdx]?.name}
                    </motion.p>
                </AnimatePresence>
                <div className='flex gap-2'>
                    <button
                        onClick={() => nav('left')}
                        disabled={activeIdx === 0}
                        className='hover:border-accent/40 hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                        aria-label='Previous'>
                        <ChevronLeft className='h-4 w-4' />
                    </button>
                    <button
                        onClick={() => nav('right')}
                        disabled={activeIdx === industries.length - 1}
                        className='hover:border-accent/40 hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all disabled:opacity-20'
                        aria-label='Next'>
                        <ChevronRight className='h-4 w-4' />
                    </button>
                </div>
            </div>
        </>
    );
}
