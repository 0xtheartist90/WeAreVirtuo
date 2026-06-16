// Thank-you page — Conversion tracking fires here (FR6, FR8, FR11, FR12)
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank You',
    description: 'Thank you for contacting Virtuo Video.',
    robots: { index: false, follow: false }
};

export default function ThankYouPage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center py-24 md:py-32'>
            <div className='mx-auto max-w-[1280px] px-4 text-center md:px-8'>
                <h1 className='font-display text-4xl tracking-wide uppercase'>Thank You</h1>
                <p className='text-muted-foreground mt-4 text-xl'>
                    We&apos;ve received your message. Jeff will follow up within 2 hours.
                </p>
                <a
                    href='tel:6479530222'
                    className='bg-accent text-accent-foreground mt-8 inline-block rounded-sm px-6 py-3 font-semibold transition-opacity hover:opacity-90'>
                    Call Now — 647-953-0222
                </a>
            </div>
        </main>
    );
}
