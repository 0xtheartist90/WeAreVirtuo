'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlurFade } from '@/components/ui/blur-fade';
import { CharacterReveal } from '@/components/ui/character-reveal';
import type { FAQItem } from '@/content/types';
import { MOTION } from '@/lib/motion';

interface V2FAQProps {
    items: FAQItem[];
}

export function V2FAQ({ items }: V2FAQProps) {
    return (
        <div className='py-20 md:py-28'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='text-center'>
                    <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>FAQ</p>
                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                        Common Questions
                    </CharacterReveal>
                    <p className='mx-auto mb-14 max-w-[var(--max-width-prose)] text-lg text-white/80'>
                        Everything you need to know about working with us.
                    </p>
                </div>

                <div className='mx-auto max-w-3xl'>
                    <Accordion type='single' collapsible className='w-full'>
                        {items.map((item, idx) => (
                            <BlurFade
                                key={idx}
                                delay={MOTION.stagger * idx}
                                inView
                                inViewMargin={MOTION.viewport.margin}>
                                <AccordionItem value={`faq-${idx}`} className='border-white/[0.12] py-1'>
                                    <AccordionTrigger className='text-foreground hover:text-accent py-5 text-left text-lg font-medium transition-colors hover:no-underline md:text-xl'>
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className='pb-6 text-base leading-relaxed text-white/80'>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </BlurFade>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
