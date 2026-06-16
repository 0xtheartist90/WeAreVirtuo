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
                eyebrow='Web Development'
                title='Sites Built to Perform'
                intro='We engineer high-performance websites on Next.js and Vercel — fast, SEO-ready, mobile-first, and built to convert. Marketing performs better on infrastructure designed for it.'
                bgImage='/images/bts/cooking-show-setup.jpg'
                capabilities={[
                    { title: 'Next.js + Vercel', detail: 'Modern React architecture on a global edge network.' },
                    { title: 'Technical SEO', detail: 'Clean semantic structure and SEO-readiness from day one.' },
                    { title: 'Conversion-Focused', detail: 'Landing pages and funnels designed to turn traffic into leads.' },
                    { title: 'Core Web Vitals', detail: 'Top performance scores on every device.' },
                    { title: 'Mobile-First', detail: 'Designed for the way customers actually browse.' },
                    { title: 'Scalable Systems', detail: 'Reusable, modular structure that grows with your business.' }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
