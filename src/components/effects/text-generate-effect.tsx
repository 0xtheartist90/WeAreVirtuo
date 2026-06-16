'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { motion } from 'motion/react';

/** Brand only the first R/r in a word — optionally with looping animation */
function brandFirstRInWord(word: string, animate: boolean): ReactNode {
    const idx = word.search(/r/i);
    if (idx === -1) return word;

    const rLetter = animate ? (
        <motion.span
            className='text-accent inline-block'
            animate={{
                scale: [1, 1.08, 1, 0.95, 1],
                opacity: [1, 0.8, 1, 0.85, 1],
                scaleX: [1, 1, -1, -1, 1, 1, 1, -1, 1, 1]
            }}
            transition={{
                scale: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                opacity: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                scaleX: {
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.28, 0.33, 0.42, 0.47, 0.65, 0.7, 0.74, 0.79, 1],
                    ease: 'easeInOut'
                }
            }}
            style={{ textShadow: '0 0 14px rgba(220, 38, 38, 0.35)' }}>
            {word[idx]}
        </motion.span>
    ) : (
        <span className='text-accent' style={{ textShadow: '0 0 14px rgba(220, 38, 38, 0.35)' }}>
            {word[idx]}
        </span>
    );

    return (
        <>
            {word.slice(0, idx)}
            {rLetter}
            {word.slice(idx + 1)}
        </>
    );
}

/** Check if a word should have its R branded */
function shouldBrand(word: string, brandRWords?: string[]): boolean {
    if (!brandRWords || brandRWords.length === 0) return false;

    return brandRWords.some((bw) => word.toLowerCase().includes(bw.toLowerCase()));
}

interface TextGenerateEffectProps {
    words: string;
    className?: string;
    duration?: number;
    staggerDelay?: number;
    disabled?: boolean;
    /** Only brand Rs in words matching these strings. If empty/undefined, no Rs are branded. */
    brandRWords?: string[];
    /** Animate the branded R with a pulse loop (like the logo R) */
    animateR?: boolean;
}

export function TextGenerateEffect({
    words,
    className,
    duration = 0.5,
    staggerDelay = 0.1,
    disabled = false,
    brandRWords,
    animateR = false
}: TextGenerateEffectProps) {
    const wordsArray = words.split(' ');

    const renderWord = (word: string) => (shouldBrand(word, brandRWords) ? brandFirstRInWord(word, animateR) : word);

    if (disabled) {
        return (
            <span className={cn('inline', className)}>
                {wordsArray.map((word, idx) => (
                    <span key={idx}>
                        {renderWord(word)}
                        {idx < wordsArray.length - 1 ? ' ' : ''}
                    </span>
                ))}
            </span>
        );
    }

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    const child = {
        hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <motion.span className={cn('inline', className)} variants={container} initial='hidden' animate='visible'>
            {wordsArray.map((word, idx) => (
                <motion.span key={idx} className='inline-block' variants={child}>
                    {renderWord(word)}
                    {idx < wordsArray.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </motion.span>
    );
}
