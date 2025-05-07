/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { reserveResource } from '@/lib/dbActions';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, user } = await req.json();
    const result = await reserveResource(id, user);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error reserving resource:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
