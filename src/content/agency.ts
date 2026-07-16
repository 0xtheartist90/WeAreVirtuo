// content/agency.ts — Virtuo Agency content model
// Single source of truth for the agency homepage. Polished placeholder copy —
// refine freely. Client logos reuse existing assets in /public/images/logos.
import type { Logo } from '@/content/types';

/* ─────────────── Client Logos (trust bar) ─────────────── */

export const agencyLogos: Logo[] = [
    { name: 'INK Entertainment', src: '/images/logos/ink-entertainment.png', alt: 'INK Entertainment logo' },
    { name: 'The Hazelton Hotel', src: '/images/logos/hazelton-logo-full.png', alt: 'The Hazelton Hotel logo' },
    { name: 'Shangri-La', src: '/images/logos/shangri-la.png', alt: 'Shangri-La Hotels Canada logo' },
    { name: 'Hyundai', src: '/images/logos/hyundai.svg', alt: 'Hyundai logo' },
    { name: 'Mercedes-Benz', src: '/images/logos/mercedes-benz.svg', alt: 'Mercedes-Benz logo' },
    { name: 'Liberty Group', src: '/images/logos/liberty-group.png', alt: 'Liberty Group logo' },
    { name: 'Gray Line Toronto', src: '/images/logos/grayline.svg', alt: 'Gray Line Toronto logo' },
    { name: 'Nome Izakaya', src: '/images/logos/nome-izakaya.png', alt: 'Nome Izakaya logo' },
    { name: 'SpiderTech', src: '/images/logos/spidertech.png', alt: 'SpiderTech logo' },
    { name: 'Stance Collect', src: '/images/logos/stance-collect.png', alt: 'Stance Collect logo' },
    { name: 'Pritty Landscapes', src: '/images/logos/pritty-landscapes.png', alt: 'Pritty Landscapes logo' }
];

/* ─────────────── Hero ─────────────── */

export const agencyHero = {
    eyebrow: 'Canadian Digital Marketing Agency',
    headline: 'Get Found Everywhere',
    subheadline: 'SEO, AI search visibility & paid ads that turn attention into customers.',
    // Reuses an existing hero video on the Vercel Blob CDN.
    videoSrc: '/hero-loop.mp4',
    posterSrc: '/images/hero/slider-2.jpg'
};

/* ─────────────── Core Service Pillars ─────────────── */

export type AgencyPillar = {
    key: string;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    image: string;
    href: string;
    cta: string;
    external?: boolean;
};

export const agencyPillars: AgencyPillar[] = [
    {
        key: 'digital-marketing',
        eyebrow: 'Primary',
        title: 'Digital Marketing',
        description:
            'Deep local SEO, GEO and AI-search visibility, plus fully managed Google and Meta advertising. We run the entire marketing ecosystem so you can run your business.',
        points: [
            'SEO, Local SEO & Google Business Profile',
            'GEO optimization for AI Overviews & ChatGPT',
            'Google Ads & Meta Ads — fully managed',
            'Tracking, analytics & conversion optimization'
        ],
        image: '/images/bts/commercial-stage.jpg',
        href: '/digital-marketing',
        cta: 'Explore Digital Marketing'
    },
    {
        key: 'web-development',
        eyebrow: 'Build',
        title: 'Web Development',
        description:
            'High-performance websites engineered on Next.js and Vercel — built for speed, SEO, mobile, and conversions. The digital infrastructure your campaigns deserve.',
        points: [
            'Next.js + Vercel performance architecture',
            'Technical SEO-ready from day one',
            'Conversion-focused landing page systems',
            'Core Web Vitals & mobile-first by default'
        ],
        image: '/images/bts/cooking-show-setup.jpg',
        href: '/web-development',
        cta: 'Explore Web Development'
    },
    {
        key: 'virtual-tours',
        eyebrow: 'Secondary',
        title: 'Virtual Tours & 360°',
        description:
            'Custom 360° experiences and Google Virtual Tours for hospitality, automotive, retail and large-scale activations. Over 10,000 tours produced across North America.',
        points: [
            '10,000+ virtual tours completed',
            'Custom interactive 360° environments',
            'Google Street View trusted production',
            'Enterprise & commercial activations'
        ],
        image: '/images/bts/silhouette-setup.png',
        href: '/virtual-tours',
        cta: 'Explore Virtual Tours'
    }
];

/* ─────────────── Capabilities (basement-style grid) ─────────────── */

export type Capability = {
    title: string;
    description: string;
    href: string;
    external?: boolean;
    tags: string[];
};

