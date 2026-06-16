'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Set to false to skip the intro animation.
const SHOW_INTRO = false;
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── Timing (ms from mount) ────────────────────────────
const FLASH_START = 2100;
const SETTLE_DELAY = 200;
const EXIT_AFTER = 4500;

// ── SVG path data ─────────────────────────────────────

const FRAME =
    'M2710 26665 l0 -24365 24360 0 24360 0 0 24365 0 24365 -24360 0 -24360 0 0 -24365z m46150 5 l0 -21790 -21790 0 -21790 0 0 21790 0 21790 21790 0 21790 0 0 -21790z';

const LETTERS = [
    {
        id: 'V',
        d: 'M9842 36761 c2 -5 736 -1753 1633 -3885 l1630 -3876 806 0 806 0 1631 3868 c897 2127 1634 3875 1638 3885 6 16 -50 17 -1092 17 l-1099 0 -635 -1593 c-349 -875 -773 -1938 -942 -2362 l-307 -770 -14 35 c-8 19 -430 1082 -937 2363 l-923 2327 -1099 0 c-639 0 -1098 -4 -1096 -9z'
    },
    {
        id: 'I',
        d: 'M25780 32885 l0 -3885 1015 0 1015 0 0 3885 0 3885 -1015 0 -1015 0 0 -3885z'
    },
    {
        id: 'R',
        d: 'M39145 36763 c-660 -35 -1244 -264 -1638 -641 -371 -356 -596 -819 -679 -1397 -20 -140 -17 -629 5 -780 86 -577 312 -1005 698 -1315 226 -181 526 -329 841 -414 65 -17 118 -33 118 -36 0 -3 -547 -719 -1216 -1590 l-1215 -1585 1253 -3 c993 -2 1255 1 1264 10 6 7 441 679 965 1493 l954 1480 3 -1493 2 -1492 1010 0 1010 0 0 3885 0 3885 -1657 -2 c-912 -1 -1685 -3 -1718 -5z m1355 -2509 l0 -956 -332 5 c-246 3 -357 8 -423 20 -391 70 -662 250 -785 521 -95 210 -106 527 -25 759 104 301 393 511 795 577 162 27 154 27 478 28 l292 2 0 -956z'
    },
    {
        id: 'T',
        d: 'M11245 25598 c-3 -7 -4 -393 -3 -858 l3 -845 827 -3 828 -2 2 -3028 3 -3027 1010 0 1010 0 3 3027 2 3028 828 2 827 3 0 855 0 855 -2668 3 c-2129 2 -2669 0 -2672 -10z'
    },
    {
        id: 'U',
        d: 'M23410 23233 c0 -1465 4 -2439 10 -2538 63 -1011 332 -1746 820 -2235 499 -500 1195 -765 2180 -831 220 -15 757 -6 970 15 1058 107 1799 489 2243 1158 309 464 486 1079 537 1863 6 103 10 1013 10 2552 l0 2393 -1005 0 -1005 0 0 -2207 c0 -2117 -4 -2468 -31 -2753 -28 -301 -111 -564 -241 -760 -54 -82 -172 -206 -257 -271 -139 -105 -319 -174 -531 -204 -148 -20 -472 -20 -620 0 -578 81 -923 461 -1014 1120 -37 268 -39 375 -43 2748 l-4 2327 -1009 0 -1010 0 0 -2377z'
    },
    {
        id: 'O',
        d: 'M39255 25810 c-923 -80 -1716 -384 -2385 -914 -152 -120 -484 -451 -603 -601 -683 -858 -986 -1910 -871 -3025 58 -567 231 -1104 513 -1598 583 -1016 1568 -1713 2765 -1957 360 -73 687 -100 1106 -92 299 6 461 20 720 62 735 120 1436 429 2000 881 149 119 415 379 532 519 650 778 971 1712 945 2745 -11 444 -75 818 -207 1213 -300 900 -909 1659 -1725 2150 -531 321 -1139 523 -1815 603 -156 19 -811 28 -975 14z m663 -1961 c776 -84 1455 -570 1765 -1263 126 -282 177 -531 177 -868 0 -446 -115 -827 -360 -1187 -280 -413 -713 -723 -1207 -865 -444 -127 -959 -110 -1388 46 -136 50 -353 159 -465 234 -368 245 -651 597 -814 1013 -151 382 -177 882 -70 1306 65 257 203 535 383 770 64 84 242 266 330 337 324 261 739 434 1142 477 121 12 394 13 507 0z'
    }
];

