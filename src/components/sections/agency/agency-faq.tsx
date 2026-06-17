'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { agencyFaq } from '@/content/agency';

interface AgencyFaqProps {
    items?: { question: string; answer: string }[];
    label?: string;
}

export function AgencyFaq({ items = agencyFaq, label = 'FAQ' }: AgencyFaqProps) {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                <div className='col-span-full mb-6 flex items-end justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                    <p className='text-accent font-mono text-[11px] tracking-widest uppercase'>[ {label} ]</p>
                    <span className='font-mono text-[11px] tracking-widest text-white/40 tabular-nums'>
                        ({String(items.length).padStart(2, '0')})
                    </span>
                </div>

                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <Accordion type='single' collapsible className='w-full'>
                        {items.map((item, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className='border-white/10'>
                                <AccordionTrigger className='text-foreground hover:text-accent gap-4 py-4 text-left text-base font-medium transition-colors hover:no-underline'>
                                    <span className='flex items-baseline gap-4'>
                                        <span className='text-accent font-mono text-[11px] tabular-nums'>
                                            /{String(i + 1).padStart(2, '0')}
                                        </span>
                                        {item.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className='pb-5 pl-8 text-sm leading-relaxed text-white/55'>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
