import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';

import '@/app/globals.css';
import { SiteNav } from '@/components/ui/site-nav';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas-neue',
    display: 'swap'
});

export const metadata: Metadata = {
    title: {
        default: 'Virtuo Agency | Digital Marketing, SEO & AI Search Visibility',
        template: '%s | Virtuo Agency'
    },
    description:
        'Virtuo is a Canadian digital marketing agency specializing in SEO, Local SEO, GEO & AI search visibility, Google & Meta Ads, and high-performance Next.js web development. Trusted by INK Entertainment, The Hazelton, Shangri-La, Hyundai.',
    metadataBase: new URL('https://virtuovideo.vercel.app')
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en' className='dark' suppressHydrationWarning>
            <body
                className={`${inter.variable} ${bebasNeue.variable} bg-background text-foreground overscroll-none font-sans antialiased`}>
                <SiteNav />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
