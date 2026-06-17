'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AgencyFaq } from '@/components/sections/agency/agency-faq';
import { AgencyButton } from '@/components/ui/agency-button';
import { PageHeader } from '@/components/ui/page-header';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import { serviceGlyphs } from '@/components/ui/service-glyphs';

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Rocket, Search, Settings2, TrendingUp, X } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_ICONS = [Search, Settings2, Rocket, TrendingUp];

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
    bodyImage?: string;
    painPoints?: string[];
    process?: { title: string; detail: string }[];
    outcomes?: string[];
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
    bodyImage,
    painPoints,
    process,
    outcomes,
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

            {/* Sticky service switcher */}
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

            {/* 1 · Value statement (white) */}
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

            {/* 2 · The problem (dark) */}
            {painPoints && painPoints.length > 0 && (
                <section className='py-20 md:py-28'>
                    <div className='grid-layout'>
                        <div className='col-span-full mb-10 lg:col-start-2 lg:col-end-12'>
                            <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                                [ Sound Familiar? ]
                            </p>
                            <h2 className='font-display text-foreground text-4xl tracking-tight uppercase md:text-6xl'>
                                The Signs You Need This
                            </h2>
                        </div>
                        <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                            <div className='grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2'>
                                {painPoints.map((p, i) => (
                                    <motion.div
                                        key={p}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                                        className='bg-background flex items-start gap-4 p-6 md:p-7'>
                                        <X className='text-accent mt-0.5 h-5 w-5 shrink-0' />
                                        <p className='text-base text-white/80'>{p}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 3 · How it works (white) */}
            {process && process.length > 0 && (
                <section className='bg-white py-20 text-neutral-900 md:py-28'>
                    <div className='grid-layout'>
                        <div className='col-span-full mb-12 border-b border-neutral-300 pb-4 lg:col-start-2 lg:col-end-12'>
                            <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                                [ How It Works ]
                            </p>
                            <h2 className='font-display text-4xl tracking-tight text-neutral-900 uppercase md:text-6xl'>
                                The Process
                            </h2>
                        </div>
                        <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                            <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
                                {process.map((step, i) => {
                                    const Icon = STEP_ICONS[i % STEP_ICONS.length];

                                    return (
                                        <motion.div
                                            key={step.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-50px' }}
                                            transition={{ duration: 0.45, ease: EASE, delay: i * 0.1 }}
                                            className='border-t-2 border-neutral-300 pt-5'>
                                            <div className='flex items-center justify-between'>
                                                <span className='font-display text-5xl leading-none text-neutral-200'>
                                                    /{String(i + 1).padStart(2, '0')}
                                                </span>
                                                <Icon className='text-accent h-6 w-6' strokeWidth={1.5} />
                                            </div>
                                            <h3 className='font-display mt-3 text-2xl tracking-wide text-neutral-900 uppercase'>
                                                {step.title}
                                            </h3>
                                            <p className='mt-2 text-sm leading-relaxed text-neutral-600'>{step.detail}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4 · What's included (dark) */}
            <section className='py-20 md:py-28'>
                <div className='grid-layout'>
                    <div className='col-span-full mb-10 flex items-center justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                        <div>
                            <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                                [ What&apos;s Included ]
                            </p>
                            <h2 className='font-display text-foreground text-4xl tracking-tight uppercase md:text-6xl'>
                                Inside {eyebrow}
                            </h2>
                        </div>
                        <Glyph className='text-accent hidden h-12 w-12 shrink-0 sm:block md:h-16 md:w-16' />
                    </div>
                    {/* capability list */}
                    <div className={`col-span-full ${bodyImage ? 'lg:col-start-2 lg:col-end-8' : 'lg:col-start-2 lg:col-end-12'}`}>
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                                className='grid grid-cols-1 gap-2 border-b border-white/10 py-6 md:grid-cols-[auto_1fr] md:gap-8 md:py-6'>
                                <span className='text-accent font-mono text-sm md:text-base'>
                                    /{String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className='font-display text-foreground text-2xl tracking-wide uppercase md:text-3xl'>
                                        {cap.title}
                                    </h3>
                                    <p className='mt-1.5 max-w-xl text-sm text-white/60'>{cap.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* sticky image */}
                    {bodyImage && (
                        <div className='col-span-full mt-10 lg:col-start-9 lg:col-end-12 lg:mt-0'>
                            <motion.div
                                initial={{ opacity: 0, scale: 1.05 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, ease: EASE }}
                                className='relative overflow-hidden border border-white/10 lg:sticky lg:top-28'>
                                <img
                                    src={bodyImage}
                                    alt={eyebrow}
                                    className='aspect-[3/4] w-full object-cover lg:aspect-[4/5]'
                                />
                                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                                <span className='absolute bottom-4 left-4 font-mono text-[11px] tracking-widest text-white/90 uppercase'>
                                    {eyebrow}
                                </span>
                                <span className='border-accent absolute top-3 left-3 h-5 w-5 border-t border-l' />
                                <span className='border-accent absolute right-3 bottom-3 h-5 w-5 border-r border-b' />
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* 5 · Outcomes (white) */}
            {outcomes && outcomes.length > 0 && (
                <section className='bg-white py-20 text-neutral-900 md:py-28'>
                    <div className='grid-layout'>
                        <div className='col-span-full mb-10 lg:col-start-2 lg:col-end-7'>
                            <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>
                                [ The Outcome ]
                            </p>
                            <h2 className='font-display text-4xl leading-[0.95] tracking-tight text-neutral-900 uppercase md:text-6xl'>
                                What You Get
                            </h2>
                            <Glyph className='text-accent mt-8 hidden h-20 w-20 md:block' />
                        </div>
                        <div className='col-span-full lg:col-start-7 lg:col-end-12'>
                            <ul className='border-t border-neutral-200'>
                                {outcomes.map((o, i) => (
                                    <motion.li
                                        key={o}
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                                        className='flex items-start gap-4 border-b border-neutral-200 py-5'>
                                        <span className='border-accent/30 bg-accent/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border'>
                                            <Check className='text-accent h-3.5 w-3.5' />
                                        </span>
                                        <p className='text-base text-neutral-700'>{o}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* 6 · FAQ */}
            {faq && faq.length > 0 && <AgencyFaq items={faq} label={`${eyebrow} FAQ`} />}

            {/* 7 · CTA (white, above footer) */}
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
