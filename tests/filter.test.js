import {test, assertDeepEquals} from './runner.js';
import {getAllTags} from '../js/filter.js';

/**
 * Erzeugt ein kleines Testprojekt, unabhängig von den echten Daten.
 *
 * @param {string} id - Kennung des Testprojekts.
 * @param {string[]} tags - Tags des Testprojekts.
 * @returns {import('../js/data/projects.js').Project} Ein Testprojekt.
 */
function makeProject(id, tags) {
    return {
        id,
        title: `Projekt ${id}`,
        description: 'Beschreibung',
        tags,
        year: 2026
    };
}

/* getAllTags */

test('getAllTags: Duplikate werden entfernt', () => {
    const input = [makeProject('a', ['Kotlin', 'Android']), makeProject('b', ['Android'])];
    assertDeepEquals(getAllTags(input), ['Android', 'Kotlin']);
});

test('getAllTags: Tags sind alphabetisch sortiert', () => {
    const input = [makeProject('a', ['Swift', 'Docker']), makeProject('b', ['CSS'])];
    assertDeepEquals(getAllTags(input), ['CSS', 'Docker', 'Swift']);
});

test('getAllTags: Gross- und Kleinschreibung wird beim Sortieren korrekt behandelt', () => {
    const input = [makeProject('a', ['Zebra', 'apfel'])];
    assertDeepEquals(getAllTags(input), ['apfel', 'Zebra']);
});

test('getAllTags: leeres Array ergibt leeres Array', () => {
    assertDeepEquals(getAllTags([]), []);
});