'use client';

import { useEffect, useState } from 'react';

import { AgencyButton } from '@/components/ui/agency-button';
import { trackEvent } from '@/lib/analytics';

import { CheckCircle, Loader2, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/* ─────────── Reusable Quote / Contact slide-out panel ─────────── */

interface QuoteFormPanelProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    location?: string;
}

export function QuoteFormPanel({
    open,
    onClose,
    title = 'Request a Quote',
    subtitle = 'Tell us about your business — we respond within 24 hours.',
    location = 'quote_panel'
}: QuoteFormPanelProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

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
            trackEvent('form_submit', { form: 'quote', location });
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
                        <PanelContent
                            title={title}
                            subtitle={subtitle}
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
                            title={title}
                            subtitle={subtitle}
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
    title,
    subtitle,
    status,
    errorMsg,
    onClose,
    onSubmit,
    inputClass
}: {
    title: string;
    subtitle: string;
    status: 'idle' | 'submitting' | 'success' | 'error';
    errorMsg: string;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputClass: string;
}) {
    return (
        <>
            <div className='flex items-center justify-between border-b border-white/[0.06] px-6 py-5'>
                <div>
                    <h3 className='font-display text-foreground text-xl tracking-wide uppercase'>{title}</h3>
                    <p className='text-muted-foreground mt-0.5 text-sm'>{subtitle}</p>
                </div>
                <button
                    onClick={onClose}
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white'
                    aria-label='Close'>
                    <X className='h-5 w-5' />
                </button>
            </div>

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
                            <label htmlFor='qf-name' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Name *
                            </label>
                            <input id='qf-name' name='name' type='text' required className={inputClass} placeholder='Your name' />
                        </div>
                        <div>
                            <label htmlFor='qf-email' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Email *
                            </label>
                            <input
                                id='qf-email'
                                name='email'
                                type='email'
                                required
                                className={inputClass}
                                placeholder='you@company.com'
                            />
                        </div>
                        <div>
                            <label htmlFor='qf-phone' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Phone *
                            </label>
                            <input
                                id='qf-phone'
                                name='phone'
                                type='tel'
                                required
                                className={inputClass}
                                placeholder='(647) 000-0000'
                            />
                        </div>
                        <div>
                            <label htmlFor='qf-company' className='text-foreground mb-1.5 block text-sm font-medium'>
                                Business Name
                            </label>
                            <input
                                id='qf-company'
                                name='company'
                                type='text'
                                className={inputClass}
                                placeholder='Your business name'
                            />
                        </div>
                        <div>
                            <label htmlFor='qf-message' className='text-foreground mb-1.5 block text-sm font-medium'>
                                What do you need help with?
                            </label>
                            <textarea
                                id='qf-message'
                                name='message'
                                rows={4}
                                className={`${inputClass} resize-none`}
                                placeholder='SEO, Google/Meta ads, a new website, virtual tours…'
                            />
                        </div>

                        {status === 'error' && <p className='text-sm text-red-400'>{errorMsg}</p>}

                        <AgencyButton className='mt-2 w-full py-4 text-base' type='submit' disabled={status === 'submitting'}>
                            {status === 'submitting' ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                    Sending...
                                </span>
                            ) : (
                                'Request a Quote'
                            )}
                        </AgencyButton>
                    </form>
                )}
            </div>

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
