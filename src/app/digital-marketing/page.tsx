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
                index='01'
                glyphIndex={0}
                eyebrow='Digital Marketing'
                title='Get Found Everywhere'
                intro='Deep local SEO, AI-search visibility, and fully managed paid advertising. We run your entire marketing ecosystem — from setup to tracking to conversion — so you can run your business.'
                meta='SEO · GEO · Ads'
                statement='Traditional SEO chases blue links. We make you visible across Search, Maps, AI Overviews and ChatGPT — then convert it.'
                bgImage='/images/bts/commercial-stage.jpg'
                bodyImage='/images/bts/full-production-set.jpg'
                capabilities={[
                    { title: 'SEO & Local SEO', detail: 'Organic rankings, local pack visibility, and on-page optimization.' },
                    { title: 'GEO & AI Search', detail: 'Show up in Google AI Overviews and ChatGPT-style discovery.' },
                    { title: 'Google Business Profile', detail: 'Optimized listings and Maps visibility for every location.' },
                    { title: 'Google Ads', detail: 'Intent-based search campaigns, managed end to end.' },
                    { title: 'Meta Ads', detail: 'Instagram & Facebook demand generation and retargeting.' },
                    { title: 'Tracking & Analytics', detail: 'Conversion tracking, reporting, and ongoing optimization.' }
                ]}
                painPoints={[
                    'You rank on Google but the phone still isn’t ringing.',
                    'Competitors show up in Maps and AI answers — you don’t.',
                    'You’re spending on ads with no clear idea what’s working.',
                    'No one owns your tracking, so results are a black box.'
                ]}
                process={[
                    { title: 'Audit', detail: 'We map your visibility across search, maps, AI, and paid — and find every gap.' },
                    { title: 'Setup', detail: 'Profiles, tracking, and campaigns configured properly from the ground up.' },
                    { title: 'Launch', detail: 'SEO, Google & Meta campaigns go live with conversion-ready landing pages.' },
                    { title: 'Optimize', detail: 'Weekly optimization against real conversions, with clear monthly reporting.' }
                ]}
                outcomes={[
                    'Show up everywhere customers search — Google, Maps, AI, and paid.',
                    'A predictable pipeline of qualified leads and bookings.',
                    'Full visibility into spend, performance, and ROI.',
                    'One accountable team for the entire funnel.'
                ]}
                faq={[
                    {
                        question: 'How long until I see SEO results?',
                        answer: 'Local and technical SEO improvements often show within 4–8 weeks; competitive organic terms take 3–6 months. Google Business Profile work and paid ads can drive results within days.'
                    },
                    {
                        question: 'Do you manage our ad budget and spend?',
                        answer: 'Yes — we set up, manage, and optimize Google and Meta campaigns end to end: budget pacing, bidding, creative, and reporting. Ad spend is billed separately from management.'
                    },
                    {
                        question: 'What exactly is GEO / AI search optimization?',
                        answer: 'It’s structuring your content and entities so AI systems — Google AI Overviews and ChatGPT-style search — surface and cite your business when people ask buying questions.'
                    },
                    {
                        question: 'Do you work with multi-location businesses?',
                        answer: 'Absolutely. We handle local SEO and Google Business Profiles at scale, with per-location visibility, Maps optimization, and reporting.'
                    }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
