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
        'page.title': 'Larissa Tharshan – Portfolio',
        'skip.link': 'Zum Inhalt springen',
        'nav.label': 'Hauptnavigation',
        'nav.about': 'Über mich',
        'nav.path': 'Werdegang',
        'nav.projects': 'Projekte',
        'nav.skills': 'Skills',
        'nav.contact': 'Kontakt',
        'language.label': 'Sprache',
        'theme.label': 'Dunkler Modus',
        'about.text': 'Informatikstudentin (iCompetence) an der FHNW. Platzhalter: Kurzvorstellung folgt.',
        'path.heading': 'Werdegang',
        'projects.heading': 'Projekte',
        'skills.heading': 'Skills',
        'contact.heading': 'Kontakt',
        'contact.email': 'E-Mail:',
        'filter.label': 'Projekte nach Technologie filtern',
        'filter.all': 'Alle',
        'project.repoLink': 'Zum Repository',
        'project.repoLabel': 'Zum Repository von {title}',
        'project.tags': 'Technologien',
        'period.since': 'seit {year}',
        'results.one': '{count} Projekt angezeigt',
        'results.other': '{count} Projekte angezeigt'
    },
    en: {
        'page.title': 'Larissa Tharshan – Portfolio',
        'skip.link': 'Skip to content',
        'nav.label': 'Main navigation',
        'nav.about': 'About me',
        'nav.path': 'Career',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'language.label': 'Language',
        'theme.label': 'Dark mode',
        'about.text': 'Computer science student (iCompetence) at FHNW. Placeholder: short introduction to follow.',
        'path.heading': 'Career',
        'projects.heading': 'Projects',
        'skills.heading': 'Skills',
        'contact.heading': 'Contact',
        'contact.email': 'Email:',
        'filter.label': 'Filter projects by technology',
        'filter.all': 'All',
        'project.repoLink': 'View repository',
        'project.repoLabel': 'View repository for {title}',
        'project.tags': 'Technologies',
        'period.since': 'since {year}',
        'results.one': '{count} project shown',
        'results.other': '{count} projects shown'
    }
};