import {projects} from './data/projects.js';
import {renderProjects, sortProjectsByYear} from './projects.js';

const projectContainer = document.getElementById('project-list');

if (projectContainer) {
    renderProjects(projectContainer, sortProjectsByYear(projects));
}