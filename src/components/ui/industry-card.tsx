'use client';

import { useCallback, useRef, useState } from 'react';

import Link from 'next/link';

import type { IndustryItem } from '@/content/shared/industries';

import { Play } from 'lucide-react';
import { motion } from 'motion/react';

interface IndustryCardProps {
    industry: IndustryItem;
    className?: string;
    aspectRatio?: string;
}

export function IndustryCard({ industry, className = '', aspectRatio = 'aspect-[16/10]' }: IndustryCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovering, setHovering] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setHovering(true);
        videoRef.current?.play().catch(() => {});
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    return (
        <Link href={industry.route} className={className}>
            <motion.div
                whileHover={{ y: -8 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] transition-colors duration-500 hover:border-white/15 ${aspectRatio}`}
                style={{ willChange: 'transform' }}>
                {/* Thumbnail */}
                <img
                    src={industry.thumbnail}
                    alt={industry.name}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hovering ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
                />

                {/* Video on hover */}
                <video
                    ref={videoRef}
                    src={industry.videoSrc}
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:via-black/10' />

                {/* Play icon */}
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm transition-all duration-500 ${hovering ? 'scale-110 border-red-500/30' : 'scale-100'}`}>
                        <Play className='ml-0.5 h-6 w-6 fill-white text-white' />
                    </div>
                </div>

                {/* Bottom content */}
                <div className='absolute right-0 bottom-0 left-0 p-5 md:p-6'>
                    <h3 className='font-display text-foreground text-xl tracking-wide uppercase md:text-2xl'>
                        {industry.name}
                    </h3>
                    <p className='mt-1 text-sm text-white/80'>{industry.tagline}</p>
                </div>

                {/* Cinematic letterbox bars */}
                <div className='pointer-events-none absolute inset-x-0 top-0 h-[4%] bg-gradient-to-b from-black/40 to-transparent' />
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[4%] bg-gradient-to-t from-black/40 to-transparent' />
            </motion.div>
        </Link>
    );
}
