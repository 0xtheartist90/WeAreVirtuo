'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ScrollTrigger, gsap } from '@/lib/gsap-setup';

/* ─────────── Journey Step Data ─────────── */

const journeySteps = [
    {
        number: 1,
        label: 'Discovery',
        headline: 'It Starts With a Conversation',
        body: 'We come to you — your restaurant, your bar, your space. We want to feel the energy, see the lighting, taste the menu. Because great video starts with understanding, not a camera.',
        bullets: [
            'On-site location visit',
            'Brand & audience deep-dive',
            'Custom shot list & mood board',
            'Clear timeline & budget — no surprises'
        ],
        image: '/images/bts/cooking-show-setup.jpg',
        bgImage: '/images/bts/steadicam-operator.jpg'
    },
    {
        number: 2,
        label: 'Production',
        headline: 'Lights. Camera. Magic.',
        body: 'This is what we live for. Professional cinema cameras, studio lighting, and a crew that\u2019s done this 150+ times. Your space transforms into a set \u2014 and your food, your drinks, your atmosphere become the stars.',
        bullets: [
            'Cinema cameras (RED, Sony FX6)',
            'Professional lighting & audio',
            'Directed talent & food styling',
            'Multiple angles, multiple setups'
        ],
        image: '/images/bts/cinematographer-red.jpg',
        bgImage: '/images/bts/full-production-set.jpg'
    },
    {
        number: 3,
        label: 'Post-Production',
        headline: 'Where Footage Becomes Film',
        body: 'Raw footage is just ingredients. In our edit suite, we craft the pacing, build the mood, and find the moments that make people stop scrolling. You get revision rounds until it\u2019s exactly right.',
        bullets: [
            'Professional editing in DaVinci Resolve',
            'Cinema-grade color grading',
            'Music licensing & sound design',
            'Two rounds of revisions included'
        ],
        image: '/images/about/studio-wide.png',
        bgImage: '/images/bts/silhouette-setup.png'
    },
    {
        number: 4,
        label: 'Delivery',
        headline: 'Your Story Goes Live',
        body: 'Final files delivered in every format you need \u2014 Instagram, TikTok, YouTube, your website. We don\u2019t just hand off files and disappear. We help you plan the launch for maximum impact.',
        bullets: [
            'All formats & aspect ratios',
            'Social media launch strategy',
            'Thumbnail selection & caption guidance',
            'Ongoing content partnership options'
        ],
        image: '/images/bts/commercial-stage.jpg',
        bgImage: '/images/bts/cinematographer-red.jpg'
    }
];

/* ─────────── Progress Track ─────────── */

