import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { ServicePageStub } from '@/components/sections/agency/service-page-stub';

export const metadata = {
    title: 'Web Development — High-Performance Next.js Websites',
    description:
        'High-performance websites built on Next.js and Vercel — SEO-ready, mobile-first, and conversion-focused. The infrastructure your campaigns deserve.'
};

export default function WebDevelopmentPage() {
    return (
        <>
            <ServicePageStub
                index='02'
                glyphIndex={1}
                eyebrow='Web Development'
                title='Sites Built to Perform'
                intro='We engineer high-performance websites on Next.js and Vercel — fast, SEO-ready, mobile-first, and built to convert. Marketing performs better on infrastructure designed for it.'
                meta='Next.js · Vercel'
                statement='A campaign is only as good as the site it points to. We build the infrastructure that makes marketing convert.'
                bgImage='/images/bts/cooking-show-setup.jpg'
                capabilities={[
                    { title: 'Next.js + Vercel', detail: 'Modern React architecture on a global edge network.' },
                    { title: 'Technical SEO', detail: 'Clean semantic structure and SEO-readiness from day one.' },
                    { title: 'Conversion-Focused', detail: 'Landing pages and funnels designed to turn traffic into leads.' },
                    { title: 'Core Web Vitals', detail: 'Top performance scores on every device.' },
                    { title: 'Mobile-First', detail: 'Designed for the way customers actually browse.' },
                    { title: 'Scalable Systems', detail: 'Reusable, modular structure that grows with your business.' }
                ]}
                faq={[
                    {
                        question: 'Why do you build on Next.js and Vercel?',
                        answer: 'It delivers top Core Web Vitals, edge performance, and SEO-ready rendering out of the box — the infrastructure marketing campaigns perform best on.'
                    },
                    {
                        question: 'Can you redesign our existing website?',
                        answer: 'Yes — from a full rebuild to a focused conversion redesign. We audit first, then rebuild on modern, fast architecture.'
                    },
                    {
                        question: 'Will the site be SEO-ready?',
                        answer: 'Every build ships with clean semantic markup, structured data, and technical SEO baked in from day one.'
                    },
                    {
                        question: 'Do you handle hosting and maintenance?',
                        answer: 'We deploy on Vercel’s global edge network and can manage hosting, updates, and ongoing performance optimization.'
                    }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
