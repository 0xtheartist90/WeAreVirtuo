import { AgencyApproach } from '@/components/sections/agency/agency-approach';
import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyPillars } from '@/components/sections/agency/agency-pillars';
import { V2FAQ } from '@/components/sections/v2-faq';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { PageHeader } from '@/components/ui/page-header';
import { agencyFaq } from '@/content/agency';

export const metadata = {
    title: 'Services — SEO, AI Search, Paid Ads & Web Development',
    description:
        'Digital marketing, web development, and virtual tours. SEO, Local SEO, GEO/AI search visibility, Google & Meta Ads, and high-performance Next.js websites.'
};

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                index='01'
                label='Services'
                title='What We Do'
                intro='One team for the whole marketing ecosystem — visibility, advertising, websites, and production, handled end to end.'
                meta='Canada & United States'
            />

            <AgencyApproach />

            <CinematicSection bgImage='/images/bts/commercial-stage.jpg' overlayOpacity={86}>
                <AgencyPillars />
            </CinematicSection>

            <CinematicSection bgImage='/images/bts/cooking-show-setup.jpg' overlayOpacity={88} diagonal>
                <V2FAQ items={agencyFaq} />
            </CinematicSection>

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
