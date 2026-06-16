import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { ServicePageStub } from '@/components/sections/agency/service-page-stub';

export const metadata = {
    title: 'Digital Marketing — SEO, AI Search & Paid Ads',
    description:
        'SEO, Local SEO, GEO/AI search visibility, Google Business Profile, Google Ads and Meta Ads — fully managed by Virtuo Agency.'
};

export default function DigitalMarketingPage() {
    return (
        <>
            <ServicePageStub
                eyebrow='Digital Marketing'
                title='Get Found Everywhere'
                intro='Deep local SEO, AI-search visibility, and fully managed paid advertising. We run your entire marketing ecosystem — from setup to tracking to conversion — so you can run your business.'
                bgImage='/images/bts/commercial-stage.jpg'
                capabilities={[
                    { title: 'SEO & Local SEO', detail: 'Organic rankings, local pack visibility, and on-page optimization.' },
                    { title: 'GEO & AI Search', detail: 'Show up in Google AI Overviews and ChatGPT-style discovery.' },
                    { title: 'Google Business Profile', detail: 'Optimized listings and Maps visibility for every location.' },
                    { title: 'Google Ads', detail: 'Intent-based search campaigns, managed end to end.' },
                    { title: 'Meta Ads', detail: 'Instagram & Facebook demand generation and retargeting.' },
                    { title: 'Tracking & Analytics', detail: 'Conversion tracking, reporting, and ongoing optimization.' }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
