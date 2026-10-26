import {test, assertEquals, assertDeepEquals} from './runner.js';

/**
 * Prüft, ob eine Funktion einen Fehler wirft.
 *
 * @param {Function} fn - Die auszuführende Funktion.
 * @returns {boolean} true, wenn ein Fehler geworfen wurde.
 */
function throws(fn) {
    try {
        fn();
    } catch {
        return true;
    }

    return false;
}

test('assertEquals: gleiche Werte bestehen', () => {
    assertEquals(throws(() => assertEquals(2, 2)), false);
});

test('assertEquals: verschiedene Werte werfen einen Fehler', () => {
    assertEquals(throws(() => assertEquals(2, 3)), true);
});

test('assertDeepEquals: Arrays mit gleichem Inhalt sind gleich', () => {
    assertDeepEquals([1, 2, 3], [1, 2, 3]);
});

test('assertDeepEquals: andere Reihenfolge im Array ist ungleich', () => {
    assertEquals(throws(() => assertDeepEquals([1, 2], [2, 1])), true);
});

test('assertDeepEquals: Schlüssel-Reihenfolge bei Objekten spielt keine Rolle', () => {
    assertDeepEquals({a: 1, b: 2}, {b: 2, a: 1});
});

test('assertDeepEquals: fehlender Schlüssel ist nicht gleich wie undefined', () => {
    assertEquals(throws(() => assertDeepEquals({a: undefined}, {})), true);
});