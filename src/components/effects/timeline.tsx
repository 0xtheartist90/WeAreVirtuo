'use client';

import { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

interface TimelineEntry {
    title: React.ReactNode;
    content: React.ReactNode;
}

interface TimelineProps {
    data: TimelineEntry[];
    className?: string;
}

export function Timeline({ data, className }: TimelineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 10%', 'end 50%'],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <div ref={ref} className='relative pb-20'>
                {data.map((item, idx) => (
                    <div key={idx} className='flex justify-start pt-10 md:gap-10 md:pt-24'>
                        {/* Left: sticky title */}
                        <div className='sticky top-40 z-40 flex flex-col items-center self-start md:w-1/3 md:flex-row'>
                            <div className='absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3'>
                                <div className='h-4 w-4 rounded-full border-2 border-accent bg-background' />
                            </div>
                            <h3 className='hidden pl-20 text-xl font-bold text-foreground md:block'>
                                {item.title}
                            </h3>
                        </div>
                        {/* Right: content */}
                        <div className='relative w-full pl-20 pr-4 md:pl-4'>
                            <h3 className='mb-4 block text-left text-2xl font-bold text-foreground md:hidden'>
                                {item.title}
                            </h3>
                            {item.content}
                        </div>
                    </div>
                ))}
                {/* Beam line */}
                <div
                    style={{ height: height + 'px' }}
                    className='absolute left-8 top-0 w-[2px] overflow-hidden bg-border md:left-8'
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className='absolute inset-x-0 top-0 w-full rounded-full bg-gradient-to-t from-accent via-accent/50 to-transparent'
                    />
                </div>
            </div>
        </div>
    );
}
