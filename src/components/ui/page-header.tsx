import { CharacterReveal } from '@/components/ui/character-reveal';

import { ArrowUpRight } from 'lucide-react';

interface PageHeaderProps {
    index: string; // e.g. "01"
    label: string; // monospace eyebrow, e.g. "SERVICES"
    title: string;
    intro?: string;
    meta?: string; // right-aligned micro detail, e.g. a date range or location
}

export function PageHeader({ index, label, title, intro, meta }: PageHeaderProps) {
    return (
        <header className='border-b border-white/15 pt-28 pb-10 md:pt-36 md:pb-14'>
            <div className='grid-layout'>
                {/* Top micro row */}
                <div className='col-span-full mb-8 flex items-center justify-between font-mono text-[11px] tracking-widest text-white/45 uppercase lg:col-start-2 lg:col-end-12'>
                    <span>[ {label} ]</span>
                    <span>/{index}</span>
                </div>

                {/* Oversized title + arrow */}
                <div className='col-span-full flex items-start justify-between gap-6 lg:col-start-2 lg:col-end-12'>
                    <CharacterReveal
                        as='h1'
                        className='font-display text-foreground text-6xl leading-[0.9] tracking-tight uppercase md:text-8xl lg:text-9xl'>
                        {title}
                    </CharacterReveal>
                    <ArrowUpRight className='text-foreground mt-2 h-10 w-10 shrink-0 md:h-16 md:w-16' strokeWidth={1.5} />
                </div>

                {/* Intro + meta */}
                {(intro || meta) && (
                    <div className='col-span-full mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between lg:col-start-2 lg:col-end-12'>
                        {intro && <p className='max-w-xl text-base text-white/70 md:text-lg'>{intro}</p>}
                        {meta && <span className='font-mono text-sm text-white/45'>{meta}</span>}
                    </div>
                )}
            </div>
        </header>
    );
}
