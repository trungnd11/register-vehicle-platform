import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

type InputProps = ComponentPropsWithoutRef<'input'>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-2xl border border-white/15 bg-white/10',
        'px-4 py-3 text-white outline-none transition',
        'placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14',
        className,
      )}
      {...props}
    />
  );
}
