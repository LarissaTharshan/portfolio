import {projects} from './data/projects.js';
import {timeline} from './data/timeline.js';
import {renderProjects, sortProjectsByYear} from './projects.js';
import {renderTimeline, sortTimeline} from './timeline.js';

const projectContainer = document.getElementById('project-list');

if (projectContainer) {
    renderProjects(projectContainer, sortProjectsByYear(projects));
}

const timelineContainer = document.getElementById('timeline-list');

if (timelineContainer) {
    renderTimeline(timelineContainer, sortTimeline(timeline));
}