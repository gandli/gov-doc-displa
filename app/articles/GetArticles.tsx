// app\articles\[id]\GetArticles.tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        throw new Error('Failed to fetch article');
    }
}

export async function getArticlesByCategory(category: string) {
    try {
        // Use a local variable to decode the category parameter
        const decodedCategory = decodeURIComponent(category);

        // Fetch articles by the decoded category
        const articles = await prisma.article.findMany({
            where: { category: decodedCategory },
        });

        // Check if no articles are found
        if (articles.length === 0) {
            throw new Error('No articles found for this category');
        }

        return articles;
    } catch (error) {
        // Log the error and throw a more generic message
        console.error('Failed to fetch articles by category:', error);
        throw new Error('Failed to fetch articles');
    }
}