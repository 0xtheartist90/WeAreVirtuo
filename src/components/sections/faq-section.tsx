'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { BlurFade } from '@/components/ui/blur-fade';
import { MOTION } from '@/lib/motion';
import type { FAQItem } from '@/content/types';

interface FAQSectionProps {
    items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
    return (
        <section className='bg-background py-16 md:py-24'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <BlurFade delay={0} inView inViewMargin={MOTION.viewport.margin}>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        Common Questions
                    </h2>
                    <p className='text-muted-foreground mb-12 max-w-[var(--max-width-prose)] text-lg'>
                        Everything you need to know about working with us.
                    </p>
                </BlurFade>

                <BlurFade delay={0.1} inView inViewMargin={MOTION.viewport.margin}>
                    <div className='mx-auto max-w-3xl'>
                        <Accordion type='single' collapsible className='w-full'>
                            {items.map((item, idx) => (
                                <AccordionItem key={idx} value={`faq-${idx}`} className='border-border'>
                                    <AccordionTrigger className='text-foreground text-left text-lg font-medium hover:no-underline'>
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className='text-muted-foreground text-base leading-relaxed'>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </BlurFade>
            </div>
        </section>
    );
}
