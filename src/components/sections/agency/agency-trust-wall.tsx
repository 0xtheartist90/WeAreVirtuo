'use client';

import { useState } from 'react';

import type { Logo } from '@/content/types';

function LogoCell({ logo }: { logo: Logo }) {
    const [failed, setFailed] = useState(false);

    return (
        <div className='tile-border with-dots relative aspect-[202/110]'>
            <div className='grid h-full w-full place-items-center px-3'>
                {!failed ? (
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        loading='lazy'
                        className='max-h-9 max-w-[140px] object-contain opacity-70 brightness-0 grayscale invert transition-opacity duration-300 hover:opacity-100'
                        onError={() => setFailed(true)}
                    />
                ) : (
                    <span className='font-display text-center text-sm tracking-wider text-white/55 uppercase'>
                        {logo.name}
                    </span>
                )}
            </div>
        </div>
    );
}

export function AgencyTrustWall({ logos }: { logos: Logo[] }) {
    return (
        <section className='py-12 md:py-16'>
            <div className='grid-layout'>
                <p className='col-span-full mb-4 text-sm font-medium tracking-widest text-white/55 uppercase lg:col-start-2'>
                    Trusted by Leading Brands
                </p>
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {logos.map((logo) => (
                            <LogoCell key={logo.name} logo={logo} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
