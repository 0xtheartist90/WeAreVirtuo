// lib/utm.ts — UTM parameter capture and persistence
// Reads UTM from URL on first load, persists to sessionStorage

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const STORAGE_KEY = 'virtuovideo_utm';

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>;

export function captureUtmParams(): void {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((key) => params.has(key));

    if (hasUtm) {
        const utm: Record<string, string> = {};
        for (const key of UTM_KEYS) {
            utm[key] = params.get(key) || '';
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    }
}

export function getUtmParams(): UtmParams {
    if (typeof window === 'undefined') {
        return {
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: ''
        };
    }

    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored) as UtmParams;
    } catch {
        // sessionStorage unavailable
    }

    return {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    };
}

export function getLandingPageUrl(): string {
    if (typeof window === 'undefined') return '';

    return window.location.pathname;
}
