import Link from 'next/link';
import { notFound } from 'next/navigation';

import { V2Footer } from '@/components/sections/v2-footer';
import { CharacterReveal } from '@/components/ui/character-reveal';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { ShimmerButton } from '@/components/ui/shimmer-button';

import { ArrowRight, Phone } from 'lucide-react';

const industries: Record<string, string> = {
    nightlife: 'Nightlife',
    corporate: 'Corporate',
    events: 'Events',
    hospitality: 'Hospitality',
    'real-estate': 'Real Estate',
    automotive: 'Automotive',
    entertainment: 'Entertainment'
};

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(industries).map((slug) => ({ industry: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
    const { industry } = await params;
    const name = industries[industry];
    if (!name) return {};

    return {
        title: `${name} Video Production Toronto | Virtuo Video`,
        description: `Premium ${name.toLowerCase()} video production in Toronto. Coming soon.`
    };
}

export default async function ComingSoonPage({ params }: { params: Promise<{ industry: string }> }) {
    const { industry } = await params;
    const name = industries[industry];
    if (!name) notFound();

    return (
        <>
            <CinematicSection bgImage='/images/bts/commercial-stage.jpg' overlayOpacity={70} className='min-h-screen'>
                <div className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>Coming Soon</p>

                    <CharacterReveal
                        as='h1'
                        className='font-display text-foreground mx-auto max-w-3xl text-4xl leading-tight tracking-wide uppercase md:text-6xl lg:text-7xl'>
                        {`${name} Video Production`}
                    </CharacterReveal>

                    <p className='mx-auto mt-6 max-w-lg text-lg text-white/80'>
                        We&apos;re crafting something special for the {name.toLowerCase()} industry. In the meantime,
                        explore our work.
                    </p>

                    <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-base font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call 647-953-0222
                            </ShimmerButton>
                        </a>
                        <Link
                            href='/'
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Explore Our Work
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Link>
                    </div>

                    <Link
                        href='/restaurants'
                        className='text-accent/70 hover:text-accent mt-6 text-sm underline underline-offset-4 transition-colors'>
                        Or check out our restaurant portfolio
                    </Link>

                    <p className='text-accent mt-8 text-sm font-medium tracking-wide'>Currently booking Summer 2026</p>
                </div>
            </CinematicSection>

            <V2Footer />
        </>
    );
}
