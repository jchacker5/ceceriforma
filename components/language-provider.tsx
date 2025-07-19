"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { en } from "@/locales/en";
import { es } from "@/locales/es";
import { pt } from "@/locales/pt";
import { 
  LanguageContextValue, 
  SupportedLanguage, 
  isValidLanguage,
  TranslationKeys
} from "@/types/translations";

const translations: Record<SupportedLanguage, TranslationKeys> = { en, pt, es };

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load saved language preference on mount with error handling
  React.useEffect(() => {
    const loadLanguagePreference = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const savedLang = localStorage.getItem("language");
        
        if (savedLang && isValidLanguage(savedLang)) {
          setLang(savedLang);
        } else if (savedLang) {
          // Invalid language in localStorage, clear it
          localStorage.removeItem("language");
          console.warn(`Invalid language preference "${savedLang}" removed from localStorage`);
        }
        
        // Try to detect browser language as fallback
        if (!savedLang && typeof navigator !== 'undefined') {
          const browserLang = navigator.language.slice(0, 2);
          if (isValidLanguage(browserLang)) {
            setLang(browserLang);
          }
        }
      } catch (err) {
        console.error('Error loading language preference:', err);
        setError('Failed to load language preference');
        // Fallback to English
        setLang('en');
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguagePreference();
  }, []);
  
  // Save language preference when changed with error handling
  const handleSetLang = useCallback((newLang: SupportedLanguage) => {
    try {
      if (!isValidLanguage(newLang)) {
        throw new Error(`Invalid language: ${newLang}`);
      }
      
      setLang(newLang);
      localStorage.setItem("language", newLang);
      setError(null);
    } catch (err) {
      console.error('Error setting language:', err);
      setError(`Failed to set language to ${newLang}`);
    }
  }, []);
  
  // Memoized translation object with fallback
  const t = useMemo(() => {
    try {
      return translations[lang] || translations.en;
    } catch (err) {
      console.error('Error loading translations:', err);
      return translations.en; // Always fallback to English
    }
  }, [lang]);
  
  const value = useMemo(() => ({ 
    lang, 
    setLang: handleSetLang, 
    t,
    isLoading,
    error
  }), [lang, handleSetLang, t, isLoading, error]);
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}