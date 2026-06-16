// content/about.ts — About page content
import {
    type BTSItem,
    type GearItem,
    type StoryChapter,
    type StudioValue,
    btsItemSchema,
    gearItemSchema,
    storyChapterSchema,
    studioValueSchema
} from '@/content/types';

import { z } from 'zod/v4';

// ─── Jeff's Story ───

const story: StoryChapter[] = z.array(storyChapterSchema).parse([
    {
        title: 'The Beginning',
        body: "It started with a borrowed camera and a gut feeling. Jeff Han didn't come from film school — he came from the streets of Toronto, teaching himself to see light the way a painter sees color. Every frame was a lesson. Every mistake, a stepping stone.",
        image: '/images/bts/cinematographer-red.jpg'
    },
    {
        title: 'Building the Craft',
        body: "Years on commercial sets, music videos, and branded content sharpened more than technique — they built an instinct. Jeff learned that great video isn't about expensive gear. It's about understanding what a brand needs to say, and finding the most powerful way to say it.",
        image: '/images/bts/full-production-set.jpg'
    },
    {
        title: 'The Toronto Scene',
        body: "Toronto's restaurant and nightlife scene became the proving ground. Owners who needed content that matched the energy of their spaces — dim-lit lounges, rooftop bars, chef's tables. Jeff became the go-to filmmaker for venues that refused to look ordinary.",
        image: '/images/bts/commercial-stage.jpg'
    },
    {
        title: 'Virtuo Video Today',
        body: "What started as one filmmaker's vision is now a full-service production studio on Dundas Street. The mission hasn't changed: create video that doesn't just look cinematic — it converts. Every project is personal. Every client becomes a collaborator.",
        image: '/images/about/studio.jpg'
    }
]);

// ─── Values ───

const values: StudioValue[] = z.array(studioValueSchema).parse([
    {
        title: 'Cinematic Quality',
        description:
            'Every frame is intentional. We bring the same production value to a 30-second reel that Hollywood brings to a feature film.',
        icon: 'Aperture',
        featured: true,
        image: '/images/bts/cinematographer-red.jpg'
    },
    {
        title: 'Story First',
        description:
            "Gear doesn't tell stories. People do. We start every project by understanding what your audience needs to feel.",
        icon: 'BookOpen',
        image: '/images/bts/full-production-set.jpg'
    },
    {
        title: 'Client Partnership',
        description:
            "Your vision guides every decision. We don't disappear into a black box — you're part of the process from concept to final cut.",
        icon: 'Handshake',
        image: '/images/bts/cooking-show-setup.jpg'
    },
    {
        title: 'Obsessive Detail',
        description:
            'From lighting temperature to color grade, from audio mix to export codec. The details your audience can feel but never see.',
        icon: 'ScanEye',
        image: '/images/bts/silhouette-setup.png'
    },
    {
        title: 'Toronto Rooted',
        description:
            'Born and raised in this city. We know its pulse, its people, its light at golden hour from the waterfront. This is home.',
        icon: 'MapPin',
        image: '/images/bts/commercial-stage.jpg'
    }
]);

// ─── Professional Equipment ───

const gear: GearItem[] = z.array(gearItemSchema).parse([
    {
        name: 'RED V-RAPTOR 8K VV',
        category: 'Camera',
        description:
            'Our flagship cinema camera. Global shutter, 8K resolution, and REDcode RAW deliver unmatched image quality for commercial and narrative work.',
        specs: '8K 120fps / Global Shutter / 16+ Stops DR',
        image: '/images/bts/cinematographer-red.jpg'
    },
    {
        name: 'Sony FX6',
        category: 'Camera',
        description:
            'Full-frame cinema line workhorse. Dual base ISO and exceptional autofocus make this our go-to for run-and-gun documentary and event coverage.',
        specs: '4K 120fps / Dual Base ISO / S-Cinetone',
        image: '/images/bts/steadicam-operator.jpg'
    },
    {
        name: 'Canon CN-E Cinema Primes',
        category: 'Lenses',
        description:
            'A matched set of cinema prime lenses from 14mm to 135mm. Consistent color science, smooth manual focus, and a cinematic character that zooms can never replicate.',
        specs: '14mm–135mm / T1.5–T3.1 / Super 35 & FF',
        image: '/images/bts/commercial-stage.jpg'
    },
    {
        name: 'Aputure 600d Pro',
        category: 'Lighting',
        description:
            'Daylight-balanced LED powerhouse. 600W output through a Bowens mount with silent cooling. Our key light for studio and location work.',
        specs: '600W / 5600K / Bowens Mount / Silent Mode',
        image: '/images/bts/silhouette-setup.png'
    },
    {
        name: 'Aputure MC Pro',
        category: 'Lighting',
        description:
            'Pocket-sized RGB LED panels. Perfect for accent lighting, practicals, and adding color to backgrounds. Wireless mesh control across the entire set.',
        specs: 'RGBWW / Wireless Mesh / IP65 / Magnetic',
        image: '/images/bts/cooking-show-setup.jpg'
    },
    {
        name: 'DJI Ronin 4D',
        category: 'Stabilization',
        description:
            'Full-frame cinema gimbal with built-in LiDAR focus. 4-axis stabilization and internal recording eliminate the need for a separate camera-gimbal-focus rig.',
        specs: '4-Axis / LiDAR AF / 6K ProRes / Wireless TX',
        image: '/images/bts/full-production-set.jpg'
    },
    {
        name: 'Sennheiser MKH 416',
        category: 'Audio',
        description:
            'The industry-standard shotgun microphone. Used on every professional film set in the world. Exceptional off-axis rejection and natural tonality.',
        specs: 'Shotgun / Super-Cardioid / Low Self-Noise',
        image: '/images/about/studio.jpg'
    },
    {
        name: 'DaVinci Resolve Studio',
        category: 'Post-Production',
        description:
            'Hollywood-grade color grading, editing, VFX, and audio post in one platform. We color grade every project to cinematic standards using calibrated reference monitors.',
        specs: 'HDR Grading / Neural Engine / Fairlight Audio',
        image: '/images/about/studio-wide.png'
    }
]);

// ─── Behind the Scenes ───

const bts: BTSItem[] = z.array(btsItemSchema).parse([
    {
        id: 'steadicam',
        title: 'Steadicam Operation',
        subtitle: 'Full cinema rig on a commercial shoot',
        label: 'On Set',
        src: '/images/bts/steadicam-operator.jpg'
    },
    {
        id: 'cinematographer',
        title: 'Night Shoot',
        subtitle: 'Cinema camera under dramatic red gel lighting',
        label: 'Cinematography',
        src: '/images/bts/cinematographer-red.jpg'
    },
    {
        id: 'silhouette',
        title: 'Lighting Setup',
        subtitle: 'Pre-production rigging on a darkened stage',
        label: 'Behind the Scenes',
        src: '/images/bts/silhouette-setup.png'
    },
    {
        id: 'full-set',
        title: 'Full Production',
        subtitle: 'Director, crew, and talent on a warehouse set',
        label: 'Production Day',
        src: '/images/bts/full-production-set.jpg'
    },
    {
        id: 'commercial',
        title: 'Commercial Stage',
        subtitle: 'Large-format automotive shoot with overhead lighting',
        label: 'Commercial',
        src: '/images/bts/commercial-stage.jpg'
    },
    {
        id: 'cooking',
        title: 'Content Studio',
        subtitle: 'Multi-camera food content production',
        label: 'Studio Work',
        src: '/images/bts/cooking-show-setup.jpg'
    }
]);

export const aboutContent = {
    story,
    values,
    gear,
    bts
};
