/**
 * Texte einer Sprache: Schlüssel → Text.
 * Platzhalter stehen in geschweiften Klammern, z. B. "{title}".
 *
 * @typedef {Object.<string, string>} Dictionary
 */

/**
 * Alle Sprachen: Sprachcode → Texte.
 *
 * @typedef {Object.<string, Dictionary>} Translations
 */

/** @type {Translations} */
export const translations = {
    de: {
        'filter.all': 'Alle',
        'project.repoLink': 'Zum Repository',
        'project.repoLabel': 'Zum Repository von {title}',
        'project.tags': 'Technologien',
        'period.since': 'seit {year}',
        'results.one': '{count} Projekt angezeigt',
        'results.other': '{count} Projekte angezeigt'
    },
    en: {
        'filter.all': 'All',
        'project.repoLink': 'View repository',
        'project.repoLabel': 'View repository of {title}',
        'project.tags': 'Technologies',
        'period.since': 'since {year}',
        'results.one': '{count} project shown',
        'results.other': '{count} projects shown'
    }
};