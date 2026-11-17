import {test, assertEquals, assertDeepEquals} from './runner.js';
import {createProjectCard, sortProjectsByYear} from '../js/projects.js';
import {createTranslator} from '../js/i18n.js';

/** Test-Übersetzung, unabhängig von den echten Texten. */
const t = createTranslator({
    de: {
        'project.repoLink': 'Repo',
        'project.repoLabel': 'Repo von {title}',
        'project.tags': 'Tags'
    }
}, 'de');

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

/* sortProjectsByYear */

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

/* createProjectCard */

test('createProjectCard: Titel steht im h3', () => {
    const card = createProjectCard(makeProject('a', 2026), t, 'de');
    assertEquals(card.querySelector('h3').textContent, 'Projekt a');
});

test('createProjectCard: Beschreibung erscheint in der gewählten Sprache', () => {
    const project = makeProject('a', 2026, {description: {de: 'Beschreibung', en: 'Description'}});
    const card = createProjectCard(project, t, 'en');
    assertEquals(card.querySelector('p').textContent, 'Description');
});

test('createProjectCard: ohne repoUrl gibt es keinen Link', () => {
    const card = createProjectCard(makeProject('a', 2026), t, 'de');
    assertEquals(card.querySelector('a'), null);
});

test('createProjectCard: mit repoUrl gibt es genau einen Link', () => {
    const card = createProjectCard(makeProject('a', 2026, {repoUrl: 'https://example.com'}), t, 'de');
    const links = card.querySelectorAll('a');
    assertEquals(links.length, 1);
    assertEquals(links[0].getAttribute('href'), 'https://example.com');
    assertEquals(links[0].textContent, 'Repo');
});

test('createProjectCard: aria-label beginnt mit dem sichtbaren Linktext', () => {
    const card = createProjectCard(makeProject('a', 2026, {repoUrl: 'https://example.com'}), t, 'de');
    const link = card.querySelector('a');
    assertEquals(link.getAttribute('aria-label'), 'Repo von Projekt a');
    assertEquals(link.getAttribute('aria-label').startsWith(link.textContent), true);
});

test('createProjectCard: Tag-Liste hat ein übersetztes aria-label', () => {
    const card = createProjectCard(makeProject('a', 2026), t, 'de');
    assertEquals(card.querySelector('.tag-list').getAttribute('aria-label'), 'Tags');
});

test('createProjectCard: Anzahl der Tags stimmt', () => {
    const card = createProjectCard(makeProject('a', 2026, {tags: ['A', 'B', 'C']}), t, 'de');
    assertEquals(card.querySelectorAll('.tag').length, 3);
});

test('createProjectCard: HTML im Titel wird als Text angezeigt (XSS-Schutz)', () => {
    const htmlTitle = '<img src="x">';
    const card = createProjectCard(makeProject('a', 2026, {title: htmlTitle}), t, 'de');
    assertEquals(card.querySelector('img'), null);
    assertEquals(card.querySelector('h3').textContent, htmlTitle);
});