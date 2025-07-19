import { en } from "@/locales/en";

export type TranslationKeys = typeof en;
export type SupportedLanguage = 'en' | 'pt' | 'es';
export type TranslationNamespace = keyof TranslationKeys;

// Type-safe translation hook interface
export interface LanguageContextValue {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: TranslationKeys;
  isLoading: boolean;
  error: string | null;
}

// Validation function for language codes
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return ['en', 'pt', 'es'].includes(lang);
}

// Type-safe navigation keys
export type NavigationKey = keyof TranslationKeys['navigation'];
export type FooterKey = keyof TranslationKeys['footer'];
export type HomeKey = keyof TranslationKeys['home'];
export type AboutKey = keyof TranslationKeys['about'];