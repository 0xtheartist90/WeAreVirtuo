// content/niches/restaurant.ts — Restaurant niche content (FR28, FR29)
// Validated at build time via Zod schema
import { type NicheConfig, nicheConfigSchema } from '@/content/types';
import { videoUrl } from '@/lib/video';

const restaurantContent: NicheConfig = {
    slug: 'restaurant-video-toronto',
    nicheKey: 'restaurant',
    meta: {
        title: 'Restaurant Video Production Toronto | Virtuo Video',
        description:
            'Premium video production for Toronto restaurants & hospitality. Menu videos, ambiance reels, Instagram content. Trusted by INK Entertainment, Shangri-La, Liberty.'
    },
    hero: {
        headline: 'Your Restaurant Deserves to Be Seen',
        subheadline:
            'Premium video production for Toronto restaurants and hospitality brands. From menu showcases to ambiance reels.',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        posterSrc: '/images/hero/slider-1.jpg'
    },
    logos: [
        {
            name: 'INK Entertainment',
            src: '/images/logos/ink-entertainment.png',
            alt: 'INK Entertainment logo'
        },
        {
            name: 'Shangri-La Toronto',
            src: '/images/logos/shangri-la.png',
            alt: 'Shangri-La Toronto logo'
        },
        {
            name: 'Liberty Group',
            src: '/images/logos/liberty-group.png',
            alt: 'Liberty Group logo'
        },
        {
            name: 'Nome Izakaya',
            src: '/images/logos/nome-izakaya.png',
            alt: 'Nome Izakaya logo'
        },
        {
            name: 'Gray Line Toronto',
            src: '/images/logos/grayline.svg',
            alt: 'Gray Line Toronto logo'
        },
        {
            name: 'Hyundai',
            src: '/images/logos/hyundai.svg',
            alt: 'Hyundai logo'
        },
        {
            name: 'Mercedes-Benz',
            src: '/images/logos/mercedes-benz.svg',
            alt: 'Mercedes-Benz logo'
        },
        {
            name: 'Stance Collect',
            src: '/images/logos/stance-collect.png',
            alt: 'Stance Collect logo'
        },
        {
            name: 'SpiderTech',
            src: '/images/logos/spidertech.png',
            alt: 'SpiderTech logo'
        },
        {
            name: 'The Hazelton Hotel',
            src: '/images/logos/hazelton-logo-full.png',
            alt: 'The Hazelton Hotel logo'
        },
        {
            name: 'Pritty Landscapes',
            src: '/images/logos/pritty-landscapes.png',
            alt: 'Pritty Landscapes logo'
        }
    ],
    services: [
        {
            title: 'Menu Showcase Videos',
            description: 'Make every dish look irresistible. Close-up food shots that drive orders and foot traffic.',
            icon: 'UtensilsCrossed'
        },
        {
            title: 'Ambiance Reels',
            description:
                'Capture the vibe of your space — lighting, decor, energy. Let people feel the experience before they arrive.',
            icon: 'Sparkles'
        },
        {
            title: 'Instagram & Social Content',
            description: 'Scroll-stopping vertical reels optimized for Instagram, TikTok, and YouTube Shorts.',
            icon: 'Smartphone'
        },
        {
            title: 'Event Coverage',
            description:
                'Launch nights, private dining, special events. Professional multi-camera capture and same-week delivery.',
            icon: 'PartyPopper'
        }
    ],
    faq: [
        {
            question: 'How much does restaurant video production cost?',
            answer: 'Restaurant video packages start from $3,000 for a half-day shoot with 3-5 deliverables, up to $8,000+ for full-day multi-location shoots with monthly content plans. Every project is custom-quoted based on your needs.'
        },
        {
            question: 'How long does production take?',
            answer: 'A typical restaurant shoot takes 4-8 hours on location. You receive edited deliverables within 5-7 business days. Rush delivery available for events.'
        },
        {
            question: 'Do you shoot during service hours?',
            answer: 'We can shoot during prep, before service, or during service depending on what you need. Ambiance and guest experience footage works best during live service. Food close-ups are best during prep when the kitchen can plate specifically for camera.'
        },
        {
            question: 'What do we need to prepare?',
            answer: 'We handle all equipment and production. We just need your best dishes plated, any staff who will appear on camera, and access to the space. We send a detailed prep guide after booking.'
        },
        {
            question: 'Can you create monthly content?',
            answer: 'Yes — our most popular restaurant package includes a monthly half-day shoot to keep your social feeds fresh with seasonal menus, new dishes, and event content.'
        }
    ],
    featuredPortfolioSlugs: ['nome-izakaya-reels', 'nome-don-mills', 'grayline-toronto'],
    featuredTestimonialSlugs: ['patrick-lee-nome', 'crystal-sheriff-grayline'],
    stats: [
        { value: 150, suffix: '+', label: 'Projects Completed' },
        { value: 50, suffix: '+', label: 'Happy Clients' },
        { value: 8, suffix: '+', label: 'Years Experience' },
        { value: 24, suffix: 'hr', label: 'Response Time' }
    ]
};

// Build-time validation — fails the build if content is invalid
export default nicheConfigSchema.parse(restaurantContent);
