'use client';

import { useEffect, useRef } from 'react';

import { DURATION, LUXURY_EASE, STAGGER, ScrollTrigger, gsap } from '@/lib/gsap-setup';

/**
 * CharacterReveal — The ONE signature text animation.
 *
 * Each word wrapped in overflow-hidden container, inner span slides up
 * from below with luxury easing. Triggered on scroll into view.
 *
 * Usage: <CharacterReveal as="h2" className="...">Your Title Here</CharacterReveal>
 */
interface CharacterRevealProps {
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    children: string;
    delay?: number;
    /** Custom scroll trigger start position */
    start?: string;
}

export function CharacterReveal({
    as: Tag = 'h2',
    className = '',
    children,
    delay = 0,
    start = 'top 85%'
}: CharacterRevealProps) {
    const containerRef = useRef<HTMLElement>(null);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const words = children.split(' ');

    useEffect(() => {
        const container = containerRef.current;
        const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
        if (!container || wordEls.length === 0) return;

        gsap.set(wordEls, { y: '110%' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start,
                toggleActions: 'play none none none'
            },
            delay
        });

        tl.to(wordEls, {
            y: '0%',
            duration: DURATION.reveal,
            ease: LUXURY_EASE,
            stagger: STAGGER.words
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll()
                .filter((st) => st.trigger === container)
                .forEach((st) => st.kill());
        };
    }, [delay, start]);

    return (
        <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
            {words.map((word, i) => (
                <span key={i} className='inline-block overflow-hidden align-bottom' style={{ paddingBottom: '0.1em' }}>
                    <span
                        ref={(el) => {
                            wordsRef.current[i] = el;
                        }}
                        className='inline-block'>
                        {word}
                    </span>
                    {i < words.length - 1 && <span className='inline-block w-[0.3em]' />}
                </span>
            ))}
        </Tag>
    );
}
