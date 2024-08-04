// app/api/visitor/list/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const visitors = await prisma.visitor.findMany();
        return NextResponse.json(visitors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const parsedData = await request.json();
        // Schema validation here if needed
        const newVisitor = await prisma.visitor.create({
            data: parsedData,
        });
        return NextResponse.json(newVisitor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create visitor' }, { status: 400 });
    }
}
