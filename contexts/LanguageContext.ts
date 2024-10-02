import { createContext } from 'react';

type LanguageContextType = {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});
