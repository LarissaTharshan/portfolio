import {test, assertEquals, assertDeepEquals} from './runner.js';
import {sortProjectsByYear} from '../js/projects.js';

/**
 * Erzeugt ein kleines Testprojekt, unabhängig von den echten Daten.
 *
 * @param {string} id - Kennung des Testprojekts.
 * @param {number} year - Jahr des Testprojekts.
 * @param {Object} [extra] - Zusätzliche oder überschriebene Felder.
 * @returns {import('../js/data/projects.js').Project} Ein Testprojekt.
 */
function makeProject(id, year, extra = {}) {
    return {
        id,
        title: `Projekt ${id}`,
        description: 'Beschreibung',
        tags: [],
        year,
        ...extra
    };
}

test('sortProjectsByYear: neuestes Projekt steht vorne', () => {
    const input = [makeProject('a', 2024), makeProject('b', 2026), makeProject('c', 2025)];
    const result = sortProjectsByYear(input);
    assertDeepEquals(result.map((project) => project.id), ['b', 'c', 'a']);
});

test('sortProjectsByYear: ursprüngliches Array bleibt unverändert', () => {
    const input = [makeProject('a', 2024), makeProject('b', 2026), makeProject('c', 2025)];
    sortProjectsByYear(input);
    assertDeepEquals(input.map((project) => project.id), ['a', 'b', 'c']);
});

test('sortProjectsByYear: gibt ein neues Array zurück', () => {
    const input = [makeProject('a', 2024)];
    assertEquals(sortProjectsByYear(input) === input, false);
});

test('sortProjectsByYear: leeres Array ergibt leeres Array', () => {
    assertDeepEquals(sortProjectsByYear([]), []);
});

test('sortProjectsByYear: bei gleichem Jahr bleibt die Reihenfolge erhalten', () => {
    const input = [makeProject('a', 2026), makeProject('b', 2026), makeProject('c', 2026)];
    const result = sortProjectsByYear(input);
    assertDeepEquals(result.map((project) => project.id), ['a', 'b', 'c']);
});