// app\articles\[id]\page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getArticle } from '../GetArticles';

const prisma = new PrismaClient();

const ArticlePage = async ({ params }: { params: { id: string } }) => {
    try {
        const article = await getArticle(params.id);

        return (
            <div>
                <h1>{article.title}</h1>
                <p><strong>Category:</strong> {article.category}</p> {/* 显示分类 */}
                <p>{article.content}</p>
            </div>
        );
    } catch {
        notFound();
    }
};

export default ArticlePage;
