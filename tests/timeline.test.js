import {test, assertEquals, assertDeepEquals} from './runner.js';
import {createTimelineItem, formatPeriod, sortTimeline} from '../js/timeline.js';

/**
 * Erzeugt eine kleine Test-Station, unabhängig von den echten Daten.
 *
 * @param {string} id - Kennung der Test-Station.
 * @param {number} startYear - Startjahr.
 * @param {number} [endYear] - Endjahr.
 * @returns {import('../js/data/timeline.js').TimelineEntry} Eine Test-Station.
 */
function makeEntry(id, startYear, endYear) {
    return {
        id,
        title: `Station ${id}`,
        place: 'Ort',
        startYear,
        endYear,
        description: 'Beschreibung'
    };
}

/* formatPeriod */

test('formatPeriod: ohne Endjahr wird "seit" angezeigt', () => {
    assertEquals(formatPeriod(2024), 'seit 2024');
});

test('formatPeriod: Start- und Endjahr mit Gedankenstrich', () => {
    assertEquals(formatPeriod(2019, 2022), '2019 – 2022');
});

test('formatPeriod: gleiches Start- und Endjahr erscheint nur einmal', () => {
    assertEquals(formatPeriod(2023, 2023), '2023');
});

/* sortTimeline */

test('sortTimeline: neueste Station steht vorne', () => {
    const input = [makeEntry('a', 2020, 2023), makeEntry('b', 2024), makeEntry('c', 2023, 2024)];
    const result = sortTimeline(input);
    assertDeepEquals(result.map((entry) => entry.id), ['b', 'c', 'a']);
});

test('sortTimeline: ursprüngliches Array bleibt unverändert', () => {
    const input = [makeEntry('a', 2020, 2023), makeEntry('b', 2024)];
    sortTimeline(input);
    assertDeepEquals(input.map((entry) => entry.id), ['a', 'b']);
});

/* createTimelineItem */

test('createTimelineItem: Zeitraum wird formatiert angezeigt', () => {
    const item = createTimelineItem(makeEntry('a', 2024));
    assertEquals(item.querySelector('.timeline-date').textContent, 'seit 2024');
});

test('createTimelineItem: Titel und Ort stehen im Eintrag', () => {
    const item = createTimelineItem(makeEntry('a', 2020, 2023));
    assertEquals(item.querySelector('h3').textContent, 'Station a');
    assertEquals(item.querySelector('.timeline-place').textContent, 'Ort');
});