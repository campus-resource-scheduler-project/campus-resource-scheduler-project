/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const equipment = await prisma.resource.findMany({
      where: {
        type: 'physical',
        owner: 'admin@foo.com', // Only show available equipment
        NOT: {
          deadline: '1999-12-31T13:59:00.000Z',
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Failed to fetch equipment:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