export const agencyCapabilities: Capability[] = [
    {
        title: 'Digital Marketing',
        description:
            'Deep local SEO and AI-search visibility paired with fully managed paid advertising — we run the entire marketing ecosystem.',
        href: '/digital-marketing',
        tags: ['SEO', 'Local SEO', 'GEO / AI Search', 'Google Ads', 'Meta Ads', 'Conversion Tracking']
    },
    {
        title: 'Web Development',
        description:
            'High-performance websites engineered on Next.js and Vercel — SEO-ready, mobile-first, and built to convert.',
        href: '/web-development',
        tags: ['Next.js', 'Vercel', 'Landing Pages', 'Core Web Vitals', 'Technical SEO']
    },
    {
        title: 'Virtual Tours & 360°',
        description:
            'Custom 360° experiences and Google Virtual Tours for hospitality, automotive and retail — 10,000+ produced.',
        href: '/virtual-tours',
        tags: ['Google Virtual Tours', '360° Experiences', 'Enterprise', 'Automotive']
    },
    {
        title: 'Video & Content',
        description:
            'Cinematic production, reels, and hospitality content produced in house to feed every channel we manage.',
        href: '/#video',
        tags: ['Reels', 'Commercial', 'Hospitality', 'Social Content']
    }
];

/* ─────────────── Services page — deep per-service detail ─────────────── */

export type ServiceDetailItem = {
    key: string;
    title: string;
    tagline: string;
    description: string;
    href: string;
    capabilities: { title: string; detail: string }[];
    stat?: { value: string; label: string };
    kind?: 'reels';
    image?: string;
};

export const servicesDetail: ServiceDetailItem[] = [
    {
        key: 'digital-marketing',
        title: 'Digital Marketing',
        tagline: 'Be discovered everywhere your customers search.',
        description:
            'We run the entire search ecosystem — organic, local, AI, and paid — as one connected engine. From account setup to ongoing optimization, tracking to reporting, it’s all handled in house.',
        href: '/digital-marketing',
        capabilities: [
            { title: 'SEO & Local SEO', detail: 'Technical + on-page optimization, Google Business Profile, and local-pack visibility for every location.' },
            { title: 'GEO & AI Search', detail: 'Content and entities structured to surface in Google AI Overviews and ChatGPT-style answers.' },
            { title: 'Google Ads', detail: 'Intent-based search campaigns — built, managed, and continuously optimized against ROAS.' },
            { title: 'Meta Ads', detail: 'Instagram & Facebook demand generation, creative testing, and retargeting funnels.' },
            { title: 'Analytics & CRO', detail: 'Conversion tracking, attribution, and landing-page optimization measured against real revenue.' }
        ],
        stat: { value: '24/7', label: 'Visibility across the search ecosystem' },
        image: '/images/bts/commercial-stage.jpg'
    },
    {
        key: 'web-development',
        title: 'Web Development',
        tagline: 'The infrastructure your campaigns deserve.',
        description:
            'High-performance websites engineered on Next.js and Vercel — fast, SEO-ready, mobile-first, and built to convert. Marketing performs far better on infrastructure designed for it.',
        href: '/web-development',
        capabilities: [
            { title: 'Next.js + Vercel', detail: 'Modern React architecture deployed on a global edge network.' },
            { title: 'Technical SEO', detail: 'Clean semantic markup, structured data, and crawlability from day one.' },
            { title: 'Landing Page Systems', detail: 'Reusable, conversion-focused page systems for running campaigns at scale.' },
            { title: 'Core Web Vitals', detail: 'Top performance scores on every device — speed is a ranking factor.' },
            { title: 'Mobile-First', detail: 'Designed for how customers actually browse and buy.' }
        ],
        stat: { value: '90+', label: 'Core Web Vitals performance target' },
        image: '/images/bts/full-production-set.jpg'
    },
    {
        key: 'virtual-tours',
        title: 'Virtual Tours & 360°',
        tagline: 'Put customers inside your space before they arrive.',
        description:
            'Custom 360° experiences and Google Virtual Tours for hospitality, automotive, and retail — over 10,000 immersive tours produced across North America.',
        href: '/virtual-tours',
        capabilities: [
            { title: 'Google Virtual Tours', detail: 'Street View-trusted production that boosts local visibility and Maps engagement.' },
            { title: 'Custom 360° Experiences', detail: 'Branded, interactive environments tailored to your space.' },
            { title: 'Enterprise Activations', detail: 'Large-scale commercial and multi-location rollouts.' },
            { title: 'Automotive & Retail', detail: 'Showroom, venue, and event-scale immersive capture.' }
        ],
        stat: { value: '10,000+', label: 'Virtual tours produced' },
        image: '/images/bts/cinematographer-red.jpg'
    },
    {
        key: 'video',
        title: 'Video & Content',
        tagline: 'Cinematic content that feeds every channel.',
        description:
            'Production, reels, and hospitality content produced in house — the visual fuel for everything we manage. Tap any reel to watch.',
        href: '/portfolio',
        kind: 'reels',
        capabilities: [
            { title: 'Social Reels', detail: 'Scroll-stopping vertical content for Instagram, TikTok, and Shorts.' },
            { title: 'Commercial', detail: 'Cinematic brand films and product storytelling.' },
            { title: 'Hospitality', detail: 'Restaurant, hotel, and venue content built to convert.' },
            { title: 'Photography', detail: 'High-end stills to round out every campaign.' }
        ]
    }
];

/* ─────────────── "Beyond SEO" — positioning steps ─────────────── */

