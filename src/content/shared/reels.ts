// content/shared/reels.ts — Reel items (local MP4s served from Vercel Blob)
import { type ReelItem, reelItemSchema } from '@/content/types';
import { videoUrl } from '@/lib/video';

import { z } from 'zod/v4';

const reelItems: ReelItem[] = [
    // ─── Local MP4s (Instagram Reels) ───
    {
        id: 'animl-toronto',
        name: 'ANIML Toronto',
        type: 'local',
        source: videoUrl('videos/reels/animl-toronto.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DCe33yyRM4Q/'
    },
    {
        id: 'animl-cocktail',
        name: 'ANIML Cocktail',
        type: 'local',
        source: videoUrl('videos/reels/animl-cocktail-video.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DSeEGkwjkqD/'
    },
    {
        id: 'level-6-miami',
        name: 'Level 6 Miami',
        type: 'local',
        source: videoUrl('videos/reels/level-6-miami.mp4'),
        category: 'nightlife',
        instagramUrl: 'https://www.instagram.com/reel/DUmgcZGDoOC/'
    },
    {
        id: 'amal-miami',
        name: 'AMAL Miami',
        type: 'local',
        source: videoUrl('videos/reels/amal-miami.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DUKMJkNjZyH/'
    },
    {
        id: 'globe-mail-centre',
        name: 'Globe and Mail Centre',
        type: 'local',
        source: videoUrl('videos/reels/globe-and-mail-centre.mp4'),
        category: 'events',
        instagramUrl: 'https://www.instagram.com/reel/DSVtlgeAXPF/'
    },
    {
        id: 'friday-harbour',
        name: 'Friday Harbour',
        type: 'local',
        source: videoUrl('videos/reels/friday-harbour.mp4'),
        category: 'hospitality',
        instagramUrl: 'https://www.instagram.com/reel/DNtfnYKXCJ2/'
    },
    {
        id: 'comkids-foundation',
        name: 'ComKids Foundation',
        type: 'local',
        source: videoUrl('videos/reels/comkids-foundation.mp4'),
        category: 'events',
        instagramUrl: 'https://www.instagram.com/reel/DQ2m0XsDWnn/'
    },
    {
        id: '30-hazelton',
        name: '30Hazelton',
        type: 'local',
        source: videoUrl('videos/reels/30-hazelton.mp4'),
        category: 'hospitality',
        instagramUrl: 'https://www.instagram.com/reel/DO1g9LdgDzk/'
    },
    {
        id: 'figo',
        name: 'FIGO',
        type: 'local',
        source: videoUrl('videos/reels/figo.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DOby7hPjljb/'
    },
    {
        id: 'bmw',
        name: 'BMW',
        type: 'local',
        source: videoUrl('videos/reels/bmw.mp4'),
        category: 'events',
        instagramUrl: 'https://www.instagram.com/reel/DGWo-FCsRqZ/'
    },
    {
        id: 'autoshow',
        name: 'Canadian AutoShow',
        type: 'local',
        source: videoUrl('videos/reels/canadian-international-autoshow.mp4'),
        category: 'events',
        instagramUrl: 'https://www.instagram.com/reel/DH_1hWIyGdB/'
    },
    {
        id: 'chambers-steak-house',
        name: 'Chambers Toronto',
        type: 'local',
        source: videoUrl('videos/reels/chambers-steak-house.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DFT6D8bNTSm/'
    },
    {
        id: 'laylak',
        name: 'LayLak Lebanese',
        type: 'local',
        source: videoUrl('videos/reels/laylak-lebanese-cuisine.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DGAEq7eMNpw/'
    },
    {
        id: 'chaiiwala',
        name: 'Chaiiwala',
        type: 'local',
        source: videoUrl('videos/reels/chaiiwala.mp4'),
        category: 'restaurant',
        instagramUrl: 'https://www.instagram.com/reel/DSVoIRqgQe0/'
    },
    {
        id: 'hazelton-reel',
        name: 'Hazelton',
        type: 'local',
        source: videoUrl('videos/reels/hazelton-reel.mp4'),
        category: 'hospitality',
        instagramUrl: 'https://www.instagram.com/reel/DO1g9LdgDzk/'
    },
    {
        id: 'nome-izakaya-local',
        name: 'Nome North York',
        type: 'local',
        source: videoUrl('videos/reels/nome-izakaya.mp4'),
        category: 'restaurant'
    }
];

// Build-time validation
export default z.array(reelItemSchema).parse(reelItems);
