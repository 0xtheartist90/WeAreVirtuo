'use client';

import { cn } from '@/lib/utils';

import { motion } from 'motion/react';

interface LampEffectProps {
    children: React.ReactNode;
    className?: string;
}

export function LampEffect({ children, className }: LampEffectProps) {
    return (
        <div
            className={cn(
                'bg-background relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden',
                className
            )}>
            <div className='relative isolate z-0 flex w-full flex-1 items-center justify-center'>
                {/* ── Desktop: full animated conic cones ── */}
                <motion.div
                    initial={{ opacity: 0.5, width: '8rem' }}
                    whileInView={{ opacity: 1, width: '30rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    style={{
                        backgroundImage:
                            'conic-gradient(from 70deg at center top, rgba(255,245,235,0.7), transparent, transparent)'
                    }}
                    className='absolute inset-auto right-1/2 hidden h-56 overflow-visible md:block'>
                    <div className='bg-background absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]' />
                    <div className='bg-background absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]' />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.5, width: '8rem' }}
                    whileInView={{ opacity: 1, width: '30rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    style={{
                        backgroundImage:
                            'conic-gradient(from 290deg at center top, transparent, transparent, rgba(255,245,235,0.7))'
                    }}
                    className='absolute inset-auto left-1/2 hidden h-56 md:block'>
                    <div className='bg-background absolute right-0 bottom-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]' />
                    <div className='bg-background absolute right-0 bottom-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]' />
                </motion.div>

                {/* Desktop blur layers */}
                <div className='bg-background absolute top-1/2 hidden h-48 w-full translate-y-12 blur-2xl md:block' />
                <div className='absolute top-1/2 z-50 hidden h-48 w-full bg-transparent opacity-10 backdrop-blur-md md:block' />
                <motion.div
                    initial={{ width: '4rem' }}
                    whileInView={{ width: '16rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    className='absolute inset-auto z-30 hidden h-36 w-64 -translate-y-[6rem] rounded-full bg-white/20 blur-2xl md:block'
                />
                <motion.div
                    initial={{ width: '8rem' }}
                    whileInView={{ width: '30rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                    className='absolute inset-auto z-50 hidden h-0.5 w-[30rem] -translate-y-[7rem] bg-white/70 md:block'
                />
                <div className='bg-background absolute inset-auto z-40 hidden h-44 w-full -translate-y-[12.5rem] md:block' />
            </div>

            {/* Children content */}
            <div className='relative z-50 flex flex-col items-center px-4 md:-translate-y-60 md:px-5'>
                {/* ── Mobile: lamp glow sits directly above content ── */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0.3 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    className='pointer-events-none mb-6 md:hidden'>
                    {/* Bright horizontal line */}
                    <div className='mx-auto h-[2px] w-48 rounded-full bg-white/60' />
                    {/* Soft glow bloom behind line */}
                    <div className='mx-auto -mt-3 h-12 w-64 rounded-full bg-white/15 blur-xl' />
                    {/* Wider, softer downward wash */}
                    <div
                        className='-mt-6 h-24 w-[80vw]'
                        style={{
                            background:
                                'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255,245,235,0.20), transparent 80%)'
                        }}
                    />
                </motion.div>

                {children}
            </div>
        </div>
    );
}
