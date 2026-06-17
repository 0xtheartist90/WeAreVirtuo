import Link from 'next/link';

import { serviceGlyphs } from '@/components/ui/service-glyphs';
import { agencyCapabilities } from '@/content/agency';

import { ArrowUpRight } from 'lucide-react';

/* Full-stack service breakdown — same bold/minimal language as the homepage
   services index (glyphs, big titles, numbers, tech-select hover). Video is
   one of the four blocks and links down to the reels showcase. */
export function AgencyServiceDetail() {
    return (
        <section className='py-20 md:py-28'>
            <div className='grid-layout'>
                <div className='col-span-full mb-12 lg:col-start-2 lg:col-end-12'>
                    <p className='text-accent font-mono text-[11px] tracking-widest uppercase'>[ Capabilities ]</p>
                    <h2 className='font-display text-foreground mt-2 text-4xl tracking-tight uppercase md:text-6xl'>
                        Everything Under One Roof
                    </h2>
                </div>

                <div className='col-span-full border-b border-white/12 lg:col-start-2 lg:col-end-12'>
                    {agencyCapabilities.map((cap, i) => {
                        const Glyph = serviceGlyphs[i % serviceGlyphs.length];
                        const href = cap.title === 'Video & Content' ? '#video' : cap.href;

                        return (
                            <Link
                                key={cap.title}
                                href={href}
                                className='tech-select group relative block overflow-hidden border-t border-white/12 px-2 py-10 md:px-3 md:py-12'>
                                {/* targeting brackets */}
                                <span className='border-accent pointer-events-none absolute top-2 left-0 z-[3] h-4 w-4 -translate-x-1 -translate-y-1 border-t border-l opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100' />
                                <span className='border-accent pointer-events-none absolute right-0 bottom-2 z-[3] h-4 w-4 translate-x-1 translate-y-1 border-r border-b opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100' />

                                <div className='relative z-[1] grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10'>
                                    {/* Glyph + number */}
                                    <div className='flex items-center gap-4'>
                                        <Glyph className='text-foreground/30 group-hover:text-accent h-12 w-12 shrink-0 transition-colors md:h-16 md:w-16' />
                                        <span className='text-accent font-mono text-sm'>/{String(i + 1).padStart(2, '0')}</span>
                                    </div>

                                    {/* Title + description + tags */}
                                    <div>
                                        <span className='tech-title font-display text-foreground group-hover:text-accent block text-4xl leading-[0.9] tracking-tight uppercase transition-colors md:text-6xl'>
                                            {cap.title}
                                        </span>
                                        <p className='mt-3 max-w-xl text-sm text-white/55'>{cap.description}</p>
                                        <div className='mt-4 flex flex-wrap gap-1.5'>
                                            {cap.tags.map((tag) => (
                                                <span key={tag} className='bg-secondary text-foreground px-1.5 py-0.5 text-xs'>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Explore */}
                                    <div className='text-accent flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase md:flex-col md:items-end md:gap-3'>
                                        <span className='hidden md:block'>Explore</span>
                                        <ArrowUpRight className='text-foreground h-7 w-7 opacity-40 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 md:h-10 md:w-10' />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
