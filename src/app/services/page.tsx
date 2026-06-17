import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyServiceSections } from '@/components/sections/agency/agency-service-sections';
import { MatrixText } from '@/components/ui/matrix-text';

import { ArrowUpRight } from 'lucide-react';

export const metadata = {
    title: 'Services — SEO, AI Search, Paid Ads, Web & Video',
    description:
        'Choose a service: digital marketing (SEO, Local SEO, GEO/AI, Google & Meta Ads), high-performance web development, virtual tours, and video production.'
};

export default function ServicesPage() {
    return (
        <>
            {/* Compact header so all four services are visible right away */}
            <header className='pt-24 pb-2 md:pt-28'>
                <div className='grid-layout'>
                    <div className='col-span-full flex items-center justify-between font-mono text-[11px] tracking-widest uppercase'>
                        <span className='text-accent'>[ Services ]</span>
                        <span className='text-accent'>/01</span>
                    </div>
                    <div className='col-span-full mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                        <div className='flex items-start gap-4'>
                            <MatrixText
                                as='h1'
                                className='font-display text-foreground text-5xl leading-[0.9] tracking-tight uppercase md:text-7xl'>
                                What We Do
                            </MatrixText>
                            <ArrowUpRight className='text-accent mt-1 hidden h-8 w-8 shrink-0 sm:block md:h-12 md:w-12' strokeWidth={1.5} />
                        </div>
                        <p className='max-w-md text-base text-white/65'>
                            Four disciplines, one team. Pick a service to dive into exactly what’s included.
                        </p>
                    </div>
                </div>
            </header>

            <AgencyServiceSections />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
