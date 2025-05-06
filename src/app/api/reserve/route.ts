/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { reserveResource } from '@/lib/dbActions';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { resourceId, userEmail } = await req.json();

    // Check if user already has a room reserved
    const existingRoom = await prisma.resource.findFirst({
      where: {
        owner: userEmail,
        type: 'room',
      },
    });

    if (existingRoom) {
      return NextResponse.json({
        success: false,
        error: 'You already have a room reserved.',
      });
    }

    const result = await reserveResource(resourceId, userEmail);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API reserve error:', error);
    return new NextResponse('Failed to reserve', { status: 500 });
  }
}
