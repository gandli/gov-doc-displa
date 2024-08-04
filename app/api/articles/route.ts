// app\api\articles\route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Article {
    title: string;
    content: string;
}

export async function POST(request: Request) {
    const { title, content }: Article = await request.json();

    // 将文章存储到数据库
    await prisma.article.create({ data: { title, content } });

    return NextResponse.json({ message: '文章已提交' });
}

export async function GET() {
    // 获取所有文章
    const articles = await prisma.article.findMany();

    return NextResponse.json(articles);
}