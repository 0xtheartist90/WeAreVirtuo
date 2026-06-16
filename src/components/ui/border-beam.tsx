'use client';

import { cn } from '@/lib/utils';

import { motion } from 'motion/react';

interface BorderBeamProps {
    className?: string;
    duration?: number;
    colorFrom?: string;
    colorTo?: string;
}

export function BorderBeam({
    className,
    duration = 8,
    colorFrom = '#DC2626',
    colorTo = 'rgba(255, 255, 255, 0.4)'
}: BorderBeamProps) {
    return (
        <div
            className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]', className)}
            style={{
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1.5px',
                borderRadius: 'inherit'
            }}>
            <motion.div
                className='absolute inset-[-200%]'
                animate={{ rotate: 360 }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
                style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 8%, ${colorTo} 16%, transparent 28%)`
                }}
            />
        </div>
    );
}
