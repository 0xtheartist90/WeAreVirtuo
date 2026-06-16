// content/shared/portfolio.ts — Portfolio items tagged by niche
// Shared across all LPs, filtered by niche at page level
import { type PortfolioItem, portfolioItemSchema } from '@/content/types';
import { videoUrl } from '@/lib/video';

import { z } from 'zod/v4';

const portfolioItems: PortfolioItem[] = [
    {
        slug: 'nome-izakaya-reels',
        title: 'Social Media Reels',
        client: 'Nome Izakaya',
        description: 'Vertical reels showcasing dishes, ambiance, and guest experience across multiple Nome locations.',
        thumbnail: '/images/portfolio/nome.png',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        niches: ['restaurant'],
        industry: 'Restaurant & Hospitality'
    },
    {
        slug: 'nome-don-mills',
        title: 'Restaurant Content Package',
        client: 'Nome Izakaya — Don Mills',
        description: 'Full content package including reels, menu showcases, and ambiance capture for Nome Don Mills.',
        thumbnail: '/images/portfolio/nome2.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4'),
        niches: ['restaurant'],
        industry: 'Restaurant & Hospitality'
    },
    {
        slug: 'grayline-toronto',
        title: 'Event Capture',
        client: 'Grayline Toronto',
        description: 'On-site event capture and promotional video production for Grayline Toronto experiences.',
        thumbnail: '/images/portfolio/grayline.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        niches: ['restaurant', 'corporate'],
        industry: 'Tourism & Events'
    },
    {
        slug: 'ink-entertainment-venue',
        title: 'Venue Showcase',
        client: 'INK Entertainment',
        description:
            'Multi-venue video production showcasing INK Entertainment properties for social media and marketing.',
        thumbnail: '/images/portfolio/port-5.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        niches: ['restaurant', 'nightlife'],
        industry: 'Entertainment & Nightlife'
    },
    {
        slug: 'mercedes-benz-campaign',
        title: 'Product Showcase Campaign',
        client: 'Mercedes-Benz Peterborough',
        description: 'Professional automotive video production for Mercedes-Benz dealership marketing.',
        thumbnail: '/images/portfolio/port-7.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4'),
        niches: ['restaurant', 'corporate'],
        industry: 'Automotive'
    },
    {
        slug: 'ufc-stance-collection',
        title: 'Brand Collection Video',
        client: 'UFC / Stance',
        description: 'Product and brand video for UFC Stance collection, directed by Jeffrey Han.',
        thumbnail: '/images/portfolio/ufc-stance.png',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        niches: ['restaurant', 'corporate'],
        industry: 'Sports & Fashion'
    },
    {
        slug: 'try-lychee-launch',
        title: 'Grand Opening Content',
        client: 'Try Lychee',
        description:
            'Launch-day video coverage capturing the energy, food, and atmosphere of a brand-new Toronto restaurant opening.',
        thumbnail: '/images/portfolio/nome.png',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        niches: ['restaurant'],
        industry: 'Restaurant & Hospitality'
    },
    {
        slug: 'hyundai-experiential',
        title: 'Experiential Event Film',
        client: 'Hyundai Canada',
        description:
            'Multi-camera event film capturing an immersive brand activation with cinematic storytelling and dynamic editing.',
        thumbnail: '/images/portfolio/port-5.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        niches: ['restaurant', 'corporate'],
        industry: 'Automotive & Events'
    }
];

// Build-time validation
export default z.array(portfolioItemSchema).parse(portfolioItems);
