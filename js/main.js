import {projects} from './data/projects.js';
import {timeline} from './data/timeline.js';
import {renderProjects, sortProjectsByYear} from './projects.js';
import {renderTimeline, sortTimeline} from './timeline.js';
import {filterProjectsByTag, getAllTags, renderFilterButtons, tagFromButton, updatePressedState} from './filter.js';

const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('project-filter');

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
    renderProjects(projectContainer, visibleProjects);

    return visibleProjects.length;
}

if (projectContainer && filterContainer) {
    renderFilterButtons(filterContainer, getAllTags(projects), activeTag);
    showProjects();

    filterContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-button');

        if (!button) {
            return;
        }

        activeTag = tagFromButton(button);
        showProjects();
        updatePressedState(filterContainer, activeTag);
    });
}

const timelineContainer = document.getElementById('timeline-list');

if (timelineContainer) {
    renderTimeline(timelineContainer, sortTimeline(timeline));
}