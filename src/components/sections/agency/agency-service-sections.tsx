'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import { serviceGlyphs } from '@/components/ui/service-glyphs';
import { type ServiceDetailItem, servicesDetail, videoReels } from '@/content/agency';
import { videoUrl } from '@/lib/video';

import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURED_REEL = videoReels[0];

function ServiceTile({ s, i }: { s: ServiceDetailItem; i: number }) {
    const Glyph = serviceGlyphs[i % serviceGlyphs.length];
    const isVideo = s.kind === 'reels';
    const href = isVideo ? '/portfolio' : s.href;
    const img = isVideo ? FEATURED_REEL.image : s.image;

    const videoRef = useRef<HTMLVideoElement>(null);
    const [hover, setHover] = useState(false);

    const onEnter = () => {
        setHover(true);
        if (isVideo) videoRef.current?.play().catch(() => {});
    };
    const onLeave = () => {
        setHover(false);
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}>
            <Link
                href={href}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className='hover-lift group relative block aspect-[16/10] overflow-hidden border border-white/10 hover:border-accent/40'>
                {img && (
                    <img
                        src={img}
                        alt={s.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] ${
                            isVideo && hover ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                )}
                {isVideo && (
                    <video
                        ref={videoRef}
                        src={videoUrl(FEATURED_REEL.video)}
                        muted
                        loop
                        playsInline
                        preload='none'
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hover ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40' />

                {/* top row */}
                <div className='relative z-[2] flex items-start justify-between p-5'>
                    <div className='flex items-center gap-3'>
                        <Glyph className='h-8 w-8 text-white md:h-10 md:w-10' />
                        <span className='text-accent font-mono text-xs'>/{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {isVideo ? (
                        <span className='border-accent/40 bg-accent/15 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm'>
                            <Play className='ml-0.5 h-4 w-4 fill-white text-white' />
                        </span>
                    ) : (
                        <ArrowUpRight className='h-6 w-6 text-white opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100' />
                    )}
                </div>

                {/* bottom content */}
                <div className='absolute inset-x-0 bottom-0 z-[2] p-5 md:p-6'>
                    <h3 className='font-display group-hover:text-accent text-3xl leading-[0.95] tracking-tight text-white uppercase transition-colors md:text-4xl'>
                        {s.title}
                    </h3>
                    <p className='mt-1.5 max-w-sm text-sm text-white/70'>{s.tagline}</p>
                    <div className='mt-3 flex flex-wrap gap-1.5'>
                        {s.capabilities.slice(0, 3).map((cap) => (
                            <span key={cap.title} className='bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80'>
                                {cap.title}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function AgencyServiceSections() {
    return (
        <section className='pt-6 pb-14 md:pb-20'>
            <div className='grid-layout'>
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        {servicesDetail.map((s, i) => (
                            <ServiceTile key={s.key} s={s} i={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
