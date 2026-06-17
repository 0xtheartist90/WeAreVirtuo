import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFeaturedWork } from '@/components/sections/agency/agency-featured-work';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { PageHeader } from '@/components/ui/page-header';
import portfolio from '@/content/shared/portfolio';

export const metadata = {
    title: 'Portfolio — Selected Work',
    description:
        'Selected work from Virtuo — hospitality, restaurants, automotive, and entertainment brands across Canada and the United States.'
};

export default function PortfolioPage() {
    return (
        <>
            <PageHeader
                index='02'
                label='Portfolio'
                title='Selected Work'
                intro='A look at the brands we partner with. Hover to preview, tap any project to watch.'
                meta={`${portfolio.length} Projects`}
                image='/images/bts/full-production-set.jpg'
            />

            <AgencyFeaturedWork items={portfolio} />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
