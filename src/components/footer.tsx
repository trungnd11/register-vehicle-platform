'use client';

import { useDict } from '../lib/i18n/locale-context';
import logo from '../assets/logo/logo.png';

export function Footer() {
  const dict = useDict();

  return (
    <footer className="border-t border-white/10 bg-[#0f172a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <img src={logo.src} alt={dict.header.logo} className="h-[35px] w-auto md:h-[52px]" />
            <p className="max-w-xs text-sm leading-6 text-white/50">
              {dict.footer.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-white/40">Liên hệ</h3>
            <a
              href="tel:0399668966"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-emerald-400">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.022 13.022 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              {dict.footer.hotline}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-white/30">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
