import { en, type Dict } from './en';
import { vi } from './vi';

const dictionaries: Record<string, Dict> = { en, vi };

export function getTranslations(locale: string): Dict {
  return dictionaries[locale] ?? dictionaries.vi;
}

export type { Dict };
