'use client';

import * as LucideIcons from 'lucide-react';

import { BentoGrid, BentoGridItem } from '@/components/effects/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';
import type { ServiceCard } from '@/content/types';

interface ServicesSectionProps {
    services: ServiceCard[];
}

function getIcon(name: string) {
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];

    return Icon ? <Icon className='h-8 w-8 text-accent' /> : null;
}

export function ServicesSection({ services }: ServicesSectionProps) {
    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        What We Create
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Every video is tailored to your brand, your audience, and your goals.
                    </p>
                </BlurFade>

                <BentoGrid>
                    {services.map((service, idx) => (
                        <BlurFade
                            key={service.title}
                            delay={MOTION.stagger * idx}
                            inView
                            inViewMargin={MOTION.viewport.margin}
                        >
                            <BentoGridItem
                                title={service.title}
                                description={service.description}
                                icon={getIcon(service.icon)}
                                className={idx === 0 ? 'md:col-span-2' : ''}
                                header={
                                    <div className='flex h-full min-h-[4rem] items-center justify-center rounded-lg bg-gradient-to-br from-accent/5 to-transparent'>
                                        <div className='scale-150 opacity-20'>
                                            {getIcon(service.icon)}
                                        </div>
                                    </div>
                                }
                            />
                        </BlurFade>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
