/**
 * @typedef {import('./data/translations.js').Translations} Translations
 */

/**
 * Übersetzt einen Schlüssel in einer bereits festgelegten Sprache.
 *
 * @callback Translator
 * @param {string} key - Der Übersetzungsschlüssel.
 * @param {Object.<string, (string|number)>} [values] - Werte für die Platzhalter.
 * @returns {string} Der übersetzte Text.
 */

/** Standardsprache, auf die zurückgefallen wird. */
export const DEFAULT_LANGUAGE = 'de';

/** Sprachen, für die es Übersetzungen gibt. */
export const SUPPORTED_LANGUAGES = ['de', 'en'];

/**
 * Übersetzt einen Schlüssel und ersetzt Platzhalter.
 * Reine Funktion ohne DOM-Zugriff.
 *
 * Reihenfolge:
 * 1. Schlüssel in der gewünschten Sprache,
 * 2. sonst in der Standardsprache (Fallback),
 * 3. sonst der Schlüssel selbst, damit fehlende Übersetzungen sofort auffallen.
 *
 * Fehlt ein Wert für einen Platzhalter, bleibt der Platzhalter
 * (z. B. "{title}") sichtbar stehen. So fällt auch dieser Fehler sofort auf.
 *
 * @param {Translations} translations - Das Wörterbuch.
 * @param {string} language - Die gewünschte Sprache, z. B. "en".
 * @param {string} key - Der Übersetzungsschlüssel.
 * @param {Object.<string, (string|number)>} [values] - Werte für die Platzhalter.
 * @returns {string} Der übersetzte Text.
 */
export function translate(translations, language, key, values = {}) {
    const text = translations[language]?.[key] ?? translations[DEFAULT_LANGUAGE]?.[key] ?? key;

    return text.replace(/\{(\w+)\}/g, (placeholder, name) => {
        return Object.hasOwn(values, name) ? String(values[name]) : placeholder;
    });
}

/**
 * Erzeugt eine Übersetzungsfunktion, die sich Wörterbuch und Sprache merkt.
 *
 * @param {Translations} translations - Das Wörterbuch.
 * @param {string} language - Die Sprache.
 * @returns {Translator} Funktion, die nur noch Schlüssel und Werte braucht.
 */
export function createTranslator(translations, language) {
    return (key, values) => translate(translations, language, key, values);
}