'use client';

import { V2PortfolioC } from '@/components/sections/v2-portfolio-c';
import type { PortfolioItem } from '@/content/types';

interface HomePortfolioProps {
    items: PortfolioItem[];
}

/**
 * Homepage portfolio — reuses the v2 portfolio carousel (TiltCard + CinematicPlayer).
 * Thin wrapper to keep home page assembly clean.
 */
export function HomePortfolio({ items }: HomePortfolioProps) {
    return <V2PortfolioC items={items} />;
}
