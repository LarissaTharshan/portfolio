/**
 * @typedef {import('./i18n.js').Translator} Translator
 */

/**
 * Übersetzt alle statischen Texte im HTML.
 *
 * - Elemente mit data-i18n="schlüssel" bekommen den übersetzten Text.
 * - Elemente mit data-i18n-aria-label="schlüssel" bekommen ein übersetztes aria-label.
 *
 * Die deutschen Texte stehen zusätzlich direkt im HTML. So ist die Seite
 * auch ohne JavaScript lesbar, und Suchmaschinen sehen den Inhalt.
 *
 * @param {ParentNode} root - Bereich, in dem gesucht wird, z. B. document.body.
 * @param {Translator} t - Übersetzungsfunktion.
 * @returns {void}
 */
export function applyStaticTranslations(root, t) {
    for (const element of root.querySelectorAll('[data-i18n]')) {
        element.textContent = t(element.dataset.i18n);
    }

    for (const element of root.querySelectorAll('[data-i18n-aria-label]')) {
        element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    }
}

/**
 * Setzt aria-pressed bei allen Sprach-Buttons passend zur aktiven Sprache.
 *
 * @param {ParentNode} container - Der Container mit den Sprach-Buttons.
 * @param {string} language - Die aktive Sprache, z. B. "en".
 * @returns {void}
 */
export function updateLanguageButtons(container, language) {
    for (const button of container.querySelectorAll('[data-lang]')) {
        button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    }
}