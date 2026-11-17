/**
 * @typedef {import('../i18n.js').LocalizedText} LocalizedText
 */

/**
 * Eine Station im Werdegang.
 *
 * @typedef {Object} TimelineEntry
 * @property {string} id - Eindeutige Kennung in Kleinbuchstaben.
 * @property {LocalizedText} title - Bezeichnung der Station, pro Sprache.
 * @property {string} place - Ort, Firma oder Schule.
 * @property {number} startYear - Jahr, in dem die Station begann.
 * @property {number} [endYear] - Jahr, in dem sie endete. Fehlt, wenn sie noch läuft.
 * @property {LocalizedText} description - Kurzbeschreibung in ein bis zwei Sätzen, pro Sprache.
 */

/** @type {TimelineEntry[]} */
export const timeline = [
    {
        id: 'kv-lehre',
        title: {
            de: 'KV-Lehre',
            en: 'Commercial apprenticeship'
        },
        place: 'UBS',
        startYear: 2019,
        endYear: 2022,
        description: {
            de: 'Kaufmännische Grundbildung.',
            en: 'Commercial vocational training.'
        }
    },
    {
        id: 'berufserfahrung',
        title: {
            de: 'Berufserfahrung',
            en: 'Work experience'
        },
        place: 'UBS Switzerland AG',
        startYear: 2022,
        endYear: 2023,
        description: {
            de: 'Ein Jahr Vollzeit im Beruf vor dem Studium.',
            en: 'One year of full-time work before university.'
        }
    },
    {
        id: 'studium',
        title: {
            de: 'Studium Informatik (iCompetence)',
            en: 'Computer Science studies (iCompetence)'
        },
        place: 'FHNW',
        startYear: 2024,
        description: {
            de: 'Bachelorstudium, Abschluss voraussichtlich 2027.',
            en: "Bachelor's degree, expected to graduate in 2027."
        }
    }
];