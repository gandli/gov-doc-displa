// app\articles\[id]\ArticleDetails.tsx

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