import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        'w-full resize-y rounded-2xl border border-white/15 bg-white/10',
        'px-4 py-3 text-white outline-none transition',
        'placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14',
        className,
      )}
      {...props}
    />
  );
}
