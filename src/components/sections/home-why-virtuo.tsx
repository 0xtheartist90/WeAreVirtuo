'use client';

import { CharacterReveal } from '@/components/ui/character-reveal';

import { Award, Camera, Layers, MapPin } from 'lucide-react';

const differentiators = [
    {
        icon: Camera,
        title: 'Cinema-Grade Production',
        description:
            'RED & Sony cinema cameras, professional lighting, DaVinci Resolve color grading. Hollywood tools for your brand.',
        image: '/images/bts/cinematographer-red.jpg'
    },
    {
        icon: Layers,
        title: 'From Concept to Content',
        description: 'Strategy, production, post, and social delivery. One team, one vision, zero handoffs.',
        image: '/images/bts/full-production-set.jpg'
    },
    {
        icon: Award,
        title: '150+ Projects Delivered',
        description: "Restaurants, hotels, automotive, corporate. We've done this before — for brands like yours.",
        image: '/images/bts/cooking-show-setup.jpg'
    },
    {
        icon: MapPin,
        title: 'Toronto Born, Globally Minded',
        description: "Based in Toronto's creative district. Shooting across North America.",
        image: '/images/bts/commercial-stage.jpg'
    }
];

export function HomeWhyVirtuo() {
    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>The Difference</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        Why Virtuo
                    </CharacterReveal>
                </div>

                {/* 2x2 grid with BTS images */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {differentiators.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className='group relative min-h-[14rem] overflow-hidden rounded-2xl border border-white/[0.06] transition-colors duration-500 hover:border-white/15'>
                                {/* BTS background */}
                                <img
                                    src={item.image}
                                    alt=''
                                    aria-hidden='true'
                                    className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40' />

                                {/* Content */}
                                <div className='relative flex h-full flex-col justify-end p-6 md:p-8'>
                                    <div className='bg-accent/15 border-accent/25 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm'>
                                        <Icon className='text-accent h-6 w-6' />
                                    </div>
                                    <h3 className='text-foreground text-xl font-semibold'>{item.title}</h3>
                                    <p className='mt-2 max-w-md text-sm leading-relaxed text-white/80'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