const VIDEO_TEXT = [
    {
        id: 'vV',
        d: 'M21063 11233 c6 -22 896 -2203 906 -2220 5 -9 879 2063 937 2220 6 16 -6 17 -167 17 l-174 0 -86 -213 c-48 -116 -178 -438 -289 -714 -112 -277 -206 -503 -210 -503 -3 0 -134 322 -290 715 l-285 715 -174 0 c-160 0 -173 -1 -168 -17z'
    },
    {
        id: 'vI',
        d: 'M24000 10205 l0 -1045 160 0 160 0 0 1045 0 1045 -160 0 -160 0 0 -1045z'
    },
    {
        id: 'vD',
        d: 'M25650 10205 l0 -1047 373 5 c405 5 437 8 602 68 45 17 119 52 164 80 95 59 244 197 307 285 232 325 242 847 23 1188 -120 188 -310 336 -519 405 -148 48 -196 53 -582 58 l-368 5 0 -1047z m772 712 c142 -37 227 -85 324 -182 66 -66 90 -99 128 -176 26 -52 53 -125 61 -164 20 -95 19 -287 -1 -378 -47 -209 -185 -383 -380 -478 -114 -55 -189 -70 -396 -76 l-178 -5 0 747 0 748 173 -6 c140 -4 190 -10 269 -30z'
    },
    {
        id: 'vE',
        d: 'M28500 10205 l0 -1045 580 0 580 0 0 150 0 150 -420 0 -420 0 0 345 0 345 410 0 410 0 0 150 0 150 -410 0 -410 0 0 250 0 250 420 0 420 0 0 150 0 150 -580 0 -580 0 0 -1045z'
    },
    {
        id: 'vO',
        d: 'M31697 11275 c-236 -45 -419 -146 -597 -332 -89 -92 -144 -167 -192 -263 -141 -283 -142 -653 -2 -949 146 -310 477 -552 823 -602 125 -18 323 -7 444 25 419 108 740 457 807 879 20 120 8 339 -24 454 -51 184 -144 341 -286 483 -144 145 -304 239 -490 287 -121 32 -360 41 -483 18z m428 -315 c130 -41 222 -97 317 -192 161 -161 240 -378 225 -617 -8 -125 -27 -195 -82 -308 -77 -157 -234 -303 -395 -369 -192 -78 -434 -71 -617 17 -211 101 -366 285 -424 505 -27 104 -29 295 -4 404 66 284 298 512 585 575 96 22 304 14 395 -15z'
    }
];

// ── Red flash roulette ────────────────────────────────
// Bounces between letters, accelerating like a roulette wheel, settles on R.
const R_INDEX = 2;

interface FlashStep {
    letter: number;
    on: number;
    gap: number;
}

const FLASH_SEQUENCE: FlashStep[] = [
    { letter: 3, on: 160, gap: 55 }, // T
    { letter: 0, on: 145, gap: 48 }, // V
    { letter: 5, on: 130, gap: 42 }, // O
    { letter: 1, on: 118, gap: 38 }, // I
    { letter: 4, on: 105, gap: 34 }, // U
    { letter: 0, on: 92, gap: 30 }, // V
    { letter: 3, on: 80, gap: 26 }, // T
    { letter: 5, on: 68, gap: 22 }, // O
    { letter: 1, on: 58, gap: 18 }, // I
    { letter: 4, on: 48, gap: 15 }, // U
    { letter: 3, on: 40, gap: 12 }, // T
    { letter: 0, on: 34, gap: 10 }, // V
    { letter: 2, on: 0, gap: 0 } // R — settles
];

