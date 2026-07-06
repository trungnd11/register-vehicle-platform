'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '../lib/i18n/locale-context';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'vi' ? 'en' : 'vi';

  function switchLocale() {
    const nextPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    router.push(nextPath);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="font-medium uppercase">{nextLocale}</span>
    </button>
  );
}
