// app/articles/category/[category]/page.tsx
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '../../GetArticles';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
    const decodedCategory = decodeURIComponent(params.category);

    try {
        const articles = await getArticlesByCategory(decodedCategory);
        if (articles.length === 0) {
            notFound();
        }

        return (
            <div>
                <h1>Articles in Category: {decodedCategory}</h1>
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
