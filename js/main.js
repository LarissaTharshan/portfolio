import {projects} from './data/projects.js';
import {timeline} from './data/timeline.js';
import {renderProjects, sortProjectsByYear} from './projects.js';
import {renderTimeline, sortTimeline} from './timeline.js';
import {getAllTags, renderFilterButtons} from './filter.js';

const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('project-filter');

if (projectContainer && filterContainer) {
    renderFilterButtons(filterContainer, getAllTags(projects), null);
    renderProjects(projectContainer, sortProjectsByYear(projects));
}

const timelineContainer = document.getElementById('timeline-list');

if (timelineContainer) {
    renderTimeline(timelineContainer, sortTimeline(timeline));
}