import { Translation } from '@translate/translate.entities';

export interface TranslateEntry {
  group: string;
  language: string;
  hash: string;
  translation: Translation;
}