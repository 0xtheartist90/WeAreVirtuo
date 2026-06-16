import Link from 'next/link';

import { agencyCapabilities } from '@/content/agency';
import { serviceGlyphs } from '@/components/ui/service-glyphs';

import { ArrowUpRight } from 'lucide-react';

/* Bold services index on the homepage → links to the Services page. */
export function AgencyServicesIndex() {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                {/* Header */}
                <div className='col-span-full mb-8 flex items-end justify-between border-b border-white/15 pb-4 lg:col-start-2 lg:col-end-12'>
                    <div>
                        <p className='text-accent mb-2 font-mono text-[11px] tracking-widest uppercase'>[ Services ]</p>
                        <h2 className='font-display text-foreground text-4xl tracking-tight uppercase md:text-6xl'>
                            What We Do
                        </h2>
                    </div>
                    <Link
                        href='/services'
                        className='group hover:text-accent mb-1 hidden items-center gap-2 text-sm font-semibold tracking-widest text-white/70 uppercase transition-colors md:flex'>
                        All Services
                        <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </Link>
                </div>

                {/* Index list */}
                <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                    {agencyCapabilities.map((cap, i) => {
                        const Glyph = serviceGlyphs[i % serviceGlyphs.length];

                        return (
                        <Link
                            key={cap.title}
                            href='/services'
                            className='group flex items-center justify-between gap-6 border-b border-white/10 py-6 md:py-8'>
                            <div className='flex items-center gap-4 md:gap-8'>
                                <Glyph className='text-foreground/40 group-hover:text-accent h-9 w-9 shrink-0 transition-colors md:h-12 md:w-12' />
                                <span className='text-accent font-mono text-sm md:text-base'>/0{i + 1}</span>
                                <div>
                                    <span className='font-display text-foreground group-hover:text-accent block text-3xl tracking-wide uppercase transition-colors md:text-5xl'>
                                        {cap.title}
                                    </span>
                                    <p className='mt-1 hidden max-w-md text-sm text-white/55 md:block'>
                                        {cap.description}
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className='text-foreground h-6 w-6 shrink-0 translate-x-2 opacity-40 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:h-8 md:w-8' />
                        </Link>
                        );
                    })}
                </div>

                {/* Mobile CTA */}
                <div className='col-span-full mt-8 md:hidden'>
                    <Link
                        href='/services'
                        className='group bg-accent hover:bg-accent/90 inline-flex w-fit items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors'>
                        View All Services
                        <ArrowUpRight className='h-4 w-4' />
                    </Link>
                </div>
            </div>
        </section>
    );
}
