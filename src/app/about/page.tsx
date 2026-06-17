import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { PageHeader } from '@/components/ui/page-header';
import { processGlyphs } from '@/components/ui/process-glyphs';

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

const story = [
    {
        phase: 'The Origin',
        title: 'Behind the Lens',
        body: 'Virtuo began as a video and 360° production studio — crafting cinematic content and immersive tours for Toronto’s most ambitious hospitality, automotive, and luxury brands.'
    },
    {
        phase: 'The Shift',
        title: 'Content Wasn’t Enough',
        body: 'Clients kept asking the same question: how do we actually get found? Beautiful work meant little if no one discovered it — so we went deeper, into SEO, local search, and the platforms where customers really decide.'
    },
    {
        phase: 'Today',
        title: 'A Full Digital Engine',
        body: 'Now we connect visibility, advertising, web, and production into one engine — built for how people search today across Google, Maps, and AI. 10,000+ tours and hundreds of brands later, we’re just getting started.'
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

            {/* Our Story — narrative timeline */}
            <section id='our-story' className='border-t border-white/10 py-20 md:py-28'>
                <div className='grid-layout'>
                    <div className='col-span-full lg:col-start-2 lg:col-end-7'>
                        <p className='text-accent mb-4 font-mono text-[11px] tracking-widest uppercase'>[ Our Story ]</p>
                        <h2 className='font-display text-foreground text-4xl leading-[0.92] tracking-tight uppercase md:text-5xl'>
                            From the Lens to the Whole Funnel
                        </h2>
                        <p className='mt-5 max-w-md text-lg text-white/70'>
                            What started as a camera and a 360° rig became a full digital marketing agency. The thread
                            that connects it all: helping ambitious brands get seen.
                        </p>
                    </div>

                    <div className='col-span-full mt-12 lg:col-start-7 lg:col-end-12 lg:mt-0'>
                        <ol className='border-l border-white/15'>
                            {story.map((ch, i) => (
                                <li key={ch.phase} className='relative pb-10 pl-8 last:pb-0'>
                                    <span className='bg-accent absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full' />
                                    <p className='text-accent flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase'>
                                        <span className='text-white/40'>/{String(i + 1).padStart(2, '0')}</span>
                                        {ch.phase}
                                    </p>
                                    <h3 className='font-display text-foreground mt-1.5 text-2xl tracking-wide uppercase'>
                                        {ch.title}
                                    </h3>
                                    <p className='mt-2 max-w-md text-sm leading-relaxed text-white/65'>{ch.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* How we work — numbered */}
            <section className='border-y border-white/10 py-20 md:py-24'>
                <div className='grid-layout'>
                    <p className='col-span-full mb-10 text-sm font-medium tracking-widest text-white/55 uppercase lg:col-start-2'>
                        How We Work
                    </p>
                    <div className='col-span-full lg:col-start-2 lg:col-end-12'>
                        <div className='grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-3'>
                            {approach.map((step, i) => {
                                const Glyph = processGlyphs[i % processGlyphs.length];

                                return (
                                    <div key={step.n} className='flex flex-col gap-3 border-t border-white/15 pt-5'>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-accent font-mono text-sm'>/{step.n}</span>
                                            <Glyph className='text-accent h-9 w-9' />
                                        </div>
                                        <h3 className='font-display text-foreground mt-1 text-2xl tracking-wide uppercase'>
                                            {step.title}
                                        </h3>
                                        <p className='text-sm leading-relaxed text-white/70'>{step.body}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <AgencyContact />

            <AgencyFooter />
        </>
    );
}
