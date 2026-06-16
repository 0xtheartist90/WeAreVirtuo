import { HeaderLogo } from '@/components/ui/header-logo';

import { Instagram, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/virtuovideo', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@virtuovideo', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/virtuovideo', label: 'LinkedIn' }
];

export function V2Footer() {
    return (
        <footer className='border-t border-white/[0.06] py-12 md:py-16'>
            <div className='mx-auto max-w-[var(--max-width-content)] px-4 md:px-8'>
                <div className='flex flex-col items-center gap-8 text-center'>
                    {/* Logo */}
                    <HeaderLogo className='h-14 w-14' />

                    {/* Contact info */}
                    <div className='text-muted-foreground space-y-1 text-sm'>
                        <p>548 Dundas Street West, Unit B, Toronto ON M5T 1H3</p>
                        <p>
                            <a href='tel:6479530222' className='hover:text-accent transition-colors'>
                                (647) 953-0222
                            </a>
                            {' · '}
                            <a href='mailto:info@virtuovideo.com' className='hover:text-accent transition-colors'>
                                info@virtuovideo.com
                            </a>
                        </p>
                    </div>

                    {/* Social links */}
                    <div className='flex items-center gap-4'>
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={label}
                                className='text-muted-foreground hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] transition-colors hover:border-white/[0.12]'>
                                <Icon className='h-4 w-4' />
                            </a>
                        ))}
                    </div>

                    {/* Legal */}
                    <div className='text-muted-foreground text-xs'>
                        <p>&copy; {new Date().getFullYear()} Virtuo Video. All rights reserved.</p>
                        <p className='mt-1'>
                            <a href='/privacy' className='hover:text-foreground transition-colors'>
                                Privacy Policy
                            </a>
                            {' · '}
                            <a href='/terms' className='hover:text-foreground transition-colors'>
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
