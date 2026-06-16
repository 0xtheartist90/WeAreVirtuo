// hooks/use-reduced-motion.ts — Respects prefers-reduced-motion (NFR15)
// Every animated component uses this hook
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);

        return () => mq.removeEventListener('change', handler);
    }, []);

    return reducedMotion;
}
