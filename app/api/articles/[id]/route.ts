// app/api/articles/[id]/route.ts

import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        const body = await request.json()
        const { title, content } = body
        const article = await prisma.article.update({
            where: { id },
            data: { title, content },
        })
        return NextResponse.json(article)
    } catch (error) {
        console.error('更新文章时出错:', error)
        return NextResponse.json({ error: '更新文章失败' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        await prisma.article.delete({ where: { id } })
        return NextResponse.json({ message: '文章删除成功' })
    } catch (error) {
        console.error('删除文章时出错:', error)
        return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
    }
}