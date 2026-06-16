// lib/analytics.ts — Typed analytics utility
// Components call trackEvent() — never touch dataLayer directly

type EventParams = Record<string, string | number | boolean>;

declare global {
    interface Window {
        dataLayer: Array<Record<string, unknown>>;
    }
}

export function trackEvent(name: string, params?: EventParams): void {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: name,
        ...params
    });
}
