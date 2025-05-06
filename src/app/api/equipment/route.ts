import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const equipment = await prisma.resource.findMany({
      where: { type: 'physical' },
      orderBy: { name: 'asc' },
    });

    res.status(200).json(equipment);
  } catch (error) {
    console.error('Failed to fetch equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
