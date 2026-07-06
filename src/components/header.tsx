'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useDict } from '../lib/i18n/locale-context';
import { LanguageSwitcher } from './language-switcher';
import logo from '../assets/logo/logo.png';

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
            'fixed top-0 right-0 left-0 z-50 backdrop-blur-sm transition-colors',
            scrolled
              ? 'bg-slate-950/40 border-b border-white/10'
              : 'bg-slate-950/0 border-b border-transparent',
          )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <img src={logo.src} alt={dict.header.logo} className="h-[35px] w-auto md:h-[52px]" />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
