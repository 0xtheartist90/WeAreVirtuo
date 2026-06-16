'use client';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { MagicCard } from '@/components/ui/magic-card';

const clients = [
    { name: 'Nome Izakaya', logo: '/images/logos/nome-izakaya.png', location: 'Toronto', category: 'Restaurant' },
    { name: 'Hyundai Canada', logo: '/images/logos/hyundai.svg', location: 'National', category: 'Automotive' },
    { name: 'Mercedes-Benz', logo: '/images/logos/mercedes-benz.svg', location: 'Global', category: 'Automotive' },
    {
        name: 'INK Entertainment',
        logo: '/images/logos/ink-entertainment.png',
        location: 'Toronto',
        category: 'Nightlife'
    },
    {
        name: 'The Hazelton Hotel',
        logo: '/images/logos/hazelton-logo-full.png',
        location: 'Toronto',
        category: 'Hospitality'
    },
    { name: 'SpiderTech', logo: '/images/logos/spidertech.png', location: 'Toronto', category: 'Sports' },
    { name: 'Shangri-La', logo: '/images/logos/shangri-la.png', location: 'Vancouver', category: 'Hospitality' },
    { name: 'Grayline Toronto', logo: '/images/logos/grayline.svg', location: 'Toronto', category: 'Tourism' },
    { name: 'Stance', logo: '/images/logos/stance-collect.png', location: 'Toronto', category: 'UFC / MMA' },
    {
        name: 'Pritty Landscapes',
        logo: '/images/logos/pritty-landscapes.png',
        location: 'Toronto',
        category: 'Commercial'
    }
];

export function AboutClients() {
    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Our Clients</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        Trusted by the Best
                    </CharacterReveal>
                    <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80'>
                        From Toronto restaurants to global automotive brands — we deliver cinematic quality at every
                        scale.
                    </p>
                </div>

                {/* Client grid */}
                <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
                    {clients.map((client) => (
                        <MagicCard key={client.name} className='rounded-xl' gradientSize={200}>
                            <div className='group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] p-4 transition-all duration-500 hover:border-white/15 md:h-36'>
                                {/* Logo */}
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className='h-10 max-w-[120px] object-contain opacity-60 transition-all duration-500 group-hover:opacity-100 md:h-12'
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                                {/* Hover reveal — category + location */}
                                <div className='absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-3 py-2.5 transition-transform duration-300 group-hover:translate-y-0'>
                                    <p className='text-center text-[10px] font-medium tracking-widest text-white/90 uppercase'>
                                        {client.name}
                                    </p>
                                    <p className='text-accent text-center text-[9px] tracking-wider'>
                                        {client.category} &middot; {client.location}
                                    </p>
                                </div>
                            </div>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
