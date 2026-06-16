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
        <footer className='border-t border-neutral-200 bg-white py-14 text-neutral-900 md:py-16'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]'>
                    {/* Brand */}
                    <div>
                        <HeaderLogo className='h-12 w-12' dark />
                        <p className='mt-4 max-w-xs text-sm text-neutral-600'>
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
                                    className='hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-400'>
                                    <Icon className='h-4 w-4' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map((col) => (
                        <div key={col.heading}>
                            <h4 className='mb-4 font-mono text-[11px] font-semibold tracking-widest text-neutral-900 uppercase'>
                                {col.heading}
                            </h4>
                            <ul className='space-y-2.5'>
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className='text-sm text-neutral-500 transition-colors hover:text-neutral-900'>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-center md:flex-row md:text-left'>
                    <p className='text-xs text-neutral-500'>
                        548 Dundas Street West, Unit B, Toronto ON M5T 1H3 ·{' '}
                        <a href='tel:6479530222' className='hover:text-accent transition-colors'>
                            (647) 953-0222
                        </a>
                    </p>
                    <p className='text-xs text-neutral-500'>
                        &copy; {new Date().getFullYear()} Virtuo Agency. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
