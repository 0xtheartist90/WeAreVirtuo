'use client';

import { useState } from 'react';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface FocusCard {
    title: string;
    subtitle?: string;
    label?: string;
    src: string;
    dataIndex?: number;
}

interface FocusCardsProps {
    cards: FocusCard[];
    className?: string;
    onCardClick?: (index: number) => void;
}

export function FocusCards({ cards, className, onCardClick }: FocusCardsProps) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
                className
            )}
        >
            {cards.map((card, idx) => (
                <motion.div
                    key={idx}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onCardClick?.(card.dataIndex ?? idx)}
                    className={cn(
                        'relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300',
                        hovered !== null && hovered !== idx && 'blur-sm scale-[0.98]'
                    )}
                >
                    <img
                        src={card.src}
                        alt={card.title}
                        className='absolute inset-0 h-full w-full object-cover transition-transform duration-500'
                        style={{
                            transform: hovered === idx ? 'scale(1.05)' : 'scale(1)',
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />
                    {/* Content */}
                    <div className='absolute inset-0 flex flex-col justify-end p-6'>
                        {card.label && (
                            <span className='mb-1 text-xs font-medium tracking-widest text-accent uppercase'>
                                {card.label}
                            </span>
                        )}
                        <h3 className='text-lg font-semibold text-white'>{card.title}</h3>
                        {card.subtitle && (
                            <p className='mt-1 text-sm text-white/70'>{card.subtitle}</p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
