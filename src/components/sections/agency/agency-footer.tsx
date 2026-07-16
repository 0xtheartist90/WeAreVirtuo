import Link from 'next/link';

import { HeaderLogo } from '@/components/ui/header-logo';

import { Instagram, Linkedin, Youtube } from 'lucide-react';

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

export function AgencyFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className='bg-background border-t border-white/[0.08]'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                {/* Main grid */}
                <div className='grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20'>
                    {/* Brand */}
                    <div>
                        <HeaderLogo className='h-12 w-12' />
                        <p className='text-muted-foreground mt-5 max-w-xs text-sm leading-relaxed'>
                            A Canadian digital marketing agency. SEO, AI search visibility, paid ads, and
                            high-performance web development for hospitality and multi-location brands.
                        </p>
                        <div className='mt-6 flex items-center gap-3'>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={label}
                                    className='text-muted-foreground hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center border border-white/[0.12] transition-colors'>
                                    <Icon className='h-4 w-4' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className='text-muted-foreground mb-5 font-mono text-[11px] font-semibold tracking-widest uppercase'>
                            Navigation
                        </h4>
                        <ul className='space-y-2.5'>
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className='font-display hover:text-accent text-foreground text-2xl tracking-wide transition-colors'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visit us */}
                    <div>
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
                    </div>
                </div>

                {/* Bottom bar */}
                <div className='flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 text-center md:flex-row md:text-left'>
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
                </div>
            </div>
        </footer>
    );
}
