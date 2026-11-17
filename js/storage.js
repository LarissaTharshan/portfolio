/** Schlüssel, unter dem die Sprache im Speicher abgelegt wird. */
const STORAGE_KEY = 'portfolio.language';

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
 * Liest die gespeicherte Sprache.
 * Bei fehlendem Speicher oder einem Fehler kommt null zurück.
 *
 * @param {Storage|null} storage - Der Speicher, z. B. aus getStorage().
 * @returns {string|null} Die gespeicherte Sprache oder null.
 */
export function readStoredLanguage(storage) {
    try {
        return storage?.getItem(STORAGE_KEY) ?? null;
    } catch {
        return null;
    }
}

/**
 * Speichert die gewählte Sprache.
 * Bei fehlendem Speicher oder einem Fehler passiert nichts.
 * Die Seite funktioniert dann trotzdem, nur ohne gemerkte Sprache.
 *
 * @param {Storage|null} storage - Der Speicher, z. B. aus getStorage().
 * @param {string} language - Die zu speichernde Sprache.
 * @returns {void}
 */
export function storeLanguage(storage, language) {
    try {
        storage?.setItem(STORAGE_KEY, language);
    } catch {
        // Kein Speicher verfügbar: Die Seite läuft ohne gemerkte Sprache weiter.
    }
}