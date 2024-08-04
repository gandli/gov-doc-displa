// app/articles/page.tsx
import { prisma } from '../lib/prisma'
import ArticleList from './ArticleList'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany()

  return (
    <div>
      <h1>文章管理</h1>
      <ArticleList articles={articles} />
    </div>
  )
}