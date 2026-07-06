'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useDict } from '../lib/i18n/locale-context';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const dict = useDict();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 transition',
        scrolled
          ? 'bg-slate-950/40 backdrop-blur-sm border-b border-white/10'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-xl font-semibold tracking-tight text-white">
          {dict.header.logo}
        </span>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
