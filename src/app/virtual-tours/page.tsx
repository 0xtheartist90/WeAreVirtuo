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
                eyebrow='Virtual Tours & 360°'
                title='Step Inside the Experience'
                intro='Custom 360° experiences and Google Virtual Tours for hospitality, automotive, retail, and enterprise activations. Over 10,000 immersive tours produced across North America.'
                bgImage='/images/bts/silhouette-setup.png'
                capabilities={[
                    { title: '10,000+ Tours Completed', detail: 'A decade-plus of immersive production experience.' },
                    { title: 'Custom 360° Environments', detail: 'Interactive, branded experiences tailored to your space.' },
                    { title: 'Google Virtual Tours', detail: 'Trusted Street View production that boosts local visibility.' },
                    { title: 'Hospitality & Retail', detail: 'Hotels, restaurants, showrooms, and venues.' },
                    { title: 'Automotive Activations', detail: 'Showroom and event-scale interactive experiences.' },
                    { title: 'Enterprise Production', detail: 'Large-scale commercial and multi-location rollouts.' }
                ]}
            />
            <AgencyFooter />
        </>
    );
}
