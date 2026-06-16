'use client';

import { CharacterReveal } from '@/components/ui/character-reveal';
import industries from '@/content/shared/industries';

import { IndustriesBento } from './home-industries-bento';
import { IndustriesCarousel } from './home-industries-carousel';
import { IndustriesGrid } from './home-industries-grid';
import { IndustriesMasonry } from './home-industries-masonry';

/**
 * Set to true to show all 4 variants stacked for comparison.
 * Set to false + pick ACTIVE_VARIANT for production.
 */
const COMPARE_MODE = false;
const ACTIVE_VARIANT: 'grid' | 'bento' | 'carousel' | 'masonry' = 'masonry';

const variants = {
    grid: { Component: IndustriesGrid, label: 'Variant A — 4x2 Grid' },
    bento: { Component: IndustriesBento, label: 'Variant B — Bento Asymmetric' },
    carousel: { Component: IndustriesCarousel, label: 'Variant C — Horizontal Scroll' },
    masonry: { Component: IndustriesMasonry, label: 'Variant D — Staggered Masonry' }
} as const;

function SectionHeader() {
    return (
        <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
            <div className='mb-12 text-center'>
                <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>What We Do</p>
                <CharacterReveal
                    as='h2'
                    className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                    Industries We Serve
                </CharacterReveal>
                <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80'>
                    From intimate restaurants to global brands — cinematic video production tailored to your industry.
                </p>
            </div>
        </div>
    );
}

export function HomeIndustries() {
    if (COMPARE_MODE) {
        // Show all 4 variants stacked for Roy to compare
        return (
            <section id='industries' className='py-20 md:py-28'>
                <SectionHeader />

                {(Object.keys(variants) as (keyof typeof variants)[]).map((key) => {
                    const { Component, label } = variants[key];
                    const isCarousel = key === 'carousel';

                    return (
                        <div key={key} className='mb-20'>
                            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                                <p className='text-accent mb-6 border-b border-white/[0.06] pb-3 text-xs font-semibold tracking-widest uppercase'>
                                    {label}
                                </p>
                            </div>
                            {isCarousel ? (
                                <Component industries={industries} />
                            ) : (
                                <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                                    <Component industries={industries} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>
        );
    }

    // Production mode — single variant
    const { Component } = variants[ACTIVE_VARIANT];
    const isCarousel = ACTIVE_VARIANT === 'carousel';

    return (
        <section id='industries' className='py-20 md:py-28'>
            <SectionHeader />
            {isCarousel ? (
                <Component industries={industries} />
            ) : (
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                    <Component industries={industries} />
                </div>
            )}
        </section>
    );
}
