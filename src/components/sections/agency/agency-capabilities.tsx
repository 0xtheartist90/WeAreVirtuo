'use client';

import Link from 'next/link';

import { BlurFade } from '@/components/ui/blur-fade';
import { type Capability, agencyCapabilities } from '@/content/agency';
import { MOTION } from '@/lib/motion';

import { ArrowUpRight } from 'lucide-react';

function CapabilityColumn({ cap, index }: { cap: Capability; index: number }) {
    const Title = (
        <span className='group inline-flex items-center gap-1.5'>
            {cap.title}
            <ArrowUpRight className='text-accent h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
        </span>
    );

    return (
        <BlurFade
            delay={MOTION.stagger * index}
            inView
            inViewMargin={MOTION.viewport.margin}
            className='flex flex-col gap-5 lg:col-span-3'>
            <h3 className='font-display text-foreground hover:text-accent text-2xl tracking-wide uppercase transition-colors'>
                {cap.external ? (
                    <a href={cap.href} target='_blank' rel='noopener noreferrer'>
                        {Title}
                    </a>
                ) : (
                    <Link href={cap.href}>{Title}</Link>
                )}
            </h3>
            <p className='text-sm leading-relaxed text-white/70'>{cap.description}</p>
            <div className='mt-auto flex flex-wrap gap-1.5 pt-2'>
                {cap.tags.map((tag) => (
                    <span key={tag} className='bg-secondary text-foreground px-1.5 py-0.5 text-xs'>
                        {tag}
                    </span>
                ))}
            </div>
        </BlurFade>
    );
}

export function AgencyCapabilities() {
    return (
        <section id='services' className='relative scroll-mt-24 py-20 md:py-28'>
            <div className='grid-layout'>
                {/* Label */}
                <p className='col-span-full mb-2 text-sm font-medium tracking-widest text-white/55 uppercase lg:col-start-2'>
                    Capabilities
                </p>

                {/* Big statement */}
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <h2 className='font-display text-foreground text-4xl leading-[0.95] tracking-wide uppercase md:text-6xl'>
                        One Team for the Whole Marketing Ecosystem
                    </h2>
                    <p className='mt-4 max-w-2xl text-lg text-white/70'>
                        You run your business. Virtuo handles the marketing — from visibility to conversion, under one
                        roof.
                    </p>
                </div>

                {/* Columns */}
                <div className='col-span-full mt-14 lg:col-start-2 lg:col-end-12'>
                    <div className='grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-12'>
                        {agencyCapabilities.map((cap, idx) => (
                            <CapabilityColumn key={cap.title} cap={cap} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
