'use client';

import { IndustryCard } from '@/components/ui/industry-card';
import type { IndustryItem } from '@/content/shared/industries';

interface Props {
    industries: IndustryItem[];
}

/** Variant D: Staggered masonry — 3 columns with varying heights */
export function IndustriesMasonry({ industries }: Props) {
    // Distribute cards across 3 columns with varying aspect ratios
    const columns: { industry: IndustryItem; aspect: string }[][] = [
        [
            { industry: industries[0], aspect: 'aspect-[16/10]' },
            { industry: industries[1], aspect: 'aspect-square' },
            { industry: industries[2], aspect: 'aspect-[4/3]' }
        ],
        [
            { industry: industries[3], aspect: 'aspect-[4/3]' },
            { industry: industries[4], aspect: 'aspect-[16/10]' },
            { industry: industries[5], aspect: 'aspect-square' }
        ],
        [
            { industry: industries[6], aspect: 'aspect-square' },
            { industry: industries[7], aspect: 'aspect-[16/10]' }
        ]
    ];

    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {columns.map((col, colIdx) => (
                <div key={colIdx} className='flex flex-col gap-4'>
                    {col.map(({ industry, aspect }) => (
                        <IndustryCard key={industry.slug} industry={industry} aspectRatio={aspect} />
                    ))}
                </div>
            ))}
        </div>
    );
}
