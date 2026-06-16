import { ArrowUpRight, Asterisk } from 'lucide-react';

/* Light editorial statement — a white break in the black, BRUTAL-style. */
export function AgencyStatement() {
    return (
        <section className='bg-white text-neutral-900'>
            <div className='grid-layout py-16 md:py-24'>
                {/* Top rule */}
                <div className='col-span-full mb-10 flex items-center justify-between border-b border-neutral-300 pb-4 font-mono text-[11px] tracking-widest text-neutral-500 uppercase lg:col-start-2 lg:col-end-12'>
                    <span>[ The Virtuo Promise ]</span>
                    <ArrowUpRight className='h-5 w-5 text-neutral-900' strokeWidth={1.75} />
                </div>

                {/* Huge statement */}
                <h2 className='col-span-full font-display text-5xl leading-[0.9] tracking-tight text-neutral-900 uppercase md:text-8xl lg:col-start-2 lg:col-end-12'>
                    You Run Your Business.
                    <br />
                    <span className='text-accent'>Virtuo Runs</span> Your Marketing.
                </h2>

                {/* Footnote row */}
                <div className='col-span-full mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 md:flex-row md:items-start md:justify-between lg:col-start-2 lg:col-end-12'>
                    <div className='flex items-start gap-3'>
                        <Asterisk className='text-accent h-5 w-5 shrink-0' />
                        <p className='max-w-xl text-sm leading-relaxed text-neutral-600'>
                            Account setup, ad management, tracking, landing pages, analytics, and conversion
                            optimization — handled end to end, so you can focus on the work that only you can do.
                        </p>
                    </div>
                    <span className='font-mono text-sm whitespace-nowrap text-neutral-500'>A&nbsp;to&nbsp;Z</span>
                </div>
            </div>
        </section>
    );
}
