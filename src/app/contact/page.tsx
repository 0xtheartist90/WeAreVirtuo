import { AgencyContact } from '@/components/sections/agency/agency-contact';
import { AgencyFooter } from '@/components/sections/agency/agency-footer';
import { AgencyResults } from '@/components/sections/agency/agency-results';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
    title: 'Contact — Let’s Work Together',
    description: 'Book a free strategy call with Virtuo. Canadian digital marketing, web development, and virtual tours.'
};

export default function ContactPage() {
    return (
        <>
            <PageHeader
                index='03'
                label='Contact'
                title="Let's Talk"
                intro='Tell us where your business is missing visibility — we’ll show you how to capture it.'
                meta='Toronto HQ'
            />

            <AgencyContact />

            <AgencyResults />

            <AgencyFooter />
        </>
    );
}
