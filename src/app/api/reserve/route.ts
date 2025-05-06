/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, user } = await req.json();

    const updated = await prisma.resource.update({
      where: { id },
      data: { owner: user },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error reserving resource:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
