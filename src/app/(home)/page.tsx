import { AgencyApproach } from '@/components/sections/agency/agency-approach';
import { AgencyCaseStudies } from '@/components/sections/agency/agency-case-studies';
import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyHero } from '@/components/sections/agency/agency-hero';
import { AgencyResults } from '@/components/sections/agency/agency-results';
import { AgencyServicesIndex } from '@/components/sections/agency/agency-services-index';
import { AgencyStatement } from '@/components/sections/agency/agency-statement';
import { AgencyTestimonials } from '@/components/sections/agency/agency-testimonials';
import { SplineBanner } from '@/components/sections/agency/spline-banner';
import { SplineHero } from '@/components/sections/agency/spline-hero';
import { V2TrustBar } from '@/components/sections/v2-trust-bar';
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

            <SplineBanner />

            <AgencyApproach />

            <AgencyStatement />

            <AgencyCaseStudies items={portfolio.slice(0, 6)} viewAllHref='/portfolio' />

            <AgencyResults />

            <SplineHero />

            <AgencyTestimonials />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
