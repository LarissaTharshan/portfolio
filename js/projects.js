/**
 * @typedef {import('./data/projects.js').Project} Project
 */

/**
 * Erstellt die Karte für ein einzelnes Projekt.
 * Alle Texte werden über textContent gesetzt, nie über innerHTML.
 *
 * @param {Project} project - Das Projekt, das dargestellt wird.
 * @returns {HTMLElement} Ein article-Element mit der Klasse "card".
 */
export function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = project.title;
    card.append(title);

    const description = document.createElement('p');
    description.textContent = project.description;
    card.append(description);

    if (project.repoUrl) {
        const linkParagraph = document.createElement('p');
        const link = document.createElement('a');
        link.href = project.repoUrl;
        link.textContent = 'Zum Repository';
        link.setAttribute('aria-label', `Zum Repository von ${project.title}`);
        linkParagraph.append(link);
        card.append(linkParagraph);
    }

    const tagList = document.createElement('ul');
    tagList.className = 'tag-list';
    tagList.setAttribute('aria-label', 'Technologien');

    for (const tag of project.tags) {
        const item = document.createElement('li');
        item.className = 'tag';
        item.textContent = tag;
        tagList.append(item);
    }

    card.append(tagList);

    return card;
}

/**
 * Ersetzt den Inhalt eines Containers durch Karten für alle Projekte.
 *
 * @param {HTMLElement} container - Das Element, in das die Karten kommen.
 * @param {Project[]} projects - Die Projekte in der gewünschten Reihenfolge.
 * @returns {void}
 */
export function renderProjects(container, projects) {
    const fragment = document.createDocumentFragment();

    for (const project of projects) {
        fragment.append(createProjectCard(project));
    }

    container.replaceChildren(fragment);
}

/**
 * Sortiert Projekte nach Jahr, das neueste zuerst.
 * Reine Funktion: Das übergebene Array wird nicht verändert,
 * und es wird kein DOM verwendet.
 *
 * @param {Project[]} projects - Die zu sortierenden Projekte.
 * @returns {Project[]} Ein neues, sortiertes Array.
 */
export function sortProjectsByYear(projects) {
    return [...projects].sort((a, b) => b.year - a.year);
}