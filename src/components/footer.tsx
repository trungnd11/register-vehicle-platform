'use client';

import { useDict } from '../lib/i18n/locale-context';

export function Footer() {
  const dict = useDict();

  return (
    <footer className="border-t border-white/10 bg-[#0f172a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <span className="text-lg font-semibold tracking-tight text-white">
              {dict.header.logo}
            </span>
            <p className="max-w-xs text-sm leading-6 text-white/60">
              {dict.footer.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/80">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{dict.footer.hotline}</li>
              <li>{dict.footer.email}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-white/40">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
