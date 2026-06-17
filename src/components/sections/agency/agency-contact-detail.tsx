'use client';

import { useState } from 'react';

import { AgencyButton } from '@/components/ui/agency-button';
import { trackEvent } from '@/lib/analytics';

import { CheckCircle, Instagram, Linkedin, Loader2, Youtube } from 'lucide-react';

const EMAIL = 'info@virtuovideo.com';

const methods = [
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'Phone', value: '(647) 953-0222', href: 'tel:6479530222' },
    { label: 'Studio', value: '548 Dundas St West, Unit B, Toronto ON' },
    { label: 'Hours', value: 'Mon–Fri · 9AM–7PM ET' },
    { label: 'Serving', value: 'Canada & the United States' }
];

const socials = [
    { icon: Instagram, href: 'https://instagram.com/virtuovideo', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@virtuovideo', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/virtuovideo', label: 'LinkedIn' }
];

export function AgencyContactDetail() {
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
            trackEvent('form_submit', { form: 'contact', location: 'contact_page' });
            form.reset();
        } catch {
            setErrorMsg('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    const inputClass =
        'bg-background border-border focus:border-accent focus:ring-accent/20 placeholder:text-muted-foreground w-full border px-4 py-3.5 text-white transition-colors focus:ring-2 focus:outline-none';

    return (
        <section id='contact' className='scroll-mt-24 py-20 md:py-28'>
            <div className='grid-layout'>
                {/* ── Left: info ── */}
                <div className='col-span-full mb-14 lg:col-span-5 lg:col-start-2 lg:mb-0'>
                    <p className='text-accent mb-4 font-mono text-[11px] tracking-widest uppercase'>[ Get in Touch ]</p>
                    <h2 className='font-display text-foreground text-4xl leading-[0.92] tracking-tight uppercase md:text-6xl'>
                        Start a<br />
                        <span className='text-accent'>Conversation</span>
                    </h2>
                    <p className='mt-5 max-w-md text-lg text-white/70'>
                        Tell us where you’re missing visibility and what you want to grow. We respond within 24 hours —
                        no obligation, no fluff.
                    </p>

                    {/* methods */}
                    <div className='mt-10 border-t border-white/10'>
                        {methods.map((m) => (
                            <div
                                key={m.label}
                                className='grid grid-cols-[90px_1fr] items-baseline gap-4 border-b border-white/10 py-4'>
                                <span className='font-mono text-[11px] tracking-widest text-white/40 uppercase'>
                                    {m.label}
                                </span>
                                {m.href ? (
                                    <a href={m.href} className='hover:text-accent text-foreground text-sm transition-colors'>
                                        {m.value}
                                    </a>
                                ) : (
                                    <span className='text-sm text-white/75'>{m.value}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* socials */}
                    <div className='mt-8 flex items-center gap-3'>
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={label}
                                className='text-muted-foreground hover:text-accent flex h-10 w-10 items-center justify-center border border-white/[0.08] transition-colors hover:border-white/20'>
                                <Icon className='h-4 w-4' />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Right: form ── */}
                <div className='col-span-full lg:col-span-5 lg:col-start-8'>
                    <div className='border border-white/10 p-6 md:p-8'>
                        <p className='text-accent mb-6 font-mono text-[11px] tracking-widest uppercase'>
                            [ Project Inquiry ]
                        </p>

                        {status === 'success' ? (
                            <div className='flex flex-col items-center py-16 text-center'>
                                <CheckCircle className='mb-4 h-14 w-14 text-green-500' />
                                <h3 className='font-display text-foreground text-2xl tracking-wide uppercase'>Message Sent</h3>
                                <p className='text-muted-foreground mt-2 text-sm'>We&apos;ll be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                    <input name='name' type='text' required className={inputClass} placeholder='Name *' />
                                    <input name='email' type='email' required className={inputClass} placeholder='Email *' />
                                </div>
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                    <input name='phone' type='tel' required className={inputClass} placeholder='Phone *' />
                                    <input name='company' type='text' className={inputClass} placeholder='Business name' />
                                </div>
                                <textarea
                                    name='message'
                                    rows={5}
                                    className={`${inputClass} resize-none`}
                                    placeholder='What do you need help with? SEO, ads, a new website, virtual tours…'
                                />
                                {status === 'error' && <p className='text-sm text-red-400'>{errorMsg}</p>}
                                <AgencyButton className='w-full py-4 text-base' type='submit' disabled={status === 'submitting'}>
                                    {status === 'submitting' ? (
                                        <span className='flex items-center gap-2'>
                                            <Loader2 className='h-5 w-5 animate-spin' />
                                            Sending…
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </AgencyButton>
                                <p className='text-muted-foreground text-center text-[11px]'>
                                    Prefer to talk?{' '}
                                    <a href='tel:6479530222' className='hover:text-accent text-white/60 transition-colors'>
                                        Call (647) 953-0222
                                    </a>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
