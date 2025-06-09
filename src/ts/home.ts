import { Category, Article } from './types.js';
import { fetchHeadlinesByCategory } from './api.js';
import { renderArticleInto } from './render.js';

// Each container ID mapped to a category list
const containers: { id: string; categories: Category[] }[] = [
    { id: 'mainBannerContainer', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE] },
    { id: 'trendingContainer', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE] },
    { id: 'recentPostsContainer', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE] },
    { id: 'popularContainer', categories: [Category.SCIENCE]},
    { id: 'weeklyBestNewsContainer', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE] },
    { id: 'popularTechContainer', categories: [Category.TECHNOLOGY] },
    { id: 'horizontalContainer', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE]},
    { id: 'fullWidthSection', categories: [Category.TECHNOLOGY, Category.ENTERTAINMENT, Category.SCIENCE]}
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const allArticles: Article[] = [];

const categoryList: Category[] = Array.from(
    new Set(containers.flatMap(c => c.categories))
);

const loadArticles = async () => {
    for (const category of categoryList) {
        const articles = await fetchHeadlinesByCategory(category);
        allArticles.push(...articles);
        await delay(1100); // API limit is 1 request per second
    }
};

const getElements = (id: string): HTMLElement[] => {
    const container = document.getElementById(id);
    if (!container) return [];
    return Array.from(container.querySelectorAll('.banner, .banner-horizontal, .banner-horizontal-big'));
};

const assignArticlesToElements = (articles: Article[], elements: HTMLElement[]) => {
    for (let i = 0; i < elements.length && i < articles.length; i++) {
        renderArticleInto(elements[i], articles[i]);
    }
};

const assignArticlesById = (id: string, pool: Article[]) => {
    const elements = getElements(id);
    assignArticlesToElements(pool.splice(0, elements.length), elements);
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadArticles();

    // Create a pool of all categories
    const pool = [...allArticles].sort(() => Math.random() - 0.5);

    for (const { id, categories } of containers) {
        const filtered = pool.filter(article => categories.includes(article.category));
        assignArticlesById(id, filtered);
    }

    localStorage.setItem('articlePool', JSON.stringify(allArticles));


});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.textContent?.trim().toLowerCase();
            if (category) {
                window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
            }
        });
    });
});