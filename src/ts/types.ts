export enum Category {
    GENERAL = 'general',
    WORLD = 'world',
    NATION = 'nation',
    BUSINESS = 'business',
    ENTERTAINMENT = 'entertainment',
    SPORTS = 'sports',
    SCIENCE = 'science',
    HEALTH = 'health',
    
    TECHNOLOGY = 'technology',
    MOBILE = 'mobile',
    GADGET = 'gadget',
    NEWS = 'news'
}

export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    category: Category;
    source: string;
    imageUrl: string;
    url: string;
}
