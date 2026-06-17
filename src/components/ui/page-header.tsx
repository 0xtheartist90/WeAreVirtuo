import { CharacterReveal } from '@/components/ui/character-reveal';

import { ArrowUpRight } from 'lucide-react';

interface PageHeaderProps {
    index: string; // e.g. "01"
    label: string; // monospace eyebrow, e.g. "SERVICES"
    title: string;
    intro?: string;
    meta?: string; // right-aligned micro detail, e.g. a date range or location
    image?: string; // full-width image filling the bottom half of the hero
}

function HeaderInner({ index, label, title, intro, meta }: Omit<PageHeaderProps, 'image'>) {
    return (
        <div className='w-full px-4 md:px-8'>
            {/* Top micro row — red eyebrow + red index */}
            <div className='mb-8 flex items-center justify-between font-mono text-[11px] tracking-widest uppercase'>
                <span className='text-accent'>[ {label} ]</span>
                <span className='text-accent'>/{index}</span>
            </div>

            {/* Oversized title + arrow — full width */}
            <div className='flex items-start justify-between gap-6'>
                <CharacterReveal
                    as='h1'
                    className='font-display text-foreground text-6xl leading-[0.9] tracking-tight uppercase md:text-8xl lg:text-9xl'>
                    {title}
                </CharacterReveal>
                <ArrowUpRight className='text-accent mt-2 h-10 w-10 shrink-0 md:h-16 md:w-16' strokeWidth={1.5} />
            </div>

            {/* Intro + meta */}
            {(intro || meta) && (
                <div className='mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between'>
                    {intro && <p className='max-w-xl text-base text-white/70 md:text-lg'>{intro}</p>}
                    {meta && <span className='font-mono text-sm text-white/45'>{meta}</span>}
                </div>
            )}
        </div>
    );
}

export function PageHeader({ index, label, title, intro, meta, image }: PageHeaderProps) {
    if (image) {
        return (
            <header className='relative flex min-h-[100svh] flex-col'>
                {/* Text block — top half */}
                <div className='flex flex-1 flex-col justify-end pt-28 pb-10 md:pt-36 md:pb-14'>
                    <HeaderInner index={index} label={label} title={title} intro={intro} meta={meta} />
                </div>

                {/* Image — bottom half, full viewport width */}
                <div className='relative h-[45svh] w-full overflow-hidden md:h-[50svh]'>
                    <img src={image} alt='' aria-hidden='true' className='h-full w-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent' />
                </div>
            </header>
        );
    }

    return (
        <header className='border-b border-white/15 pt-28 pb-10 md:pt-36 md:pb-14'>
            <HeaderInner index={index} label={label} title={title} intro={intro} meta={meta} />
        </header>
    );
}
