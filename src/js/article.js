import { renderArticleInto } from './render.js';
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const encodedUrl = params.get('id');
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : '';
    const raw = localStorage.getItem('articlePool');
    if (!url || !raw)
        return;
    const articles = JSON.parse(raw);
    const article = articles.find(a => a.url === url);
    if (!article)
        return;
    // Fill content
    const title = document.querySelector('.article-title');
    if (title)
        title.textContent = article.title;
    const tag = document.querySelector('.tag p');
    if (tag)
        tag.textContent = article.category;
    const author = document.querySelector('.meta-author');
    if (author)
        author.textContent = `By ${article.source}`;
    const date = document.querySelector('.meta-date');
    if (date) {
        const d = new Date(article.publishedAt);
        const formatted = d.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        date.textContent = formatted;
    }
    const time = document.querySelector('.meta-time');
    if (time)
        time.textContent = '3 mins';
    const description = document.querySelector('.article-text');
    if (description)
        description.textContent = (_a = article.description) !== null && _a !== void 0 ? _a : article.content;
    const img = document.querySelector('.article-page-picture');
    if (img instanceof HTMLImageElement) {
        img.src = article.imageUrl || '../media/default.png';
        img.alt = article.title;
        console.log("img is html element tho");
    }
    else
        console.log("img is NOT html element tho");
    const similar = articles
        .filter(a => a.category === article.category && a.url !== article.url)
        .slice(0, 7);
    const recommendedContainer = document.getElementById('recommendedContainer');
    if (!recommendedContainer)
        return;
    const bigBanner = recommendedContainer.querySelector('.banner-horizontal-big');
    if (bigBanner && similar[0]) {
        renderArticleInto(bigBanner, similar[0]);
    }
    const verticals = recommendedContainer.querySelectorAll('.banner-vertical-container');
    let index = 1;
    verticals.forEach(column => {
        const slots = column.querySelectorAll('.banner-horizontal');
        slots.forEach(slot => {
            if (similar[index]) {
                renderArticleInto(slot, similar[index]);
                index++;
            }
        });
    });
});
