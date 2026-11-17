import {projects} from './data/projects.js';
import {timeline} from './data/timeline.js';
import {translations} from './data/translations.js';
import {createTranslator, detectLanguage, SUPPORTED_LANGUAGES} from './i18n.js';
import {applyStaticTranslations, updateLanguageButtons} from './i18n-dom.js';
import {getStorage, readStoredLanguage, storeLanguage} from './storage.js';
import {renderProjects, sortProjectsByYear} from './projects.js';
import {renderTimeline, sortTimeline} from './timeline.js';
import {
    filterProjectsByTag,
    formatResultCount,
    getAllTags,
    renderFilterButtons,
    tagFromButton,
    updatePressedState
} from './filter.js';

/** Lokaler Speicher des Browsers oder null, falls blockiert. */
const storage = getStorage();

/**
 * Aktuelle Sprache der Seite.
 * Reihenfolge: gespeicherte Wahl, dann Browsersprache, dann Deutsch.
 *
 * @type {string}
 */
let language = detectLanguage(
    readStoredLanguage(storage),
    navigator.languages ?? [],
    SUPPORTED_LANGUAGES
);

/**
 * Übersetzungsfunktion für die aktuelle Sprache.
 *
 * @type {import('./i18n.js').Translator}
 */
let t = createTranslator(translations, language);

const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('project-filter');
const statusElement = document.getElementById('project-status');
const timelineContainer = document.getElementById('timeline-list');
const languageContainer = document.getElementById('language-switcher');

/**
 * Der aktuell aktive Filter. null bedeutet "Alle".
 * Bleibt beim Sprachwechsel erhalten.
 *
 * @type {string|null}
 */
let activeTag = null;

/**
 * Filtert, sortiert und rendert die Projekte passend zum aktiven Tag.
 *
 * @returns {number} Die Anzahl der angezeigten Projekte.
 */
function showProjects() {
    const visibleProjects = sortProjectsByYear(filterProjectsByTag(projects, activeTag));
    renderProjects(projectContainer, visibleProjects, t, language);

    return visibleProjects.length;
}

/**
 * Wendet eine Sprache auf die ganze Seite an.
 * Der aktive Filter bleibt dabei erhalten.
 *
 * @param {string} newLanguage - Die neue Sprache, z. B. "en".
 * @returns {void}
 */
function applyLanguage(newLanguage) {
    language = newLanguage;
    t = createTranslator(translations, language);

    document.documentElement.lang = language;
    document.title = t('page.title');
    applyStaticTranslations(document.body, t);

    if (projectContainer) {
        showProjects();
    }

    if (projectContainer && filterContainer) {
        renderFilterButtons(filterContainer, getAllTags(projects), activeTag, t);
    }

    if (timelineContainer) {
        renderTimeline(timelineContainer, sortTimeline(timeline), t, language);
    }

    if (languageContainer) {
        updateLanguageButtons(languageContainer, language);
    }
}

if (projectContainer && filterContainer) {
    filterContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-button');

        if (!button) {
            return;
        }

        activeTag = tagFromButton(button);
        const count = showProjects();
        updatePressedState(filterContainer, activeTag);

        if (statusElement) {
            statusElement.textContent = formatResultCount(t, language, count);
        }
    });
}

if (languageContainer) {
    languageContainer.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang]');

        if (!button || button.dataset.lang === language) {
            return;
        }

        applyLanguage(button.dataset.lang);
        storeLanguage(storage, language);
    });
}

applyLanguage(language);