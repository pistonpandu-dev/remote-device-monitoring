export interface Translation {
  [key: string]: string | Translation;
}

export interface Locale {
  code: string;
  name: string;
  nativeName: string;
  translations: Translation;
}

export interface I18nConfig {
  defaultLocale: string;
  supportedLocales: Locale[];
  fallbackLocale: string;
  detection: {
    order: string[];
    cache: string[];
  };
}
