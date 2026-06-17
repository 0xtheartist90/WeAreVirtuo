import Link from 'next/link';

import { HeaderLogo } from '@/components/ui/header-logo';

import { Instagram, Linkedin, Youtube } from 'lucide-react';

const columns: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
        heading: 'Services',
        links: [
            { label: 'Digital Marketing', href: '/digital-marketing' },
            { label: 'Web Development', href: '/web-development' },
            { label: 'Virtual Tours', href: '/virtual-tours' },
            { label: 'Portfolio', href: '/portfolio' }
        ]
    },
    {
        heading: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' }
        ]
    }
];

const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/virtuovideo', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@virtuovideo', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/virtuovideo', label: 'LinkedIn' }
];

export function AgencyFooter() {
    return (
        <footer className='border-t border-white/[0.08] bg-background py-14 md:py-16'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]'>
                    {/* Brand */}
                    <div>
                        <HeaderLogo className='h-12 w-12' />
                        <p className='text-muted-foreground mt-4 max-w-xs text-sm'>
                            A Canadian digital marketing agency. SEO, AI search visibility, paid ads, and
                            high-performance web development for hospitality and multi-location brands.
                        </p>
                        <div className='mt-5 flex items-center gap-3'>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={label}
                                    className='text-muted-foreground hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] transition-colors hover:border-white/20'>
                                    <Icon className='h-4 w-4' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map((col) => (
                        <div key={col.heading}>
                            <h4 className='text-foreground mb-4 font-mono text-[11px] font-semibold tracking-widest uppercase'>
                                {col.heading}
                            </h4>
                            <ul className='space-y-2.5'>
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-center md:flex-row md:text-left'>
                    <p className='text-muted-foreground text-xs'>
                        548 Dundas Street West, Unit B, Toronto ON M5T 1H3 ·{' '}
                        <a href='tel:6479530222' className='hover:text-accent transition-colors'>
                            (647) 953-0222
                        </a>
                    </p>
                    <p className='text-muted-foreground text-xs'>
                        &copy; {new Date().getFullYear()} Virtuo Agency. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
