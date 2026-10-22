export function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = project.title;
    card.append(title);

    const description = document.createElement('p');
    description.textContent = project.description;
    card.append(description);

    return card;
}
