import {pluralKey} from './i18n.js';

/**
 * @typedef {import('./data/projects.js').Project} Project
 */

/**
 * @typedef {import('./i18n.js').Translator} Translator
 */

/**
 * Ermittelt alle Tags, die in den Projekten vorkommen.
 * Jeder Tag erscheint nur einmal, alphabetisch sortiert.
 * Reine Funktion ohne DOM-Zugriff.
 *
 * @param {Project[]} projects - Die Projekte.
 * @returns {string[]} Alle Tags ohne Duplikate, alphabetisch sortiert.
 */
export function getAllTags(projects) {
    const tags = new Set();

    for (const project of projects) {
        for (const tag of project.tags) {
            tags.add(tag);
        }
    }

    return [...tags].sort((a, b) => a.localeCompare(b, 'de'));
}

/**
 * Filtert Projekte nach einem Tag.
 * Reine Funktion: Das übergebene Array wird nicht verändert.
 *
 * @param {Project[]} projects - Die Projekte.
 * @param {string|null} tag - Der gesuchte Tag. Bei null kommen alle Projekte zurück.
 * @returns {Project[]} Ein neues Array mit den passenden Projekten.
 */
export function filterProjectsByTag(projects, tag) {
    if (tag === null) {
        return [...projects];
    }

    return projects.filter((project) => project.tags.includes(tag));
}

/**
 * Liest den Tag aus einem Filter-Button.
 * Der "Alle"-Button hat ein leeres data-tag und steht für null.
 *
 * @param {HTMLElement} button - Ein Filter-Button.
 * @returns {string|null} Der Tag oder null für "Alle".
 */
export function tagFromButton(button) {
    return button.dataset.tag === '' ? null : button.dataset.tag;
}

/**
 * Erstellt einen einzelnen Filter-Button.
 *
 * @param {string} label - Sichtbarer Text des Buttons.
 * @param {string|null} tag - Der Tag oder null für "Alle".
 * @param {boolean} isActive - Ob dieser Filter gerade aktiv ist.
 * @returns {HTMLButtonElement} Ein button-Element mit der Klasse "filter-button".
 */
export function createFilterButton(label, tag, isActive) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-button';
    button.textContent = label;
    button.dataset.tag = tag ?? '';
    button.setAttribute('aria-pressed', String(isActive));

    return button;
}

/**
 * Ersetzt den Inhalt eines Containers durch einen "Alle"-Button
 * und einen Button pro Tag.
 *
 * @param {HTMLElement} container - Das Element, in das die Buttons kommen.
 * @param {string[]} tags - Alle verfügbaren Tags.
 * @param {string|null} activeTag - Der aktive Tag oder null für "Alle".
 * @param {Translator} t - Übersetzungsfunktion.
 * @returns {void}
 */
export function renderFilterButtons(container, tags, activeTag, t) {
    const fragment = document.createDocumentFragment();

    fragment.append(createFilterButton(t('filter.all'), null, activeTag === null));

    for (const tag of tags) {
        fragment.append(createFilterButton(tag, tag, tag === activeTag));
    }

    container.replaceChildren(fragment);
}

/**
 * Setzt aria-pressed bei allen Filter-Buttons passend zum aktiven Tag.
 *
 * @param {HTMLElement} container - Der Container mit den Filter-Buttons.
 * @param {string|null} activeTag - Der aktive Tag oder null für "Alle".
 * @returns {void}
 */
export function updatePressedState(container, activeTag) {
    for (const button of container.querySelectorAll('.filter-button')) {
        button.setAttribute('aria-pressed', String(tagFromButton(button) === activeTag));
    }
}

/**
 * Erzeugt den übersetzten Ansagetext für die Anzahl angezeigter Projekte,
 * mit korrekter Einzahl und Mehrzahl der jeweiligen Sprache.
 * Reine Funktion ohne DOM-Zugriff.
 *
 * @param {Translator} t - Übersetzungsfunktion.
 * @param {string} language - Die Sprache, z. B. "de".
 * @param {number} count - Anzahl der angezeigten Projekte.
 * @returns {string} Zum Beispiel "1 Projekt angezeigt" oder "3 Projekte angezeigt".
 */
export function formatResultCount(t, language, count) {
    return t(pluralKey(language, 'results', count), {count});
}