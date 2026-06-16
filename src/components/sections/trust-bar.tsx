'use client';

import { useState } from 'react';

import { Marquee } from '@/components/ui/marquee';
import type { Logo } from '@/content/types';

interface TrustBarProps {
    logos: Logo[];
}

function LogoItem({ logo }: { logo: Logo }) {
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <div className='mx-6 flex items-center justify-center md:mx-10'>
            {!imgFailed ? (
                <img
                    src={logo.src}
                    alt={logo.alt}
                    className='h-8 max-w-[120px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 md:max-w-[160px]'
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <span className='font-display text-muted-foreground/50 whitespace-nowrap text-base tracking-wider uppercase transition-all duration-300 hover:text-foreground md:text-lg'>
                    {logo.name}
                </span>
            )}
        </div>
    );
}

export function TrustBar({ logos }: TrustBarProps) {
    // Double the logos for a fuller marquee
    const displayLogos = [...logos, ...logos];

    return (
        <section className='border-border/50 border-y py-6'>
            <p className='text-muted-foreground mb-4 text-center text-xs font-medium tracking-widest uppercase'>
                Trusted by leading brands
            </p>
            <Marquee pauseOnHover className='[--duration:30s]'>
                {displayLogos.map((logo, idx) => (
                    <LogoItem key={`${logo.name}-${idx}`} logo={logo} />
                ))}
            </Marquee>
        </section>
    );
}
