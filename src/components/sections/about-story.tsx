'use client';

import { useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import type { StoryChapter } from '@/content/types';

import { motion, useScroll, useTransform } from 'motion/react';

interface AboutStoryProps {
    chapters: StoryChapter[];
}

export function AboutStory({ chapters }: AboutStoryProps) {
    return (
        <section id='our-story' className='py-20 md:py-28'>
            {/* Header */}
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>Our Story</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        The Story Behind the Studio
                    </CharacterReveal>
                </div>
            </div>

            {/* Story chapters */}
            <div className='mt-16'>
                {chapters.map((chapter, idx) => (
                    <ChapterBlock
                        key={chapter.title}
                        chapter={chapter}
                        index={idx}
                        isLast={idx === chapters.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}

function ChapterBlock({ chapter, index, isLast }: { chapter: StoryChapter; index: number; isLast: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        setIsDesktop(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mq.addEventListener('change', handler);

        return () => mq.removeEventListener('change', handler);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const imageY = useTransform(scrollYProgress, [0, 1], isDesktop ? ['5%', '-5%'] : ['0%', '0%']);
    const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isDesktop ? [0.95, 1, 1, 0.95] : [1, 1, 1, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], isDesktop ? [0, 1, 1, 0] : [1, 1, 1, 1]);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8 ${!isLast ? 'mb-16 md:mb-24' : ''}`}>
            <div
                className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                {/* Image side */}
                <motion.div className='w-full md:w-1/2' style={{ y: imageY, scale: imageScale }}>
                    <div className='relative overflow-hidden rounded-2xl border border-white/[0.06]'>
                        <img src={chapter.image} alt={chapter.title} className='aspect-[4/3] w-full object-cover' />
                        <div className='pointer-events-none absolute inset-x-0 top-0 h-[4%] bg-gradient-to-b from-black/40 to-transparent' />
                        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[4%] bg-gradient-to-t from-black/40 to-transparent' />
                        <span className='absolute top-4 left-5 font-mono text-5xl font-bold text-white/[0.06] md:text-7xl'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                </motion.div>

                {/* Text side */}
                <motion.div className='w-full md:w-1/2' style={{ opacity: contentOpacity }}>
                    <div className='mx-auto max-w-lg text-center md:mx-0 md:text-left'>
                        <span className='text-accent font-mono text-xs font-semibold tracking-widest'>
                            Chapter {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className='font-display text-foreground mt-2 text-2xl tracking-wide uppercase md:text-3xl'>
                            {chapter.title}
                        </h3>
                        <div className='bg-accent mx-auto mt-4 h-px w-12 md:mx-0' />
                        <p className='mt-6 text-base leading-relaxed text-white/80 md:text-lg'>{chapter.body}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
