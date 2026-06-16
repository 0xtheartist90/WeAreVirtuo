import { V2FAQ } from '@/components/sections/v2-faq';
import { V2FinalCta } from '@/components/sections/v2-final-cta';
import { V2Footer } from '@/components/sections/v2-footer';
import { V2Hero } from '@/components/sections/v2-hero';
import { V2MidCta } from '@/components/sections/v2-mid-cta';
import { V2PortfolioC } from '@/components/sections/v2-portfolio-c';
import { V2Process } from '@/components/sections/v2-process';
import { V2ReelsShowcase } from '@/components/sections/v2-reels-showcase';
import { V2Services } from '@/components/sections/v2-services';
import { V2Testimonials } from '@/components/sections/v2-testimonials';
import { V2TrustBar } from '@/components/sections/v2-trust-bar';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { getNicheContent, getSharedContent } from '@/content/index';
import type { NicheKey } from '@/lib/motion';

export const metadata = {
    title: 'Restaurant Video Production Toronto | Virtuo Video',
    description:
        'Premium video production for Toronto restaurants & hospitality. Menu videos, ambiance reels, Instagram content.'
};

export default function V2Page() {
    const niche = getNicheContent('restaurant-video-toronto');
    const shared = getSharedContent(niche.nicheKey);

    return (
        <>
            {/* 1. Hero — full viewport cinematic video */}
            <V2Hero
                headline={niche.hero.headline}
                nicheKey={niche.nicheKey as NicheKey}
                videoSrc={niche.hero.videoSrc}
                posterSrc={niche.hero.posterSrc}
            />

            {/* Spacer — prevents trust bar from overlapping hero parallax rows */}
            <div className='h-40' />

            {/* 2. Trust Bar — same visual unit as hero */}
            <V2TrustBar logos={niche.logos} />

            {/* 3. Services — BTS background */}
            <CinematicSection id='services' bgImage='/images/bts/cooking-show-setup.jpg' overlayOpacity={82}>
                <V2Services />
            </CinematicSection>

            {/* 4. Portfolio — pure dark, content is visual */}
            <div id='portfolio'>
                <V2PortfolioC items={shared.portfolio} />
            </div>

            {/* 5. Reels — BTS background, diagonal top + bottom */}
            <CinematicSection bgImage='/images/bts/silhouette-setup.png' overlayOpacity={85} diagonal diagonalBottom>
                <V2ReelsShowcase reels={shared.reels} />
            </CinematicSection>

            {/* 6. Mid-CTA — pure dark + MovingBorder frame */}
            <V2MidCta />

            {/* 7. Process — The Journey (pinned scroll) */}
            <div id='process'>
                <V2Process steps={shared.process} />
            </div>

            {/* 8. Testimonials — BTS background, diagonal top + bottom */}
            <CinematicSection bgImage='/images/bts/steadicam-operator.jpg' overlayOpacity={80} diagonal diagonalBottom>
                <V2Testimonials testimonials={shared.testimonials} />
            </CinematicSection>

            {/* 9. FAQ — BTS background, diagonal top only (no bottom — CTA follows directly) */}
            <CinematicSection
                id='faq'
                bgImage='/images/bts/commercial-stage.jpg'
                overlayOpacity={88}
                diagonal>
                <V2FAQ items={niche.faq} />
            </CinematicSection>

            {/* 10. Final CTA — The Closing Shot */}
            <V2FinalCta />

            {/* 11. Footer */}
            <V2Footer />
        </>
    );
}
