// app/page.tsx
import { PrismaClient } from '@prisma/client';
import React from 'react';

// 创建 Prisma Client 实例
const prisma = new PrismaClient();

interface Article {
  id: number;
  title: string;
  content: string;
}

// 页面组件
const HomePage = async () => {
  // 从数据库获取文章数据
  const articles = await prisma.article.findMany();

  // 渲染页面
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">文章列表</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 导出页面组件
export default HomePage;

