import { Article } from './types.js';

export function renderArticleInto(container: HTMLElement, article: Article): void {
    // Tag
    const tagEl = container.querySelector('.tag-color p, .tag p');
    if (tagEl) tagEl.textContent = article.category;

    // Title
    const titleEl = container.querySelector('.title, p.title');
    if (titleEl) titleEl.textContent = article.title;

    // Image
    const imageUrl = article.imageUrl || '../media/default.png';

    const imgEl = container.querySelector('img.article-pic');
    if (imgEl instanceof HTMLImageElement) {
        imgEl.src = imageUrl;
        imgEl.alt = article.title;
    }

    if (container.classList.contains('banner')) {
        console.log("Banner!");
        container.style.backgroundImage = `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9)),
          url(${imageUrl})
        `;
    }

    if (container.classList.contains('medium')) {
        console.log(imageUrl);
        console.log(article.title);
    }

    // Meta: author & date & reading time
    const authorSpan = container.querySelector('.meta-author');
    if (authorSpan) authorSpan.textContent = `By ${article.source}`;

    const dateSpan = container.querySelector('.meta-date');
    if (dateSpan) dateSpan.textContent = new Date(article.publishedAt).toLocaleDateString();

    const readingTimeSpan = container.querySelector('.meta-time');
    if (readingTimeSpan) readingTimeSpan.textContent = '3 mins'; // TODO: dynamically?

    const textEl = container.querySelector('.article-text');
    if (textEl) textEl.textContent = article.description ?? article.content;


    const button = container.querySelector('.read-more-button');
    if (button instanceof HTMLElement) {
        button.addEventListener('click', () => {
            window.location.href = `article.html?id=${encodeURIComponent(article.id)}`;
        });
    }

    // Entire banner click event
    container.style.cursor = 'pointer';
    container.onclick = () => {
        window.location.href = `article.html?id=${encodeURIComponent(article.url)}`;
    };

}
