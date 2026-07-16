'use client';

import { useState } from 'react';

import { HeaderLogo } from '@/components/ui/header-logo';
import { MatrixText } from '@/components/ui/matrix-text';

import { ArrowUpRight, Asterisk, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const EMAIL = 'info@virtuovideo.com';
const PHONE_DISPLAY = '(647) 953-0222';
const PHONE_HREF = '6479530222';

const SERVICE_OPTIONS = [
    'I need a new website',
    'SEO & local search',
    'Google & Meta ads',
    'AI search visibility (GEO)',
    'Virtual tour & video',
    'Not sure yet — let’s talk'
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function AgencyContact() {
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            name: String(data.get('name') ?? ''),
            email: String(data.get('email') ?? ''),
            phone: String(data.get('phone') ?? ''),
            message: String(data.get('service') ?? ''),
            landing_page: typeof window !== 'undefined' ? window.location.pathname : ''
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Submission failed');
            setStatus('success');
            form.reset();
        } catch {
            setStatus('error');
            setErrorMsg('Something went wrong. Please email us directly.');
        }
    }

    return (
        <section id='contact' className='bg-background relative scroll-mt-24 overflow-hidden border-t border-white/[0.08]'>
            <div className='dot-grid pointer-events-none absolute inset-0 opacity-[0.05]' />

            <div className='relative mx-auto grid max-w-[var(--max-width-content)] grid-cols-1 gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20'>
                {/* ── Left: personal card + contact ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className='flex flex-col'>
                    {/* Image with logo overlay + name */}
                    <div className='relative overflow-hidden'>
                        <img
                            src='/images/about/studio.jpg'
                            alt='Virtuo studio'
                            className='aspect-[4/3] w-full object-cover grayscale'
                        />
                        <div className='absolute top-4 right-4'>
                            <HeaderLogo className='h-10 w-10' />
                        </div>
                        <div className='absolute bottom-4 left-4 flex items-center gap-2.5'>
                            <img
                                src='/images/team/jeff.png'
                                alt='Jeff'
                                className='h-9 w-9 rounded-full border border-white/30 object-cover'
                            />
                            <span className='font-display text-sm tracking-wide text-white uppercase'>Jeff Bennett</span>
                        </div>
                    </div>

                    {/* White quote card — red accent bar */}
                    <div className='border-accent bg-white px-6 py-5 text-neutral-900 border-l-2'>
                        <p className='text-right text-sm leading-relaxed font-medium'>
                            I&apos;ll personally review your brief and get back to you within two hours.
                        </p>
                        <p className='text-accent mt-3 text-right font-mono text-[10px] tracking-widest uppercase'>
                            Founder &amp; Creative Director
                        </p>
                    </div>

                    {/* Contact details */}
                    <div className='mt-10'>
                        <p className='text-accent mb-3 font-mono text-[11px] tracking-widest uppercase'>[ Contact ]</p>
                        <a
                            href={`tel:${PHONE_HREF}`}
                            className='font-display hover:text-accent block text-3xl tracking-wide text-white transition-colors md:text-4xl'>
                            {PHONE_DISPLAY}
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className='hover:text-accent mt-2 block text-base text-white/70 lowercase transition-colors'>
                            {EMAIL}
                        </a>
                        <p className='mt-5 flex max-w-xs items-start gap-2 font-mono text-[11px] leading-relaxed tracking-wide text-white/40 uppercase'>
                            <Asterisk className='text-accent mt-px h-3.5 w-3.5 shrink-0' />
                            We usually respond to all digital enquiries within 2 business hours.
                        </p>
                    </div>
                </motion.div>

                {/* ── Right: heading + form ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}>
                    <p className='text-accent mb-4 font-mono text-[11px] tracking-widest uppercase'>
                        [ Let&apos;s build something ]
                    </p>
                    <h2 className='font-display text-6xl leading-[0.85] tracking-tight text-white uppercase md:text-8xl'>
                        <MatrixText as='span' trigger='view' className='block'>
                            Start a
                        </MatrixText>
                        <span className='block'>
                            <MatrixText as='span' trigger='view'>
                                Project
                            </MatrixText>
                            <span className='text-accent'>.</span>
                        </span>
                    </h2>
                    <p className='mt-6 max-w-md text-sm leading-relaxed text-white/60'>
                        Whether you have a full brief or just an idea, we&apos;re here to help shape it. No pitch decks,
                        no sales calls —{' '}
                        <span className='font-semibold text-white'>just a clear next step.</span>
                    </p>

                    {status === 'success' ? (
                        <div className='mt-10 border border-white/15 bg-white/[0.03] px-6 py-10 text-center'>
                            <p className='font-display text-accent text-3xl tracking-wide uppercase'>Message sent</p>
                            <p className='mt-3 text-sm text-white/60'>
                                Thanks — we&apos;ll be in touch within 2 business hours.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='mt-10 space-y-6'>
                            <Field label='Name' required index={0}>
                                <input name='name' type='text' required placeholder='Alex Johnson' className={inputClass} />
                            </Field>

                            <Field label='Your email address' required index={1}>
                                <input
                                    name='email'
                                    type='email'
                                    required
                                    placeholder='example@email.com'
                                    className={inputClass}
                                />
                            </Field>

                            <Field label='Phone' required index={2}>
                                <input
                                    name='phone'
                                    type='tel'
                                    required
                                    placeholder='+1 (647) 000-0000'
                                    className={inputClass}
                                />
                            </Field>

                            <Field label='What are you looking for?' index={3}>
                                <select
                                    name='service'
                                    defaultValue={SERVICE_OPTIONS[0]}
                                    className={`${inputClass} peer cursor-pointer appearance-none pr-10`}>
                                    {SERVICE_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt} className='bg-neutral-900 text-white'>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className='group-focus-within:text-accent pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/40 transition-colors' />
                            </Field>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
                                className='flex flex-col gap-4 pt-2 sm:flex-row sm:items-center'>
                                <button
                                    type='submit'
                                    disabled={status === 'submitting'}
                                    className='group border-accent relative inline-flex items-center justify-center gap-2 overflow-hidden border-b-2 bg-white px-8 py-4 text-sm font-semibold tracking-widest text-neutral-900 uppercase transition-colors hover:text-white disabled:opacity-60'>
                                    {/* red wipe fill on hover */}
                                    <span className='bg-accent absolute inset-0 -z-0 origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100' />
                                    <span className='relative z-[1]'>
                                        {status === 'submitting' ? 'Sending…' : 'Send Message'}
                                    </span>
                                    <ArrowUpRight className='relative z-[1] h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                </button>
                                <p className='max-w-[16rem] text-xs leading-relaxed text-white/40'>
                                    By submitting, you agree to our{' '}
                                    <span className='hover:text-accent cursor-pointer text-white/70 transition-colors'>Terms</span> and{' '}
                                    <span className='hover:text-accent cursor-pointer text-white/70 transition-colors'>Privacy Policy</span>.
                                </p>
                            </motion.div>

                            {status === 'error' && <p className='text-accent text-sm'>{errorMsg}</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

const inputClass =
    'peer w-full border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:bg-white/[0.05] focus:outline-none';

function Field({
    label,
    required,
    index,
    children
}: {
    label: string;
    required?: boolean;
    index: number;
    children: React.ReactNode;
}) {
    return (
        <motion.label
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
            className='block'>
            <span className='mb-2 flex items-center justify-end gap-1 font-mono text-[11px] tracking-widest text-white/45 uppercase'>
                {label}
                {required && <span className='text-accent'>*</span>}
            </span>
            <div className='group relative'>
                {children}
                {/* animated red accent underline on focus */}
                <span className='bg-accent pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:w-full' />
            </div>
        </motion.label>
    );
}
