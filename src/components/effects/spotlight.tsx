'use client';

import { useCallback } from 'react';

import { cn } from '@/lib/utils';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    enabled?: boolean;
}

export function Spotlight({ children, className, enabled = true }: SpotlightProps) {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

    const background = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.06), transparent 40%)`;

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!enabled) return;
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [enabled, mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(-1000);
        mouseY.set(-1000);
    }, [mouseX, mouseY]);

    return (
        <div className={cn('relative', className)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {enabled && <motion.div className='pointer-events-none absolute inset-0 z-10' style={{ background }} />}
            {children}
        </div>
    );
}
