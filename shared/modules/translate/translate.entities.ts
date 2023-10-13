export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationWithHash {
  translation: Translation;
  hash: string;
}
