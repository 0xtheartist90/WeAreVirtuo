import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { ServicePageStub } from '@/components/sections/agency/service-page-stub';

export const metadata = {
    title: 'Virtual Tours & 360° Experiences',
    description:
        'Custom 360° virtual tours and Google Virtual Tours for hospitality, automotive, retail, and large-scale activations. Over 10,000 tours produced.'
};

export default function VirtualToursPage() {
    return (
        <>
            <ServicePageStub
                index='03'
                glyphIndex={2}
                eyebrow='Virtual Tours & 360°'
                title='Step Inside the Experience'
                intro='Custom 360° experiences and Google Virtual Tours for hospitality, automotive, retail, and enterprise activations. Over 10,000 immersive tours produced across North America.'
                meta='10,000+ Tours'
                statement='Over 10,000 immersive tours produced — putting customers inside your space before they ever walk in.'
                bgImage='/images/bts/silhouette-setup.png'
                bodyImage='/images/bts/cinematographer-red.jpg'
                capabilities={[
                    { title: '10,000+ Tours Completed', detail: 'A decade-plus of immersive production experience.' },
                    { title: 'Custom 360° Environments', detail: 'Interactive, branded experiences tailored to your space.' },
                    { title: 'Google Virtual Tours', detail: 'Trusted Street View production that boosts local visibility.' },
                    { title: 'Hospitality & Retail', detail: 'Hotels, restaurants, showrooms, and venues.' },
                    { title: 'Automotive Activations', detail: 'Showroom and event-scale interactive experiences.' },
                    { title: 'Enterprise Production', detail: 'Large-scale commercial and multi-location rollouts.' }
                ]}
                painPoints={[
                    'Customers can’t picture your space before they commit.',
                    'Your Google listing is just photos — no immersive experience.',
                    'Competitors with virtual tours win the engagement on Maps.',
                    'You’ve invested in your space, but it doesn’t show online.'
                ]}
                process={[
                    { title: 'Plan', detail: 'We scope the space, the shots, and the goals for the tour.' },
                    { title: 'Capture', detail: 'On-site 360° capture with professional equipment.' },
                    { title: 'Produce', detail: 'A branded, interactive tour — built and optimized.' },
                    { title: 'Publish', detail: 'Live on Google, your website, and across your listings.' }
                ]}
                outcomes={[
                    'Customers explore your space before they ever arrive.',
                    'Higher engagement and visibility on Google Maps.',
                    'An immersive asset you can use everywhere.',
                    'Trusted, Street View-quality production.'
                ]}
                faq={[
                    {
                        question: 'What is a Google Virtual Tour?',
                        answer: 'A Street View-trusted 360° tour of your space that appears on Google Search and Maps, boosting local visibility and engagement.'
                    },
                    {
                        question: 'How long does a tour take to produce?',
                        answer: 'Most shoots take a few hours on site; finished interactive tours are typically delivered within 1–2 weeks depending on scale.'
                    },
                    {
                        question: 'What industries do you cover?',
                        answer: 'Hospitality, restaurants, automotive, retail, venues, and large-scale commercial activations — over 10,000 tours produced.'
                    },
                    {
                        question: 'Can tours be embedded on our website?',
                        answer: 'Yes — every tour can be embedded on your site and shared across listings and social, in addition to Google.'
                    }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
