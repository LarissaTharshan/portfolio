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
        link.setAttribute('aria-label', `Repository von ${project.title}`);
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