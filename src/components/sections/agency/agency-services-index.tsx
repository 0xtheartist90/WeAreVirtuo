import Link from 'next/link';

import { MatrixText } from '@/components/ui/matrix-text';
import { serviceGlyphs } from '@/components/ui/service-glyphs';
import { agencyCapabilities } from '@/content/agency';

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
                        <MatrixText
                            as='h2'
                            trigger='view'
                            className='font-display text-foreground block text-4xl tracking-tight uppercase md:text-6xl'>
                            What We Do
                        </MatrixText>
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
                            className='tech-select group relative flex items-center justify-between gap-6 overflow-hidden border-b border-white/10 px-2 py-7 md:px-3 md:py-10'>
                            {/* targeting brackets */}
                            <span className='border-accent pointer-events-none absolute top-1.5 left-0 z-[3] h-3 w-3 -translate-x-1 -translate-y-1 border-t border-l opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:h-4 md:w-4' />
                            <span className='border-accent pointer-events-none absolute right-0 bottom-1.5 z-[3] h-3 w-3 translate-x-1 translate-y-1 border-r border-b opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:h-4 md:w-4' />

                            <div className='relative z-[1] flex items-center gap-5 md:gap-10'>
                                <Glyph className='text-foreground/30 group-hover:text-accent h-9 w-9 shrink-0 transition-colors md:h-14 md:w-14' />
                                <div>
                                    <span className='tech-title font-display text-foreground group-hover:text-accent block text-4xl leading-[0.88] tracking-tight uppercase transition-colors md:text-7xl lg:text-8xl'>
                                        {cap.title}
                                    </span>
                                    <p className='mt-2 hidden max-w-md text-sm text-white/45 md:block'>
                                        {cap.description}
                                    </p>
                                </div>
                            </div>
                            <div className='relative z-[1] flex shrink-0 flex-col items-end gap-2'>
                                <span className='text-accent font-mono text-[10px] tracking-widest tabular-nums md:text-xs'>
                                    ({String(i + 1).padStart(2, '0')})
                                </span>
                                <ArrowUpRight className='text-foreground h-7 w-7 translate-x-2 opacity-30 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:h-10 md:w-10' />
                            </div>
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
