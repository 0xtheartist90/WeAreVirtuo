'use client';

import { BorderBeam } from '@/components/ui/border-beam';
import { IndustryCard } from '@/components/ui/industry-card';
import type { IndustryItem } from '@/content/shared/industries';

interface Props {
    industries: IndustryItem[];
}

/** Variant B: Bento asymmetric — featured card (first) spans 2x2 */
export function IndustriesBento({ industries }: Props) {
    const [featured, ...rest] = industries;

    return (
        <div className='grid auto-rows-[12rem] grid-cols-1 gap-4 md:grid-cols-4'>
            {/* Featured — restaurants, 2 cols 2 rows */}
            <div className='relative md:col-span-2 md:row-span-2'>
                <IndustryCard industry={featured} aspectRatio='aspect-[16/10] md:aspect-auto md:h-full' />
                <div className='pointer-events-none absolute inset-0 rounded-2xl'>
                    <BorderBeam duration={8} colorFrom='#DC2626' colorTo='rgba(255,255,255,0.3)' />
                </div>
            </div>

            {/* Remaining 7 cards */}
            {rest.map((industry) => (
                <IndustryCard
                    key={industry.slug}
                    industry={industry}
                    aspectRatio='aspect-[16/10] md:aspect-auto md:h-full'
                />
            ))}
        </div>
    );
}
