// app/articles/list/page.tsx
import { prisma } from '@/lib/prisma'

const ListPage: React.FC = async () => {
    const articles = await prisma.article.findMany()
    return (
        <div className='p-24'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">文章列表</h1>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                {articles.map((article) => (
                    <li className='mb-24' key={article.id}>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{article.title}</h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">{article.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default ListPage;