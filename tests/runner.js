/**
 * Eigener, minimaler Test-Runner ohne externe Abhängigkeiten.
 */

/**
 * @typedef {Object} TestCase
 * @property {string} name - Beschreibung des Tests.
 * @property {Function} fn - Testfunktion. Wirft sie einen Fehler, ist der Test fehlgeschlagen.
 */

/** @type {TestCase[]} */
const tests = [];

/**
 * Registriert einen Test.
 *
 * @param {string} name - Beschreibung des Tests.
 * @param {Function} fn - Testfunktion.
 * @returns {void}
 */
export function test(name, fn) {
    tests.push({name, fn});
}

/**
 * Wandelt einen Wert in lesbaren Text für Fehlermeldungen um.
 *
 * @param {*} value - Ein beliebiger Wert.
 * @returns {string} Lesbare Darstellung des Werts.
 */
function format(value) {
    if (typeof value === 'string') {
        return `"${value}"`;
    }

    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }

    return String(value);
}

/**
 * Prüft, ob zwei Werte strikt gleich sind (===).
 *
 * @param {*} actual - Der tatsächliche Wert.
 * @param {*} expected - Der erwartete Wert.
 * @returns {void}
 * @throws {Error} Wenn die Werte nicht gleich sind.
 */
export function assertEquals(actual, expected) {
    if (actual !== expected) {
        throw new Error(`erwartet ${format(expected)}, erhalten ${format(actual)}`);
    }
}

/**
 * Vergleicht zwei Werte rekursiv: Arrays Element für Element,
 * Objekte Schlüssel für Schlüssel, unabhängig von der Schlüssel-Reihenfolge.
 *
 * @param {*} a - Erster Wert.
 * @param {*} b - Zweiter Wert.
 * @returns {boolean} true, wenn beide Werte inhaltlich gleich sind.
 */
function isDeepEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every((key) => Object.hasOwn(b, key) && isDeepEqual(a[key], b[key]));
}

/**
 * Prüft, ob zwei Arrays oder Objekte inhaltlich gleich sind.
 *
 * @param {*} actual - Der tatsächliche Wert.
 * @param {*} expected - Der erwartete Wert.
 * @returns {void}
 * @throws {Error} Wenn die Werte inhaltlich verschieden sind.
 */
export function assertDeepEquals(actual, expected) {
    if (!isDeepEqual(actual, expected)) {
        throw new Error(`erwartet ${format(expected)}, erhalten ${format(actual)}`);
    }
}