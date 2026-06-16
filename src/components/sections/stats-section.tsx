'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { MOTION } from '@/lib/motion';

interface Stat {
    value: number;
    suffix: string;
    label: string;
}

interface StatsSectionProps {
    stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className='border-border/50 bg-card/30 border-y py-12 md:py-16'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
                    {stats.map((stat, idx) => (
                        <BlurFade
                            key={stat.label}
                            delay={MOTION.stagger * idx}
                            inView
                            inViewMargin={MOTION.viewport.margin}
                        >
                            <div className='text-center'>
                                <div className='font-display text-foreground text-4xl md:text-5xl'>
                                    <NumberTicker value={stat.value} delay={0.2 + idx * 0.1} />
                                    <span className='text-accent'>{stat.suffix}</span>
                                </div>
                                <p className='text-muted-foreground mt-2 text-sm font-medium tracking-widest uppercase'>
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
