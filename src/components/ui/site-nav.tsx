'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HeaderLogo } from '@/components/ui/header-logo';
import { QuoteFormPanel } from '@/components/ui/quote-form-panel';
import portfolio from '@/content/shared/portfolio';

import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const navLinks: { label: string; href: string; external?: boolean; count?: number }[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio', count: portfolio.length },
    { label: 'Contact', href: '/contact' }
];

/* ─── Mobile Menu ─── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm'
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className='bg-background fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/[0.06] shadow-2xl'>
                        <div className='flex items-center justify-between border-b border-white/[0.06] px-6 py-5'>
                            <Link href='/' onClick={onClose}>
                                <HeaderLogo className='h-12 w-12' />
                            </Link>
                            <button
                                onClick={onClose}
                                className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:bg-white/5 hover:text-white'
                                aria-label='Close menu'>
                                <X className='h-5 w-5' />
                            </button>
                        </div>
                        <nav className='flex-1 px-6 py-8'>
                            <div className='space-y-1'>
                                {navLinks.map((s, idx) => (
                                    <motion.div
                                        key={s.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.06 }}>
                                        {s.href.includes('#') || s.external ? (
                                            <a
                                                href={s.href}
                                                target={s.external ? '_blank' : undefined}
                                                rel={s.external ? 'noopener noreferrer' : undefined}
                                                className='glitch-hover font-display text-foreground hover:text-accent block py-3 text-2xl tracking-wider uppercase'
                                                onClick={onClose}>
                                                {s.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={s.href}
                                                className='glitch-hover font-display text-foreground hover:text-accent block py-3 text-2xl tracking-wider uppercase'
                                                onClick={onClose}>
                                                {s.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </nav>
                        <div className='border-t border-white/[0.06] px-6 py-6'>
                            <a
                                href='/contact'
                                onClick={onClose}
                                className='glitch-hover bg-accent flex w-full items-center justify-center gap-2 px-6 py-4 text-lg font-semibold tracking-wide text-white uppercase'>
                                Get a Quote
                                <ArrowRight className='h-5 w-5' />
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─── Site Navigation ─── */
export function SiteNav() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <header className='bg-background fixed top-0 z-50 w-full border-b border-white/[0.06]'>
                <div className='mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-8'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center'>
                        <HeaderLogo className='h-10 w-10' />
                    </Link>

                    {/* Desktop nav */}
                    <nav className='hidden items-center gap-7 lg:flex'>
                        {navLinks.map((s) => {
                            const inner = (
                                <>
                                    {s.label}
                                    {typeof s.count === 'number' && (
                                        <sup className='ml-0.5 text-[0.65em] text-white/40 tabular-nums'>
                                            ({s.count})
                                        </sup>
                                    )}
                                </>
                            );

                            return s.href.includes('#') || s.external ? (
                                <a
                                    key={s.href}
                                    href={s.href}
                                    target={s.external ? '_blank' : undefined}
                                    rel={s.external ? 'noopener noreferrer' : undefined}
                                    className='glitch-hover hover:text-accent text-[0.8rem] font-semibold tracking-wide text-white/70 transition-colors'>
                                    {inner}
                                </a>
                            ) : (
                                <Link
                                    key={s.href}
                                    href={s.href}
                                    className={`glitch-hover hover:text-accent text-[0.8rem] font-semibold tracking-wide transition-colors ${
                                        pathname === s.href ? 'text-white' : 'text-white/70'
                                    }`}>
                                    {inner}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side */}
                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={() => setQuoteOpen(true)}
                            className='glitch-hover bg-accent hover:bg-accent/90 hidden px-4 py-2 text-[0.8rem] font-semibold tracking-wide text-white uppercase transition-colors md:inline-block'>
                            Get a Quote
                        </button>
                        <button
                            type='button'
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/5 lg:hidden'
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label='Toggle menu'>
                            <Menu className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <QuoteFormPanel open={quoteOpen} onClose={() => setQuoteOpen(false)} location='nav' />
        </>
    );
}
