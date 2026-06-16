'use client';

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { CharacterReveal } from '@/components/ui/character-reveal';
import type { Testimonial } from '@/content/types';

interface HomeTestimonialsProps {
    testimonials: Testimonial[];
}

export function HomeTestimonials({ testimonials }: HomeTestimonialsProps) {
    if (testimonials.length === 0) return null;

    const mapped = testimonials.map((t) => ({
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
                <div className='mb-12 text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Client Stories</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        What Our Clients Say
                    </CharacterReveal>
                </div>
                <AnimatedTestimonials testimonials={mapped} autoplay />
            </div>
        </div>
    );
}
