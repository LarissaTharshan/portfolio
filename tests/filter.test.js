import {test, assertEquals, assertDeepEquals} from './runner.js';
import {filterProjectsByTag, getAllTags} from '../js/filter.js';

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

/**
 * Drei Testprojekte mit überlappenden Tags.
 *
 * @returns {import('../js/data/projects.js').Project[]} Testprojekte.
 */
function sampleProjects() {
    return [
        makeProject('a', ['Kotlin', 'Android']),
        makeProject('b', ['Swift']),
        makeProject('c', ['Kotlin'])
    ];
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

/* filterProjectsByTag */

test('filterProjectsByTag: null liefert alle Projekte', () => {
    const result = filterProjectsByTag(sampleProjects(), null);
    assertDeepEquals(result.map((project) => project.id), ['a', 'b', 'c']);
});

test('filterProjectsByTag: nur Projekte mit dem Tag', () => {
    const result = filterProjectsByTag(sampleProjects(), 'Kotlin');
    assertDeepEquals(result.map((project) => project.id), ['a', 'c']);
});

test('filterProjectsByTag: unbekannter Tag liefert leeres Array', () => {
    assertDeepEquals(filterProjectsByTag(sampleProjects(), 'Rust'), []);
});

test('filterProjectsByTag: ursprüngliches Array bleibt unverändert', () => {
    const input = sampleProjects();
    filterProjectsByTag(input, 'Swift');
    assertDeepEquals(input.map((project) => project.id), ['a', 'b', 'c']);
});

test('filterProjectsByTag: auch bei null kommt ein neues Array zurück', () => {
    const input = sampleProjects();
    assertEquals(filterProjectsByTag(input, null) === input, false);
});