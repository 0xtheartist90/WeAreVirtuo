'use client';

import { Reveal } from '@/components/ui/reveal';
import { RevealText } from '@/components/ui/reveal-text';

import { ArrowUpRight, Asterisk } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Light editorial statement — progressive Hanza reveals: char-revealed label,
   word-revealed heading, block-revealed footnote, a drawing accent rule. */
export function AgencyStatement() {
    return (
        <section className='relative overflow-hidden bg-white text-neutral-900'>
            <div className='grid-layout py-16 md:py-24'>
                {/* Top rule + label */}
                <div className='relative col-span-full mb-10 lg:col-start-2 lg:col-end-12'>
                    <motion.span
                        aria-hidden='true'
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className='absolute -top-4 left-0 h-px w-full origin-left bg-neutral-300'
                    />
                    <div className='flex items-center justify-between'>
                        <span className='font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>
                            [{' '}
                            <RevealText as='span' by='char' blur={6} stagger={40} text='The Virtuo Promise' />{' '}
                            ]
                        </span>
                        <ArrowUpRight className='h-5 w-5 text-neutral-900' strokeWidth={1.75} />
                    </div>
                </div>

                {/* Statement — word-by-word reveal */}
                <h2 className='col-span-full font-display text-5xl leading-[0.9] tracking-tight text-neutral-900 uppercase md:text-8xl lg:col-start-2 lg:col-end-12'>
                    <RevealText as='span' by='word' rise={1} className='block' text='You Run Your Business.' />
                    <span className='block'>
                        <RevealText as='span' by='word' rise={1} delay={300} className='text-accent' text='Virtuo Runs' />{' '}
                        <RevealText as='span' by='word' rise={1} delay={440} text='Your Marketing.' />
                    </span>
                </h2>

                {/* Footnote */}
                <Reveal
                    delay={520}
                    className='col-span-full mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 md:flex-row md:items-start md:justify-between lg:col-start-2 lg:col-end-12'>
                    <div className='flex items-start gap-3'>
                        <Asterisk className='text-accent h-5 w-5 shrink-0' />
                        <p className='max-w-xl text-sm leading-relaxed text-neutral-600'>
                            Account setup, ad management, tracking, landing pages, analytics, and conversion
                            optimization — handled end to end, so you can focus on the work that only you can do.
                        </p>
                    </div>
                    <span className='font-mono text-sm whitespace-nowrap text-neutral-500'>A&nbsp;to&nbsp;Z</span>
                </Reveal>
            </div>
        </section>
    );
}
