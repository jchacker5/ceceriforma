import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { en } from "../locales/en";
import { es } from "../locales/es";
import { pt } from "../locales/pt";

const translations = { en, pt, es };

interface LanguageContextValue {
  lang: keyof typeof translations;
  setLang: (lang: keyof typeof translations) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<keyof typeof translations>("en");
  const t = useMemo(() => translations[lang], [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useTranslation must be used within a LanguageProvider");
  return ctx;
}
