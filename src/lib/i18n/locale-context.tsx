'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Dict } from './en';

type LocaleContextValue = {
  dict: Dict;
  locale: string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  dict,
  locale,
  children,
}: {
  dict: Dict;
  locale: string;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ dict, locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useDict(): Dict {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useDict must be used within LocaleProvider');
  return ctx.dict;
}

export function useLocale(): string {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx.locale;
}
