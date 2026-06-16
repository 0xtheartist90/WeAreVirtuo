// content/index.ts — Content access utilities
// Page components call these to get niche-filtered, typed content
import restaurantContent from '@/content/niches/restaurant';
import allPortfolio from '@/content/shared/portfolio';
import allProcess from '@/content/shared/process';
import allReels from '@/content/shared/reels';
import allTestimonials from '@/content/shared/testimonials';
import type { NicheConfig, PortfolioItem, ProcessStep, ReelItem, Testimonial } from '@/content/types';

// Registry of all niche configs by slug
const nicheRegistry: Record<string, NicheConfig> = {
    'restaurant-video-toronto': restaurantContent
    // 'video-production-toronto': corporateContent, // Phase 1B
};

export function getNicheContent(slug: string): NicheConfig {
    const content = nicheRegistry[slug];
    if (!content) {
        throw new Error(`Unknown niche slug: "${slug}". Available: ${Object.keys(nicheRegistry).join(', ')}`);
    }

    return content;
}

export type SharedContent = {
    portfolio: PortfolioItem[];
    testimonials: Testimonial[];
    process: ProcessStep[];
    reels: ReelItem[];
};

export function getSharedContent(nicheKey: string): SharedContent {
    return {
        portfolio: allPortfolio.filter((item) => item.niches.includes(nicheKey)),
        testimonials: allTestimonials.filter((item) => item.niches.includes(nicheKey)),
        process: allProcess,
        reels: allReels
    };
}

export function getAllNicheSlugs(): string[] {
    return Object.keys(nicheRegistry);
}
