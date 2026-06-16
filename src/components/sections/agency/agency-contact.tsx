'use client';

import { useState } from 'react';

import { AgencyButton } from '@/components/ui/agency-button';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';

import { ArrowUpRight } from 'lucide-react';

const EMAIL = 'info@virtuovideo.com';

export function AgencyContact() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <section id='contact' className='scroll-mt-24 py-24 md:py-36'>
            <div className='grid-layout'>
                <div className='tile-border relative col-span-full grid grid-cols-4 gap-x-3 gap-y-6 px-5 py-8 md:px-8 md:py-12 lg:col-start-2 lg:col-end-12 lg:grid-cols-10'>
                    <div className='with-diagonal-lines pointer-events-none absolute inset-0' />

                    <p className='relative col-span-full text-sm font-medium tracking-widest text-white/55 uppercase lg:col-span-2'>
                        Contact
                    </p>

                    <h2 className='relative col-span-full text-balance lg:col-span-8 lg:col-start-3'>
                        <span className='font-display text-foreground block text-4xl leading-[0.95] tracking-wide uppercase md:text-6xl lg:text-7xl'>
                            Let&apos;s Make an Impact Together
                        </span>
                    </h2>

                    <div className='relative col-span-full lg:col-span-8 lg:col-start-3'>
                        <a
                            href={`mailto:${EMAIL}`}
                            className='font-display text-foreground hover:text-accent inline-block text-3xl tracking-wide lowercase transition-colors md:text-5xl'>
                            {EMAIL}
                        </a>
                    </div>

                    <div className='relative col-span-full mt-2 flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-8 lg:col-start-3'>
                        <AgencyButton type='button' onClick={() => setFormOpen(true)} className='px-8 py-4 text-base'>
                            Get a Free Strategy Call
                            <ArrowUpRight className='h-4 w-4' />
                        </AgencyButton>
                        <p className='text-sm text-white/55'>Serving Canada &amp; the United States · Toronto HQ</p>
                    </div>
                </div>
            </div>

            <QuoteFormPanel open={formOpen} onClose={() => setFormOpen(false)} title='Free Strategy Call' location='contact' />
        </section>
    );
}
