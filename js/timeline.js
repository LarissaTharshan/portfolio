/**
 * @typedef {import('./data/timeline.js').TimelineEntry} TimelineEntry
 */

/**
 * Formatiert einen Zeitraum für die Anzeige.
 * Reine Funktion ohne DOM-Zugriff.
 *
 * @param {number} startYear - Startjahr.
 * @param {number} [endYear] - Endjahr. Fehlt es, läuft die Station noch.
 */
export function formatPeriod(startYear, endYear) {
    if (endYear === undefined) {
        return `seit ${startYear}`;
    }

    if (startYear === endYear) {
        return String(startYear);
    }

    return `${startYear} – ${endYear}`;
}

/**
 * Sortiert Stationen nach Startjahr, die neueste zuerst.
 * Reine Funktion: Das übergebene Array wird nicht verändert.
 *
 * @param {TimelineEntry[]} entries - Die zu sortierenden Stationen.
 * @returns {TimelineEntry[]} Ein neues, sortiertes Array.
 */
export function sortTimeline(entries) {
    return [...entries].sort((a, b) => b.startYear - a.startYear);
}

/**
 * Erstellt den Listeneintrag für eine Station.
 * Alle Texte werden über textContent gesetzt, nie über innerHTML.
 *
 * @param {TimelineEntry} entry - Die Station, die dargestellt wird.
 * @returns {HTMLLIElement} Ein li-Element mit der Klasse "timeline-item".
 */
export function createTimelineItem(entry) {
    const item = document.createElement('li');
    item.className = 'timeline-item';

    const date = document.createElement('p');
    date.className = 'timeline-date';
    date.textContent = formatPeriod(entry.startYear, entry.endYear);
    item.append(date);

    const content = document.createElement('div');
    content.className = 'timeline-content';

    const title = document.createElement('h3');
    title.textContent = entry.title;
    content.append(title);

    const place = document.createElement('p');
    place.className = 'timeline-place';
    place.textContent = entry.place;
    content.append(place);

    const description = document.createElement('p');
    description.textContent = entry.description;
    content.append(description);

    item.append(content);

    return item;
}

/**
 * Ersetzt den Inhalt eines Containers durch Einträge für alle Stationen.
 *
 * @param {HTMLElement} container - Das Element, in das die Einträge kommen.
 * @param {TimelineEntry[]} entries - Die Stationen in der gewünschten Reihenfolge.
 * @returns {void}
 */
export function renderTimeline(container, entries) {
    const fragment = document.createDocumentFragment();

    for (const entry of entries) {
        fragment.append(createTimelineItem(entry));
    }

    container.replaceChildren(fragment);
}