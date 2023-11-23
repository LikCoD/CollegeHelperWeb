export interface Locale {
  code: string;
}

export interface Translation {
  [key: string]: Translation | string | number;
}

export interface RawTranslation {
  [key: string]: RawTranslationEntry;
}

export interface RawTranslationEntry {
  value: string | number;
  isHash: boolean;
}

export interface TranslationEntry {
  locale: Locale;
  group: string;
  translation: Translation;
}

export interface TranslationParams {
  [key: string]: string | number;
}

export interface TranslateObject {
  key: string;
  group: string[] | null;
  onNotFound?: (group: TranslateObject) => string | number;
}
