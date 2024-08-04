// app/api/visitor/[id]/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const visitor = await prisma.visitor.findUnique({
                where: { id: Number(id) },
            });
            if (visitor) {
                res.status(200).json(visitor);
            } else {
                res.status(404).json({ error: 'Visitor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch visitor' });
        }
    } else if (req.method === 'PUT') {
        try {
            const parsedData = schema.parse(req.body);
            const updatedVisitor = await prisma.visitor.update({
                where: { id: Number(id) },
                data: parsedData,
            });
            res.status(200).json(updatedVisitor);
        } catch (error) {
            res.status(400).json({ error: error.errors });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.visitor.delete({
                where: { id: Number(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete visitor' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}