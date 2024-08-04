// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Article {
    title: string;
    content: string;
    category: string;
}

export async function POST(request: Request) {
    try {
        // 从请求中解析 JSON 数据
        const { title, content, category }: Article = await request.json();

        // 验证请求数据
        if (!title || !content || !category) {
            return NextResponse.json({ error: 'Title, content, and category are required' }, { status: 400 });
        }

        // 将文章存储到数据库
        const newArticle = await prisma.article.create({
            data: {
                title,
                content,
                category
                // createdAt 和 updatedAt 字段由 Prisma 自动处理
            }
        });

        return NextResponse.json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        // 获取所有文章
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
