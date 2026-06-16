'use client';

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { CharacterReveal } from '@/components/ui/character-reveal';
import type { Testimonial } from '@/content/types';

interface AboutTestimonialsProps {
    testimonials: Testimonial[];
}

export function AboutTestimonials({ testimonials }: AboutTestimonialsProps) {
    if (testimonials.length === 0) return null;

    const mapped = testimonials.map((t, idx) => ({
        quote: t.quote,
        name: t.name,
        designation: `${t.title}, ${t.company}`,
        src:
            t.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=DC2626&color=fff&size=200&bold=true`
    }));

    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Header */}
                <div className='mb-12 text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Client Stories</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        Trusted by Industry Leaders
                    </CharacterReveal>
                    <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80 md:mx-0'>
                        Every project builds a relationship. Here&apos;s what our partners have to say.
                    </p>
                </div>

                {/* Animated Testimonials */}
                <AnimatedTestimonials testimonials={mapped} autoplay />
            </div>
        </div>
    );
}
