/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.resource.findMany({
      where: {
        type: 'room',
        owner: 'admin@foo.com', // ✅ Only show available rooms
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
