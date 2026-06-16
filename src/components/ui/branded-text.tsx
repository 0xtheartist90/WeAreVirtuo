'use client';

import type { ReactNode } from 'react';

import { motion } from 'motion/react';

/**
 * Renders any R/r in the string as a red branded letter with subtle glow.
 * Use in headings and titles for the signature Virtuo Я branding.
 */
export function brandR(text: string): ReactNode {
    const parts = text.split(/(r)/gi);

    return parts.map((part, i) =>
        /^r$/i.test(part) ? (
            <span key={i} className='text-accent' style={{ textShadow: '0 0 12px rgba(220, 38, 38, 0.3)' }}>
                {part}
            </span>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

/**
 * Brands only the very first R/r found in the entire string.
 * Use for hero headlines where exactly one R should pop.
 */
export function brandFirstR(text: string): ReactNode {
    const idx = text.search(/r/i);
    if (idx === -1) return text;

    return (
        <>
            {text.slice(0, idx)}
            <span className='text-accent' style={{ textShadow: '0 0 12px rgba(220, 38, 38, 0.3)' }}>
                {text[idx]}
            </span>
            {text.slice(idx + 1)}
        </>
    );
}

/**
 * Animated version of brandR — wraps each R/r in a motion.span
 * with a periodic mirror-flip animation for the signature Я effect.
 */
export function brandAnimatedR(text: string): ReactNode {
    const parts = text.split(/(r)/gi);

    return parts.map((part, i) =>
        /^r$/i.test(part) ? (
            <motion.span
                key={i}
                className='text-accent inline-block'
                animate={{ scaleX: [1, 1, -1, -1, 1, 1] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    times: [0, 0.3, 0.35, 0.55, 0.6, 1],
                    ease: 'easeInOut'
                }}
                style={{ textShadow: '0 0 12px rgba(220, 38, 38, 0.3)' }}>
                {part}
            </motion.span>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}
