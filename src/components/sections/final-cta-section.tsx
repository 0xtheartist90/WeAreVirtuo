'use client';

import { useState } from 'react';

import { LampEffect } from '@/components/effects/lamp-effect';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { trackEvent } from '@/lib/analytics';

import { Loader2, CheckCircle, Phone } from 'lucide-react';

export function FinalCtaSection() {
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
                    phone: data.get('phone'),
                    company: data.get('company'),
                    message: data.get('message'),
                }),
            });

            if (!res.ok) {
                const body = await res.json();

                setErrorMsg(body.error || 'Something went wrong. Please try again.');
                setStatus('error');

                return;
            }

            setStatus('success');
            trackEvent('form_submit', { form: 'contact' });
            form.reset();
        } catch {
            setErrorMsg('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    return (
        <section id='contact'>
            <LampEffect className='min-h-screen py-24 md:py-32'>
                <div className='mx-auto w-full max-w-2xl text-center'>
                    <h2 className='font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-5xl'>
                        Let&apos;s Create Something Amazing
                    </h2>
                    <p className='text-muted-foreground mb-10 text-lg'>
                        Tell us about your project. We&apos;ll get back to you within 24 hours.
                    </p>

                    {status === 'success' ? (
                        <div className='bg-card border-border rounded-xl border p-8'>
                            <CheckCircle className='mx-auto mb-4 h-12 w-12 text-green-500' />
                            <h3 className='text-foreground mb-2 text-xl font-semibold'>Message Sent!</h3>
                            <p className='text-muted-foreground'>
                                We&apos;ll be in touch within 24 hours. In the meantime, feel free to call us at{' '}
                                <a href='tel:6479530222' className='text-accent hover:underline'>
                                    647-953-0222
                                </a>
                                .
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className='bg-card/80 border-border space-y-4 rounded-xl border p-6 text-left backdrop-blur-sm md:p-8'
                        >
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <div>
                                    <label htmlFor='name' className='text-foreground mb-1.5 block text-sm font-medium'>
                                        Name *
                                    </label>
                                    <input
                                        id='name'
                                        name='name'
                                        type='text'
                                        required
                                        className='bg-background border-border focus:border-accent focus:ring-accent/20 w-full rounded-lg border px-4 py-3 text-white transition-colors placeholder:text-muted-foreground focus:ring-2 focus:outline-none'
                                        placeholder='Your name'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='email' className='text-foreground mb-1.5 block text-sm font-medium'>
                                        Email *
                                    </label>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        required
                                        className='bg-background border-border focus:border-accent focus:ring-accent/20 w-full rounded-lg border px-4 py-3 text-white transition-colors placeholder:text-muted-foreground focus:ring-2 focus:outline-none'
                                        placeholder='you@company.com'
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <div>
                                    <label htmlFor='phone' className='text-foreground mb-1.5 block text-sm font-medium'>
                                        Phone *
                                    </label>
                                    <input
                                        id='phone'
                                        name='phone'
                                        type='tel'
                                        required
                                        className='bg-background border-border focus:border-accent focus:ring-accent/20 w-full rounded-lg border px-4 py-3 text-white transition-colors placeholder:text-muted-foreground focus:ring-2 focus:outline-none'
                                        placeholder='(647) 000-0000'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='company'
                                        className='text-foreground mb-1.5 block text-sm font-medium'
                                    >
                                        Company
                                    </label>
                                    <input
                                        id='company'
                                        name='company'
                                        type='text'
                                        className='bg-background border-border focus:border-accent focus:ring-accent/20 w-full rounded-lg border px-4 py-3 text-white transition-colors placeholder:text-muted-foreground focus:ring-2 focus:outline-none'
                                        placeholder='Your business name'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='message' className='text-foreground mb-1.5 block text-sm font-medium'>
                                    Tell us about your project
                                </label>
                                <textarea
                                    id='message'
                                    name='message'
                                    rows={4}
                                    className='bg-background border-border focus:border-accent focus:ring-accent/20 w-full resize-none rounded-lg border px-4 py-3 text-white transition-colors placeholder:text-muted-foreground focus:ring-2 focus:outline-none'
                                    placeholder='What kind of video do you need? Any timeline or budget in mind?'
                                />
                            </div>

                            {status === 'error' && <p className='text-sm text-red-400'>{errorMsg}</p>}

                            <ShimmerButton
                                shimmerColor='rgba(220, 38, 38, 0.8)'
                                background='rgba(220, 38, 38, 0.9)'
                                className='w-full py-4 text-lg font-semibold'
                                type='submit'
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <span className='flex items-center gap-2'>
                                        <Loader2 className='h-5 w-5 animate-spin' />
                                        Sending...
                                    </span>
                                ) : (
                                    'Get Your Free Quote'
                                )}
                            </ShimmerButton>

                            <div className='flex items-center justify-center gap-2 pt-2'>
                                <Phone className='h-4 w-4 text-accent' />
                                <span className='text-muted-foreground text-sm'>
                                    Or call us directly:{' '}
                                    <a href='tel:6479530222' className='text-foreground hover:text-accent transition-colors'>
                                        647-953-0222
                                    </a>
                                </span>
                            </div>
                        </form>
                    )}
                </div>
            </LampEffect>
        </section>
    );
}
