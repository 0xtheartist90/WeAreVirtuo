'use client';

import { useEffect, useRef, useState } from 'react';

import { CharacterReveal } from '@/components/ui/character-reveal';
import { CinematicSection } from '@/components/ui/cinematic-section';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { trackEvent } from '@/lib/analytics';

import { ArrowRight, CheckCircle, Loader2, MapPin, Phone, Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/* ─────────── Form Slide-Out Panel ─────────── */

function FormPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    email: data.get('email'),
                    phone: data.get('phone'),
                    company: data.get('company'),
                    message: data.get('message')
                })
            });

            if (!res.ok) {
                const body = await res.json();
                setErrorMsg(body.error || 'Something went wrong. Please try again.');
                setStatus('error');

                return;
            }

            setStatus('success');
            trackEvent('form_submit', { form: 'contact', location: 'slide_panel' });
            form.reset();
        } catch {
            setErrorMsg('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    const inputClass =
        'bg-background border-border focus:border-accent focus:ring-accent/20 placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3.5 text-white transition-colors focus:ring-2 focus:outline-none';

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm'
                        onClick={onClose}
                    />

                    {/* Desktop: slide from right / Mobile: slide up from bottom */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className='bg-background fixed inset-y-0 right-0 z-[90] hidden w-full max-w-md flex-col border-l border-white/[0.06] shadow-2xl md:flex'>
                        <PanelContent
                            status={status}
                            errorMsg={errorMsg}
                            onClose={onClose}
                            onSubmit={handleSubmit}
                            inputClass={inputClass}
                        />
                    </motion.div>

                    {/* Mobile: slide up from bottom */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className='bg-background fixed inset-x-0 bottom-0 z-[90] flex max-h-[85vh] flex-col rounded-t-2xl border-t border-white/[0.06] shadow-2xl md:hidden'>
                        <PanelContent
                            status={status}
                            errorMsg={errorMsg}
                            onClose={onClose}
                            onSubmit={handleSubmit}
                            inputClass={inputClass}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function PanelContent({
    status,
    errorMsg,
    onClose,
    onSubmit,
    inputClass
}: {
    status: 'idle' | 'submitting' | 'success' | 'error';
    errorMsg: string;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputClass: string;
}) {
    return (
        <>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-white/[0.06] px-6 py-5'>
                <div>
                    <h3 className='font-display text-foreground text-xl tracking-wide uppercase'>Send Us a Message</h3>
                    <p className='text-muted-foreground mt-0.5 text-sm'>Our team responds within 24 hours</p>
                </div>
                <button
                    onClick={onClose}
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white'
                    aria-label='Close'>
                    <X className='h-5 w-5' />
                </button>
            </div>

            {/* Form */}
            <div className='flex-1 overflow-y-auto px-6 py-6'>
                {status === 'success' ? (
                    <div className='flex flex-col items-center py-12 text-center'>
                        <CheckCircle className='mb-4 h-14 w-14 text-green-500' />
                        <h3 className='text-foreground mb-2 text-2xl font-semibold'>Message Sent!</h3>
                        <p className='text-muted-foreground'>We&apos;ll be in touch within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor='panel-name' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Name *
                            </label>
                            <input
                                id='panel-name'
                                name='name'
                                type='text'
                                required
                                className={inputClass}
                                placeholder='Your name'
                            />
                        </div>
                        <div>
                            <label htmlFor='panel-email' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Email *
                            </label>
                            <input
                                id='panel-email'
                                name='email'
                                type='email'
                                required
                                className={inputClass}
                                placeholder='you@company.com'
                            />
                        </div>
                        <div>
                            <label htmlFor='panel-phone' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Phone *
                            </label>
                            <input
                                id='panel-phone'
                                name='phone'
                                type='tel'
                                required
                                className={inputClass}
                                placeholder='(647) 000-0000'
                            />
                        </div>
                        <div>
                            <label htmlFor='panel-company' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Restaurant / Business Name
                            </label>
                            <input
                                id='panel-company'
                                name='company'
                                type='text'
                                className={inputClass}
                                placeholder='Your business name'
                            />
                        </div>
                        <div>
                            <label htmlFor='panel-message' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Tell us about your project
                            </label>
                            <textarea
                                id='panel-message'
                                name='message'
                                rows={4}
                                className={`${inputClass} resize-none`}
                                placeholder='What kind of video do you need? Any timeline or budget in mind?'
                            />
                        </div>

                        {status === 'error' && <p className='text-sm text-red-400'>{errorMsg}</p>}

                        <ShimmerButton
                            shimmerColor='rgba(220, 38, 38, 0.8)'
                            background='rgba(220, 38, 38, 0.9)'
                            className='mt-2 w-full py-4 text-base font-semibold'
                            type='submit'
                            disabled={status === 'submitting'}>
                            {status === 'submitting' ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </ShimmerButton>
                    </form>
                )}
            </div>

            {/* Bottom — alternative contact */}
            <div className='border-t border-white/[0.06] px-6 py-4'>
                <p className='text-muted-foreground mb-2 text-center text-xs'>Or reach us directly</p>
                <a
                    href='tel:6479530222'
                    className='text-muted-foreground hover:text-accent flex items-center justify-center gap-2 text-sm font-medium transition-colors'>
                    <Phone className='h-4 w-4' />
                    647-953-0222
                </a>
            </div>
        </>
    );
}

/* ─────────── Final CTA — "The Closing Shot" ─────────── */

export function V2FinalCta() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <CinematicSection
                id='contact'
                bgImage='/images/bts/full-production-set.jpg'
                overlayOpacity={55}
                className='py-24 md:py-36'>
                {/* Content */}
                <div className='mx-auto max-w-[var(--max-width-content)] px-4 text-center md:px-8'>
                    <p className='text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase'>Your Next Project</p>

                    <CharacterReveal
                        as='h2'
                        className='font-display text-foreground mx-auto max-w-3xl text-4xl leading-tight tracking-wide uppercase md:text-6xl lg:text-7xl'>
                        Your Story Deserves Cinema
                    </CharacterReveal>

                    <p className='mx-auto mt-5 max-w-xl text-lg text-white/80'>
                        Toronto&apos;s premier video production team. Currently booking Summer 2026.
                    </p>

                    {/* Two CTAs */}
                    <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                        <a href='tel:6479530222'>
                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='px-8 py-4 text-base font-semibold'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call Jeff — 647-953-0222
                            </ShimmerButton>
                        </a>
                        <button
                            type='button'
                            onClick={() => setFormOpen(true)}
                            className='group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10'>
                            Send a Message
                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                    <p className='mt-3 text-xs text-white/60'>Creative Director & Founder</p>

                    {/* Inline testimonial */}
                    <div className='mx-auto mt-14 max-w-lg'>
                        <div className='mb-3 flex justify-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className='fill-accent text-accent h-4 w-4' />
                            ))}
                        </div>
                        <blockquote className='text-foreground text-base leading-relaxed italic'>
                            &ldquo;Their expertise in creating engaging reels and 360 content transformed our online
                            presence and enhanced our marketing efforts.&rdquo;
                        </blockquote>
                        <p className='mt-3 text-sm text-white/70'>
                            — Patrick Lee, Owner, <span className='text-accent font-medium'>Nome Izakaya</span>
                        </p>
                    </div>

                    {/* Footer line */}
                    <div className='mt-12 flex items-center justify-center gap-1.5'>
                        <MapPin className='text-accent h-3.5 w-3.5' />
                        <p className='text-sm text-white/70'>548 Dundas St W, Toronto &middot; Mon–Fri 9AM–7PM</p>
                    </div>
                </div>
            </CinematicSection>

            {/* Form slide-out panel */}
            <FormPanel open={formOpen} onClose={() => setFormOpen(false)} />
        </>
    );
}
