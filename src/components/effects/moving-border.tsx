'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'motion/react';

interface MovingBorderProps {
    children: React.ReactNode;
    duration?: number;
    className?: string;
    containerClassName?: string;
    borderClassName?: string;
    as?: React.ElementType;
}

export function MovingBorder({
    children,
    duration = 2000,
    className,
    containerClassName,
    borderClassName,
    as: Component = 'div'
}: MovingBorderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGRectElement>(null);
    const progress = useMotionValue(0);
    const [isVisible, setIsVisible] = useState(false);

    // Only animate when visible in viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            rootMargin: '100px'
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    useAnimationFrame((time) => {
        if (!isVisible) return;
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMs = length / duration;
            progress.set((time * pxPerMs) % length);
        }
    });

    const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
    const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);
    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <div
            ref={containerRef}
            className={cn('relative overflow-hidden rounded-xl bg-transparent p-[1px]', containerClassName)}>
            <div className='absolute inset-0' style={{ borderRadius: 'inherit' }}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    preserveAspectRatio='none'
                    className='absolute h-full w-full'
                    width='100%'
                    height='100%'>
                    <rect fill='none' width='100%' height='100%' rx='12' ry='12' ref={pathRef} />
                </svg>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'inline-block',
                        transform
                    }}
                    className={cn('h-20 w-20 rounded-full opacity-[0.8]', borderClassName)}>
                    <div className='h-full w-full rounded-full bg-[radial-gradient(var(--accent)_40%,transparent_60%)]' />
                </motion.div>
            </div>
            <div className={cn('bg-background relative z-10 rounded-[inherit]', className)}>{children}</div>
        </div>
    );
}
