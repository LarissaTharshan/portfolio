import {test, assertEquals} from './runner.js';
import {applyStaticTranslations} from '../js/i18n-dom.js';
import {createTranslator} from '../js/i18n.js';

/** Test-Übersetzung, unabhängig von den echten Texten. */
const t = createTranslator({
    de: {
        'test.text': 'Hallo',
        'test.label': 'Beschriftung'
    }
}, 'de');

/* applyStaticTranslations */

test('applyStaticTranslations: Text wird übersetzt', () => {
    const root = document.createElement('div');
    const span = document.createElement('span');
    span.dataset.i18n = 'test.text';
    span.textContent = 'alt';
    root.append(span);

    applyStaticTranslations(root, t);

    assertEquals(span.textContent, 'Hallo');
});

test('applyStaticTranslations: aria-label wird übersetzt', () => {
    const root = document.createElement('div');
    const nav = document.createElement('nav');
    nav.dataset.i18nAriaLabel = 'test.label';
    nav.setAttribute('aria-label', 'alt');
    root.append(nav);

    applyStaticTranslations(root, t);

    assertEquals(nav.getAttribute('aria-label'), 'Beschriftung');
});

test('applyStaticTranslations: Elemente ohne data-i18n bleiben unverändert', () => {
    const root = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = 'unverändert';
    root.append(span);

    applyStaticTranslations(root, t);

    assertEquals(span.textContent, 'unverändert');
});