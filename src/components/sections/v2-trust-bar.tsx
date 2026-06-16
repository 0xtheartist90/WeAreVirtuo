'use client';

import { useState } from 'react';

import { brandAnimatedR } from '@/components/ui/branded-text';
import { Marquee } from '@/components/ui/marquee';
import type { Logo } from '@/content/types';

import { motion } from 'motion/react';

interface V2TrustBarProps {
    logos: Logo[];
}

function LogoItem({ logo }: { logo: Logo }) {
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <div className='mx-8 flex items-center justify-center md:mx-12'>
            {!imgFailed ? (
                <img
                    src={logo.src}
                    alt={logo.alt}
                    className='h-9 max-w-[140px] object-contain opacity-75 brightness-0 grayscale invert transition-all duration-500 hover:opacity-100 md:h-11 md:max-w-[180px]'
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <span className='font-display text-lg tracking-wider whitespace-nowrap text-white/60 uppercase transition-all duration-500 hover:text-white md:text-xl'>
                    {logo.name}
                </span>
            )}
        </div>
    );
}

export function V2TrustBar({ logos }: V2TrustBarProps) {
    const displayLogos = [...logos, ...logos];

    return (
        <motion.section
            className='relative border-y border-white/10 py-8'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}>
            {/* Subtle gradient line accent at top */}
            <div className='via-accent/30 absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent' />

            <p className='mb-5 text-center text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase'>
                {brandAnimatedR("Trusted by Toronto's Best")}
            </p>
            <Marquee pauseOnHover className='[--duration:55s]'>
                {displayLogos.map((logo, idx) => (
                    <LogoItem key={`${logo.name}-${idx}`} logo={logo} />
                ))}
            </Marquee>

            {/* Subtle gradient line accent at bottom */}
            <div className='via-accent/30 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent' />
        </motion.section>
    );
}
