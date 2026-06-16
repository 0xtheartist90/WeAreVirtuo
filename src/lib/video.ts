// lib/video.ts — Video URL resolver
// All videos served from Vercel Blob CDN

const BLOB_BASE = 'https://bl5ytvfc9m5w8kot.public.blob.vercel-storage.com';

/**
 * Resolves a local video path to its Blob CDN URL.
 * Input:  '/videos/hero/virtuo-showreel.mp4'
 * Output: 'https://bl5ytvfc9m5w8kot.public.blob.vercel-storage.com/videos/hero/virtuo-showreel.mp4'
 */
export function videoUrl(path: string): string {
    // Strip leading slash if present
    const clean = path.startsWith('/') ? path.slice(1) : path;

    return `${BLOB_BASE}/${clean}`;
}
