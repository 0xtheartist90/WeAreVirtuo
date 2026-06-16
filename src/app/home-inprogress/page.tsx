import { HomeCta } from '@/components/sections/home-cta';
import { HomeHero } from '@/components/sections/home-hero';
import { HomeIndustries } from '@/components/sections/home-industries';
import { HomePortfolio } from '@/components/sections/home-portfolio';
import { HomeProcess } from '@/components/sections/home-process';
import { HomeTestimonials } from '@/components/sections/home-testimonials';
import { V2Footer } from '@/components/sections/v2-footer';
import { V2TrustBar } from '@/components/sections/v2-trust-bar';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { getNicheContent, getSharedContent } from '@/content/index';

export const metadata = {
    title: 'Virtuo Video | Cinematic Video Production Toronto',
    description:
        'Premium video production for restaurants, hotels, corporate brands, and entertainment. Toronto-based, globally minded.'
};

export default function HomePage() {
    const niche = getNicheContent('restaurant-video-toronto');
    const shared = getSharedContent('restaurant');
    const allTestimonials = [
        ...shared.testimonials,
        ...getSharedContent('corporate').testimonials.filter((t) => !shared.testimonials.some((s) => s.slug === t.slug))
    ];

    return (
        <>
            {/* 1. Showreel Hero + Parallax Cards */}
            <HomeHero />

            {/* Spacer for parallax rows */}
            <div className='h-40' />

            {/* 2. Trust Bar */}
            <V2TrustBar logos={niche.logos} />

            {/* 3. Industry Selector */}
            <CinematicSection bgImage='/images/bts/silhouette-setup.png' overlayOpacity={85} diagonal diagonalBottom>
                <HomeIndustries />
            </CinematicSection>

            {/* 4. Portfolio Highlights */}
            <div id='portfolio'>
                <HomePortfolio items={shared.portfolio} />
            </div>

            {/* 5. The Process — sticky scroll journey */}
            <div id='process'>
                <HomeProcess />
            </div>

            {/* 6. Testimonials */}
            <CinematicSection bgImage='/images/bts/cinematographer-red.jpg' overlayOpacity={82} diagonal diagonalBottom>
                <HomeTestimonials testimonials={allTestimonials} />
            </CinematicSection>

            {/* 7. Final CTA */}
            <HomeCta />

            {/* 8. Footer */}
            <V2Footer />
        </>
    );
}
