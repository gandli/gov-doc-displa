// app\articles\[id]\GetArticles.tsx
import { prisma } from '@/lib/prisma';

export async function getArticle(id: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!article) {
            throw new Error('Article not found');
        }

        return article;
    } catch (error) {
        console.error('Failed to fetch article:', error);
        throw new Error('Failed to fetch article');
    }
}

export async function getArticlesByCategory(category: string) {
    try {
        const articles = await prisma.article.findMany({
            where: { category },
        });

        if (articles.length === 0) {
            throw new Error('No articles found for this category');
        }

        return articles;
    } catch (error) {
        console.error('Failed to fetch articles by category:', error);
        throw new Error('Failed to fetch articles');
    }
}

export async function getAllCategories() {
    try {
        const categories = await prisma.article.findMany({
            select: { category: true },
            distinct: ['category'],
        });
        return categories.map(c => c.category);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw new Error('Failed to fetch categories');
    }
}
