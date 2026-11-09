/**
 * Eine Station im Werdegang.
 *
 * @typedef {Object} TimelineEntry
 * @property {string} id - Eindeutige Kennung in Kleinbuchstaben.
 * @property {string} title - Bezeichnung der Station.
 * @property {string} place - Ort, Firma oder Schule.
 * @property {number} startYear - Jahr, in dem die Station begann.
 * @property {number} [endYear] - Jahr, in dem sie endete. Fehlt, wenn sie noch läuft.
 * @property {string} description - Kurzbeschreibung in ein bis zwei Sätzen.
 */

/** @type {TimelineEntry[]} */
export const timeline = [
    {
        id: 'kv-lehre',
        title: 'KV-Lehre',
        place: 'UBS',
        startYear: 2019,
        endYear: 2022,
        description: 'Kaufmännische Grundbildung.'
    },
    {
        id: 'berufserfahrung',
        title: 'Berufserfahrung',
        place: 'UBS Switzerland AG',
        startYear: 2022,
        endYear: 2023,
        description: 'Ein Jahr Vollzeit im Beruf vor dem Studium.'
    },
    {
        id: 'studium',
        title: 'Studium Informatik (iCompetence)',
        place: 'FHNW',
        startYear: 2024,
        description: 'Bachelorstudium, Abschluss voraussichtlich 2027.'
    }
];