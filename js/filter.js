/**
 * @typedef {import('./data/projects.js').Project} Project
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