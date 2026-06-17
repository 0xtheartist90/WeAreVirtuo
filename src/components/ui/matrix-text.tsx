'use client';

import { type ElementType, createElement, useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface MatrixTextProps {
    children: string;
    as?: ElementType;
    className?: string;
    /** ms added per character to the decode duration */
    speed?: number;
    /** 'mount' decodes on load, 'view' decodes when scrolled into view */
    trigger?: 'mount' | 'view';
}

/**
 * Premium decode: letters resolve left-to-right as a wave. Unresolved letters
 * are dimmed, the letter about to lock flashes in the accent colour, resolved
 * letters are crisp. SSR-safe and respects prefers-reduced-motion.
 */
export function MatrixText({ children, as = 'span', className, speed = 34, trigger = 'mount' }: MatrixTextProps) {
    const ref = useRef<HTMLElement>(null);
    const text = children;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = text;

            return;
        }

        const N = text.length;
        const duration = 800 + N * speed;
        const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const settleAt = text.split('').map((_, i) => (i + 1) / N);
        const cache = text.split('').map((ch) => (ch === ' ' ? ' ' : rand()));
        let intervalId: ReturnType<typeof setInterval> | undefined;
        let started = false;

        const run = () => {
            if (started) return;
            started = true;
            const start = Date.now();
            intervalId = setInterval(() => {
                const p = Math.min(1, (Date.now() - start) / duration);
                const eased = p * p;
                let html = '';
                for (let i = 0; i < N; i++) {
                    const ch = text[i];
                    if (ch === ' ') {
                        html += ' ';
                        continue;
                    }
                    if (eased >= settleAt[i]) {
                        html += `<span>${ch}</span>`;
                    } else {
                        if (Math.random() < 0.32) cache[i] = rand();
                        const edge = settleAt[i] - eased < 0.1;
                        html += `<span class="${edge ? 'text-accent' : 'opacity-30'}">${cache[i]}</span>`;
                    }
                }
                el.innerHTML = html;
                if (p >= 1) {
                    el.textContent = text;
                    if (intervalId) clearInterval(intervalId);
                }
            }, 50);
        };

        if (trigger === 'view') {
            // keep the real text visible until it scrolls in, then decode once
            const io = new IntersectionObserver(
                (entries) => {
                    for (const e of entries) {
                        if (e.isIntersecting) {
                            run();
                            io.disconnect();
                        }
                    }
                },
                { threshold: 0.35 }
            );
            io.observe(el);

            return () => {
                io.disconnect();
                if (intervalId) clearInterval(intervalId);
            };
        }

        run();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, trigger]);

    return createElement(as, { ref, className }, text);
}
