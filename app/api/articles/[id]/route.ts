// app/api/articles/[id]/route.ts

import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// 获取单篇文章
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }

    try {
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (article) {
            return NextResponse.json(article);
        } else {
            return NextResponse.json({ error: '文章未找到' }, { status: 404 });
        }
    } catch (error) {
        console.error('获取文章时出错:', error);
        return NextResponse.json({ error: '获取文章失败' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// 更新单篇文章
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const { title, content, category }: { title?: string; content?: string; category?: string } = await request.json();

    if (isNaN(id)) {
        return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }

    if (!title && !content && !category) {
        return NextResponse.json({ error: '至少提供一个更新字段' }, { status: 400 });
    }

    try {
        const updatedArticle = await prisma.article.update({
            where: { id },
            data: { title, content, category },
        });

        return NextResponse.json(updatedArticle);
    } catch (error) {
        console.error('更新文章时出错:', error);
        return NextResponse.json({ error: '更新文章失败' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// 删除单篇文章
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }

    try {
        await prisma.article.delete({
            where: { id },
        });
        return NextResponse.json({ message: '文章删除成功' });
    } catch (error) {
        console.error('删除文章时出错:', error);
        return NextResponse.json({ error: '删除文章失败' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
