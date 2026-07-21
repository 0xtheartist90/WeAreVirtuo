'use client';

import { type CSSProperties, type ElementType, type ReactNode, createElement, useEffect, useRef, useState } from 'react';

import { HANZA } from '@/lib/motion';

type TokenStyle = CSSProperties & Record<'--reveal-delay' | '--reveal-rise' | '--reveal-blur', string>;

interface RevealTextProps {
    text: string;
    as?: ElementType;
    by?: 'word' | 'char';
    /** ms before the first token starts */
    delay?: number;
    /** ms between tokens */
    stagger?: number;
    /** starting translateY, in em */
    rise?: number;
    /** starting blur, in px */
    blur?: number;
    /** per-token duration, in ms */
    duration?: number;
    className?: string;
}

/**
 * Splits text into word/char tokens and reveals them staggered as the block
 * scrolls into view (once). Each token eases from opacity 0 + translateY + blur
 * to resting, on the shared Hanza curve.
 */
export function RevealText({
    text,
    as = 'span',
    by = 'word',
    delay = 0,
    stagger,
    rise = 0.8,
    blur = 0,
    duration = HANZA.duration.reveal,
    className
}: RevealTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [revealed, setRevealed] = useState(false);
    const step = stagger ?? (by === 'char' ? HANZA.stagger.char : HANZA.stagger.word);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setRevealed(true);

            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setRevealed(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );
        io.observe(el);

        return () => io.disconnect();
    }, []);

    const tokenStyle = (index: number): TokenStyle => ({
        '--reveal-delay': `${delay + index * step}ms`,
        '--reveal-rise': `${rise}em`,
        '--reveal-blur': `${blur}px`,
        transitionDuration: `${duration}ms`
    });

    const words = text.split(' ');
    let tokenIndex = 0;

    const content: ReactNode =
        by === 'word'
            ? words.map((word, w) => (
                  <span key={w} aria-hidden='true'>
                      <span className='reveal-token' style={tokenStyle(tokenIndex++)}>
                          {word}
                      </span>
                      {w < words.length - 1 ? ' ' : ''}
                  </span>
              ))
            : words.map((word, w) => (
                  <span key={w} className='reveal-word' aria-hidden='true'>
                      {Array.from(word).map((ch, c) => (
                          <span key={c} className='reveal-token' style={tokenStyle(tokenIndex++)}>
                              {ch}
                          </span>
                      ))}
                      {w < words.length - 1 ? <span className='reveal-token'> </span> : null}
                  </span>
              ));

    return createElement(
        as,
        { ref, className: `${revealed ? 'is-revealed ' : ''}${className ?? ''}`.trim(), 'aria-label': text },
        content
    );
}
