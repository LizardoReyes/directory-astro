import es from './es';
import en from './en';
import pt from './pt';
import de from './de';
import fi from './fi';
import type { Translations } from './types';

export const LANGUAGES: Record<string, Translations> = {
    es,
    en,
    pt,
    de,
    fi,
};

export function getTranslations(lang: string): Translations {
    return LANGUAGES[lang] ?? LANGUAGES['es']; // fallback a español
}