export const visibilityChannels = [
    { label: 'Google Search', detail: 'Organic & local pack rankings' },
    { label: 'Google Maps', detail: 'Business Profile & local discovery' },
    { label: 'AI Overviews', detail: 'Featured in Google’s AI answers' },
    { label: 'ChatGPT & AI Search', detail: 'Cited in AI-driven discovery' },
    { label: 'Google Ads', detail: 'Intent-based paid search' },
    { label: 'Meta Ads', detail: 'Instagram & Facebook demand' }
];

/* ─────────────── Web dev capabilities ─────────────── */

export const webDevFeatures = [
    { title: 'Built on Next.js & Vercel', detail: 'Modern React architecture, deployed on a global edge network.' },
    { title: 'Engineered for SEO', detail: 'Clean semantic structure and technical SEO baked in from the start.' },
    { title: 'Conversion-first', detail: 'Landing pages and funnels designed to turn traffic into leads.' },
    { title: 'Core Web Vitals', detail: 'Fast loads, smooth interaction, top scores — on every device.' }
];

/* ─────────────── Results / stats ─────────────── */

export const agencyStats = [
    { value: 10000, suffix: '+', label: 'Virtual Tours Produced' },
    { value: 500, suffix: '+', label: 'Businesses Served' },
    { value: 15, suffix: '+', label: 'Years of Experience' },
    { value: 98, suffix: '%', label: 'Client Retention' }
];

/* ─────────────── Virtuo Video link-out ─────────────── */

export const VIRTUO_VIDEO_URL = 'https://virtuovideo.com';

export const videoReels = [
    { title: 'Hospitality', image: '/images/portfolio/nome.png', video: 'videos/portfolio/nome-fort-york.mp4' },
    { title: 'Restaurants', image: '/images/portfolio/nome2.png', video: 'videos/portfolio/nome-don-mills.mp4' },
    { title: 'Social Reels', image: '/images/portfolio/nome3.png', video: 'videos/portfolio/try-lychee.mp4' },
    { title: 'Commercial', image: '/images/portfolio/grayline.jpg', video: 'videos/reels/globe-and-mail-centre.mp4' }
];

/* ─────────────── Testimonials ─────────────── */

export const agencyTestimonials = [
    {
        quote: 'Virtuo took us beyond rankings — we now show up on Maps, in AI answers, and across paid search. Bookings followed.',
        name: 'Patrick Lee',
        title: 'Owner',
        company: 'Nome Izakaya',
        image: '/images/testimonials/patrick.jpg',
        tag: 'Maps · AI · Paid'
    },
    {
        quote: 'They handle our entire marketing ecosystem across multiple locations. We focus on the guests; Virtuo handles visibility.',
        name: 'Crystal Sheriff',
        title: 'Marketing Director',
        company: 'Gray Line Toronto',
        image: '/images/testimonials/jessica.jpg',
        tag: 'Multi-location'
    },
    {
        quote: 'The new site is fast, ranks, and converts. Exactly the kind of infrastructure a serious hospitality brand needs.',
        name: 'Operations Lead',
        title: 'Hospitality Group',
        company: 'The Hazelton Hotel',
        image: '/images/testimonials/michael.jpg',
        tag: 'Web · SEO'
    }
];

/* ─────────────── FAQ ─────────────── */

export const agencyFaq = [
    {
        question: 'What makes Virtuo different from a traditional SEO agency?',
        answer: 'Traditional SEO chases blue-link rankings. We optimize for everywhere your customers actually discover businesses today — Google Search and Maps, Google Business Profile, AI Overviews, and ChatGPT-style AI search — and pair it with managed paid advertising and conversion-ready websites. It’s a complete visibility ecosystem, not just rankings.'
    },
    {
        question: 'What is GEO and AI search optimization?',
        answer: 'GEO (Generative Engine Optimization) is the practice of structuring your content and digital presence so AI systems — Google’s AI Overviews, ChatGPT, and similar tools — surface and cite your business when people ask buying questions. As search shifts toward AI answers, this is quickly becoming as important as classic SEO.'
    },
    {
        question: 'Do you manage Google and Meta ads end to end?',
        answer: 'Yes. From account setup and tracking to creative, landing pages, bidding, and reporting — we manage the full stack. You get one team accountable for the entire funnel rather than juggling separate vendors.'
    },
    {
        question: 'Do you specialize in hospitality and multi-location businesses?',
        answer: 'We’ve worked with hundreds of hotels, restaurants, and hospitality groups across Canada and the US. We understand local SEO at scale, Google Maps visibility per location, and the conversion patterns specific to hotels and restaurants.'
    },
    {
        question: 'Can you build the website too?',
        answer: 'Absolutely. We develop high-performance websites on Next.js and Vercel — SEO-ready, mobile-first, and conversion-focused. Marketing performs far better on infrastructure built for it, so we offer both under one roof.'
    },
    {
        question: 'Do you still produce video and virtual tours?',
        answer: 'Yes. Video production lives at our dedicated studio, virtuovideo.com, and we produce custom 360° virtual tours and Google Virtual Tours — over 10,000 to date. Both integrate directly into your marketing strategy.'
    }
];
