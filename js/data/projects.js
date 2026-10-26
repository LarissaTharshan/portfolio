/**
 * Ein Projekt, das im Portfolio als Karte angezeigt wird.
 *
 * @typedef {Object} Project
 * @property {string} id - Eindeutige Kennung in Kleinbuchstaben, z. B. "hikelog".
 * @property {string} title - Titel des Projekts.
 * @property {string} description - Kurzbeschreibung in ein bis zwei Sätzen.
 * @property {string[]} tags - Verwendete Technologien.
 * @property {number} year - Jahr, in dem das Projekt entstanden ist.
 * @property {string} [repoUrl] - Optionaler Link zum Repository.
 */

/** @type {Project[]} */
export const projects = [
    {
        id: 'portfolio',
        title: 'Portfolio-Website',
        description: 'Persönliche Portfolio-Seite mit reinem HTML, CSS und JavaScript, ohne Frameworks und mit eigenem Test-Runner.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: 2026,
        repoUrl: 'https://github.com/LarissaTharshan/portfolio'
    },
    {
        id: 'chatbot-microservices',
        title: 'Chatbot-Microservices',
        description: 'Teamprojekt: Microservices für Chatbots, betrieben auf Kubernetes und ausgeliefert per GitOps.',
        tags: ['Docker', 'Kubernetes', 'GitOps'],
        year: 2026
    },
    {
        id: 'finance-tracker',
        title: 'Personal Finance Tracker',
        description: 'iOS-App zur Übersicht über Einnahmen und Ausgaben.',
        tags: ['Swift', 'iOS'],
        year: 2026
    },
    {
        id: 'gender-gap-tech',
        title: 'Gender Gap in Tech',
        description: 'Teamprojekt: interaktive Datenstory mit D3 zur Frage, wo der Gender Gap in der Informatik beginnt.',
        tags: ['D3.js', 'JavaScript'],
        year: 2026
    },
    {
        id: 'hikelog',
        title: 'HikeLog',
        description: 'Teamprojekt: Android-App zum Finden von Schweizer Wanderungen nach Stimmung und Thema.',
        tags: ['Kotlin', 'Android'],
        year: 2026
    },
    {
        id: 'nutritrack',
        title: 'NutriTrack AI & Motion',
        description: 'Android-App, die Rezepte an das persönliche Proteinziel anpasst.',
        tags: ['Kotlin', 'Jetpack Compose', 'Android'],
        year: 2026,
        repoUrl: 'https://github.com/LarissaTharshan/NutriTrack-AI-Motion'
    }
];