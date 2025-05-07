/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const availableEquipment = await prisma.resource.findMany({
      where: {
        type: 'equipment',
        owner: 'admin@foo.com',
      },
      orderBy: {
        posted: 'desc',
      },
    });

    return NextResponse.json(availableEquipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
