'use client';

import { IndustryCard } from '@/components/ui/industry-card';
import type { IndustryItem } from '@/content/shared/industries';

interface Props {
    industries: IndustryItem[];
}

/** Variant A: Clean 4x2 symmetric grid */
export function IndustriesGrid({ industries }: Props) {
    return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {industries.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} aspectRatio='aspect-[16/10]' />
            ))}
        </div>
    );
}
