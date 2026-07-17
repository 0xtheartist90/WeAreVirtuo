'use client';

import Link from 'next/link';

import { HeaderLogo } from '@/components/ui/header-logo';

import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
];

const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/virtuovideo', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@virtuovideo', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/virtuovideo', label: 'LinkedIn' }
];

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' }
} as const;

export function AgencyFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className='bg-background border-t border-white/[0.08]'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Main grid */}
                <div className='grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20'>
                    {/* Brand */}
                    <motion.div {...reveal} transition={{ duration: 0.6, ease: EASE }}>
                        <HeaderLogo className='h-12 w-12' />
                        <p className='text-muted-foreground mt-5 max-w-xs text-sm leading-relaxed'>
                            A Canadian digital marketing agency. SEO, AI search visibility, paid ads, and
                            high-performance web development for hospitality and multi-location brands.
                        </p>
                        <div className='mt-6 flex items-center gap-3'>
                            {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, ease: EASE, delay: 0.2 + idx * 0.08 }}
                                    className='text-muted-foreground hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center border border-white/[0.12] transition-colors'>
                                    <Icon className='h-4 w-4' />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div {...reveal} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
                        <h4 className='text-muted-foreground mb-5 font-mono text-[11px] font-semibold tracking-widest uppercase'>
                            Navigation
                        </h4>
                        <ul className='space-y-2.5'>
                            {navLinks.map((link, idx) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + idx * 0.06 }}>
                                    <Link
                                        href={link.href}
                                        className='font-display hover:text-accent text-foreground inline-block text-2xl tracking-wide transition-all duration-300 hover:translate-x-1'>
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Visit us */}
                    <motion.div {...reveal} transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}>
                        <h4 className='text-muted-foreground mb-5 font-mono text-[11px] font-semibold tracking-widest uppercase'>
                            Visit us
                        </h4>
                        <p className='text-foreground text-lg leading-snug font-medium'>
                            548 Dundas Street West, Unit B, Toronto ON M5T 1H3
                        </p>
                        <div className='text-muted-foreground mt-4 space-y-1 font-mono text-[11px] tracking-wide uppercase'>
                            <p>Mon–Fri: 09:00 – 18:00</p>
                            <p>Sat: 10:00 – 16:00</p>
                        </div>
                        <a
                            href='tel:6479530222'
                            className='text-muted-foreground hover:text-accent mt-4 inline-block text-sm transition-colors'>
                            (647) 953-0222
                        </a>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                    className='flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 text-center md:flex-row md:text-left'>
                    <div className='text-muted-foreground flex items-center gap-5 font-mono text-[11px] tracking-widest uppercase'>
                        <Link href='/privacy' className='hover:text-foreground transition-colors'>
                            Privacy Policy
                        </Link>
                        <Link href='/terms' className='hover:text-foreground transition-colors'>
                            Terms of Service
                        </Link>
                    </div>
                    <p className='text-muted-foreground font-mono text-[11px] tracking-widest uppercase'>
                        © {year} Virtuo. All rights reserved.
                    </p>
                    <div className='flex items-center gap-2'>
                        <HeaderLogo className='h-5 w-5' />
                        <span className='text-muted-foreground font-mono text-[11px] tracking-widest uppercase'>
                            Toronto · CA / US
                        </span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
