// hooks/use-scroll-direction.ts — For sticky nav show/hide on scroll
import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10): ScrollDirection {
    const [direction, setDirection] = useState<ScrollDirection>(null);

    useEffect(() => {
        let lastY = window.scrollY;

        const handler = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastY;

            if (Math.abs(diff) > threshold) {
                setDirection(diff > 0 ? 'down' : 'up');
                lastY = currentY;
            }
        };

        window.addEventListener('scroll', handler, { passive: true });

        return () => window.removeEventListener('scroll', handler);
    }, [threshold]);

    return direction;
}
