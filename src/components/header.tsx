'use client';

import { useDict } from '../lib/i18n/locale-context';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const dict = useDict();

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-xl font-semibold tracking-tight text-white">
          {dict.header.logo}
        </span>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
