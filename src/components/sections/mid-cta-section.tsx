'use client';

import { MovingBorder } from '@/components/effects/moving-border';
import { PulsatingButton } from '@/components/ui/pulsating-button';
import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';

export function MidCtaSection() {
    return (
        <section className='py-8 md:py-12'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <MovingBorder
                        duration={3000}
                        className='px-8 py-16 text-center md:px-16 md:py-20'
                    >
                        <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                            Ready to Stand Out?
                        </h2>
                        <p className='text-muted-foreground mx-auto mb-10 max-w-[var(--max-width-prose)] text-lg'>
                            Let&apos;s create video content that drives real results for your business.
                        </p>
                        <PulsatingButton
                            pulseColor='rgba(220, 38, 38, 0.4)'
                            className='bg-accent text-white px-10 py-4 text-lg font-semibold'
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get Your Free Quote
                        </PulsatingButton>
                    </MovingBorder>
                </BlurFade>
            </div>
        </section>
    );
}
