import {test, assertEquals, assertDeepEquals} from './runner.js';
import {
    filterProjectsByTag,
    formatResultCount,
    getAllTags,
    renderFilterButtons,
    tagFromButton,
    updatePressedState
} from '../js/filter.js';
import {createTranslator} from '../js/i18n.js';

/** Test-Übersetzungen, unabhängig von den echten Texten. */
const testTranslations = {
    de: {
        'filter.all': 'Alle',
        'results.one': '{count} Projekt angezeigt',
        'results.other': '{count} Projekte angezeigt'
    },
    en: {
        'filter.all': 'All',
        'results.one': '{count} project shown',
        'results.other': '{count} projects shown'
    }
};

const t = createTranslator(testTranslations, 'de');

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

/* Filter-Buttons */

test('renderFilterButtons: "Alle" plus ein Button pro Tag', () => {
    const container = document.createElement('div');
    renderFilterButtons(container, ['Kotlin', 'Swift'], null, t);
    const buttons = container.querySelectorAll('button');
    assertEquals(buttons.length, 3);
    assertEquals(buttons[0].textContent, 'Alle');
    assertEquals(buttons[0].getAttribute('aria-pressed'), 'true');
    assertEquals(tagFromButton(buttons[0]), null);
});

test('renderFilterButtons: alle Buttons haben type="button"', () => {
    const container = document.createElement('div');
    renderFilterButtons(container, ['Kotlin', 'Swift'], null, t);
    for (const button of container.querySelectorAll('button')) {
        assertEquals(button.getAttribute('type'), 'button');
    }
});

test('updatePressedState: nur der aktive Button ist gedrückt', () => {
    const container = document.createElement('div');
    renderFilterButtons(container, ['Kotlin', 'Swift'], null, t);
    updatePressedState(container, 'Swift');
    const pressed = [...container.querySelectorAll('button')].map((button) => button.getAttribute('aria-pressed'));
    assertDeepEquals(pressed, ['false', 'false', 'true']);
});

/* formatResultCount */

test('formatResultCount: 0 in der Mehrzahl', () => {
    assertEquals(formatResultCount(t, 'de', 0), '0 Projekte angezeigt');
});

test('formatResultCount: 1 in der Einzahl', () => {
    assertEquals(formatResultCount(t, 'de', 1), '1 Projekt angezeigt');
});

test('formatResultCount: 3 in der Mehrzahl', () => {
    assertEquals(formatResultCount(t, 'de', 3), '3 Projekte angezeigt');
});

test('formatResultCount: Englisch, 1 in der Einzahl', () => {
    const tEnglish = createTranslator(testTranslations, 'en');
    assertEquals(formatResultCount(tEnglish, 'en', 1), '1 project shown');
});