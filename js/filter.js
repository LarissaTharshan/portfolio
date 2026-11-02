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