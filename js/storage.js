/** Schlüssel für die gewählte Sprache. */
export const LANGUAGE_KEY = 'portfolio.language';

/**
 * Schlüssel für das gewählte Farbschema.
 * Muss mit dem Schlüssel im kleinen Script im <head> von index.html übereinstimmen.
 */
export const THEME_KEY = 'portfolio.theme';

/**
 * Gibt den lokalen Speicher des Browsers zurück, falls er verfügbar ist.
 * Schon der Zugriff auf window.localStorage kann eine Exception werfen,
 * etwa wenn Cookies und Website-Daten blockiert sind.
 *
 * @returns {Storage|null} Der Speicher oder null, wenn er nicht verfügbar ist.
 */
export function getStorage() {
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

/**
 * Liest einen gespeicherten Wert.
 * Bei fehlendem Speicher oder einem Fehler kommt null zurück.
 *
 * @param {Storage|null} storage - Der Speicher, z. B. aus getStorage().
 * @param {string} key - Der Schlüssel, z. B. LANGUAGE_KEY.
 * @returns {string|null} Der gespeicherte Wert oder null.
 */
export function readStored(storage, key) {
    try {
        return storage?.getItem(key) ?? null;
    } catch {
        return null;
    }
}

/**
 * Speichert einen Wert.
 * Bei fehlendem Speicher oder einem Fehler passiert nichts.
 * Die Seite funktioniert dann trotzdem, nur ohne gemerkte Wahl.
 *
 * @param {Storage|null} storage - Der Speicher, z. B. aus getStorage().
 * @param {string} key - Der Schlüssel, z. B. LANGUAGE_KEY.
 * @param {string} value - Der zu speichernde Wert.
 * @returns {void}
 */
export function store(storage, key, value) {
    try {
        storage?.setItem(key, value);
    } catch {
        // Kein Speicher verfügbar: Die Seite läuft ohne gemerkte Wahl weiter.
    }
}