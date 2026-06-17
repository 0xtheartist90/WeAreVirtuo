import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyServiceSections } from '@/components/sections/agency/agency-service-sections';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
    title: 'Services — SEO, AI Search, Paid Ads, Web & Video',
    description:
        'Choose a service: digital marketing (SEO, Local SEO, GEO/AI, Google & Meta Ads), high-performance web development, virtual tours, and video production.'
};

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                index='01'
                label='Services'
                title='What We Do'
                intro='Four disciplines, one team. Pick a service to dive into exactly what’s included.'
                meta='Canada & United States'
                image='/images/bts/steadicam-operator.jpg'
            />

            <AgencyServiceSections />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
