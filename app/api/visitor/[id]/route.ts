// app\api\visitor\[id]\route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// 获取指定 ID 的访客信息
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        const visitor = await prisma.visitor.findUnique({
            where: { id },
        })
        if (visitor) {
            return NextResponse.json(visitor)
        } else {
            return NextResponse.json({ error: '访客未找到' }, { status: 404 })
        }
    } catch (error) {
        console.error('获取访客信息时出错:', error)
        return NextResponse.json({ error: '获取访客信息失败' }, { status: 500 })
    }
}

// 更新指定 ID 的访客信息
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        const body = await request.json()
        const {
            name, gender, idCard, phone, visitTime,
            purpose, documentNumber, caseNumber,
            processingStatus, processingTime
        } = body
        const updatedVisitor = await prisma.visitor.update({
            where: { id },
            data: {
                name, gender, idCard, phone, visitTime,
                purpose, documentNumber, caseNumber,
                processingStatus, processingTime
            },
        })
        return NextResponse.json(updatedVisitor)
    } catch (error) {
        console.error('更新访客信息时出错:', error)
        return NextResponse.json({ error: '更新访客信息失败' }, { status: 500 })
    }
}

// 删除指定 ID 的访客信息
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        await prisma.visitor.delete({ where: { id } })
        return NextResponse.json({ message: '访客删除成功' })
    } catch (error) {
        console.error('删除访客信息时出错:', error)
        return NextResponse.json({ error: '删除访客信息失败' }, { status: 500 })
    }
}
