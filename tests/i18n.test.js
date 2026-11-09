import {test, assertEquals} from './runner.js';
import {createTranslator, pluralKey, translate} from '../js/i18n.js';

/** Kleines Test-Wörterbuch, unabhängig von den echten Texten. */
const dictionary = {
    de: {
        greeting: 'Hallo',
        onlyGerman: 'Nur Deutsch',
        named: 'Hallo {name}',
        two: '{a} und {b}'
    },
    en: {
        greeting: 'Hello',
        named: 'Hello {name}',
        two: '{a} and {b}'
    }
};

/* translate */

test('translate: vorhandener Schlüssel in der gewünschten Sprache', () => {
    assertEquals(translate(dictionary, 'en', 'greeting'), 'Hello');
});

test('translate: fehlender Schlüssel fällt auf Deutsch zurück', () => {
    assertEquals(translate(dictionary, 'en', 'onlyGerman'), 'Nur Deutsch');
});

test('translate: unbekannter Schlüssel ergibt den Schlüssel selbst', () => {
    assertEquals(translate(dictionary, 'en', 'missing.key'), 'missing.key');
});

test('translate: unbekannte Sprache fällt auf Deutsch zurück', () => {
    assertEquals(translate(dictionary, 'fr', 'greeting'), 'Hallo');
});

test('translate: ein Platzhalter wird ersetzt', () => {
    assertEquals(translate(dictionary, 'de', 'named', {name: 'Larissa'}), 'Hallo Larissa');
});

test('translate: mehrere Platzhalter werden ersetzt', () => {
    assertEquals(translate(dictionary, 'en', 'two', {a: 'A', b: 'B'}), 'A and B');
});

test('translate: fehlender Wert lässt den Platzhalter stehen', () => {
    assertEquals(translate(dictionary, 'de', 'named'), 'Hallo {name}');
});

/* createTranslator */

test('createTranslator: merkt sich die Sprache', () => {
    const t = createTranslator(dictionary, 'en');
    assertEquals(t('greeting'), 'Hello');
    assertEquals(t('named', {name: 'Larissa'}), 'Hello Larissa');
});

/* pluralKey */

test('pluralKey: Deutsch, 1 ist Einzahl', () => {
    assertEquals(pluralKey('de', 'results', 1), 'results.one');
});

test('pluralKey: Deutsch, 0 ist Mehrzahl', () => {
    assertEquals(pluralKey('de', 'results', 0), 'results.other');
});

test('pluralKey: Deutsch, 3 ist Mehrzahl', () => {
    assertEquals(pluralKey('de', 'results', 3), 'results.other');
});

test('pluralKey: Englisch, 1 ist Einzahl', () => {
    assertEquals(pluralKey('en', 'results', 1), 'results.one');
});