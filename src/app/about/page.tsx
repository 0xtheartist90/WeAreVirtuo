import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyResults } from '@/components/sections/agency/agency-results';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
    title: 'About — A Canadian Digital Marketing Agency',
    description:
        'Virtuo is a Canadian digital marketing agency built for the way customers search today — SEO, AI visibility, paid ads, and high-performance web.'
};

const approach = [
    {
        n: '01',
        title: 'Strategy',
        body: 'We map exactly where your customers are searching — Google, Maps, AI Overviews, paid — and where you’re invisible.'
    },
    {
        n: '02',
        title: 'Execution',
        body: 'SEO, Google & Meta ads, landing pages, and tracking — built and managed end to end, under one roof.'
    },
    {
        n: '03',
        title: 'Growth',
        body: 'We optimize against real conversions, not vanity rankings, and report on what actually moves the business.'
    }
];

export default function AboutPage() {
    return (
        <>
            <PageHeader
                index='04'
                label='About'
                title='We Are Virtuo'
                intro='A Canadian digital marketing agency built for how customers actually search today.'
                meta='Toronto · CA / US'
                image='/images/bts/cooking-show-setup.jpg'
            />

            {/* Statement */}
            <section className='py-20 md:py-28'>
                <div className='grid-layout'>
                    <p className='col-span-full mb-6 font-mono text-[11px] tracking-widest text-white/45 uppercase lg:col-start-2'>
                        [ What we believe ]
                    </p>
                    <h2 className='col-span-full font-display text-foreground text-3xl leading-[1.05] tracking-tight uppercase md:text-5xl lg:col-start-2 lg:col-end-11'>
                        Traditional SEO is no longer enough. We make businesses visible everywhere they’re discovered —
                        and turn that visibility into <span className='text-accent'>customers</span>.
                    </h2>
                </div>
            </section>

            <AgencyResults />

            {/* How we work — numbered */}
            <section className='border-y border-white/10 py-20 md:py-24'>
                <div className='grid-layout'>
                    <p className='col-span-full mb-10 text-sm font-medium tracking-widest text-white/55 uppercase lg:col-start-2'>
                        How We Work
                    </p>
                    <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                        <div className='grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-3'>
                            {approach.map((step) => (
                                <div key={step.n} className='flex flex-col gap-3 border-t border-white/15 pt-5'>
                                    <span className='text-accent font-mono text-sm'>/{step.n}</span>
                                    <h3 className='font-display text-foreground text-2xl tracking-wide uppercase'>
                                        {step.title}
                                    </h3>
                                    <p className='text-sm leading-relaxed text-white/70'>{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