// ── Logo Component ────────────────────────────────────
function VirtuoLogo() {
    const [flashLetter, setFlashLetter] = useState(-1);
    const [settled, setSettled] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showSweep, setShowSweep] = useState(false);
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const t = timersRef.current;

        // Schedule the roulette flash sequence
        t.push(
            setTimeout(() => {
                let elapsed = 0;

                FLASH_SEQUENCE.forEach((step, i) => {
                    const isLast = i === FLASH_SEQUENCE.length - 1;

                    // Flash this letter red
                    t.push(setTimeout(() => setFlashLetter(step.letter), elapsed));

                    if (!isLast) {
                        // Return to white between flashes
                        t.push(setTimeout(() => setFlashLetter(-1), elapsed + step.on));
                        elapsed += step.on + step.gap;
                    } else {
                        // R stays red — mark as settled after brief hold
                        t.push(setTimeout(() => setSettled(true), SETTLE_DELAY));
                    }
                });
            }, FLASH_START)
        );

        // Schedule VIDEO text appearance
        t.push(setTimeout(() => setShowVideo(true), 3600));

        // Schedule light sweep
        t.push(setTimeout(() => setShowSweep(true), 3900));

        return () => t.forEach(clearTimeout);
    }, []);

    const getFill = (index: number): string => {
        if (settled && index === R_INDEX) return '#DC2626';
        if (flashLetter === index) return '#DC2626';

        return '#ffffff';
    };

    return (
        <div className='relative flex flex-col items-center'>
            {/* Red glow halo — blooms when R settles */}
            <motion.div
                className='pointer-events-none absolute top-[5%] right-[-8%] h-[50%] w-[50%] rounded-full'
                style={{
                    background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)'
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={settled ? { opacity: [0, 1, 0.7], scale: [0.4, 1.5, 1.1] } : { opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
            />

            {/* Logo container — scales in with luxury ease */}
            <motion.div
                className='relative'
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.0, ease: EASE }}>
                {/* Light sweep across logo before exit */}
                {showSweep && (
                    <motion.div
                        className='pointer-events-none absolute inset-0 z-10 overflow-hidden'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}>
                        <motion.div
                            className='absolute inset-0'
                            style={{
                                background:
                                    'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.05) 52%, transparent 65%)'
                            }}
                            initial={{ x: '-120%' }}
                            animate={{ x: '220%' }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    </motion.div>
                )}

                <svg
                    viewBox='0 0 5389 5389'
                    className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px]'
                    aria-hidden='true'>
                    <g transform='translate(0,5389) scale(0.1,-0.1)' stroke='none'>
                        {/* Frame — fades in first */}
                        <motion.path
                            d={FRAME}
                            fill='#ffffff'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
                        />

                        {/* VIRTUO letters — staggered entrance + animated fill via FM */}
                        {LETTERS.map((letter, i) => (
                            <motion.path
                                key={letter.id}
                                d={letter.d}
                                initial={{ opacity: 0, fill: '#ffffff' }}
                                animate={{
                                    opacity: 1,
                                    fill: getFill(i)
                                }}
                                transition={{
                                    opacity: {
                                        delay: 0.7 + i * 0.13,
                                        duration: 0.45,
                                        ease: EASE
                                    },
                                    fill: {
                                        duration: 0.06,
                                        ease: 'linear'
                                    }
                                }}
                            />
                        ))}

                        {/* "VIDEO" text — stagger fade-in after settle */}
                        {VIDEO_TEXT.map((letter, i) => (
                            <motion.path
                                key={letter.id}
                                d={letter.d}
                                fill='#ffffff'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: showVideo ? 1 : 0 }}
                                transition={{
                                    delay: showVideo ? i * 0.07 : 0,
                                    duration: 0.35,
                                    ease: EASE
                                }}
                            />
                        ))}
                    </g>
                </svg>
            </motion.div>
        </div>
    );
}

// ── Intro Animation Wrapper ────────────────────────────
export function IntroAnimation({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(SHOW_INTRO);

    useEffect(() => {
        if (!visible) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(false);

            return;
        }

        const timer = setTimeout(() => setVisible(false), EXIT_AFTER);

        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key='intro-overlay'
                        className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]'
                        exit={{ opacity: 0, scale: 1.06 }}
                        transition={{ duration: 0.8, ease: EASE }}>
                        {/* Ambient breathing red glow */}
                        <motion.div
                            className='pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full'
                            style={{
                                background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)'
                            }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.9, 1.15, 0.9]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />

                        <VirtuoLogo />
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </>
    );
}
