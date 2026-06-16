'use client';

import { Timeline } from '@/components/effects/timeline';
import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { MOTION } from '@/lib/motion';
import type { ProcessStep } from '@/content/types';

interface ProcessSectionProps {
    steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
    const timelineData = steps.map((step) => ({
        title: (
            <span className='flex items-baseline gap-3'>
                <span className='font-display text-3xl text-accent'>
                    <NumberTicker value={step.number} delay={0.3} />
                </span>
                <span>{step.title}</span>
            </span>
        ),
        content: (
            <div className='pb-8'>
                <p className='text-muted-foreground text-base leading-relaxed md:text-lg'>
                    {step.description}
                </p>
            </div>
        ),
    }));

    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        How We Work
                    </h2>
                    <p className='text-muted-foreground mb-8 max-w-[var(--max-width-prose)] text-lg'>
                        From concept to delivery — a streamlined process built for results.
                    </p>
                </BlurFade>

                <Timeline data={timelineData} />
            </div>
        </section>
    );
}
