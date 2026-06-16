// content/shared/industries.ts — Industry verticals for homepage routing
import { videoUrl } from '@/lib/video';

export interface IndustryItem {
    slug: string;
    name: string;
    tagline: string;
    thumbnail: string;
    videoSrc: string;
    route: string;
}

const industries: IndustryItem[] = [
    {
        slug: 'restaurants',
        name: 'Restaurants',
        tagline: 'Fill tables with cinematic content',
        thumbnail: '/images/portfolio/nome.png',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        route: '/restaurants'
    },
    {
        slug: 'nightlife',
        name: 'Nightlife',
        tagline: 'Capture the energy after dark',
        thumbnail: '/images/bts/silhouette-setup.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4'),
        route: '/nightlife'
    },
    {
        slug: 'corporate',
        name: 'Corporate',
        tagline: 'Brand films that move boardrooms',
        thumbnail: '/images/bts/full-production-set.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        route: '/corporate'
    },
    {
        slug: 'events',
        name: 'Events',
        tagline: 'Every moment, every angle',
        thumbnail: '/images/portfolio/grayline.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        route: '/events'
    },
    {
        slug: 'hospitality',
        name: 'Hospitality',
        tagline: 'Luxury you can feel through a screen',
        thumbnail: '/images/portfolio/portfolio-shot.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        route: '/hospitality'
    },
    {
        slug: 'real-estate',
        name: 'Real Estate',
        tagline: 'Properties that sell themselves',
        thumbnail: '/images/about/studio-wide.png',
        videoSrc: videoUrl('videos/portfolio/nome-don-mills.mp4'),
        route: '/real-estate'
    },
    {
        slug: 'automotive',
        name: 'Automotive',
        tagline: 'Horsepower meets cinema',
        thumbnail: '/images/bts/commercial-stage.jpg',
        videoSrc: videoUrl('videos/portfolio/nome-fort-york.mp4'),
        route: '/automotive'
    },
    {
        slug: 'entertainment',
        name: 'Entertainment',
        tagline: 'From stage to screen',
        thumbnail: '/images/bts/cinematographer-red.jpg',
        videoSrc: videoUrl('videos/portfolio/try-lychee.mp4'),
        route: '/entertainment'
    }
];

export default industries;
