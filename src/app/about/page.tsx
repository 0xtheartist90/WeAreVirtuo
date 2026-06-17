import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyProcess } from '@/components/sections/agency/agency-process';
import { AgencyStory } from '@/components/sections/agency/agency-story';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
    title: 'About — A Canadian Digital Marketing Agency',
    description:
        'Virtuo is a Canadian digital marketing agency built for the way customers search today — SEO, AI visibility, paid ads, and high-performance web.'
};

export default function AboutPage() {
    return (
        <>
            <PageHeader
                index='04'
                label='About'
                title='We Are Virtuo'
                intro='A Canadian digital marketing agency built for how customers actually search today.'
                meta='Toronto · CA / US'
                image='/images/about/studio-wide.png'
            />

            <AgencyStory />

            {/* What We Believe — white statement */}
            <section className='bg-white py-20 text-neutral-900 md:py-28'>
                <div className='grid-layout'>
                    <p className='col-span-full mb-6 font-mono text-[11px] tracking-widest text-neutral-500 uppercase lg:col-start-2'>
                        [ What We Believe ]
                    </p>
                    <h2 className='col-span-full font-display text-3xl leading-[1.05] tracking-tight text-neutral-900 uppercase md:text-5xl lg:col-start-2 lg:col-end-11'>
                        Traditional SEO is no longer enough. We make businesses visible everywhere they’re discovered —
                        and turn that visibility into <span className='text-accent'>customers</span>.
                    </h2>
                </div>
            </section>

            <AgencyProcess />

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
