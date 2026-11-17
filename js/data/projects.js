/**
 * @typedef {import('../i18n.js').LocalizedText} LocalizedText
 */

/**
 * Ein Projekt, das im Portfolio als Karte angezeigt wird.
 *
 * @typedef {Object} Project
 * @property {string} id - Eindeutige Kennung in Kleinbuchstaben, z. B. "hikelog".
 * @property {LocalizedText} title - Titel, gleich in allen Sprachen oder pro Sprache.
 * @property {LocalizedText} description - Kurzbeschreibung in ein bis zwei Sätzen, pro Sprache.
 * @property {string[]} tags - Verwendete Technologien.
 * @property {number} year - Jahr, in dem das Projekt entstanden ist.
 * @property {string} [repoUrl] - Optionaler Link zum Repository.
 */

/** @type {Project[]} */
export const projects = [
    {
        id: 'portfolio',
        title: {
            de: 'Portfolio-Website',
            en: 'Portfolio website'
        },
        description: {
            de: 'Persönliche Portfolio-Seite mit reinem HTML, CSS und JavaScript, ohne Frameworks und mit eigenem Test-Runner.',
            en: 'Personal portfolio site built with plain HTML, CSS and JavaScript, without frameworks and with a custom test runner.'
        },
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: 2026,
        repoUrl: 'https://github.com/LarissaTharshan/portfolio'
    },
    {
        id: 'chatbot-microservices',
        title: 'Chatbot-Microservices',
        description: {
            de: 'Teamprojekt: Microservices für Chatbots, betrieben auf Kubernetes und ausgeliefert per GitOps.',
            en: 'Team project: microservices for chatbots, running on Kubernetes and deployed via GitOps.'
        },
        tags: ['Docker', 'Kubernetes', 'GitOps'],
        year: 2026
    },
    {
        id: 'finance-tracker',
        title: 'Personal Finance Tracker',
        description: {
            de: 'iOS-App zur Übersicht über Einnahmen und Ausgaben.',
            en: 'iOS app for keeping track of income and expenses.'
        },
        tags: ['Swift', 'iOS'],
        year: 2026
    },
    {
        id: 'gender-gap-tech',
        title: 'Gender Gap in Tech',
        description: {
            de: 'Teamprojekt: interaktive Datenstory mit D3 zur Frage, wo der Gender Gap in der Informatik beginnt.',
            en: 'Team project: interactive data story built with D3 exploring where the gender gap in computer science begins.'
        },
        tags: ['D3.js', 'JavaScript'],
        year: 2026
    },
    {
        id: 'hikelog',
        title: 'HikeLog',
        description: {
            de: 'Teamprojekt: Android-App zum Finden von Schweizer Wanderungen nach Stimmung und Thema.',
            en: 'Team project: Android app for finding Swiss hikes by mood and theme.'
        },
        tags: ['Kotlin', 'Android'],
        year: 2026
    },
    {
        id: 'nutritrack',
        title: 'NutriTrack AI & Motion',
        description: {
            de: 'Android-App, die Rezepte an das persönliche Proteinziel anpasst.',
            en: 'Android app that scales recipes to your personal protein goal.'
        },
        tags: ['Kotlin', 'Jetpack Compose', 'Android'],
        year: 2026,
        repoUrl: 'https://github.com/LarissaTharshan/NutriTrack-AI-Motion'
    }
];