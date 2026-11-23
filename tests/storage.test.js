import {test, assertEquals} from './runner.js';
import {LANGUAGE_KEY, readStored, store, THEME_KEY} from '../js/storage.js';

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

test('readStored: ohne gespeicherten Wert kommt null zurück', () => {
    assertEquals(readStored(fakeStorage(), LANGUAGE_KEY), null);
});

test('store und readStored: gespeicherter Wert wird gelesen', () => {
    const storage = fakeStorage();
    store(storage, LANGUAGE_KEY, 'en');
    assertEquals(readStored(storage, LANGUAGE_KEY), 'en');
});

test('store und readStored: verschiedene Schlüssel stören sich nicht', () => {
    const storage = fakeStorage();
    store(storage, LANGUAGE_KEY, 'en');
    store(storage, THEME_KEY, 'dark');
    assertEquals(readStored(storage, LANGUAGE_KEY), 'en');
    assertEquals(readStored(storage, THEME_KEY), 'dark');
});

test('readStored: Fehler beim Lesen ergibt null', () => {
    assertEquals(readStored(brokenStorage, LANGUAGE_KEY), null);
});

test('store: Fehler beim Schreiben wird abgefangen', () => {
    store(brokenStorage, LANGUAGE_KEY, 'en');
    // Würde store den Fehler weiterwerfen, wäre dieser Test rot.
    assertEquals(true, true);
});

test('readStored: ohne Speicher (null) kommt null zurück', () => {
    assertEquals(readStored(null, LANGUAGE_KEY), null);
});