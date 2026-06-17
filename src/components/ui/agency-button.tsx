import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Flat, sharp-cornered CTA — matches the bold/minimal brutalist styling.
 * No border-radius by design.
 */
export function AgencyButton({ className, children, ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
        <button
            className={cn(
                'glitch-hover bg-accent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-accent/90 disabled:opacity-60',
                className
            )}
            {...props}>
            {children}
        </button>
    );
}

/** Shared classes for sharp-cornered outline links/buttons. */
export const outlineButtonClass =
    'glitch-hover inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:border-white/60 hover:bg-white/5';
