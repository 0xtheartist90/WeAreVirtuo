// content/shared/testimonials.ts — Client testimonials tagged by niche (FR21)
import { type Testimonial, testimonialSchema } from '@/content/types';

import { z } from 'zod/v4';

const testimonials: Testimonial[] = [
    {
        slug: 'patrick-lee-nome',
        quote: 'Their expertise in creating engaging reels and 360 content transformed our online presence and enhanced our marketing efforts.',
        name: 'Patrick Lee',
        title: 'Owner',
        company: 'Nome Izakaya',
        avatar: '/images/testimonials/patrick.jpg',
        niches: ['restaurant']
    },
    {
        slug: 'crystal-sheriff-grayline',
        quote: 'The work went beyond any expectation. The on-site event capture quality was exceptional.',
        name: 'Crystal Sheriff',
        title: 'Marketing Manager',
        company: 'Grayline Toronto',
        avatar: '/images/testimonials/jessica.jpg',
        niches: ['restaurant', 'corporate']
    },
    {
        slug: 'michael-santos-mercedes',
        quote: 'The team was incredibly professional and creative with strong brand representation throughout.',
        name: 'Michael Santos',
        title: 'Marketing Director',
        company: 'Mercedes-Benz Peterborough',
        avatar: '/images/testimonials/michael.jpg',
        niches: ['corporate']
    },
    {
        slug: 'montu-khokhar-nucap',
        quote: 'Exceptional attention to detail in video production. Every frame communicated our brand quality.',
        name: 'Montu Khokhar',
        title: 'Director',
        company: 'Nucap / NRS Brakes',
        avatar: '/images/testimonials/marcus.jpg',
        niches: ['corporate']
    },
    {
        slug: 'sarah-chen-ink',
        quote: 'They captured the energy of our venue perfectly. The content drives real engagement on our social channels every single week.',
        name: 'Sarah Chen',
        title: 'Marketing Director',
        company: 'INK Entertainment',
        avatar: '/images/testimonials/sarah.jpg',
        niches: ['restaurant', 'corporate']
    },
    {
        slug: 'david-park-liberty',
        quote: 'Working with the Virtuo team felt effortless. They understood our brand from day one and delivered content that exceeded our expectations.',
        name: 'David Park',
        title: 'VP Operations',
        company: 'Liberty Entertainment Group',
        avatar: '/images/testimonials/david.jpg',
        niches: ['restaurant', 'corporate']
    },
    {
        slug: 'anna-rossi-hazelton',
        quote: 'The quality of the food cinematography was outstanding. Our bookings increased noticeably after launching the video campaign.',
        name: 'Anna Rossi',
        title: 'General Manager',
        company: 'The Hazelton Hotel',
        avatar: '/images/testimonials/anna.jpg',
        niches: ['restaurant']
    }
];

// Build-time validation
export default z.array(testimonialSchema).parse(testimonials);