function ProgressTrack({
    activeStep,
    total,
    onStepClick
}: {
    activeStep: number;
    total: number;
    onStepClick: (step: number) => void;
}) {
    return (
        <div className='flex items-center justify-center gap-0'>
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className='flex items-center'>
                    <button
                        type='button'
                        onClick={() => onStepClick(i)}
                        className='group relative flex flex-col items-center'
                        aria-label={`Go to step ${i + 1}: ${journeySteps[i].label}`}>
                        <div
                            className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ${
                                i <= activeStep
                                    ? 'border-accent bg-accent scale-110'
                                    : 'scale-100 border-white/30 bg-transparent'
                            }`}
                        />
                        <span
                            className={`mt-2 hidden text-[10px] font-medium tracking-widest uppercase transition-colors duration-500 md:block ${
                                i <= activeStep ? 'text-accent' : 'text-white/50'
                            }`}>
                            {journeySteps[i].label}
                        </span>
                    </button>
                    {i < total - 1 && (
                        <div className='mx-1 h-px w-12 md:mx-2 md:w-20'>
                            <div
                                className={`h-full transition-all duration-700 ${
                                    i < activeStep ? 'bg-accent' : 'bg-white/15'
                                }`}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

/* ─────────── Step Content ─────────── */

function StepContent({ step, isActive }: { step: (typeof journeySteps)[0]; isActive: boolean }) {
    return (
        <div
            className='absolute inset-0 flex items-center transition-opacity duration-700'
            style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}>
            <div className='mx-auto w-full max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16'>
                    {/* Text side */}
                    <div className='text-center md:text-left'>
                        <span className='text-accent font-mono text-xs font-semibold tracking-widest'>
                            Step {String(step.number).padStart(2, '0')}
                        </span>
                        <h3 className='font-display text-foreground mt-3 text-3xl leading-tight tracking-wide uppercase md:text-5xl'>
                            {step.headline}
                        </h3>
                        <p className='mt-5 text-base leading-relaxed text-white/80 md:text-lg'>{step.body}</p>
                        <ul className='mt-6 space-y-2'>
                            {step.bullets.map((bullet) => (
                                <li key={bullet} className='flex items-start gap-3 text-sm text-white/90'>
                                    <span className='text-accent mt-1 text-xs'>&#10003;</span>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image side */}
                    <div className='relative mx-auto w-full max-w-md md:mx-0 md:max-w-none'>
                        <div className='relative overflow-hidden rounded-2xl border border-white/[0.08]'>
                            <img src={step.image} alt={step.headline} className='aspect-[4/3] w-full object-cover' />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                            <span className='absolute top-4 right-5 font-mono text-6xl font-bold text-white/[0.06] md:text-8xl'>
                                {String(step.number).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────── Static Fallback (mobile + reduced motion) ─────────── */

function StaticJourney() {
    return (
        <div className='space-y-0'>
            {journeySteps.map((step, idx) => (
                <div key={step.number} className='relative overflow-hidden'>
                    {/* BTS Background per step */}
                    <div className='absolute inset-0'>
                        <img src={step.bgImage} alt='' aria-hidden='true' className='h-full w-full object-cover' />
                        <div className='absolute inset-0 bg-black/75' />
                        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40' />
                    </div>

                    <div className='relative z-[3] mx-auto max-w-[var(--max-width-content)] px-4 py-16 md:px-8 md:py-24'>
                        <div
                            className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${idx % 2 !== 0 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
                            <div className='text-center md:text-left'>
                                <span className='text-accent font-mono text-xs font-semibold tracking-widest'>
                                    Step {String(step.number).padStart(2, '0')}
                                </span>
                                <h3 className='font-display text-foreground mt-3 text-2xl tracking-wide uppercase md:text-4xl'>
                                    {step.headline}
                                </h3>
                                <p className='mt-4 text-base leading-relaxed text-white/80'>{step.body}</p>
                                <ul className='mt-5 space-y-2'>
                                    {step.bullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            className='flex items-start justify-center gap-3 text-sm text-white/90 md:justify-start'>
                                            <span className='text-accent mt-1 text-xs'>&#10003;</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='relative overflow-hidden rounded-2xl border border-white/[0.08]'>
                                <img
                                    src={step.image}
                                    alt={step.headline}
                                    className='aspect-[4/3] w-full object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─────────── GSAP Pinned Journey (desktop + motion enabled) ─────────── */

function GsapJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const pinned = pinnedRef.current;
        if (!container || !pinned) return;

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: `+=${journeySteps.length * 100}%`,
            pin: pinned,
            scrub: 1,
            onUpdate: (self) => {
                const stepIndex = Math.min(journeySteps.length - 1, Math.floor(self.progress * journeySteps.length));
                setActiveStep(stepIndex);
            }
        });

        return () => {
            trigger.kill();
        };
    }, []);

    const handleStepClick = useCallback((step: number) => {
        const container = containerRef.current;
        if (!container) return;
        const triggers = ScrollTrigger.getAll().filter((t) => t.trigger === container);
        if (triggers.length === 0) return;
        const st = triggers[0];
        const targetProgress = step / journeySteps.length;
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: 'power3.inOut' });
    }, []);

    return (
        <div ref={containerRef}>
            <div ref={pinnedRef} className='relative h-screen overflow-hidden'>
                {/* Background images — cross-fade per step */}
                {journeySteps.map((step, idx) => (
                    <div
                        key={`bg-${step.number}`}
                        className='absolute inset-0 transition-opacity duration-1000'
                        style={{ opacity: idx === activeStep ? 1 : 0 }}>
                        <img src={step.bgImage} alt='' aria-hidden='true' className='h-full w-full object-cover' />
                        {/* Heavy overlay */}
                        <div className='absolute inset-0 bg-black/70' />
                        {/* Gradient blend */}
                        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60' />
                        {/* Vignette */}
                        <div
                            className='absolute inset-0'
                            style={{
                                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)'
                            }}
                        />
                    </div>
                ))}

                {/* Steps — cross-fade */}
                <div className='relative z-[3] h-full'>
                    {journeySteps.map((step, idx) => (
                        <StepContent key={step.number} step={step} isActive={idx === activeStep} />
                    ))}
                </div>

                {/* Progress track — bottom */}
                <div className='absolute inset-x-0 bottom-8 z-20'>
                    <ProgressTrack activeStep={activeStep} total={journeySteps.length} onStepClick={handleStepClick} />
                </div>
            </div>
        </div>
    );
}

/* ─────────── Main: The Journey ─────────── */

interface V2ProcessProps {
    steps?: unknown;
}

export function V2Process(_props: V2ProcessProps) {
    const reducedMotion = useReducedMotion();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        setIsDesktop(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mq.addEventListener('change', handler);

        return () => mq.removeEventListener('change', handler);
    }, []);

    const usePinned = isDesktop && !reducedMotion;

    return (
        <section>
            {/* Section Header */}
            <div className='py-16 md:py-24'>
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                    <div className='text-center'>
                        <p className='text-accent mb-3 text-sm font-medium tracking-widest uppercase'>The Journey</p>
                        <CharacterReveal
                            as='h2'
                            className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl'>
                            How We Bring Your Vision to Life
                        </CharacterReveal>
                        <p className='mx-auto max-w-[var(--max-width-prose)] text-lg text-white/80'>
                            From first conversation to final delivery — a process built around you.
                        </p>
                    </div>
                </div>
            </div>

            {/* GSAP pinned scroll (desktop) or static fallback (mobile) */}
            {usePinned ? (
                <GsapJourney />
            ) : (
                <div className='pb-16 md:pb-24'>
                    <StaticJourney />
                </div>
            )}

            {/* Bottom spacing for diagonal transition into FAQ */}
            <div className='h-16 md:h-24' />
        </section>
    );
}
