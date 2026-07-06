# Header with i18n — Design Spec

## Overview

Add a header with a text logo "Xanh SM" and a language switcher (EN/VI) to the landing page. Language switching affects the entire page content using Next.js `[locale]` route groups.

## Approach: Next.js `[locale]` Route Group

- Routes: `/vi` (default), `/en`
- Root `page.tsx` redirects `/` → `/vi`
- Root `layout.tsx` reads locale from cookie for `<html lang>`
- Language switcher uses `next/navigation` `useRouter` + `usePathname` to navigate between locales

## Architecture

```
src/
  app/
    [locale]/
      layout.tsx          — reads locale, sets html lang, provides dict
      page.tsx            — landing page (uses translations)
    layout.tsx            — root layout (html shell, cookie-based lang)
    page.tsx              — redirect / → /vi

  components/
    header.tsx            — logo + language-switcher
    language-switcher.tsx — button with globe icon, locale toggle

  lib/i18n/
    en.ts                 — English dictionary
    vi.ts                 — Vietnamese dictionary
    index.ts              — getTranslations(locale) + TranslationKeys type
```

## Data Flow

1. User visits `/vi` or `/en`
2. `[locale]/layout.tsx` calls `getTranslations(locale)`, passes dict to children via prop
3. Header renders logo text + language switcher button
4. Language switcher navigates to corresponding locale path, sets cookie for root layout
5. Root `layout.tsx` reads cookie to set `<html lang={locale}>`

## Dictionary Structure

```ts
interface Dict {
  header: {
    logo: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
  };
}
```

## Header Design

- Transparent background, fixed top
- Max-width container (same as page), flex justify-between
- Left: text "Xanh SM" (font-semibold, text-white)
- Right: globe icon + "EN" / "VI" text button
- z-50, backdrop-blur on scroll (optional enhancement)

## Language Switcher

- Single button showing current locale
- Clicking toggles to the other locale
- Uses `usePathname()` to preserve current path, replaces locale prefix
- No external icon library — use SVG inline globe icon
