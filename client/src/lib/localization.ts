import { Language, LocalizedText } from '@/types';

export function getLocalizedField<T extends object & Partial<LocalizedText>, K extends keyof LocalizedText & string>(item: T, key: K, language: Language) {
  const localizedKey = `${key}_ar` as keyof T;
  const localizedValue = language === 'ar' ? item[localizedKey] : undefined;
  const defaultValue = item[key as keyof T];
  return (localizedValue ?? defaultValue ?? '') as string;
}

export function getLocalizedArray<T extends object>(item: T, key: string, language: Language) {
  const source = item as Record<string, unknown>;
  const localizedValue = language === 'ar' ? source[`${key}_ar`] : undefined;
  const defaultValue = source[key];
  return ((localizedValue as string[] | undefined) ?? (defaultValue as string[] | undefined) ?? []).filter(Boolean);
}
