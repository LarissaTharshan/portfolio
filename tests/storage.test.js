import {test, assertEquals} from './runner.js';
import {readStoredLanguage, storeLanguage} from '../js/storage.js';

/**
 * Ein einfacher Speicher, der sich wie localStorage verhält.
 *
 * @returns {{getItem: function(string): (string|null), setItem: function(string, string): void}} Test-Speicher.
 */
function fakeStorage() {
    const data = new Map();

    return {
        getItem: (key) => (data.has(key) ? data.get(key) : null),
        setItem: (key, value) => {
            data.set(key, String(value));
        }
    };
}

/** Ein Speicher, der bei jedem Zugriff einen Fehler wirft. */
const brokenStorage = {
    getItem() {
        throw new Error('Speicher blockiert');
    },
    setItem() {
        throw new Error('Speicher blockiert');
    }
};

test('readStoredLanguage: ohne gespeicherten Wert kommt null zurück', () => {
    assertEquals(readStoredLanguage(fakeStorage()), null);
});

test('storeLanguage und readStoredLanguage: gespeicherter Wert wird gelesen', () => {
    const storage = fakeStorage();
    storeLanguage(storage, 'en');
    assertEquals(readStoredLanguage(storage), 'en');
});

test('readStoredLanguage: Fehler beim Lesen ergibt null', () => {
    assertEquals(readStoredLanguage(brokenStorage), null);
});

test('storeLanguage: Fehler beim Schreiben wird abgefangen', () => {
    storeLanguage(brokenStorage, 'en');
    // Würde storeLanguage den Fehler weiterwerfen, wäre dieser Test rot.
    assertEquals(true, true);
});

test('readStoredLanguage: ohne Speicher (null) kommt null zurück', () => {
    assertEquals(readStoredLanguage(null), null);
});