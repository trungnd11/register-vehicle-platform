import { LocaleProvider } from '../../lib/i18n/locale-context';
import { getTranslations } from '../../lib/i18n';
import { Header } from '../../components/header';
import type { ReactNode } from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getTranslations(locale);

  return (
    <LocaleProvider dict={dict} locale={locale}>
      <Header />
      {children}
    </LocaleProvider>
  );
}
