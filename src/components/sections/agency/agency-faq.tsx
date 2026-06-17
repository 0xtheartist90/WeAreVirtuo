'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { agencyFaq } from '@/content/agency';

interface AgencyFaqProps {
    items?: { question: string; answer: string }[];
    label?: string;
    light?: boolean;
}

export function AgencyFaq({ items = agencyFaq, label = 'FAQ', light = false }: AgencyFaqProps) {
    const c = light
        ? {
              section: 'bg-white text-neutral-900',
              headBorder: 'border-neutral-300',
              count: 'text-neutral-400',
              item: 'border-neutral-200',
              trigger: 'text-neutral-900 hover:text-accent',
              answer: 'text-neutral-600'
          }
        : {
              section: '',
              headBorder: 'border-white/15',
              count: 'text-white/40',
              item: 'border-white/10',
              trigger: 'text-foreground hover:text-accent',
              answer: 'text-white/55'
          };

    return (
        <section className={`py-20 md:py-28 ${c.section}`}>
            <div className='grid-layout'>
                <div className={`col-span-full mb-6 flex items-end justify-between border-b pb-4 lg:col-start-2 lg:col-end-12 ${c.headBorder}`}>
                    <p className='text-accent font-mono text-[11px] tracking-widest uppercase'>[ {label} ]</p>
                    <span className={`font-mono text-[11px] tracking-widest tabular-nums ${c.count}`}>
                        ({String(items.length).padStart(2, '0')})
                    </span>
                </div>

                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    <Accordion type='single' collapsible className='w-full'>
                        {items.map((item, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className={c.item}>
                                <AccordionTrigger className={`gap-4 py-4 text-left text-base font-medium transition-colors hover:no-underline ${c.trigger}`}>
                                    <span className='flex items-baseline gap-4'>
                                        <span className='text-accent font-mono text-[11px] tabular-nums'>
                                            /{String(i + 1).padStart(2, '0')}
                                        </span>
                                        {item.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className={`pb-5 pl-8 text-sm leading-relaxed ${c.answer}`}>
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
