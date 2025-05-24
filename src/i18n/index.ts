import { languages } from './languages';
import type { Translations } from './types';

export function getTranslations(lang: string): Translations {
    return languages[lang] || languages['en'];
}
