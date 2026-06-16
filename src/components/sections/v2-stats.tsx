'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { MOTION } from '@/lib/motion';

interface Stat {
    value: number;
    suffix: string;
    label: string;
}

interface V2StatsProps {
    stats: Stat[];
}

export function V2Stats({ stats }: V2StatsProps) {
    return (
        <section className='relative border-y border-border/50 py-16 md:py-24'>
            {/* Subtle background glow */}
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.03),transparent_70%)]' />

            <div className='relative mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12'>
                    {stats.map((stat, idx) => (
                        <BlurFade
                            key={stat.label}
                            delay={MOTION.stagger * idx}
                            inView
                            inViewMargin={MOTION.viewport.margin}
                        >
                            <div className='text-center'>
                                <div className='font-display text-foreground text-5xl md:text-6xl'>
                                    <NumberTicker value={stat.value} delay={0.2 + idx * 0.1} />
                                    <span className='text-accent'>{stat.suffix}</span>
                                </div>
                                <p className='text-muted-foreground mt-3 text-sm font-medium tracking-widest uppercase'>
                                    {stat.label}
                                </p>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
