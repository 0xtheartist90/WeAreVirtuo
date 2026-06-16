import { AgencyApproach } from '@/components/sections/agency/agency-approach';
import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFeaturedWork } from '@/components/sections/agency/agency-featured-work';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyHero } from '@/components/sections/agency/agency-hero';
import { AgencyResults } from '@/components/sections/agency/agency-results';
import { AgencyServicesIndex } from '@/components/sections/agency/agency-services-index';
import { AgencyStatement } from '@/components/sections/agency/agency-statement';
import { AgencyTestimonials } from '@/components/sections/agency/agency-testimonials';
import { AgencyVideo } from '@/components/sections/agency/agency-video';
import { V2TrustBar } from '@/components/sections/v2-trust-bar';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { agencyLogos } from '@/content/agency';
import portfolio from '@/content/shared/portfolio';

export const metadata = {
    title: 'Virtuo Agency | SEO, AI Search & Digital Marketing in Canada',
    description:
        'Virtuo is a Canadian digital marketing agency specializing in SEO, Local SEO, GEO & AI search visibility, Google & Meta Ads, and high-performance Next.js web development.'
};

export default function HomePage() {
    return (
        <>
            <AgencyHero />

            <V2TrustBar logos={agencyLogos} />

            <AgencyServicesIndex />

            <AgencyApproach />

            <AgencyStatement />

            <AgencyFeaturedWork items={portfolio.slice(0, 4)} viewAllHref='/portfolio' />

            <AgencyResults />

            <CinematicSection bgImage='/images/bts/silhouette-setup.png' overlayOpacity={85} diagonal diagonalBottom>
                <AgencyVideo />
            </CinematicSection>

            <AgencyTestimonials />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
