import { Category, Article } from './types.js';


export const Headlines = 'https://gnews.io/api/v4/top-headlines';
export const Key = '8d47045c7a0c8f7e23d1aabc81c13255';
// 84d8e7bb81129ed8635907e3a4b2e053
// 0f42a5902b659f390f7e86316d8eb0cc
// 7231abc0727433ed05f5a269c5c26fc5
// 8d47045c7a0c8f7e23d1aabc81c13255


// Convert response to Article
export function transformToArticle(raw: any, category: Category = Category.GENERAL): Article {
    return {
        id: raw.url,
        title: raw.title,
        description: raw.description,
        content: raw.content,
        publishedAt: raw.publishedAt,
        imageUrl: raw.image,
        url: raw.url,
        source: raw.source.name,
        category: category as Category
    };
}

// Used on homepage/category pages
export async function fetchHeadlinesByCategory(category: Category): Promise<Article[]> {
    const res = await fetch(`${Headlines}?category=${category}&lang=en&apikey=${Key}`);
    const data = await res.json();
    return (data.articles as any[]).map(article => transformToArticle(article, category));
}
