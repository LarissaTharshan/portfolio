/** Erlaubte Farbschemata. */
export const THEMES = ['light', 'dark'];

/**
 * Bestimmt das Farbschema.
 * Reine Funktion: Liest nicht selbst aus localStorage oder matchMedia,
 * sondern bekommt alle Werte als Parameter.
 *
 * Reihenfolge:
 * 1. gespeicherte Wahl, falls gültig,
 * 2. sonst die Systemeinstellung.
 *
 * @param {string|null} storedTheme - Gespeichertes Theme oder null.
 * @param {boolean} prefersDark - Ob das System ein dunkles Farbschema bevorzugt.
 * @returns {string} "light" oder "dark".
 */
export function resolveTheme(storedTheme, prefersDark) {
    if (storedTheme !== null && THEMES.includes(storedTheme)) {
        return storedTheme;
    }

    return prefersDark ? 'dark' : 'light';
}

/**
 * Gibt das jeweils andere Farbschema zurück.
 * Reine Funktion ohne DOM-Zugriff.
 *
 * @param {string} theme - Das aktuelle Theme.
 * @returns {string} "dark", wenn theme "light" ist, sonst "light".
 */
export function toggleTheme(theme) {
    return theme === 'dark' ? 'light' : 'dark';
}

/**
 * Setzt das gewählte Farbschema als data-theme-Attribut.
 * Das CSS reagiert auf [data-theme="dark"] und [data-theme="light"].
 *
 * @param {HTMLElement} root - In der Regel document.documentElement (<html>).
 * @param {string} theme - "light" oder "dark".
 * @returns {void}
 */
export function applyTheme(root, theme) {
    root.dataset.theme = theme;
}

/**
 * Aktualisiert den Umschalt-Button: gedrückt bedeutet "dunkler Modus an".
 *
 * @param {HTMLElement} button - Der Theme-Button.
 * @param {string} theme - Das aktive Theme.
 * @returns {void}
 */
export function updateThemeButton(button, theme) {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
}