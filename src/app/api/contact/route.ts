// API Route — Form submission endpoint (FR10)
// POST /api/contact → validate → email via Resend → optional webhook
import { NextResponse } from 'next/server';

import { z } from 'zod/v4';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Valid email required'),
    phone: z.string().min(7, 'Valid phone required'),
    company: z.string().optional().default(''),
    message: z.string().optional().default(''),
    // UTM fields
    utm_source: z.string().optional().default(''),
    utm_medium: z.string().optional().default(''),
    utm_campaign: z.string().optional().default(''),
    utm_term: z.string().optional().default(''),
    utm_content: z.string().optional().default(''),
    landing_page: z.string().optional().default('')
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = contactSchema.parse(body);

        // TODO: Email delivery via Resend (Epic 4, Story 4.4)
        // TODO: Optional webhook (Architecture Decision 2)

        console.log('[Contact Form]', data);

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }

        return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
    }
}
