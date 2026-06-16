// content/types.ts — Zod schemas + TypeScript types (FR45, NFR26)
// Build fails if content doesn't match these schemas
import { z } from 'zod/v4';

// --- Schema Definitions ---

export const serviceCardSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string() // Lucide icon name
});

export const faqItemSchema = z.object({
    question: z.string(),
    answer: z.string()
});

export const logoSchema = z.object({
    name: z.string(),
    src: z.string(), // Path to SVG/PNG in /public/images/logos/
    alt: z.string()
});

export const portfolioItemSchema = z.object({
    slug: z.string(),
    title: z.string(),
    client: z.string(),
    description: z.string(),
    thumbnail: z.string(), // Path in /public/images/
    videoSrc: z.string().optional(), // Path in /public/videos/
    niches: z.array(z.string()), // Tags: ['restaurant', 'corporate']
    industry: z.string() // Display label: "Restaurant & Hospitality"
});

export const testimonialSchema = z.object({
    slug: z.string(),
    quote: z.string(),
    name: z.string(),
    title: z.string(), // Job title
    company: z.string(),
    avatar: z.string().optional(), // Path in /public/images/testimonials/
    niches: z.array(z.string())
});

export const processStepSchema = z.object({
    number: z.number(),
    title: z.string(),
    description: z.string()
});

export const nicheConfigSchema = z.object({
    slug: z.string(), // URL slug: 'restaurant-video-toronto'
    nicheKey: z.string(), // Internal key: 'restaurant'
    meta: z.object({
        title: z.string(),
        description: z.string(),
        ogImage: z.string().optional()
    }),
    hero: z.object({
        headline: z.string(),
        subheadline: z.string(),
        videoSrc: z.string().optional(),
        posterSrc: z.string().optional()
    }),
    logos: z.array(logoSchema),
    services: z.array(serviceCardSchema),
    faq: z.array(faqItemSchema),
    featuredPortfolioSlugs: z.array(z.string()),
    featuredTestimonialSlugs: z.array(z.string()),
    stats: z.array(
        z.object({
            value: z.number(),
            suffix: z.string(), // "+", "%", etc.
            label: z.string()
        })
    )
});

// --- About Page Schemas ---

export const storyChapterSchema = z.object({
    title: z.string(),
    body: z.string(),
    image: z.string()
});

export const studioValueSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    featured: z.boolean().optional(),
    image: z.string().optional()
});

export const gearItemSchema = z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    specs: z.string(),
    image: z.string().optional()
});

export const btsItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    label: z.string().optional(),
    src: z.string()
});

export const reelItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['youtube', 'local']),
    source: z.string(), // YouTube video ID or local file path (/videos/reels/...)
    category: z.enum(['restaurant', 'nightlife', 'events', 'hospitality']),
    instagramUrl: z.string().optional()
});

// --- Inferred Types ---

export type ServiceCard = z.infer<typeof serviceCardSchema>;
export type FAQItem = z.infer<typeof faqItemSchema>;
export type Logo = z.infer<typeof logoSchema>;
export type PortfolioItem = z.infer<typeof portfolioItemSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type NicheConfig = z.infer<typeof nicheConfigSchema>;
export type ReelItem = z.infer<typeof reelItemSchema>;
export type StoryChapter = z.infer<typeof storyChapterSchema>;
export type StudioValue = z.infer<typeof studioValueSchema>;
export type GearItem = z.infer<typeof gearItemSchema>;
export type BTSItem = z.infer<typeof btsItemSchema>;
