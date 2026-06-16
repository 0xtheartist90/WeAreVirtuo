'use client';

import Link from 'next/link';

import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { type AgencyPillar, agencyPillars } from '@/content/agency';
import { MOTION } from '@/lib/motion';

import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

function PillarBlock({ pillar, index }: { pillar: AgencyPillar; index: number }) {
    const reversed = index % 2 === 1;
    const featured = index === 0;

    return (
        <BlurFade inView inViewMargin={MOTION.viewport.margin} className='w-full'>
            <div
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    reversed ? 'lg:[direction:rtl]' : ''
                }`}>
                {/* Media */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className='relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] [direction:ltr]'>
                    <img src={pillar.image} alt={pillar.title} className='h-full w-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                    <span className='absolute top-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80 uppercase backdrop-blur-sm'>
                        {pillar.eyebrow}
                    </span>
                    {featured && <BorderBeam duration={12} colorFrom='#DC2626' colorTo='rgba(255,255,255,0.3)' />}
                </motion.div>

                {/* Copy */}
                <div className='[direction:ltr]'>
                    <CharacterReveal
                        as='h3'
                        className='font-display text-foreground text-3xl tracking-wide uppercase md:text-4xl lg:text-5xl'>
                        {pillar.title}
                    </CharacterReveal>
                    <p className='mt-4 max-w-xl text-lg text-white/80'>{pillar.description}</p>

                    <ul className='mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
                        {pillar.points.map((point) => (
                            <li key={point} className='flex items-start gap-2.5 text-sm text-white/75'>
                                <span className='border-accent/20 bg-accent/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border'>
                                    <Check className='text-accent h-3 w-3' />
                                </span>
                                {point}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href={pillar.href}
                        className='group text-accent hover:text-accent mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase'>
                        {pillar.cta}
                        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </Link>
                </div>
            </div>
        </BlurFade>
    );
}

export function AgencyPillars() {
    return (
        <section id='services' className='relative py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='mb-16 text-center md:text-left'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>What We Do</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground text-4xl tracking-wide uppercase md:text-5xl'>
                        One Team. The Whole Ecosystem.
                    </CharacterReveal>
                    <p className='mx-auto mt-4 max-w-2xl text-lg text-white/80 md:mx-0'>
                        Marketing, websites, and visual production — built to work together, managed under one roof.
                    </p>
                </div>

                <div className='space-y-20 md:space-y-28'>
                    {agencyPillars.map((pillar, idx) => (
                        <PillarBlock key={pillar.key} pillar={pillar} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
