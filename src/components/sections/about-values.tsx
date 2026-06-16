'use client';

import { BorderBeam } from '@/components/ui/border-beam';
import { CharacterReveal } from '@/components/ui/character-reveal';
import type { StudioValue } from '@/content/types';

import { Aperture, BookOpen, Handshake, MapPin, ScanEye } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Aperture,
    BookOpen,
    Handshake,
    ScanEye,
    MapPin
};

interface AboutValuesProps {
    values: StudioValue[];
}

export function AboutValues({ values }: AboutValuesProps) {
    const featured = values.find((v) => v.featured);
    const standard = values.filter((v) => !v.featured);

    return (
        <section className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>What We Believe</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        The Virtuo Code
                    </CharacterReveal>
                </div>

                {/* Bento grid */}
                <div className='mt-12 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3'>
                    {/* Featured card */}
                    {featured && (
                        <div className='relative min-h-[20rem] overflow-hidden rounded-2xl border border-white/[0.06] md:col-span-2 md:row-span-2 md:h-full md:min-h-0'>
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className='absolute inset-0 h-full w-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
                            <div className='relative flex h-full flex-col justify-end p-6 md:p-8'>
                                <span className='text-accent mb-2 text-xs font-semibold tracking-widest uppercase'>
                                    Core Principle
                                </span>
                                <h3 className='text-foreground text-2xl font-semibold md:text-3xl'>{featured.title}</h3>
                                <p className='mt-2 max-w-md text-sm leading-relaxed text-white/80 md:text-base'>
                                    {featured.description}
                                </p>
                            </div>
                            <BorderBeam duration={8} />
                        </div>
                    )}

                    {/* Standard value cards */}
                    {standard.map((value) => {
                        const Icon = iconMap[value.icon];

                        return (
                            <div
                                key={value.title}
                                className='group relative h-full overflow-hidden rounded-2xl border border-white/[0.06]'>
                                {value.image && (
                                    <>
                                        <img
                                            src={value.image}
                                            alt={value.title}
                                            className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40' />
                                    </>
                                )}
                                <div className='relative flex h-full flex-col justify-end p-5'>
                                    {Icon && (
                                        <div className='bg-accent/15 border-accent/25 mb-3 flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm'>
                                            <Icon className='text-accent h-4 w-4' />
                                        </div>
                                    )}
                                    <h3 className='text-foreground text-lg font-semibold'>{value.title}</h3>
                                    <p className='mt-1.5 text-sm leading-relaxed text-white/80'>{value.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
