'use client';

import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
    gradientSize?: number;
}

export function MagicCard({
    children,
    className,
    gradientColor = 'rgba(220, 38, 38, 0.15)',
    gradientSize = 250
}: MagicCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    return (
        <div
            ref={ref}
            className={cn('relative', className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}>
            <div
                className='pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-500'
                style={{
                    opacity: visible ? 1 : 0,
                    background: `radial-gradient(${gradientSize}px circle at ${pos.x}px ${pos.y}px, ${gradientColor}, transparent 70%)`
                }}
            />
            {children}
        </div>
    );
}
