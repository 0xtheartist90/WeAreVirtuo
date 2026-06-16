'use client';

import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-accent/30',
        className
      )}
    >
      {header}
      <div className='transition duration-200'>
        {icon}
        <h3 className='mb-2 mt-2 text-lg font-semibold text-foreground'>
          {title}
        </h3>
        <p className='text-sm leading-relaxed text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}
