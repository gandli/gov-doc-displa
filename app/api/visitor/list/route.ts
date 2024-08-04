// app/api/visitor/list/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const visitors = await prisma.visitor.findMany();
            res.status(200).json(visitors);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch visitors' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
