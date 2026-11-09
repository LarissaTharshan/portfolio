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

/**
 * Wählt den Schlüssel für Einzahl oder Mehrzahl.
 * Verwendet die im Browser eingebaute API Intl.PluralRules.
 *
 * Unterstützt werden die Kategorien "one" und "other". Andere Kategorien
 * mancher Sprachen (z. B. "few") fallen auf "other" zurück.
 *
 * @param {string} language - Die Sprache, z. B. "de".
 * @param {string} baseKey - Der Grundschlüssel, z. B. "results".
 * @param {number} count - Die Anzahl.
 * @returns {string} Zum Beispiel "results.one" oder "results.other".
 */
export function pluralKey(language, baseKey, count) {
    const category = new Intl.PluralRules(language).select(count);

    return category === 'one' ? `${baseKey}.one` : `${baseKey}.other`;
}

/**
 * Bestimmt die Sprache der Seite.
 * Reine Funktion: Liest nicht selbst aus navigator oder localStorage,
 * sondern bekommt alle Werte als Parameter.
 *
 * Reihenfolge:
 * 1. gespeicherte Sprache, falls sie unterstützt wird,
 * 2. erste Browsersprache, deren Präfix unterstützt wird ("de-CH" → "de"),
 * 3. sonst die Standardsprache.
 *
 * @param {string|null} storedLanguage - Gespeicherte Sprache oder null.
 * @param {string[]} browserLanguages - Sprachen des Browsers, z. B. ["de-CH", "en"].
 * @param {string[]} supportedLanguages - Unterstützte Sprachen.
 * @returns {string} Die zu verwendende Sprache.
 */
export function detectLanguage(storedLanguage, browserLanguages, supportedLanguages) {
    if (storedLanguage !== null && supportedLanguages.includes(storedLanguage)) {
        return storedLanguage;
    }

    for (const browserLanguage of browserLanguages) {
        const prefix = browserLanguage.split('-')[0].toLowerCase();

        if (supportedLanguages.includes(prefix)) {
            return prefix;
        }
    }

    return DEFAULT_LANGUAGE;
}