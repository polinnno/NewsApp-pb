import { fetchHeadlinesByCategory } from './api.js';
import { renderArticleInto } from './render.js';
document.addEventListener('DOMContentLoaded', async () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const rawCategory = (_a = params.get('cat')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!rawCategory)
        return;
    const category = rawCategory;
    // Set header text
    const title = document.getElementById('categoryTitle');
    if (title)
        title.textContent = category.toUpperCase();
    // Fetch articles
    const articles = await fetchHeadlinesByCategory(category);
    // Retrieve old articles from localStorage and add new ones
    const existingRaw = localStorage.getItem('articlePool');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const combined = [...existing, ...articles].filter((article, index, self) => index === self.findIndex(a => a.url === article.url));
    localStorage.setItem('articlePool', JSON.stringify(combined));
    const container = document.getElementById('horizontalContainer');
    if (!container)
        return;
    // Create each article, then render
    articles.forEach(article => {
        const banner = document.createElement('div');
        banner.classList.add('banner-horizontal');
        banner.innerHTML = `
        <img alt="Article thumbnail" class="article-pic" src="../media/default.png"/>
        <div class="banner-horizontal-data">
            <div class="tag"><p></p></div>
            <p class="title"></p>
            <div class="meta">
                <ul>
                    <li>
                        <img alt="" class="icon" src="../media/calendar.svg"/>
                        <span class="meta-date"></span>
                    </li>
                </ul>
            </div>
        </div>
    `;
        renderArticleInto(banner, article);
        container.appendChild(banner);
    });
});
