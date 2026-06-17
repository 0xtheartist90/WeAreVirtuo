'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AgencyFaq } from '@/components/sections/agency/agency-faq';
import { AgencyButton } from '@/components/ui/agency-button';
import { PageHeader } from '@/components/ui/page-header';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { serviceGlyphs } from '@/components/ui/service-glyphs';

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const SERVICE_PAGES = [
    { label: 'Digital Marketing', href: '/digital-marketing' },
    { label: 'Web Development', href: '/web-development' },
    { label: 'Virtual Tours', href: '/virtual-tours' }
];

export interface ServicePageStubProps {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    meta?: string;
    statement: string;
    glyphIndex?: number;
    bgImage: string;
    capabilities: { title: string; detail: string }[];
    faq?: { question: string; answer: string }[];
}

export function ServicePageStub({
    index,
    eyebrow,
    title,
    intro,
    meta,
    statement,
    glyphIndex = 0,
    bgImage,
    capabilities,
    faq
}: ServicePageStubProps) {
    const [formOpen, setFormOpen] = useState(false);
    const Glyph = serviceGlyphs[glyphIndex % serviceGlyphs.length];
    const pathname = usePathname();
    const currentIdx = SERVICE_PAGES.findIndex((p) => p.href === pathname);
    const prev = currentIdx > 0 ? SERVICE_PAGES[currentIdx - 1] : null;
    const next = currentIdx >= 0 && currentIdx < SERVICE_PAGES.length - 1 ? SERVICE_PAGES[currentIdx + 1] : null;

    return (
        <>
            <PageHeader index={index} label={eyebrow} title={title} intro={intro} meta={meta} image={bgImage} />

            {/* Sticky service switcher — back to all + quick jump between services */}
            <nav className='bg-background/85 sticky top-16 z-30 border-b border-white/10 backdrop-blur-md md:top-20'>
                <div className='flex w-full items-center gap-5 overflow-x-auto px-4 py-3 md:px-8'>
                    <Link
                        href='/services'
                        className='glitch-hover hover:text-accent flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-widest text-white/60 uppercase transition-colors'>
                        <ArrowLeft className='h-3.5 w-3.5' />
                        All Services
                    </Link>
                    <span className='h-3 w-px shrink-0 bg-white/15' />
                    {SERVICE_PAGES.map((p) => {
                        const active = pathname === p.href;

                        return (
                            <Link
                                key={p.href}
                                href={p.href}
                                aria-current={active ? 'page' : undefined}
                                className={`glitch-hover shrink-0 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                                    active ? 'text-accent' : 'text-white/45 hover:text-white'
                                }`}>
                                {p.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* White statement break */}
            <section className='bg-white text-neutral-900'>
                <div className='grid-layout py-16 md:py-24'>
                    <p className='col-span-full mb-6 font-mono text-[11px] tracking-widest text-neutral-500 uppercase lg:col-start-2'>
                        [ The Approach ]
                    </p>
                    <h2 className='col-span-full font-display text-3xl leading-[1.02] tracking-tight text-neutral-900 uppercase md:text-5xl lg:col-start-2 lg:col-end-11'>
                        {statement}
                    </h2>
                </div>
            </section>

            {/* Capabilities — numbered */}
            <section className='py-20 md:py-28'>
                <div className='grid-layout'>
                    <div className='col-span-full mb-10 flex items-center justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                        <p className='text-accent font-mono text-[11px] tracking-widest uppercase'>
                            [ What&apos;s Included ]
                        </p>
                        <Glyph className='text-foreground/30 h-10 w-10 md:h-12 md:w-12' />
                    </div>
                    <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                        {capabilities.map((cap, i) => (
                            <div
                                key={cap.title}
                                className='grid grid-cols-1 gap-2 border-b border-white/10 py-6 md:grid-cols-[auto_1fr] md:gap-10 md:py-7'>
                                <span className='text-accent font-mono text-sm md:text-base'>
                                    /{String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className='font-display text-foreground text-2xl tracking-wide uppercase md:text-3xl'>
                                        {cap.title}
                                    </h3>
                                    <p className='mt-1.5 max-w-xl text-sm text-white/60'>{cap.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Per-service FAQ */}
            {faq && faq.length > 0 && <AgencyFaq items={faq} label={`${eyebrow} FAQ`} />}

            {/* CTA band — white (sits above the footer) */}
            <section className='bg-white py-20 text-neutral-900 md:py-28'>
                <div className='grid-layout'>
                    <div className='col-span-full flex flex-col gap-8 lg:col-start-2 lg:col-end-12'>
                        <p className='font-mono text-[11px] tracking-widest text-neutral-500 uppercase'>[ Next Step ]</p>
                        <h2 className='font-display text-4xl leading-[0.9] tracking-tight text-neutral-900 uppercase md:text-7xl'>
                            Let&apos;s Get You Found.
                        </h2>
                        <div className='flex flex-wrap items-center gap-6'>
                            <AgencyButton type='button' onClick={() => setFormOpen(true)} className='px-8 py-4 text-base'>
                                Get a Free Strategy Call
                                <ArrowUpRight className='h-4 w-4' />
                            </AgencyButton>
                            <Link
                                href='/services'
                                className='group hover:text-accent inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-600 uppercase transition-colors'>
                                <ArrowLeft className='h-4 w-4' />
                                All Services
                            </Link>
                        </div>

                        {/* Prev / next service */}
                        <div className='mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6'>
                            {prev ? (
                                <Link href={prev.href} className='group flex flex-col gap-1'>
                                    <span className='flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-neutral-400 uppercase'>
                                        <ArrowLeft className='h-3 w-3' /> Previous
                                    </span>
                                    <span className='font-display group-hover:text-accent text-xl tracking-wide text-neutral-900 uppercase transition-colors md:text-2xl'>
                                        {prev.label}
                                    </span>
                                </Link>
                            ) : (
                                <span />
                            )}
                            {next ? (
                                <Link href={next.href} className='group flex flex-col items-end gap-1 text-right'>
                                    <span className='flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-neutral-400 uppercase'>
                                        Next <ArrowRight className='h-3 w-3' />
                                    </span>
                                    <span className='font-display group-hover:text-accent text-xl tracking-wide text-neutral-900 uppercase transition-colors md:text-2xl'>
                                        {next.label}
                                    </span>
                                </Link>
                            ) : (
                                <span />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <QuoteFormPanel open={formOpen} onClose={() => setFormOpen(false)} title='Free Strategy Call' location={eyebrow} />
        </>
    );
}
