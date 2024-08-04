// app\api\visitor\route.ts
// app/api/visitor/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    idCard: z.string().min(1, "ID Card is required"),
    phone: z.string().min(1, "Phone is required"),
    visitTime: z.string().datetime(),
    purpose: z.enum(["办理证件", "处理案件"]),
    documentNumber: z.string().optional(),
    caseNumber: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const parsedData = schema.parse(await request.json());
        const newVisitor = await prisma.visitor.create({
            data: parsedData,
        });
        return NextResponse.json(newVisitor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    }
}

export async function GET() {
    try {
        const visitors = await prisma.visitor.findMany();
        return NextResponse.json(visitors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
    }
}
