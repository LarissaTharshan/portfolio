import {projects} from './data/projects.js';
import {timeline} from './data/timeline.js';
import {translations} from './data/translations.js';
import {createTranslator, DEFAULT_LANGUAGE} from './i18n.js';
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

/**
 * Aktuelle Sprache der Seite.
 * Bis der Sprachumschalter eingebaut ist, immer die Standardsprache.
 *
 * @type {string}
 */
const language = DEFAULT_LANGUAGE;

/** Übersetzungsfunktion für die aktuelle Sprache. */
const t = createTranslator(translations, language);

const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('project-filter');
const statusElement = document.getElementById('project-status');

/**
 * Der aktuell aktive Filter. null bedeutet "Alle".
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
    renderProjects(projectContainer, visibleProjects, t);

    return visibleProjects.length;
}

if (projectContainer) {
    showProjects();
}

if (projectContainer && filterContainer) {
    renderFilterButtons(filterContainer, getAllTags(projects), activeTag, t);

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

const timelineContainer = document.getElementById('timeline-list');

if (timelineContainer) {
    renderTimeline(timelineContainer, sortTimeline(timeline), t);
}