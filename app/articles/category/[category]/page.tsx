// app/articles/category/[category]/page.tsx
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '../../GetArticles';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CategoryPage = async ({ params }: { params: { category: string } }) => {
    try {
        const articles = await getArticlesByCategory(params.category);
        if (articles.length === 0) {
            notFound();
        }

        return (
            <div>
                <h1>Articles in Category: {params.category}</h1>
                {articles.map(article => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                    </div>
                ))}
            </div>
        );
    } catch {
        notFound();
    }
};

export default CategoryPage;
