// content/shared/process.ts — 6-step production process (FR23)
// Shared across all niches
import { type ProcessStep, processStepSchema } from '@/content/types';

import { z } from 'zod/v4';

const processSteps: ProcessStep[] = [
    {
        number: 1,
        title: 'Initial Consultation',
        description:
            'We learn your business, audience, and goals. No templates — every project starts with understanding your unique story.'
    },
    {
        number: 2,
        title: 'Concept Development',
        description: 'We create a visual concept aligned with your brand messaging and marketing objectives.'
    },
    {
        number: 3,
        title: 'Production',
        description:
            'Professional equipment and crew capture your business at its best — on location or in our downtown Toronto studio.'
    },
    {
        number: 4,
        title: 'Editing & Post',
        description:
            'Color grading, sound design, motion graphics. We polish every frame for multi-platform compatibility.'
    },
    {
        number: 5,
        title: 'Social Media Cuts',
        description: 'Your hero video gets cut into vertical reels, stories, and snippets optimized for every platform.'
    },
    {
        number: 6,
        title: 'Delivery & Launch',
        description:
            'Final files delivered on deadline. We can coordinate with your social media calendar for maximum impact.'
    }
];

// Build-time validation
export default z.array(processStepSchema).parse(processSteps);
