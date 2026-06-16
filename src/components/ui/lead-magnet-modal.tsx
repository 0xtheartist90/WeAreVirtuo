'use client';

import { useEffect, useState } from 'react';

import { ShimmerButton } from '@/components/ui/shimmer-button';
import { trackEvent } from '@/lib/analytics';

import { CheckCircle, FileText, Loader2, Lock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * LeadMagnetButton — renders the trigger button.
 * Opens a slide-from-right panel (desktop) / slide-up sheet (mobile).
 */
export function LeadMagnetButton({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type='button'
                onClick={() => setOpen(true)}
                className={`group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 ${className || ''}`}>
                <FileText className='h-4 w-4' />
                Get the Free Playbook
            </button>
            <LeadMagnetPanel open={open} onClose={() => setOpen(false)} />
        </>
    );
}

/* ─── Slide-out Panel ─── */

function LeadMagnetPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
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

                    {/* Desktop: slide from right */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className='bg-background fixed inset-y-0 right-0 z-[90] hidden w-full max-w-md flex-col border-l border-white/[0.06] shadow-2xl md:flex'>
                        <PanelContent onClose={onClose} />
                    </motion.div>

                    {/* Mobile: slide up from bottom */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className='bg-background fixed inset-x-0 bottom-0 z-[90] flex max-h-[90vh] flex-col rounded-t-2xl border-t border-white/[0.06] shadow-2xl md:hidden'>
                        <PanelContent onClose={onClose} />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─── Panel Content ─── */

function PanelContent({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

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
                    phone: '',
                    company: data.get('restaurant'),
                    message: '[Lead Magnet Download] Restaurant Video Playbook'
                })
            });

            if (!res.ok) {
                const body = await res.json();
                setErrorMsg(body.error || 'Something went wrong. Please try again.');
                setStatus('error');

                return;
            }

            setStatus('success');
            trackEvent('lead_magnet_download', { content: 'restaurant-video-playbook' });
            form.reset();
        } catch {
            setErrorMsg('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    const inputClass =
        'bg-[#111] border-white/[0.12] focus:border-accent focus:ring-accent/20 placeholder:text-white/40 w-full rounded-lg border px-4 py-3.5 text-white transition-colors focus:ring-2 focus:outline-none';

    return (
        <>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-white/[0.06] px-6 py-5'>
                <div className='flex items-center gap-3'>
                    <div className='bg-accent/10 border-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border'>
                        <FileText className='text-accent h-5 w-5' />
                    </div>
                    <div>
                        <h3 className='font-display text-foreground text-lg tracking-wide uppercase'>Free Playbook</h3>
                        <p className='text-muted-foreground text-xs'>The Restaurant Video Guide</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white'
                    aria-label='Close'>
                    <X className='h-5 w-5' />
                </button>
            </div>

            {/* Body */}
            <div className='flex-1 overflow-y-auto px-6 py-6'>
                {status === 'success' ? (
                    <div className='flex flex-col items-center py-12 text-center'>
                        <CheckCircle className='mb-4 h-14 w-14 text-green-500' />
                        <h3 className='text-foreground mb-2 text-2xl font-semibold'>Check Your Inbox!</h3>
                        <p className='text-white/80'>The Restaurant Video Playbook is on its way.</p>
                    </div>
                ) : (
                    <>
                        {/* Value proposition */}
                        <div className='mb-8'>
                            <h3 className='font-display text-foreground text-xl tracking-wide uppercase'>
                                The Restaurant Video Playbook
                            </h3>
                            <p className='mt-2 text-sm leading-relaxed text-white/70'>
                                How Toronto&apos;s top restaurants use video to fill tables — and how AI is changing the
                                game.
                            </p>
                            <ul className='mt-4 space-y-2'>
                                <li className='flex items-start gap-2 text-sm text-white/80'>
                                    <span className='text-accent mt-0.5'>&#10003;</span>5 video types that drive
                                    bookings
                                </li>
                                <li className='flex items-start gap-2 text-sm text-white/80'>
                                    <span className='text-accent mt-0.5'>&#10003;</span>
                                    Real ROI numbers from Toronto restaurants
                                </li>
                                <li className='flex items-start gap-2 text-sm text-white/80'>
                                    <span className='text-accent mt-0.5'>&#10003;</span>
                                    AI tools that cut production costs
                                </li>
                            </ul>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='lm-name' className='text-foreground mb-1.5 block text-sm font-medium'>
                                    Name *
                                </label>
                                <input
                                    id='lm-name'
                                    name='name'
                                    type='text'
                                    required
                                    className={inputClass}
                                    placeholder='Your name'
                                />
                            </div>
                            <div>
                                <label htmlFor='lm-email' className='text-foreground mb-1.5 block text-sm font-medium'>
                                    Email *
                                </label>
                                <input
                                    id='lm-email'
                                    name='email'
                                    type='email'
                                    required
                                    className={inputClass}
                                    placeholder='you@restaurant.com'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='lm-restaurant'
                                    className='text-foreground mb-1.5 block text-sm font-medium'>
                                    Restaurant Name *
                                </label>
                                <input
                                    id='lm-restaurant'
                                    name='restaurant'
                                    type='text'
                                    required
                                    className={inputClass}
                                    placeholder='Your restaurant or venue'
                                />
                            </div>

                            {/* CASL opt-in */}
                            <label className='flex items-start gap-3 pt-1'>
                                <input
                                    type='checkbox'
                                    name='marketing_optin'
                                    className='mt-0.5 h-4 w-4 rounded border-white/20'
                                />
                                <span className='text-xs leading-relaxed text-white/60'>
                                    Send me video marketing tips and updates (optional)
                                </span>
                            </label>

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
                                    'Get the Free Playbook →'
                                )}
                            </ShimmerButton>
                        </form>

                        <p className='mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-white/50'>
                            <Lock className='h-3 w-3' />
                            No spam. Unsubscribe anytime.
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
