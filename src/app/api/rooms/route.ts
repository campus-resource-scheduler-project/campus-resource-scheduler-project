/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const availableRooms = await prisma.resource.findMany({
      where: {
        type: 'room',
        owner: 'admin@foo.com',
      },
      orderBy: {
        posted: 'desc',
      },
    });

    return NextResponse.json(availableRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
